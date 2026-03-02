"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A tiny spider silhouette as the cursor center
const SpiderCursorIcon = ({ size = 18, clicking }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <ellipse cx="50" cy="58" rx="11" ry="16" fill={clicking ? '#ff4500' : '#ff6348'} />
    <circle cx="50" cy="34" r="9" fill={clicking ? '#ff4500' : '#ff6348'} />
    {/* legs */}
    {[
      ['36','42','10','20'],['64','42','90','20'],
      ['34','54','6','48'],['66','54','94','48'],
      ['35','64','12','80'],['65','64','88','80'],
      ['37','72','18','94'],['63','72','82','94'],
    ].map(([x1,y1,x2,y2], k) => (
      <line key={k} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={clicking ? '#ff4500' : '#ff6348'}
        strokeWidth="5" strokeLinecap="round" />
    ))}
  </svg>
);

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Single cursor — fast spring, no lag
  const cursorX = useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.1 });
  const cursorY = useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.1 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia?.('(pointer: fine)');
    if (!media?.matches) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
      document.body.classList.add('cursor-none');
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const over = (e) => { if (e.target.closest?.('a,button,[data-hover]')) setHovering(true); };
    const out  = (e) => { if (!e.relatedTarget?.closest?.('a,button,[data-hover]')) setHovering(false); };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);
    document.addEventListener('mouseover',  over);
    document.addEventListener('mouseout',   out);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      document.removeEventListener('mouseover',  over);
      document.removeEventListener('mouseout',   out);
      document.body.classList.remove('cursor-none');
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  const size = clicking ? 22 : hovering ? 20 : 17;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', left: 0, top: 0,
          x: cursorX, y: cursorY,
          width: size, height: size,
          marginLeft: -size / 2, marginTop: -size / 2,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: clicking
            ? 'drop-shadow(0 0 6px rgba(255,69,0,0.9))'
            : hovering
            ? 'drop-shadow(0 0 5px rgba(255,99,72,0.75))'
            : 'drop-shadow(0 0 3px rgba(255,99,72,0.5))',
          transition: 'width 0.12s, height 0.12s, margin 0.12s, filter 0.15s',
        }}
        animate={{ rotate: clicking ? [0, -8, 8, 0] : 0 }}
        transition={{ duration: 0.25 }}
      >
        <SpiderCursorIcon size={size} clicking={clicking} />
      </motion.div>
      <style>{`
        @media (pointer: fine) {
          body.cursor-none * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}