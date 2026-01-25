"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowUpRight, Target, TargetIcon, ArchiveRestore, Trophy, Sparkles } from "lucide-react";

// Your experience data
const experiences = [
  {
    role: "Junior Frontend Developer",
    company: "Geek Tech Solutions",
    duration: "Aug 2025 - Jan 2026",
    location: "Balkumari, Lalitpur",
    description: "Worked as a Junior Frontend Developer for 6 months, developing responsive web applications with React and Next.js and mobile apps with React Native.",
    tech: ["React", "Next.js", "React Native", "JavaScript", "Responsive Design"],
    current: false,
    achievement: "Delivered 5+ production-ready web and mobile applications",
    stats: [
      { value: "6", label: "Months" },
      { value: "5+", label: "Projects" },
    ],
    highlight: "Gained hands-on experience in mobile and web development workflows",
  },
  {
    role: "Intern",
    company: "Geek Tech Solutions",
    duration: "Jun 2025 - Jul 2025",
    location: "Balkumari, Lalitpur",
    description: "Completed a two-month internship focused on practical frontend development and real-world project work.",
    tech: ["Frontend Development", "Web Development", "Team Collaboration"],
    current: false,
    achievement: "Successfully transitioned from intern to junior developer role",
    stats: [
      { value: "2", label: "Months" },
      { value: "100%", label: "Growth" },
    ],
    highlight: "Learned industry-standard practices and agile development methodologies",
  },
  {
    role: "Software Developer",
    company: "Dhimay Tech",
    duration: "Sep 2024 - Mar 2025",
    location: "Bhaktapur, Nepal",
    description: "Interned and worked as a Software Developer, primarily focused on front-end development using Flutter for mobile applications and React.js/Next.js for building dynamic, API-integrated web applications.",
    tech: ["Flutter", "React.js", "Next.js", "API Integration", "Mobile Development"],
    current: false,
    achievement: "Built cross-platform mobile apps and integrated complex REST APIs",
    stats: [
      { value: "7", label: "Months" },
      { value: "3+", label: "Tech Stacks" },
    ],
    highlight: "First professional role - mastered Flutter and React ecosystem from scratch",
  },
];

export default function Experience() {
  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-slate-50 via-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            My professional journey in software development and frontend engineering
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-pink-300 to-purple-200 md:transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white shadow-lg md:transform md:-translate-x-1/2 z-10" />

                {/* Stats/Facts Side */}
                <div className="hidden md:block md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`${index % 2 === 0 ? "pr-12" : "pl-12"}`}
                  >
                    <div className="space-y-4">
                      {/* Key Achievement */}
                      {exp.achievement && (
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-purple-600 mb-1">KEY ACHIEVEMENT</p>
                              <p className="text-sm text-slate-700 font-medium">{exp.achievement}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Stats */}
                      {exp.stats && (
                        <div className="grid grid-cols-2 gap-3">
                          {exp.stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {stat.value}
                              </p>
                              <p className="text-xs text-slate-600 mt-1">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Learning/Highlight */}
                      {exp.highlight && (
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-500 mb-1">HIGHLIGHT</p>
                              <p className="text-sm text-slate-700">{exp.highlight}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Experience Card */}
                <div className="md:w-1/2 ml-8 md:ml-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-100 hover:border-purple-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-purple-600" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/Reya-Awal-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Download Resume
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}