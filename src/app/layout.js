import "./globals.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className="bg-[#020617] text-white flex flex-col min-h-screen">
        {/* Navbar en haut */}
        <Navbar />

        {/* Contenu principal qui pousse le footer vers le bas */}
        <main className="flex-grow">
            {children}
        </main>

        {/* Footer unique en bas */}
        <Footer />
        </body>
        </html>
    );
}