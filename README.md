# SKIDS SK System

SKIDS is a React + Vite frontend with an Express/MongoDB API backend for SK youth information, announcements, events, budget transparency, documents, messages, and admin activity logs.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Express, MongoDB, Mongoose
- Auth: Google Identity Services on the frontend, Google ID token verification on the backend, app JWT for API requests
- Uploads: signed Cloudinary uploads from the browser with API-secret signing on the backend
- Deployment targets: Vercel for frontend, Render for backend

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local `.env` file and fill in the values from your private deployment notes. Keep `.env` and `.env.example` out of Git.

3. Run the backend:

   ```bash
   npm run dev:server
   ```

4. Run the frontend:

   ```bash
   npm run dev
   ```

The frontend defaults to `http://localhost:5173`; the API defaults to `http://localhost:5000/api`.

## Cloudinary Uploads

Profile photos and uploaded document images/files use signed Cloudinary uploads:

1. The frontend asks the backend for an upload signature at `POST /api/uploads/signature`.
2. The frontend uploads the file directly to Cloudinary.
3. The frontend saves Cloudinary metadata such as `secureUrl`, `publicId`, `format`, `width`, `height`, and `bytes` to MongoDB through the API.

Keep these variables on the backend only:

```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_FOLDER=skids
```

Never add `CLOUDINARY_API_SECRET` to Vercel or any frontend environment.

## Google Auth

Create a Google OAuth Web Client ID, then use the same client ID in both places:

- Frontend: `VITE_GOOGLE_CLIENT_ID`
- Backend: `GOOGLE_CLIENT_ID`

Add these authorized JavaScript origins in Google Cloud:

- `http://localhost:5173`
- Your Vercel frontend URL

Admins are assigned by email through `ADMIN_EMAILS`, for example:

```env
ADMIN_EMAILS=chair@example.com,secretary@example.com
```

Any verified Google account not listed there signs in as a youth user.

## MongoDB Schema

The backend Mongoose models live in `server/src/models`:

- `User`: Google identity, role, barangay, profile, active state
- `YouthProfile`: SK youth registry records
- `Announcement`: official SK posts
- `Event`: scheduled SK events
- `BudgetReport`: transparency reports with numeric amounts
- `Document`: document metadata and future file URLs
- `Message`: youth messages and admin replies
- `ActivityLog`: auditable admin actions

## Render Backend

Use `render.yaml` or create a Render Web Service manually.

- Build command: `npm ci`
- Start command: `npm run start:server`
- Health check path: `/api/health`

Required Render environment variables:

```env
NODE_ENV=production
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=...
CLIENT_URL=https://your-vercel-app.vercel.app
CORS_ORIGINS=https://your-vercel-app.vercel.app
ADMIN_EMAILS=admin@example.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_FOLDER=skids
```

## Vercel Frontend

`vercel.json` is configured for a Vite SPA.

Required Vercel environment variables:

```env
VITE_API_URL=https://your-render-api.onrender.com/api
VITE_GOOGLE_CLIENT_ID=...
```

After deploying Render, update `VITE_API_URL` in Vercel to the Render service URL.

## Scripts

```bash
npm run dev          # frontend dev server
npm run dev:server   # backend dev server
npm run build        # frontend production build
npm run lint         # lint frontend and backend
npm run start:server # backend production start
```
