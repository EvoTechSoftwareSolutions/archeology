# Archeology

Archeology is a full-stack web application for exploring Sri Lankan historical and archaeological heritage places. The project includes a public React website with heritage-place pages and interactive province/district map experiences, plus an Express API for authentication and managing provinces, districts, and historical places.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS, Leaflet
- **Backend:** Node.js, Express, TypeScript
- **Database:** MySQL with Prisma ORM
- **Security/API middleware:** Helmet, CORS, cookie-parser, HPP, rate limiting, Zod validation, JWT auth

## Project Structure

```text
archeology/
+-- client/                 # React + Vite frontend
|   +-- public/             # Static images and icons
|   +-- src/
|       +-- assets/         # App images
|       +-- components/     # UI, layout, map, and section components
|       +-- data/           # Local province and district data
|       +-- hooks/          # Map helper hooks
|       +-- layout/         # Public and admin layouts
|       +-- pages/          # Public and admin pages
|       +-- routes/         # React Router setup
|       +-- types/          # Shared frontend types
+-- server/                 # Express + Prisma backend
    +-- prisma/             # Prisma schema and migrations
    +-- src/
        +-- config/         # Environment, database, and JWT config
        +-- controllers/    # Request handlers
        +-- middleware/     # Auth, role, validation, error, and security middleware
        +-- repositories/   # Database access layer
        +-- routes/         # API route definitions
        +-- services/       # Business logic
        +-- types/          # Express/custom type declarations
        +-- utils/          # JWT, hashing, and API error helpers
        +-- validations/    # Zod request schemas
```

## Features

- Public heritage website with pages for places such as Sigiriya, Galle Fort, Gal Viharaya, Ruwanwelisaya, and the Temple of the Tooth
- Interactive Sri Lanka province and district map components
- Public pages for all places, mission, contact, FAQs, privacy policy, and terms
- Admin layout and dashboard route
- REST API for provinces, districts, historical places, and user authentication
- JWT-based authentication with protected profile route
- Role-based admin protection for selected province and district operations
- Prisma data model for users, provinces, districts, historical places, site monographs, and audit logs

## Prerequisites

Install these before running the project:

- Node.js
- npm
- MySQL

## Environment Variables

Create a `.env` file inside `server/`.

```env
PORT=5000
DATABASE_URL="mysql://root:root@localhost:3306/archeology"
JWT_SECRET="replace-with-a-secure-secret"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

The server requires `DATABASE_URL` and `JWT_SECRET`.

## Setup

1. Install frontend dependencies.

```bash
cd client
npm install
```

2. Install backend dependencies.

```bash
cd ../server
npm install
```

3. Create a local MySQL database.

```sql
CREATE DATABASE archeology;
```

Make sure the `DATABASE_URL` in `server/.env` matches your local MySQL username, password, host, port, and database name.

4. Run Prisma migrations.

```bash
npm run prisma:migrate
```

5. Generate the Prisma client.

```bash
npm run prisma:generate
```

## Running the Project

Start the backend API:

```bash
cd server
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Start the frontend:

```bash
cd client
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The backend CORS configuration currently allows requests from `http://localhost:5173`.

## Available Scripts

### Frontend

Run these inside `client/`.

```bash
npm run dev       # Start Vite development server
npm run build     # Build frontend for production
npm run preview   # Preview production build locally
npm run lint      # Run oxlint
```

### Backend

Run these inside `server/`.

```bash
npm run dev              # Start Express server with tsx watch
npm run build            # Compile TypeScript
npm start                # Run compiled server from dist/
npm run prisma:migrate   # Run Prisma migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio
```

## API Overview

Base URL:

```text
http://localhost:5000/api/v1
```

### Health Check

```http
GET /
```

### Auth

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/profile
```

`/profile` requires authentication.

### Provinces

```http
GET    /api/v1/provinces
GET    /api/v1/provinces/:id
POST   /api/v1/provinces
PUT    /api/v1/provinces/:id
DELETE /api/v1/provinces/:id
```

Create, update, and delete province routes require authentication and an admin role.

### Districts

```http
GET    /api/v1/districts
GET    /api/v1/districts/:id
POST   /api/v1/districts
PUT    /api/v1/districts/:id
DELETE /api/v1/districts/:id
```

Create, update, and delete district routes require authentication and an admin role.

### Historical Places

```http
GET    /api/v1/historicalPlace
GET    /api/v1/historicalPlace/:id
POST   /api/v1/historicalPlace
PATCH  /api/v1/historicalPlace/:id
DELETE /api/v1/historicalPlace/:id
```

## Frontend Routes

```text
/                         Home
/temple-of-the-tooth      Temple of the Tooth details
/gal-viharaya             Gal Viharaya details
/sigiriya-rock-fortress   Sigiriya details
/galle-fort               Galle Fort details
/ruwanwelisaya            Ruwanwelisaya details
/all-places               All places
/our-mission              Our mission
/contact-us               Contact
/privacy-policy           Privacy policy
/terms-and-conditions     Terms and conditions
/faqs                     FAQs
/admin                    Admin dashboard
```

## Database Models

The Prisma schema includes:

- `User`
- `Province`
- `District`
- `HistoricalPlace`
- `SiteMonograph`
- `AuditLog`

Relationships connect provinces to districts, districts to historical places, historical places to site monographs and audit logs, and users to audit/verification activity.

## Notes

- The root `package-lock.json` does not define a root workspace package. Install and run the frontend and backend from their own folders.
- The API route name for historical places is currently `/api/v1/historicalPlace`.
- Province update/delete authorization uses `authorize("admin")` in the route file, while other admin routes use `authorize("ADMIN")`. Make sure the stored user role matches the expected casing before relying on admin-only behavior.
