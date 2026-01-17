import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Cursor position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Inner dot follows instantly
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Outer ring follows with delay (smooth trailing)
    const springConfig = { damping: 30, stiffness: 200 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Inner dot follows instantly
            dotX.set(e.clientX - 3);
            dotY.set(e.clientY - 3);

            // Outer ring follows with delay
            cursorX.set(e.clientX - 12);
            cursorY.set(e.clientY - 12);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Detect hover over interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY, dotX, dotY, isVisible]);

    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <div className="hidden md:block">
            {/* Outer ring - follows with delay */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: ringX,
                    translateY: ringY,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    className="rounded-full border-2"
                    animate={{
                        width: isHovering ? 40 : 24,
                        height: isHovering ? 40 : 24,
                        borderColor: isHovering ? 'rgb(34, 211, 238)' : 'rgb(52, 211, 153)',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        borderWidth: 2,
                        borderStyle: 'solid',
                    }}
                />
            </motion.div>

            {/* Inner dot - follows instantly */}
            <motion.div
                className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-emerald-400 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: dotX,
                    translateY: dotY,
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </div>
    );
}
