"use client";

import FeaturedVideos from "@/components/FeaturedVideos";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Available for opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Riya Awal
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-slate-700"
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              I craft beautiful, performant, and user-centric web experiences with modern technologies.
              Passionate about clean code and pixel-perfect designs.
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
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:riyaawal7@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-purple-600 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
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
              {/* Decorative rings */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 scale-110" />

              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <Image
                  src="/ri.png"
                  width={100}
                  height={100}
                  alt="Riya Awal"
                  className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
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
      <FeaturedVideos />
    </>
  );
}