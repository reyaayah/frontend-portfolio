"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

// Your experience data
const experiences = [
  {
    role: "Freelance Web Developer",
    company: "UK Tech Developer",
    duration: "March 2026",
    location: "Remote",
    description:
      "Worked as a Freelance Web Developer for 2 weeks, developing and customizing a responsive e-commerce platform using modern web technologies with a focus on performance, user experience, and clean UI.",
    tech: ["Next.js", "Tailwind CSS", "JavaScript", "Firebase", "CloudFlare"],
    current: false,
    achievement:
      "Successfully delivered a production-ready e-commerce website for an international client",
    stats: [
      { value: "2", label: "weeks" },
      { value: "1", label: "project" },
    ],
    highlight:
      "Collaborated remotely with guidance of senior developer to deliver a client-focused e-commerce solution",
  },
  {
    role: "Junior Frontend Developer",
    company: "Geek Tech Solutions",
    duration: "Aug 2025 – Jan 2026",
    location: "Balkumari, Lalitpur",
    description:
      "Worked as a Junior Frontend Developer for 6 months, developing responsive web applications with React and Next.js and mobile apps with React Native.",
    tech: ["React", "Next.js", "React Native", "JavaScript", "Responsive Design"],
    current: false,
    achievement: "Delivered 5+ production-ready web and mobile applications",
    stats: [
      { value: "6", label: "months" },
      { value: "5+", label: "projects" },
    ],
    highlight: "Gained hands-on experience in mobile and web development workflows",
  },
  {
    role: "Intern",
    company: "Geek Tech Solutions",
    duration: "Jun 2025 – Jul 2025",
    location: "Balkumari, Lalitpur",
    description:
      "Completed a two-month internship focused on practical frontend development and real-world project work.",
    tech: ["Frontend Development", "Web Development", "Team Collaboration"],
    current: false,
    achievement: "Successfully transitioned from intern to junior developer role",
    stats: [
      { value: "2", label: "months" },
      { value: "100%", label: "growth" },
    ],
    highlight: "Learned industry-standard practices and agile development methodologies",
  },
  {
    role: "Software Developer",
    company: "Dhimay Tech",
    duration: "Sep 2024 – Mar 2025",
    location: "Bhaktapur, Nepal",
    description:
      "Interned and worked as a Software Developer, primarily focused on front-end development using Flutter for mobile applications and React.js/Next.js for building dynamic, API-integrated web applications.",
    tech: ["Flutter", "React.js", "Next.js", "API Integration", "Mobile Development"],
    current: false,
    achievement: "Built cross-platform mobile apps and integrated complex REST APIs",
    stats: [
      { value: "7", label: "months" },
      { value: "3+", label: "stacks" },
    ],
    highlight: "First professional role — mastered Flutter and React ecosystem from scratch",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className={`${display.variable} ${mono.variable} bg-linear-to-br from-slate-50 via-purple-50 to-pink-50  py-24 md:py-32 px-6 md:px-16`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1]" />
          <span>03 / experience</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-[#14161A] mb-16 max-w-xl"
        >
          Where I&apos;ve worked.
        </motion.h2>

        {/* List */}
        <div className="border-t border-[#E4E4E7]">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group border-b border-[#E4E4E7] py-10 md:py-12 grid md:grid-cols-[220px_1fr] gap-6 md:gap-16"
            >
              {/* Left: meta */}
              <div className="font-[family-name:var(--font-mono)] text-sm text-[#6B7280] space-y-1.5">
                <p>{exp.duration}</p>
                <p>{exp.location}</p>
                {exp.current && (
                  <p className="inline-flex items-center gap-1.5 text-[#3454D1] pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1] animate-pulse" />
                    current
                  </p>
                )}
              </div>

              {/* Right: content */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-[#14161A]">
                      {exp.role}
                    </h3>
                    <p className="text-[#3454D1] font-medium mt-0.5">{exp.company}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </div>

                <p className="text-[#3F4450] leading-relaxed mb-5 max-w-2xl">
                  {exp.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="font-[family-name:var(--font-mono)] border border-[#E4E4E7] px-3 py-1.5 text-xs text-[#3F4450] hover:border-[#14161A] hover:bg-[#14161A] hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats + achievement + highlight, as a quiet meta row */}
                <div className="flex flex-wrap gap-x-10 gap-y-4 pt-5 border-t border-[#F0F0F0]">
                  {exp.stats?.map((stat, i) => (
                    <div key={i}>
                      <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#14161A]">
                        {stat.value}
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                  {exp.achievement && (
                    <div className="max-w-xs">
                      <p className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">
                        key achievement
                      </p>
                      <p className="text-sm text-[#3F4450]">{exp.achievement}</p>
                    </div>
                  )}
                  {exp.highlight && (
                    <div className="max-w-xs">
                      <p className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">
                        highlight
                      </p>
                      <p className="text-sm text-[#3F4450]">{exp.highlight}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/Riya-Awal-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[#14161A] font-medium border-b-2 border-[#14161A] pb-1 hover:text-[#3454D1] hover:border-[#3454D1] transition-colors"
          >
            Download resume
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}