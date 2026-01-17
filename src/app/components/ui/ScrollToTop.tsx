import { useEffect, useState } from 'react';
import { motion, useScroll, useAnimation, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            if (latest > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-800 transition-colors"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
