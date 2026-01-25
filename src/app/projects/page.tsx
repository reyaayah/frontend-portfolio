

import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Folder } from "lucide-react";

export default function ProjectsPage() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
              <Folder className="w-4 h-4" />
              <span>Portfolio</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A collection of projects I&apos;ve built, ranging from web applications to mobile apps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
