
export const projects = [
  {
    id: "interviewiq",
    slug: "interviewiq",
    title: "InterviewIQ",
    category: "AI Interview Platform",
    size: "medium",
    role: "solo",
    tagline:
      "An AI-powered interview preparation platform with simulated interviews and structured feedback.",
    description:
      "InterviewIQ helps candidates practise technical, behavioral, and system-design interviews through AI-powered sessions. Users can select an interview type and difficulty, submit voice or text answers, and review feedback to improve their preparation.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini AI",
      "JWT",
    ],
    features: [
      "AI-powered simulated interview sessions",
      "Technical, behavioral, and system-design interview modes",
      "Selectable interview difficulty",
      "Voice and text answer options",
      "Interview history",
      "Performance feedback and analytics",
      "JWT-based authentication",
    ],
    caseStudy: {
      problem:
        "Practising alone can make interview preparation repetitive. Candidates often lack realistic follow-up questions and structured feedback to identify weaknesses in their answers.",
      solution:
        "InterviewIQ provides an interactive interview workflow where candidates select a track and difficulty, answer questions, and receive AI-generated feedback to support their preparation.",
      architecture: [
        {
          label: "React client",
          detail: "Interview setup, question display, and answer input",
        },
        {
          label: "Express API",
          detail: "API endpoints, authentication, and interview workflows",
        },
        {
          label: "MongoDB",
          detail: "User data and interview-session persistence",
        },
        {
          label: "Gemini AI",
          detail: "AI interview interaction and feedback generation",
        },
      ],
    },
    github: "https://github.com/SiddharthPant08/InterviewIQ",
    live: "https://interviewiq-1-10c3.onrender.com/",
    images: ["/projects/interviewiq.png"],
    verified: true,
  },

  {
    id: "cartly",
    slug: "cartly",
    title: "Cartly",
    category: "Full-Stack E-Commerce",
    size: "medium",
    role: "solo",
    tagline:
      "A full-stack online store for product discovery, shopping carts, orders, and image uploads.",
    description:
      "Cartly is a full-stack e-commerce application combining product browsing, cart management, authentication, and an order workflow. The React frontend uses Redux for state management, while the Express backend provides REST APIs and supports product-image uploads through Cloudinary.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Redux",
      "Cloudinary",
    ],
    features: [
      "Product catalogue and browsing",
      "Shopping-cart management",
      "User authentication",
      "Order workflow",
      "Cloudinary image uploads",
      "Redux state management",
      "REST API integration",
    ],
    github: "https://github.com/SiddharthPant08/Cartly-Web",
    live: "https://cartly-web.vercel.app/",
    images: ["/projects/cartly.png"],
    verified: true,
  },

  {
  id: "fee-management",
  slug: "fee-management-system",
  title: "College Fee Management System",
  category: "Final-Year Team Project",
  size: "medium",
  role: "team",
  roleLabel: "Team project — backend contributor",

  tagline:
    "A college fee-management platform for online payments, automated receipts, and asynchronous background processing.",

  description:
    "Built collaboratively as a final-year B.Tech project, this application streamlines college fee collection through online payments, receipt generation, and fee-related workflows. My contribution focused on developing Express APIs, integrating Razorpay for payment processing, and using Bull with Redis to manage asynchronous background jobs. Puppeteer supports automated receipt generation, while EJS is used for server-rendered views and templates.",

  technologies: [
    "Node.js",
    "Express",
    "EJS",
    "MongoDB",
    "Razorpay",
    "Bull",
    "Redis",
    "Puppeteer",
  ],

  features: [
    "Backend API development using Node.js and Express",
    "Razorpay integration for online fee payments",
    "Background job processing with Bull and Redis",
    "Automated receipt generation using Puppeteer",
    "EJS templates for server-rendered views",
    "Asynchronous receipt processing and email delivery",
    "College fee-management workflow support",
    "Collaborative frontend and backend development",
  ],

  github: "https://github.com/madhav-rana/fee-management",

  live: "https://fee-management-35dz.onrender.com/",

  images: ["/projects/college-fee-management.png"],

  verified: true,
},

  {
    id: "quickchat",
    slug: "quickchat",
    title: "QuickChat",
    category: "Real-Time Chat Application",
    size: "medium",
    role: "solo",
    tagline:
      "A chat application focused on account access and real-time communication.",
    description:
      "QuickChat is a chat web application with an account-registration interface and a dedicated login page. The project focuses on bringing account access and the chat experience together in one application. Its deployed interface provides a starting point for exploring the user-facing workflow.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Real-Time Messaging",
    ],
    features: [
      "Account-registration interface",
      "Login page and account-access workflow",
      "Chat-focused user interface",
      "Dedicated frontend application",
      "Deployed web interface",
    ],
    github: "https://github.com/SiddharthPant08/chat-app",
    live: "https://chat-app-six-khaki-53.vercel.app/login",
    images: ["/projects/qucikchat.png"],
    verified: false,
  },

  {
  id: "voting-system",
  slug: "voting-system",
  title: "Vote Sphere",
  category: "Full-Stack Voting Platform",
  size: "medium",
  role: "solo",

  tagline:
    "A full-stack voting platform with a React frontend and a Node.js backend for managing users and voting workflows.",

  description:
    "Vote Sphere is a full-stack web application built to provide a digital voting experience. The React frontend delivers the user interface, while Node.js and Express power the backend APIs. MongoDB with Mongoose handles data persistence, and JWT supports authentication where configured. The application also includes an admin-creation endpoint and brings the frontend and backend together in a single voting platform.",

  technologies: [
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "REST APIs",
    "JWT",
  ],

  features: [
    "React-based frontend and user interface",
    "Node.js and Express backend API",
    "MongoDB database integration with Mongoose",
    "User account and authentication workflow",
    "Admin-creation API endpoint",
    "Frontend and backend integration",
    "Voting-related application workflows",
    "REST API-based client-server communication",
  ],

  github:
    "https://github.com/SiddharthPant08/Voting_System_Backend",

  live:
    "https://voting-system-backend-1-35h6.onrender.com/",

  images: ["/projects/voting-system.png"],

  verified: false,
},
];

// Keep the existing Home.jsx imports compatible.
// All five projects use the same card size.
export const featuredProjects = projects.filter(
  (project) => project.size === "featured"
);

export const secondaryProjects = projects.filter(
  (project) => project.size !== "featured"
);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);