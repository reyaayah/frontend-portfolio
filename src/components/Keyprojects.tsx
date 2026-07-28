"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { projects as allProjects } from "@/data/projects";

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

export default function KeyProjects() {
    // Only show the first 3 projects from data/projects.ts on the landing page
    const projects = allProjects.slice(0, 3).map((p, i) => ({
        index: String(i + 1).padStart(2, "0"),
        title: p.title,
        desc: p.description,
        image: p.image,
        stack: p.technologies,
        github: p.githubLink || null,
        live: p.liveLink || null,
        featured: i === 0,
    }));

    return (
        <section
            className={`${display.variable} ${mono.variable} bg-white px-6 md:px-16 py-24 md:py-32`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Terminal-style eyebrow, matches hero status line */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 font-mono text-sm text-[#6B7280] mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1]" />
                    <span>selected work</span>
                    <span
                        className="inline-block w-1.75 h-3.5 bg-[#3454D1] animate-pulse"
                        aria-hidden="true"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-(family-name:--font-display) text-4xl md:text-6xl leading-[0.95] tracking-tight text-[#14161A] font-semibold max-w-2xl"
                >
                    Things I&apos;ve built
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 max-w-md text-[#3F4450] text-lg leading-relaxed"
                >
                    A few full-stack projects — e-commerce, real-time systems, and
                    AI-assisted tooling — built end to end.
                </motion.p>

                <div className="mt-16 grid md:grid-cols-2 gap-x-10 gap-y-16">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                            className={`group ${project.featured ? "md:col-span-2" : ""}`}
                        >
                            <div
                                className={`grid gap-6 ${project.featured ? "md:grid-cols-[1.3fr_1fr] items-center" : ""
                                    }`}
                            >
                                {/* image — links to the live demo */}
                                <a
                                    href={project.live ?? undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block border border-[#E4E4E7] overflow-hidden"
                                >
                                    <div className="relative pb-[62%]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] contrast-[1.03] group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <span className="absolute top-3 left-3 font-[family-name:var(--font-mono)] text-xs text-[#14161A] bg-white/90 backdrop-blur px-2 py-1">
                                        {project.index}
                                    </span>
                                </a>

                                {/* content */}
                                <div>
                                    <a
                                        href={project.live ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start justify-between gap-4"
                                    >
                                        <h3 className="font-(family-name:--font-display) text-xl md:text-2xl font-semibold text-[#14161A]">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight className="w-5 h-5 shrink-0 text-[#9CA3AF] group-hover:text-[#3454D1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </a>

                                    <p className="mt-3 text-[#6B7280] leading-relaxed">
                                        {project.desc}
                                    </p>

                                    <p className="mt-4 font-mono text-xs text-[#9CA3AF] tracking-wide">
                                        {project.stack.join("  ·  ")}
                                    </p>

                                    <a
                                        href={project.github ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[#6B7280] hover:text-[#14161A] transition-colors"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                        source
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 border-t border-[#E4E4E7]" />
            </div>
        </section>
    );
}