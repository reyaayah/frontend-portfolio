"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
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

export default function ContactCTA() {
    return (
        <section
            className={`${display.variable} ${mono.variable} relative overflow-hidden bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 px-6 py-24 md:px-16 md:py-32`}
        >
            <div className="mx-auto max-w-6xl">
                {/* Top line */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 font-mono text-sm text-[#6B7280]"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3454D1]" />

                    <span>let&apos;s work together</span>

                    <span
                        className="inline-block h-[14px] w-[7px] animate-pulse bg-[#3454D1]"
                        aria-hidden="true"
                    />
                </motion.div>

                {/* Main content */}
                <div className="grid items-end gap-10 border-y border-[#E4E4E7] py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
                    {/* Left side */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                    >
                        <h2 className="font-(family-name:--font-display) text-5xl font-semibold leading-[0.95] tracking-tight text-[#14161A] md:text-7xl">
                            Have an idea?
                            <br />

                            <span className="text-[#3454D1]">Let&apos;s build it.</span>
                        </h2>
                    </motion.div>

                    {/* Right side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="md:justify-self-end"
                    >
                        <p className="max-w-md text-base leading-relaxed text-[#6B7280]">
                            I&apos;m open to frontend development opportunities, freelance
                            projects, and creative collaborations. Let&apos;s create
                            something thoughtful and useful together.
                        </p>

                        {/* CTA button */}
                        <Link
                            href="/contact"
                            className="group mt-8 inline-flex items-center gap-3 border border-[#14161A] bg-[#14161A] px-5 py-3 font-mono text-xs font-medium uppercase tracking-wide text-white transition-all duration-300 hover:border-[#3454D1] hover:bg-[#3454D1]"
                        >
                            <Mail className="h-4 w-4" />

                            Get in touch

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom details */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-between gap-4 pt-7 font-mono text-xs text-[#9CA3AF]"
                >

                    <span>OPEN TO NEW OPPORTUNITIES</span>
                </motion.div>
            </div>
        </section>
    );
}