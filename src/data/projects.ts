// data/projects.ts

export interface ProjectType {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
}

export const projects: ProjectType[] = [
  {
    title: "UnFold Quotes",
    description:
      "A simple quote Generator app that uses jSON data and displays them in a user-friendly interface.",
    image: "/ri.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/reyaayah/UnFold-Quotes",
  },
  {
    title: "Business License and Permit Portal",
    description:
      "A comprehensive portal for managing business licenses and permits, streamlining the process.",
    image: "/ri.png",
    technologies: ["HTML", "CSS", "JavaScript", "php", "MySQL"],
    githubLink:
      "https://github.com/reyaayah/Business-License-and-permit-portal",
  },
  {
    title: "E-commerce Site",
    description:
      "Pizza Shop App is a fully functional e-commerce site built with React and Tailwind CSS, featuring product listings and a shopping cart.",
    image: "/ri.png",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "https://github.com/reyaayah/Ecommerce-site",
  },
  {
    title: "Hospital Management System",
    description:
      "A comprehensive system for managing hospital operations, including patient records, appointments, and billing, showcasing OOP concepts.",
    image: "/ri.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/HospitalManagementSystem",
  },
  {
    title: "pingpongGame",
    description: "A simple ping pong game built using C programming.",
    image: "/ri.png",
    technologies: ["C Programming"],
    githubLink: "https://github.com/reyaayah/PingpongGame",
  },
  {
    title: "Soulsync",
    description:
      "A Flutter app that helps users track their daily habits and goals, promoting personal growth and productivity.",
    image: "/ri.png",
    technologies: ["dart", "flutter"],
    githubLink: "https://github.com/reyaayah/soulsync",
  },
  {
    title: "Telephone Directory",
    description:
      "A simple telephone directory application that allows users to store and retrieve contact information. This is a simple project of Data Structure and Algorithm using double linked list.",
    image: "/ri.png",
    technologies: ["C++"],
    githubLink: "https://github.com/reyaayah/TelephoneDirectory",
  },
  {
    title: "Music Recommendation System",
    description:
      "A Python-based music recommendation system that suggests songs based on songs lyrics and title.",
    image: "/ri.png",
    technologies: ["python"],
    githubLink: "https://github.com/reyaayah/Music-Recommendation-System",
  },
];
