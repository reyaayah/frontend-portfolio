"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-14 px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex w-full justify-center md:w-5/12"
        >
          <div className="group relative h-[500px] w-[380px] overflow-hidden rounded-3xl border-8 border-white shadow-2xl">
            <Image
              src="/pp.jpeg"
              alt="Riya Awal"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 320px, 380px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-7/12"
        >
          <span className="mb-3 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
            ABOUT ME
          </span>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Riya Awal
            </span>
          </h2>

          <p className="mb-5 text-lg leading-8 text-gray-600">
            I&apos;m a passionate <strong>Frontend Developer</strong> who enjoys
            crafting modern, responsive, and user-friendly web experiences. I
            love transforming ideas into elegant digital products with clean
            code and thoughtful design.
          </p>

          <p className="mb-5 text-lg leading-8 text-gray-600">
            My primary stack includes{" "}
            <span className="font-semibold text-purple-600">
              React.js, Next.js, TypeScript, Tailwind CSS
            </span>
            , and I also have experience building mobile applications with{" "}
            <span className="font-semibold text-pink-500">
              React Native and Flutter
            </span>
            . I enjoy collaborating with designers and backend developers to
            create seamless user experiences.
          </p>

          <p className="mb-8 text-lg leading-8 text-gray-600">
            I&apos;m continuously learning new technologies, exploring UI/UX trends,
            and building projects that challenge me to grow as a developer.
          </p>

          {/* Skills */}
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">
            Skills & Technologies
          </h3>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition hover:scale-105 hover:shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}