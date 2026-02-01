import Profile from "./models/Profile.js";
import User from "./models/User.js";

export default async function seedOnce() {
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
        console.log("ℹSeed skipped: profile already exists");
        return;
    }

    console.log("Seeding database (first run)...");

    const adminExists = await User.findOne({
        email: "sufalthakre4@gmail.com",
    });

    if (!adminExists) {
        await User.create({
            name: "Sufal Thakre",
            email: "sufalthakre4@gmail.com",
            password: "admin123",
        });

        console.log(" Admin user created");
    }

    await Profile.create({
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
    });
  console.log(" Profile seeded successfully")
}

