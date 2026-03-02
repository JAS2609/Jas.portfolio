"use client";
import React, { useEffect, useRef, useCallback } from 'react';

export default function InteractiveWeb() {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const raf = useRef(null);
    const inHero = useRef(false);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Skip heavy canvas animation on non-precision pointers (touch devices)
        const media = window.matchMedia && window.matchMedia('(pointer: fine)');
        if (!media || !media.matches) return;

        const ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);

        let lastPoint = 0;

        const computeInHero = (x, y) => {
            const hero = document.getElementById('hero');
            if (!hero) return false;
            const r = hero.getBoundingClientRect();
            return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        };

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            inHero.current = computeInHero(e.clientX, e.clientY);
            if (inHero.current) return;
            const now = Date.now();
            if (now - lastPoint > 60) {
                points.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    birth: now,
                    life: 3000 + Math.random() * 2000,
                });
                lastPoint = now;
                if (points.current.length > 50) points.current.shift();
            }
        };

        const handleClick = (e) => {
            inHero.current = computeInHero(e.clientX, e.clientY);
            if (inHero.current) return;
            // Burst of web points on click
            const cx = e.clientX, cy = e.clientY;
            const now = Date.now();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const dist = 40 + Math.random() * 80;
                points.current.push({
                    x: cx + Math.cos(angle) * dist,
                    y: cy + Math.sin(angle) * dist,
                    birth: now,
                    life: 4000 + Math.random() * 2000,
                });
            }
            // Center point
            points.current.push({ x: cx, y: cy, birth: now, life: 5000 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (inHero.current) {
                raf.current = requestAnimationFrame(draw);
                return;
            }
            const now = Date.now();

            // Filter dead points
            points.current = points.current.filter(p => now - p.birth < p.life);

            const pts = points.current;

            // Draw connections
            for (let i = 0; i < pts.length; i++) {
                const a = pts[i];
                const aAge = (now - a.birth) / a.life;
                const aAlpha = 1 - aAge;

                for (let j = i + 1; j < pts.length; j++) {
                    const b = pts[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) {
                        const bAge = (now - b.birth) / b.life;
                        const bAlpha = 1 - bAge;
                        const alpha = Math.min(aAlpha, bAlpha) * (1 - dist / 180) * 0.38;

                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(255, 106, 0, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }

                // Draw point
                const radius = 2 * aAlpha;
                ctx.beginPath();
                ctx.arc(a.x, a.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 106, 0, ${aAlpha * 0.55})`;
                ctx.fill();
            }

            // Draw web from cursor to nearby points
            const mx = mouse.current.x, my = mouse.current.y;
            for (const p of pts) {
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 240) {
                    const age = (now - p.birth) / p.life;
                    const alpha = (1 - age) * (1 - dist / 240) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(mx, my);
                    // Curved line for web-like feel
                    const cpx = (mx + p.x) / 2 + (Math.random() - 0.5) * 10;
                    const cpy = (my + p.y) / 2 + (Math.random() - 0.5) * 10;
                    ctx.quadraticCurveTo(cpx, cpy, p.x, p.y);
                    ctx.strokeStyle = `rgba(255, 174, 64, ${alpha})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }

            raf.current = requestAnimationFrame(draw);
        };

        raf.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [resize]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2,
                pointerEvents: 'none',
            }}
        />
    );
}
