# Me-API Playground

> A personal profile API with search, filtering, and authentication built for Internship assessment.

## 🔗 Live URLs

- **Frontend**: https://profile-api-playground.vercel.app
- **Backend API**: https://profile-api-playground-kl5n.onrender.com
- **Health Check**: https://profile-api-playground-kl5n.onrender.com/health

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Deployment**: Render

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Deployment**: Vercel

### Development Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Environment**: ES Modules

## 📊 Database Schema

### Collections

#### 1. Profile Collection

Stores the developer's professional information.

```javascript
{
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
  
  timestamps: true
}
```

#### 2. User Collection

Stores authenticated users for managing profile updates.

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, minLength: 6, hashed),
  timestamps: true
}
```

### Indexes

- `email`: unique index on Profile collection
- `email`: unique index on User collection

### Seed Data

Database is auto-seeded on first deployment with:
- One admin user (email: sufalthakre4@gmail.com)
- One complete profile with real project data

## 🔌 API Endpoints

### Health Check

```bash
GET /health
Response: { "status": "OK", "message": "Server is running" }
```

### Authentication Endpoints

#### Register User
```bash
POST /api/auth/register
Headers: Content-Type: application/json

Body:
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "password123"
}

Response:
{
  "_id": "user_id",
  "name": "Your Name",
  "email": "your@email.com",
  "token": "jwt_token_here"
}
```

#### Login
```bash
POST /api/auth/login
Headers: Content-Type: application/json

Body:
{
  "email": "your@email.com",
  "password": "password123"
}

Response:
{
  "_id": "user_id",
  "name": "Your Name",
  "email": "your@email.com",
  "token": "jwt_token_here"
}
```

#### Get Current User
```bash
GET /api/auth/me
Headers: 
  Authorization: Bearer {jwt_token}

Response:
{
  "_id": "user_id",
  "name": "Your Name",
  "email": "your@email.com"
}
```

### Profile Endpoints (Public)

#### Get Profile
```bash
GET /api/profile

Response: Complete profile object
```

#### Get Projects (with optional skill filter)
```bash
GET /api/projects
GET /api/projects?skill=javascript

Response: Array of projects
```

#### Get Top Skills
```bash
GET /api/skills/top

Response: Array of top 5 skills
```

#### Search
```bash
GET /api/search?q=react

Response:
{
  "skills": ["React", "..."],
  "projects": [{ project objects }]
}
```

### Profile Endpoints (Protected)

These require JWT authentication via `Authorization: Bearer {token}` header.

#### Create Profile
```bash
POST /api/profile
Headers: 
  Authorization: Bearer {jwt_token}
  Content-Type: application/json

Body: Profile object
```

#### Update Profile
```bash
PUT /api/profile
Headers: 
  Authorization: Bearer {jwt_token}
  Content-Type: application/json

Body: Partial profile object
```

#### Delete Profile
```bash
DELETE /api/profile
Headers: 
  Authorization: Bearer {jwt_token}

Response: { "message": "Profile deleted successfully" }
```

## 🔐 Authentication

### Flow

1. **Register** or **Login** to get JWT token
2. Store token in frontend (localStorage)
3. Include token in Authorization header for protected routes
4. Token expires in 7 days

### Protected Routes

The following routes require authentication:
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete profile

### Public Routes

These routes are accessible without authentication:
- All GET routes (profile, projects, search, skills)
- Health check

### Test Credentials

```
Email: sufalthakre4@gmail.com
Password: admin123
```

## 🎯 Features Implemented

### Core Requirements ✅
- [x] Backend API with Express.js
- [x] MongoDB database integration
- [x] CRUD operations for profile
- [x] Query endpoints (filter by skill, search, top skills)
- [x] Health check endpoint
- [x] Frontend with Next.js + TypeScript
- [x] Search functionality
- [x] List projects with filtering
- [x] View profile
- [x] CORS configured
- [x] Deployed (frontend + backend)
- [x] Complete README

### Nice-to-Have Features ✅
- [x] JWT authentication for write operations
- [x] Auto-seeding on first deployment
- [x] Error handling
- [x] TypeScript for type safety
- [x] Responsive UI
- [x] Loading states
- [x] Clean code structure with ES modules



## 🔮 Future Enhancements

### Features
- Profile photo upload with Cloudinary integration
- Email verification on registration
- Password reset functionality
- Social auth (Google, GitHub)
- Admin dashboard for analytics
- Export profile as PDF/JSON
- Activity logs


## 🧪 Testing

### Manual Testing Checklist

Backend:
- [x] Health check returns 200
- [x] Profile API returns data
- [x] Search filters correctly
- [x] Projects filter by skill works
- [x] Auth registration works
- [x] Auth login works
- [x] Protected routes require token
- [x] Invalid token returns 401

Frontend:
- [x] Home page loads
- [x] Profile displays correctly
- [x] Search updates results
- [x] Skill filtering works
- [x] Login/Register works
- [x] Token persists in localStorage
- [x] Responsive on mobile
- [x] Loading states show

## 🐛 Debugging

### Common Issues

**1. CORS Error**
```
Solution: Backend has CORS enabled for all origins
```

**2. MongoDB Connection Failed**
```
Check: MONGODB_URI in .env is correct
Verify: IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
```

**3. API Not Loading**
```
Check: Backend is running (Render may take 30s to wake from sleep)
Verify: NEXT_PUBLIC_API_URL in frontend .env.local
```

## 👨‍💻 Developer

**Sufal Thakre**

- Email: sufalthakre4@gmail.com
- Phone: +91 7748809606
- Location: Balaghat, Madhya Pradesh, India
- GitHub: [@Sufalthakre18](https://github.com/Sufalthakre18)
- LinkedIn: [Sufal Thakre](https://www.linkedin.com/in/sufal-thakre)
- Portfolio: [my-portfolio-pearl-xi-96.vercel.app](https://my-portfolio-pearl-xi-96.vercel.app)

## 📄 Resume

View my complete resume: [Google Drive Link](https://drive.google.com/file/d/1L6VId1UYaq3HOB8tmDOX-O6xBp8yjCVc/view?usp=sharing)

## 🙏 Acknowledgments

Built as part of the Predusk Technology Pvt. Ltd. (ProcessVenue) internship assessment for the Software & AI Developer Intern position.


---

**Built with ❤️ for Predusk Technology Assessment**

*Last Updated: February 2026*