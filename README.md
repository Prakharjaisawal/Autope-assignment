#  Cat Note App

A full-stack application for managing cat-related notes using MERN stack, Dockerized for easy deployment.

##  Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

---

##  Project Structure

##  Setup Instructions
cat_note_app/ --> backend/--> Dockerfile
                          -->.env.example
                          --> ... Node.js API code
             --> frontend/--> Dockerfile
                          -->.env.example
                          --> ... React app
             --> docker-compose.yml
             --> gitiignore
             --> README.md


### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/cat_note_app.git
cd cat_note_app

## create .env and update variable as given in .env.example
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env


## Build docker

docker compose up --build


## running port
Backend should be at: http://localhost:5000

Frontend should be at: http://localhost:3000



##  Option 2: Running Without Docker 


### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/cat_note_app.git
cd cat_note_app


## 2 create .env and update variable as given in .env.example
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env


## 3 start fronted
cd frontend
npm install
npm start

## 4 start backend
cd backend
npm install
npm run dev