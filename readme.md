# PlacementPro

PlacementPro is a **Node.js + Express** based platform for students to **manage placement documents**, run **AI-powered ATS (Resume) analysis**, and now **track job applications end-to-end** with stage-wise timestamps.

---

## ✅ Features

### 🔐 Authentication
- Signup + Login
- Password hashing with **bcrypt**
- JWT auth via **HTTP-only cookies**
- Protected routes using `restrictMiddleware`

### 📁 Document Management
- Upload documents (stored under user-specific folders)
- View uploaded documents
- Delete documents securely

### 🤖 AI ATS Resume Analyzer
- Upload resume (PDF)
- Provide Job Description
- AI returns:
  - **ATS score (0-100)**
  - **Improvement suggestions**

### 📊 Placement Tracker (NEW)
Track placement journey per company with:
- Stages:
  - Applied
  - Online Assessment Completed
  - Interview Attended
  - HR Round
  - Offer Received
  - Rejected
- **Timestamps/dates** stored per stage
- Manual status updates per company
- Progress/stage indicators in UI
- Filters: All / Active / Rejected / Offer Received

---

## Tech Stack 🛠
- Node.js
- Express.js
- EJS templating
- MongoDB + Mongoose
- Multer + fs for uploads
- JWT + bcrypt
- Groq (Llama) for AI ATS analysis

---

## Project Structure

```text
PlacementPro
│
├── index.js
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   └── docuementHolder.js
│
├── middleware/
│   └── restrictMiddleware.js
│
├── models/
│   ├── userModel.js
│   ├── forgetPassword.js
│   └── placementTracker.js
│
├── views/
│   ├── home.ejs
│   ├── dashboard.ejs
│   ├── documentHolder.ejs
│   ├── uploadATSEJS.ejs
│   ├── linkedinATSAJS.ejs
│   └── placementTracker.ejs
│
└── uploads/
```

---

## Environment Variables
Create a `.env` file in the root folder.

```env
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
MONGODB_URL=your_mongodb_connection_string
```

> Note: Email OTP uses your nodemailer configuration in `controllers/mail.js`.

---

## Installation & Run

### 1) Install dependencies
```bash
npm install
```

### 2) Start MongoDB
Ensure MongoDB is running.

### 3) Run the server
```bash
node index.js
```

or
```bash
nodemon index.js
```

---

## Endpoints 🌐

### Authentication
| Method | Route | Description |
|---|---|---|
| GET | `/auth/login` | Login page |
| POST | `/auth/login` | Login |
| GET | `/auth/signup` | Signup page |
| POST | `/auth/signup` | Create account |
| GET | `/auth/logout` | Logout |

### Dashboard
| Method | Route | Description |
|---|---|---|
| GET | `/dashboard` | Dashboard page |

### Documents
| Method | Route | Description |
|---|---|---|
| GET | `/documents` | Documents manager |
| POST | `/documents/upload` | Upload document |
| POST | `/documents/delete` | Delete document |

### Resume ATS Analyzer
| Method | Route | Description |
|---|---|---|
| GET | `/documents/ATS` | ATS upload page |
| POST | `/documents/ATS/upload` | Upload resume + analyze |

### LinkedIn Optimizer
| Method | Route | Description |
|---|---|---|
| GET | `/documents/linkedin` | LinkedIn ATS page |
| POST | `/documents/linkedin/Upload` | Upload profile + analyze |

### Placement Tracker (NEW)
| Method | Route | Description |
|---|---|---|
| GET | `/documents/placement-tracker` | Placement tracker UI + filters |
| POST | `/documents/placement-tracker/update-status` | Add company + update stage/timestamp |
| POST | `/documents/placement-tracker/delete-application` | Delete company entry |

---

## Placement Tracker Stage Model
Stages are stored per company as:
- `status` (current stage)
- `stages[stageKey].statusDate` (timestamp per stage)

Configured stages:
- `applied`
- `onlineAssessmentCompleted`
- `interviewAttended`
- `hrRound`
- `offerReceived`
- `rejected`

---

## Security Notes 🔒
- All protected endpoints use `restrictMiddleware`
- JWT stored in **HTTP-only cookies**
- File deletion checks path belongs to user upload directory

---

## Future Improvements 🚧
- Role-based admin view
- Multiple resumes per job role
- Drag-and-drop stage ordering
- Company details expansion (job link, location, salary)
- Resume stage comparisons and history

---

## Author
**Srinivas Swaroop**

