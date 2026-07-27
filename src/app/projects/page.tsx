import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
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

export default function ProjectsPage() {
  return (
    <>
      <section
        className={`${display.variable} ${mono.variable} min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-pink-50  py-24 md:py-32 px-6 md:px-16`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section marker */}
          <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1]" />
            <span>04 / projects</span>
          </div>

          <div className="mb-16 max-w-2xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight text-[#14161A] mb-6">
              Selected work.
            </h1>

            <p className="text-lg leading-relaxed text-[#3F4450]">
              A collection of projects I&apos;ve built, ranging from web
              applications to mobile apps.
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