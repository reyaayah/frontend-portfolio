"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center"
        >
          <Image
            src="/ri.png" // Replace with your own image
            alt="Riya Awal"
            width={350}
            height={350}
            className="rounded-2xl mx-auto shadow-2xl"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-purple-700 mb-4">
            👋 About Me
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            I'm <span className="font-semibold text-purple-600">Riya Awal</span>
            , a passionate and creative Frontend Developer with a love for
            building beautiful, responsive, and user-centric web applications.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            With a strong foundation in{" "}
            <span className="text-pink-500 font-medium">
              React, Tailwind CSS, and Next.js
            </span>
            , I enjoy turning complex problems into elegant designs and
            functional interfaces.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            I'm always eager to learn, collaborate, and push the boundaries of
            what I can create. When I'm not coding, you might find me exploring
            new UI trends or sipping coffee while sketching ideas.
          </p>

          {/* Skills */}
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            🛠️ Skills
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              "HTML",
              "CSS",
              "Tailwind",
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Git & GitHub",
              "Figma",
              "Firebase",
            ].map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
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
