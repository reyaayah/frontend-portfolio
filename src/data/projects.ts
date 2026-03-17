// data/projects.ts

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}


export const projects: ProjectType[] = [
  {
    id: 1,
    title: "Point of Sale App & Product Website",
    description:
      "A POS application for restaurant businesses built with React Native and Tailwind CSS. Features role-based authentication and modules for menu, orders, and payments.",
    image: "/pos.png",
    technologies: ["React Native", "Tailwind CSS"],
    githubLink: "",
    liveLink: "https://www.lendenpos.com/",
  },
  {
    id: 2,
    title: "Cuisine Kathmandu",
    description:
      "A dynamic restaurant web application built with Next.js. Includes an admin dashboard with reusable components and state management using Redux.",
    image: "/cuisinektm.png",
    technologies: ["Next.js", "Redux", "Tailwind CSS"],
    githubLink: "",
  },
  {
    id: 3,
    title: "Dhimay Website",
    description:
      "A static company website built during the initial project phase using React and Tailwind CSS.",
    image: "/dhimay.png",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "",
    liveLink: "https://dhimay.com/",
  },
  {
    id: 4,
    title: "Riya Awal Portfolio",
    description:
      "A personal portfolio website built with Next.js to showcase projects, skills, and professional experience.",
    image: "/preview.png",
    technologies: ["Next.js", "Tailwind CSS"],
    githubLink: "https://github.com/reyaayah/frontend-portfolio",
  },
  {
    id: 5,
    title: "UnFold Quotes",
    description:
      "A simple quote generator app that uses JSON data and displays quotes in a user-friendly interface.",
    image: "/unfoldquotes.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/reyaayah/UnFold-Quotes",
    liveLink: "https://quotegeneratortask.netlify.app/"
  },
  {
    id: 6,

    title: "Business License and Permit Portal",
    description:
      "A comprehensive portal for managing business licenses and permits, streamlining the application and approval process.",
    image: "/businesslicense.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubLink:
      "https://github.com/reyaayah/Business-License-and-permit-portal",
  },
  {
    id: 7,

    title: "Pizza Shop App",
    description:
      "A fully functional e-commerce pizza shop built with React and Tailwind CSS, featuring menu display and cart management.",
    image: "/pizzashop.png",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "https://github.com/reyaayah/Ecommerce-site",
  },
  {
    id: 8,

    title: "Web Orchestrator",
    description:
      "A web-based application for orchestrating and managing various web services and workflows.",
    image: "/weborch.png",
    technologies: ["Next.js", "Tailwind CSS"],
    githubLink: "",
  },
  {
    id: 9,
    title: "Hospital Management System",
    description:
      "A system for managing hospital operations such as patient records, appointments, and billing, demonstrating OOP concepts.",
    image: "/projectpreview.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/HospitalManagementSystem",
  },
  {
    id: 10,

    title: "Ping Pong Game",
    description: "A simple ping pong game developed using C programming.",
    image: "/projectpreview.png",
    technologies: ["C Programming"],
    githubLink: "https://github.com/reyaayah/PingpongGame",
  },
  {
    id: 11,

    title: "Soulsync",
    description:
      "A Flutter application for tracking daily habits and personal goals to promote productivity and self-growth.",
    image: "/projectpreview.png",
    technologies: ["Dart", "Flutter"],
    githubLink: "https://github.com/reyaayah/soulsync",
  },
  {
    id: 12,
    title: "Telephone Directory",
    description:
      "A telephone directory application built using data structures and algorithms with a doubly linked list.",
    image: "/projectpreview.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/TelephoneDirectory",
  },
  {
    id: 13,

    title: "Music Recommendation System",
    description:
      "A Python-based recommendation system that suggests songs based on lyrics and titles.",
    image: "/projectpreview.png",
    technologies: ["Python"],
    githubLink: "https://github.com/reyaayah/Music-Recommendation-System",
  },
];
