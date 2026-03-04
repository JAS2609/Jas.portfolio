"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Phone, ArrowUpRight, Code2, Layers, Palette, Globe, Server, Database, ArrowRight, Briefcase, Calendar, MapPin, Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import SpiderWebBG from './components/SpiderWebBG';
import Marquee from './components/Marquee';
/* ─── PRELOAD UNICORN ─── */
if (typeof window !== 'undefined' && !window.__unicornPreloaded) {
  window.__unicornPreloaded = true;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.3/dist/unicornStudio.umd.js';
  s.async = true;
  s.onload = () => { try { window.UnicornStudio?.init(); } catch(e){} };
  document.head.appendChild(s);
}

/* ═══ UNICORN SCENE ═══ */
const UnicornScene = () => {
  useEffect(() => {
    const tryInit = () => { try { window.UnicornStudio?.init(); } catch(e){} };
    if (window.UnicornStudio?.init) tryInit();
    else { const t = setTimeout(tryInit, 600); return () => clearTimeout(t); }
  }, []);
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '140%', height: '112%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', zIndex: 1,
      willChange: 'auto',
      pointerEvents: 'none',
    }}>
      <div
        data-us-project="YpC2ERpId4SqPSACwfMb"
        style={{ width: '100%', height: '100%', minWidth: '100vw', minHeight: '100vh' }}
      />
    </div>
  );
};

/* ═══ SPIDER LOGO ═══ */
const SpiderLogo = ({ size = 20, color = '#c23616' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
    <ellipse cx="50" cy="58" rx="14" ry="20"/><circle cx="50" cy="34" r="10"/>
    <line x1="36" y1="42" x2="12" y2="22" stroke={color} strokeWidth="3"/>
    <line x1="64" y1="42" x2="88" y2="22" stroke={color} strokeWidth="3"/>
    <line x1="36" y1="52" x2="8"  y2="52" stroke={color} strokeWidth="3"/>
    <line x1="64" y1="52" x2="92" y2="52" stroke={color} strokeWidth="3"/>
    <line x1="36" y1="62" x2="14" y2="82" stroke={color} strokeWidth="3"/>
    <line x1="64" y1="62" x2="86" y2="82" stroke={color} strokeWidth="3"/>
    <line x1="38" y1="72" x2="20" y2="96" stroke={color} strokeWidth="3"/>
    <line x1="62" y1="72" x2="80" y2="96" stroke={color} strokeWidth="3"/>
  </svg>
);

/* ═══ MAGNETIC BUTTON ═══ */
const MagBtn = ({ children, style = {} }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: (e.clientX - r.left - r.width/2)*0.2, y: (e.clientY - r.top - r.height/2)*0.2 });
      }}
      onMouseLeave={() => setPos({ x:0, y:0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type:'spring', stiffness:250, damping:18 }}
      style={{ display:'inline-block', ...style }}>
      {children}
    </motion.div>
  );
};

/* ═══ REVEAL ═══ */
const Reveal = ({ children, delay=0, direction='up' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const d = { up:{y:40}, down:{y:-40}, left:{x:60}, right:{x:-60} };
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, filter:'blur(4px)', ...d[direction] }}
      animate={inView ? { opacity:1, filter:'blur(0px)', x:0, y:0 } : {}}
      transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
};

/* ═══ STAGGER TEXT ═══ */
const StaggerText = ({ text, delay=0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <span ref={ref} style={{ display:'inline-block' }}>
      {text.split('').map((c, i) => (
        <motion.span key={i}
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.45, delay: delay + i*0.022, ease:[0.22,1,0.36,1] }}
          style={{ display: c===' ' ? 'inline' : 'inline-block' }}>
          {c===' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ═══ SKILL BAR ═══ */
const SkillBar = ({ name, level, icon:Icon, delay=0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  return (
    <motion.div ref={ref} initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.5,delay}}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {Icon && <Icon size={13} style={{color:'#c23616'}}/>}
          <span style={{ fontSize:13, color:'rgba(255,255,255,0.7)' }}>{name}</span>
        </div>
        <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{level}%</span>
      </div>
      <div style={{ height:3, borderRadius:4, background:'rgba(255,255,255,0.04)', overflow:'hidden' }}>
        <motion.div initial={{width:0}} animate={inView?{width:`${level}%`}:{}}
          transition={{duration:1.4, delay:delay+0.2, ease:[0.22,1,0.36,1]}}
          style={{ height:'100%', borderRadius:4, background:'linear-gradient(90deg,#c23616,#e84118,#ff6348)' }}/>
      </div>
    </motion.div>
  );
};

/* ═══ TILT 3D ═══ */
const Tilt3D = ({ children, style={}, intensity=8 }) => {
  const ref = useRef(null);
  const [t, setT] = useState({ rx:0, ry:0 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setT({ rx:-((e.clientY-r.top)/r.height-0.5)*intensity, ry:((e.clientX-r.left)/r.width-0.5)*intensity });
      }}
      onMouseLeave={() => setT({rx:0,ry:0})}
      animate={{ rotateX:t.rx, rotateY:t.ry }}
      transition={{ type:'spring', stiffness:200, damping:20 }}
      style={{ perspective:1000, transformStyle:'preserve-3d', ...style }}>
      {children}
    </motion.div>
  );
};

/* PROJECT CARD */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <motion.div
        onMouseMove={e => {
          const r = ref.current?.getBoundingClientRect();
          if (r) setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
        animate={{
          y: hovered ? -10 : 0,
          rotateX: hovered ? (mouse.y - 0.5) * -8 : 0,
          rotateY: hovered ? (mouse.x - 0.5) * 8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'rgba(8, 10, 18, 0.97)',
          border: `1px solid ${hovered ? `${project.accent}55` : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hovered
            ? `0 32px 72px ${project.accent}28, 0 0 0 1px ${project.accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`
            : '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
          perspective: 1000,
          transformStyle: 'preserve-3d',
          transition: 'border-color 0.4s, box-shadow 0.4s',
          cursor: 'pointer',
        }}
      >
        {/* Accent left strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
          background: `linear-gradient(to bottom, ${project.accent}, ${project.accent}00)`,
          borderRadius: '2px 0 0 2px',
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.4s',
          zIndex: 10,
        }} />

        {/* Media container*/}
        <div style={{ position: 'relative', height: 210, flexShrink: 0, overflow: 'hidden' }}>
          <motion.img
            src={project.img}
            alt={project.title}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg,
              rgba(4,6,12,0.72) 0%,
              rgba(4,6,12,0.50) 40%,
              ${project.accent}22 80%,
              rgba(4,6,12,0.75) 100%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, rgba(8,10,18,0.98), transparent)',
          }} />

          {/* Live link badge */}
          <motion.a
            href={project.link} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: project.accent,
              borderRadius: 999, padding: '6px 14px',
              fontSize: 11, fontWeight: 600, color: '#fff',
              display: 'flex', alignItems: 'center', gap: 5,
              textDecoration: 'none',
              boxShadow: `0 4px 20px ${project.accent}55`,
            }}
            onClick={e => e.stopPropagation()}
          >
            Live <ArrowUpRight size={11} />
          </motion.a>
        </div>

        {/* Card body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 24px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: 6 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: project.accent,
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{
                width: 16, height: 1,
                background: `linear-gradient(to right, ${project.accent}, ${project.accent}00)`,
                display: 'inline-block',
              }} />
              {project.subtitle}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 21, fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.15,
            color: '#fff', marginBottom: 10,
          }}>
            {project.title}
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.42)', fontSize: 13,
            lineHeight: 1.75, flex: 1, marginBottom: 20,
          }}>
            {project.desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  padding: '3px 11px', borderRadius: 999,
                  fontSize: 10, fontWeight: 600,
                  border: `1px solid ${project.accent}30`,
                  color: 'rgba(255,255,255,0.55)',
                  background: `${project.accent}0e`,
                  letterSpacing: '0.04em',
                }}>
                  {t}
                </span>
              ))}
            </div>
            <motion.a
              href={project.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              style={{
                flexShrink: 0, width: 40, height: 40,
                borderRadius: '50%',
                border: `1px solid ${project.accent}44`,
                background: `${project.accent}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: project.accent, textDecoration: 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              <ArrowUpRight size={15} />
            </motion.a>
          </div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            borderRadius: 999, transformOrigin: 'center', zIndex: 10,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════
   MAIN
   ════════════════════════ */
const SpidermanPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [showNav, setShowNav] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 });

  /* ── Responsive detection ── */
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNav(y <= lastY || y < 150);
      setLastY(y);
      const secs = ['hero','about','experience','projects','contact'];
      for (let i = secs.length-1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && y >= el.offsetTop - 400) { setActiveSection(secs[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior:'smooth' });
  };

  const projects = [
    {
      title: 'CasaVisio',
      subtitle: 'AI Architectural Visualization',
      desc: 'Production-grade AI SaaS converting 2D floor plans into photorealistic 3D renders using Gemini 2.5 Flash. Serverless REST API with per-user KV storage and community project discovery.',
      tech: ['Next.js 15', 'TypeScript', 'Puter Workers', 'Gemini AI'],
      img: '/casavisio.png?w=900&h=600&fit=crop',
      link: 'https://casa-visio.vercel.app',
      accent: '#c23616',
    },
    {
      title: 'SnapShrink AI',
      subtitle: 'AI Media Compression',
      desc: 'AI SaaS compressing videos up to 78% smaller using Cloudinary AI. Clerk auth, Prisma ORM with NeonDB serverless Postgres for high-volume media workflows.',
      tech: ['React', 'Clerk', 'Prisma ORM', 'NeonDB', 'Cloudinary'],
      img: '/snapshrink.png?w=900&h=600&fit=crop',
      link: 'https://snap-shrink-ai.vercel.app',
      accent: '#1e6b8a',
    },
    {
      title: 'CodeCorner',
      subtitle: 'Full-Stack Q&A Platform',
      desc: 'StackOverflow clone — JWT auth, voting, nested comments, reputation tracking. Accessible responsive UI optimised for performance across all devices.',
      tech: ['Next.js', 'Appwrite', 'TailwindCSS', 'shadcn/ui'],
      img: '/codecorner.png?w=900&h=600&fit=crop',
      link: 'https://code-corner-amber.vercel.app',
      accent: '#7c3aed',
    },
  ];

  const experienceItems = [
    {
      role: 'Software Development Intern', company: 'PerfectGift AI',
      period: 'Jan 2025 – Present', location: 'Remote',
      bullets: [
        'Developed and maintained custom gifting service features using Next.js, writing clean, modular code aligned with product requirements.',
        'Integrated Supabase for backend services including database management, authentication, and real-time data handling.',
        'Built responsive UI components using shadcn/ui and Material Icons, ensuring consistent design across all workflows.',
        'Managed media and asset storage via Vercel Blob, enabling efficient image handling for gift catalogs.',
      ],
      tech: ['Next.js', 'Supabase', 'shadcn/ui', 'Vercel Blob'],
    },
  ];

  const skills = [
    { category: 'Languages',      items: ['C/C++', 'JavaScript', 'TypeScript'] },
    { category: 'Frontend',       items: ['React', 'Next.js', 'HTML5', 'CSS3', 'TailwindCSS', 'shadcn/ui', 'DaisyUI', 'Vite'] },
    { category: 'Backend & BaaS', items: ['Node.js', 'Express.js', 'Appwrite', 'Supabase', 'Puter.js', 'Prisma ORM', 'NeonDB', 'MongoDB', 'JWT'] },
    { category: 'Tools',          items: ['Git/GitHub', 'Vercel', 'Cloudinary AI', 'Gemini 2.5 Flash', 'REST APIs'] },
  ];

  const marqueeSkills = [
    'React & Next.js','TypeScript','Node.js & Express','TailwindCSS','shadcn/ui','DaisyUI',
    'Supabase','Appwrite','Puter.js & Workers','Prisma ORM','NeonDB','MongoDB',
    'Vercel & Vercel Blob','Cloudinary AI','Gemini 2.5 Flash','REST APIs',
  ];

  const navLinks = [{id:'hero',l:'Home'},{id:'about',l:'About'},{id:'experience',l:'Experience'},{id:'projects',l:'Work'},{id:'contact',l:'Contact'}];

  /* ── Responsive values ── */
  const px = isMobile ? '20px' : isTablet ? '40px' : '80px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '120px';

  return (
    <div style={{ background:'#050505', color:'#fff', overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; scroll-padding-top:80px; }
        body {
          font-family:'Inter',sans-serif;
          background:#050505; color:#fff;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#050505; }
        ::-webkit-scrollbar-thumb { background:#c23616; border-radius:2px; }
        ::selection { background:rgba(194,54,22,0.35); color:#fff; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-glow { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }

        /* ── Mobile menu overlay ── */
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 85;
          background: rgba(5,5,5,0.97);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* ── About grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* ── Skills grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 639px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Projects grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-auto-rows: 1fr;
          gap: 24px;
          align-items: stretch;
        }
        @media (max-width: 639px) {
          .projects-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
        }

        /* ── Hero buttons ── */
        .hero-buttons {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        @media (max-width: 639px) {
          .hero-buttons {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-buttons a,
          .hero-buttons button {
            width: 100%;
            justify-content: center;
          }
        }

        /* ── Experience meta ── */
        .exp-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 639px) {
          .exp-meta { gap: 8px; }
        }

        /* ── Contact socials ── */
        .contact-socials {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 36px;
          flex-wrap: wrap;
        }

        /* ── Navbar desktop links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        @media (max-width: 767px) {
          .nav-links { display: none; }
        }

        /* ── Hire Me (desktop) ── */
        .nav-hire {
          display: inline-flex;
        }
        @media (max-width: 767px) {
          .nav-hire { display: none; }
        }

        /* ── Hamburger (mobile) ── */
        .nav-hamburger {
          display: none;
        }
        @media (max-width: 767px) {
          .nav-hamburger { display: flex; }
        }
      `}</style>

      {/* Film grain */}
      <div style={{ position:'fixed',inset:0,zIndex:9000,pointerEvents:'none',opacity:0.03,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize:'128px' }}/>

      {/* Ambient glows */}
      <div style={{ position:'fixed',top:'5%',right:'-5%',width:600,height:600,background:'radial-gradient(circle,rgba(194,54,22,.12) 0%,rgba(194,54,22,.03) 40%,transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:0,filter:'blur(40px)',animation:'pulse-glow 8s ease-in-out infinite' }}/>
      <div style={{ position:'fixed',bottom:'10%',left:'-8%',width:500,height:500,background:'radial-gradient(circle,rgba(30,58,95,.1) 0%,rgba(30,58,95,.02) 40%,transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:0,filter:'blur(40px)',animation:'pulse-glow 10s ease-in-out infinite 3s' }}/>

      <AnimatePresence>{loading && <LoadingScreen onComplete={handleLoadComplete}/>}</AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX, position:'fixed',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#c23616,#e84118,#ff6348)',transformOrigin:'0%',zIndex:100 }}/>

      {/* ══════════ MOBILE MENU ══════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
          >
            {navLinks.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:10 }}
                transition={{ delay: i*0.06 }}
                onClick={() => scrollTo(n.id)}
                style={{
                  background: activeSection===n.id ? 'rgba(194,54,22,0.12)' : 'transparent',
                  border: activeSection===n.id ? '1px solid rgba(194,54,22,0.3)' : '1px solid transparent',
                  color: activeSection===n.id ? '#e84118' : 'rgba(255,255,255,0.7)',
                  padding:'14px 40px', borderRadius:50,
                  fontSize:18, fontWeight:500, cursor:'pointer',
                  fontFamily:"'Space Grotesk',sans-serif",
                  letterSpacing:'-0.01em',
                  width: '80%',
                  maxWidth: 280,
                }}
              >
                {n.l}
              </motion.button>
            ))}
            <motion.a
              href="mailto:jas72609@gmail.com"
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: navLinks.length*0.06 }}
              style={{
                marginTop:16,
                background:'linear-gradient(135deg,#c23616,#e84118)', color:'#fff',
                padding:'14px 40px', borderRadius:50,
                fontSize:16, fontWeight:600, textDecoration:'none',
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
                width:'80%', maxWidth:280,
                boxShadow:'0 4px 20px rgba(194,54,22,0.35)',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ NAVBAR ══════════ */}
      <motion.nav
        initial={{ y:-100 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
        style={{ position:'fixed', top:12, left:0, right:0, zIndex:90, padding:`0 ${isMobile ? '16px' : '32px'}` }}
      >
        <div style={{
          background:'rgba(5,5,5,0.65)',
          backdropFilter:'blur(24px) saturate(1.8)',
          WebkitBackdropFilter:'blur(24px) saturate(1.8)',
          border:'1px solid rgba(255,255,255,0.06)',
          borderRadius:100,
          padding:'8px 8px 8px 20px',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          maxWidth:820, margin:'0 auto',
          boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:'#fff', letterSpacing:'-0.02em' }}>Jas</span>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:300, fontSize:15, color:'rgba(255,255,255,0.22)', letterSpacing:'-0.02em' }}>.dev</span>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e',marginLeft:4,display:'inline-block' }}/>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links">
            {navLinks.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                style={{
                  background: activeSection===n.id ? 'rgba(194,54,22,0.12)' : 'transparent',
                  border: activeSection===n.id ? '1px solid rgba(194,54,22,0.2)' : '1px solid transparent',
                  color: activeSection===n.id ? '#e84118' : 'rgba(255,255,255,0.4)',
                  padding:'6px 13px', borderRadius:50,
                  fontSize:12, fontWeight:500, cursor:'pointer',
                  transition:'all 0.25s',
                }}>
                {n.l}
              </button>
            ))}
          </div>

          {/* Desktop hire me */}
          <MagBtn style={{ display:'inline-block' }}>
            <a href="mailto:jas72609@gmail.com" className="nav-hire" style={{
              background:'#c23616', color:'#fff',
              padding:'8px 18px', borderRadius:50,
              fontSize:12, fontWeight:600, textDecoration:'none',
              alignItems:'center', gap:6, marginLeft:4,
              boxShadow:'0 4px 16px rgba(194,54,22,0.35)',
            }}>
              Hire Me
            </a>
          </MagBtn>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen(o => !o)}
            style={{
              background: mobileMenuOpen ? 'rgba(194,54,22,0.15)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 50, width:38, height:38,
              alignItems:'center', justifyContent:'center',
              color:'#fff', cursor:'pointer',
              transition:'all 0.25s',
            }}
          >
            {mobileMenuOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>
        </div>
      </motion.nav>

      {/* ══════════ HERO ══════════ */}
      <section id="hero" style={{
        position:'relative',
        minHeight: isMobile ? '100svh' : '80vh',
        display:'flex', alignItems:'center', overflow:'hidden',
        padding: isMobile ? '120px 20px 80px' : isTablet ? '120px 40px 80px' : '100px 80px 80px',
      }}>
        <UnicornScene/>
        <div style={{ position:'absolute',inset:0,zIndex:2,pointerEvents:'none', background:'linear-gradient(100deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.97) 25%, rgba(5,5,5,0.82) 42%, rgba(5,5,5,0.45) 58%, rgba(5,5,5,0.1) 74%, transparent 88%)' }}/>
        <div style={{ position:'absolute',inset:0,zIndex:2,pointerEvents:'none', background:'linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 14%, transparent 82%, rgba(5,5,5,0.65) 100%)' }}/>

        <div style={{ position:'relative', zIndex:20, width:'100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : 720 }}>
            <motion.div initial={{opacity:0,scale:0.85,y:16}} animate={{opacity:1,scale:1,y:0}}
              transition={{delay:0.3, duration:0.5}} style={{marginBottom:isMobile ? 24 : 36}}>
              <span style={{
                border:'1px solid rgba(194,54,22,0.25)', padding:'7px 16px', borderRadius:50,
                fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.55)',
                display:'inline-flex', alignItems:'center', gap:10,
                background:'rgba(194,54,22,0.04)',
              }}>
                <motion.span animate={{scale:[1,1.3,1],opacity:[0.7,1,0.7]}} transition={{repeat:Infinity,duration:2}}
                  style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 12px #22c55e'}}/>
                Available for Work
              </span>
            </motion.div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, lineHeight:1.05, marginBottom: isMobile ? 20 : 28, letterSpacing:'-0.02em' }}>
              <div style={{ fontSize: isMobile ? '2.6rem' : 'clamp(3rem,6.5vw,5rem)', overflow:'hidden', paddingBottom:'0.08em' }}>
                <StaggerText text="Your Friendly" delay={0.4}/>
              </div>
              <div style={{ fontSize: isMobile ? '2.6rem' : 'clamp(3rem,6.5vw,5rem)', overflow:'hidden',paddingBottom:'0.08em' }}>
                <StaggerText text="Neighborhood" delay={0.65}/>
              </div>
              <div style={{ fontSize: isMobile ? '2.6rem' : 'clamp(3rem,6.5vw,5rem)', overflow:'hidden' }}>
                <motion.span initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}
                  transition={{delay:0.95, duration:0.7, ease:[0.22,1,0.36,1]}}
                  style={{
                    display:'inline-block', fontStyle:'italic',
                    background:'linear-gradient(135deg,#fff 0%,#e84118 40%,#c23616 60%,#fff 100%)',
                    backgroundSize:'200% auto',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    animation:'shimmer 3s linear infinite',
                  }}>
                  Developer.
                </motion.span>
              </div>
            </h1>

            <Reveal delay={1.0}>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize: isMobile ? 14 : 16, lineHeight:1.75, maxWidth:500, marginBottom: isMobile ? 28 : 36, fontWeight:300 }}>
                Not bitten by a radioactive spider — just really good at React, Node.js, and shipping things that actually work.
              </p>
            </Reveal>

            <Reveal delay={1.1}>
              <div className="hero-buttons">
                <MagBtn>
                  <a href="mailto:jas72609@gmail.com" style={{
                    background:'linear-gradient(135deg,#c23616,#e84118)', color:'#fff',
                    padding: isMobile ? '14px 28px' : '15px 34px', borderRadius:50,
                    fontSize: isMobile ? 13 : 14, fontWeight:600,
                    textDecoration:'none', display:'inline-flex', alignItems:'center', gap:10,
                    boxShadow:'0 8px 32px rgba(194,54,22,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}>
                    Get In Touch <ArrowUpRight size={16}/>
                  </a>
                </MagBtn>
                <MagBtn>
                  <button onClick={() => scrollTo('projects')} style={{
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                    color:'#fff', padding: isMobile ? '14px 28px' : '15px 34px', borderRadius:50,
                    fontSize: isMobile ? 13 : 14, fontWeight:500,
                    cursor:'pointer', display:'inline-flex', alignItems:'center', gap:10,
                    backdropFilter:'blur(10px)',
                  }}>
                    View Work <ArrowRight size={16}/>
                  </button>
                </MagBtn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee texts={marqueeSkills} speed={80}/>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" style={{ padding:`${sectionPy} ${px}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="about-grid">
            <div>
              <Reveal>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}}
                    style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
                  <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>About Me</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile ? '1.9rem' : 'clamp(2rem,4vw,3.2rem)', fontWeight:400, lineHeight:1.15, marginBottom:28 }}>
                 With great code comes great{' '}
                  <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#fff,#e84118,#fff)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 4s linear infinite' }}>responsibility</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}><p style={{color:'rgba(255,255,255,0.45)',fontSize:15,lineHeight:1.8,marginBottom:20}}>I build scalable, production-grade web applications using React, Next.js, and Node.js. From serverless architectures to real-time features, I craft solutions that perform at scale.</p></Reveal>
              <Reveal delay={0.3}><p style={{color:'rgba(255,255,255,0.45)',fontSize:15,lineHeight:1.8,marginBottom:36}}>Currently interning at PerfectGift AI, integrating Supabase, building responsive interfaces, and managing media pipelines through Vercel Blob.</p></Reveal>
              <Reveal delay={0.4}>
                <div style={{ borderRadius:20, border:'1px solid rgba(148,163,184,0.28)', background:'radial-gradient(circle at top left,rgba(248,113,113,0.10),transparent 55%),radial-gradient(circle at bottom right,rgba(59,130,246,0.10),transparent 55%),rgba(15,23,42,0.96)', boxShadow:'0 24px 70px rgba(0,0,0,0.75)', padding:'22px' }}>
                  <div style={{fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(191,219,254,0.75)',fontWeight:700,marginBottom:14}}>Highlights</div>
                  <div style={{display:'grid',gap:10}}>
                    {[
                      'Cloud-native Next.js apps deployed on Vercel with production UX polish.',
                      'Serverless REST APIs with per-user storage and scalable workflows.',
                      'BaaS integrations (Supabase, Appwrite) + auth patterns (JWT / OAuth).',
                      'AI-powered products using Gemini 2.5 Flash + Cloudinary AI pipelines.',
                    ].map(t => (
                      <div key={t} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                        <span style={{width:6,height:6,borderRadius:'50%',background:'linear-gradient(135deg,#60a5fa,#e84118)',marginTop:6,flexShrink:0}}/>
                        <p style={{color:'rgba(255,255,255,0.55)',fontSize:14,lineHeight:1.7,margin:0}}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.2}>
                <Tilt3D intensity={isMobile ? 0 : 5}>
                  <div style={{ background:'radial-gradient(circle at top,rgba(15,23,42,0.95),rgba(2,6,23,0.98))', border:'1px solid rgba(148,163,184,0.35)', borderRadius:24, padding:'32px 28px', boxShadow:'0 26px 80px rgba(15,23,42,0.9)', backdropFilter:'blur(14px)' }}>
                    <h3 style={{fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:28,fontWeight:600}}>Technical Proficiency</h3>
                    <div style={{display:'flex',flexDirection:'column',gap:22}}>
                      <SkillBar name="React / Next.js"           level={95} icon={Code2}    delay={0.3}/>
                      <SkillBar name="TypeScript / JavaScript"   level={90} icon={Layers}   delay={0.4}/>
                      <SkillBar name="Node.js / Express.js"      level={85} icon={Server}   delay={0.5}/>
                      <SkillBar name="TailwindCSS / UI Design"   level={90} icon={Palette}  delay={0.6}/>
                      <SkillBar name="Databases (Prisma, NeonDB)"level={80} icon={Database} delay={0.7}/>
                      <SkillBar name="Cloud & BaaS"              level={85} icon={Globe}    delay={0.8}/>
                    </div>
                  </div>
                </Tilt3D>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee texts={marqueeSkills} reverse speed={85}/>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section id="experience" style={{ padding:`${isMobile?'80px':'100px'} ${px}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <Reveal>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}}
                style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
              <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>Experience</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile ? '1.9rem' : 'clamp(2rem,4vw,3rem)', fontWeight:400, marginBottom:48 }}>
              Work{' '}
              <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 4s linear infinite'}}>History</span>
            </h2>
          </Reveal>

          {experienceItems.map((exp, idx) => (
            <Reveal key={idx} delay={0.2}>
              <Tilt3D intensity={isMobile ? 0 : 3}>
                <div style={{ background:'radial-gradient(circle at top,rgba(15,23,42,0.98),rgba(15,23,42,0.94))', border:'1px solid rgba(148,163,184,0.35)', borderRadius:26, padding: isMobile ? '28px 20px' : '40px 36px', position:'relative', overflow:'hidden', boxShadow:'0 26px 80px rgba(15,23,42,0.95)' }}>
                  <div style={{position:'absolute',top:0,left:0,width:3,height:'100%',background:'linear-gradient(to bottom,#c23616,transparent)',borderRadius:'2px 0 0 2px'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24,flexWrap:'wrap',gap:16}}>
                    <div style={{flex:1, minWidth:0}}>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 18 : 22,fontWeight:600,marginBottom:6}}>{exp.role}</h3>
                      <div className="exp-meta">
                        <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#e84118',fontSize:14,fontWeight:500}}><Briefcase size={14}/> {exp.company}</span>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.4)',fontSize:13}}><Calendar size={13}/> {exp.period}</span>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.4)',fontSize:13}}><MapPin size={13}/> {exp.location}</span>
                      </div>
                    </div>
                    <SpiderLogo size={28} color="rgba(194,54,22,0.15)"/>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:24}}>
                    {exp.bullets.map((b, i) => (
                      <Reveal key={i} delay={0.3 + i*0.1} direction="left">
                        <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                          <span style={{width:5,height:5,borderRadius:'50%',background:'#c23616',flexShrink:0,marginTop:7,boxShadow:'0 0 8px rgba(194,54,22,0.4)'}}/>
                          <p style={{color:'rgba(255,255,255,0.55)',fontSize:14,lineHeight:1.7}}>{b}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {exp.tech.map(t => <span key={t} style={{padding:'5px 14px',borderRadius:50,fontSize:11,fontWeight:500,border:'1px solid rgba(194,54,22,0.2)',color:'rgba(255,255,255,0.5)',background:'rgba(194,54,22,0.05)'}}>{t}</span>)}
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="skills-grid" style={{marginTop:40}}>
              {skills.map(cat => (
                <Tilt3D key={cat.category} intensity={isMobile ? 0 : 4}>
                  <motion.div whileHover={{borderColor:'rgba(194,54,22,0.2)'}}
                    style={{background:'rgba(255,255,255,0.015)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:18,padding:'24px 22px',transition:'border-color 0.3s'}}>
                    <h4 style={{fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',color:'#c23616',marginBottom:14,fontWeight:600}}>{cat.category}</h4>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {cat.items.map(item => <span key={item} style={{padding:'4px 12px',borderRadius:50,fontSize:11,border:'1px solid rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',background:'rgba(255,255,255,0.02)'}}>{item}</span>)}
                    </div>
                  </motion.div>
                </Tilt3D>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee texts={marqueeSkills} speed={90}/>

      {/* ══════════ PROJECTS ══════════ */}
      <section id="projects" style={{ padding:`${isMobile?'80px':'100px'} ${px}`, position:'relative', zIndex:1 }}>
        <SpiderWebBG/>
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:5 }}>
          <Reveal>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}}
                style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
              <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>Projects</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:52,flexWrap:'wrap',gap:16}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize: isMobile ? '1.9rem' : 'clamp(2rem,4vw,3.2rem)',fontWeight:400}}>
                Featured{' '}
                <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 4s linear infinite'}}>Work</span>
              </h2>
              <a href="https://github.com/JAS2609" target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.28)',fontSize:13,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e => e.currentTarget.style.color='#e84118'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.28)'}>
                View All <ArrowUpRight size={14}/>
              </a>
            </div>
          </Reveal>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i}/>
            ))}
          </div>
        </div>
      </section>

      <Marquee texts={marqueeSkills} reverse speed={80}/>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" style={{ padding:`${isMobile?'80px':'100px'} ${px} ${isMobile?'50px':'60px'}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <Reveal delay={0.1}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem,5.5vw,4.5rem)',fontWeight:400,marginTop:20,marginBottom:20,lineHeight:1.1}}>
              Let's build something{' '}
              <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 3s linear infinite'}}>extraordinary</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{color:'rgba(255,255,255,0.35)',fontSize: isMobile ? 14 : 16,lineHeight:1.75,maxWidth:480,margin:'0 auto 36px',fontWeight:300}}>
              Got a villain-sized problem? I'm always open to discussing creative ideas and new opportunities.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagBtn>
              <a href="mailto:jas72609@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:10,background:'linear-gradient(135deg,#c23616,#e84118)',color:'#fff',padding: isMobile ? '15px 32px' : '18px 44px',borderRadius:50,fontSize: isMobile ? 13 : 15,fontWeight:600,textDecoration:'none',boxShadow:'0 12px 40px rgba(194,54,22,0.4),inset 0 1px 0 rgba(255,255,255,0.1)'}}>
                <Mail size={18}/> Get In Touch
              </a>
            </MagBtn>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="contact-socials">
              {[
                {icon:Mail,    href:'mailto:jas72609@gmail.com'},
                {icon:Phone,   href:'tel:9310840717'},
                {icon:Github,  href:'https://github.com/JAS2609'},
                {icon:Linkedin,href:'https://www.linkedin.com/in/jas-4a9a802bb'},
              ].map(({icon:I, href}) => (
                <MagBtn key={href}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{width:48,height:48,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,255,255,0.02)',color:'rgba(255,255,255,0.4)',textDecoration:'none',transition:'all 0.3s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(194,54,22,0.4)';e.currentTarget.style.color='#e84118';e.currentTarget.style.boxShadow='0 0 24px rgba(194,54,22,0.12)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.4)';e.currentTarget.style.boxShadow='none';}}>
                    <I size={17}/>
                  </a>
                </MagBtn>
              ))}
            </div>
          </Reveal>
          
            <div style={{marginTop:60,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.03)',color:'rgba(255,255,255,0.15)',fontSize:11,letterSpacing:'0.05em'}}>
             © 2026 Jas — git commit -m "saved the city again"
            </div>
          
        </div>
      </section>
    </div>
  );
};

export default SpidermanPortfolio;