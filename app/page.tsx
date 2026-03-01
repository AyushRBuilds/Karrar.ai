'use client';

import React, { useState, useEffect, useRef } from "react";

// ── Floating background watermark icons (custom, theme-native) ────
const LEGAL_ICONS = [
  { x: 5,  y: 12, size: 48, rot: -15, delay: 0,   type: 0 },
  { x: 88, y: 8,  size: 36, rot: 20,  delay: 0.3, type: 1 },
  { x: 15, y: 72, size: 40, rot: -8,  delay: 0.6, type: 2 },
  { x: 78, y: 65, size: 52, rot: 12,  delay: 0.2, type: 3 },
  { x: 50, y: 5,  size: 30, rot: 5,   delay: 0.9, type: 0 },
  { x: 92, y: 42, size: 38, rot: -20, delay: 0.4, type: 1 },
  { x: 3,  y: 45, size: 34, rot: 10,  delay: 0.7, type: 2 },
  { x: 60, y: 85, size: 44, rot: -5,  delay: 0.1, type: 3 },
  { x: 30, y: 90, size: 28, rot: 18,  delay: 0.8, type: 0 },
  { x: 70, y: 20, size: 32, rot: -12, delay: 0.5, type: 1 },
];

// Pair of balanced scales — hand-drawn, legal authority
const WmScales = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="4" x2="16" y2="28" />
    <line x1="8" y1="28" x2="24" y2="28" />
    <line x1="6" y1="10" x2="26" y2="10" />
    <polyline points="6,10 4,16 8,16 6,10" />
    <polyline points="26,10 24,16 28,16 26,10" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <line x1="6" y1="10" x2="10" y2="7" />
    <line x1="26" y1="10" x2="22" y2="7" />
    <line x1="10" y1="7" x2="22" y2="7" />
  </svg>
);

// Quill pen — contracts, writing, Indian legal tradition
const WmQuill = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 4 C20 4 10 10 8 26" />
    <path d="M26 4 C28 10 22 18 8 26" />
    <path d="M14 20 L8 26 L10 20 Z" fill="currentColor" fillOpacity="0.4" />
    <line x1="8" y1="26" x2="14" y2="28" />
    <path d="M18 10 Q22 8 26 4" strokeDasharray="2 2" />
  </svg>
);

// Seal / stamp — authority, certification
const WmSeal = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="10" />
    <circle cx="16" cy="16" r="6" />
    <line x1="16" y1="4" x2="16" y2="6" />
    <line x1="16" y1="26" x2="16" y2="28" />
    <line x1="4" y1="16" x2="6" y2="16" />
    <line x1="26" y1="16" x2="28" y2="16" />
    <line x1="7.5" y1="7.5" x2="9" y2="9" />
    <line x1="23" y1="23" x2="24.5" y2="24.5" />
    <line x1="24.5" y1="7.5" x2="23" y2="9" />
    <line x1="9" y1="23" x2="7.5" y2="24.5" />
    <path d="M14 14 L16 12 L18 14 L18 18 L14 18 Z" />
  </svg>
);

// Column / pillar — rule of law, institutional strength
const WmPillar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="6" x2="26" y2="6" />
    <line x1="6" y1="28" x2="26" y2="28" />
    <line x1="4" y1="8" x2="28" y2="8" />
    <rect x="9" y="8" width="4" height="18" />
    <rect x="14" y="8" width="4" height="18" />
    <rect x="19" y="8" width="4" height="18" />
    <line x1="4" y1="26" x2="28" y2="26" />
  </svg>
);

const ICONS = [WmScales, WmQuill, WmSeal, WmPillar, WmScales, WmQuill, WmSeal, WmPillar, WmScales, WmQuill];

// ── Real Karrar.ai Logo ──────────────────────────────────────────
const LOGO_PNG = "data:image/jpeg;base64,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";
const ShieldLogo = ({ size = 40 }) => (
  <img src={LOGO_PNG} alt="Karrar.ai" width={size} height={size}
    style={{ objectFit:"contain", display:"block", mixBlendMode:"screen" }} />
);

// ── Custom SVG Icon System (no generic emojis, no icon libraries) ─
// Each icon is drawn to reinforce the Karrar.ai legal-AI identity

// Upload / send upward — clause upload
const IcUpload = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15V4" /><polyline points="8,8 12,4 16,8" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

// Lightning bolt — speed, parallel processing
const IcBolt = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

// Bar chart — risk scoring, analytics
const IcRisk = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" /><rect x="10" y="7" width="4" height="14" />
    <rect x="17" y="3" width="4" height="18" /><line x1="2" y1="21" x2="22" y2="21" />
    <line x1="5" y1="8" x2="5" y2="12" strokeDasharray="2 2" />
    <line x1="12" y1="4" x2="12" y2="7" strokeDasharray="2 2" />
  </svg>
);

// Pen + lines — counter-terms, drafting
const IcDraft = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    <line x1="2" y1="22" x2="22" y2="22" />
  </svg>
);

// Checkmark in circle — act, sign, done
const IcSign = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="8,12 11,15 16,9" />
  </svg>
);

// Magnifying glass with lines — clause analysis
const IcSearch = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="7" y1="10" x2="13" y2="10" /><line x1="10" y1="7" x2="10" y2="13" />
  </svg>
);

// Shield with exclamation — high risk flagging
const IcRiskShield = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" />
    <line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="16" r="0.5" fill={color} />
  </svg>
);

// Handshake-style arrows — negotiation, counter-terms
const IcNegotiate = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3" />
    <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
    <path d="M9 8l-2 4h6l-2 4" />
    <line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="16" x2="15" y2="16" />
  </svg>
);

// Connected nodes — AI multi-agent network
const IcAgents = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    <line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" />
    <line x1="7" y1="19" x2="17" y2="19" />
  </svg>
);

// Document with gear — draft consistency check
const IcConsistency = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5" />
    <polyline points="13,2 13,8 19,8" />
    <circle cx="18" cy="17" r="3" /><line x1="22" y1="22" x2="19.5" y2="19.5" />
    <line x1="7" y1="12" x2="11" y2="12" /><line x1="7" y1="16" x2="10" y2="16" />
  </svg>
);

// Globe with grid — Indian / international regulatory
const IcRegulatory = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

// Speech bubble with lines — plain language explanation
const IcExplain = ({ s = 22, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="13" y2="13" />
  </svg>
);

// Lock with shield line — encryption / security
const IcLock = ({ s = 14, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="11" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1" fill={color} />
  </svg>
);

// Scales (smaller, for trust badges)
const IcScales = ({ s = 14, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M3 7l9-4 9 4" /><path d="M5 7l-2 6h4z" /><path d="M19 7l-2 6h4z" />
    <line x1="5" y1="21" x2="19" y2="21" />
  </svg>
);

// Clock — 90 seconds analysis speed
const IcClock = ({ s = 14, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

// Document icon — for upload zone and file states
const IcDoc = ({ s = 48, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V20L28 4z" />
    <polyline points="28,4 28,20 40,20" />
    <line x1="16" y1="28" x2="32" y2="28" /><line x1="16" y1="34" x2="28" y2="34" />
    <line x1="16" y1="22" x2="20" y2="22" />
  </svg>
);

// Spinning gear — processing / analysis
const IcGear = ({ s = 40, color = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// Check circle — success / complete
const IcCheckCircle = ({ s = 48, color = "#22c55e" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

// X circle — before / danger
const IcXCircle = ({ s = 16, color = "#ef4444" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// Diamond bullet — pricing feature list
const IcDiamond = ({ s = 12, color = "#C49E6C" }) => (
  <svg width={s} height={s} viewBox="0 0 12 12" fill={color}>
    <polygon points="6,1 11,6 6,11 1,6" />
  </svg>
);

// Star — rating / testimonials
const IcStar = ({ s = 16, color = "#C49E6C" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

// Twitter bird replacement — angular X shape
const IcX = ({ s = 16, color = "#B5B5B5" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632z"/>
  </svg>
);

// LinkedIn-style briefcase
const IcLinkedIn = ({ s = 16, color = "#B5B5B5" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

// Instagram-style camera
const IcCamera = ({ s = 16, color = "#B5B5B5" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

// ── Animated counter ─────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Risk Badge ───────────────────────────────────────────────────
function RiskBadge({ score }) {
  const color = score >= 8 ? "#ef4444" : score >= 6 ? "#f59e0b" : "#22c55e";
  return (
    <span style={{ background: color + "15", color, border: `1px solid ${color}40`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/></svg>
      {score.toFixed(1)}
    </span>
  );
}

// ── Floating dashboard panel ─────────────────────────────────────
function FloatingPanel({ style }) {
  return (
    <div style={{
      background: "rgba(15,17,21,0.95)", backdropFilter: "blur(16px)",
      borderRadius: 16, border: "1px solid #1E2228", padding: "16px 20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 1px rgba(196,158,108,0.1)", minWidth: 260, ...style
    }}>
      <div style={{ fontSize: 11, color: "#C49E6C", marginBottom: 8, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Contract Analysis</div>
      {[
        { label: "High Financial Liability", clause: "Indemnification Clause", score: 8.4 },
        { label: "Unfair Non-Compete", clause: "Restrictive Covenant", score: 7.6 },
        { label: "IP Rights Waiver", clause: "Intellectual Property", score: 9.1 },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid #1E2228" : "none" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFF", fontFamily: "DM Sans, sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "IBM Plex Mono, monospace", marginTop: 2 }}>{item.clause}</div>
          </div>
          <RiskBadge score={item.score} />
        </div>
      ))}
    </div>
  );
}

function AgentPanel({ style }) {
  const agents = [
    { name: "Completeness", color: "#3b82f6", status: "DONE" },
    { name: "Risk Scoring", color: "#ef4444", status: "DONE" },
    { name: "Negotiation", color: "#b5924c", status: "Running…" },
    { name: "Consistency", color: "#8b5cf6", status: "Queued" },
    { name: "Regulatory", color: "#22c55e", status: "Queued" },
    { name: "Explanation", color: "#f59e0b", status: "Queued" },
  ];
  return (
    <div style={{
      background: "rgba(10,10,12,0.96)", backdropFilter: "blur(16px)",
      borderRadius: 16, border: "1px solid rgba(196,158,108,0.25)", padding: "16px 20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)", minWidth: 220, ...style
    }}>
      <div style={{ fontSize: 11, color: "#C49E6C", marginBottom: 10, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="7" y1="19" x2="17" y2="19"/></svg>
        AI AGENTS · LIVE
      </div>
      {agents.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, boxShadow: a.status === "Running\u2026" ? `0 0 8px ${a.color}` : "none" }} />
            <span style={{ fontSize: 11, color: "#000000", fontFamily: "DM Sans, sans-serif" }}>{a.name}</span>
          </div>
          <span style={{ fontSize: 10, color: a.status === "DONE" ? "#22c55e" : a.status === "Running…" ? "#C49E6C" : "#333", fontFamily: "IBM Plex Mono, monospace" }}>{a.status}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, background: "rgba(196,158,108,0.1)", borderRadius: 6, height: 4, overflow: "hidden" }}>
        <div style={{ width: "38%", height: "100%", background: "linear-gradient(90deg, #C49E6C, #F5D08A)", borderRadius: 6, animation: "progress 2s ease-in-out infinite" }} />
      </div>
      <div style={{ fontSize: 10, color: "#444", marginTop: 6, fontFamily: "IBM Plex Mono, monospace" }}>Analysis · 38% complete</div>
    </div>
  );
}

function ScorePanel({ style }) {
  return (
    <div style={{
      background: "rgba(15,17,21,0.95)", backdropFilter: "blur(16px)",
      borderRadius: 16, border: "1px solid #1E2228", padding: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.7)", textAlign: "center", minWidth: 160, ...style
    }}>
      <div style={{ fontSize: 11, color: "#555", marginBottom: 8, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em" }}>OVERALL RISK</div>
      <div style={{ fontSize: 52, fontWeight: 800, color: "#ef4444", fontFamily: "Georgia, serif", lineHeight: 1 }}>8.4</div>
      <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "IBM Plex Mono, monospace" }}>HIGH RISK</div>
      <div style={{ marginTop: 12, background: "#1E2228", borderRadius: 20, height: 6 }}>
        <div style={{ width: "84%", height: "100%", background: "linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius: 20 }} />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [uploadState, setUploadState] = useState("idle"); // idle | dragging | analyzing | done
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const triggerAnalysis = () => {
    setUploadState("analyzing");
    const steps = [
      [10, "Parsing PDF…"],
      [30, "Completeness Agent running…"],
      [50, "Risk Scoring Agent running…"],
      [65, "Negotiation Agent running…"],
      [80, "Consistency Agent running…"],
      [92, "Regulatory Agent running…"],
      [100, "Analysis complete."],
    ];
    let i = 0;
    const next = () => {
      if (i < steps.length) {
        setProgress(steps[i][0]);
        setProgressLabel(steps[i][1]);
        i++;
        setTimeout(next, i === steps.length ? 400 : 600);
      } else {
        setTimeout(() => setUploadState("done"), 300);
      }
    };
    next();
  };

  const NAV = ["Home", "How It Works", "Agents", "Features", "Pricing", "About"];
  // Custom SVG icons per agent — scoped, themed, no emoji
  const AGENT_ICONS = [
    // 01 Completeness: magnifier with a checkmark corner
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><polyline points="8,10 10,12 13,8"/></svg>,
    // 02 Risk: shield with a slash/exclamation
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.8" fill={color}/></svg>,
    // 03 Negotiation: two arrows crossing — exchange / counter
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16H3v-4"/><path d="M3 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M17 8h4v4"/><path d="M21 12c0 4.4-3.6 8-8 8s-8-3.6-8-8"/></svg>,
    // 04 Consistency: two docs stacked with a link chain
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="11" height="14" rx="1.5"/><line x1="6" y1="9" x2="11" y2="9"/><line x1="6" y1="12" x2="10" y2="12"/><rect x="10" y="3" width="11" height="14" rx="1.5" fill="#030303"/><line x1="13" y1="8" x2="18" y2="8"/><line x1="13" y1="11" x2="17" y2="11"/></svg>,
    // 05 Regulatory: globe with a legal column inside
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 3 9 14 14 0 0 1-3 9 14 14 0 0 1-3-9 14 14 0 0 1 3-9z"/><line x1="12" y1="3" x2="12" y2="21"/></svg>,
    // 06 Explanation: speech bubble with "ab→Aa" concept
    ({ color }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="13" y1="10" x2="16" y2="10"/><line x1="9" y1="13" x2="15" y2="13"/></svg>,
  ];

  const AGENTS = [
    { name: "Completeness Agent",   role: "Finds missing annexures & schedules",   color: "#3b82f6", num: "01" },
    { name: "Risk & Red Flag Agent", role: "Scores every clause 0–100",             color: "#ef4444", num: "02" },
    { name: "Negotiation Agent",    role: "Generates copy-paste counter-terms",     color: "#C49E6C", num: "03" },
    { name: "Draft Consistency Agent", role: "Catches internal contradictions",     color: "#8b5cf6", num: "04" },
    { name: "Regulatory Agent",     role: "Cross-checks Indian Contract Act",       color: "#22c55e", num: "05" },
    { name: "Explanation Agent",    role: "Translates legalese to plain English",   color: "#f59e0b", num: "06" },
  ];

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: "#000000", color: "#FFFFFF", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse  { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes progress { 0%{width:0%} 100%{width:80%} }
        @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideIn{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 20px rgba(196,158,108,0.15)} 50%{box-shadow:0 0 40px rgba(245,208,138,0.35)} }
        .fade-up   { animation: fadeUp 0.8s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.8s 0.10s ease both; }
        .fade-up-2 { animation: fadeUp 0.8s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.8s 0.40s ease both; }
        .fade-up-4 { animation: fadeUp 0.8s 0.55s ease both; }
        .fade-up-5 { animation: fadeUp 0.8s 0.70s ease both; }
        .fade-up-6 { animation: fadeUp 0.8s 0.85s ease both; }
        .float-1 { animation: float  5s ease-in-out infinite; }
        .float-2 { animation: float2 7s ease-in-out infinite; }
        .float-3 { animation: float  6s 1s ease-in-out infinite; }

        /* ── Buttons ── */
        .btn-dark {
          background: linear-gradient(90deg,#C49E6C,#F5D08A);
          color: #000;
          border: none;
          border-radius: 999px;
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.02em;
          box-shadow: 0 0 0 rgba(196,158,108,0);
        }
        .btn-dark:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 32px rgba(196,158,108,0.45), 0 8px 24px rgba(0,0,0,0.4);
        }
        .btn-outline {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(196,158,108,0.5);
          border-radius: 999px;
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: #C49E6C;
          color: #F5D08A;
          box-shadow: 0 0 20px rgba(196,158,108,0.2);
          transform: translateY(-1px);
        }
        .btn-gold {
          background: linear-gradient(90deg,#C49E6C,#F5D08A);
          color: #000;
          border: none;
          border-radius: 999px;
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-gold:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 32px rgba(196,158,108,0.5);
        }

        /* ── Cards ── */
        .card-hover { transition: all 0.28s; cursor: default; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.6) !important; }
        .agent-card:hover { border-color: rgba(196,158,108,0.35) !important; }
        .agent-card:hover .agent-num { color: #C49E6C !important; }

        /* ── Navbar links ── */
        .nav-link {
          color: #B5B5B5;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 4px;
          position: relative;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg,#C49E6C,#F5D08A);
          transition: width 0.25s;
        }
        .nav-link:hover, .nav-link.active { color: #fff; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        /* ── Step / pricing / testimonial cards ── */
        .step-card:hover   { border-color: rgba(196,158,108,0.4) !important; }
        .pricing-card:hover { transform: translateY(-8px); box-shadow: 0 28px 70px rgba(0,0,0,0.7) !important; }
        .testimonial-card:hover { border-color: rgba(196,158,108,0.3) !important; }

        /* ── Upload zone ── */
        .upload-zone {
          border: 1.5px dashed #1E2228;
          border-radius: 20px;
          padding: 56px 32px;
          text-align: center;
          transition: all 0.28s;
          cursor: pointer;
          background: #0F1115;
        }
        .upload-zone:hover, .upload-zone.dragging {
          border-color: #C49E6C;
          background: rgba(196,158,108,0.04);
          box-shadow: 0 0 40px rgba(196,158,108,0.08);
        }
        section { scroll-margin-top: 80px; }
      `}</style>

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1E2228" : "none",
        transition: "all 0.3s", padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 68, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <ShieldLogo size={36} />
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>Karrar.ai</span>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 32 }}>
            {NAV.map(n => (
              <span key={n} className={`nav-link${activeNav === n ? " active" : ""}`} onClick={() => setActiveNav(n)}>{n}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button className="btn-outline" style={{ padding: "8px 20px", fontSize: 14 }}>Login</button>
            <button className="btn-dark" style={{ padding: "8px 20px", fontSize: 14 }}>Try Free →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 68 }}>
        {/* watermark icons */}
        {LEGAL_ICONS.map((ic, i) => {
          const Icon = ICONS[i];
          return (
            <div key={i} style={{ position: "absolute", left: `${ic.x}%`, top: `${ic.y}%`, opacity: 0.06, color: "#C49E6C", transform: `rotate(${ic.rot}deg)`, pointerEvents: "none", animationDelay: `${ic.delay}s` }}>
              <Icon size={ic.size} />
            </div>
          );
        })}
        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #b5924c22 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.4, pointerEvents: "none" }} />
        {/* gradient mesh */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(196,158,108,0.12) 0%, rgba(196,158,108,0.04) 40%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }}>
          {/* left: text */}
          <div>
            <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(196,158,108,0.08)", border: "1px solid rgba(196,158,108,0.25)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(90deg,#C49E6C,#F5D08A)", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.06em" }}>Hackanova 5.0 · Agentic AI Track</span>
            </div>
            <div className="fade-up-2" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <ShieldLogo size={52} />
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", color: "#555" }}>Karrar.ai</span>
            </div>
            <h1 className="fade-up-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, textShadow: "0 0 80px rgba(196,158,108,0.15)" }}>
              Understand.<br />
              <span style={{ background: "linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Negotiate.</span><br />
              Sign.
            </h1>
            <p className="fade-up-4" style={{ fontSize: 18, color: "#B5B5B5", lineHeight: 1.8, marginBottom: 12 }}>
              India's First <strong style={{ color: "#000000" }}>Multi-Agent</strong> Legal AI.<br />
              Audit contracts, analyze risks & draft counter-terms<br />
              in plain English, <span style={{ background: "linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>under Indian Law.</span>
            </p>
            <div className="fade-up-5" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <button className="btn-dark" style={{ fontSize: 16, padding: "16px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14V4"/><polyline points="8,8 12,4 16,8"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
                Upload a Contract — It's Free
              </button>
              <button className="btn-outline" style={{ fontSize: 16, padding: "16px 24px" }}>Watch Demo →</button>
            </div>
            <div className="fade-up-6" style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>, label: "End-to-End Encrypted" },
                { svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>, label: "Indian Law Grounded" },
                { svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>, label: "90-Second Analysis" },
              ].map((t, i) => (
                <span key={i} style={{ fontSize: 12, color: "#555", fontFamily: "IBM Plex Mono, monospace", display: "flex", alignItems: "center", gap: 5 }}>
                  {t.svg}{t.label}
                </span>
              ))}
            </div>
          </div>

          {/* right: floating panels */}
          <div style={{ position: "relative", height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="float-1" style={{ position: "absolute", top: 0, right: 0, zIndex: 3 }}>
              <FloatingPanel style={{}} />
            </div>
            <div className="float-2" style={{ position: "absolute", bottom: 20, left: 0, zIndex: 4 }}>
              <AgentPanel style={{}} />
            </div>
            <div className="float-3" style={{ position: "absolute", top: "35%", left: "30%", zIndex: 2 }}>
              <ScorePanel style={{}} />
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, #000000)", pointerEvents: "none" }} />
      </section>

      {/* ── STATS TICKER ─────────────────────────────────── */}
      <div style={{ background: "#050505", color: "#FFFFFF", padding: "24px 0", borderTop: "1px solid #1E2228", borderBottom: "1px solid #1E2228", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 64, justifyContent: "center", flexWrap: "wrap", padding: "0 32px" }}>
          {[
            { label: "Contracts Analyzed", value: 12400, suffix: "+" },
            { label: "Risk Clauses Flagged", value: 84000, suffix: "+" },
            { label: "Counter-Terms Generated", value: 31000, suffix: "+" },
            { label: "Compliance Rate", value: 98, suffix: "%" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 36, fontWeight: 700, background: "linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 6, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "120px 32px", background: "#000000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>THE PROCESS</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 10 }}>How It Works</h2>
            <p style={{ color: "#B5B5B5", fontSize: 17, marginTop: 12 }}>From upload to insight in under 90 seconds</p>
          </div>
          <div style={{ position: "relative" }}>
            {/* connecting line */}
            <div style={{ position: "absolute", top: 36, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg, transparent, #C49E6C, transparent)", borderRadius: 2 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24 }}>
              {[
                { num: "01", title: "Upload",
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14V4"/><polyline points="8,8 12,4 16,8"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
                  desc: "Drag & drop your PDF contract. No account needed." },
                { num: "02", title: "Parallel Analysis",
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="7" y1="19" x2="17" y2="19"/></svg>,
                  desc: "6 agents analyze simultaneously in under 90 seconds." },
                { num: "03", title: "Risk Report",
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/><line x1="2" y1="21" x2="22" y2="21"/></svg>,
                  desc: "Every clause scored 0–100 and ranked by severity." },
                { num: "04", title: "Counter-Terms",
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/><line x1="7" y1="17" x2="17" y2="7"/></svg>,
                  desc: "Copy-paste professional alternative clauses instantly." },
                { num: "05", title: "Act",
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8,12 11,15 16,9"/></svg>,
                  desc: "Sign with clarity, negotiate, or consult a lawyer." },
              ].map((s, i) => (
                <div key={i} className="step-card card-hover" style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 16, padding: "28px 20px", textAlign: "center", transition: "all 0.28s" }}>
                  <div style={{ width: 56, height: 56, background: "rgba(196,158,108,0.06)", border: "1px solid rgba(196,158,108,0.15)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", position: "relative", zIndex: 1 }}>
                    {s.icon}
                  </div>
                  <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#C49E6C", letterSpacing: "0.1em", marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#B5B5B5", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENTS SECTION ───────────────────────────────── */}
      <section id="agents" style={{ padding: "120px 32px", background: "#030303", position: "relative", overflow: "hidden" }}>
        {/* bg texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(196,158,108,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,158,108,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>THE TEAM</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 10 }}>Meet Your Legal Team</h2>
            <p style={{ color: "#B5B5B5", fontSize: 17, marginTop: 12 }}>6 specialized AI agents working in parallel on every upload</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {AGENTS.map((a, i) => (
              <div key={i} className="card-hover agent-card" style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 20, padding: "28px", transition: "all 0.25s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, background: a.color + "18", border: `1px solid ${a.color}35`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{React.createElement(AGENT_ICONS[i], { color: a.color })}</div>
                  <span className="agent-num" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 24, fontWeight: 700, color: "#222", transition: "color 0.2s" }}>{a.num}</span>
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{a.name}</div>
                <div style={{ fontSize: 13, color: "#B5B5B5", lineHeight: 1.6 }}>{a.role}</div>
                <div style={{ marginTop: 16, width: "100%", height: 2, background: `linear-gradient(90deg, ${a.color}, transparent)`, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────── */}
      <section style={{ padding: "120px 32px", background: "#000000" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>REAL IMPACT</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 10 }}>Before vs. After Karrar.ai</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div style={{ background: "#0F1115", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 12, color: "#ef4444", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em", marginBottom: 16 }}style={{ display:"flex", alignItems:"center", gap:6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                BEFORE — The contract says:
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#B5B5B5", lineHeight: 1.8, fontStyle: "italic", borderLeft: "3px solid rgba(239,68,68,0.4)", paddingLeft: 16 }}>
                "The Client may terminate this agreement at any time without prior notice and without liability for any work completed or in progress."
              </p>
              <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(239,68,68,0.06)", borderRadius: 10, fontSize: 13, color: "#B5B5B5", border: "1px solid rgba(239,68,68,0.15)" }}>
                You have no idea what this means for your income.
              </div>
            </div>
            <div style={{ background: "#0F1115", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 12, color: "#22c55e", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em", marginBottom: 16 }}style={{ display:"flex", alignItems:"center", gap:6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="8,12 11,15 16,9"/></svg>
                AFTER — Karrar.ai shows you:
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <RiskBadge score={9.1} />
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#ef4444", fontWeight: 700 }}>CRITICAL RISK</span>
              </div>
              <p style={{ fontSize: 14, color: "#B5B5B5", lineHeight: 1.7, marginBottom: 16 }}>
                The client can cancel <em>anytime, for any reason</em>, and owes you <strong>₹0</strong> for completed work — even if you spent 3 weeks on it.
              </p>
              <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: "#22c55e", fontFamily: "IBM Plex Mono, monospace", marginBottom: 6 }}style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                  COUNTER-TERM GENERATED:
                </div>
                <p style={{ fontSize: 13, color: "#B5B5B5", fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.6 }}>
                  "Either party may terminate with 30 days written notice. Upon termination, Client shall pay for all work completed pro-rata at agreed rate."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPLOAD DEMO ──────────────────────────────────── */}
      <section style={{ padding: "120px 32px", background: "#030303" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>TRY IT NOW</span>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 48, fontWeight: 900, color: "#FFFFFF", marginTop: 10, marginBottom: 12 }}>Upload Your Contract</h2>
          <p style={{ color: "#B5B5B5", fontSize: 16, marginBottom: 40 }}>No account required for your first analysis. Results in under 90 seconds.</p>

          {uploadState === "idle" && (
            <div
              className={`upload-zone`}
              onClick={triggerAnalysis}
              onDragOver={e => { e.preventDefault(); }}
            >
              <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
                <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#C49E6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                  <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V20L28 4z"/>
                  <polyline points="28,4 28,20 40,20"/>
                  <line x1="16" y1="28" x2="32" y2="28"/><line x1="16" y1="34" x2="28" y2="34"/>
                  <line x1="16" y1="22" x2="20" y2="22"/>
                </svg>
              </div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Drag & drop your contract PDF</div>
              <div style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>or click to browse — supports PDF, DOCX</div>
              <button className="btn-dark" style={{ fontSize: 15, padding: "14px 32px" }}>Choose File</button>
            </div>
          )}

          {uploadState === "analyzing" && (
            <div style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 20, padding: 40 }}>
              <div style={{ marginBottom: 16, animation: "spin 2s linear infinite", display: "inline-flex" }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#C49E6C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Analyzing Your Contract</div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13, color: "#C49E6C", marginBottom: 24 }}>{progressLabel}</div>
              <div style={{ background: "#1E2228", borderRadius: 20, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #C49E6C, #F5D08A)", borderRadius: 20, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 8 }}>{progress}% complete</div>
            </div>
          )}

          {uploadState === "done" && (
            <div style={{ background: "#0F1115", border: "1px solid rgba(34,197,94,0.35)", borderRadius: 20, padding: 40, boxShadow: "0 0 40px rgba(34,197,94,0.06)" }} className="fade-up">
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Analysis Complete!</div>
              <div style={{ color: "#B5B5B5", fontSize: 15, marginBottom: 28 }}>Your contract has been analyzed by all 6 agents.</div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#ef4444" }}>8.4</div>
                  <div style={{ fontSize: 11, color: "#555", fontFamily: "IBM Plex Mono, monospace" }}>OVERALL RISK</div>
                </div>
                <div style={{ background: "rgba(245,208,138,0.07)", border: "1px solid rgba(245,208,138,0.2)", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#f59e0b" }}>7</div>
                  <div style={{ fontSize: 11, color: "#555", fontFamily: "IBM Plex Mono, monospace" }}>FLAGGED CLAUSES</div>
                </div>
                <div style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#22c55e" }}>4</div>
                  <div style={{ fontSize: 11, color: "#555", fontFamily: "IBM Plex Mono, monospace" }}>COUNTER-TERMS</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button className="btn-dark" style={{ fontSize: 15 }}>View Full Report →</button>
                <button className="btn-outline" style={{ fontSize: 15 }} onClick={() => setUploadState("idle")}>Analyze Another</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "120px 32px", background: "#000000" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>PRICING</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 10 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "#B5B5B5", fontSize: 17, marginTop: 12 }}>Start free. Pay only when you need more.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { name: "Free", price: "₹0", period: "forever", color: "#555", features: ["3 contracts/month", "Basic risk scoring", "Plain language summary", "Email support"], cta: "Get Started Free", featured: false },
              { name: "Pro", price: "₹999", period: "/month", color: "#b5924c", features: ["Unlimited contracts", "All 6 AI agents", "Counter-term generation", "Contract history", "Priority support", "Indian law database"], cta: "Start Pro", featured: true },
              { name: "Enterprise", price: "Custom", period: "", color: "#000000", features: ["Everything in Pro", "API access", "DigiLocker integration", "Custom agents", "Dedicated support", "SLA guarantee"], cta: "Contact Us", featured: false },
            ].map((p, i) => (
              <div key={i} className="card-hover pricing-card" style={{ background: p.featured ? "#0F1115" : "#080A0D", border: p.featured ? "1px solid rgba(196,158,108,0.5)" : "1px solid #1E2228", borderRadius: 24, padding: 32, position: "relative", transition: "all 0.25s" }}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#C49E6C,#F5D08A)", color: "#000", fontSize: 11, fontFamily: "IBM Plex Mono, monospace", padding: "4px 14px", borderRadius: 20, letterSpacing: "0.06em" }}>MOST POPULAR</div>}
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 40, fontWeight: 800, color: p.featured ? "#C49E6C" : "#555" }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: "#555" }}>{p.period}</span>
                </div>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <svg width="8" height="8" viewBox="0 0 12 12" style={{ flexShrink:0, marginTop:1 }}><polygon points="6,1 11,6 6,11 1,6" fill="#C49E6C"/></svg>
                    <span style={{ fontSize: 14, color: "#B5B5B5" }}>{f}</span>
                  </div>
                ))}
                <button className={p.featured ? "btn-gold" : "btn-dark"} style={{ width: "100%", marginTop: 24, fontSize: 15, padding: "14px" }}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ padding: "120px 32px", background: "#030303" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: "#C49E6C", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>TESTIMONIALS</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 10 }}>What People Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { quote: "I almost signed away my IP rights. Karrar.ai caught a critical clause and gave me the exact counter-term to send back. Saved me lakhs.", name: "Priya Mehta", role: "Freelance Designer, Mumbai", rating: 5 },
              { quote: "As a first-generation founder, I couldn't afford a lawyer for every vendor contract. This is like having a legal expert on call 24/7.", name: "Rohan Gupta", role: "Startup Founder, Bangalore", rating: 5 },
              { quote: "The plain language summary alone is worth it. My whole team can now understand contracts without calling our in-house counsel.", name: "Anita Sharma", role: "SME Owner, Delhi", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="card-hover testimonial-card" style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 20, padding: 28, transition: "all 0.28s" }}>
                <div style={{ display:"flex", gap:3, marginBottom:16 }}>
                  {Array.from({length:t.rating}).map((_,si)=>(
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#C49E6C" stroke="#C49E6C" strokeWidth="1">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                    </svg>
                  ))}
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic", color: "#B5B5B5", lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ borderTop: "1px solid #1E2228", paddingTop: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#FFFFFF" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "IBM Plex Mono, monospace", marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{ padding: "120px 32px", background: "#000000", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(196,158,108,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,158,108,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <ShieldLogo size={56} />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 64, fontWeight: 900, color: "#FFFFFF", marginTop: 20, marginBottom: 16 }}>
            Sign with <span style={{ background: "linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Clarity.</span>
          </h2>
          <p style={{ color: "#B5B5B5", fontSize: 18, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Join thousands of Indians who negotiate contracts like professionals — for free.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" style={{ fontSize: 17, padding: "18px 40px", display: "inline-flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14V4"/><polyline points="8,8 12,4 16,8"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
              Upload a Contract — It's Free
            </button>
            <button className="btn-outline" style={{ fontSize: 17, padding: "18px 40px", borderColor: "rgba(196,158,108,0.4)", color: "#FFFFFF" }}>View Pricing</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: "#050505", padding: "80px 32px 40px", color: "#555", borderTop: "1px solid #1E2228" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <ShieldLogo size={32} />
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>Karrar.ai</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", maxWidth: 280 }}>India's first multi-agent legal AI for contracts. Built for freelancers, founders, and SMEs.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[
                  <svg key="x" width="14" height="14" viewBox="0 0 24 24" fill="#B5B5B5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632z"/></svg>,
                  <svg key="li" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5B5B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                  <svg key="ig" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5B5B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="#B5B5B5"/></svg>,
                ].map((ic, i) => (
                  <div key={i} style={{ width: 36, height: 36, background: "#0F1115", border: "1px solid #1E2228", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#C49E6C"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2228"}
                  >{ic}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["How It Works", "Features", "Agents", "Pricing", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#C49E6C", letterSpacing: "0.1em", marginBottom: 16 }}>{col.title.toUpperCase()}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 14, color: "#555", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#FFFFFF"}
                    onMouseLeave={e => e.target.style.color = "#555"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1E2228", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#444" }}>© 2024 Karrar.ai · Built for India</div>
            <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#333", letterSpacing: "0.06em" }}>Hackanova 5.0 · Agentic AI Track · TCET</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
