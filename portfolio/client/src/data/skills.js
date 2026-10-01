import { Blocks, Server, Database, Code2, Wrench, Sparkles } from "lucide-react";

// No percentage bars — each category gets one honest line of context instead
// of a fabricated proficiency score. Grounded only in skills Siddharth listed
// directly, or technologies actually present in data/projects.js.
export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Blocks,
    context: "What I build interfaces with — used across InterviewIQ and Cartly.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux", "Vite"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    context: "The API layer for every project below, including auth with JWT.",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    context: "MongoDB is my default; PostgreSQL from coursework and side projects.",
    skills: ["MongoDB", "Mongoose", "PostgreSQL"],
  },
  {
    id: "programming",
    label: "Programming",
    icon: Code2,
    context: "Core languages I write in day to day and studied in my CSE coursework.",
    skills: ["JavaScript", "C++", "Python"],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    context: "Daily workflow — version control, API testing, and my editor of choice.",
    skills: ["Git", "GitHub", "Postman", "Thunder Client", "VS Code"],
  },
  {
    id: "ai",
    label: "AI & Modern Development",
    icon: Sparkles,
    context: "Applied directly in InterviewIQ's AI interviewer.",
    skills: ["Gemini API", "AI APIs", "Prompt Engineering", "AI-Powered Applications"],
  },
];