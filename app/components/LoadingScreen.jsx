"use client";
import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [wipingOut, setWipingOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setWipingOut(true), 3600);
    const t2 = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (done) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      backgroundColor: '#000000',
      backgroundImage: "url('/spidey-loader.gif')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      clipPath: wipingOut ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
      WebkitClipPath: wipingOut ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
      transition: 'clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1), -webkit-clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1)',
      willChange: 'clip-path',
    }}>
      {/* Bottom label only */}
      <p style={{
        position: 'absolute', bottom: 36, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        textShadow: '0 0 20px rgba(0,0,0,0.9)',
        opacity: wipingOut ? 0 : 1,
        transform: wipingOut ? 'translateX(32px)' : 'translateX(0)',
        transition: 'opacity 0.3s ease, transform 0.4s ease',
        pointerEvents: 'none',
      }}>
        Swinging into the portfolio…
      </p>
    </div>
  );
}