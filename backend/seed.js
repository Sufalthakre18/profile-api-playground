import 'dotenv/config';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';
import User from './models/User.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};


const seedData = {
  name: "Sufal Thakre",
  email: "sufalthakre4@gmail.com",
  
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Indira Gandhi National Open University",
      year: "2024-2027"
    },
    {
      degree: "Senior Secondary (XII)",
      institution: "Jawahar Navodaya Vidyalaya, Waraseoni",
      year: "2022"
    }
  ],
  
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Git",
    "REST API",
    "Firebase",
    "HTML",
    "CSS",
    "Redux"
  ],
  
  projects: [
    {
      title: "GigFlow - Freelance Marketplace",
      description: "Built a full-stack freelance marketplace with React, Node.js, MongoDB, featuring JWT auth, bidding system, and atomic hiring using MongoDB transactions with real-time notifications.",
      links: {
        github: "https://github.com/Sufalthakre18/gigflow-fullstack-marketplace",
        live: "https://account-manager-vite.vercel.app/"
      }
    },
    {
      title: "Task Manager App",
      description: "Full-stack task management app using Next.js 14, TypeScript, Firebase with real-time updates, user authentication, filtering and sorting features.",
      links: {
        github: "https://github.com/Sufalthakre18/task-manager-nextjs-firebase",
        live: "https://task-manager-nextjs-firebase.vercel.app"
      }
    },
    {
      title: "Weather Forecast Application",
      description: "Developed a real-time weather forecast application with user-focused interface using JavaScript, offering location-specific weather updates with asynchronous API requests.",
      links: {
        github: "https://weather-forecast-application-lyart.vercel.app/",
        live: "https://weather-forecast-application-lyart.vercel.app/"
      }
    },
    {
      title: "Personal Portfolio Website",
      description: "Developed a personal portfolio website using HTML and CSS to professionally showcase skills, projects, and achievements with responsive design.",
      links: {
        github: "https://github.com/Sufalthakre18/My-portfolio",
        live: "https://my-portfolio-pearl-xi-96.vercel.app"
      }
    }
  ],
  
  work: [
    {
      company: "Personal Project",
      role: "Full Stack Developer ",
      duration: "july 2025- Present"
    }
  ],
  
  links: {
    github: "https://github.com/Sufalthakre18",
    linkedin: "https://www.linkedin.com/in/sufal-thakre",
    portfolio: "https://my-portfolio-pearl-xi-96.vercel.app"
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing data...');
    await Profile.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: "Sufal Thakre",
      email: "sufalthakre4@gmail.com",
      password: "admin123" 
    });
    console.log('Admin user created');
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');
    
    console.log('Inserting profile data...');
    await Profile.create(seedData);
    console.log('Profile data seeded successfully');
    
    console.log('\n Database seeding completed!');
   
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();