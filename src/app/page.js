"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchInitialArtists } from "@/lib/audiodb";
import { Play, Pause, Music2, Disc3, Mic2, Star } from "lucide-react";

export default function HomePage() {
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [category, setCategory] = useState("Tous");
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchInitialArtists().then(data => {
            setArtists(data);
            setFilteredArtists(data);
        });
    }, []);

    // LOGIQUE DE FILTRAGE OPTIMISÉE
    useEffect(() => {
        if (category === "Tous") {
            setFilteredArtists(artists);
        } else {
            const filtered = artists.filter(a => {
                const genre = a.strGenre ? a.strGenre.toLowerCase() : "";
                const search = category.toLowerCase();

                // On cherche si le mot "electron" est contenu dans le genre de l'API
                if (search === "electronic") {
                    return genre.includes("electron") || genre.includes("electro");
                }
                return genre.includes(search);
            });
            setFilteredArtists(filtered);
        }
    }, [category, artists]);

    const handlePlay = (artist) => {
        if (currentPlaying?.idArtist === artist.idArtist) {
            audioRef.current.pause();
            setCurrentPlaying(null);
        } else {
            setCurrentPlaying(artist);
            // On utilise un lien MP3 de test
            audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            audioRef.current.play();
        }
    };

    const categories = [
        { name: "Tous", icon: <Star size={14} /> },
        { name: "Pop", icon: <Disc3 size={14} /> },
        { name: "Electronic", icon: <Music2 size={14} /> },
        { name: "Rock", icon: <Mic2 size={14} /> }
    ];

    return (
        <main className="min-h-screen bg-[#020617] text-white pt-32 pb-40 px-6 overflow-hidden">
            <audio ref={audioRef} />

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-6xl font-black italic uppercase tracking-tighter">
                            ZIK<span className="text-orange-500">EREA</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">Explorer par catégorie</p>
                    </div>

                    <nav className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setCategory(cat.name)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                                    category === cat.name ? "bg-orange-500 text-black" : "hover:bg-white/10 text-slate-400"
                                }`}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredArtists.length > 0 ? (
                            filteredArtists.map((artist) => (
                                <motion.div
                                    key={artist.idArtist}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-4 hover:border-orange-500/50 transition-all shadow-2xl"
                                >
                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                                        <img src={artist.strArtistThumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={artist.strArtist} />
                                        <button
                                            onClick={() => handlePlay(artist)}
                                            className="absolute inset-0 m-auto w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            {currentPlaying?.idArtist === artist.idArtist ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} />}
                                        </button>
                                    </div>
                                    <h3 className="font-black uppercase italic text-lg truncate px-2">{artist.strArtist}</h3>
                                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest px-2">{artist.strGenre || "Genre inconnu"}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center py-20 text-slate-500 uppercase font-bold tracking-widest text-xs">Désolé il y'a une indisponibilité pour cette categorie veuillez explorer les autres en attendant</p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {currentPlaying && (
                    <motion.div
                        initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-orange-500 p-5 rounded-[2rem] flex items-center justify-between px-10 z-50 shadow-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <Music2 size={20} className="animate-pulse text-black" />
                            <h4 className="text-black font-black uppercase text-sm truncate">{currentPlaying.strArtist}</h4>
                        </div>
                        <button
                            onClick={() => {audioRef.current.pause(); setCurrentPlaying(null)}}
                            className="bg-black text-white text-[9px] px-6 py-2 rounded-full font-black uppercase"
                        >
                            Arrêter
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}