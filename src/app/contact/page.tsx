"use client";

import { sendForm } from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Phone, User, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    sendForm(
      "service_66ksnr8",
      "template_g8y6ton",
      form.current!,
      "QZOcYQGZWq2p2PnuZ"
    ).then(
      () => setStatus("success"),
      () => setStatus("error")
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-white px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have an idea, project, or just want to say hi? I&apos;m always
            open to meaningful conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <InfoItem icon={<Mail size={18} />} text="riyaawal7@gmail.com" link="mailto:riyaawal7@gmail.com" />
              <InfoItem icon={<Phone size={18} />} text="+977 9841028543" link="tel:+9779841028543" />
              <InfoItem
                icon={<Github size={18} />}
                link="https://github.com/reyaayah"
                text="github.com/reyaayah"
              />
              <InfoItem
                icon={<Linkedin size={18} />}
                link="https://np.linkedin.com/in/riya-awal-591330294"
                text="linkedin.com/in/riyaawal"
              />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-purple-100">
              <p className="text-sm text-gray-600 italic">
                Great things are built through conversations.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 space-y-5"
          >
            <InputField label="Your Name" icon={<User size={18} />} name="from_name" type="text" />
            <InputField label="Email Address" icon={<Mail size={18} />} name="reply_to" type="email" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-semibold text-white transition hover:shadow-lg hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            <div aria-live="polite" className="min-h-[1.25rem]">
              {status === "success" && (
                <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-green-600">
                  <CheckCircle2 size={16} />
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-red-600">
                  <XCircle size={16} />
                  Failed to send message. Please try again.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* Reusable Components */

function InfoItem({
  icon,
  text,
  link,
}: {
  icon: React.ReactNode;
  text: string;
  link?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600 flex-shrink-0">
        {icon}
      </div>
      {link ? (
        <a
          href={link}
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-gray-700 hover:text-purple-600 transition-colors"
        >
          {text}
        </a>
      ) : (
        <span className="text-gray-700">{text}</span>
      )}
    </div>
  );
}

function InputField({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          {...props}
          required
          className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition"
        />
      </div>
    </div>
  );
}