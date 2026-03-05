# PlacementPro 

PlacementPro is a **Node.js + Express based document and resume management platform** designed to help students organize their placement documents and analyze resumes using **AI-powered ATS scoring**.

The platform allows users to:

* Securely authenticate
* Upload and manage personal documents
* Store files in user-specific folders
* Analyze resumes against job descriptions using AI
* Get ATS score and improvement suggestions

---

# Features ✨

### 🔐 Authentication System

* Secure login and signup
* Password hashing using **bcrypt**
* Session authentication using **JWT**
* Token stored in **HTTP-only cookies**

### 📁 Document Manager

* Upload documents
* Each user gets a **separate storage folder**
* View uploaded documents
* Delete documents securely

### 🤖 AI Resume ATS Analyzer

* Upload resume (PDF)
* Enter job description
* AI analyzes resume
* Generates:

  * ATS score (out of 100)
  * Improvement suggestions

### 📊 Dashboard

* Personalized user dashboard
* Access all platform features

---

# Tech Stack 🛠

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

### File Handling

* Multer
* File System (fs)

### AI Integration

* Groq API
* Llama 3.1 model

### Templating

* EJS

---

# Project Structure 📂

```
PlacementPro
│
├── routes
│   ├── auth.js
│   ├── dashboard.js
│   └── documentHolder.js
│
├── middleware
│   └── restrictMiddleware.js
│
├── models
│   └── userModel.js
│
├── uploads
│   └── userId folders
│
├── views
│   ├── login_get.ejs
│   ├── register_get.ejs
│   ├── dashboard.ejs
│   ├── documentHolder.ejs
│   └── uploadATSEJS.ejs
│
├── server.js
├── package.json
└── README.md
```

---

# Installation ⚙️

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/PlacementPro.git
cd PlacementPro
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory.

```
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

---

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally.

```
mongodb://localhost:27017/placementPro
```

---

### 5️⃣ Run the Application

```bash
node server.js
```

or using nodemon

```bash
nodemon server.js
```

---

# API Routes 🌐

## Authentication

| Method | Route          | Description       |
| ------ | -------------- | ----------------- |
| GET    | `/auth/login`  | Login page        |
| POST   | `/auth/login`  | Login user        |
| GET    | `/auth/signup` | Signup page       |
| POST   | `/auth/signup` | Register new user |
| GET    | `/auth/logout` | Logout user       |

---

## Dashboard

| Method | Route        |
| ------ | ------------ |
| GET    | `/dashboard` |

---

## Document Management

| Method | Route               |
| ------ | ------------------- |
| GET    | `/documents`        |
| POST   | `/documents/upload` |
| POST   | `/documents/delete` |

---

## Resume ATS Analyzer

| Method | Route                   |
| ------ | ----------------------- |
| GET    | `/documents/ATS`        |
| POST   | `/documents/ATS/upload` |

---

# Resume ATS Workflow 🤖

1️⃣ User uploads resume (PDF)

2️⃣ Resume text extracted using

```
pdf-parse
```

3️⃣ Job description provided by user

4️⃣ AI model analyzes resume vs job description

5️⃣ Returns

```
{
 "score": number out of 100,
 "suggestions": []
}
```

---

# Security Features 🔒

* Password hashing using bcrypt
* JWT authentication
* HTTP-only cookies
* User specific document folders
* Protected routes with middleware

---

# Future Improvements 🚧

* Google OAuth login
* Resume keyword highlighting
* File preview
* Resume version history
* ATS keyword matching
* Deployment (AWS / Render)

---

# Screenshots 📷

You can add screenshots here later.

Example:

```
Dashboard UI
Document Manager
ATS Analyzer
```

---

# Contributing 🤝

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new branch
3. Make changes
4. Submit a pull request

---

# License 📜

This project is licensed under the MIT License.

---

# Author 👨‍💻

**Srinivas Swaroop**

Undergraduate
VIT AP University


