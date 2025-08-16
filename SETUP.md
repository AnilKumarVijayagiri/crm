# SKY_CRM — Build from Scratch (Step-by-Step)

## Prerequisites
- Node.js 18+ and npm
- A MongoDB Atlas cluster (or local MongoDB)
- Git (optional)
- (Optional) Postman / VS Code REST Client

## 1) Project Files
Unzip the archive, you should have:
- `backend/`
- `frontend/`

## 2) Configure Environment
Copy examples and fill your values:

```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit `backend/.env`:
- `MONGODB_URI` — your Atlas connection string
- `JWT_SECRET` — a long random string
- `CORS_ORIGIN` — `http://localhost:5173` during local dev

## 3) Install Dependencies
In two terminals:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## 4) Seed Roles, Statuses, Admin
In the backend terminal:

```bash
npm run seed
```

This ensures:
- Roles: Admin, Sales Head, Sales Team Lead, Sales Representative
- Lead Statuses: Registered, Contacted, Call Back, Follow-Up, Not Interested, Enrolled
- Admin user: `admin@skycrm.local` / `Admin@123` (change in `.env` via `SEED_ADMIN_*`)

## 5) Log In
Go to `/login` and sign in with the seeded admin.
- Token is stored in `localStorage` as `access`.
- You can now create leads and change statuses.

## 6) Attachments
- Files are stored under `backend/uploads/` and served from `/uploads/...`.
- For production, switch to S3 or MongoDB GridFS (Multer storage engine).

## 7) Notifications & Follow-Ups
- A worker runs every minute and creates notifications for past-due, open follow-ups.
- Add a follow-up via API (you can add a UI later) and wait for a due time to see notifications.

## 8) Role-Based Access (RBAC)
The middleware decodes JWT -> `req.user.roleName`. Extend `permit()` checks on routes that need restrictions.
Examples:
- Only Admin / Sales Head can reassign any lead.
- Sales Team Lead can close their team’s leads.

## 9) Testing Quickly
Use `backend/requests.http` in VS Code (REST Client extension) or import the Postman collection (create one from those requests).

## 10) Deploy (Suggested)
### Backend (Render/Railway/EC2)
- Set env vars from `.env`
- Ensure persistent storage or S3 for uploads
- Whitelist frontend domain in `CORS_ORIGIN`

### Frontend (Vercel/Netlify)
- Set `VITE_API_URL` to your backend public URL (e.g., `https://api.yourdomain.com/api`)

### MongoDB Atlas
- Create a new database `sky_crm`
- Network access: Allow IPs of your backend host

## 11) Production Hardening Checklist
- Helmet, Rate limiting, Input validation (celebrate/zod), CSRF if using cookies
- Audit log review endpoint with pagination & filters
- Indexes for query patterns (already included for leads/follow-ups)
- Request logging with correlation IDs
- Error tracking (Sentry)

## 12) Next Features (Nice-to-Haves)
- Teams/ownership model
- Kanban view for statuses
- Saved filters, CSV export
- Email/SMS integration for reminders (SendGrid/Twilio)
- Dashboard with charts (win rate, lead source analysis)