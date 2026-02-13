export default function Heading({ children }) {
    return (
        <h2 className="font-bold font-orbitron pb-3 text-2xl text-white border-b border-white/5 inline-block mb-6">
            {children}
        </h2>
    );
}