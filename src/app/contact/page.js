"use client";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-[80vh] bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Effet de lumière central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block p-3 bg-orange-500/10 rounded-2xl text-orange-500 mb-6"
                >
                    <Sparkles size={32} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter"
                >
                    Travaillons <span className="text-orange-500">Ensemble</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    Vous avez un projet en tête ou vous souhaitez simplement discuter musique et tech ?
                    Mes réseaux sont juste en dessous, ou envoyez-moi un petit mail !
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <a
                        href="#"
                        className="group px-12 py-5 bg-orange-500 rounded-full font-black text-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all duration-300 inline-flex items-center gap-4 shadow-[0_10px_40px_rgba(249,115,22,0.2)]"
                    >
                        Envoyer un Mail
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </main>
    );
}