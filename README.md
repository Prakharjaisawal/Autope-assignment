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
git clone https://github.com/Prakharjaisawal/Autope-assignment.git
cd Autope-assignment

## create .env and update variable as given in .env.example
Copy-Item backend/.env.example -Destination backend/.env
Copy-Item frontend/.env.example -Destination frontend/.env



## Build docker

docker compose up --build


## running port
Backend should be at: http://localhost:5000

Frontend should be at: http://localhost:3000



##  Option 2: Running Without Docker 


### 1. Clone the Repo
```bash
git clone https://github.com/Prakharjaisawal/Autope-assignment.git
cd Autope-assignment


## 2 create .env and update variable as given in .env.example
Copy-Item backend/.env.example -Destination backend/.env
Copy-Item frontend/.env.example -Destination frontend/.env



## 3 start fronted
cd frontend
npm install
npm start

## 4 start backend

open new terminaal and go to Autope-assignment\
cd backend
npm install
npm run dev
