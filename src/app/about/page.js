"use client";
import { motion } from "framer-motion";
import { Headphones, Users, Zap } from "lucide-react";

export default function AboutPage() {
    // Variantes pour l'apparition au scroll
    const fadeInVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const features = [
        { icon: <Headphones size={30} className="text-orange-500" />, title: "Découverte Instantanée", description: "Explorez un catalogue musical riche et varié en quelques clics." },
        { icon: <Users size={30} className="text-orange-500" />, title: "Artistes Mondiaux", description: "Des légendes aux talents émergents, SAMAZIK vous connecte." },
        { icon: <Zap size={30} className="text-orange-500" />, title: "Expérience Fluide", description: "Une interface intuitive et des performances optimisées pour tous vos appareils." },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#020617]">
            <main className="flex-grow pt-32 px-6 text-white flex flex-col items-center justify-center relative overflow-hidden">
                {/* Effet lumineux d'arrière-plan */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-black italic uppercase mb-8 leading-tight"
                        variants={textVariants}
                    >
                        {"L'EXPÉRIENCE ".split("").map((char, i) => (
                            <motion.span key={i} variants={letterVariants}>{char}</motion.span>
                        ))}
                        <span className="text-orange-500">
                            {" SAMAZIK".split("").map((char, i) => (
                                <motion.span key={i} variants={letterVariants}>{char}</motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto tracking-wide leading-relaxed"
                        variants={fadeInVariants}
                    >
                        Découvrez une nouvelle façon d'explorer la musique. Propulsée par l'API TheAudioDB,
                        Zikerea offre un accès instantané à des milliers d'artistes avec une interface moderne.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    borderColor: "rgba(249, 115, 22, 0.5)"
                                }}
                                className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl transition-all duration-300"
                            >
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="mb-6"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="font-black uppercase italic text-lg mb-3 text-center">{feature.title}</h3>
                                <p className="text-slate-500 text-sm text-center leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}