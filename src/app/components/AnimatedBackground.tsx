import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    phase: number;
    speed: number;
    radius: number;
    glowIntensity: number;
    pulsePhase: number;
    pulseSpeed: number;
    sparkTimer: number;
    trail: { x: number; y: number; opacity: number }[];
}

interface Connection {
    from: number;
    to: number;
    hasPulse: boolean;
    pulsePosition: number;
    pulseSpeed: number;
}

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const connectionsRef = useRef<Connection[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration parameters for subtle visibility
        const nodeConfig = {
            radiusMin: 5,
            radiusMax: 7,
            colorFill: 'rgba(139, 92, 246, 0.3)', // Further reduced from 0.4
            colorShadow: 'rgba(139, 92, 246, 0.35)',
            connectionOpacity: 0.1, // Further reduced from 0.15
            connectionWidth: 1.5,
        };

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeElements();
        };

        // Initialize neural network nodes
        const initializeElements = () => {
            const isMobile = window.innerWidth < 768;
            const nodeCount = isMobile ? 15 : 28;

            // Create nodes in clusters for brain-like structure
            nodesRef.current = [];
            const clusters = [
                { centerX: canvas.width * 0.2, centerY: canvas.height * 0.3, radius: 150, count: Math.floor(nodeCount * 0.35) },
                { centerX: canvas.width * 0.25, centerY: canvas.height * 0.6, radius: 120, count: Math.floor(nodeCount * 0.35) },
                { centerX: canvas.width * 0.35, centerY: canvas.height * 0.45, radius: 100, count: Math.floor(nodeCount * 0.3) },
            ];

            clusters.forEach(cluster => {
                for (let i = 0; i < cluster.count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * cluster.radius;
                    const x = cluster.centerX + Math.cos(angle) * distance;
                    const y = cluster.centerY + Math.sin(angle) * distance;

                    nodesRef.current.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.0004 + Math.random() * 0.0003,
                        radius: nodeConfig.radiusMin + Math.random() * (nodeConfig.radiusMax - nodeConfig.radiusMin),
                        glowIntensity: 15 + Math.random() * 5, // Reduced from 30+
                        pulsePhase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.001 + Math.random() * 0.001,
                        sparkTimer: Math.random() * 8000,
                        trail: [],
                    });
                }
            });

            // Create connections
            connectionsRef.current = [];
            nodesRef.current.forEach((node, i) => {
                nodesRef.current.forEach((otherNode, j) => {
                    if (i !== j) {
                        const distance = Math.sqrt(
                            Math.pow(node.baseX - otherNode.baseX, 2) +
                            Math.pow(node.baseY - otherNode.baseY, 2)
                        );

                        if (distance < 180 && connectionsRef.current.length < nodeCount * 2) {
                            const hasPulse = Math.random() < 0.2; // 20% chance of pulse
                            connectionsRef.current.push({
                                from: i,
                                to: j,
                                hasPulse,
                                pulsePosition: hasPulse ? Math.random() : 0,
                                pulseSpeed: 0.0008 + Math.random() * 0.0004,
                            });
                        }
                    }
                });
            });
        };

        // Calculate opacity based on radial mask (Vignette Effect)
        const getRadialFade = (x: number, y: number): number => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const distance = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );

            // Center (portrait area) has LOWER opacity (0.2), edges have higher (0.5)
            // This keeps focus on the content
            const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const normalizedDist = distance / maxDist;

            return 0.15 + (normalizedDist * 0.4); // Softer range: 0.15 to 0.55
        };

        // Draw glowing node
        const drawNode = (node: Node, timestamp: number, isSparking: boolean) => {
            const radialOpacity = getRadialFade(node.x, node.y);

            // Pulsing glow intensity
            const pulseGlow = Math.sin(timestamp * node.pulseSpeed + node.pulsePhase) * 5;
            const currentGlow = isSparking ? 30 : node.glowIntensity + pulseGlow; // Reduced max glow

            // Draw outer glow
            ctx.shadowColor = nodeConfig.colorShadow;
            ctx.shadowBlur = currentGlow; // Reduced blur
            ctx.fillStyle = nodeConfig.colorFill;
            ctx.globalAlpha = radialOpacity;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0; // Reset

            // Bright core (smaller and less opaque)
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * radialOpacity})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Draw trail
            node.trail.forEach((point, index) => {
                const trailOpacity = point.opacity * radialOpacity;
                ctx.fillStyle = `rgba(139, 92, 246, ${trailOpacity})`;
                ctx.beginPath();
                ctx.arc(point.x, point.y, node.radius * 0.7, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        // Draw connection with glow
        const drawConnection = (conn: Connection, timestamp: number) => {
            const nodeA = nodesRef.current[conn.from];
            const nodeB = nodesRef.current[conn.to];
            if (!nodeA || !nodeB) return;

            const distance = Math.sqrt(
                Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
            );

            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2;
            const radialOpacity = getRadialFade(midX, midY);

            // Distance-based opacity: <100px = 0.15, >150px = 0.05
            let distOpacity = 0.05;
            if (distance < 100) distOpacity = 0.15;
            else if (distance < 150) distOpacity = 0.15 - ((distance - 100) / 50) * 0.10;

            const finalOpacity = distOpacity * radialOpacity;

            // Draw line
            ctx.strokeStyle = `rgba(139, 92, 246, ${finalOpacity})`;
            ctx.lineWidth = nodeConfig.connectionWidth;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();

            // Draw traveling pulse
            if (conn.hasPulse) {
                conn.pulsePosition += conn.pulseSpeed;
                if (conn.pulsePosition > 1) {
                    conn.pulsePosition = 0;
                }

                const pulseX = nodeA.x + (nodeB.x - nodeA.x) * conn.pulsePosition;
                const pulseY = nodeA.y + (nodeB.y - nodeA.y) * conn.pulsePosition;

                ctx.shadowColor = 'rgba(167, 139, 250, 0.5)';
                ctx.shadowBlur = 8;
                ctx.fillStyle = `rgba(221, 214, 254, ${0.6 * radialOpacity})`;
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        };

        // Draw audio waveforms - Subtle Blue/Purple
        const drawWaveforms = (timestamp: number) => {
            const startX = canvas.width * 0.6;
            const endX = canvas.width * 0.95;
            const waves = [
                { y: canvas.height * 0.25, freq: 0.0008, amp: 20, color: 'rgba(59, 130, 246, 0.25)', blur: 6 }, // Blue-500 low opacity
                { y: canvas.height * 0.5, freq: 0.0012, amp: 25, color: 'rgba(168, 85, 247, 0.2)', blur: 8 }, // Purple-500 low opacity
                { y: canvas.height * 0.75, freq: 0.001, amp: 22, color: 'rgba(56, 189, 248, 0.25)', blur: 6 }, // Sky-400 low opacity
            ];

            waves.forEach((wave, i) => {
                // Vertical fade logic
                const distFromCenterY = Math.abs(wave.y - canvas.height / 2);
                const maxDistY = canvas.height / 2;
                const verticalFade = 1 - (distFromCenterY / maxDistY) * 0.5; // 1.0 at center, 0.5 at edges

                ctx.shadowColor = wave.color.replace('0.25', '0.1').replace('0.2', '0.1'); // Very subtle shadow
                ctx.shadowBlur = wave.blur;
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2.5;
                ctx.globalAlpha = verticalFade;

                ctx.beginPath();

                for (let x = startX; x <= endX; x += 5) {
                    const relativeX = (x - startX) / (endX - startX);
                    // Combine vertical fade with x-position fade (optional)

                    const y = wave.y +
                        Math.sin(relativeX * Math.PI * 4 + timestamp * wave.freq) * wave.amp +
                        Math.sin(relativeX * Math.PI * 2 + timestamp * wave.freq * 0.5) * (wave.amp * 0.5);

                    if (x === startX) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;
            });
        };

        // Main animation loop
        let lastTime = 0;
        const animate = (timestamp: number) => {
            if (timestamp - lastTime < 33) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastTime = timestamp;

            // Clear canvas with dark vignette
            ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach((node) => {
                // Update position (drift)
                const driftRadius = 6;
                const newX = node.baseX + Math.cos(timestamp * node.speed + node.phase) * driftRadius;
                const newY = node.baseY + Math.sin(timestamp * node.speed + node.phase) * driftRadius;

                // Add to trail
                if (node.trail.length > 0) {
                    node.trail = node.trail.map(p => ({ ...p, opacity: p.opacity * 0.85 })).filter(p => p.opacity > 0.01);
                }
                if (Math.random() < 0.3) {
                    node.trail.push({ x: node.x, y: node.y, opacity: 0.08 });
                }

                node.x = newX;
                node.y = newY;

                // Check for spark
                node.sparkTimer -= 33;
                const isSparking = node.sparkTimer < 200 && node.sparkTimer > 0;
                if (node.sparkTimer <= 0) {
                    node.sparkTimer = 5000 + Math.random() * 3000;
                }

                drawNode(node, timestamp, isSparking);
            });

            // Draw connections
            connectionsRef.current.forEach(conn => {
                drawConnection(conn, timestamp);
            });

            // Draw waveforms
            drawWaveforms(timestamp);

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Initialize and start
        resizeCanvas();
        animationFrameRef.current = requestAnimationFrame(animate);

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
            style={{ opacity: 0.85 }}
        />
    );
}
