"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Phone, ArrowUpRight, Code2, Layers, Palette, Globe, Server, Database, ArrowRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import SpiderWebBG from '../components/SpiderWebBG';
import Marquee from '../components/Marquee';

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
      // Prevent any transform/movement on scroll
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

/* ════════════════════════
   MAIN
   ════════════════════════ */
const SpidermanPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [showNav, setShowNav] = useState(true);
  const [lastY, setLastY] = useState(0);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 });

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
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior:'smooth' });
  };

  const projects = [
    { title:'CasaVisio', subtitle:'AI Architectural Visualization', desc:'Production-grade AI SaaS converting 2D floor plans into photorealistic 3D renders using Gemini 2.5 Flash. Serverless REST API with per-user KV storage and community project discovery.', tech:['Next.js 15','TypeScript','Puter Workers','Gemini AI'], img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=600&fit=crop', link:'https://github.com/JAS2609', accent:'#c23616' },
    { title:'SnapShrink AI', subtitle:'AI Media Compression', desc:'AI SaaS compressing videos up to 78% smaller using Cloudinary AI. Clerk auth, Prisma ORM with NeonDB serverless Postgres for high-volume media workflows.', tech:['React','Clerk','Prisma ORM','NeonDB','Cloudinary'], img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&h=600&fit=crop', link:'https://github.com/JAS2609', accent:'#1e3a5f' },
    { title:'CodeCorner', subtitle:'Full-Stack Q&A Platform', desc:'StackOverflow clone — JWT auth, voting, nested comments, reputation tracking. Accessible responsive UI optimized for performance across all devices.', tech:['Next.js','Appwrite','TailwindCSS','shadcn/ui'], img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop', link:'https://github.com/JAS2609', accent:'#7c3aed' },
  ];

  const experienceItems = [
    {
      role:'Software Development Intern', company:'PerfectGift AI',
      period:'Jan 2025 – Present', location:'Remote',
      bullets:[
        'Developed and maintained custom gifting service features using Next.js, writing clean, modular code aligned with product requirements.',
        'Integrated Supabase for backend services including database management, authentication, and real-time data handling.',
        'Built responsive UI components using shadcn/ui and Material Icons, ensuring consistent design across all workflows.',
        'Managed media and asset storage via Vercel Blob, enabling efficient image handling for gift catalogs.',
      ],
      tech:['Next.js','Supabase','shadcn/ui','Vercel Blob'],
    }
  ];

  const skills = [
    { category:'Languages', items:['C/C++','JavaScript','TypeScript'] },
    { category:'Frontend', items:['React','Next.js','HTML5','CSS3','TailwindCSS','shadcn/ui','DaisyUI','Vite'] },
    { category:'Backend & BaaS', items:['Node.js','Express.js','Appwrite','Supabase','Puter.js','Prisma ORM','NeonDB','MongoDB','JWT'] },
    { category:'Tools', items:['Git/GitHub','Vercel','Cloudinary AI','Gemini 2.5 Flash','REST APIs'] },
  ];

  const marqueeSkills = ['React & Next.js','TypeScript','Node.js & Express','TailwindCSS','shadcn/ui','DaisyUI','Supabase','Appwrite','Puter.js & Workers','Prisma ORM','NeonDB','MongoDB','Vercel & Vercel Blob','Cloudinary AI','Gemini 2.5 Flash','REST APIs'];

  return (
    <div style={{ background:'#050505', color:'#fff', overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html {
          scroll-behavior: smooth;
          /* Lenis / native smooth scroll */
          scroll-padding-top: 80px;
        }
        body {
          font-family: 'Inter', sans-serif;
          background: #050505;
          color: #fff;
          /* Prevent scroll jank from paint layers */
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#050505; }
        ::-webkit-scrollbar-thumb { background:#c23616; border-radius:2px; }
        ::selection { background:rgba(194,54,22,0.35); color:#fff; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-glow { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }
      `}</style>

      {/* Film grain */}
      <div style={{ position:'fixed',inset:0,zIndex:9000,pointerEvents:'none',opacity:0.03,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize:'128px' }}/>

      {/* Glows */}
      <div style={{ position:'fixed',top:'5%',right:'-5%',width:600,height:600,background:'radial-gradient(circle,rgba(194,54,22,.12) 0%,rgba(194,54,22,.03) 40%,transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:0,filter:'blur(40px)',animation:'pulse-glow 8s ease-in-out infinite' }}/>
      <div style={{ position:'fixed',bottom:'10%',left:'-8%',width:500,height:500,background:'radial-gradient(circle,rgba(30,58,95,.1) 0%,rgba(30,58,95,.02) 40%,transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:0,filter:'blur(40px)',animation:'pulse-glow 10s ease-in-out infinite 3s' }}/>

      <AnimatePresence>{loading && <LoadingScreen onComplete={handleLoadComplete}/>}</AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX, position:'fixed',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#c23616,#e84118,#ff6348)',transformOrigin:'0%',zIndex:100 }}/>

      {/* ══════════════
          NAVBAR
          ══════════════ */}
      <motion.nav
        initial={{ y:-100 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
        style={{ position:'fixed', top:12, left:0, right:0, zIndex:90, padding:'0 32px' }}
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
          {/* Brand */}
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:'#fff', letterSpacing:'-0.02em' }}>Jas</span>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:300, fontSize:15, color:'rgba(255,255,255,0.22)', letterSpacing:'-0.02em' }}>.dev</span>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e',marginLeft:4,display:'inline-block' }}/>
          </div>

          {/* Links */}
          <div style={{ display:'flex', alignItems:'center', gap:2 }}>
            {[{id:'hero',l:'Home'},{id:'about',l:'About'},{id:'experience',l:'Experience'},{id:'projects',l:'Work'},{id:'contact',l:'Contact'}].map(n => (
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

          <MagBtn>
            <a href="mailto:jas72609@gmail.com" style={{
              background:'#c23616', color:'#fff',
              padding:'8px 18px', borderRadius:50,
              fontSize:12, fontWeight:600, textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:6, marginLeft:4,
              boxShadow:'0 4px 16px rgba(194,54,22,0.35)',
            }}>
              Hire Me
            </a>
          </MagBtn>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════
          HERO — no scroll movement on bg
          ══════════════════════════════════ */}
      <section id="hero"
        style={{
          position:'relative', minHeight:'80vh',
          display:'flex', alignItems:'center',
          overflow:'hidden',
          padding:'100px 80px 80px',
        }}
      >
        {/* Unicorn: position absolute, does NOT move — no parallax applied to it */}
        <UnicornScene/>

        {/* Gradient so text is always readable */}
        <div style={{
          position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'linear-gradient(100deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.97) 25%, rgba(5,5,5,0.82) 42%, rgba(5,5,5,0.45) 58%, rgba(5,5,5,0.1) 74%, transparent 88%)',
        }}/>
        <div style={{
          position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 14%, transparent 82%, rgba(5,5,5,0.65) 100%)',
        }}/>

        {/* Text content — plain div, no scroll transform */}
        <div style={{ position:'relative', zIndex:20, width:'100%' }}>
          <div style={{ maxWidth:720 }}>

            <motion.div initial={{opacity:0,scale:0.85,y:16}} animate={{opacity:1,scale:1,y:0}}
              transition={{delay:0.3, duration:0.5}} style={{marginBottom:36}}>
              <span style={{
                border:'1px solid rgba(194,54,22,0.25)', padding:'8px 18px', borderRadius:50,
                fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.55)',
                display:'inline-flex', alignItems:'center', gap:10,
                background:'rgba(194,54,22,0.04)',
              }}>
                <motion.span animate={{scale:[1,1.3,1],opacity:[0.7,1,0.7]}} transition={{repeat:Infinity,duration:2}}
                  style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 12px #22c55e'}}/>
                Available for Work
              </span>
            </motion.div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, lineHeight:1.05, marginBottom:28, letterSpacing:'-0.02em' }}>
              <div style={{ fontSize:'clamp(3rem,6.5vw,5rem)', overflow:'hidden' }}>
                <StaggerText text="Your Friendly" delay={0.4}/>
              </div>
              <div style={{ fontSize:'clamp(3rem,6.5vw,5rem)', overflow:'hidden' }}>
                <StaggerText text="Neighborhood" delay={0.65}/>
              </div>
              <div style={{ fontSize:'clamp(3rem,6.5vw,5rem)', overflow:'hidden' }}>
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
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, lineHeight:1.75, maxWidth:500, marginBottom:36, fontWeight:300 }}>
                Full-Stack Developer specializing in cloud-native applications, RESTful APIs, and modern React ecosystems.
              </p>
            </Reveal>

            <Reveal delay={1.1}>
              <div style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
                <MagBtn>
                  <a href="mailto:jas72609@gmail.com" style={{
                    background:'linear-gradient(135deg,#c23616,#e84118)', color:'#fff',
                    padding:'15px 34px', borderRadius:50, fontSize:14, fontWeight:600,
                    textDecoration:'none', display:'inline-flex', alignItems:'center', gap:10,
                    boxShadow:'0 8px 32px rgba(194,54,22,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}>
                    Get In Touch <ArrowUpRight size={16}/>
                  </a>
                </MagBtn>
                <MagBtn>
                  <button onClick={() => scrollTo('projects')} style={{
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                    color:'#fff', padding:'15px 34px', borderRadius:50, fontSize:14, fontWeight:500,
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

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding:'120px 80px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:80, alignItems:'start' }}>
            <div>
              <Reveal>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}}
                    style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
                  <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>About Me</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:400, lineHeight:1.15, marginBottom:28 }}>
                  With great power comes great{' '}
                  <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#fff,#e84118,#fff)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 4s linear infinite' }}>responsibility</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}><p style={{color:'rgba(255,255,255,0.45)',fontSize:15,lineHeight:1.8,marginBottom:20}}>I build scalable, production-grade web applications using React, Next.js, and Node.js. From serverless architectures to real-time features, I craft solutions that perform at scale.</p></Reveal>
              <Reveal delay={0.3}><p style={{color:'rgba(255,255,255,0.45)',fontSize:15,lineHeight:1.8,marginBottom:36}}>Currently interning at PerfectGift AI, integrating Supabase, building responsive interfaces, and managing media pipelines through Vercel Blob.</p></Reveal>
              <Reveal delay={0.4}>
                <div style={{ borderRadius:20, border:'1px solid rgba(148,163,184,0.28)', background:'radial-gradient(circle at top left,rgba(248,113,113,0.10),transparent 55%),radial-gradient(circle at bottom right,rgba(59,130,246,0.10),transparent 55%),rgba(15,23,42,0.96)', boxShadow:'0 24px 70px rgba(0,0,0,0.75)', padding:'22px' }}>
                  <div style={{fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(191,219,254,0.75)',fontWeight:700,marginBottom:14}}>Highlights</div>
                  <div style={{display:'grid',gap:10}}>
                    {['Cloud-native Next.js apps deployed on Vercel with production UX polish.','Serverless REST APIs with per-user storage and scalable workflows.','BaaS integrations (Supabase, Appwrite) + auth patterns (JWT / OAuth).','AI-powered products using Gemini 2.5 Flash + Cloudinary AI pipelines.'].map(t => (
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
                <Tilt3D intensity={5}>
                  <div style={{ background:'radial-gradient(circle at top,rgba(15,23,42,0.95),rgba(2,6,23,0.98))', border:'1px solid rgba(148,163,184,0.35)', borderRadius:24, padding:'32px 28px', boxShadow:'0 26px 80px rgba(15,23,42,0.9)', backdropFilter:'blur(14px)' }}>
                    <h3 style={{fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:28,fontWeight:600}}>Technical Proficiency</h3>
                    <div style={{display:'flex',flexDirection:'column',gap:22}}>
                      <SkillBar name="React / Next.js" level={95} icon={Code2} delay={0.3}/>
                      <SkillBar name="TypeScript / JavaScript" level={90} icon={Layers} delay={0.4}/>
                      <SkillBar name="Node.js / Express.js" level={85} icon={Server} delay={0.5}/>
                      <SkillBar name="TailwindCSS / UI Design" level={90} icon={Palette} delay={0.6}/>
                      <SkillBar name="Databases (Prisma, NeonDB)" level={80} icon={Database} delay={0.7}/>
                      <SkillBar name="Cloud & BaaS" level={85} icon={Globe} delay={0.8}/>
                    </div>
                  </div>
                </Tilt3D>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee texts={marqueeSkills} reverse speed={85}/>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" style={{ padding:'100px 80px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <Reveal>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}} style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
              <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>Experience</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3rem)', fontWeight:400, marginBottom:48 }}>
              Work <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 4s linear infinite'}}>History</span>
            </h2>
          </Reveal>
          {experienceItems.map((exp, idx) => (
            <Reveal key={idx} delay={0.2}>
              <Tilt3D intensity={3}>
                <div style={{ background:'radial-gradient(circle at top,rgba(15,23,42,0.98),rgba(15,23,42,0.94))', border:'1px solid rgba(148,163,184,0.35)', borderRadius:26, padding:'40px 36px', position:'relative', overflow:'hidden', boxShadow:'0 26px 80px rgba(15,23,42,0.95)' }}>
                  <div style={{position:'absolute',top:0,left:0,width:3,height:'100%',background:'linear-gradient(to bottom,#c23616,transparent)',borderRadius:'2px 0 0 2px'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24,flexWrap:'wrap',gap:16}}>
                    <div>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:600,marginBottom:6}}>{exp.role}</h3>
                      <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
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
            <div style={{marginTop:40,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
              {skills.map(cat => (
                <Tilt3D key={cat.category} intensity={4}>
                  <motion.div whileHover={{borderColor:'rgba(194,54,22,0.2)'}} style={{background:'rgba(255,255,255,0.015)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:18,padding:'24px 22px',transition:'border-color 0.3s'}}>
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

      {/* ═══ PROJECTS — clean cards, no web overlay ═══ */}
      <section id="projects" style={{ padding:'100px 80px', position:'relative', zIndex:1 }}>
        <SpiderWebBG/>
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:5 }}>
          <Reveal>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:2}} style={{width:6,height:6,borderRadius:'50%',background:'#c23616',boxShadow:'0 0 10px #c23616'}}/>
              <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c23616',fontWeight:600}}>Projects</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:400}}>
                Featured <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 4s linear infinite'}}>Work</span>
              </h2>
              <a href="https://github.com/JAS2609" target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.3)',fontSize:13,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.color='#e84118'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>
                View All <ArrowUpRight size={14}/>
              </a>
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24, alignItems:'stretch' }}>
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Tilt3D intensity={4}>
                  <motion.div
                    whileHover={{ y:-6, boxShadow:`0 28px 60px ${p.accent}30` }}
                    transition={{ type:'spring', stiffness:220, damping:22 }}
                    style={{
                      position:'relative', overflow:'hidden', borderRadius:26,
                      border:'1px solid rgba(148,163,184,0.45)',
                      background:'radial-gradient(circle at top,rgba(15,23,42,0.98),rgba(2,6,23,0.98))',
                      padding:'24px 24px 26px',
                      display:'flex', flexDirection:'column', justifyContent:'space-between',
                      boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
                      transition:'box-shadow 0.3s ease',
                    }}
                  >
                    {/* Header */}
                    <div style={{marginBottom:18}}>
                      <span style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:p.accent,fontWeight:600}}>{p.subtitle}</span>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:600,marginTop:8,marginBottom:8,lineHeight:1.1}}>{p.title}</h3>
                      <p style={{color:'rgba(255,255,255,0.5)',fontSize:13,lineHeight:1.7}}>{p.desc}</p>
                    </div>

                    {/* Image */}
                    <div style={{position:'relative',overflow:'hidden',borderRadius:16,marginBottom:18,height:160}}>
                      <motion.img src={p.img} alt={p.title}
                        whileHover={{scale:1.04}} transition={{duration:0.5}}
                        style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top right,rgba(5,5,5,0.7),transparent 55%)'}}/>
                      <div style={{position:'absolute',bottom:10,right:14,fontFamily:"'Space Grotesk'",fontSize:56,fontWeight:700,color:`${p.accent}18`,lineHeight:1}}>0{i+1}</div>
                    </div>

                    {/* Footer */}
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                      <div style={{display:'flex',flexWrap:'wrap',gap:6,maxWidth:'70%'}}>
                        {p.tech.map(t => (
                          <span key={t} style={{padding:'4px 12px',borderRadius:999,fontSize:11,fontWeight:500,border:`1px solid ${p.accent}33`,color:'rgba(255,255,255,0.7)',background:`${p.accent}12`}}>{t}</span>
                        ))}
                      </div>
                      <MagBtn>
                        <a href={p.link} target="_blank" rel="noopener noreferrer"
                          style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 18px',borderRadius:999,fontSize:12,fontWeight:500,border:`1px solid ${p.accent}44`,color:'#fff',background:`${p.accent}20`,textDecoration:'none',whiteSpace:'nowrap'}}>
                          View <ArrowUpRight size={13}/>
                        </a>
                      </MagBtn>
                    </div>
                  </motion.div>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee texts={marqueeSkills} reverse speed={80}/>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding:'100px 80px 60px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <Reveal><SpiderLogo size={28}/></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.5rem,5.5vw,4.5rem)',fontWeight:400,marginTop:20,marginBottom:20,lineHeight:1.1}}>
              Let's build something{' '}
              <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#fff,#e84118,#fff)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 3s linear infinite'}}>extraordinary</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{color:'rgba(255,255,255,0.35)',fontSize:16,lineHeight:1.75,maxWidth:480,margin:'0 auto 36px',fontWeight:300}}>Have a project in mind? I'm always open to discussing creative ideas and new opportunities.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagBtn>
              <a href="mailto:jas72609@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:10,background:'linear-gradient(135deg,#c23616,#e84118)',color:'#fff',padding:'18px 44px',borderRadius:50,fontSize:15,fontWeight:600,textDecoration:'none',boxShadow:'0 12px 40px rgba(194,54,22,0.4),inset 0 1px 0 rgba(255,255,255,0.1)'}}>
                <Mail size={18}/> Get In Touch
              </a>
            </MagBtn>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:36}}>
              {[{icon:Mail,href:'mailto:jas72609@gmail.com'},{icon:Phone,href:'tel:9310840717'},{icon:Github,href:'https://github.com/JAS2609'},{icon:Linkedin,href:'https://linkedin.com/in/jas'}].map(({icon:I,href}) => (
                <MagBtn key={href}>
                  <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                    style={{width:48,height:48,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,255,255,0.02)',color:'rgba(255,255,255,0.4)',textDecoration:'none',transition:'all 0.3s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(194,54,22,0.4)';e.currentTarget.style.color='#e84118';e.currentTarget.style.boxShadow='0 0 24px rgba(194,54,22,0.12)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.4)';e.currentTarget.style.boxShadow='none';}}>
                    <I size={17}/>
                  </a>
                </MagBtn>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{marginTop:60,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.03)',color:'rgba(255,255,255,0.15)',fontSize:11,letterSpacing:'0.05em'}}>
              © 2026 Jas — Built with passion & plenty of web fluid.
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default SpidermanPortfolio;