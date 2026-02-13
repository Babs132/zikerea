"use client";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-black text-orange-500 italic hover:scale-105 transition-transform">
                    ZIKEREA
                </Link>
                <div className="flex gap-8 text-[10px] uppercase font-black tracking-widest">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
                    <Link href="/gallery" className="hover:text-orange-500 transition-colors">Musique</Link>
                    <Link href="/about" className="hover:text-orange-500 transition-colors">Présentation</Link>
                    <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
                </div>
            </div>
        </nav>
    );
}