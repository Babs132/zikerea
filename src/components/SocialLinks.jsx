"use client";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const SOCIALS = [
    { name: "GitHub", href: "https://github.com/Babs132", icon: <Github size={24} /> },
    { name: "LinkedIn", href: "https://linkedin.com/in/Babs132", icon: <Linkedin size={24} /> },
    { name: "X", href: "https://x.com", icon: <Twitter size={24} /> },
    { name: "Instagram", href: "https://instagram.com", icon: <Instagram size={24} /> },
];

export default function SocialLinks() {
    return (
        <div className="flex gap-6">
            {SOCIALS.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}