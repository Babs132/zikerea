"use client";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

const SOCIALS = [
    { name: "GitHub", href: "https://github.com/Balamanianthio-Dev", icon: <SiGithub /> },
    { name: "LinkedIn", href: "https://linkedin.com/in/Balamanianthio", icon: <SiLinkedin /> },
    { name: "X", href: "https://x.com", icon: <SiX /> },
    { name: "Instagram", href: "https://instagram.com", icon: <SiInstagram /> },
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
                    className="text-slate-400 hover:text-orange-500 transition-colors text-2xl"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}