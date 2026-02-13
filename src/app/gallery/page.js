"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchInitialArtists } from "../../lib/audiodb";
import { Search, Play, Pause, Music, Star, Disc3, Music2, Mic2 } from "lucide-react";

export default function MusicPage() {
    const [artists, setArtists] = useState([]);
    const [displayArtists, setDisplayArtists] = useState([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Tous");
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // État de chargement
    const audioRef = useRef(null);

    // Initialisation
    useEffect(() => {
        setIsLoading(true);
        fetchInitialArtists().then(data => {
            setArtists(data);
            setDisplayArtists(data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    // Filtrage
    useEffect(() => {
        if (category === "Tous") {
            setDisplayArtists(artists);
        } else {
            const filtered = artists.filter(a => {
                const genre = a.strGenre ? a.strGenre.toLowerCase() : "";
                const search = category.toLowerCase();
                // On cherche si le mot clé est présent (ex: "Pop" dans "Pop/Rock")
                if (search === "electronic") return genre.includes("elect") || genre.includes("dance");
                return genre.includes(search);
            });
            setDisplayArtists(filtered);
        }
    }, [category, artists]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;
        setIsLoading(true);

        try {
            // On cherche sur l'API
            const res = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.artists) {
                setArtists(data.artists);
                setCategory("Tous");
            } else {
                alert("Artiste non trouvé. Vérifiez l'orthographe (ex: Rihanna)");
            }
        } catch (err) {
            console.error("Erreur API:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePlay = (artist) => {
        if (currentPlaying?.idArtist === artist.idArtist) {
            audioRef.current.pause();
            setCurrentPlaying(null);
        } else {
            setCurrentPlaying(artist);
            audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            audioRef.current.play();
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white pt-32 pb-40 px-6">
            <audio ref={audioRef} />
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 border-b border-white/5 pb-10">
                    <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
                        <input
                            type="text"
                            placeholder="Chercher un artiste (ex: Rihanna)..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-10 text-xs focus:border-orange-500 outline-none transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                        <button type="submit" className="absolute right-2 top-1.5 bg-orange-500 p-1.5 rounded-full">
                            <Search size={12} className="text-black" />
                        </button>
                    </form>

                    <nav className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 backdrop-blur-md">
                        {[
                            { name: "Tous", icon: <Star size={12} /> },
                            { name: "Pop", icon: <Disc3 size={12} /> },
                            { name: "Electronic", icon: <Music2 size={12} /> },
                            { name: "Rock", icon: <Mic2 size={12} /> }
                        ].map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                                    category === cat.name ? "bg-orange-500 text-black shadow-lg" : "text-slate-500"
                                }`}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20 italic text-orange-500 animate-pulse">Chargement des données API...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {displayArtists.length > 0 ? displayArtists.map((artist) => (
                                <motion.div
                                    key={artist.idArtist}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group bg-white/5 border border-white/10 rounded-[2rem] p-3"
                                >
                                    <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-4">
                                        <img src={artist.strArtistThumb} className="w-full h-full object-cover" alt="" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => togglePlay(artist)} className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                                {currentPlaying?.idArtist === artist.idArtist ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-black uppercase italic text-sm truncate px-2">{artist.strArtist}</h3>
                                    <p className="text-orange-500 text-[9px] font-black px-2 uppercase">{artist.strGenre || "Divers"}</p>
                                </motion.div>
                            )) : (
                                <div className="col-span-full text-center py-20 text-slate-500 uppercase text-xs tracking-[0.3em]">
                                    Désolé cette categorie n'est pas disponible pour le moment veuillez revenir vers l'accueil.
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}