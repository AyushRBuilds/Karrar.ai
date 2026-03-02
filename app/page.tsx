"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// ── Motion Helpers ───────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, duration = 0.7, y = 40, style = {}, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ScaleIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, stagger = 0.1, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const StaggerChild = ({ children, y = 30, style = {} }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    }}
    style={style}
  >
    {children}
  </motion.div>
);

// Dramatic headline — each WORD slides up with stagger + blur
const AnimatedHeadline = ({ children, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const segments = Array.isArray(children) ? children : [children];
  let globalIdx = 0;
  return (
    <motion.h1 ref={ref} style={{ ...style, overflow: "visible" }}>
      {segments.map((seg, si) => {
        if (typeof seg !== "string") {
          // Animated span element (e.g. italic gold text)
          const idx = globalIdx++;
          return (
            <motion.span
              key={si}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              {seg}
            </motion.span>
          );
        }
        return seg.split(" ").filter(Boolean).map((word, wi) => {
          const idx = globalIdx++;
          return (
            <motion.span
              key={`${si}-${wi}`}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", marginRight: "0.28em", transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          );
        });
      })}
    </motion.h1>
  );
};

// Animated floating badge
const FloatingBadge = ({ children, style = {} }) => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    style={style}
  >
    {children}
  </motion.div>
);

// Motion card wrapper with lift + glow on hover
const MotionCard = ({ children, color = "#C49E6C", style = {}, ...rest }) => (
  <motion.div
    whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 50px ${color}28, inset 0 1px 0 ${color}20`, borderColor: `${color}60`, scale: 1.01 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    style={{ cursor: "default", ...style }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ── Watermark Legal SVGs ─────────────────────────────────────────
const WmScales = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="4" x2="16" y2="28" /><line x1="8" y1="28" x2="24" y2="28" />
    <line x1="6" y1="10" x2="26" y2="10" />
    <polyline points="6,10 4,16 8,16 6,10" /><polyline points="26,10 24,16 28,16 26,10" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <line x1="6" y1="10" x2="10" y2="7" /><line x1="26" y1="10" x2="22" y2="7" /><line x1="10" y1="7" x2="22" y2="7" />
  </svg>
);
const WmQuill = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 4 C20 4 10 10 8 26" /><path d="M26 4 C28 10 22 18 8 26" />
    <path d="M14 20 L8 26 L10 20 Z" fill="currentColor" fillOpacity="0.4" />
    <line x1="8" y1="26" x2="14" y2="28" />
  </svg>
);
const WmSeal = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="10" /><circle cx="16" cy="16" r="6" />
    <line x1="16" y1="4" x2="16" y2="6" /><line x1="16" y1="26" x2="16" y2="28" />
    <line x1="4" y1="16" x2="6" y2="16" /><line x1="26" y1="16" x2="28" y2="16" />
    <path d="M14 14 L16 12 L18 14 L18 18 L14 18 Z" />
  </svg>
);
const WmPillar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="6" x2="26" y2="6" /><line x1="6" y1="28" x2="26" y2="28" />
    <line x1="4" y1="8" x2="28" y2="8" />
    <rect x="9" y="8" width="4" height="18" /><rect x="14" y="8" width="4" height="18" /><rect x="19" y="8" width="4" height="18" />
    <line x1="4" y1="26" x2="28" y2="26" />
  </svg>
);

const LEGAL_ICONS = [
  { x: 4,  y: 10, size: 52, rot: -15, Ic: WmScales },
  { x: 86, y: 7,  size: 40, rot: 20,  Ic: WmQuill  },
  { x: 14, y: 70, size: 44, rot: -8,  Ic: WmSeal   },
  { x: 80, y: 62, size: 56, rot: 12,  Ic: WmPillar },
  { x: 48, y: 4,  size: 32, rot: 5,   Ic: WmScales },
  { x: 91, y: 40, size: 42, rot: -20, Ic: WmQuill  },
  { x: 2,  y: 44, size: 36, rot: 10,  Ic: WmSeal   },
  { x: 58, y: 83, size: 48, rot: -5,  Ic: WmPillar },
  { x: 28, y: 88, size: 30, rot: 18,  Ic: WmScales },
  { x: 68, y: 18, size: 34, rot: -12, Ic: WmQuill  },
  { x: 35, y: 52, size: 28, rot: 8,   Ic: WmSeal   },
  { x: 72, y: 38, size: 38, rot: -6,  Ic: WmPillar },
];

// ── Karrar.ai Logo — original PNG, background removed ──────────
const KARRAR_LOGO_SRC = "data:image/png;base64,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";

const KarrarLogoMark = ({ size = 40 }) => (
  <img
    src={KARRAR_LOGO_SRC}
    alt="Karrar.ai logo"
    style={{
      width: size,
      height: size,
      display: "block",
      objectFit: "contain",
      filter: "invert(1) sepia(1) saturate(1.4) hue-rotate(2deg) brightness(1.05)",
    }}
  />
);

const KarrarLogo = ({ size = 40, wordmark = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.4) }}>
    <KarrarLogoMark size={size} />
    {wordmark && (
      <span style={{
        fontFamily: "Playfair Display, serif",
        fontSize: Math.round(size * 0.85),
        fontWeight: 700,
        color: "#FFFFFF",
        letterSpacing: "0.02em",
        lineHeight: 1,
      }}>
        Karrar.ai
      </span>
    )}
  </div>
);

// Full logo with wordmark

// ── Risk Badge ──────────────────────────────────────────────────
const RiskBadge = ({ score, size = "sm" }) => {
  const color = score >= 8 ? "#ef4444" : score >= 6 ? "#f59e0b" : "#22c55e";
  const label = score >= 8 ? "HIGH" : score >= 6 ? "MED" : "LOW";
  return (
    <span style={{ background: color + "18", color, border: `1px solid ${color}35`, borderRadius: 6, padding: size === "lg" ? "5px 12px" : "3px 8px", fontSize: size === "lg" ? 13 : 11, fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/></svg>
      Risk {score.toFixed(1)}
    </span>
  );
};

// ── Animated Counter ────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0, step = target / (duration / 16);
        const t = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(start)); }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Scroll Progress Hook ────────────────────────────────────────
function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start animating when element top hits bottom of screen, complete when element center hits screen center
      const start = windowH;
      const end = windowH * 0.2;
      const current = rect.top;
      const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
      setProgress(p);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
}

// ── Dashboard Preview Component ─────────────────────────────────
function DashboardPreview() {
  const risks = [
    { title: "High Financial Liability", sub: "Indemnification Clause", score: 8.4, icon: "⚠" },
    { title: "Unfair Non-Compete Term", sub: "Non-Compete Agreement", score: 7.6, icon: "⚡" },
    { title: "Unclear Jurisdiction",     sub: "Governing Law Clause",  score: 6.9, icon: "ℹ" },
  ];
  const recent = [
    { name: "MSA_Company_X.pdf",      time: "13 min ago", tags: ["3.4+", "11"] },
    { name: "Freelancer_NDA.docx",    time: "1 hour ago", tags: [] },
    { name: "SBA_India_Company.pdf",  time: "5 hrs ago",  tags: [] },
  ];

  return (
    <div style={{ width: "100%", background: "#0A0B0E", borderRadius: "20px 20px 0 0", border: "1px solid #1E2228", borderBottom: "none", overflow: "hidden", fontFamily: "DM Sans, sans-serif", userSelect: "none" }}>
      {/* Top bar */}
      <div style={{ background: "#0F1115", borderBottom: "1px solid #1E2228", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <KarrarLogo size={28} wordmark={true} />
        <div style={{ flex: 1, display: "flex", gap: 24, marginLeft: 16 }}>
          {["Home", "Contracts", "Agents", "Reports"].map((n, i) => (
            <span key={n} style={{ fontSize: 13, color: i === 0 ? "#C49E6C" : "#555", cursor: "pointer", fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? "1.5px solid #C49E6C" : "none", paddingBottom: 2 }}>{n}</span>
          ))}
        </div>
        <div style={{ background: "#1E2228", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#555", display: "flex", alignItems: "center", gap: 6, width: 200 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search contracts...
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{ position: "absolute", top: -4, right: -4, background: "#ef4444", borderRadius: "50%", width: 10, height: 10, fontSize: 7, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>3</span>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#C49E6C,#F5D08A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#000" }}>JS</div>
          <span style={{ fontSize: 12, color: "#888" }}>John S.</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", height: 520 }}>
        {/* Sidebar */}
        <div style={{ width: 180, borderRight: "1px solid #1E2228", padding: "20px 12px", flexShrink: 0 }}>
          {[
            { label: "Home", active: true, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
            { label: "Contracts", active: false, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg> },
            { label: "Agents", active: false, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="7" y1="19" x2="17" y2="19"/></svg> },
            { label: "Reports", active: false, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, marginBottom: 4, background: item.active ? "rgba(196,158,108,0.1)" : "transparent", color: item.active ? "#C49E6C" : "#555" }}>
              {item.icon}
              <span style={{ fontSize: 13, fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #1E2228" }}>
            <div style={{ fontSize: 10, color: "#333", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em", marginBottom: 10 }}>FAVORITES</div>
            {["NDA_Startup.d...", "Rental Agreement", "SBA_India_Comp..."].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, marginBottom: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                <span style={{ fontSize: 11, color: "#444" }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 10, color: "#333", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em", marginBottom: 10 }}>TOP ENTITIES</div>
            {[{ flag: "🇮🇳", name: "Indian Ministries" }, { flag: "🇮🇳", name: "Freelancer Y" }].map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 10 }}>{e.flag}</span>
                <span style={{ fontSize: 11, color: "#444" }}>{e.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px", overflowY: "hidden" }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>Dashboard</h2>
            <p style={{ fontSize: 13, color: "#555" }}>Audit, analyze, and negotiate your contracts effortlessly.</p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Total Contracts", val: "3,468", color: "#FFFFFF" },
              { label: "High Risks", val: "312", color: "#ef4444", icon: true },
              { label: "Flagged Terms", val: "564", color: "#f59e0b" },
            ].map((s, i) => (
              <div key={i} className="dash-stat-card" style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 800, color: s.color, display: "flex", alignItems: "center", gap: 6 }}>
                  {s.icon && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/></svg>}
                  {s.val}
                </div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2, fontFamily: "IBM Plex Mono, monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Alert */}
          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize: 12, color: "#f59e0b" }}>Alert: Contract <strong>MSA_Company_X.pdf</strong> has 1 high risk &amp; 3 moderate risks</span>
            </div>
            <span style={{ fontSize: 11, color: "#C49E6C", cursor: "pointer", fontFamily: "IBM Plex Mono, monospace", borderBottom: "1px solid rgba(196,158,108,0.4)" }}>View Analysis</span>
          </div>

          {/* Risk cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {risks.map((r, i) => (
              <div key={i} style={{ background: "#0F1115", border: `1px solid ${r.score >= 8 ? "rgba(239,68,68,0.2)" : r.score >= 7 ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: r.score >= 8 ? "rgba(239,68,68,0.12)" : r.score >= 7 ? "rgba(245,158,11,0.12)" : "rgba(107,114,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                    {i === 0 ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    : i === 1 ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "IBM Plex Mono, monospace" }}>{r.sub}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <RiskBadge score={r.score} />
                  <div style={{ background: "rgba(196,158,108,0.08)", border: "1px solid rgba(196,158,108,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#C49E6C", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "IBM Plex Mono, monospace" }}>
                    Suggest Counter-Terms
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 220, borderLeft: "1px solid #1E2228", padding: "20px 16px", flexShrink: 0 }}>
          {/* Donut chart */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF", marginBottom: 12, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.06em" }}>RISK BREAKDOWN</div>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 12px" }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="28" fill="none" stroke="#1E2228" strokeWidth="10" />
                <circle cx="40" cy="40" r="28" fill="none" stroke="#ef4444" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 28 * 0.01} ${2 * Math.PI * 28 * 0.99}`}
                  strokeDashoffset={2 * Math.PI * 28 * 0.25} strokeLinecap="round" />
                <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 28 * 0.17} ${2 * Math.PI * 28 * 0.83}`}
                  strokeDashoffset={2 * Math.PI * 28 * 0.24} strokeLinecap="round" />
                <circle cx="40" cy="40" r="28" fill="none" stroke="#22c55e" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 28 * 0.70} ${2 * Math.PI * 28 * 0.30}`}
                  strokeDashoffset={2 * Math.PI * 28 * 0.07} strokeLinecap="round" />
                <text x="40" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="Georgia, serif">70%</text>
              </svg>
            </div>
            {[{ label: "High Risk", pct: "1%", color: "#ef4444" }, { label: "Med Risk", pct: "17%", color: "#f59e0b" }, { label: "Low Risk", pct: "70%", color: "#22c55e" }].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }} />
                  <span style={{ fontSize: 11, color: "#888" }}>{r.label}</span>
                </div>
                <span style={{ fontSize: 11, color: r.color, fontFamily: "IBM Plex Mono, monospace", fontWeight: 700 }}>{r.pct}</span>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ borderTop: "1px solid #1E2228", paddingTop: 16 }}>
            <div style={{ fontSize: 10, color: "#333", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em", marginBottom: 10 }}>RECENT ACTIVITY</div>
            {[
              { name: "MSA_Company_X.pdf", time: "13 min ago", color: "#ef4444" },
              { name: "Freelancer_NDA.docx", time: "1 hour ago", color: "#C49E6C" },
              { name: "SBA_India_Company.pdf", time: "5 hrs ago", color: "#3b82f6" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: item.color + "18", border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#CCCCCC", fontWeight: 500, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#444", marginTop: 1, fontFamily: "IBM Plex Mono, monospace" }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Entities */}
          <div style={{ borderTop: "1px solid #1E2228", paddingTop: 14, marginTop: 4 }}>
            <div style={{ fontSize: 10, color: "#333", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em", marginBottom: 10 }}>TOP ENTITIES</div>
            {[{ name: "Company.X", sub: "The jundientee claes", time: "13 min ago" }, { name: "Freelancer Y", sub: "Frequent Mentioins", time: "1 hour ago" }].map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13 }}>🇮🇳</span>
                <div>
                  <div style={{ fontSize: 11, color: "#CCCCCC", fontWeight: 600 }}>{e.name}</div>
                  <div style={{ fontSize: 10, color: "#444" }}>{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
function KarrarLanding({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const dashRef = useRef(null);
  const dashProgress = useScrollProgress(dashRef);
  const [uploadState, setUploadState] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      // Scroll spy — update active nav based on which section is in view
      const sections = ["home","how-it-works","agents","features","pricing","about"];
      const labelMap = {
        "home": "Home",
        "how-it-works": "How It Works",
        "agents": "Agents",
        "features": "Features",
        "pricing": "Pricing",
        "about": "About",
      };
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveNav(labelMap[sections[i]]);
          break;
        }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const triggerAnalysis = () => {
    setUploadState("analyzing");
    const steps = [[10,"Parsing PDF…"],[30,"Completeness Agent…"],[50,"Risk Scoring Agent…"],[65,"Negotiation Agent…"],[80,"Consistency Agent…"],[92,"Regulatory Agent…"],[100,"Analysis complete."]];
    let i = 0;
    const next = () => {
      if (i < steps.length) { setProgress(steps[i][0]); setProgressLabel(steps[i][1]); i++; setTimeout(next, i === steps.length ? 400 : 600); }
      else setTimeout(() => setUploadState("done"), 300);
    };
    next();
  };

  const NAV = ["Home","How It Works","Agents","Features","Pricing","About"];

  const NAV_IDS = {
    "Home": "home",
    "How It Works": "how-it-works",
    "Agents": "agents",
    "Features": "features",
    "Pricing": "pricing",
    "About": "about",
  };

  const scrollToSection = (navLabel) => {
    setActiveNav(navLabel);
    const id = NAV_IDS[navLabel];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Dashboard transform based on scroll progress
  const dashY = (1 - dashProgress) * 120;           // slides up from below
  const dashScale = 0.88 + dashProgress * 0.12;     // scales from 88% to 100%
  const dashOpacity = Math.min(1, dashProgress * 1.5);
  const glowOpacity = dashProgress * 0.6;

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: "#000000", color: "#FFFFFF", overflowX: "hidden", position: "relative" }}>
      {/* ── CURSOR GLOW ── follows mouse, gold radial with smooth motion */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9998,
        left: mouse.x - 350, top: mouse.y - 350,
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.06) 25%, rgba(212,175,55,0.02) 50%, transparent 75%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        transition: "left 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
      }} />
      
      {/* ── SECONDARY GLOW LAYER for enhanced smoothness ── */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9997,
        left: mouse.x - 250, top: mouse.y - 250,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        transition: "left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }} />
      
      {/* ── AMBIENT BACKGROUND GLOWS (static, scattered) with animations ── */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ 
          position:"absolute", top:"15%", left:"10%", width:500, height:500, 
          background:"radial-gradient(circle, rgba(196,158,108,0.05) 0%, transparent 70%)", 
          borderRadius:"50%",
          animation: "pulse 8s ease-in-out infinite",
        }} />
        <div style={{ 
          position:"absolute", top:"60%", right:"5%", width:400, height:400, 
          background:"radial-gradient(circle, rgba(196,158,108,0.04) 0%, transparent 70%)", 
          borderRadius:"50%",
          animation: "pulse 10s ease-in-out infinite 2s",
        }} />
        <div style={{ 
          position:"absolute", bottom:"10%", left:"30%", width:350, height:350, 
          background:"radial-gradient(circle, rgba(196,158,108,0.035) 0%, transparent 70%)", 
          borderRadius:"50%",
          animation: "pulse 12s ease-in-out infinite 4s",
        }} />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-16px)} }
        @keyframes float2  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:0.4;transform:scale(1);filter:blur(0px)} 50%{opacity:0.7;transform:scale(1.1);filter:blur(8px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes goldBeam { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes icFloat { 0%,100%{transform:translateY(0) rotate(var(--rot))} 50%{transform:translateY(-12px) rotate(var(--rot))} }
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 0 rgba(196,158,108,0)} 50%{box-shadow:0 0 32px rgba(196,158,108,0.15)} }
        @keyframes typewriter { from{width:0} to{width:100%} }
        @keyframes blink { 50%{opacity:0} }
        @keyframes glowPulse { 0%,100%{filter:blur(40px);opacity:0.8} 50%{filter:blur(50px);opacity:1} }
        .dash-stat-card { animation: floatCard 4s ease-in-out infinite; }
        .dash-stat-card:nth-child(2) { animation-delay: 0.7s; }
        .dash-stat-card:nth-child(3) { animation-delay: 1.4s; }

        .fade-up-1 { animation: fadeUp 0.9s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.9s 0.18s ease both; }
        .fade-up-3 { animation: fadeUp 0.9s 0.30s ease both; }
        .fade-up-4 { animation: fadeUp 0.9s 0.44s ease both; }
        .fade-up-5 { animation: fadeUp 0.9s 0.58s ease both; }
        .fade-up-6 { animation: fadeUp 0.9s 0.72s ease both; }

        .btn-gold {
          background: linear-gradient(90deg,#C49E6C,#F5D08A);
          color: #000; border: none; border-radius: 999px;
          font-family:'DM Sans',sans-serif; font-weight: 700; font-size: 15px;
          cursor: pointer; transition: all 0.28s; letter-spacing: 0.02em;
        }
        .btn-gold:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 0 40px rgba(196,158,108,0.55), 0 12px 32px rgba(0,0,0,0.5); }

        .btn-ghost {
          background: transparent; color: #fff;
          border: 1.5px solid rgba(196,158,108,0.4);
          border-radius: 999px;
          font-family:'DM Sans',sans-serif; font-weight: 600; font-size: 15px;
          cursor: pointer; transition: all 0.25s;
        }
        .btn-ghost:hover { border-color: #C49E6C; color: #F5D08A; box-shadow: 0 0 24px rgba(196,158,108,0.2); transform: translateY(-1px); }

        .btn-dark {
          background: linear-gradient(90deg,#C49E6C,#F5D08A);
          color:#000; border:none; border-radius:999px;
          font-family:'DM Sans',sans-serif; font-weight:700; font-size:15px;
          cursor:pointer; transition:all 0.25s;
        }
        .btn-dark:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 32px rgba(196,158,108,0.45); }
        .btn-outline {
          background:transparent; color:#fff; border:1.5px solid rgba(196,158,108,0.5);
          border-radius:999px; padding:13px 32px; font-family:'DM Sans',sans-serif;
          font-weight:600; font-size:15px; cursor:pointer; transition:all 0.25s;
        }
        .btn-outline:hover { border-color:#C49E6C; color:#F5D08A; transform:translateY(-1px); }

        .nav-link {
          color:#B5B5B5; text-decoration:none; font-size:14px; font-weight:500;
          padding:6px 0; position:relative; transition:color 0.2s; cursor:pointer;
        }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:linear-gradient(90deg,#C49E6C,#F5D08A); transition:width 0.25s; }
        .nav-link:hover, .nav-link.active { color:#fff; }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }

        .card-hover { transition: all 0.28s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(196,158,108,0.08) !important; }
        .agent-card:hover { border-color: rgba(196,158,108,0.4) !important; box-shadow: 0 16px 48px rgba(196,158,108,0.1) !important; }

        .upload-zone {
          border: 1.5px dashed #1E2228; border-radius: 20px; padding: 56px 32px;
          text-align: center; transition: all 0.28s; cursor: pointer; background: #0F1115;
        }
        .upload-zone:hover { border-color: #C49E6C; background: rgba(196,158,108,0.03); box-shadow: 0 0 48px rgba(196,158,108,0.08); }

        /* Dashboard glow container */
        .dash-glow {
          position: absolute; inset: -40px;
          background: radial-gradient(ellipse 70% 40% at 50% 100%, rgba(196,158,108,0.25) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          filter: blur(20px);
        }

        section { scroll-margin-top: 80px; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid #1E2228" : "none",
        transition: "all 0.3s", padding:"0 40px",
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", height:68, gap:32 }}>
          <KarrarLogo size={32} />
          <div style={{ flex:1, display:"flex", justifyContent:"center", gap:36 }}>
            {NAV.map(n => <span key={n} className={`nav-link${activeNav===n?" active":""}`} onClick={()=>scrollToSection(n)}>{n}</span>)}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn-ghost" style={{ padding:"8px 20px", fontSize:13 }} onClick={onLogin}>Login</button>
            <button className="btn-gold" style={{ padding:"9px 22px", fontSize:13 }} onClick={onLogin}>Try Free →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO — Centered layout (like Image 1 but dark) ── */}
      <section id="home" style={{ minHeight:"100vh", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", paddingTop:68, flexDirection:"column" }}>

        {/* Watermark icons */}
        {LEGAL_ICONS.map((ic, i) => (
          <div key={i} style={{
            position:"absolute", left:`${ic.x}%`, top:`${ic.y}%`,
            opacity: 0.055, color:"#C49E6C",
            transform:`rotate(${ic.rot}deg)`,
            pointerEvents:"none",
            animation:`icFloat ${5 + i * 0.4}s ease-in-out infinite`,
            "--rot": `${ic.rot}deg`,
          }}>
            <ic.Ic size={ic.size} />
          </div>
        ))}

        {/* Dot grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, #b5924c1a 1px, transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }} />
        {/* Gold glow center */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 55% at 50% 45%, rgba(196,158,108,0.14) 0%, rgba(196,158,108,0.05) 50%, transparent 75%)", pointerEvents:"none" }} />
        {/* Subtle horizontal beam */}
        <div style={{ position:"absolute", top:"42%", left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, rgba(196,158,108,0.15) 30%, rgba(245,208,138,0.3) 50%, rgba(196,158,108,0.15) 70%, transparent 100%)", pointerEvents:"none", animation:"goldBeam 6s ease-in-out infinite" }} />

        {/* Content — centered */}
        <div style={{ textAlign:"center", maxWidth:860, padding:"0 32px", position:"relative", zIndex:1 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(196,158,108,0.08)", border: "1px solid rgba(196,158,108,0.22)", borderRadius: 20, padding: "6px 16px", marginBottom: 32 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(90deg,#C49E6C,#F5D08A)", display: "inline-block" }}
            />
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.07em" }}>India's First Multi-Agent Legal AI — Now Live</span>
          </motion.div>

          {/* Logo lockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}
          >
            <KarrarLogo size={52} />
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(56px, 8vw, 96px)", fontWeight:900, lineHeight:1.02, marginBottom:28, textShadow:"0 0 100px rgba(196,158,108,0.12)", perspective: 600 }}>
            {"Understand. "}
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Negotiate.</span>
            {" Sign."}
          </AnimatedHeadline>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            style={{ fontSize:"clamp(16px, 2vw, 20px)", color:"#888", lineHeight:1.75, marginBottom:8 }}
          >
            <strong style={{ color:"#FFFFFF" }}>India's First Multi-Agent Legal AI.</strong>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
            style={{ fontSize:"clamp(14px, 1.6vw, 17px)", color:"#666", lineHeight:1.75, marginBottom:40 }}
          >
            Audit Contracts, Analyze Risks &amp; Draft Counter-Terms in Plain English,{" "}
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:600 }}>Under Indian Law.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
            style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(196,158,108,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold" style={{ padding:"16px 36px", fontSize:16, display:"flex", alignItems:"center", gap:10 }}
              onClick={onLogin}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14V4"/><polyline points="8,8 12,4 16,8"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
              Upload a Contract — It's Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(196,158,108,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost" style={{ padding:"16px 28px", fontSize:16 }}
            >Watch Demo →</motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}
          >
            {[
              { label:"End-to-End Encrypted" },
              { label:"Indian Law Grounded" },
              { label:"90-Second Analysis" },
            ].map((t,i) => (
              <span key={i} style={{ fontSize:12, color:"#444", fontFamily:"IBM Plex Mono, monospace", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ display:"inline-block", width:5, height:5, borderRadius:"50%", background:"rgba(196,158,108,0.5)" }} />
                {t.label}
              </span>
            ))}
          </motion.div>

          {/* Legal icon row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            style={{ display:"flex", gap:24, justifyContent:"center", marginTop:52, opacity:0.25, color:"#C49E6C" }}
          >
            {[WmScales, WmSeal, WmQuill, WmPillar, WmScales].map((Ic, i) => <Ic key={i} size={28} />)}
          </motion.div>
        </div>

        {/* Bottom fade into dashboard section */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:"linear-gradient(transparent, #000000)", pointerEvents:"none" }} />
      </section>

      {/* ── DASHBOARD SCROLL-REVEAL SECTION ─────────────── */}
      <section ref={dashRef} style={{ padding:"80px 0 0", background:"#000000", position:"relative", overflow:"hidden" }}>
        {/* Section label */}
        <FadeUp style={{ textAlign:"center", marginBottom:48, padding:"0 32px" }}>
          <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.14em", display:"block", marginBottom:12 }}>THE PLATFORM</span>
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,60px)", fontWeight:900, color:"#FFFFFF", lineHeight:1.1 }}>
            Your Intelligent<br />
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Contract Command Centre</span>
          </h2>
          <p style={{ color:"#555", fontSize:16, marginTop:16 }}>6 AI agents. Real-time risk scoring. Counter-terms in one click.</p>
        </FadeUp>

        {/* Scroll-driven dashboard reveal */}
        <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          {/* Ambient glow behind dashboard */}
          <div style={{ position:"absolute", bottom:0, left:"10%", right:"10%", height:200, background:`radial-gradient(ellipse 80% 100% at 50% 100%, rgba(196,158,108,${glowOpacity}) 0%, transparent 70%)`, filter:"blur(30px)", pointerEvents:"none", transition:"opacity 0.1s" }} />
          {/* Top fade so it emerges from darkness */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(#000000, transparent)", zIndex:10, pointerEvents:"none" }} />

          {/* The actual dashboard — transforms driven by scroll */}
          <div style={{
            transform: `translateY(${dashY}px) scale(${dashScale})`,
            opacity: dashOpacity,
            transformOrigin: "top center",
            transition: "none",
            willChange: "transform, opacity",
            borderRadius:"20px 20px 0 0",
            boxShadow: `0 -8px 80px rgba(196,158,108,${glowOpacity * 0.8}), 0 0 0 1px rgba(196,158,108,${glowOpacity * 0.3})`,
          }}>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <div style={{ background:"#050505", padding:"28px 0", borderTop:"1px solid #1E2228", borderBottom:"1px solid #1E2228" }}>
        <StaggerContainer stagger={0.15} delay={0.1} style={{ display:"flex", gap:56, justifyContent:"center", flexWrap:"wrap", padding:"0 32px" }}>
          {[
            { label:"Contracts Analyzed", value:12400, suffix:"+" },
            { label:"Risk Clauses Flagged", value:84000, suffix:"+" },
            { label:"Counter-Terms Generated", value:31000, suffix:"+" },
            { label:"Compliance Rate", value:98, suffix:"%" },
          ].map(s => (
            <StaggerChild key={s.label} style={{ textAlign:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"Playfair Display, serif", fontSize:38, fontWeight:700, background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize:11, color:"#444", marginTop:6, fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.08em" }}>{s.label.toUpperCase()}</div>
            </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section id="how-it-works" style={{ padding:"120px 32px", background:"#000000" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>THE PROCESS</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>From Upload to Insight</h2>
            <p style={{ color:"#666", fontSize:16, marginTop:12 }}>in under 90 seconds</p>
          </FadeUp>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:36, left:"8%", right:"8%", height:1, background:"linear-gradient(90deg,transparent,rgba(196,158,108,0.4),transparent)" }} />
            <StaggerContainer stagger={0.1} delay={0.1} style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20 }}>
              {[
                { num:"01", title:"Upload",            desc:"Drag & drop your PDF contract. No account needed." },
                { num:"02", title:"Parallel Analysis", desc:"6 agents analyze simultaneously in under 90 seconds." },
                { num:"03", title:"Risk Report",       desc:"Every clause scored 0–100 and ranked by severity." },
                { num:"04", title:"Counter-Terms",     desc:"Copy-paste professional alternative clauses instantly." },
                { num:"05", title:"Act",               desc:"Sign with clarity, negotiate, or consult a lawyer." },
              ].map((s,i) => (
                <StaggerChild key={i}>
                  <MotionCard color="#C49E6C" style={{ background:"#0A0B0E", border:"1px solid #1E2228", borderRadius:16, padding:"28px 18px", textAlign:"center", height:"100%" }}>
                    <div style={{ width:52, height:52, background:"rgba(196,158,108,0.06)", border:"1px solid rgba(196,158,108,0.12)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                      <span style={{ fontFamily:"Playfair Display, serif", fontSize:22, fontWeight:900, background:"linear-gradient(135deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{i+1}</span>
                    </div>
                    <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10, color:"#C49E6C", letterSpacing:"0.1em", marginBottom:8 }}>{s.num}</div>
                    <div style={{ fontFamily:"Playfair Display, serif", fontSize:16, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>{s.title}</div>
                    <div style={{ fontSize:12, color:"#555", lineHeight:1.65 }}>{s.desc}</div>
                  </MotionCard>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── AGENTS ────────────────────────────────────────── */}
      <section id="agents" style={{ padding:"120px 32px", background:"#030303", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(196,158,108,0.06) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>THE TEAM</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Meet Your Legal Team</h2>
            <p style={{ color:"#666", fontSize:16, marginTop:12 }}>6 specialized AI agents working in parallel on every upload</p>
          </FadeUp>
          <StaggerContainer stagger={0.12} delay={0.1} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { name:"Completeness Agent",      role:"Finds missing annexures & schedules",  color:"#3b82f6", num:"01", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><polyline points="8,10 10,12 13,8"/></svg> },
              { name:"Risk & Red Flag Agent",   role:"Scores every clause 0–100",            color:"#ef4444", num:"02", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg> },
              { name:"Negotiation Agent",       role:"Generates copy-paste counter-terms",   color:"#C49E6C", num:"03", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 16H3v-4"/><path d="M3 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M17 8h4v4"/><path d="M21 12c0 4.4-3.6 8-8 8s-8-3.6-8-8"/></svg> },
              { name:"Draft Consistency Agent", role:"Catches internal contradictions",      color:"#8b5cf6", num:"04", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="11" height="14" rx="1.5"/><rect x="10" y="3" width="11" height="14" rx="1.5" fill="#030303"/><line x1="13" y1="8" x2="18" y2="8"/><line x1="13" y1="11" x2="17" y2="11"/></svg> },
              { name:"Regulatory Agent",        role:"Cross-checks Indian Contract Act",     color:"#22c55e", num:"05", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 3 9 14 14 0 0 1-3 9 14 14 0 0 1-3-9 14 14 0 0 1 3-9z"/></svg> },
              { name:"Explanation Agent",       role:"Translates legalese to plain English", color:"#f59e0b", num:"06", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="13" y1="10" x2="16" y2="10"/><line x1="9" y1="13" x2="15" y2="13"/></svg> },
            ].map((a,i) => (
              <StaggerChild key={i}>
              <MotionCard color={a.color} style={{ background:"#0A0B0E", border:"1px solid #1E2228", borderRadius:20, padding:"28px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{ width:46, height:46, background:a.color+"18", border:`1px solid ${a.color}30`, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", color:a.color }}>
                    {a.icon}
                  </div>
                  <span style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:22, fontWeight:700, color:"#1A1A1A", transition:"color 0.2s" }}>{a.num}</span>
                </div>
                <div style={{ fontFamily:"Playfair Display, serif", fontSize:17, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>{a.name}</div>
                <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{a.role}</div>
                <div style={{ marginTop:16, height:2, background:`linear-gradient(90deg,${a.color},transparent)`, borderRadius:2 }} />
              </MotionCard>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────── */}
      <section id="features" style={{ padding:"120px 32px", background:"#000000" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:56 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>REAL IMPACT</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Before vs. After Karrar.ai</h2>
          </FadeUp>
          <StaggerContainer stagger={0.2} delay={0.1} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
            <StaggerChild><MotionCard color="#ef4444" style={{ background:"#0A0B0E", border:"1px solid rgba(239,68,68,0.2)", borderRadius:20, padding:32 }}>
              <div style={{ fontSize:11, color:"#ef4444", fontFamily:"IBM Plex Mono, monospace", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                BEFORE — The contract says:
              </div>
              <p style={{ fontFamily:"Georgia, serif", fontSize:14, color:"#888", lineHeight:1.8, fontStyle:"italic", borderLeft:"3px solid rgba(239,68,68,0.35)", paddingLeft:16 }}>
                "The Client may terminate this agreement at any time without prior notice and without liability for any work completed or in progress."
              </p>
              <div style={{ marginTop:20, padding:"10px 14px", background:"rgba(239,68,68,0.05)", borderRadius:10, fontSize:13, color:"#666", border:"1px solid rgba(239,68,68,0.12)" }}>
                You have no idea what this means for your income.
              </div>
            </MotionCard></StaggerChild>
            <StaggerChild><MotionCard color="#22c55e" style={{ background:"#0A0B0E", border:"1px solid rgba(34,197,94,0.2)", borderRadius:20, padding:32 }}>
              <div style={{ fontSize:11, color:"#22c55e", fontFamily:"IBM Plex Mono, monospace", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="8,12 11,15 16,9"/></svg>
                AFTER — Karrar.ai shows you:
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <RiskBadge score={9.1} size="lg" />
                <span style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:11, color:"#ef4444", fontWeight:700 }}>CRITICAL RISK</span>
              </div>
              <p style={{ fontSize:13, color:"#888", lineHeight:1.75, marginBottom:16 }}>
                The client can cancel <em>anytime, for any reason</em>, and owes you <strong style={{color:"#fff"}}>₹0</strong> for completed work — even if you spent 3 weeks on it.
              </p>
              <div style={{ background:"rgba(34,197,94,0.05)", border:"1px solid rgba(34,197,94,0.18)", borderRadius:10, padding:"12px 14px" }}>
                <div style={{ fontSize:10, color:"#22c55e", fontFamily:"IBM Plex Mono, monospace", marginBottom:6 }}>✦ COUNTER-TERM GENERATED:</div>
                <p style={{ fontSize:13, color:"#888", fontFamily:"Georgia, serif", fontStyle:"italic", lineHeight:1.65 }}>
                  "Either party may terminate with 30 days written notice. Upon termination, Client shall pay for all work completed pro-rata at agreed rate."
                </p>
              </div>
            </MotionCard></StaggerChild>
          </StaggerContainer>
        </div>
      </section>

      {/* ── UPLOAD DEMO ───────────────────────────────────── */}
      <section style={{ padding:"120px 32px", background:"#030303" }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <FadeUp>
          <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>TRY IT NOW</span>
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:900, color:"#FFFFFF", marginTop:10, marginBottom:12 }}>Upload Your Contract</h2>
          <p style={{ color:"#555", fontSize:15, marginBottom:40 }}>No account required. Results in under 90 seconds.</p>
          </FadeUp>

          {uploadState === "idle" && (
            <div className="upload-zone" onClick={triggerAnalysis}>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#C49E6C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:20, opacity:0.65 }}>
                <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V20L28 4z"/>
                <polyline points="28,4 28,20 40,20"/>
                <line x1="16" y1="28" x2="32" y2="28"/><line x1="16" y1="34" x2="28" y2="34"/>
              </svg>
              <div style={{ fontFamily:"Playfair Display, serif", fontSize:20, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>Drag & drop your contract PDF</div>
              <div style={{ color:"#444", fontSize:14, marginBottom:24 }}>or click to browse — supports PDF, DOCX</div>
              <button className="btn-dark" style={{ fontSize:14, padding:"12px 28px" }}>Choose File</button>
            </div>
          )}
          {uploadState === "analyzing" && (
            <div style={{ background:"#0A0B0E", border:"1px solid #1E2228", borderRadius:20, padding:40 }}>
              <div style={{ animation:"spin 2s linear infinite", display:"inline-flex", marginBottom:16 }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <div style={{ fontFamily:"Playfair Display, serif", fontSize:20, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>Analyzing Your Contract</div>
              <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:12, color:"#C49E6C", marginBottom:24 }}>{progressLabel}</div>
              <div style={{ background:"#1E2228", borderRadius:20, height:8, overflow:"hidden" }}>
                <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#C49E6C,#F5D08A)", borderRadius:20, transition:"width 0.5s ease" }} />
              </div>
              <div style={{ fontSize:11, color:"#333", marginTop:8 }}>{progress}% complete</div>
            </div>
          )}
          {uploadState === "done" && (
            <div style={{ background:"#0A0B0E", border:"1px solid rgba(34,197,94,0.3)", borderRadius:20, padding:40, boxShadow:"0 0 48px rgba(34,197,94,0.05)" }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:16 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
              <div style={{ fontFamily:"Playfair Display, serif", fontSize:22, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>Analysis Complete!</div>
              <div style={{ color:"#555", fontSize:14, marginBottom:28 }}>Your contract has been analyzed by all 6 agents.</div>
              <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:28, flexWrap:"wrap" }}>
                {[{val:"8.4",label:"OVERALL RISK",c:"#ef4444"},{val:"7",label:"FLAGGED CLAUSES",c:"#f59e0b"},{val:"4",label:"COUNTER-TERMS",c:"#22c55e"}].map((s,i)=>(
                  <div key={i} style={{ background:s.c+"0A", border:`1px solid ${s.c}25`, borderRadius:12, padding:"12px 18px", textAlign:"center" }}>
                    <div style={{ fontFamily:"Playfair Display, serif", fontSize:30, fontWeight:800, color:s.c }}>{s.val}</div>
                    <div style={{ fontSize:10, color:"#444", fontFamily:"IBM Plex Mono, monospace" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <button className="btn-dark" style={{ fontSize:14, padding:"11px 24px" }}>View Full Report →</button>
                <button className="btn-ghost" style={{ fontSize:14, padding:"11px 20px" }} onClick={()=>setUploadState("idle")}>Analyze Another</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="pricing" style={{ padding:"120px 32px", background:"#000000" }}>
        <div style={{ maxWidth:980, margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>PRICING</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Simple, Transparent Pricing</h2>
            <p style={{ color:"#555", fontSize:16, marginTop:12 }}>Start free. Pay only when you need more.</p>
          </FadeUp>
          <StaggerContainer stagger={0.15} delay={0.15} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { name:"Free", price:"₹0", period:"forever", features:["3 contracts/month","Basic risk scoring","Plain language summary","Email support"], cta:"Get Started Free", featured:false },
              { name:"Pro", price:"₹999", period:"/month", features:["Unlimited contracts","All 6 AI agents","Counter-term generation","Contract history","Priority support","Indian law database"], cta:"Start Pro", featured:true },
              { name:"Enterprise", price:"Custom", period:"", features:["Everything in Pro","API access","DigiLocker integration","Custom agents","Dedicated support","SLA guarantee"], cta:"Contact Us", featured:false },
            ].map((p,i) => (
              <StaggerChild key={i}>
              <MotionCard color={p.featured ? "#C49E6C" : "#444"} style={{ background:p.featured ? "#0F1115" : "#08090C", border:p.featured ? "1px solid rgba(196,158,108,0.45)" : "1px solid #1A1B1E", borderRadius:22, padding:32, position:"relative" }}>
                {p.featured && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(90deg,#C49E6C,#F5D08A)", color:"#000", fontSize:10, fontFamily:"IBM Plex Mono, monospace", padding:"4px 14px", borderRadius:20, letterSpacing:"0.06em", whiteSpace:"nowrap", fontWeight:700 }}>MOST POPULAR</div>}
                <div style={{ fontFamily:"Playfair Display, serif", fontSize:22, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>{p.name}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:24 }}>
                  <span style={{ fontFamily:"Playfair Display, serif", fontSize:42, fontWeight:800, color:p.featured ? "#C49E6C" : "#444" }}>{p.price}</span>
                  <span style={{ fontSize:14, color:"#444" }}>{p.period}</span>
                </div>
                {p.features.map((f,j) => (
                  <div key={j} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
                    <div style={{ width:7, height:7, background:"#C49E6C", borderRadius:1, transform:"rotate(45deg)", flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"#777" }}>{f}</span>
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={p.featured ? "btn-gold" : "btn-dark"} style={{ width:"100%", marginTop:24, fontSize:14, padding:"13px" }}
                  onClick={onLogin}
                >{p.cta}</motion.button>
              </MotionCard>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────*/}
      <section id="about" style={{ padding:"120px 32px", background:"#030303", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(196,158,108,0.07) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 45% at 50% 50%, rgba(196,158,108,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <KarrarLogo size={52} />
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(40px,6vw,72px)", fontWeight:900, color:"#FFFFFF", marginTop:20, marginBottom:16 }}>
            Sign with{" "}
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Clarity.</span>
          </h2>
          <p style={{ color:"#555", fontSize:17, maxWidth:480, margin:"0 auto 40px" }}>
            Join thousands of Indians who negotiate contracts like professionals — for free.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(196,158,108,0.35)" }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ fontSize:17, padding:"17px 40px" }} onClick={onLogin}>Upload a Contract — It's Free</motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" style={{ fontSize:17, padding:"17px 40px" }} onClick={onLogin}>View Pricing</motion.button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ background:"#050505", padding:"72px 32px 36px", borderTop:"1px solid #1E2228" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }}>
            <div>
              <KarrarLogo size={30} />
              <p style={{ fontSize:13, lineHeight:1.75, color:"#444", maxWidth:270, marginTop:14 }}>India's first multi-agent legal AI for contracts. Built for freelancers, founders, and SMEs.</p>
            </div>
            {[
              { title:"Product", links:["How It Works","Features","Agents","Pricing","API"] },
              { title:"Company", links:["About","Blog","Careers","Press","Contact"] },
              { title:"Legal",   links:["Privacy Policy","Terms of Service","Cookie Policy","Disclaimer"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10, color:"#C49E6C", letterSpacing:"0.1em", marginBottom:16 }}>{col.title.toUpperCase()}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize:13, color:"#444", marginBottom:10, cursor:"pointer", transition:"color 0.2s" }}
                    onMouseEnter={e=>e.target.style.color="#FFFFFF"} onMouseLeave={e=>e.target.style.color="#444"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #1A1B1E", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <div style={{ fontSize:12, color:"#333" }}>© 2024 Karrar.ai · Built for India</div>
            <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10, color:"#2A2A2A", letterSpacing:"0.06em" }}>Multi-Agent Legal Intelligence</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────
function LoginPage({ onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#000000", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "DM Sans, sans-serif", color: "#FFFFFF", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .li { width:100%; background:#0D0F13; border:1px solid #222530; border-radius:12px; padding:14px 16px; color:#FFFFFF; font-size:14px; font-family:"DM Sans",sans-serif; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
        .li::placeholder { color:#3A3D48; }
        .li:focus { border-color:rgba(196,158,108,0.55); box-shadow:0 0 0 3px rgba(196,158,108,0.07), 0 0 20px rgba(196,158,108,0.06); }
        .li:hover:not(:focus) { border-color:#333645; }
        .lgbtn { width:100%; background:linear-gradient(135deg,#C49E6C 0%,#F5D08A 60%,#C49E6C 100%); background-size:200% auto; color:#000; font-weight:700; font-size:15px; border:none; border-radius:12px; padding:14px; cursor:pointer; font-family:"DM Sans",sans-serif; letter-spacing:0.02em; transition:all 0.25s; }
        .lgbtn:hover { background-position:right center; box-shadow:0 0 40px rgba(196,158,108,0.5),0 8px 24px rgba(0,0,0,0.5); transform:translateY(-1px); }
        .lgbtn:active { transform:translateY(0); }
        .ggbtn { width:100%; background:#0D0F13; color:#C8CAD2; font-size:14px; border:1px solid #222530; border-radius:12px; padding:13px; cursor:pointer; font-family:"DM Sans",sans-serif; font-weight:500; display:flex; align-items:center; justify-content:center; gap:10px; transition:all 0.2s; }
        .ggbtn:hover { border-color:rgba(196,158,108,0.3); background:#111318; color:#fff; }
        .lnk { color:#C49E6C; cursor:pointer; font-weight:600; transition:color 0.15s; }
        .lnk:hover { color:#F5D08A; }
        .lchk { width:15px; height:15px; accent-color:#C49E6C; cursor:pointer; }
        @keyframes loginIn { from{opacity:0;transform:translateY(32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes gridPulse { 0%,100%{opacity:0.35} 50%{opacity:0.55} }
      `}</style>

      {/* Cursor glow */}
      <div style={{ position:"fixed", pointerEvents:"none", zIndex:9999, left:mouse.x-300, top:mouse.y-300, width:600, height:600, background:"radial-gradient(circle, rgba(196,158,108,0.08) 0%, rgba(196,158,108,0.03) 35%, transparent 70%)", borderRadius:"50%", transition:"left 0.08s ease-out, top 0.08s ease-out" }} />

      {/* Dot grid */}
      <div style={{ position:"fixed", inset:0, backgroundImage:"radial-gradient(circle, #b5924c1a 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:0, animation:"gridPulse 6s ease-in-out infinite" }} />

      {/* Radial ambient glow */}
      <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle, rgba(196,158,108,0.055) 0%, transparent 60%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"-10%", right:"-5%", width:400, height:400, background:"radial-gradient(circle, rgba(196,158,108,0.025) 0%, transparent 60%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

      {/* Back button */}
      <motion.button
        initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4 }}
        onClick={onBack}
        style={{ position:"fixed", top:24, left:28, background:"rgba(15,16,20,0.8)", backdropFilter:"blur(8px)", border:"1px solid #1E2228", borderRadius:8, color:"#666", fontSize:13, padding:"7px 15px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, zIndex:100, fontFamily:"DM Sans, sans-serif" }}
        whileHover={{ borderColor:"rgba(196,158,108,0.35)", color:"#C49E6C" }}
        whileTap={{ scale:0.97 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </motion.button>

      {/* Card */}
      <motion.div
        initial={{ opacity:0, y:36, scale:0.96 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        style={{
          position:"relative", zIndex:10,
          width:"100%", maxWidth:400, margin:"0 16px",
          background:"linear-gradient(160deg, #0E1016 0%, #090A0D 100%)",
          border:"1px solid #1A1D26",
          borderRadius:22,
          padding:"36px 32px 28px",
          boxShadow:"0 40px 100px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(196,158,108,0.08), 0 0 80px rgba(196,158,108,0.03)",
        }}
      >
        {/* Top shimmer line */}
        <div style={{ position:"absolute", top:0, left:"15%", right:"15%", height:1, background:"linear-gradient(90deg, transparent, rgba(196,158,108,0.6), transparent)", borderRadius:1 }} />
        {/* Bottom faint line */}
        <div style={{ position:"absolute", bottom:0, left:"30%", right:"30%", height:1, background:"linear-gradient(90deg, transparent, rgba(196,158,108,0.15), transparent)", borderRadius:1 }} />

        {/* Logo lockup */}
        <motion.div
          initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.15 }}
          style={{ textAlign:"center", marginBottom:6 }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:8 }}>
            <KarrarLogo size={44} wordmark={true} />
          </div>
          <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10.5, color:"#8B7355", letterSpacing:"0.1em", textTransform:"uppercase" }}>Multi-Agent Legal Intelligence</div>
        </motion.div>

        {/* Divider */}
        <div style={{ margin:"22px 0 24px", height:1, background:"linear-gradient(90deg, transparent, #1E2228 20%, #1E2228 80%, transparent)" }} />

        {/* Heading */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.25 }}
          style={{ textAlign:"center", marginBottom:26 }}
        >
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:27, fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.02em", marginBottom:5 }}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p style={{ fontSize:13.5, color:"#4A4F5E", fontWeight:400 }}>
            {isSignUp ? "Start reviewing contracts with AI today" : "Sign in to your Karrar.ai account"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
          style={{ display:"flex", flexDirection:"column", gap:12 }}
        >
          {isSignUp && (
            <input className="li" type="text" placeholder="Full Name" />
          )}

          <input
            className="li" type="email" placeholder="Email Address"
            value={email} onChange={e => setEmail(e.target.value)}
          />

          <div style={{ position:"relative" }}>
            <input
              className="li" type={showPass ? "text" : "password"} placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ paddingRight:46 }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:showPass?"#C49E6C":"#3A3D48", padding:0, display:"flex", alignItems:"center", transition:"color 0.2s" }}
            >
              {showPass ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

          {/* Remember + Forgot */}
          {!isSignUp && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:2 }}>
              <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:13, color:"#555" }}>
                <input type="checkbox" className="lchk" checked={remember} onChange={e=>setRemember(e.target.checked)} />
                Remember me
              </label>
              <span className="lnk" style={{ fontSize:13, fontWeight:500 }}>Forgot Password?</span>
            </div>
          )}

          {/* Primary CTA */}
          <motion.button
            className="lgbtn"
            whileHover={{ scale:1.015 }} whileTap={{ scale:0.98 }}
            style={{ marginTop:6 }}
            onClick={onSuccess}
          >
            {isSignUp ? "Create Account →" : "Login →"}
          </motion.button>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"2px 0" }}>
            <div style={{ flex:1, height:1, background:"#1A1D26" }} />
            <span style={{ fontSize:12, color:"#333" }}>or</span>
            <div style={{ flex:1, height:1, background:"#1A1D26" }} />
          </div>

          {/* Google */}
          <motion.button className="ggbtn" whileHover={{ scale:1.01 }} whileTap={{ scale:0.99 }} onClick={onSuccess}>
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          {/* Demo credentials */}
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"4px 0" }}>
            <div style={{ flex:1, height:1, background:"#1A1D24" }} />
            <span style={{ fontSize:11, color:"#333" }}>or try a demo</span>
            <div style={{ flex:1, height:1, background:"#1A1D24" }} />
          </div>

          <motion.button
            whileHover={{ scale:1.01, borderColor:"rgba(196,158,108,0.5)", background:"rgba(196,158,108,0.06)" }}
            whileTap={{ scale:0.98 }}
            onClick={() => { setEmail("demo@karrar.ai"); setPassword("Demo@1234"); setIsSignUp(false); setTimeout(onSuccess, 400); }}
            style={{
              width:"100%", background:"transparent", border:"1px dashed rgba(196,158,108,0.25)",
              borderRadius:10, padding:"11px 16px", cursor:"pointer",
              fontFamily:"DM Sans, sans-serif", color:"#C49E6C", fontSize:13, fontWeight:500,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              transition:"all 0.2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            Use Demo Credentials
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.5 }}
          style={{ marginTop:22, display:"flex", flexDirection:"column", gap:8 }}
        >
          {["Your contracts are end-to-end encrypted", "Your contracts are never used for training", "Compliant with Indian data protection standards"].map((t, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(196,158,108,0.5)" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize:12, color:"#3A3F50" }}>{t}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom switch */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.55 }}
          style={{ marginTop:22, textAlign:"center", fontSize:13, color:"#3A3F50", display:"flex", alignItems:"center", justifyContent:"space-between" }}
        >
          {isSignUp ? (
            <span>Already have an account? <span className="lnk" onClick={() => setIsSignUp(false)}>Login</span></span>
          ) : (
            <>
              <span className="lnk" style={{ fontWeight:500 }} onClick={() => setIsSignUp(false)}>Forgot Password?</span>
              <span>No account? <span className="lnk" onClick={() => setIsSignUp(true)}>Sign up ›</span></span>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}


// ── MOCK ANALYSIS ENGINE ─────────────────────────────────────────
const MOCK_ANALYSIS = {
  overallScore: 7.8,
  riskLevel: "High",
  completenessScore: 82,
  clauses: [
    {
      id:1, title:"Unilateral Termination Without Cause", type:"Termination",
      riskScore:91, riskLevel:"Critical", agent:"Risk Scoring", negotiable:true, confidence:96,
      original:"The Client may terminate this agreement at any time without prior notice and without liability for any work completed or in progress.",
      plain:"The client can cancel your project ANY time, for ANY reason, without paying you a single rupee for work already done — even if you spent weeks on it.",
      counter:"Either party may terminate this agreement with a minimum of 30 days written notice. Upon termination, the Client shall pay for all work completed up to the date of termination, calculated on a pro-rata basis at the agreed project rate.",
      financialExposure:"₹50,000–₹2,00,000",
    },
    {
      id:2, title:"Unlimited IP Assignment on Creation", type:"Intellectual Property",
      riskScore:88, riskLevel:"High", agent:"Risk Scoring", negotiable:true, confidence:94,
      original:"All work product, including designs, code, documents, and deliverables created under this agreement, shall become the sole and exclusive property of the Client immediately upon creation.",
      plain:"Everything you create instantly becomes the client's property the moment you make it — before they even pay you. You permanently lose all rights to your own work.",
      counter:"All work product shall become the sole property of the Client upon receipt of full payment for the deliverable. Until full payment is received, the Contractor retains all intellectual property rights.",
      financialExposure:"₹1,00,000–₹10,00,000+",
    },
    {
      id:3, title:"Non-Compete Clause — 2 Years Industry-Wide", type:"Non-Compete",
      riskScore:85, riskLevel:"High", agent:"Regulatory Adaptation", negotiable:true, confidence:91,
      original:"For a period of two (2) years following termination of this agreement, the Contractor shall not engage in any business activity that directly or indirectly competes with the Client.",
      plain:"After this contract ends, you cannot work in your own industry for 2 full years. This could prevent you from taking any client, job, or project in your field anywhere in India.",
      counter:"The Contractor shall not directly solicit the Client's existing clients for 6 months following termination. This restriction shall not prevent the Contractor from engaging in their profession generally.",
      financialExposure:"Career restriction — Very High impact",
      regulatoryNote:"⚖ Under Section 27 of the Indian Contract Act, 1872, blanket non-compete clauses are void and unenforceable in India. This clause may be void ab initio.",
    },
    {
      id:4, title:"Liability Cap Below Project Value", type:"Liability",
      riskScore:73, riskLevel:"High", agent:"Risk Scoring", negotiable:true, confidence:89,
      original:"In no event shall either party's liability exceed INR 5,000 regardless of the nature or basis of the claim.",
      plain:"Even if the client causes you a ₹5 lakh loss, they can only be held liable for ₹5,000. This cap is likely far below the value of your project.",
      counter:"Each party's liability shall be limited to the total fees paid or payable under this agreement in the 3 months preceding the claim, but not less than INR 50,000.",
      financialExposure:"₹5,000 cap vs. actual project value",
    },
    {
      id:5, title:"Payment Terms Internal Contradiction", type:"Consistency",
      riskScore:61, riskLevel:"Medium", agent:"Consistency", negotiable:true, confidence:98,
      original:"Clause 4.2: 'Payment within 30 days of invoice.' Clause 9.7: 'Payment within 60 days of invoice approval.'",
      plain:"Your contract says two different things about when you get paid — 30 days in one place, 60 days in another. The client will use whichever is longer.",
      counter:"All invoices shall be paid within 30 days of submission. Any invoice not disputed in writing within 7 days of receipt shall be deemed approved and immediately payable.",
      financialExposure:"30-day cash flow delay risk",
    },
    {
      id:6, title:"Missing Annexure — Scope & Payment Schedules", type:"Completeness",
      riskScore:55, riskLevel:"Medium", agent:"Completeness", negotiable:false, confidence:100,
      original:"This agreement incorporates Schedule A (Scope of Work) and Schedule B (Payment Milestones), which are attached hereto and form part of this agreement.",
      plain:"This contract refers to 2 schedules that define exactly what you must do and when you get paid — but they are NOT attached. You are agreeing to terms you have never seen.",
      counter:"Do NOT sign. Request Schedule A and Schedule B from the client immediately. These define your obligations and payment structure — they are not optional.",
      financialExposure:"Unknown — schedules unreviewed",
    },
    {
      id:7, title:"Exclusive Delhi Jurisdiction", type:"Dispute Resolution",
      riskScore:38, riskLevel:"Low", agent:"Regulatory Adaptation", negotiable:true, confidence:82,
      original:"All disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.",
      plain:"If there's any dispute, you must file in Delhi courts — even if you live in Mumbai or Bangalore. Travel costs and distance create a practical barrier to getting justice.",
      counter:"Disputes shall first be resolved by arbitration under the Indian Arbitration & Conciliation Act, 1996. If unresolved, courts in [Contractor's city] shall have non-exclusive jurisdiction.",
      financialExposure:"Travel/legal costs in dispute",
    },
  ],
  agentOutputs: {
    completeness: { score:82, status:"Incomplete", missing:["Schedule A — Scope of Work","Schedule B — Payment Milestones"], present:["Main Agreement","Definitions","Signature Page","Governing Law"] },
    risk:         { score:7.8, critical:1, high:3, medium:2, low:1, topRisk:"Unilateral Termination Without Cause" },
    negotiation:  { counterTermsGenerated:6, strategy:"Lead with S.27 ICA voidability of non-compete, then link IP rights to payment receipt. High leverage on termination notice.", mostLeverageClause:"Non-Compete (void under Indian law)" },
    consistency:  { contradictions:2, issues:["Payment terms: Clause 4.2 (30 days) vs Clause 9.7 (60 days)","Termination notice: Clause 6.1 (14 days) vs Clause 11.3 (immediate)"] },
    regulatory:   { complianceScore:68, violations:["Non-compete (Cl.3) likely void under Indian Contract Act S.27","No data protection clause per DPDP Act 2023","Liability cap (Cl.4) may be unconscionable under S.23 ICA"], jurisdiction:"India — Central / Maharashtra" },
    explanation:  { readabilityScore:22, grade:"Extremely Dense", summary:"This contract heavily favours the client. Critical issues: unilateral termination with zero payment protection, immediate IP assignment before payment, and a 2-year non-compete that is almost certainly unenforceable under Indian law. Do not sign without negotiating clauses 1, 2, and 3 at minimum." },
  },
};

// ── DASHBOARD PAGE ────────────────────────────────────────────────
function DashboardPage({ user, onLogout }) {
  const [activeNav,      setActiveNav]      = useState("Home");
  const [uploadPhase,    setUploadPhase]    = useState("idle"); // idle|analyzing|awaiting_docs|done
  const [analysisStep,   setAnalysisStep]   = useState(0);
  const [analysisPct,    setAnalysisPct]    = useState(0);
  const [uploadedFile,   setUploadedFile]   = useState(null);
  const [relatedDocs,    setRelatedDocs]    = useState([]);
  const [analysis,       setAnalysis]       = useState(null);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [activeClause,   setActiveClause]   = useState(null);
  const [reportTab,      setReportTab]      = useState("risks");
  const [filterRisk,     setFilterRisk]     = useState("All");
  const [copiedId,       setCopiedId]       = useState(null);
  const [userDecision,   setUserDecision]   = useState(null); // null|sign|negotiate|lawyer
  const [riskBreakdown,  setRiskBreakdown]  = useState({ high: 1, med: 17, low: 70 });
  const fileRef    = useRef(null);
  const relatedRef = useRef(null);

  const AGENTS = [
    { id:"completeness", name:"Completeness Agent",  color:"#3b82f6", emoji:"📋", desc:"Checks for missing schedules, annexures & referenced docs" },
    { id:"risk",         name:"Risk Scoring Agent",   color:"#ef4444", emoji:"⚠️", desc:"Scores every clause 0–100, flags financial exposure in ₹" },
    { id:"negotiation",  name:"Negotiation Agent",    color:"#C49E6C", emoji:"🤝", desc:"Generates ready-to-send counter-terms for high-risk clauses" },
    { id:"consistency",  name:"Consistency Agent",    color:"#8b5cf6", emoji:"🔍", desc:"Finds internal contradictions across the full document" },
    { id:"regulatory",   name:"Regulatory Agent",     color:"#22c55e", emoji:"⚖️", desc:"Cross-references Indian Contract Act & DPDP Act 2023" },
    { id:"explanation",  name:"Explanation Agent",    color:"#f59e0b", emoji:"💡", desc:"Translates dense legalese into plain Hindi/English" },
  ];

  const STEPS = [
    { label:"Parsing PDF & splitting clauses…",         agent:"",             pct:9  },
    { label:"Completeness Agent — checking documents…", agent:"completeness", pct:22 },
    { label:"Risk Scoring Agent — analyzing clauses…",  agent:"risk",         pct:38 },
    { label:"Negotiation Agent — generating counters…", agent:"negotiation",  pct:54 },
    { label:"Consistency Agent — cross-checking…",      agent:"consistency",  pct:68 },
    { label:"Regulatory Agent — Indian law check…",     agent:"regulatory",   pct:83 },
    { label:"Explanation Agent — plain language…",      agent:"explanation",  pct:95 },
    { label:"Synthesizing final report…",               agent:"",             pct:100 },
  ];

  const CONTRACTS = [
    { name:"MSA_Company_X.pdf",     risk:"High",   score:7.8, time:"Just now",   clauses:7, type:"MSA" },
    { name:"Freelancer_NDA.docx",   risk:"Medium", score:4.9, time:"1 hour ago", clauses:4, type:"NDA" },
    { name:"SBA_India_Company.pdf", risk:"Low",    score:2.1, time:"5 hrs ago",  clauses:3, type:"SBA" },
  ];

  const rc = (r) => r==="Critical"||r==="High" ? "#ef4444" : r==="Medium"||r==="Med" ? "#f59e0b" : "#22c55e";
  const rb = (r) => r==="Critical"||r==="High" ? "rgba(239,68,68,0.09)" : r==="Medium"||r==="Med" ? "rgba(245,158,11,0.09)" : "rgba(34,197,94,0.09)";

  const startAnalysis = (file) => {
    setUploadedFile(file);
    setUploadPhase("analyzing");
    setAnalysisStep(0); setAnalysisPct(0);
    let i = 0;
    const tick = () => {
      if (i < STEPS.length) {
        setAnalysisStep(i);
        setAnalysisPct(STEPS[i].pct);
        i++;
        setTimeout(tick, 850);
      } else {
        const result = { ...MOCK_ANALYSIS, fileName: file?.name || "contract.pdf" };
        // Calculate risk breakdown from clauses
        const clauses = result.clauses || [];
        const high = clauses.filter(c => c.riskLevel === "Critical" || c.riskLevel === "High").length;
        const med = clauses.filter(c => c.riskLevel === "Medium").length;
        const low = clauses.filter(c => c.riskLevel === "Low").length;
        const total = high + med + low || 1;
        setRiskBreakdown({ 
          high: Math.round((high / total) * 100),
          med: Math.round((med / total) * 100),
          low: Math.round((low / total) * 100)
        });
        setTimeout(() => { setAnalysis(result); setUploadPhase("awaiting_docs"); }, 500);
      }
    };
    tick();
  };

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target?.files?.[0];
    if (file) startAnalysis(file);
  };

  const copy = (text, id) => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCopiedId(id); setTimeout(()=>setCopiedId(null), 2000);
  };

  const filtered = analysis ? analysis.clauses.filter(c =>
    filterRisk==="All" || c.riskLevel===filterRisk || (filterRisk==="High" && c.riskLevel==="Critical")
  ) : [];

  const NAV = [
    { k:"Home",      ic:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { k:"Contracts", ic:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { k:"Agents",    ic:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
    { k:"Reports",   ic:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  ];

  return (
    <div style={{ fontFamily:"DM Sans,sans-serif", background:"#070809", color:"#FFF", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:#070809;} ::-webkit-scrollbar-thumb{background:#1E2228;border-radius:2px;}
        .snav{display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:9px;cursor:pointer;font-size:13px;color:#555;transition:all 0.16s;border-left:2px solid transparent;user-select:none;}
        .snav:hover{color:#CCC;background:rgba(255,255,255,0.025);}
        .snav.on{color:#FFF;background:rgba(196,158,108,0.1);border-left-color:#C49E6C;}
        .cr{padding:13px 15px;border-radius:11px;cursor:pointer;transition:all 0.17s;border:1px solid #131518;background:#0A0B0E;}
        .cr:hover{border-color:#252830;background:#0D0F13;}
        .cr.sel{border-color:rgba(196,158,108,0.3);background:rgba(196,158,108,0.035);}
        .tbtn{padding:6px 14px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500;transition:all 0.17s;}
        .tbtn.on{background:rgba(196,158,108,0.14);color:#C49E6C;border:1px solid rgba(196,158,108,0.28);}
        .tbtn.off{background:transparent;color:#444;border:1px solid transparent;}
        .tbtn.off:hover{color:#999;background:rgba(255,255,255,0.025);}
        .gbtn{background:linear-gradient(135deg,#C49E6C,#F5D08A);color:#000;border:none;border-radius:9px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .gbtn:hover{box-shadow:0 0 28px rgba(196,158,108,0.4);transform:translateY(-1px);}
        .qbtn{background:transparent;border:1px solid #1E2228;border-radius:9px;padding:9px 16px;font-size:12px;color:#777;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.17s;}
        .qbtn:hover{border-color:#333;color:#CCC;}
        .cpbtn{background:rgba(196,158,108,0.07);border:1px solid rgba(196,158,108,0.18);border-radius:6px;padding:4px 10px;font-size:11px;color:#C49E6C;cursor:pointer;font-family:'IBM Plex Mono',monospace;transition:all 0.17s;white-space:nowrap;}
        .cpbtn:hover{background:rgba(196,158,108,0.14);}
        .pll{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:10px;font-family:'IBM Plex Mono',monospace;letter-spacing:0.03em;white-space:nowrap;}
        .uzone{border:2px dashed #1A1D22;border-radius:16px;padding:44px 32px;text-align:center;cursor:pointer;transition:all 0.24s;background:rgba(196,158,108,0.008);}
        .uzone:hover,.uzone.drag{border-color:rgba(196,158,108,0.45);background:rgba(196,158,108,0.025);}
        .acard{background:#0D0F13;border:1px solid #1A1D22;border-radius:12px;padding:16px;transition:all 0.2s;}
        .acard:hover{border-color:#252830;transform:translateY(-2px);}
        .stat{background:#0D0F13;border:1px solid #1A1D22;border-radius:13px;padding:18px;transition:all 0.2s;}
        .stat:hover{border-color:rgba(196,158,108,0.2);}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeslide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulsering{0%,100%{opacity:0.6}50%{opacity:1}}
        .shimmer{background:linear-gradient(90deg,#131518 25%,#1E2228 50%,#131518 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .dec-btn{border:none;border-radius:11px;padding:14px 20px;cursor:pointer;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:130px;}
        .dec-btn:hover{transform:translateY(-2px);}
      `}</style>

      {/* ── TOPNAV ─────────────────────────────────────────────────── */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(7,8,9,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid #0F1115",padding:"0 22px",height:56,display:"flex",alignItems:"center",gap:18,flexShrink:0 }}>
        <KarrarLogo size={26} wordmark={true}/>
        <div style={{ flex:1,display:"flex",gap:1 }}>
          {NAV.map(({k,ic})=>(
            <button key={k} onClick={()=>setActiveNav(k)} style={{ background:"none",border:"none",color:activeNav===k?"#C49E6C":"#555",fontSize:13,fontWeight:activeNav===k?600:400,padding:"4px 12px",cursor:"pointer",borderBottom:activeNav===k?"2px solid #C49E6C":"2px solid transparent",transition:"all 0.17s",fontFamily:"DM Sans,sans-serif",display:"flex",alignItems:"center",gap:6,height:56 }}>
              <span style={{ opacity:activeNav===k?1:0.4 }}>{ic}</span>{k}
            </button>
          ))}
        </div>
        <div style={{ position:"relative" }}>
          <svg style={{ position:"absolute",left:9,top:"50%",transform:"translateY(-50%)" }} width="12" height="12" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search contracts…" style={{ background:"#0D0F13",border:"1px solid #131518",borderRadius:8,padding:"6px 12px 6px 28px",color:"#777",fontSize:12,fontFamily:"DM Sans,sans-serif",outline:"none",width:164 }}/>
        </div>
        <div style={{ position:"relative" }}>
          <button onClick={()=>setNotifOpen(!notifOpen)} style={{ background:"none",border:"none",cursor:"pointer",color:notifOpen?"#C49E6C":"#444",padding:5,position:"relative",transition:"color 0.17s" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span style={{ position:"absolute",top:1,right:1,width:12,height:12,background:"#ef4444",borderRadius:"50%",fontSize:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700 }}>3</span>
          </button>
          <AnimatePresence>
          {notifOpen && (
            <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}} style={{ position:"absolute",right:0,top:38,width:268,background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:12,padding:14,zIndex:300 }}>
              <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.1em",marginBottom:10 }}>NOTIFICATIONS</div>
              {[{t:"MSA_Company_X: 1 critical risk detected",s:"13m ago",d:"#ef4444"},{t:"New contract uploaded",s:"1h ago",d:"#f59e0b"},{t:"Freelancer NDA analysis ready",s:"1h ago",d:"#22c55e"}].map((n,i)=>(
                <div key={i} style={{ display:"flex",gap:9,padding:"8px 0",borderBottom:i<2?"1px solid #0F1115":"none" }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:n.d,marginTop:5,flexShrink:0 }}/>
                  <div><div style={{ fontSize:12,color:"#CCC" }}>{n.t}</div><div style={{ fontSize:10,color:"#333",marginTop:1 }}>{n.s}</div></div>
                </div>
              ))}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }} onClick={onLogout} title="Click to logout">
          <div style={{ width:29,height:29,borderRadius:"50%",background:"linear-gradient(135deg,#C49E6C,#F5D08A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#000" }}>{user.initials}</div>
          <span style={{ fontSize:12,color:"#BBB",fontWeight:500 }}>{user.name}</span>
        </div>
      </nav>

      <div style={{ display:"flex",flex:1,overflow:"hidden",height:"calc(100vh - 56px)" }}>

        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <aside style={{ width:188,background:"#060708",borderRight:"1px solid #0F1115",padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,flexShrink:0,overflowY:"auto" }}>
          {NAV.map(({k,ic})=>(
            <div key={k} className={`snav${activeNav===k?" on":""}`} onClick={()=>setActiveNav(k)}>
              <span style={{ opacity:activeNav===k?1:0.35 }}>{ic}</span>{k}
            </div>
          ))}
          <div style={{ height:1,background:"#0F1115",margin:"14px 0" }}/>
          <div style={{ fontSize:9,color:"#222",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.12em",paddingLeft:14,marginBottom:7 }}>FAVORITES</div>
          {["NDA_Startup.d…","Rental Agreement","SBA_India_Comp…"].map((f,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:7,padding:"6px 14px",cursor:"pointer",fontSize:12,color:"#333",borderRadius:7,transition:"color 0.17s" }} onMouseEnter={e=>e.currentTarget.style.color="#AAA"} onMouseLeave={e=>e.currentTarget.style.color="#333"}>
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>{f}
            </div>
          ))}
          <div style={{ height:1,background:"#0F1115",margin:"14px 0" }}/>
          <div style={{ fontSize:9,color:"#222",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.12em",paddingLeft:14,marginBottom:7 }}>TOP ENTITIES</div>
          {[{l:"Indian Ministries",c:"#ef4444"},{l:"Freelancer Y",c:"#3b82f6"}].map((e,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 14px",cursor:"pointer",fontSize:12,color:"#333",borderRadius:7,transition:"color 0.17s" }} onMouseEnter={ev=>ev.currentTarget.style.color="#AAA"} onMouseLeave={ev=>ev.currentTarget.style.color="#333"}>
              <div style={{ width:15,height:15,borderRadius:4,background:e.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700,color:"#fff",flexShrink:0 }}>IN</div>{e.l}
            </div>
          ))}
        </aside>

        {/* ── MAIN ────────────────────────────────────────────────── */}
        <main style={{ flex:1,overflowY:"auto",padding:"24px 26px" }}>
          <AnimatePresence mode="wait">

          {/* ═══ HOME ══════════════════════════════════════════════ */}
          {activeNav==="Home" && (
            <motion.div key="home" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.38}}>
              <div style={{ marginBottom:22 }}>
                <h1 style={{ fontFamily:"Playfair Display,serif",fontSize:32,fontWeight:900,marginBottom:3,color:"#FFF",letterSpacing:"-0.02em" }}>Dashboard</h1>
                <p style={{ fontSize:14,color:"#AAA",fontWeight:500 }}>Audit, analyze, and negotiate your contracts effortlessly — powered by 6 AI agents.</p>
              </div>

              {/* Stats */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18 }}>
                {[
                  {v:"3,468",l:"Total Contracts",c:"#C49E6C",icon:<svg width="16" height="16" fill="none" stroke="#C49E6C" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>},
                  {v:"312",  l:"High Risks",      c:"#ef4444",icon:<svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>},
                  {v:"94%", l:"Flagged Terms",    c:"#f59e0b",icon:<svg width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>},
                ].map(({v,l,c,icon},i)=>(
                  <motion.div key={i} className="stat" whileHover={{scale:1.02}}>
                    <div style={{ width:32,height:32,borderRadius:9,background:`${c}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10 }}>{icon}</div>
                    <div style={{ fontSize:28,fontWeight:900,color:c,fontFamily:"Playfair Display,serif",letterSpacing:"-0.02em" }}>{v}</div>
                    <div style={{ fontSize:12,color:"#AAA",marginTop:3,fontWeight:600 }}>{l}</div>
                  </motion.div>
                ))}
              </div>

              {/* Alert */}
              <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.1}} style={{ background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.16)",borderRadius:10,padding:"11px 15px",marginBottom:16,display:"flex",alignItems:"center",gap:11 }}>
                <svg width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <div style={{ flex:1,fontSize:14 }}><span style={{ color:"#f59e0b",fontWeight:700 }}>Alert: </span><span style={{ color:"#F5D08A",fontWeight:700 }}>MSA_Company_X.pdf </span><span style={{ color:"#999",fontWeight:500 }}>has 1 critical risk &amp; 3 high risk clauses</span></div>
                <button className="qbtn" style={{ fontSize:11,padding:"4px 11px" }} onClick={()=>{setActiveNav("Reports");}}>View Report →</button>
              </motion.div>

              {/* ── UPLOAD PHASE: idle ── */}
              {uploadPhase==="idle" && (
                <div className="uzone" onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("drag");}} onDragLeave={e=>e.currentTarget.classList.remove("drag")} onDrop={handleFile} onClick={()=>fileRef.current?.click()}>
                  <input ref={fileRef} type="file" style={{display:"none"}} accept=".pdf,.doc,.docx" onChange={handleFile}/>
                  <motion.div animate={{y:[0,-7,0]}} transition={{duration:2.6,repeat:Infinity,ease:"easeInOut"}} style={{ marginBottom:13 }}>
                    <svg width="40" height="40" fill="none" stroke="rgba(196,158,108,0.4)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display:"block",margin:"0 auto" }}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/>
                    </svg>
                  </motion.div>
                  <div style={{ fontSize:16,fontWeight:800,color:"#FFF",marginBottom:5 }}>Upload Contract — Start AI Analysis</div>
                  <div style={{ fontSize:12,color:"#666",marginBottom:17,fontWeight:500 }}>Drag &amp; drop or click · PDF / DOCX · ~90 second analysis by 6 specialized agents</div>
                  <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:16 }}>
                    {["Completeness","Risk Scoring","Negotiation","Consistency","Regulatory","Explanation"].map(a=>(
                      <span key={a} className="pll" style={{ background:"rgba(196,158,108,0.07)",border:"1px solid rgba(196,158,108,0.15)",color:"#888" }}>{a}</span>
                    ))}
                  </div>
                  <motion.button whileHover={{scale:1.04,boxShadow:"0 0 24px rgba(196,158,108,0.35)"}} whileTap={{scale:0.97}} className="gbtn" onClick={e=>{e.stopPropagation();fileRef.current?.click();}}>
                    Choose Contract File
                  </motion.button>
                </div>
              )}

              {/* ── UPLOAD PHASE: analyzing ── */}
              {uploadPhase==="analyzing" && (
                <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:15,padding:"24px 22px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:13,marginBottom:16 }}>
                    <div style={{ animation:"spin 1.2s linear infinite",flexShrink:0 }}>
                      <svg width="24" height="24" fill="none" stroke="#C49E6C" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14,fontWeight:600 }}>Analyzing <span style={{ color:"#C49E6C" }}>{uploadedFile?.name||"contract.pdf"}</span></div>
                      <div style={{ fontSize:11,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",marginTop:2 }}>{STEPS[Math.min(analysisStep,STEPS.length-1)].label}</div>
                    </div>
                    <div style={{ fontSize:22,fontWeight:700,color:"#C49E6C",fontFamily:"Playfair Display,serif" }}>{analysisPct}%</div>
                  </div>
                  <div style={{ background:"#131518",borderRadius:6,height:5,overflow:"hidden",marginBottom:18 }}>
                    <motion.div animate={{width:`${analysisPct}%`}} transition={{duration:0.75,ease:"easeOut"}} style={{ height:"100%",background:"linear-gradient(90deg,#C49E6C,#F5D08A)",borderRadius:6 }}/>
                  </div>
                  {/* Agent status grid */}
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9 }}>
                    {AGENTS.map(({id,name,color,emoji})=>{
                      const si = STEPS.findIndex(s=>s.agent===id);
                      const done   = si > 0 && analysisStep > si;
                      const active = si > 0 && analysisStep === si;
                      return (
                        <motion.div key={id} animate={{opacity:done||active?1:0.25}} style={{ background:"#0A0B0E",border:`1px solid ${done?"#"+color.slice(1)+"44":active?color+"55":"#131518"}`,borderRadius:9,padding:"9px 11px",display:"flex",alignItems:"center",gap:8,transition:"border-color 0.3s" }}>
                          <span style={{ fontSize:15 }}>{emoji}</span>
                          <span style={{ fontSize:11,color:done||active?color:"#333",fontWeight:done||active?600:400,transition:"color 0.3s" }}>{name.replace(" Agent","")}</span>
                          {done   && <svg style={{ marginLeft:"auto",flexShrink:0 }} width="10" height="10" fill="none" stroke={color} strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                          {active && <div style={{ marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:color,animation:"spin 1s linear infinite",flexShrink:0 }}/>}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── UPLOAD PHASE: awaiting_docs ── */}
              {uploadPhase==="awaiting_docs" && analysis && (
                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} style={{ background:"#0D0F13",border:"1px solid rgba(196,158,108,0.2)",borderRadius:15,padding:"22px" }}>
                  <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:16 }}>
                    <div style={{ width:32,height:32,borderRadius:9,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.18)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <svg width="15" height="15" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:800,marginBottom:3,color:"#FFF" }}>All 6 agents completed — <span style={{ color:"#C49E6C" }}>{analysis.fileName}</span></div>
                      <div style={{ fontSize:12,color:"#777",fontWeight:500 }}>Upload related documents (annexures, SLAs, prior versions) to improve accuracy, or proceed to your report now.</div>
                      {/* Real-time Risk Breakdown */}
                      <div style={{ display:"flex",gap:12,marginTop:10,paddingTop:10,borderTop:"1px solid #1A1D22" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:11,fontWeight:700,color:"#C49E6C",marginBottom:4 }}>RISK BREAKDOWN</div>
                          <div style={{ display:"flex",gap:8 }}>
                            <div style={{ textAlign:"center" }}>
                              <div style={{ fontSize:18,fontWeight:900,color:"#ef4444" }}>{riskBreakdown.high}%</div>
                              <div style={{ fontSize:10,fontWeight:700,color:"#ef4444",marginTop:2 }}>High</div>
                            </div>
                            <div style={{ textAlign:"center" }}>
                              <div style={{ fontSize:18,fontWeight:900,color:"#f59e0b" }}>{riskBreakdown.med}%</div>
                              <div style={{ fontSize:10,fontWeight:700,color:"#f59e0b",marginTop:2 }}>Med</div>
                            </div>
                            <div style={{ textAlign:"center" }}>
                              <div style={{ fontSize:18,fontWeight:900,color:"#22c55e" }}>{riskBreakdown.low}%</div>
                              <div style={{ fontSize:10,fontWeight:700,color:"#22c55e",marginTop:2 }}>Low</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Quick risk mini */}
                  <div style={{ display:"flex",gap:8,marginBottom:16,flexWrap:"wrap" }}>
                    {[{l:"Risk Score",v:analysis.overallScore,c:"#ef4444"},{l:"Critical",v:1,c:"#ef4444"},{l:"High",v:3,c:"#f59e0b"},{l:"Medium",v:2,c:"#f59e0b"},{l:"Low",v:1,c:"#22c55e"}].map(({l,v,c})=>(
                      <div key={l} style={{ flex:1,minWidth:70,background:"#0A0B0E",border:`1px solid ${c}18`,borderRadius:9,padding:"10px",textAlign:"center" }}>
                        <div style={{ fontSize:17,fontWeight:700,color:c,fontFamily:"Playfair Display,serif" }}>{v}</div>
                        <div style={{ fontSize:10,color:"#333",marginTop:1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Related docs */}
                  <div style={{ border:"1px dashed rgba(196,158,108,0.15)",borderRadius:11,padding:"12px 15px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",marginBottom:12,transition:"all 0.2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,158,108,0.38)";e.currentTarget.style.background="rgba(196,158,108,0.02)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,158,108,0.15)";e.currentTarget.style.background="transparent";}}
                    onClick={()=>relatedRef.current?.click()}>
                    <input ref={relatedRef} type="file" multiple style={{display:"none"}} onChange={e=>{setRelatedDocs(p=>[...p,...Array.from(e.target.files).map(f=>f.name)]);}}/>
                    <svg width="18" height="18" fill="none" stroke="rgba(196,158,108,0.45)" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                    <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:600,color:"#CCC" }}>Upload Related Documents</div><div style={{ fontSize:11,color:"#333",marginTop:1 }}>Annexures, SLAs, prior versions, exhibits…</div></div>
                    <div style={{ background:"rgba(196,158,108,0.07)",border:"1px solid rgba(196,158,108,0.18)",borderRadius:6,padding:"4px 11px",fontSize:11,color:"#C49E6C" }}>Browse</div>
                  </div>
                  {relatedDocs.length>0 && (
                    <div style={{ display:"flex",flexWrap:"wrap",gap:7,marginBottom:12 }}>
                      {relatedDocs.map((d,i)=>(
                        <div key={i} style={{ display:"flex",alignItems:"center",gap:5,background:"rgba(34,197,94,0.07)",border:"1px solid rgba(34,197,94,0.16)",borderRadius:6,padding:"3px 9px",fontSize:11,color:"#22c55e" }}>
                          <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>{d}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display:"flex",gap:9 }}>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} className="gbtn" style={{ flex:1,fontSize:14,padding:"12px" }} onClick={()=>{setUploadPhase("done");setActiveNav("Reports");}}>
                      {relatedDocs.length>0?`Re-analyze with ${relatedDocs.length} related doc${relatedDocs.length>1?"s":""}  →`:"View Full Report →"}
                    </motion.button>
                    <button className="qbtn" onClick={()=>{setUploadPhase("idle");setUploadedFile(null);setRelatedDocs([]);}}>Reset</button>
                  </div>
                </motion.div>
              )}

              {/* ── UPLOAD PHASE: done (compact banner) ── */}
              {uploadPhase==="done" && analysis && (
                <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} style={{ background:"#0D0F13",border:"1px solid rgba(34,197,94,0.16)",borderRadius:12,padding:"15px 18px",display:"flex",alignItems:"center",gap:13 }}>
                  <div style={{ width:32,height:32,borderRadius:9,background:"rgba(34,197,94,0.09)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <svg width="15" height="15" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:600 }}>Full report ready — <span style={{ color:"#C49E6C" }}>{analysis.fileName}</span></div><div style={{ fontSize:11,color:"#444",marginTop:1 }}>6 agents · {analysis.clauses.length} clauses · Risk Score {analysis.overallScore}/10</div></div>
                  <motion.button whileHover={{scale:1.03}} className="gbtn" style={{ fontSize:12,padding:"8px 16px" }} onClick={()=>setActiveNav("Reports")}>Open Report</motion.button>
                  <button onClick={()=>{setUploadPhase("idle");setUploadedFile(null);setRelatedDocs([]);}} style={{ background:"none",border:"none",color:"#333",cursor:"pointer",padding:3 }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                </motion.div>
              )}

              {/* Recent Contracts */}
              <div style={{ marginTop:20 }}>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11 }}>
                  <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.1em" }}>RECENT CONTRACTS</div>
                  <button className="qbtn" style={{ padding:"3px 10px",fontSize:11 }} onClick={()=>setActiveNav("Contracts")}>View all →</button>
                </div>
                <div style={{ background:"#0A0B0E",border:"1px solid #0F1115",borderRadius:12 }}>
                  {CONTRACTS.map((c,i)=>(
                    <motion.div key={i} whileHover={{backgroundColor:"rgba(255,255,255,0.018)"}} style={{ display:"flex",alignItems:"center",gap:11,padding:"11px 13px",borderBottom:i<CONTRACTS.length-1?"1px solid #0F1115":"none",cursor:"pointer",borderRadius:i===0?"12px 12px 0 0":i===CONTRACTS.length-1?"0 0 12px 12px":"0" }} onClick={()=>setActiveNav("Reports")}>
                      <div style={{ width:31,height:31,borderRadius:8,background:"#131518",border:"1px solid #1A1D22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <svg width="12" height="12" fill="none" stroke="#C49E6C" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:500,color:"#CCC" }}>{c.name}</div><div style={{ fontSize:10,color:"#333",marginTop:1 }}>{c.type} · {c.clauses} clauses · {c.time}</div></div>
                      <span className="pll" style={{ background:rb(c.risk),border:`1px solid ${rc(c.risk)}22`,color:rc(c.risk) }}>{c.risk}</span>
                      <span style={{ fontSize:13,fontWeight:700,color:rc(c.risk),minWidth:24 }}>{c.score}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ CONTRACTS ════════════════════════════════════════ */}
          {activeNav==="Contracts" && (
            <motion.div key="contracts" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.38}}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
                <div><h1 style={{ fontFamily:"Playfair Display,serif",fontSize:26,fontWeight:700,marginBottom:2 }}>Contracts</h1><p style={{ fontSize:13,color:"#444" }}>All uploaded and analyzed contracts.</p></div>
                <motion.button whileHover={{scale:1.03}} className="gbtn" onClick={()=>{setActiveNav("Home");setUploadPhase("idle");}}>+ Upload New</motion.button>
              </div>
              <div style={{ background:"#0A0B0E",border:"1px solid #0F1115",borderRadius:13 }}>
                {[...CONTRACTS, ...(analysis?[{name:analysis.fileName,risk:"High",score:analysis.overallScore,time:"Just now",clauses:analysis.clauses.length,type:"MSA"}]:[])].map((c,i,arr)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 15px",borderBottom:i<arr.length-1?"1px solid #0F1115":"none",cursor:"pointer" }} onClick={()=>setActiveNav("Reports")}>
                    <div style={{ width:36,height:36,borderRadius:10,background:"#131518",border:"1px solid #1A1D22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <svg width="14" height="14" fill="none" stroke="#C49E6C" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13,fontWeight:600,color:"#DDD" }}>{c.name}</div>
                      <div style={{ fontSize:11,color:"#333",marginTop:2 }}>{c.type} · {c.clauses} clauses · {c.time}</div>
                    </div>
                    <span className="pll" style={{ background:rb(c.risk),border:`1px solid ${rc(c.risk)}22`,color:rc(c.risk) }}>{c.risk} Risk</span>
                    <div style={{ textAlign:"center",minWidth:36 }}>
                      <div style={{ fontSize:17,fontWeight:700,color:rc(c.risk),fontFamily:"Playfair Display,serif" }}>{c.score}</div>
                      <div style={{ fontSize:9,color:"#333" }}>/ 10</div>
                    </div>
                    <button className="qbtn" style={{ fontSize:11,padding:"5px 11px" }} onClick={e=>{e.stopPropagation();setActiveNav("Reports");}}>View →</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ AGENTS ════════════════════════════════════════════ */}
          {activeNav==="Agents" && (
            <motion.div key="agents" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.38}}>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ fontFamily:"Playfair Display,serif",fontSize:26,fontWeight:700,marginBottom:2 }}>AI Agents</h1>
                <p style={{ fontSize:13,color:"#444" }}>6 specialized agents running in parallel — each an expert in one legal domain.</p>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20 }}>
                {AGENTS.map(({id,name,color,emoji,desc})=>{
                  const out = analysis?.agentOutputs?.[id];
                  return (
                    <div key={id} className="acard">
                      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:out?12:0 }}>
                        <div style={{ width:34,height:34,borderRadius:9,background:`${color}12`,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0 }}>{emoji}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13,fontWeight:600,color:"#DDD" }}>{name}</div>
                          <div style={{ fontSize:11,color:"#333",marginTop:1 }}>{desc}</div>
                        </div>
                        <span className="pll" style={{ background:`${color}10`,border:`1px solid ${color}25`,color,fontSize:9 }}>{analysis?"Active":"Standby"}</span>
                      </div>
                      {out ? (
                        <div style={{ background:"#0A0B0E",borderRadius:9,padding:"9px 12px",fontSize:12,color:"#666" }}>
                          {id==="completeness" && <><span style={{ color:"#3b82f6",fontWeight:600 }}>Score: {out.score}%</span> · {out.status} · Missing: {out.missing.length} document{out.missing.length!==1?"s":""}</>}
                          {id==="risk"         && <><span style={{ color:"#ef4444",fontWeight:600 }}>Risk: {out.score}/10</span> · Critical: {out.critical} · High: {out.high} · Medium: {out.medium} · Low: {out.low}</>}
                          {id==="negotiation"  && <><span style={{ color:"#C49E6C",fontWeight:600 }}>{out.counterTermsGenerated} counter-terms</span> generated · Leverage: {out.mostLeverageClause}</>}
                          {id==="consistency"  && <><span style={{ color:"#8b5cf6",fontWeight:600 }}>{out.contradictions} contradiction{out.contradictions!==1?"s":""}</span> · {out.issues.join(" · ")}</>}
                          {id==="regulatory"   && <><span style={{ color:"#22c55e",fontWeight:600 }}>Compliance: {out.complianceScore}%</span> · {out.violations.length} violation{out.violations.length!==1?"s":""} · {out.jurisdiction}</>}
                          {id==="explanation"  && <><span style={{ color:"#f59e0b",fontWeight:600 }}>Readability: {out.readabilityScore}/100</span> · Grade: {out.grade}</>}
                        </div>
                      ) : (
                        <div className="shimmer" style={{ height:32,borderRadius:9,marginTop:10 }}/>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Architecture flow */}
              <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"18px 20px" }}>
                <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.1em",marginBottom:14 }}>ORCHESTRATION ARCHITECTURE</div>
                <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:14 }}>
                  {[{n:"Upload PDF",c:"#3b82f6"},{n:"Parse & Split",c:"#8b5cf6"},{n:"Orchestrator",c:"#C49E6C"},{n:"6 Agents ⚡ Parallel",c:"#C49E6C"},{n:"Synthesize",c:"#22c55e"},{n:"Unified Report",c:"#22c55e"}].map((s,i,arr)=>(
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <div style={{ background:`${s.c}10`,border:`1px solid ${s.c}28`,borderRadius:8,padding:"7px 13px",fontSize:12,color:s.c,fontWeight:500 }}>{s.n}</div>
                      {i<arr.length-1 && <span style={{ color:"#222",fontSize:14 }}>→</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:12,color:"#333",lineHeight:1.8 }}>
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>LLM Layer:</span> Gemini 1.5 Pro / GPT-4o&nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>Orchestration:</span> LangGraph / CrewAI&nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>Legal KB:</span> RAG + FAISS (Indian law)&nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>PDF:</span> PyMuPDF&nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>Backend:</span> FastAPI&nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style={{ color:"#C49E6C",fontWeight:600 }}>DB:</span> PostgreSQL
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ REPORTS ═══════════════════════════════════════════ */}
          {activeNav==="Reports" && (
            <motion.div key="reports" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.38}}>
              {!analysis ? (
                <div style={{ textAlign:"center",padding:"60px 24px" }}>
                  <div style={{ fontSize:44,marginBottom:14 }}>📄</div>
                  <div style={{ fontSize:16,fontWeight:600,color:"#CCC",marginBottom:7 }}>No report yet</div>
                  <div style={{ fontSize:13,color:"#444",marginBottom:18 }}>Upload a contract on the Home tab to generate your AI analysis report.</div>
                  <motion.button whileHover={{scale:1.03}} className="gbtn" onClick={()=>setActiveNav("Home")}>Upload a Contract →</motion.button>
                </div>
              ) : (
                <div>
                  {/* Report header */}
                  <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20 }}>
                    <div>
                      <h1 style={{ fontFamily:"Playfair Display,serif",fontSize:24,fontWeight:700,marginBottom:3 }}>Contract Intelligence Report</h1>
                      <div style={{ fontSize:12,color:"#444",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
                        <span style={{ color:"#C49E6C",fontWeight:500 }}>{analysis.fileName}</span>
                        <span>·</span><span>6 agents</span><span>·</span><span>{analysis.clauses.length} clauses</span><span>·</span>
                        <span style={{ fontFamily:"IBM Plex Mono,monospace",fontSize:11 }}>India — Central</span>
                      </div>
                    </div>
                    <div style={{ display:"flex",gap:8 }}>
                      <button className="qbtn" style={{ fontSize:11,padding:"6px 13px" }}>⬇ Export PDF</button>
                      <motion.button whileHover={{scale:1.03}} className="gbtn" style={{ fontSize:11,padding:"6px 14px" }}>📋 Copy Report</motion.button>
                    </div>
                  </div>

                  {/* Score + Summary row */}
                  <div style={{ display:"grid",gridTemplateColumns:"188px 1fr",gap:14,marginBottom:18 }}>
                    <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"18px",textAlign:"center" }}>
                      <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.08em",marginBottom:12 }}>OVERALL RISK</div>
                      <div style={{ position:"relative",width:82,height:82,margin:"0 auto 12px" }}>
                        <svg width="82" height="82" viewBox="0 0 82 82">
                          <circle cx="41" cy="41" r="32" fill="none" stroke="#131518" strokeWidth="9"/>
                          <circle cx="41" cy="41" r="32" fill="none" stroke="#ef4444" strokeWidth="9"
                            strokeDasharray={`${(analysis.overallScore/10)*2*Math.PI*32} ${2*Math.PI*32}`}
                            strokeDashoffset={2*Math.PI*32*0.25}
                            transform="rotate(-90 41 41)" strokeLinecap="round"/>
                        </svg>
                        <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                          <div style={{ fontSize:18,fontWeight:700,color:"#ef4444",fontFamily:"Playfair Display,serif",lineHeight:1 }}>{analysis.overallScore}</div>
                          <div style={{ fontSize:8,color:"#444" }}>/ 10</div>
                        </div>
                      </div>
                      <span className="pll" style={{ background:"rgba(239,68,68,0.09)",border:"1px solid rgba(239,68,68,0.22)",color:"#ef4444" }}>HIGH RISK</span>
                    </div>
                    <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"18px" }}>
                      <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.08em",marginBottom:9 }}>EXPLANATION AGENT SUMMARY</div>
                      <div style={{ fontSize:13,color:"#AAA",lineHeight:1.75,marginBottom:13 }}>{analysis.agentOutputs.explanation.summary}</div>
                      <div style={{ display:"flex",gap:9,flexWrap:"wrap" }}>
                        {[{l:"Critical",v:analysis.agentOutputs.risk.critical,c:"#ef4444"},{l:"High",v:analysis.agentOutputs.risk.high,c:"#f59e0b"},{l:"Medium",v:analysis.agentOutputs.risk.medium,c:"#f59e0b"},{l:"Low",v:analysis.agentOutputs.risk.low,c:"#22c55e"}].map(({l,v,c})=>(
                          <div key={l} style={{ background:`${c}09`,border:`1px solid ${c}18`,borderRadius:8,padding:"8px 13px",textAlign:"center" }}>
                            <div style={{ fontSize:16,fontWeight:700,color:c,fontFamily:"Playfair Display,serif" }}>{v}</div>
                            <div style={{ fontSize:9,color:"#444" }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div style={{ display:"flex",gap:7,marginBottom:14,alignItems:"center",flexWrap:"wrap" }}>
                    {[{k:"risks",l:"⚠️ Risks & Flags"},{k:"counter",l:"🤝 Counter-Terms"},{k:"plain",l:"💡 Plain Language"},{k:"regulatory",l:"⚖️ Regulatory"},{k:"consistency",l:"🔍 Consistency"},{k:"decision",l:"✅ User Decision"}].map(({k,l})=>(
                      <button key={k} className={`tbtn ${reportTab===k?"on":"off"}`} onClick={()=>setReportTab(k)}>{l}</button>
                    ))}
                    {(reportTab==="risks"||reportTab==="plain"||reportTab==="counter") && (
                      <div style={{ marginLeft:"auto",display:"flex",gap:5 }}>
                        {["All","Critical","High","Medium","Low"].map(r=>(
                          <button key={r} onClick={()=>setFilterRisk(r)} style={{ background:filterRisk===r?"rgba(196,158,108,0.1)":"transparent",border:`1px solid ${filterRisk===r?"rgba(196,158,108,0.28)":"#131518"}`,borderRadius:6,padding:"3px 9px",fontSize:10,color:filterRisk===r?"#C49E6C":"#333",cursor:"pointer",transition:"all 0.17s",fontFamily:"DM Sans,sans-serif" }}>{r}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── RISKS TAB ── */}
                  {reportTab==="risks" && (
                    <div style={{ display:"grid",gridTemplateColumns:activeClause?"1fr 360px":"1fr",gap:12 }}>
                      <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
                        {filtered.map(c=>(
                          <motion.div key={c.id} layout className={`cr${activeClause?.id===c.id?" sel":""}`} onClick={()=>setActiveClause(activeClause?.id===c.id?null:c)}>
                            <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                              <div style={{ width:38,height:38,borderRadius:9,background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:700,color:rc(c.riskLevel),fontFamily:"Playfair Display,serif" }}>{c.riskScore}</div>
                              <div style={{ flex:1 }}>
                                <div style={{ display:"flex",gap:7,alignItems:"center",marginBottom:4,flexWrap:"wrap" }}>
                                  <span style={{ fontSize:13,fontWeight:600,color:"#DDD" }}>{c.title}</span>
                                  <span className="pll" style={{ background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,color:rc(c.riskLevel) }}>{c.riskLevel}</span>
                                  <span className="pll" style={{ background:"rgba(196,158,108,0.07)",border:"1px solid rgba(196,158,108,0.14)",color:"#888" }}>{c.agent}</span>
                                  {c.negotiable && <span className="pll" style={{ background:"rgba(34,197,94,0.07)",border:"1px solid rgba(34,197,94,0.16)",color:"#22c55e" }}>Negotiable</span>}
                                </div>
                                <div style={{ fontSize:12,color:"#555",lineHeight:1.55 }}>{c.plain}</div>
                                {c.financialExposure && <div style={{ marginTop:6,fontSize:11,color:"#f59e0b",fontFamily:"IBM Plex Mono,monospace" }}>💰 {c.financialExposure}</div>}
                                {c.regulatoryNote    && <div style={{ marginTop:6,fontSize:11,color:"#22c55e",background:"rgba(34,197,94,0.05)",borderRadius:6,padding:"5px 8px" }}>{c.regulatoryNote}</div>}
                              </div>
                              <div style={{ fontSize:10,color:"#222",fontFamily:"IBM Plex Mono,monospace",flexShrink:0 }}>{c.confidence}%</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {/* Clause detail panel */}
                      <AnimatePresence>
                      {activeClause && (
                        <motion.div initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:18}} style={{ background:"#0D0F13",border:"1px solid rgba(196,158,108,0.18)",borderRadius:13,padding:"18px",alignSelf:"flex-start",position:"sticky",top:0 }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13 }}>
                            <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.08em" }}>CLAUSE DETAIL</div>
                            <button onClick={()=>setActiveClause(null)} style={{ background:"none",border:"none",color:"#333",cursor:"pointer",padding:2 }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                          </div>
                          <div style={{ fontSize:13,fontWeight:600,color:"#FFF",marginBottom:11 }}>{activeClause.title}</div>
                          <div style={{ fontSize:9,color:"#333",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>ORIGINAL CLAUSE</div>
                          <div style={{ fontSize:11,color:"#555",background:"#0A0B0E",borderRadius:8,padding:"9px",lineHeight:1.6,marginBottom:13,fontStyle:"italic",border:"1px solid #131518" }}>"{activeClause.original}"</div>
                          <div style={{ fontSize:9,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>PLAIN ENGLISH</div>
                          <div style={{ fontSize:12,color:"#AAA",background:"rgba(196,158,108,0.03)",borderRadius:8,padding:"9px",lineHeight:1.6,marginBottom:13,border:"1px solid rgba(196,158,108,0.09)" }}>{activeClause.plain}</div>
                          {activeClause.counter && (<>
                            <div style={{ fontSize:9,color:"#22c55e",fontFamily:"IBM Plex Mono,monospace",marginBottom:5,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                              <span>COUNTER-TERM</span>
                              <button className="cpbtn" onClick={()=>copy(activeClause.counter,activeClause.id)}>{copiedId===activeClause.id?"✓ Copied!":"Copy"}</button>
                            </div>
                            <div style={{ fontSize:11,color:"#4ade80",background:"rgba(34,197,94,0.04)",borderRadius:8,padding:"9px",lineHeight:1.6,border:"1px solid rgba(34,197,94,0.12)" }}>{activeClause.counter}</div>
                          </>)}
                          {activeClause.regulatoryNote && <div style={{ marginTop:10,fontSize:11,color:"#22c55e",background:"rgba(34,197,94,0.04)",borderRadius:6,padding:"6px 9px",border:"1px solid rgba(34,197,94,0.12)" }}>{activeClause.regulatoryNote}</div>}
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* ── COUNTER-TERMS TAB ── */}
                  {reportTab==="counter" && (
                    <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
                      <div style={{ background:"rgba(34,197,94,0.05)",border:"1px solid rgba(34,197,94,0.14)",borderRadius:10,padding:"9px 13px",fontSize:12,color:"#22c55e" }}>
                        ✅ {analysis.agentOutputs.negotiation.counterTermsGenerated} counter-terms generated &nbsp;·&nbsp; Strategy: {analysis.agentOutputs.negotiation.strategy}
                      </div>
                      {filtered.filter(c=>c.counter&&c.riskLevel!=="Low").map(c=>(
                        <div key={c.id} style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"16px 18px" }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <span style={{ fontSize:13,fontWeight:600,color:"#DDD" }}>{c.title}</span>
                              <span className="pll" style={{ background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,color:rc(c.riskLevel) }}>{c.riskScore}/100</span>
                            </div>
                            <button className="cpbtn" onClick={()=>copy(c.counter,c.id)}>{copiedId===c.id?"✓ Copied!":"Copy Counter-Term"}</button>
                          </div>
                          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:11 }}>
                            <div>
                              <div style={{ fontSize:9,color:"#ef4444",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>ORIGINAL</div>
                              <div style={{ fontSize:11,color:"#555",background:"#0A0B0E",borderRadius:8,padding:"9px",lineHeight:1.6,border:"1px solid #0F1115",fontStyle:"italic" }}>"{c.original}"</div>
                            </div>
                            <div>
                              <div style={{ fontSize:9,color:"#22c55e",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>COUNTER-TERM</div>
                              <div style={{ fontSize:11,color:"#4ade80",background:"rgba(34,197,94,0.04)",borderRadius:8,padding:"9px",lineHeight:1.6,border:"1px solid rgba(34,197,94,0.12)" }}>{c.counter}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── PLAIN LANGUAGE TAB ── */}
                  {reportTab==="plain" && (
                    <div style={{ display:"flex",flexDirection:"column",gap:11 }}>
                      <div style={{ background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.14)",borderRadius:10,padding:"9px 13px",fontSize:12,color:"#f59e0b" }}>
                        💡 Readability Score: {analysis.agentOutputs.explanation.readabilityScore}/100 ({analysis.agentOutputs.explanation.grade}) — Plain English translations below
                      </div>
                      {filtered.map(c=>(
                        <div key={c.id} style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:12,padding:"14px 16px" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                            <span style={{ fontSize:13,fontWeight:600,color:"#DDD" }}>{c.title}</span>
                            <span className="pll" style={{ background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,color:rc(c.riskLevel) }}>{c.type}</span>
                          </div>
                          <div style={{ fontSize:9,color:"#333",fontFamily:"IBM Plex Mono,monospace",marginBottom:4 }}>LEGAL TEXT</div>
                          <div style={{ fontSize:11,color:"#444",fontStyle:"italic",marginBottom:10,lineHeight:1.6 }}>"{c.original}"</div>
                          <div style={{ fontSize:9,color:"#f59e0b",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>WHAT IT ACTUALLY MEANS</div>
                          <div style={{ fontSize:13,color:"#CCC",lineHeight:1.75,background:"rgba(245,158,11,0.03)",borderRadius:8,padding:"10px",border:"1px solid rgba(245,158,11,0.09)" }}>{c.plain}</div>
                          {c.financialExposure && <div style={{ marginTop:7,fontSize:11,color:"#f59e0b",fontFamily:"IBM Plex Mono,monospace" }}>💰 Financial Exposure: {c.financialExposure}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── REGULATORY TAB ── */}
                  {reportTab==="regulatory" && (
                    <div>
                      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:14 }}>
                        <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"16px" }}>
                          <div style={{ fontSize:10,color:"#22c55e",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.08em",marginBottom:11 }}>COMPLIANCE STATUS</div>
                          <div style={{ fontSize:26,fontWeight:700,color:"#22c55e",fontFamily:"Playfair Display,serif",marginBottom:4 }}>{analysis.agentOutputs.regulatory.complianceScore}%</div>
                          <div style={{ fontSize:12,color:"#444",marginBottom:12 }}>Jurisdiction: {analysis.agentOutputs.regulatory.jurisdiction}</div>
                          {analysis.agentOutputs.regulatory.violations.map((v,i)=>(
                            <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",marginBottom:7 }}>
                              <span style={{ color:"#ef4444",flexShrink:0 }}>⚠</span>
                              <span style={{ fontSize:12,color:"#777" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:13,padding:"16px" }}>
                          <div style={{ fontSize:10,color:"#22c55e",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.08em",marginBottom:11 }}>APPLICABLE LAWS</div>
                          {["Indian Contract Act, 1872","DPDP Act, 2023","IT Act, 2000 (Sec 43A)","Copyright Act, 1957","Arbitration & Conciliation Act, 1996","Sale of Goods Act, 1930"].map((l,i)=>(
                            <div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                              <svg width="9" height="9" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                              <span style={{ fontSize:12,color:"#666" }}>{l}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {analysis.clauses.filter(c=>c.agent==="Regulatory Adaptation").map(c=>(
                        <div key={c.id} style={{ background:"rgba(34,197,94,0.03)",border:"1px solid rgba(34,197,94,0.13)",borderRadius:11,padding:"14px 16px",marginBottom:11 }}>
                          <div style={{ fontSize:13,fontWeight:600,color:"#DDD",marginBottom:6 }}>{c.title}</div>
                          {c.regulatoryNote && <div style={{ fontSize:12,color:"#22c55e",marginBottom:8 }}>{c.regulatoryNote}</div>}
                          <div style={{ fontSize:11,color:"#555",fontStyle:"italic" }}>"{c.original}"</div>
                          {c.counter && <div style={{ marginTop:10,background:"rgba(34,197,94,0.04)",borderRadius:8,padding:"8px",fontSize:11,color:"#4ade80",border:"1px solid rgba(34,197,94,0.11)" }}>Resolution: {c.counter}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── CONSISTENCY TAB ── */}
                  {reportTab==="consistency" && (
                    <div>
                      <div style={{ background:"rgba(139,92,246,0.05)",border:"1px solid rgba(139,92,246,0.16)",borderRadius:10,padding:"9px 13px",marginBottom:13,fontSize:12,color:"#a78bfa" }}>
                        🔍 {analysis.agentOutputs.consistency.contradictions} internal contradictions found
                      </div>
                      {analysis.agentOutputs.consistency.issues.map((iss,i)=>(
                        <div key={i} style={{ background:"#0D0F13",border:"1px solid rgba(139,92,246,0.14)",borderRadius:11,padding:"14px 16px",marginBottom:10 }}>
                          <div style={{ fontSize:12,color:"#333",fontFamily:"IBM Plex Mono,monospace",marginBottom:5 }}>CONTRADICTION #{i+1}</div>
                          <div style={{ fontSize:13,color:"#a78bfa",fontWeight:500 }}>{iss}</div>
                        </div>
                      ))}
                      {analysis.clauses.filter(c=>c.agent==="Consistency").map(c=>(
                        <div key={c.id} style={{ background:"#0D0F13",border:"1px solid rgba(139,92,246,0.14)",borderRadius:11,padding:"14px 16px",marginBottom:10 }}>
                          <div style={{ fontSize:13,fontWeight:600,color:"#DDD",marginBottom:6 }}>{c.title}</div>
                          <div style={{ fontSize:11,color:"#666",fontStyle:"italic",marginBottom:8 }}>{c.original}</div>
                          <div style={{ fontSize:12,color:"#a78bfa",marginBottom:8 }}>{c.plain}</div>
                          {c.counter && <div style={{ background:"rgba(34,197,94,0.04)",borderRadius:8,padding:"8px 10px",fontSize:11,color:"#4ade80",border:"1px solid rgba(34,197,94,0.11)" }}>Resolution: {c.counter}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── USER DECISION TAB ── */}
                  {reportTab==="decision" && (
                    <div>
                      <div style={{ background:"#0D0F13",border:"1px solid #1A1D22",borderRadius:14,padding:"22px",marginBottom:16,textAlign:"center" }}>
                        <div style={{ fontSize:11,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.1em",marginBottom:10 }}>USER DECISION POINT</div>
                        <div style={{ fontSize:15,fontWeight:600,color:"#FFF",marginBottom:6 }}>You've reviewed your contract analysis. What would you like to do?</div>
                        <div style={{ fontSize:12,color:"#555",marginBottom:22 }}>
                          Risk Score: <span style={{ color:"#ef4444",fontWeight:600 }}>{analysis.overallScore}/10 — High Risk</span> &nbsp;·&nbsp; {analysis.agentOutputs.risk.critical} critical &nbsp;·&nbsp; {analysis.agentOutputs.risk.high} high &nbsp;·&nbsp; {analysis.agentOutputs.negotiation.counterTermsGenerated} counter-terms ready
                        </div>
                        <div style={{ display:"flex",gap:13,justifyContent:"center",flexWrap:"wrap" }}>
                          <motion.button whileHover={{scale:1.04,boxShadow:"0 0 24px rgba(59,130,246,0.3)"}} whileTap={{scale:0.97}} className="dec-btn"
                            style={{ background:userDecision==="sign"?"rgba(59,130,246,0.18)":"rgba(59,130,246,0.09)",border:`1px solid ${userDecision==="sign"?"#3b82f6":"rgba(59,130,246,0.22)"}`,color:"#93c5fd" }}
                            onClick={()=>setUserDecision("sign")}>
                            <span style={{ fontSize:22 }}>✍️</span>
                            <span style={{ fontSize:13,fontWeight:700 }}>Sign with Clarity</span>
                            <span style={{ fontSize:11,color:"#555",fontWeight:400 }}>I understand all risks</span>
                          </motion.button>
                          <motion.button whileHover={{scale:1.04,boxShadow:"0 0 24px rgba(196,158,108,0.3)"}} whileTap={{scale:0.97}} className="dec-btn"
                            style={{ background:userDecision==="negotiate"?"rgba(196,158,108,0.18)":"rgba(196,158,108,0.07)",border:`1px solid ${userDecision==="negotiate"?"#C49E6C":"rgba(196,158,108,0.2)"}`,color:"#F5D08A" }}
                            onClick={()=>setUserDecision("negotiate")}>
                            <span style={{ fontSize:22 }}>🤝</span>
                            <span style={{ fontSize:13,fontWeight:700 }}>Use Counter-Terms</span>
                            <span style={{ fontSize:11,color:"#555",fontWeight:400 }}>Negotiate the clauses</span>
                          </motion.button>
                          <motion.button whileHover={{scale:1.04,boxShadow:"0 0 24px rgba(139,92,246,0.3)"}} whileTap={{scale:0.97}} className="dec-btn"
                            style={{ background:userDecision==="lawyer"?"rgba(139,92,246,0.18)":"rgba(139,92,246,0.07)",border:`1px solid ${userDecision==="lawyer"?"#8b5cf6":"rgba(139,92,246,0.2)"}`,color:"#c4b5fd" }}
                            onClick={()=>setUserDecision("lawyer")}>
                            <span style={{ fontSize:22 }}>⚖️</span>
                            <span style={{ fontSize:13,fontWeight:700 }}>Consult a Lawyer</span>
                            <span style={{ fontSize:11,color:"#555",fontWeight:400 }}>For critical sections only</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Decision outcome */}
                      <AnimatePresence>
                      {userDecision==="sign" && (
                        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{ background:"rgba(59,130,246,0.05)",border:"1px solid rgba(59,130,246,0.18)",borderRadius:13,padding:"18px 20px" }}>
                          <div style={{ fontSize:14,fontWeight:600,color:"#93c5fd",marginBottom:10 }}>✍️ Signing with Clarity — Acknowledged Risks</div>
                          <div style={{ fontSize:12,color:"#666",lineHeight:1.75,marginBottom:12 }}>You are proceeding to sign with full knowledge of the following risks. This is logged for your records:</div>
                          {analysis.clauses.filter(c=>c.riskLevel==="Critical"||c.riskLevel==="High").map(c=>(
                            <div key={c.id} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:9 }}>
                              <span className="pll" style={{ background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,color:rc(c.riskLevel),flexShrink:0 }}>{c.riskScore}</span>
                              <div style={{ fontSize:12,color:"#888" }}><strong style={{ color:"#CCC" }}>{c.title}:</strong> {c.plain}</div>
                            </div>
                          ))}
                          <motion.button whileHover={{scale:1.03}} className="gbtn" style={{ marginTop:12,width:"100%",fontSize:14,padding:"12px" }}>
                            Proceed to Sign — DigiLocker Integration →
                          </motion.button>
                        </motion.div>
                      )}
                      {userDecision==="negotiate" && (
                        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{ background:"rgba(196,158,108,0.04)",border:"1px solid rgba(196,158,108,0.18)",borderRadius:13,padding:"18px 20px" }}>
                          <div style={{ fontSize:14,fontWeight:600,color:"#F5D08A",marginBottom:10 }}>🤝 Negotiation Package — Ready to Send</div>
                          <div style={{ fontSize:12,color:"#666",lineHeight:1.75,marginBottom:12 }}>Copy these counter-terms and send directly to the other party. Each is professionally worded and grounded in Indian law.</div>
                          {analysis.clauses.filter(c=>c.counter&&c.negotiable&&c.riskLevel!=="Low").map(c=>(
                            <div key={c.id} style={{ background:"#0A0B0E",border:"1px solid #1A1D22",borderRadius:10,padding:"12px 14px",marginBottom:10 }}>
                              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
                                <span style={{ fontSize:12,fontWeight:600,color:"#CCC" }}>{c.title}</span>
                                <button className="cpbtn" onClick={()=>copy(c.counter,`dec-${c.id}`)}>{copiedId===`dec-${c.id}`?"✓ Copied!":"Copy"}</button>
                              </div>
                              <div style={{ fontSize:11,color:"#4ade80",lineHeight:1.6 }}>{c.counter}</div>
                            </div>
                          ))}
                          <motion.button whileHover={{scale:1.03}} className="gbtn" style={{ marginTop:4,width:"100%",fontSize:13 }} onClick={()=>copy(analysis.clauses.filter(c=>c.counter&&c.negotiable).map(c=>`${c.title}:\n${c.counter}`).join("\n\n"),"all-counters")}>
                            {copiedId==="all-counters"?"✓ All Counter-Terms Copied!":"📋 Copy All Counter-Terms as Email"}
                          </motion.button>
                        </motion.div>
                      )}
                      {userDecision==="lawyer" && (
                        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{ background:"rgba(139,92,246,0.04)",border:"1px solid rgba(139,92,246,0.18)",borderRadius:13,padding:"18px 20px" }}>
                          <div style={{ fontSize:14,fontWeight:600,color:"#c4b5fd",marginBottom:10 }}>⚖️ Lawyer Brief — Critical Sections Only</div>
                          <div style={{ fontSize:12,color:"#666",lineHeight:1.75,marginBottom:12 }}>Instead of paying ₹5,000–₹50,000 for a full review, show your lawyer only these {analysis.clauses.filter(c=>c.riskLevel==="Critical"||c.riskLevel==="High").length} high-risk sections. Estimated saving: <span style={{ color:"#22c55e",fontWeight:600 }}>₹30,000–₹45,000</span></div>
                          {analysis.clauses.filter(c=>c.riskLevel==="Critical"||c.riskLevel==="High").map(c=>(
                            <div key={c.id} style={{ background:"#0A0B0E",border:"1px solid rgba(139,92,246,0.12)",borderRadius:10,padding:"12px 14px",marginBottom:10 }}>
                              <div style={{ fontSize:13,fontWeight:600,color:"#DDD",marginBottom:6 }}>{c.title} <span className="pll" style={{ background:rb(c.riskLevel),border:`1px solid ${rc(c.riskLevel)}22`,color:rc(c.riskLevel) }}>{c.riskScore}/100</span></div>
                              <div style={{ fontSize:11,color:"#777",fontStyle:"italic",marginBottom:5 }}>"{c.original}"</div>
                              {c.regulatoryNote && <div style={{ fontSize:11,color:"#22c55e" }}>{c.regulatoryNote}</div>}
                            </div>
                          ))}
                          <motion.button whileHover={{scale:1.03}} className="gbtn" style={{ marginTop:4,width:"100%",fontSize:13 }} onClick={()=>copy(analysis.clauses.filter(c=>c.riskLevel==="Critical"||c.riskLevel==="High").map(c=>`CLAUSE: ${c.title}\nRisk Score: ${c.riskScore}/100\nOriginal: "${c.original}"\nConcern: ${c.plain}`).join("\n\n---\n\n"),"lawyer-brief")}>
                            {copiedId==="lawyer-brief"?"✓ Brief Copied!":"📋 Copy Lawyer Brief"}
                          </motion.button>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          )}

          </AnimatePresence>
        </main>

        {/* ── RIGHT PANEL ─────────────────────────────────────────── */}
        <aside style={{ width:228,background:"#060708",borderLeft:"1px solid #0F1115",padding:"20px 13px",flexShrink:0,overflowY:"auto" }}>
          {/* Risk donut */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.12em",marginBottom:13,fontWeight:800 }}>RISK BREAKDOWN</div>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:13 }}>
              <div style={{ position:"relative",width:82,height:82 }}>
                <svg width="82" height="82" viewBox="0 0 82 82">
                  <circle cx="41" cy="41" r="31" fill="none" stroke="#0F1115" strokeWidth="11"/>
                  <circle cx="41" cy="41" r="31" fill="none" stroke="#22c55e" strokeWidth="11" strokeDasharray={`${(riskBreakdown.low/100)*2*Math.PI*31} ${2*Math.PI*31}`} strokeDashoffset={-2*Math.PI*31*(riskBreakdown.high+riskBreakdown.med)/100} transform="rotate(-90 41 41)" opacity="0.85"/>
                  <circle cx="41" cy="41" r="31" fill="none" stroke="#f59e0b" strokeWidth="11" strokeDasharray={`${(riskBreakdown.med/100)*2*Math.PI*31} ${2*Math.PI*31}`} strokeDashoffset={-2*Math.PI*31*(riskBreakdown.high)/100} transform="rotate(-90 41 41)" opacity="0.85"/>
                  <circle cx="41" cy="41" r="31" fill="none" stroke="#ef4444" strokeWidth="11" strokeDasharray={`${(riskBreakdown.high/100)*2*Math.PI*31} ${2*Math.PI*31}`} strokeDashoffset="0" transform="rotate(-90 41 41)" opacity="0.85"/>
                </svg>
                <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#FFF" }}>{riskBreakdown.low}%</div>
              </div>
            </div>
            {[{l:"High Risk",v:riskBreakdown.high,c:"#ef4444"},{l:"Med Risk",v:riskBreakdown.med,c:"#f59e0b"},{l:"Low Risk",v:riskBreakdown.low,c:"#22c55e"}].map(({l,v,c})=>(
              <div key={l} style={{ display:"flex",alignItems:"center",gap:7,marginBottom:8 }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:c,flexShrink:0 }}/>
                <span style={{ flex:1,fontSize:12,color:"#AAA",fontWeight:600 }}>{l}</span>
                <span style={{ fontSize:13,fontWeight:900,color:c }}>{v}%</span>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.12em",marginBottom:12,fontWeight:800 }}>RECENT ACTIVITY</div>
            {CONTRACTS.map((c,i)=>(
              <div key={i} style={{ display:"flex",gap:9,alignItems:"center",marginBottom:11,cursor:"pointer" }} onClick={()=>setActiveNav("Reports")}>
                <div style={{ width:27,height:27,borderRadius:7,background:"#0D0F13",border:"1px solid #131518",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="10" height="10" fill="none" stroke={rc(c.risk)} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
                </div>
                <div><div style={{ fontSize:12,color:"#CCC",fontWeight:600 }}>{c.name}</div><div style={{ fontSize:10,color:"#444",marginTop:1 }}>{c.time}</div></div>
              </div>
            ))}
          </div>

          {/* Top entities */}
          <div>
            <div style={{ fontSize:10,color:"#C49E6C",fontFamily:"IBM Plex Mono,monospace",letterSpacing:"0.12em",marginBottom:12,fontWeight:800 }}>TOP ENTITIES</div>
            {[{n:"Company.X",t:"13m ago",c:"#ef4444"},{n:"Freelancer Y",t:"1h ago",c:"#3b82f6"}].map((e,i)=>(
              <div key={i} style={{ display:"flex",gap:9,alignItems:"center",marginBottom:11 }}>
                <div style={{ width:20,height:20,borderRadius:5,background:e.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:900,color:"#fff",flexShrink:0 }}>IN</div>
                <div><div style={{ fontSize:12,color:"#CCC",fontWeight:700 }}>{e.n}</div><div style={{ fontSize:10,color:"#444" }}>{e.t}</div></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}


export default function App() {
  const [page, setPage] = useState("landing");
  const [user] = useState({ name: "John S.", email: "demo@karrar.ai", initials: "JS" });
  return (
    <AnimatePresence mode="wait">
      {page === "landing" && (
        <motion.div key="landing" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
          <KarrarLanding onLogin={() => setPage("login")} />
        </motion.div>
      )}
      {page === "login" && (
        <motion.div key="login" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
          <LoginPage onBack={() => setPage("landing")} onSuccess={() => setPage("dashboard")} />
        </motion.div>
      )}
      {page === "dashboard" && (
        <motion.div key="dashboard" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
          <DashboardPage user={user} onLogout={() => setPage("landing")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}



