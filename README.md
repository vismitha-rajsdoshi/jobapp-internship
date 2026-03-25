# CareerArch - Job Application Platform

A full-stack web application for job seekers to browse and apply for jobs, and for administrators to manage job postings.

## Features

### For Job Seekers:

- Browse available job listings with filtering by company, location, and job type
- Apply to jobs with one-click application
- View applied jobs history
- User authentication and account management

### For Administrators:

- Dashboard to manage job postings
- Create, view, edit, and delete job listings
- Secure admin access (granted to emails ending with @arnifi.com)

## Tech Stack

### Backend:

- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** for authentication
- **bcrypt** for password hashing
- Security middleware (Helmet, CORS, Rate Limiting)

### Frontend:

- **React** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

## Deployed Applications

### Frontend
- **Live Application**: [CareerArch Job Application Platform](https://jobapp-internship-app.vercel.app/login) (Vercel)

### Backend API
- **API Base URL**: https://jobapp-internship.onrender.com
- **API Documentation**: See API Endpoints section below

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd jobapp-internship
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Setup

### Database Setup

1. Create a PostgreSQL database
2. Update the database connection in `backend/.env` file:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

3. Run the database initialization script:
   ```bash
   cd backend
   node initDB.js
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `FRONTEND_URL`: Frontend application URL (default: http://localhost:5173)
- `PORT`: Backend server port (default: 5000)

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev  # For development with nodemon
# or
npm start    # For production
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Application

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Jobs

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job (Admin only)
- `PUT /api/jobs/:id` - Update job (Admin only)
- `DELETE /api/jobs/:id` - Delete job (Admin only)
- `POST /api/jobs/:id/apply` - Apply to a job (Authenticated users)

### Applications

- `GET /api/applications` - Get user's applied jobs

## Project Structure

```
jobapp-internship/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── db.js
│   ├── init.sql
│   ├── initDB.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InteractiveBg.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AppliedJobs.jsx
│   │   │   ├── JobsList.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── store/
│   │   │   ├── authSlice.js
│   │   │   ├── index.js
│   │   │   └── jobsSlice.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
