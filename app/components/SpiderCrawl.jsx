"use client";
import React from 'react';

const SpiderSVG = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="rgba(255,255,255,0.15)">
        <ellipse cx="50" cy="58" rx="14" ry="20" />
        <circle cx="50" cy="34" r="10" />
        <line x1="36" y1="42" x2="12" y2="22" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="64" y1="42" x2="88" y2="22" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="36" y1="52" x2="8" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="64" y1="52" x2="92" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="36" y1="62" x2="14" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="64" y1="62" x2="86" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="38" y1="72" x2="20" y2="96" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <line x1="62" y1="72" x2="80" y2="96" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
    </svg>
);

const spiders = [
    { id: 1, startX: '5%', startY: '-5%', endX: '5%', endY: '105%', duration: '35s', delay: '0s', size: 14, threadLen: 40 },
    { id: 2, startX: '92%', startY: '-8%', endX: '88%', endY: '108%', duration: '42s', delay: '5s', size: 12, threadLen: 55 },
    { id: 3, startX: '50%', startY: '-3%', endX: '55%', endY: '103%', duration: '50s', delay: '12s', size: 10, threadLen: 70 },
    { id: 4, startX: '78%', startY: '-6%', endX: '72%', endY: '106%', duration: '38s', delay: '20s', size: 16, threadLen: 35 },
];

export default function SpiderCrawl() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
            overflow: 'hidden',
        }}>
            {spiders.map((s) => (
                <div
                    key={s.id}
                    className={`crawling-spider-${s.id}`}
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div style={{
                        width: '0.5px',
                        height: `${s.threadLen}px`,
                        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))',
                    }} />
                    <SpiderSVG size={s.size} />
                </div>
            ))}

            <style>{`
        ${spiders.map(s => `
          .crawling-spider-${s.id} {
            left: ${s.startX};
            top: ${s.startY};
            animation: crawl-${s.id} ${s.duration} linear ${s.delay} infinite;
          }
          @keyframes crawl-${s.id} {
            0% { left: ${s.startX}; top: ${s.startY}; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { left: ${s.endX}; top: ${s.endY}; opacity: 0; }
          }
        `).join('\n')}
      `}</style>
        </div>
    );
}
