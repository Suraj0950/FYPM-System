# FYPM-System (Final Year Project Management System)

A full-stack web application designed to manage Final Year Projects in colleges.
The system allows **students, teachers, and admins** to collaborate, submit projects, review progress, and manage academic project workflows efficiently.

---

## 🚀 Features

### 👨‍🎓 Student

* Register and login securely
* Submit final year project proposals
* Upload project documents
* Track project status and feedback
* View assigned supervisor

### 👨‍🏫 Teacher

* Review submitted projects
* Approve or reject project proposals
* Provide feedback to students
* Monitor student progress

### 👨‍💼 Admin

* Manage students and teachers
* Assign supervisors to projects
* Monitor overall project statistics
* Manage system users

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios
* Recharts

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JWT (JSON Web Token)

---

## 📂 Project Structure

```
FYPM-System
│
├── client                 # Frontend (React)
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   └── App.jsx
│
├── server                 # Backend (Node + Express)
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/Suraj0950/FYPM-System.git
```

```
cd FYPM-System
```

---

### 2️⃣ Install dependencies

Backend

```
cd server
npm install
```

Frontend

```
cd client
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside **server**

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

### 4️⃣ Run the application

Backend

```
npm run dev
```

Frontend

```
npm run dev
```

---

## 🌐 Application URLs

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:4000
```

---

## 📊 Future Improvements

* Email notifications
* Project evaluation system
* File version management
* Chat system between students and supervisors
* AI-based project recommendation

---

## 👨‍💻 Author

**Suraj Kumar**

GitHub:
https://github.com/Suraj0950

---

## ⭐ Support

If you like this project, please ⭐ the repository on GitHub.
