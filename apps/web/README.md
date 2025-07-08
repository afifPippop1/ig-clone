# 📸 IG Clone Monorepo

A simple Instagram clone built with a monorepo structure, using Prisma, Express, PostgreSQL, and MinIO.

---

## prerequisite

- node
- docker
- pnpm

## 🧱 Tech Stack

- **pnpm workspaces** — monorepo setup
- **Prisma** — ORM for PostgreSQL
- **PostgreSQL 17** — relational DB (via Docker)
- **MinIO** — S3-compatible object storage (via Docker)
- **Express** — server backend
- **tRPC** — typesafe API layer
- **Zod** — schema validation
- **TSX** — for dev-friendly TypeScript runtime
- **React (Remix)** — frontend app

---

## 📁 Monorepo Structure

```
├── apps/
│   ├── server/ # Backend server
│   └── web/ # Frontend client
├── packages/
│   └── database/ # Prisma schema & client
├── docker-compose.yaml # DB & MinIO setup
├── pnpm-workspace.yaml # Workspace config
└── package.json # Root scripts
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup .env

a. Server .env example

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?connection_limit=1&sslmode=disable"

BUCKET_URL="http://localhost:9000"
BUCKET_ACCESS_KEY_ID="minioadmin"
BUCKET_SECRET_ACCESS_KEY="minioadmin"
BUCKET_REGION="us-east-1"
```

b. Web .env example

```
COOKIE_SECRET='cookie-secret'
BACKEND_URL='http://localhost:4000'
```

c. Database .env example

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?connection_limit=1&sslmode=disable"
```

### 3. Run the app

a. Run docker file

```
docker compose up -d
```

b. Run app in dev mode

```
pnpm dev
```

### Common Script

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm dev`            | Watch everything and run dev servers |
| `pnpm build:server`   | Build the backend                    |
| `pnpm build:database` | Build database client/types          |
| `pnpm db:migrate`     | Run Prisma migrations                |
| `pnpm db:generate`    | Generate Prisma client               |
| `pnpm db:studio`      | Launch Prisma Studio                 |

### 🧪 Tips

Access MinIO UI at: http://localhost:9001

Access Prisma Studio:

```
pnpm db:studio
```
