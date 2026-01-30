# API Gateway – Phase 1

Single entry point for the frontend. Handles **auth (JWT)**, **permissions**, and **routing** to User Service and Notes Service. User and Notes services stay dumb; all cross-cutting concerns live here.

## Run

```bash
bun run dev
```

Copy `.env.example` to `.env` and set `JWT_SECRET`, `USER_SERVICE_URL`, `NOTES_SERVICE_URL` (defaults: 3001, 3002).

## Phase-1 routes

| Method | Path | Auth | Permission | Proxies to |
|--------|------|------|------------|------------|
| POST | `/api/users/register` | No | — | User Service `POST /auth/register` |
| POST | `/api/users/login` | No | — | User Service `POST /auth/login` → Gateway issues JWT |
| GET | `/api/users/profile` | Yes | — | User Service `GET /users/profile` (with `x-user-id`) |
| GET | `/api/notes` | Yes | NOTES_READ | Notes Service `GET /notes?userId=` |
| POST | `/api/notes` | Yes | NOTES_WRITE | Notes Service `POST /notes` (adds `userId`) |
| PUT | `/api/notes/:id` | Yes | NOTES_WRITE | Notes Service `PUT /notes/:id` |
| DELETE | `/api/notes/:id` | Yes | NOTES_DELETE | Notes Service `DELETE /notes/:id` |

## Permissions (Phase-1)

- **USER**: `NOTES_READ`, `NOTES_WRITE`
- **ADMIN**: `NOTES_READ`, `NOTES_WRITE`, `NOTES_DELETE`

## Structure

```
src/
├── config/       # env, service URLs
├── middlewares/  # auth (JWT), permission (role → permissions)
├── proxy/        # user.proxy, notes.proxy
├── routes/       # user.routes, notes.routes
└── utils/        # httpClient (axios instances)
```
