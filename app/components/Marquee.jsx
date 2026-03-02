"use client";
import React from 'react';

export default function Marquee({ texts, reverse = false, speed = 40 }) {
    const items = [...texts, ...texts, ...texts, ...texts]; // quadruple for seamless loop

    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '20px 0',
            borderTop: '1px solid rgba(37,99,235,0.25)',
            borderBottom: '1px solid rgba(37,99,235,0.25)',
            background: 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(15,23,42,0.9))',
            boxShadow: '0 0 38px rgba(37,99,235,0.45)',
        }}>
            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0,
                    animation: `marquee-${reverse ? 'reverse' : 'forward'} ${speed}s linear infinite`,
                }}
            >
                {items.map((text, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '0 24px' }}>
                        <span style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'rgba(191,219,254,0.9)',
                            textShadow: '0 0 12px rgba(59,130,246,0.8)',
                            transition: 'color 0.3s ease, text-shadow 0.3s ease',
                        }}>
                            {text}
                        </span>
                        <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: 'rgba(59,130,246,0.6)',
                            flexShrink: 0,
                        }} />
                    </span>
                ))}
            </div>
            <style>{`
        @keyframes marquee-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
}
