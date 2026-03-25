CareerArch — Job Application Platform

A full-stack web application that enables job seekers to explore and apply for jobs, while allowing administrators to manage job postings efficiently.

---

## 🌐 Live Demo

* 🔗 **Frontend**: [https://jobapp-internship-app.vercel.app/login](https://jobapp-internship-app.vercel.app/login)
* 🔗 **Backend API**: [https://jobapp-internship.onrender.com](https://jobapp-internship.onrender.com)

---

## ✨ Features

### 👨‍💻 For Job Seekers

* Browse job listings with filters (company, location, job type)
* One-click job application
* Track applied jobs
* Secure authentication system

### 🛠️ For Administrators

* Admin dashboard to manage jobs
* Create, edit, and delete job postings
* Role-based access (emails ending with `@arnifi.com`)

---

## 🧱 Tech Stack

### Backend

* Node.js + Express.js
* PostgreSQL
* JWT Authentication
* bcrypt (password hashing)
* Helmet, CORS, Rate Limiting

### Frontend

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* React Router
* Axios

---

## 📸 Screenshots

> *(Add your screenshots in a `/screenshots` folder and update paths below)*

```
/screenshots/login.png
/screenshots/dashboard.png
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd jobapp-internship
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

> 💡 You can create a `.env.example` file for reference:

```
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
PORT=
```

---

## 🗄️ Database Setup

1. Create a PostgreSQL database
2. Run the initialization script:

```bash
cd backend
node initDB.js
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
# or
npm start
```

Backend runs on:
👉 `http://localhost:5000`

---

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173`

---

## 🔑 Demo Credentials *(Optional)*

> *(Only include if safe for public use)*

**Admin**

```
Email: admin@arnifi.com
Password: password123
```

**User**

```
Email: user@example.com
Password: password123
```

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/signup` — Register user
* `POST /api/auth/login` — Login user

### Jobs

* `GET /api/jobs` — Get all jobs
* `POST /api/jobs` — Create job *(Admin only)*
* `PUT /api/jobs/:id` — Update job *(Admin only)*
* `DELETE /api/jobs/:id` — Delete job *(Admin only)*
* `POST /api/jobs/:id/apply` — Apply to job

### Applications

* `GET /api/applications` — Get applied jobs

---

## 🗂️ Project Structure

```
jobapp-internship/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── init.sql
│   ├── initDB.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## 🔐 Admin Access

Users with email addresses ending in:

```
@arnifi.com
```

are automatically granted **admin privileges**.

---

## ⚠️ Notes

* Ensure PostgreSQL is running before starting backend
* Run `initDB.js` only once (initial setup)
* Add `.env` to `.gitignore`

---

## 🚀 Future Improvements

* Resume upload support
* Email notifications
* Advanced search & pagination
* Role-based access control (RBAC)
* Job bookmarking feature

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch

   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit changes
4. Push and open a Pull Request


