"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GithubStatus from "@/components/GithubStatus";
import GithubStatusWrapper from "@/components/GithubStatusWrapper";

export default function Hero() {
  return (
    <>
      <section className="min-h-[100vh] flex flex-col md:flex-row items-center justify-around px-6 md:px-12 py-12 bg-white">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 leading-tight">
            Hi, I'm <span className="text-pink-600">Riya Awal</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            A passionate Frontend Developer crafting modern, user-friendly, and
            responsive web apps.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/projects"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-purple-600 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-100 transition"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 md:mt-0"
        >
          <Image
            src="/ri.png" // Replace with your own image path
            alt="Profile Illustration"
            width={400}
            height={400}
            className="rounded-full shadow-xl"
          />
        </motion.div>
      </section>
    </>
  );
}
