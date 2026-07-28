"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,

    Layers3,
    Smartphone,
    Wrench,
} from "lucide-react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
});

const techStack = [
    {
        number: "01",
        title: "Frontend",
        icon: Code2,
        technologies: [
            "React.js",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
        ],
    },
    {
        number: "02",
        title: "Styling & UI",
        icon: Layers3,
        technologies: [
            "Tailwind CSS",
            "Responsive Design",
            "Framer Motion",
            "Material UI",
        ],
    },
    {
        number: "03",
        title: "Mobile",
        icon: Smartphone,
        technologies: [     
            "React Native",
            "Expo",
            "Flutter",
            "Dart",
            "Riverpod",
        ],
    },
    {
        number: "04",
        title: "Backend & Data",
        icon: Database,
        technologies: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "MySQL",
            "Firebase",
        ],
    },
    {
        number: "05",
        title: "Tools & Workflow",
        icon: Wrench,
        technologies: [
            "Git",
            "GitHub",
            "Figma",
            "Postman",
            "Trello",
            "VS Code",
            "Cloudinary",
            "Vercel",
            "Netlify",
        ],
    },
];

export default function TechStack() {
    return (
        <section
            className={`${display.variable} ${mono.variable} relative overflow-hidden bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 px-6 py-24 md:px-16 md:py-32`}
        >
            <div className="mx-auto max-w-6xl">
                {/* Small section label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280]"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3454D1]" />

                    <span>tools & technologies</span>

                    <span
                        className="inline-block h-[14px] w-[7px] animate-pulse bg-[#3454D1]"
                        aria-hidden="true"
                    />
                </motion.div>

                {/* Heading */}
                <div className="grid items-end gap-8 border-b border-[#E4E4E7] pb-12 md:grid-cols-[1.4fr_1fr]">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-(family-name:--font-display) text-5xl font-semibold leading-[0.95] tracking-tight text-[#14161A] md:text-7xl"
                    >
                        My
                        <br />
                        Tech Stack
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="max-w-md text-base leading-relaxed text-[#6B7280] md:justify-self-end"
                    >
                        The technologies and tools I use to build responsive,
                        accessible, and maintainable digital experiences.
                    </motion.p>
                </div>

                {/* Tech categories */}
                <div>
                    {techStack.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.08,
                                }}
                                className="group grid gap-6 border-b border-[#E4E4E7] py-8 md:grid-cols-[70px_220px_1fr] md:items-start"
                            >
                                {/* Number */}
                                <span className="font-mono pt-1 text-sm text-[#9CA3AF]">
                                    {category.number}
                                </span>

                                {/* Category */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D4D4D8] text-[#14161A] transition-all duration-300 group-hover:border-[#3454D1] group-hover:bg-[#3454D1] group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#14161A] transition-colors duration-300 group-hover:text-[#3454D1]">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 md:justify-end">
                                    {category.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="border border-[#D4D4D8] bg-white/40 px-3 py-2 font-mono text-xs text-[#5F6470] transition-all duration-300 hover:border-[#3454D1] hover:text-[#3454D1]"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom information */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap items-center justify-between gap-4 pt-7 font-mono text-xs text-[#9CA3AF]"
                >
                    <span>05 CORE AREAS</span>

                    <span>ALWAYS LEARNING — ALWAYS BUILDING</span>
                </motion.div>
            </div>
        </section>
    );
}