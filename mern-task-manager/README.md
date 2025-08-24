# MERN Task Manager

A ready-to-deploy MERN app with JWT auth, task CRUD, and a simple analytics dashboard.

## Tech
- MongoDB Atlas, Express.js, Node.js
- React + Vite, Redux Toolkit, React Router
- Tailwind CSS, Recharts

## Quick Start
```bash
# 1) Clone and enter
git clone <your-repo-url> mern-task-manager
cd mern-task-manager

# 2) Backend
cd backend
cp .env.example .env
npm i
npm run dev   # or: npm start

# 3) Frontend
cd ../frontend
cp .env.example .env
npm i
npm run dev
```

Backend runs at http://localhost:5000, Frontend runs at http://localhost:5173 (Vite).

## .env (Backend)
- MONGO_URI=your_mongodb_atlas_uri
- JWT_SECRET=super_secret_string
- CORS_ORIGIN=* (or comma-separated origins)
- PORT=5000

## .env (Frontend)
- VITE_API_URL=http://localhost:5000

## Build
```bash
cd frontend && npm run build
```

## Deployment
### Backend → Render
1. Push repo to GitHub
2. Create Render **Web Service** → Connect `backend` folder
3. Build Command: `npm i`
4. Start Command: `npm start`
5. Add env vars: `MONGO_URI, JWT_SECRET, CORS_ORIGIN=*`

### Frontend → Vercel (or Netlify)
1. New Project → Import `frontend` folder
2. Build Command: `npm run build`
3. Output dir: `dist`
4. Env: `VITE_API_URL=https://your-render-service.onrender.com`

## License
MIT
