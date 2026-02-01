export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Profile {
  _id: string;
  name: string;
  email: string;
  education: Education[];
  skills: string[];
  projects: Project[];
  work: Work[];
  links: Links;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    live?: string;
  };
}

export interface Work {
  company: string;
  role: string;
  duration: string;
}

export interface Links {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface SearchResults {
  skills: string[];
  projects: Project[];
}