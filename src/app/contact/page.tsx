"use client";

import { send, sendForm } from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (status && status.includes("successfully")) {
      const timer = setTimeout(() => setStatus(""), 6000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log(form.current);
    sendForm(
      "service_j1mxay3", // replace with your EmailJS service ID
      "template_myutlmw", // replace with your EmailJS template ID
      form.current!,
      "XAPTGrB5hVAMxBTXW" // replace with your EmailJS public key
    ).then(
      () => {
        setStatus("Message sent successfully! ✅");
      },
      (error) => {
        setStatus("Failed to send message. ❌");
        console.error(error);
      }
    );
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-700 mb-12"
        >
          📬 Contact Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-700 text-lg">
              I'd love to hear from you! Whether you have a question or just
              want to say hi — drop a message and I’ll get back as soon as
              possible.
            </p>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600 w-5 h-5" />
                <span>riyaawal7@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-purple-600 w-5 h-5" />
                <span>9841028543</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="text-purple-600 w-5 h-5" />
                <a
                  href="https://github.com/reyaayah"
                  target="_blank"
                  className="hover:underline"
                >
                  github.com/reyaayah
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-purple-600 w-5 h-5" />
                <a
                  href="https://np.linkedin.com/in/riya-awal-591330294"
                  target="_blank"
                  className="hover:underline"
                >
                  linkedin.com/in/riyaawal
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            ref={form}
            className="space-y-6 bg-white p-8 rounded-xl shadow-md"
            onSubmit={sendEmail}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
                name="name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
                name="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
                name="message"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 transition"
            >
              <Send size={16} /> Send Message
            </button>
            {status && (
              <div
                className={`mt-4 text-center font-medium ${
                  status.includes("successfully")
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {status}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
