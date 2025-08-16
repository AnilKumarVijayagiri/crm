# SKY_CRM (MERN)

A minimal, production-ready CRM scaffold with:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express + Mongoose + JWT + Multer
- **DB**: MongoDB Atlas

## Quick Start

### 1) Environment variables
Create two files:

**backend/.env**
```
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/sky_crm?retryWrites=true&w=majority
JWT_SECRET=replace_me
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=uploads
```

**frontend/.env**
```
VITE_API_URL=http://localhost:8000/api
```

### 2) Install & run
In one terminal:
```bash
cd backend
npm install
npm run dev
```

In another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## Default Roles
- Admin
- Sales Head
- Sales Team Lead
- Sales Representative

## Notes
- File uploads saved locally at `backend/uploads` (switch to S3/GridFS later).
- Notifications worker runs every minute (demo).
- This is an MVP scaffold. Extend validators, error handling, and security (Helmet, rate limits) for production.