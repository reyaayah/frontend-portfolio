"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
          <Briefcase className="inline-block w-8 h-8 mr-2 text-purple-600" />
          My Experience
        </h2>

        <div className="relative border-l-4 border-purple-300 pl-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 relative"
            >
              <span className="absolute -left-6 top-6 w-4 h-4 bg-purple-600 rounded-full"></span>
              <h3 className="text-xl font-semibold text-purple-800">
                {exp.role}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-pink-600">{exp.company}</span>{" "}
                &middot; {exp.duration}
              </p>
              <p className="text-gray-700 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
