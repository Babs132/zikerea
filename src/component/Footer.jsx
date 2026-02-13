"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, MessageCircle, MessageSquare } from "lucide-react";

export default function Footer() {
    const socials = [
        { icon: <Github size={20} />, link: "https://github.com/Babs132", color: "hover:bg-white hover:text-black" },
        { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/feed/", color: "hover:bg-[#0077b5] hover:text-white" },
        { icon: <MessageCircle size={20} />, link: "https://wa.me/32478041325", color: "hover:bg-[#25D366] hover:text-white" },
        { icon: <MessageSquare size={20} />, link: "https://discord.com/users/1285817428441563178", color: "hover:bg-[#5865F2] hover:text-white" },
    ];

    return (
        <footer className="w-full bg-black/40 border-t border-white/5 py-12 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                {/* Icônes de réseaux sociaux */}
                <div className="flex gap-6 mb-8">
                    {socials.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-3 bg-white/5 rounded-xl text-orange-500 transition-all duration-300 ${social.color}`}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-2xl font-black italic text-white mb-2">
                        Zik<span className="text-orange-500">Erea</span>
                    </p>
                    <p className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-bold">
                        © 2026 Balamanianthio • Tous droits réservés
                    </p>
                </div>
            </div>
        </footer>
    );
}