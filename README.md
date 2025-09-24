 # SIT725-8.3HD- 225404454
This repo contains a Dockerised Node.js (Express + EJS + Passport + Socket.IO) app with MongoDB via Docker Compose.

Prerequisites

Docker Desktop (or Docker Engine + Docker Compose)

1) Environment

Create a file named .env in the project root:

PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://mongo:27017/Wareniex
SESSION_SECRET=replace_with_a_strong_random_secret

2) How to build the image

Using Compose (builds the app image):

docker compose build


Or directly (if you prefer a standalone build):

docker build -t wareniex_app:hd .

3) How to run the container(s)

Recommended (Compose: runs app + mongo together):

docker compose up -d
# view logs
docker compose logs -f app


Stop / remove:

docker compose down
# (optional) also remove MongoDB data volume
docker compose down -v

4) Which port to access

App (HTTP): http://localhost:5000

If you changed the port mapping in docker-compose.yml, use that host port instead.

5) Expected /api/student output

Open: http://localhost:5000/api/student
You should see JSON similar to:

{
  "name": "Sainarayan Rajasekaran",
  "studentId": "2001210"
}

6) Quick verification

App/login page: http://localhost:5000/

Student endpoint: http://localhost:5000/api/student

Health (if enabled): http://localhost:5000/health

Troubleshooting (quick)

.env not found → Ensure a .env file exists in the project root (see step 1).

Mongo connection error → MONGO_URI must be mongodb://mongo:27017/Wareniex when using Compose.

Port already in use → Change the host port mapping in docker-compose.yml (e.g., 5001:5000) and browse http://localhost:5001.
