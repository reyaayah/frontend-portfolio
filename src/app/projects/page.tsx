"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Folder } from "lucide-react";
import { APIError, getProjects } from "@/lib/api";
export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: number;
  createdAt: string;
  order?: number;
}
function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl shadow-xl bg-white overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded-md w-2/3" />
        <div className="space-y-2">
          <div className="h-3.5 bg-slate-100 rounded w-full" />
          <div className="h-3.5 bg-slate-100 rounded w-5/6" />
          <div className="h-3.5 bg-slate-100 rounded w-4/6" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 bg-purple-100 rounded-full" />
          <div className="h-6 w-20 bg-purple-100 rounded-full" />
          <div className="h-6 w-12 bg-purple-100 rounded-full" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-8 w-24 bg-slate-200 rounded-lg" />
          <div className="h-8 w-24 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();
        console.log("Fetched projects:", data);
        setProjects(data);
      } catch (err) {
        if (err instanceof APIError) {
          setError(`Error ${err.status}: ${err.message}`);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
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

        {error && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm mb-1">Could not load projects</p>
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
              : projects.length > 0
                ? projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
                : (
                  <div className="col-span-3 text-center py-16 text-slate-400">
                    No projects found.
                  </div>
                )}
          </div>
        )}
      </div>
    </section>
  );
}