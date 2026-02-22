# HealthApp Demo

A production-grade full-stack healthcare application built with Node.js + Express, TypeScript, Drizzle ORM, PostgreSQL, and React.

## Stack

| Layer    | Technology |
|----------|-----------|
| Backend  | Node.js, Express 5, TypeScript (strict) |
| ORM      | Drizzle ORM + PostgreSQL 15 |
| Auth     | JWT + bcryptjs, RBAC middleware |
| Validation | Zod 4 |
| Frontend | React + Vite 7, TypeScript |
| HTTP Client | Axios + React Router v6 |
| Container | Docker + Docker Compose |

## Project Structure

```
healthapp-demo/
├── backend/          # Express API
│   ├── src/
│   │   ├── config/   # env validation (envalid)
│   │   ├── db/       # Drizzle schema + migrations
│   │   ├── middlewares/
│   │   ├── modules/  # users / patients / doctors
│   │   └── utils/
│   ├── .env.example
│   └── Dockerfile
├── frontend/         # React SPA
│   ├── src/
│   │   ├── api/      # Axios client
│   │   ├── context/  # Auth context
│   │   ├── components/
│   │   └── pages/
│   ├── .env.example
│   └── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Option A — Docker Compose (recommended)

```bash
# 1. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Start everything (DB + migrations + backend + frontend)
docker compose up --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:4000 |
| Postgres | localhost:5432 |

### Option B — Local Dev

**Backend**
```bash
cd backend
cp .env.example .env
# Edit DATABASE_URL to use localhost instead of db
npm install
npx drizzle-kit migrate
npm run dev
```

**Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API Overview

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/users/register` | Public |
| POST | `/api/users/login` | Public |
| GET  | `/api/users/me` | Authenticated |
| GET  | `/api/users` | Admin only |

### Patients
| Method | Endpoint | Access |
|--------|----------|--------|
| POST   | `/api/patients` | Authenticated |
| GET    | `/api/patients/me` | Patient (own) |
| GET    | `/api/patients` | Admin / Doctor |
| GET    | `/api/patients/:id` | Admin / Doctor |
| PATCH  | `/api/patients/:id` | Admin / Doctor |
| DELETE | `/api/patients/:id` | Admin only |

### Doctors
| Method | Endpoint | Access |
|--------|----------|--------|
| POST   | `/api/doctors` | Admin only |
| GET    | `/api/doctors` | Authenticated |
| GET    | `/api/doctors/me` | Doctor (own) |
| GET    | `/api/doctors/:id` | Authenticated |
| PATCH  | `/api/doctors/:id` | Admin only |
| DELETE | `/api/doctors/:id` | Admin only |

## Roles

- **admin** — Full access to all resources
- **doctor** — Read access to patients; own doctor profile
- **patient** — Own patient profile only

## Environment Variables

See [`backend/.env.example`](backend/.env.example) and [`frontend/.env.example`](frontend/.env.example).
