import express from 'express';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// global error visibility for debugging dev server 500s
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const DATA_DIR = path.resolve('./server/data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');
const ADMIN_STATE_FILE = path.join(DATA_DIR, 'admin_state.json');
const RATE_LIMIT_HOURS = Number(process.env.RATE_LIMIT_HOURS || 24);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'developer';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'P@ssword123!';

// admin login attempts tracking
const failedAttempts = {}; // { ip: { count, lastFailedAt } }
const LOCK_MINUTES = Number(process.env.ADMIN_LOCK_MINUTES || 5);

// simple in-memory sessions: token -> { created, expires }
const sessions = new Map();
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MINUTES || 30) * 60 * 1000;

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch (err) {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

async function loadAdminState() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(ADMIN_STATE_FILE, 'utf8');
    const j = JSON.parse(raw || '{}');
    if (j.failedAttempts) {
      Object.assign(failedAttempts, j.failedAttempts);
    }
    if (j.sessions) {
      // restore sessions map
      Object.entries(j.sessions).forEach(([k, v]) => sessions.set(k, v));
    }
  } catch (err) {
    // ignore missing file
  }
}

async function saveAdminState() {
  try {
    const obj = {
      failedAttempts,
      sessions: Object.fromEntries(sessions.entries()),
    };
    await fs.writeFile(ADMIN_STATE_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save admin state', err);
  }
}

async function loadData() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw || '[]');
}

async function saveData(arr) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body || {};
    const clientToken = req.headers['x-client-token'] || req.body.clientToken || null;
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ipHeader = req.headers['x-forwarded-for'] || req.ip || '';
    const ip = String(ipHeader).split(',')[0].trim();

    const now = Date.now();
    const cutoff = now - RATE_LIMIT_HOURS * 3600 * 1000;

    const data = await loadData();

    const recentByIp = data.find((s) => s.ip === ip && s.timestamp > cutoff);
    const recentByToken = clientToken ? data.find((s) => s.token === clientToken && s.timestamp > cutoff) : null;

    if (recentByIp || recentByToken) {
      return res.status(429).json({ error: 'You may only submit once per day from this device/IP' });
    }

    const entry = {
      fullName,
      email,
      phone,
      message,
      ip,
      token: clientToken || null,
      timestamp: now,
    };

    data.push(entry);
    await saveData(data);

    // NOTE: sending to WhatsApp automatically would happen here (server calls WA API).
    // Implement WhatsApp Cloud API or Twilio integration as needed (not included).

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// simple admin endpoint to view submissions (protect with ADMIN_TOKEN)
app.get('/api/submissions', async (req, res) => {
  try {
    // allow either bearer ADMIN_TOKEN or valid admin_session cookie
    const auth = req.headers.authorization || '';
    if (ADMIN_TOKEN && auth === `Bearer ${ADMIN_TOKEN}`) {
      const data = await loadData();
      return res.json({ ok: true, data });
    }

    const cookie = req.headers.cookie || '';
    const match = cookie.match(/admin_session=([^;]+)/);
    const token = match ? match[1] : null;
    if (!token) return res.status(403).json({ error: 'Forbidden' });
    const s = sessions.get(token);
    if (!s || s.expires < Date.now()) return res.status(403).json({ error: 'Forbidden' });
    const data = await loadData();
    res.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a submission by timestamp (protected)
app.delete('/api/submissions/:ts', async (req, res) => {
  try {
    console.log('DELETE called for', req.params.ts, 'headers', req.headers && Object.keys(req.headers));
    // same auth as GET
    const auth = req.headers.authorization || '';
    let allowed = false;
    if (ADMIN_TOKEN && auth === `Bearer ${ADMIN_TOKEN}`) allowed = true;
    const cookie = req.headers.cookie || '';
    const match = cookie.match(/admin_session=([^;]+)/);
    const token = match ? match[1] : null;
    if (!allowed) {
      if (token) {
        const s = sessions.get(token);
        if (s && s.expires >= Date.now()) allowed = true;
      }
    }
    if (!allowed) return res.status(403).json({ error: 'Forbidden' });

    const ts = Number(req.params.ts);
    if (!ts) return res.status(400).json({ error: 'Invalid timestamp' });
    const data = await loadData();
    const idx = data.findIndex((d) => Number(d.timestamp) === ts);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    data.splice(idx, 1);
    await saveData(data);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin login: validates static credentials, issues httpOnly cookie session
app.post('/api/admin/login', async (req, res) => {
  try {
    // log incoming login attempts to help diagnose 500 errors during development
    console.log('ADMIN LOGIN attempt, body keys:', Object.keys(req.body || {}));
    const { username, password } = req.body || {};
    const ipHeader = req.headers['x-forwarded-for'] || req.ip || '';
    const ip = String(ipHeader).split(',')[0].trim();

    const now = Date.now();
    const attempts = failedAttempts[ip] || { count: 0, lastFailedAt: 0 };
    if (attempts.count >= 3 && now - attempts.lastFailedAt < LOCK_MINUTES * 60 * 1000) {
      return res.status(429).json({ error: `Too many attempts. Try again later.` });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // success: reset attempts and create session
      failedAttempts[ip] = { count: 0, lastFailedAt: 0 };
      const token = `s_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      sessions.set(token, { created: now, expires: now + SESSION_TTL_MS });
      // set httpOnly cookie
      res.setHeader('Set-Cookie', `admin_session=${token}; HttpOnly; Path=/; SameSite=Lax`);
      // persist state (log any persistence errors)
      saveAdminState().catch((err) => console.error('Failed to persist admin state after login', err));
      return res.json({ ok: true });
    }

    // failure
    attempts.count = (attempts.count || 0) + 1;
    attempts.lastFailedAt = now;
    failedAttempts[ip] = attempts;
    // persist failed attempts (log any persistence errors)
    saveAdminState().catch((err) => console.error('Failed to persist admin state after failed attempt', err));
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Error in /api/admin/login handler', err, { body: req.body, headers: req.headers });
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve admin page
app.get('/admin', async (req, res) => {
  const html = `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Admin - Submissions</title>
    <style>
      body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial; padding:24px}
      input{padding:8px;margin:6px 0;display:block;width:300px}
      table{border-collapse:collapse;width:100%;margin-top:16px}
      th,td{border:1px solid #ddd;padding:8px;text-align:left}
      th{background:#f4f4f4}
      .error{color:#d32f2f}
      .hidden{display:none}
    </style>
  </head>
  <body>
    <h1>Admin Login</h1>
    <div id="login">
      <label>Username<input id="username" /></label>
      <label>Password<input id="password" type="password" /></label>
      <button id="btn">Login</button>
      <div id="msg" class="error"></div>
    </div>

    <div id="admin" class="hidden">
      <h2>Submissions</h2>
      <button id="logout">Logout</button>
      <table id="tbl">
        <thead><tr><th>Nama</th><th>Email</th><th>No Telp</th><th>Pesan</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>

    <script>
      const msg = document.getElementById('msg');
      const loginDiv = document.getElementById('login');
      const adminDiv = document.getElementById('admin');
      const btn = document.getElementById('btn');
      const logout = document.getElementById('logout');
      const tblBody = document.querySelector('#tbl tbody');

      async function showSubmissions(){
        try{
          const r = await fetch('/api/submissions');
          if(!r.ok){ throw r }
          const j = await r.json();
          const items = j.data || [];
          tblBody.innerHTML = items.map(function(i){
            return '<tr><td>'+escapeHtml(i.fullName)+"</td><td>"+escapeHtml(i.email)+"</td><td>"+escapeHtml(i.phone)+"</td><td>"+escapeHtml(i.message)+"</td></tr>";
          }).join('');
        }catch(e){
          msg.textContent = 'Not authorized or failed to load.';
          loginDiv.classList.remove('hidden');
          adminDiv.classList.add('hidden');
        }
      }

      function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":"&#39;"})[c]); }

      btn.addEventListener('click', async ()=>{
        msg.textContent='';
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try{
          const r = await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
          const j = await r.json();
          if(!r.ok){ msg.textContent = j.error || 'Login failed'; return; }
          loginDiv.classList.add('hidden'); adminDiv.classList.remove('hidden');
          await showSubmissions();
        }catch(err){ msg.textContent='Network error'; }
      });

      logout.addEventListener('click', ()=>{ document.cookie='admin_session=; Max-Age=0; Path=/'; loginDiv.classList.remove('hidden'); adminDiv.classList.add('hidden'); });
    </script>
  </body>
  </html>`;
  res.setHeader('Content-Type','text/html');
  res.send(html);
});

const PORT = Number(process.env.PORT || 3001);
(async () => {
  await loadAdminState();
  // periodic flush of admin state
  setInterval(() => {
    saveAdminState();
  }, 60 * 1000);
  // If running in production, serve built frontend from ../dist if present
  if (process.env.NODE_ENV === 'production') {
    const frontDist = path.resolve('./dist');
    // allow dist next to root or one level up depending on deployment layout
    const altDist = path.resolve('../dist');
    const serveDir = existsSync(frontDist) ? frontDist : (existsSync(altDist) ? altDist : null);
    if (serveDir) {
      console.log('Serving frontend from', serveDir);
      app.use(express.static(serveDir));
      app.get('*', (req, res) => res.sendFile(path.join(serveDir, 'index.html')));
    }
  }

  app.listen(PORT, () => console.log(`Contact server listening on ${PORT}`));
})();
