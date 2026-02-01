# Me-API Playground

> A personal profile API playground with search, filtering, and JWT authentication built for the Predusk Technology Software & AI Developer Internship assessment.

## 🔗 Live URLs

- **Frontend**: https://profile-api-playground.vercel.app
- **Backend API**: https://profile-api-playground-kl5n.onrender.com
- **Health Check**: https://profile-api-playground-kl5n.onrender.com/health
- **Github repo** : https://github.com/Sufalthakre18/profile-api-playground

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Database**: MongoDB Atlas (Cloud NoSQL Database)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Module System**: ES Modules
- **Deployment**: Render (Free Tier)

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Deployment**: Vercel

### Development Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Code Editor**: VS Code

---

## 🏗️ Architecture

```
┌─────────────────────────┐
│   Next.js Frontend      │
│   (TypeScript + Tailwind)│
│   Deployed on Vercel    │
└───────────┬─────────────┘
            │
            │ HTTP/REST API
            │ (CORS Enabled)
            │
┌───────────▼─────────────┐
│   Express.js Backend    │
│   + JWT Authentication  │
│   Deployed on Render    │
└───────────┬─────────────┘
            │
            │ MongoDB Driver
            │
┌───────────▼─────────────┐
│   MongoDB Atlas         │
│   (Cloud Database)      │
│   2 Collections:        │
│   - profiles            │
│   - users               │
└─────────────────────────┘
```

**Data Flow:**
1. User interacts with Next.js frontend
2. Frontend makes API requests to Express backend
3. Backend validates JWT tokens (for protected routes)
4. Backend queries MongoDB Atlas
5. Response sent back to frontend
6. Frontend updates UI

---

## 📊 Database Structure

### Collection 1: `profiles`

Stores developer portfolio information (single profile system).

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  
  skills: [String],
  
  projects: [{
    title: String,
    description: String,
    links: {
      github: String,
      live: String
    }
  }],
  
  work: [{
    company: String,
    role: String,
    duration: String
  }],
  
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email`: Unique index for fast lookups

**Sample Document:**
```javascript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sufal Thakre",
  "email": "sufalthakre4@gmail.com",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "projects": [
    {
      "title": "GigFlow - Freelance Marketplace",
      "description": "Full-stack marketplace with React & Node.js",
      "links": {
        "github": "https://github.com/...",
        "live": "https://..."
      }
    }
  ],
  "links": {
    "github": "https://github.com/Sufalthakre18",
    "linkedin": "https://linkedin.com/in/sufal-thakre",
    "portfolio": "https://my-portfolio.vercel.app"
  },
  "createdAt": "2026-02-01T10:00:00.000Z",
  "updatedAt": "2026-02-01T10:00:00.000Z"
}
```

### Collection 2: `users`

Stores authenticated users for managing profile updates.

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, minLength: 6, bcrypt hashed),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email`: Unique index

**Password Handling:**
- Passwords are hashed using bcryptjs before storing
- Salt rounds: 10
- Original passwords never stored in database

### How Tasks Are Linked to Users

**User-Profile Relationship:**
- This is a **single-profile system** (showcasing my portfolio)
- Multiple users can authenticate (for demonstration)
- All users share access to the same profile
- Only **authenticated users** can create/update/delete profile
- Public users can view profile without authentication

**Why this design?**
- Assignment requires: "Build a playground that stores **your own information**"
- Not a multi-user profile system
- Authentication demonstrates security best practices
- Write operations are protected with JWT

---

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Health Check
```bash
GET /health

Response:
{
  "status": "OK",
  "message": "Server is running"
}
```

#### 2. Get Profile
```bash
GET /api/profile

Response: {
  "_id": "...",
  "name": "Sufal Thakre",
  "email": "sufalthakre4@gmail.com",
  "skills": [...],
  "projects": [...],
  ...
}
```

#### 3. Get Projects (with optional filter)
```bash
# Get all projects
GET /api/projects

# Filter by skill
GET /api/projects?skill=javascript

Response: [
  {
    "title": "Project Name",
    "description": "...",
    "links": { "github": "...", "live": "..." }
  }
]
```

#### 4. Get Top 5 Skills
```bash
GET /api/skills/top

Response: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"]
```

#### 5. Search Profile
```bash
GET /api/search?q=react

Response: {
  "skills": ["React"],
  "projects": [
    { "title": "React Project", ... }
  ]
}
```

### Protected Endpoints (Require JWT Token)

**Authentication Header Required:**
```
Authorization: Bearer <jwt_token>
```

#### 1. Register User
```bash
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}

Response:
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "secure123"
}

Response:
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### 4. Create Profile
```bash
POST /api/profile
Authorization: Bearer <token>
Content-Type: application/json

Body: {
  "name": "...",
  "email": "...",
  "skills": [...],
  ...
}
```

#### 5. Update Profile
```bash
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

Body: {
  "name": "Updated Name",
  "skills": ["New", "Skills"]
}
```

#### 6. Delete Profile
```bash
DELETE /api/profile
Authorization: Bearer <token>

Response: {
  "message": "Profile deleted successfully"
}
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Git installed
- Code editor (VS Code recommended)

### Backend Setup

1. **Clone repository**
```bash
git clone https://github.com/Sufalthakre18/profile-api-playground.git
cd profile-api-playground/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/profile-api?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
NODE_ENV=development
```

4. **Start server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

**Note:** Database auto-seeds on first run with:
- Admin user (email: sufalthakre4@gmail.com, password: admin123)
- Complete profile with projects, skills, education

### Frontend Setup

1. **Navigate to frontend**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production (`.env.production`):
```env
NEXT_PUBLIC_API_URL=https://profile-api-playground-kl5n.onrender.com
```

4. **Start development server**
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

5. **Build for production**
```bash
npm run build
npm start
```

---

## 📮 Sample API Calls

### Using cURL

```bash
# 1. Health Check
curl https://profile-api-playground-kl5n.onrender.com/health

# 2. Get Profile
curl https://profile-api-playground-kl5n.onrender.com/api/profile

# 3. Search
curl "https://profile-api-playground-kl5n.onrender.com/api/search?q=javascript"

# 4. Filter Projects by Skill
curl "https://profile-api-playground-kl5n.onrender.com/api/projects?skill=react"

# 5. Get Top Skills
curl https://profile-api-playground-kl5n.onrender.com/api/skills/top

# 6. Register User
curl -X POST https://profile-api-playground-kl5n.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# 7. Login
curl -X POST https://profile-api-playground-kl5n.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sufalthakre4@gmail.com","password":"admin123"}'

# 8. Update Profile (use token from login)
curl -X PUT https://profile-api-playground-kl5n.onrender.com/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

### Using Postman

**Postman Collection:**
```json
{
  "info": {
    "name": "Profile API Playground",
    "description": "API collection for Predusk assessment"
  },
  "variable": [
    {
      "key": "BASE_URL",
      "value": "https://profile-api-playground-kl5n.onrender.com"
    },
    {
      "key": "TOKEN",
      "value": "",
      "description": "JWT token from login/register"
    }
  ],
  "item": [
    {
      "name": "Public Routes",
      "item": [
        {
          "name": "Health Check",
          "request": {
            "method": "GET",
            "url": "{{BASE_URL}}/health"
          }
        },
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "url": "{{BASE_URL}}/api/profile"
          }
        },
        {
          "name": "Search",
          "request": {
            "method": "GET",
            "url": "{{BASE_URL}}/api/search?q=react"
          }
        },
        {
          "name": "Get Projects",
          "request": {
            "method": "GET",
            "url": "{{BASE_URL}}/api/projects?skill=javascript"
          }
        },
        {
          "name": "Top Skills",
          "request": {
            "method": "GET",
            "url": "{{BASE_URL}}/api/skills/top"
          }
        }
      ]
    },
    {
      "name": "Auth Routes",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@test.com\",\n  \"password\": \"test123\"\n}"
            },
            "url": "{{BASE_URL}}/api/auth/register"
          }
        },
        {
          "name": "Login",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "var jsonData = pm.response.json();",
                  "pm.collectionVariables.set(\"TOKEN\", jsonData.token);"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"sufalthakre4@gmail.com\",\n  \"password\": \"admin123\"\n}"
            },
            "url": "{{BASE_URL}}/api/auth/login"
          }
        },
        {
          "name": "Get Me",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{TOKEN}}"
              }
            ],
            "url": "{{BASE_URL}}/api/auth/me"
          }
        }
      ]
    },
    {
      "name": "Protected Routes",
      "item": [
        {
          "name": "Update Profile",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{TOKEN}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Name\",\n  \"skills\": [\"JavaScript\", \"TypeScript\"]\n}"
            },
            "url": "{{BASE_URL}}/api/profile"
          }
        }
      ]
    }
  ]
}
```

---

## 🔐 Authentication Flow

### How JWT Authentication Works

1. **User Registration/Login**
   - User provides email and password
   - Backend validates credentials
   - Backend generates JWT token (expires in 7 days)
   - Token includes user ID in payload

2. **Token Storage**
   - Frontend stores token in `localStorage`
   - Token persists across browser sessions

3. **Making Authenticated Requests**
   - Frontend includes token in Authorization header
   - Format: `Authorization: Bearer <token>`
   - Backend verifies token signature
   - Backend extracts user ID from token
   - Request proceeds if valid

4. **Token Validation**
   - Middleware checks Authorization header
   - Verifies token with JWT secret
   - Fetches user from database
   - Attaches user to request object
   - Proceeds to route handler

### Test Credentials
```
Email: sufalthakre4@gmail.com
Password: admin123
```

---

## 🎯 Features Implemented

### Core Requirements (Track A) ✅

**Backend & API:**
- [x] Express.js REST API
- [x] Profile CRUD endpoints (create/read/update)
- [x] Query endpoints (filter by skill, search, top skills)
- [x] Health check endpoint
- [x] Proper error handling

**Database:**
- [x] MongoDB Atlas integration
- [x] Profile schema with all required fields
- [x] Auto-seeding with real data
- [x] Proper indexes for performance

**Frontend:**
- [x] Next.js with TypeScript
- [x] Minimal UI with Tailwind CSS
- [x] Search by skill functionality
- [x] List projects with filtering
- [x] View complete profile
- [x] Responsive design

**Hosting & Docs:**
- [x] Backend deployed on Render
- [x] Frontend deployed on Vercel
- [x] Working live URLs
- [x] Complete README with architecture
- [x] Database schema documentation
- [x] API endpoint documentation
- [x] Sample cURL and Postman examples

### Nice-to-Have Features ✅

- [x] **JWT Authentication** for write operations
- [x] **Bcrypt** password hashing
- [x] **Auto-seeding** on first deployment
- [x] **Loading states** in UI
- [x] **Error handling** with user-friendly messages
- [x] **TypeScript** for type safety
- [x] **ES Modules** for modern code
- [x] **CORS** properly configured
- [x] **Environment variables** for security
- [x] **Git** with meaningful commits

---

## 📁 Project Structure

```
profile-api-playground/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── auth.controller.js       # Auth logic (register/login)
│   │   └── profile.controller.js    # Profile CRUD logic
│   │
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT verification
│   │
│   ├── models/
│   │   ├── User.js                  # User schema + password methods
│   │   └── Profile.js               # Profile schema
│   │
│   ├── routes/
│   │   ├── auth.routes.js           # Auth endpoints
│   │   └── profile.routes.js        # Profile endpoints
│   │
│   ├── seedOnce.js                  # Auto-seed script
│   ├── server.js                    # Express app entry
│   ├── .env                         # Environment variables (gitignored)
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx             # Login/Register page
│   │   ├── layout.tsx               # Root layout with Navbar
│   │   ├── page.tsx                 # Home page (main UI)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Navbar.tsx               # Navigation component
│   │   ├── ProfileCard.tsx          # Profile info display
│   │   ├── ProjectsList.tsx         # Projects list
│   │   ├── SkillsGrid.tsx           # Skills display with filters
│   │   ├── SearchBar.tsx            # Search component
│   │   ├── Loading.tsx              # Loading spinner
│   │   ├── AdminEditButton.tsx      # Edit button (auth only)
│   │   └── EditProfileModal.tsx     # Edit modal
│   │
│   ├── lib/
│   │   ├── api.ts                   # API client functions
│   │   └── auth.ts                  # Auth utilities
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   │
│   ├── .env.local                   # Local environment
│   ├── .env.production              # Production environment
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                        # This file
```

---

## ⚠️ Known Limitations

### 1. Single Profile System
- Designed for one profile (developer portfolio)
- Multiple users can authenticate, but share same profile
- Not suitable for multi-tenant systems

### 2. No Pagination
- All projects/skills load at once
- For 100+ projects, pagination recommended
- Future: Implement cursor-based pagination

### 3. Basic Search
- Client-side substring matching only
- Case-insensitive but requires exact substring
- No fuzzy search or typo tolerance
- Future: Implement full-text search with MongoDB Atlas Search

### 4. No Rate Limiting
- API has no rate limits
- Vulnerable to abuse in production
- Future: Add express-rate-limit middleware

### 5. Free Tier Hosting Limitations
- Render: Cold starts (30s delay after inactivity)
- Vercel: Build time limits on free tier
- MongoDB Atlas: 512MB storage limit

---

## 🐛 Troubleshooting

### Backend Issues

**1. MongoDB Connection Error**
```
Error: MongoServerError: bad auth
```
**Solution:**
- Verify `MONGODB_URI` in `.env`
- Check username/password in connection string
- Ensure IP whitelist includes `0.0.0.0/0` in MongoDB Atlas

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Or change PORT in .env
PORT=5001
```

**3. JWT Token Invalid**
```
401: Not authorized, token failed
```
**Solution:**
- Verify `JWT_SECRET` is set in `.env`
- Check token format: `Bearer <token>`
- Token may have expired (7 days)

### Frontend Issues

**1. API Connection Error**
```
Failed to fetch
```
**Solution:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check CORS is enabled on backend
- On Render, wait 30s for cold start

**2. Authentication Not Persisting**
```
Token disappears after refresh
```
**Solution:**
- Check browser localStorage
- Verify token is being stored: `localStorage.getItem('token')`
- Clear browser cache and retry

**3. Build Errors**
```
Type error: Cannot find module '@/types'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🔮 Future Enhancements

### Performance
- [ ] Implement pagination (20 items per page)
- [ ] Add Redis caching for frequently accessed data
- [ ] Database query optimization with indexes
- [ ] Image lazy loading and optimization

### Features
- [ ] Profile photo upload (Cloudinary)
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Social authentication (Google, GitHub)
- [ ] Export profile as PDF
- [ ] Real-time notifications

### Developer Experience
- [ ] Unit tests with Jest
- [ ] Integration tests for API
- [ ] E2E tests with Playwright
- [ ] CI/CD with GitHub Actions
- [ ] Swagger/OpenAPI documentation
- [ ] Docker containerization

### Security
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] Security headers (Helmet.js)
- [ ] SQL injection prevention
- [ ] XSS protection

---

## 👨‍💻 Developer

**Sufal Thakre**

- **Email**: sufalthakre4@gmail.com
- **Phone**: +91 7748809606
- **Location**: Balaghat, Madhya Pradesh, India
- **GitHub**: [@Sufalthakre18](https://github.com/Sufalthakre18)
- **LinkedIn**: [Sufal Thakre](https://www.linkedin.com/in/sufal-thakre)
- **Portfolio**: [my-portfolio-pearl-xi-96.vercel.app](https://my-portfolio-pearl-xi-96.vercel.app)

---

## 📄 Resume

**View Complete Resume:** [Google Drive Link](https://drive.google.com/file/d/1L6VId1UYaq3HOB8tmDOX-O6xBp8yjCVc/view?usp=sharing)

---

## 🙏 Acknowledgments

Built as part of the **Predusk Technology Pvt. Ltd. (ProcessVenue)** internship assessment for the **Software & AI Developer Intern** position.

**Assessment:** Track A - Backend Assessment ("Me-API Playground")

---

## 📝 Remarks


### What I'd Do Next
1. Add comprehensive test coverage (Jest + Playwright)
2. Implement Redis caching for better performance
3. Add CI/CD pipeline for automated deployments
4. Enhance error logging with Winston
5. Add API rate limiting for production security

---

## 📜 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for Predusk Technology Assessment**

*Last Updated: February 2026*