// components/ProjectCard.tsx
"use client";

import { ProjectType } from "@/app/projects/page";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition"
    >
      <div className="w-full h-48 relative">
        
        <Image
          src={project.image || "/projectpreview.png"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project?.techStack?.map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg
                 border border-purple-600 text-purple-600
                 hover:bg-purple-600 hover:text-white transition"
            >
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg
                 bg-gradient-to-r from-pink-500 to-purple-600 text-white
                 hover:opacity-90 transition"
            >
              Live Preview 🚀
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
}
