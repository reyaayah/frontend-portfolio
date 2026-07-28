"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
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

export default function FeaturedVideos() {
    const videos = [
        {
            src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329687/GTS_Interview_Test_FrontEnd_Final_Video_anmj9j.mp4",
            poster: "/pizzashop.png",
            title: "Pizza Shop App",
            desc: "A modern pizza ordering application built with React and Tailwind CSS.",
            number: "01",
            category: "Web Development",
        },
        {
            src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329186/newstudy_ahh7jn.mp4",
            poster: "/study.png",
            title: "Study Session",
            desc: "A glimpse into my learning process, coding practice, and daily routine.",
            number: "02",
            category: "Learning",
        },
        {
            src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329924/work_akmvce.mp4",
            poster: "/work.png",
            title: "Project Workflow",
            desc: "Behind the scenes of how I design and develop modern web projects.",
            number: "03",
            category: "Development",
        },
    ];

    return (
        <section
            className={`${display.variable} ${mono.variable} relative overflow-hidden bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 px-6 py-24 md:px-16 md:py-32`}
        >
            <div className="mx-auto max-w-6xl">
                {/* Top label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280]"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3454D1]" />
                    <span>selected video work</span>

                    <span
                        className="inline-block h-[14px] w-[7px] bg-[#3454D1] animate-pulse"
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
                        className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.95] tracking-tight text-[#14161A] md:text-6xl"
                    >
                        Featured
                        <br />
                        Videos
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="max-w-md text-base leading-relaxed text-[#6B7280] md:justify-self-end"
                    >
                        A collection of project walkthroughs, development work, and
                        moments from my learning journey.
                    </motion.p>
                </div>

                {/* Video list */}
                <div className="mt-4">
                    {videos.map((video, i) => (
                        <motion.article
                            key={video.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.55,
                                delay: i * 0.1,
                            }}
                            className="group grid gap-6 border-b border-[#E4E4E7] py-8 md:grid-cols-[70px_1fr_280px] md:items-center"
                        >
                            {/* Number */}
                            <span className="font-[family-name:var(--font-mono)] text-sm text-[#9CA3AF]">
                                {video.number}
                            </span>

                            {/* Video */}
                            <div className="relative aspect-video overflow-hidden bg-[#E4E4E7]">
                                <video
                                    src={video.src}
                                    poster={video.poster}
                                    controls
                                    preload="metadata"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                />

                                {/* Decorative label */}
                                <div className="pointer-events-none absolute left-3 top-3 bg-[#14161A]/80 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                                    {video.category}
                                </div>

                                {/* Play icon */}
                                <div className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#14161A] shadow-sm">
                                    <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
                                </div>
                            </div>

                            {/* Video details */}
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#14161A] transition-colors group-hover:text-[#3454D1]">
                                        {video.title}
                                    </h3>

                                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6B7280]">
                                        {video.desc}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF]">
                                        VIDEO / {video.number}
                                    </span>

                                    <span className="flex h-9 w-9 items-center justify-center border border-[#D4D4D8] text-[#14161A] transition-all duration-300 group-hover:border-[#3454D1] group-hover:bg-[#3454D1] group-hover:text-white">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>


            </div>
        </section>
    );
}