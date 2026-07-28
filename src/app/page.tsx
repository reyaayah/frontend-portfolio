"use client";

import FeaturedVideos from "@/components/FeaturedVideos";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import KeyProjects from "@/components/Keyprojects";
import TechStack from "@/components/TechStack";
import ContactCTA from "@/components/ContactCta";

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

export default function Hero() {
  return (
    <>
      <section
        className={`${display.variable} ${mono.variable} relative min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-pink-50  px-6 md:px-16 py-24 md:py-32`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Terminal-style status line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[#6B7280] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3454D1]" />
            <span>available for opportunities</span>
            <span
              className="inline-block w-[7px] h-[14px] bg-[#3454D1] animate-pulse"
              aria-hidden="true"
            />
          </motion.div>

          <div className="grid md:grid-cols-[1.4fr_1fr] gap-16 items-end">
            {/* Name block */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[family-name:var(--font-display)] text-[15vw] md:text-[7.5vw] leading-[0.88] tracking-tight text-[#14161A] font-semibold"
              >
                Riya
                <br />
                Awal
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 max-w-md text-[#3F4450] text-lg leading-relaxed"
              >
                Frontend developer building calm, precise interfaces — clean
                code, considered detail, no wasted pixels.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-10 flex flex-wrap items-center gap-8"
              >
                <a
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-[#14161A] font-medium border-b-2 border-[#14161A] pb-1 hover:text-[#3454D1] hover:border-[#3454D1] transition-colors"
                >
                  View my work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="text-[#6B7280] font-medium hover:text-[#14161A] transition-colors"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>

            {/* Photo — small, offset, editorial rather than iconic */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative justify-self-end"
            >
              <div className="relative w-48 md:w-64 aspect-[4/5] -rotate-2">
                <Image
                  src="/me.jpeg"
                  alt="Riya Awal"
                  fill
                  quality={100}
                  priority
                  sizes="(min-width: 768px) 256px, 192px"
                  className="object-cover grayscale-[15%] contrast-[1.03]"
                />
              </div>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] -rotate-2">
                27.71°N, 85.32°E — KTM
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mt-20 md:mt-24 border-t border-[#E4E4E7]" />

          {/* Footer row: location + socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6 flex flex-wrap items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-sm text-[#6B7280]"
          >
            <span>based in Kathmandu, Nepal</span>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/reyaayah"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#14161A] transition-colors inline-flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" /> github
              </a>
              <a
                href="https://www.linkedin.com/in/riya-awal-591330294/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#14161A] transition-colors inline-flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" /> linkedin
              </a>
              <a
                href="mailto:riyaawal7@gmail.com"
                className="hover:text-[#14161A] transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <KeyProjects />
      <TechStack />
      <FeaturedVideos />
      <ContactCTA />
    </>
  );
}