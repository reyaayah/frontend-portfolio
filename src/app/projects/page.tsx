// app/projects/page.tsx (Server Component by default)

import GithubStatusWrapper from "@/components/GithubStatusWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-700 mb-16">
            🌟 My Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
          GitHub Stats
        </h2>
        <GithubStatusWrapper />
      </section> */}
    </>
  );
}
