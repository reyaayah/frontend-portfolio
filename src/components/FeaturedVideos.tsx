"use client";

import { motion } from "framer-motion";

export default function FeaturedVideos() {
    // Replace these with your actual video paths in the public folder
    const videos = [
        { src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329687/GTS_Interview_Test_FrontEnd_Final_Video_anmj9j.mp4", poster: "/pizzashop.png", title: "Pizza Shop App", desc: "A pizza ordering application built with React and tailwind." },
        { src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329186/newstudy_ahh7jn.mp4", poster: "/study.png", title: "Study Video", desc: "My study session." },
        { src: "https://res.cloudinary.com/dtifvw8dv/video/upload/v1769329924/work_akmvce.mp4", poster: "/work.png", title: "Work Video", desc: "Me working on a project." },
    ];

    return (
        <section className="py-20 px-6 md:px-12 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center"
                >
                    My Featured Videos
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-700 text-center mb-12 max-w-2xl mx-auto"
                >
                    Check out some of my latest project videos and tutorials.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8">
                    {videos.map((video, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative pb-[56.25%]">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src={video.src}
                                    poster={video.poster}
                                    controls
                                    preload="metadata"
                                />

                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>
                                <p className="text-slate-600 mt-1 text-sm">{video.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
