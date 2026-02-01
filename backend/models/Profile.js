import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  skills: [{ type: String }],
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
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);