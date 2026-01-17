import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface CodeSnippetProps {
    code: string;
    language?: string;
    position: string; // Tailwind class for absolute positioning e.g., "top-10 left-10"
    delay?: number;
    rotation?: number;
    opacity?: number;
}

export function CodeSnippet({
    code,
    position,
    delay = 0,
    rotation = 0,
    opacity = 0.8
}: CodeSnippetProps) {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    // Very subtle parallax effect - 0.1x speed
    const yParallax = useTransform(scrollY, [0, 1000], [0, 100]);

    // Syntax highlighting helper
    const formatCode = (text: string) => {
        return text.split('\n').map((line, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap break-words font-mono">
                {line.split(' ').map((token, j) => {
                    let className = "text-gray-200"; // default

                    if (["import", "from", "as", "class", "def", "return", "const", "let", "var", "async", "await"].includes(token)) className = "text-emerald-300 font-semibold";
                    else if (token.startsWith('"') || token.startsWith("'")) className = "text-cyan-200";
                    else if (token.match(/^[A-Z][a-zA-Z]*$/)) className = "text-violet-300"; // Class names
                    else if (token.includes("(") || token.endsWith(")")) className = "text-violet-200"; // Function calls
                    else if (token.startsWith("#") || token.startsWith("//")) className = "text-gray-500 italic"; // Comments
                    else if (["=", ":", "[", "]", "{", "}"].some(char => token.includes(char))) className = "text-gray-400"; // Operators

                    // Basic heuristic fixes
                    if (token.startsWith("self")) className = "text-emerald-200";
                    if (token.match(/^\d+$/)) className = "text-cyan-200"; // Numbers

                    return <span key={j} className={className}>{token} </span>;
                })}
            </div>
        ));
    };

    return (
        <motion.div
            ref={ref}
            className={`absolute ${position} z-[5] pointer-events-none hidden md:block`}
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: opacity, scale: 1 }}
            transition={{ duration: 0.8, delay }}
        >
            <div className="bg-gray-900/85 backdrop-blur-lg border-2 border-cyan-500/40 rounded-xl p-4 shadow-2xl shadow-cyan-500/20 
                          min-w-[240px] max-w-[280px] min-h-[100px] max-h-[140px] overflow-hidden flex flex-col justify-start"
                style={{ boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(16, 185, 129, 0.05)' }}>
                {/* MacOS Style Dots */}
                <div className="flex gap-2 mb-3 opacity-80 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90 shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90 shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-sm" />
                </div>

                {/* Code Content */}
                <div className="text-xs leading-relaxed tracking-wide font-mono overflow-hidden break-words line-clamp-5 text-left">
                    {formatCode(code)}
                </div>
            </div>
        </motion.div>
    );
}
