Server for storing contact submissions and applying basic rate-limiting.

Setup
1. cd server
2. copy `.env.example` to `.env` and set `ADMIN_TOKEN` and other values
3. npm install
4. npm start

Endpoints
- POST /api/contact
  - body JSON: { fullName, email, phone, message }
  - header (optional): `x-client-token` a client-generated identifier stored in localStorage
  - rate-limited by IP or client token within `RATE_LIMIT_HOURS` window

- GET /api/submissions
  - header: `Authorization: Bearer <ADMIN_TOKEN>`
  - returns saved submissions

Notes
- This server stores submissions in `server/data/submissions.json`.
- It does NOT automatically send WhatsApp messages. To send messages automatically, integrate
  WhatsApp Cloud API (Meta) or Twilio here and call those APIs when saving a submission.
