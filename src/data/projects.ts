// data/projects.ts

export interface ProjectType {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}

export const projects: ProjectType[] = [
  {
    title: "Press-On Nails E-commerce Platform",
    description:
      "A modern e-commerce platform for a UK-based press-on nails brand built with Next.js and Tailwind CSS. Features responsive UI, Firebase authentication, product catalog, shopping cart, and an optimized shopping experience.",
    image: "/nailsa.png",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase",
    ],
    githubLink: "",
    liveLink: "https://www.nailsaltd.co.uk/",
  },
  {
    title: "Point of Sale App & Product Website",
    description:
      "A POS application for restaurant businesses built with React Native and Tailwind CSS. Features role-based authentication and modules for menu, orders, and payments.",
    image: "/pos.png",
    technologies: ["React Native", "Tailwind CSS", "Redux"],
    githubLink: "",
    liveLink: "https://www.lendenpos.com/",
  },
  {
    title: "Cuisine Kathmandu",
    description:
      "A dynamic restaurant web application built with Next.js. Includes an admin dashboard with reusable components and state management using Redux.",
    image: "/cuisinektm.png",
    technologies: ["Next.js", "Redux", "Tailwind CSS"],
    githubLink: "",
  }, {
    title: "Beauty Parlour Appointment Booking System",
    description:
      "A modern appointment booking platform for beauty parlour services built with Next.js. Features an intuitive user interface, online appointment scheduling, service listings, responsive design, and a seamless booking experience across all devices.",
    image: "/beauty-parlor.png",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
    githubLink: "https://github.com/reyaayah/beautyparlour",
    liveLink: "https://beautyparlour-tan.vercel.app/",
  },
  {
    title: "Dhimay Website",
    description:
      "A static company website built during the initial project phase using React and Tailwind CSS.",
    image: "/dhimay.png",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "",
    liveLink: "https://dhimay.com/",
  },
  {
    title: "Riya Awal Portfolio",
    description:
      "A personal portfolio website built with Next.js to showcase projects, skills, and professional experience.",
    image: "/preview.png",
    technologies: ["Next.js", "Tailwind CSS"],
    githubLink: "https://github.com/reyaayah/frontend-portfolio",
  },
  {
    title: "UnFold Quotes",
    description:
      "A simple quote generator app that uses JSON data and displays quotes in a user-friendly interface.",
    image: "/unfoldquotes.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/reyaayah/UnFold-Quotes",
    liveLink: "https://quotegeneratortask.netlify.app/"
  },
  {
    title: "SkillShikshya – Learning Journey UI",
    description:
      "A modern learning platform UI built with Next.js, showcasing SkillShikshya's learning journey concept. Features a clean and responsive interface, reusable components, engaging layouts, and an optimized user experience for educational content.",
    image: "/design.png",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
    githubLink: "",
    liveLink: "https://design-task-1-rho.vercel.app/",
  },

  {
    title: "Business License and Permit Portal",
    description:
      "A comprehensive portal for managing business licenses and permits, streamlining the application and approval process.",
    image: "/businesslicense.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubLink:
      "https://github.com/reyaayah/Business-License-and-permit-portal",
  },
  {
    title: "Pizza Shop App",
    description:
      "A fully functional e-commerce pizza shop built with React and Tailwind CSS, featuring menu display and cart management.",
    image: "/pizzashop.png",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "https://github.com/reyaayah/Ecommerce-site",
  },
  {
    title: "Web Orchestrator",
    description:
      "A web-based application for orchestrating and managing various web services and workflows.",
    image: "/weborch.png",
    technologies: ["Next.js", "Tailwind CSS"],
    githubLink: "",
  },
  {
    title: "Hospital Management System",
    description:
      "A system for managing hospital operations such as patient records, appointments, and billing, demonstrating OOP concepts.",
    image: "/projectpreview.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/HospitalManagementSystem",
  },
  {
    title: "Ping Pong Game",
    description: "A simple ping pong game developed using C programming.",
    image: "/projectpreview.png",
    technologies: ["C Programming"],
    githubLink: "https://github.com/reyaayah/PingpongGame",
  },
  {
    title: "Soulsync",
    description:
      "A Flutter application for tracking daily habits and personal goals to promote productivity and self-growth.",
    image: "/projectpreview.png",
    technologies: ["Dart", "Flutter"],
    githubLink: "https://github.com/reyaayah/soulsync",
  },
  {
    title: "Telephone Directory",
    description:
      "A telephone directory application built using data structures and algorithms with a doubly linked list.",
    image: "/projectpreview.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/TelephoneDirectory",
  },
  {
    title: "Music Recommendation System",
    description:
      "A Python-based recommendation system that suggests songs based on lyrics and titles.",
    image: "/projectpreview.png",
    technologies: ["Python"],
    githubLink: "https://github.com/reyaayah/Music-Recommendation-System",
  },
];
