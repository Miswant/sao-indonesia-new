import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert } from '@mui/material';

export default function Admin() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const pageSize = 10;
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackSeverity, setSnackSeverity] = React.useState('success');

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const doLogin = async () => {
    setError('');
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const j = await r.json();
      if (!r.ok) {
        setError(j.error || 'Login failed');
        setSnackMessage(j.error || 'Login gagal');
        setSnackSeverity('error');
        setSnackOpen(true);
        return;
      }
      setLoggedIn(true);
      setSnackMessage('Login berhasil');
      setSnackSeverity('success');
      setSnackOpen(true);
      await loadItems();
    } catch (err) {
      setError('Network error');
      setSnackMessage('Kesalahan jaringan');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const loadItems = async () => {
    try {
      const r = await fetch('/api/submissions', { credentials: 'include' });
      if (!r.ok) throw r;
      const j = await r.json();
      setItems(j.data || []);
    } catch (err) {
      setError('Failed to load submissions');
      setSnackMessage('Gagal memuat submissions');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const logout = () => {
    document.cookie = 'admin_session=; Max-Age=0; Path=/';
    setLoggedIn(false);
    setItems([]);
  };

  const exportCsv = () => {
    const rows = items.map((i) => [new Date(i.timestamp || Date.now()).toISOString(), i.fullName, i.email, i.phone, i.message]);
    const header = ['Tanggal', 'Nama', 'Email', 'No Telp', 'Pesan'];
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const filtered = items.filter((it) => {
    if (!filter) return true;
    const s = filter.toLowerCase();
    return (
      (it.fullName || '').toLowerCase().includes(s) ||
      (it.email || '').toLowerCase().includes(s) ||
      (it.phone || '').toLowerCase().includes(s) ||
      (it.message || '').toLowerCase().includes(s)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Admin - Submissions</Typography>

          {!loggedIn && (
            <Box>
              <TextField label="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mr: 1 }} />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button variant="contained" onClick={doLogin} sx={{ mr: 1 }}>
                Login
              </Button>
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}

          {loggedIn && (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Cari nama, email, telepon, pesan"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(0);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 420 }}
                />

                <Button variant="outlined" onClick={exportCsv}>
                  Export CSV
                </Button>
                <Button variant="outlined" color="inherit" onClick={logout}>
                  Logout
                </Button>
              </Stack>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>No Telp</TableCell>
                    <TableCell>Pesan</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageItems.map((it, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{new Date(it.timestamp || Date.now()).toLocaleString()}</TableCell>
                      <TableCell>{it.fullName}</TableCell>
                      <TableCell>{it.email}</TableCell>
                      <TableCell>{it.phone}</TableCell>
                      <TableCell style={{ whiteSpace: 'pre-wrap' }}>{it.message}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={async () => {
                            const ok = window.confirm('Hapus pesan ini?');
                            if (!ok) return;
                            try {
                              const r = await fetch(`/api/submissions/${it.timestamp}`, {
                                method: 'DELETE',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                              });
                              if (!r.ok) {
                                const j = await r.json().catch(() => ({}));
                                setError(j.error || 'Gagal menghapus');
                                setSnackMessage(j.error || 'Gagal menghapus');
                                setSnackSeverity('error');
                                setSnackOpen(true);
                                return;
                              }
                              // refresh
                              await loadItems();
                              setSnackMessage('Pesan dihapus');
                              setSnackSeverity('success');
                              setSnackOpen(true);
                            } catch (e) {
                              setError('Network error');
                              setSnackMessage('Kesalahan jaringan saat menghapus');
                              setSnackSeverity('error');
                              setSnackOpen(true);
                            }
                          }}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                <Button disabled={page <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
                  Prev
                </Button>
                <Typography>
                  Page {page + 1} / {totalPages}
                </Typography>
                <Button disabled={page >= totalPages - 1} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>
                  Next
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
