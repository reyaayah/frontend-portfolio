"use client";

import { getSkills } from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skill } from "../admin/skills/page";

export default function About() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await getSkills();
        console.log("Fetched skills:", data);
        setSkills(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);
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
            I&apos;m <span className="font-semibold text-purple-600">Riya Awal</span>
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
            I&apos;m always eager to learn, collaborate, and push the boundaries of
            what I can create. When I&apos;m not coding, you might find me exploring
            new UI trends or sipping coffee while sketching ideas.
          </p>

          {/* Skills */}
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            🛠️ Skills
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
