"use client";

import FeaturedVideos from "@/components/FeaturedVideos";
import SkillsSection from "@/components/SkillsSection";
import { getProfile, type Profile } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code2, Sparkles, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-purple-100 rounded-full" />
          <div className="space-y-3">
            <div className="h-14 w-3/4 bg-slate-200 rounded-xl" />
            <div className="h-14 w-1/2 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-8 w-56 bg-slate-200 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-44 bg-purple-200 rounded-full" />
            <div className="h-14 w-36 bg-slate-200 rounded-full" />
          </div>
          <div className="flex gap-4 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 bg-slate-200 rounded-full" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <HeroSkeleton />;

  const isAvailable = profile?.available_for_work === 1 || profile?.available_for_work === true;
  const name = profile?.name || "Riya Awal";
  const title = profile?.title || "Frontend Developer";
  const tagline = profile?.tagline || "Available for opportunities";
  const bio = profile?.bio || "I craft beautiful, performant, and user-centric web experiences.";
  const githubUrl = profile?.github_url || "https://github.com";
  const linkedinUrl = profile?.linkedin_url || "https://linkedin.com";
  const email = profile?.email || "riyaawal7@gmail.com";
  const avatarSrc = profile?.avatar_url || "/ri.png";

  // Split name for gradient on last word
  const nameParts = name.trim().split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isAvailable
                ? "bg-purple-100 text-purple-700"
                : "bg-slate-100 text-slate-500"
                }`}
            >
              {isAvailable ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                  </span>
                  <span>{tagline}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{tagline}</span>
                </>
              )}
            </motion.div>

            {/* ... inside your text content div ... */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              /* Added font-serif for a luxury editorial feel */
              className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight tracking-tight"
            >
              Hi, I&apos;m{" "}
              {firstName && <span className="text-slate-900">{firstName} </span>}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
                {lastName}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              /* Added font-mono to contrast the serif and lean into the tech enthusiast vibe */
              className="text-xl md:text-2xl font-mono uppercase tracking-widest text-purple-600/80"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              /* Kept sans-serif for readability but adjusted weight and tracking */
              className="text-lg font-light text-slate-600 max-w-xl leading-relaxed tracking-wide"
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="/projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`${API}/api/resume/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-purple-300"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Resume
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-purple-300"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-4 pt-6"
            >
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 scale-110" />

              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <Image
                  src={avatarSrc}
                  width={400}
                  height={400}
                  alt={name}
                  className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
                  priority
                />

                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                >
                  <Code2 className="w-8 h-8 text-purple-600" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xl"
                >
                  &lt;/&gt;
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <SkillsSection />
      <FeaturedVideos />
    </>
  );
}