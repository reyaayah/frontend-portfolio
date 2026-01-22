// data/experience.ts

export interface ExperienceType {
  role: string;
  company: string;
  duration: string;
  description: string;
  tech: string[];
}

export const experiences: ExperienceType[] = [
  {
    role: "Frontend Developer",
    company: "Dhimay Tech",
    duration: "Jan 2024 – Present",
    description:
      "Building and optimizing scalable web apps using React, Tailwind CSS, and Next.js. Collaborated with design and backend teams to deliver elegant user experiences.",
    tech: ["React", "Next.js", "Tailwind CSS", "Redux", "Git"],
  },
  {
    role: "UI/UX Intern",
    company: "DesignX Studio",
    duration: "Sep 2023 – Dec 2023",
    description:
      "Designed wireframes, prototyped interactions in Figma, and assisted with building responsive interfaces for real-world products.",
    tech: ["Figma", "HTML", "CSS", "JavaScript"],
  },
];
