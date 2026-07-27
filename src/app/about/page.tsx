"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const skills = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "React Native",
  "Flutter",
  "Node.js",
  "MySQL",
  "Firebase",
  "Git & GitHub",
  "Figma",
];

export default function About() {
  return (
    <section
      id="about"
      className={`${display.variable} ${mono.variable} bg-linear-to-br from-slate-50 via-purple-50 to-pink-50  py-24 md:py-32 px-6 md:px-16`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section marker — consistent with hero's status-line language */}
        <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280] mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1]" />
          <span>02 / about</span>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Image — same Image props/quality as before, frame restyled */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-5/12 flex justify-center md:justify-start"
          >
            <div className="group relative h-[500px] w-[380px] max-w-full overflow-hidden border border-[#E4E4E7]">
              <Image
                src="/pp.jpeg"
                alt="Riya Awal"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 320px, 380px"
                className="object-cover grayscale-[10%] transition duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-7/12"
          >
            <h2 className="font-[family-name:var(--font-display)] mb-8 text-3xl md:text-4xl font-semibold leading-tight text-[#14161A]">
              Frontend developer, product-minded.
            </h2>

            <p className="mb-5 text-lg leading-relaxed text-[#3F4450]">
              I&apos;m a passionate frontend developer who enjoys crafting
              modern, responsive, and user-friendly web experiences. I love
              transforming ideas into elegant digital products with clean
              code and thoughtful design.
            </p>

            <p className="mb-5 text-lg leading-relaxed text-[#3F4450]">
              My primary stack includes React.js, Next.js, TypeScript, and
              Tailwind CSS, and I also have experience building mobile
              applications with React Native and Flutter. I enjoy
              collaborating with designers and backend developers to create
              seamless user experiences.
            </p>

            <p className="mb-12 text-lg leading-relaxed text-[#3F4450]">
              I&apos;m continuously learning new technologies, exploring
              UI/UX trends, and building projects that challenge me to grow
              as a developer.
            </p>

            {/* Skills */}
            <h3 className="font-[family-name:var(--font-mono)] mb-5 text-sm uppercase tracking-wide text-[#6B7280]">
              Skills &amp; technologies
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-[family-name:var(--font-mono)] rounded-none border border-[#E4E4E7] px-3 py-1.5 text-sm text-[#3F4450] transition-colors hover:border-[#14161A] hover:bg-[#14161A] hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}