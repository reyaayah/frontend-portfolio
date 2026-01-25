"use client";

import { sendForm } from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Phone, User, Cloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status.includes("successfully")) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending message...");

    sendForm(
      "service_66ksnr8",
      "template_g8y6ton",
      form.current!,
      "QZOcYQGZWq2p2PnuZ"
    ).then(
      () => setStatus("Message sent successfully! 🚀"),
      () => setStatus("Failed to send message. ❌")
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700">
              Let&apos;s Connect
            </h2>
            <Cloud className="w-12 h-12 text-purple-400" />
          </div>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Have an idea, project, or just want to say hi?
            I’m always open to meaningful conversations.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-5 text-gray-700">
              <InfoItem icon={<Mail />} text="riyaawal7@gmail.com" />
              <InfoItem icon={<Phone />} text="9841028543" />
              <InfoItem
                icon={<Github />}
                link="https://github.com/reyaayah"
                text="github.com/reyaayah"
              />
              <InfoItem
                icon={<Linkedin />}
                link="https://np.linkedin.com/in/riya-awal-591330294"
                text="linkedin.com/in/riyaawal"
              />
            </div>

            <div className="rounded-xl bg-white/60 backdrop-blur-md p-6 shadow-sm">
              <p className="text-sm text-gray-600 italic">
                “Great things are built through conversations.”
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-6"
          >
            <InputField
              label="Your Name"
              icon={<User size={18} />}
              name="from_name"
              type="text"
            />

            <InputField
              label="Email Address"
              icon={<Mail size={18} />}
              name="reply_to"
              type="email"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
            >
              <Send size={18} />
              Send Message
            </button>

            {status && (
              <div
                className={`text-center text-sm font-medium ${status.includes("successfully")
                  ? "text-green-600"
                  : status.includes("Failed")
                    ? "text-red-600"
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
      <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
        {icon}
      </div>
      {link ? (
        <a href={link} target="_blank" className="hover:underline">
          {text}
        </a>
      ) : (
        <span>{text}</span>
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          {...props}
          required
          className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
