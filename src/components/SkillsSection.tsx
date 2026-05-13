"use client";

import { getSkills } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

type Skill = {
    id: number;
    name: string;
    category: string;
    level: number;
    order: number;
};

function SkeletonCard() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 animate-pulse">
            {/* Category heading */}
            <div className="h-5 w-32 bg-slate-200 rounded-full mb-6" />

            {/* Skill rows */}
            {[80, 60, 70, 50].map((w, i) => (
                <div key={i} className="mb-4">
                    <div className="flex justify-between mb-1">
                        <div
                            className="h-4 bg-slate-200 rounded-full"
                            style={{ width: `${w}%` }}
                        />
                        <div className="h-4 w-8 bg-slate-200 rounded-full" />
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-slate-300"
                            style={{ width: `${w - 20}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                const data = await getSkills();
                setSkills(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch skills");
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const groupedSkills = useMemo(() => {
        return skills.reduce((acc: Record<string, Skill[]>, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {});
    }, [skills]);

    const renderSkills = (skills: Skill[]) =>
        skills
            .sort((a, b) => a.order - b.order)
            .map((skill) => (
                <div key={skill.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="font-medium text-slate-700">
                            {skill.name}
                        </span>
                        <span className="text-sm text-slate-500">
                            {skill.level}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                        />
                    </div>
                </div>
            ));

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
                    My Skills
                </h2>

                {error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-10">
                        {loading
                            ? Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))
                            : Object.entries(groupedSkills).map(
                                ([category, skills]) => (
                                    <div
                                        key={category}
                                        className="bg-white p-6 rounded-2xl shadow-md border border-slate-100"
                                    >
                                        <h3 className="text-xl font-semibold capitalize mb-6 text-purple-600">
                                            {category}
                                        </h3>
                                        {renderSkills(skills)}
                                    </div>
                                )
                            )}
                    </div>
                )}
            </div>
        </section>
    );
}