<div align="center">

# 🔌 Notes API

**A clean RESTful notes service built with Express 5 and MongoDB, organised in a layered routes → controllers → models structure.**

[![CI](https://github.com/mahamed7/notes-api/actions/workflows/ci.yml/badge.svg)](https://github.com/mahamed7/notes-api/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

</div>

---

## Overview

This is the back end for my React Native lab apps. It exposes full **CRUD** for notes, stores them in **MongoDB Atlas**, and handles bad input with clear status codes instead of crashing.

## API reference

Base URL: `http://localhost:3000/api/notes`

| Method | Endpoint | Body | Success | Errors |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | none | `200` array of notes | |
| `GET` | `/:id` | none | `200` note | `404` unknown or malformed id |
| `POST` | `/` | `{ "title": "Revise chapter 2" }` | `201` created note | `400` title missing |
| `PUT` | `/:id` | `{ "title"?: string, "done"?: boolean }` | `200` updated note | `400` empty body, `404` not found |
| `DELETE` | `/:id` | none | `200` `{ "message": "Note deleted" }` | `404` not found |

**Note model**

```json
{
  "_id": "6731a5f2c9e7b2a1f0d4e8c1",
  "title": "Revise chapter 2",
  "done": false,
  "createdAt": "2026-11-03T09:12:44.120Z",
  "updatedAt": "2026-11-03T09:12:44.120Z"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Call the supervisor"}'
```

## Architecture

```
notes-api/
├── server.js                     # app setup, middleware order, DB connection, start-up
├── routes/notes.js               # URL → controller mapping only (express.Router)
├── controllers/notesController.js# one function per endpoint: validate, query, respond
├── models/Note.js                # Mongoose schema (title required, done default false, timestamps)
└── middleware/
    ├── logger.js                 # logs method, URL, status and response time
    └── errorHandler.js           # one place that turns thrown errors into JSON responses
```

**How it is designed**

- **Separation of concerns.** Routes know nothing about the database. Controllers know nothing about URLs. The model owns validation.
- **Safe id handling.** `mongoose.isValidObjectId` turns a malformed id like `/api/notes/123` into a clean `404` instead of a `CastError` 500.
- **Centralised errors.** Express 5 forwards errors from `async` handlers automatically, so `errorHandler` is the single place that formats failures.
- **Request logging.** The logger runs on `res.finish`, so it records the real status code and how long each request took.
- **Config through the environment.** The database URI comes from `.env` and is never committed.

## Getting started

**Prerequisites:** Node.js 20 or later, and a MongoDB connection string (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works).

```bash
git clone https://github.com/mahamed7/notes-api.git
cd notes-api
npm install
cp .env.example .env      # then set MONGODB_URI
npm start                 # Server is running on http://localhost:3000
```

Try it with Postman, Thunder Client or the `curl` example above.

## Roadmap

- [ ] Request validation with a schema library (e.g. Zod)
- [ ] Pagination and filtering (`?done=true&page=2`)
- [ ] Integration tests with Jest, Supertest and an in-memory MongoDB
- [ ] JWT authentication so each user sees only their own notes
- [ ] OpenAPI / Swagger documentation

## Author

**Saabir Dahir Mahamud** · [Portfolio](https://mahamed7.github.io/Portfolio/) · [GitHub](https://github.com/mahamed7)

Released under the [MIT License](LICENSE).
