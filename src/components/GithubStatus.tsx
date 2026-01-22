// components/GithubStatusCard.tsx
"use client";

import Image from "next/image";
import { Github } from "lucide-react";

export default function GithubStatusCard({ stats }: any) {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl max-w-md mx-auto mt-10">
      <div className="flex items-center gap-4">
        <Image
          src={stats.avatar}
          alt={stats.name}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">{stats.name}</h3>
          <p className="text-gray-500">{stats.bio}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p>👥 Followers: {stats.followers}</p>
        <p>🔁 Following: {stats.following}</p>
        <p>📦 Repositories: {stats.publicRepos}</p>
      </div>

      <a
        href={stats.profileUrl}
        target="_blank"
        className="mt-4 inline-flex items-center gap-2 text-purple-600 font-medium hover:underline"
      >
        <Github size={16} /> View GitHub
      </a>
    </div>
  );
}
