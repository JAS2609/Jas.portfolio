"use client";
import React, { useEffect, useRef } from 'react';

export default function SpiderWebBG() {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate web radial lines and spiral
    const cx = 500, cy = 500;
    const numRadials = 16;
    const numRings = 8;
    const maxR = 480;

    const radials = [];
    for (let i = 0; i < numRadials; i++) {
        const angle = (i / numRadials) * Math.PI * 2;
        const ex = cx + Math.cos(angle) * maxR;
        const ey = cy + Math.sin(angle) * maxR;
        radials.push(
            <line key={`r${i}`} x1={cx} y1={cy} x2={ex} y2={ey}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        );
    }

    const rings = [];
    for (let ring = 1; ring <= numRings; ring++) {
        const r = (ring / numRings) * maxR;
        const points = [];
        for (let i = 0; i <= numRadials; i++) {
            const idx = i % numRadials;
            const angle = (idx / numRadials) * Math.PI * 2;
            // Slight sag between radials
            const sagAngle = ((idx + 0.5) / numRadials) * Math.PI * 2;
            const sagR = r * 0.92;

            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;

            if (i < numRadials) {
                const nextAngle = ((idx + 1) / numRadials) * Math.PI * 2;
                const npx = cx + Math.cos(nextAngle) * r;
                const npy = cy + Math.sin(nextAngle) * r;
                const cpx = cx + Math.cos(sagAngle) * sagR;
                const cpy = cy + Math.sin(sagAngle) * sagR;

                points.push(
                    <path key={`ring${ring}-${i}`}
                        d={`M ${px} ${py} Q ${cpx} ${cpy} ${npx} ${npy}`}
                        stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" fill="none" />
                );
            }
        }
        rings.push(...points);
    }

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
        }}>
            <div ref={containerRef} style={{
                width: '100%',
                height: '100%',
                transition: 'transform 0.3s ease-out',
            }}>
                {/* Web 1 - top left */}
                <svg viewBox="0 0 1000 1000" style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-15%',
                    width: '70%',
                    height: '70%',
                    opacity: 0.6,
                }}>
                    {radials}
                    {rings}
                </svg>

                {/* Web 2 - bottom right */}
                <svg viewBox="0 0 1000 1000" style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-20%',
                    width: '65%',
                    height: '65%',
                    opacity: 0.4,
                    transform: 'rotate(45deg)',
                }}>
                    {radials}
                    {rings}
                </svg>

                {/* Web 3 - top right corner */}
                <svg viewBox="0 0 1000 1000" style={{
                    position: 'absolute',
                    top: '-25%',
                    right: '-10%',
                    width: '50%',
                    height: '50%',
                    opacity: 0.3,
                    transform: 'rotate(22deg)',
                }}>
                    {radials}
                    {rings}
                </svg>
            </div>
        </div>
    );
}
