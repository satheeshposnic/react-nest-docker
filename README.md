# Docker-nest-react

This project consists of a **frontend** (React with MUI) and a **backend** (NestJS) with JWT authentication and a sales managementsystem.

## Features

- **Frontend:** React with Material-UI, using React Router for navigation.
- **Backend:** NestJS with MongoDB, implementing JWT authentication.
- **Dockerized:** Runs using Docker containers for both frontend and backend.
- **Swagger API Documentation:** Available for backend routes.

---

## Setup Instructions

### Prerequisites
- Node.js (>=18)
- Docker & Docker Compose
- MongoDB (or use MongoDB Atlas)

### Clone the Repository
```sh
git clone (https://github.com/satheeshposnic/react-nest-docker.git)
cd react-nest-docker
```

## Running with Docker

### Build and Start Containers
```sh
docker-compose up --build
```

### Stop Containers
```sh
docker-compose down
```

---

## Backend Setup

### Install Dependencies
```sh
cd backend
npm install
```

### Environment Variables (`.env`)
Create a `.env` file in the `backend` folder:
```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/database
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=3600s
```

### Run the Backend
```sh
npm run start
```

### API Documentation (Swagger)
Once the backend is running, visit:
```
http://localhost:5000/api-doc
```

---

## Frontend Setup

### Install Dependencies
```sh
cd frontend
npm install
```

`frontend/src/services/Api.js`:
const API_BASE_URL = "http://localhost:5000";
```

### Run the Frontend
```sh
npm start
```

---

Once running, the frontend is available at:
```
http://localhost:3000
```

The backend API is available at:
```
http://localhost:5000
```

---

## API Routes

### Sales Endpoints (`/sales`)
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| GET    | `/sales`    | Get all sales with pagination & search |
| GET    | `/sales/:id` | Get a specific sale by ID |
| POST   | `/sales`    | Create a new sale |
| PUT    | `/sales/:id` | Update a sale by ID |
| DELETE | `/sales/:id` | Delete a sale by ID |

Swagger provides more details at `http://localhost:5000/api-doc`.

---

## Authentication
- Uses **JWT-based authentication**.
- Include `Authorization: Bearer <token>` in API requests.

### Sample Authentication Request
#### Login (`POST /auth/login`)
```json
{
    "username": "admin",
    "password": "admin"
}
```
#### Sample JWT Response
```json
{
    "access_token": "your-jwt-token"
}
```

---

## Folder Structure

### Backend
```
backend/
├── src/
│   ├── auth/        # Authentication module
│   ├── sales/       # Sales module
│   ├── main.ts      # Entry point
│   ├── app.module.ts # Main module
├── Dockerfile       # Backend Docker setup
├── .env     # Sample environment file
```

### Frontend
```
frontend/
├── src/
│   ├── modal/       # Sales-related add,edit,view modal pages
│	├── sales/       # Sales-related pages
│	├── services/       # Api related page
│	├── table/       # Sales-table page
│   ├── App.js       # Main React app
├── Dockerfile       # Frontend Docker setup
```

---
