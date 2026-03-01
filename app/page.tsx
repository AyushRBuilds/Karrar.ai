'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// ── Floating legal icon watermarks ──────────────────────────────
const LEGAL_ICONS = [
  { x: 5, y: 12, size: 48, rot: -15, delay: 0 },
  { x: 88, y: 8, size: 36, rot: 20, delay: 0.3 },
  { x: 15, y: 72, size: 40, rot: -8, delay: 0.6 },
  { x: 78, y: 65, size: 52, rot: 12, delay: 0.2 },
  { x: 50, y: 5, size: 30, rot: 5, delay: 0.9 },
  { x: 92, y: 42, size: 38, rot: -20, delay: 0.4 },
  { x: 3, y: 45, size: 34, rot: 10, delay: 0.7 },
  { x: 60, y: 85, size: 44, rot: -5, delay: 0.1 },
  { x: 30, y: 90, size: 28, rot: 18, delay: 0.8 },
  { x: 70, y: 20, size: 32, rot: -12, delay: 0.5 },
]

const ScalesIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12 3v18M3 7l9-4 9 4M5 7l-2 7h4L5 7zM19 7l-2 7h4L19 7z" />
    <path d="M3 21h18" />
  </svg>
)
const GavelIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M14 4l6 6-8 8-6-6 8-8z" /><path d="M4 20l4-4" /><path d="M10 8l2 2" />
  </svg>
)
const ColumnIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="3" y="4" width="3" height="14" /><rect x="10.5" y="4" width="3" height="14" />
    <rect x="18" y="4" width="3" height="14" /><path d="M2 4h20M2 18h20" />
  </svg>
)
const DocIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" /><line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" /><line x1="8" y1="9" x2="10" y2="9" />
  </svg>
)
const ICONS = [ScalesIcon, GavelIcon, ColumnIcon, DocIcon, ScalesIcon, GavelIcon, ColumnIcon, DocIcon, ScalesIcon, GavelIcon]

// ── Shield Logo ──────────────────────────────────────────────────
const ShieldLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M20 2L4 9v10c0 9.4 6.8 18.2 16 20 9.2-1.8 16-10.6 16-20V9L20 2z" fill="#1c1a17" />
    <path d="M20 2L4 9v10c0 9.4 6.8 18.2 16 20 9.2-1.8 16-10.6 16-20V9L20 2z" stroke="#b5924c" strokeWidth="1.5" fill="none" />
    <text x="20" y="26" textAnchor="middle" fill="#b5924c" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif">K</text>
  </svg>
)

// ── Animated counter ─────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ── Risk Badge ───────────────────────────────────────────────────
function RiskBadge({ score }) {
  const color = score >= 8 ? "#ef4444" : score >= 6 ? "#f59e0b" : "#22c55e"
  return (
    <span style={{ background: color + "18", color, border: `1px solid ${color}40`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "IBM Plex Mono, monospace", fontWeight: 700 }}>
      🛡 {score.toFixed(1)}
    </span>
  )
}

// ── Floating dashboard panel ─────────────────────────────────────
function FloatingPanel({ style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
      borderRadius: 16, border: "1px solid #e0d9ce", padding: "16px 20px",
      boxShadow: "0 20px 60px rgba(28,26,23,0.15)", minWidth: 260, ...style
    }}>
      <div style={{ fontSize: 11, color: "#7a7068", marginBottom: 8, fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contract Analysis</div>
      {[
        { label: "High Financial Liability", clause: "Indemnification Clause", score: 8.4 },
        { label: "Unfair Non-Compete", clause: "Restrictive Covenant", score: 7.6 },
        { label: "IP Rights Waiver", clause: "Intellectual Property", score: 9.1 },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0ebe3" : "none" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1c1a17", fontFamily: "DM Sans, sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: 10, color: "#b0a898", fontFamily: "IBM Plex Mono, monospace", marginTop: 2 }}>{item.clause}</div>
          </div>
          <RiskBadge score={item.score} />
        </div>
      ))}
    </div>
  )
}

function AgentPanel({ style }) {
  const agents = [
    { name: "Completeness", color: "#3b82f6", status: "✓ Done" },
    { name: "Risk Scoring", color: "#ef4444", status: "✓ Done" },
    { name: "Negotiation", color: "#b5924c", status: "Running…" },
    { name: "Consistency", color: "#8b5cf6", status: "Queued" },
    { name: "Regulatory", color: "#22c55e", status: "Queued" },
    { name: "Explanation", color: "#f59e0b", status: "Queued" },
  ]
  return (
    <div style={{
      background: "rgba(28,26,23,0.92)", backdropFilter: "blur(12px)",
      borderRadius: 16, border: "1px solid rgba(181,146,76,0.3)", padding: "16px 20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)", minWidth: 220, ...style
    }}>
      <div style={{ fontSize: 11, color: "#b5924c", marginBottom: 10, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.08em" }}>🤖 AI AGENTS · LIVE</div>
      {agents.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, boxShadow: a.status === "Running…" ? `0 0 8px ${a.color}` : "none" }} />
            <span style={{ fontSize: 11, color: "#f5f0e8", fontFamily: "DM Sans, sans-serif" }}>{a.name}</span>
          </div>
          <span style={{ fontSize: 10, color: a.status === "✓ Done" ? "#22c55e" : a.status === "Running…" ? "#b5924c" : "#555", fontFamily: "IBM Plex Mono, monospace" }}>{a.status}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, background: "rgba(181,146,76,0.15)", borderRadius: 6, height: 4, overflow: "hidden" }}>
        <div style={{ width: "38%", height: "100%", background: "linear-gradient(90deg, #b5924c, #d4af72)", borderRadius: 6, animation: "progress 2s ease-in-out infinite" }} />
      </div>
      <div style={{ fontSize: 10, color: "#7a7068", marginTop: 6, fontFamily: "IBM Plex Mono, monospace" }}>Analysis · 38% complete</div>
    </div>
  )
}

function ScorePanel({ style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      borderRadius: 16, border: "1px solid #e0d9ce", padding: "20px",
      boxShadow: "0 20px 60px rgba(28,26,23,0.12)", textAlign: "center", minWidth: 160, ...style
    }}>
      <div style={{ fontSize: 11, color: "#7a7068", marginBottom: 8, fontFamily: "DM Sans, sans-serif", letterSpacing: "0.06em" }}>OVERALL RISK</div>
      <div style={{ fontSize: 52, fontWeight: 800, color: "#ef4444", fontFamily: "Georgia, serif", lineHeight: 1 }}>8.4</div>
      <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "IBM Plex Mono, monospace" }}>HIGH RISK</div>
      <div style={{ marginTop: 12, background: "#f5f0e8", borderRadius: 20, height: 6 }}>
        <div style={{ width: "84%", height: "100%", background: "linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius: 20 }} />
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function KarrarLanding() {
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState("Home")
  const [uploadState, setUploadState] = useState("idle")
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState("")

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const triggerAnalysis = () => {
    setUploadState("analyzing")
    const steps = [
      [10, "📤 Parsing PDF…"],
      [30, "🔍 Completeness Agent running…"],
      [50, "🛡️ Risk Scoring Agent running…"],
      [65, "🤝 Negotiation Agent running…"],
      [80, "📋 Consistency Agent running…"],
      [92, "🌍 Regulatory Agent running…"],
      [100, "✅ Analysis complete!"],
    ]
    let i = 0
    const next = () => {
      if (i < steps.length) {
        setProgress(steps[i][0])
        setProgressLabel(steps[i][1])
        i++
        setTimeout(next, i === steps.length ? 400 : 600)
      } else {
        setTimeout(() => setUploadState("done"), 300)
      }
    }
    next()
  }

  const NAV = ["Home", "How It Works", "Agents", "Features", "Pricing", "About"]
  const AGENTS = [
    { icon: "🔍", name: "Completeness Agent", role: "Finds missing annexures & schedules", color: "#3b82f6", num: "01" },
    { icon: "🛡️", name: "Risk & Red Flag Agent", role: "Scores every clause 0–100", color: "#ef4444", num: "02" },
    { icon: "🤝", name: "Negotiation Agent", role: "Generates copy-paste counter-terms", color: "#b5924c", num: "03" },
    { icon: "📋", name: "Draft Consistency Agent", role: "Catches internal contradictions", color: "#8b5cf6", num: "04" },
    { icon: "🌍", name: "Regulatory Agent", role: "Cross-checks Indian Contract Act", color: "#22c55e", num: "05" },
    { icon: "💬", name: "Explanation Agent", role: "Translates legalese to plain English", color: "#f59e0b", num: "06" },
  ]

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: "#f5f0e8", color: "#1c1a17", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes progress { 0%{width:0%} 100%{width:80%} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
        .fade-up-5 { animation: fadeUp 0.7s 0.7s ease both; }
        .fade-up-6 { animation: fadeUp 0.7s 0.85s ease both; }
        .float-1 { animation: float 5s ease-in-out infinite; }
        .float-2 { animation: float2 7s ease-in-out infinite; }
        .float-3 { animation: float 6s 1s ease-in-out infinite; }
        .btn-dark { background:#1c1a17;color:#fff;border:none;border-radius:10px;padding:14px 28px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all 0.2s;letter-spacing:0.01em; }
        .btn-dark:hover { background:#2d2a24;transform:translateY(-1px);box-shadow:0 8px 24px rgba(28,26,23,0.25); }
        .btn-outline { background:transparent;color:#1c1a17;border:1.5px solid #1c1a17;border-radius:10px;padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all 0.2s; }
        .btn-outline:hover { background:#1c1a17;color:#fff; }
        .btn-gold { background:#b5924c;color:#fff;border:none;border-radius:10px;padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all 0.2s; }
        .btn-gold:hover { background:#a07d3a;transform:translateY(-1px);box-shadow:0 8px 24px rgba(181,146,76,0.35); }
        .card-hover { transition:all 0.25s; cursor:default; }
        .card-hover:hover { transform:translateY(-4px);box-shadow:0 16px 48px rgba(28,26,23,0.12) !important; }
        .agent-card:hover .agent-num { color:#b5924c !important; }
        .nav-link { color:#7a7068;text-decoration:none;font-size:14px;font-weight:500;padding:6px 4px;border-bottom:2px solid transparent;transition:all 0.2s;cursor:pointer; }
        .nav-link:hover,.nav-link.active { color:#1c1a17;border-bottom-color:#b5924c; }
        .step-card:hover { border-color:#b5924c !important; }
        .pricing-card:hover { transform:translateY(-6px);box-shadow:0 24px 64px rgba(28,26,23,0.15) !important; }
        .upload-zone { border:2px dashed #c8bfb0;border-radius:16px;padding:48px 32px;text-align:center;transition:all 0.25s;cursor:pointer;background:rgba(255,255,255,0.6); }
        .upload-zone:hover,.upload-zone.dragging { border-color:#b5924c;background:rgba(181,146,76,0.05); }
        .testimonial-card:hover { border-color:#b5924c !important; }
        section { scroll-margin-top: 80px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(245,240,232,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e0d9ce" : "none",
        transition: "all 0.3s", padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 68, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <ShieldLogo size={36} />
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#1c1a17" }}>Karrar.ai</span>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 32 }}>
            {NAV.map(n => (
              <span key={n} className={`nav-link${activeNav === n ? " active" : ""}`} onClick={() => setActiveNav(n)}>{n}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <Link href="/login" className="btn-outline" style={{ padding: "8px 20px", fontSize: 14, textDecoration: "none", display: "inline-block" }}>Login</Link>
            <Link href="/login" className="btn-dark" style={{ padding: "8px 20px", fontSize: 14, textDecoration: "none", display: "inline-block" }}>Try Free →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 68 }}>
        {LEGAL_ICONS.map((ic, i) => {
          const Icon = ICONS[i]
          return (
            <div key={i} style={{ position: "absolute", left: `${ic.x}%`, top: `${ic.y}%`, opacity: 0.045, color: "#b5924c", transform: `rotate(${ic.rot}deg)`, pointerEvents: "none", animationDelay: `${ic.delay}s` }}>
              <Icon size={ic.size} />
            </div>
          )
        })}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #b5924c22 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(181,146,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }}>
          <div>
            <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(181,146,76,0.12)", border: "1px solid rgba(181,146,76,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b5924c", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.06em" }}>Hackanova 5.0 · Agentic AI Track</span>
            </div>
            <div className="fade-up-2" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <ShieldLogo size={52} />
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", color: "#7a7068" }}>Karrar.ai</span>
            </div>
            <h1 className="fade-up-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(44px, 5vw, 68px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
              Understand.<br />
              <span style={{ color: "#b5924c", fontStyle: "italic" }}>Negotiate.</span><br />
              Sign.
            </h1>
            <p className="fade-up-4" style={{ fontSize: 17, color: "#7a7068", lineHeight: 1.7, marginBottom: 12 }}>
              India's First <strong style={{ color: "#1c1a17" }}>Multi-Agent</strong> Legal AI.<br />
              Audit contracts, analyze risks & draft counter-terms<br />
              in plain English, <span style={{ color: "#b5924c", fontWeight: 600 }}>under Indian Law.</span>
            </p>
            <div className="fade-up-5" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <Link href="/home" className="btn-dark" style={{ fontSize: 16, padding: "16px 32px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <span>⬆</span> Upload a Contract — It's Free
              </Link>
              <button className="btn-outline" style={{ fontSize: 16, padding: "16px 24px" }}>Watch Demo →</button>
            </div>
            <div className="fade-up-6" style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              {["🔒 End-to-End Encrypted", "🇮🇳 Indian Law Grounded", "⚡ 90-Second Analysis"].map(t => (
                <span key={t} style={{ fontSize: 12, color: "#9a9088", fontFamily: "IBM Plex Mono, monospace" }}>{t}</span>
              ))}
            </div>
          </div>

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

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, #f5f0e8)", pointerEvents: "none" }} />
      </section>

      {/* STATS TICKER */}
      <div style={{ background: "#1c1a17", color: "#f5f0e8", padding: "20px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 64, justifyContent: "center", flexWrap: "wrap", padding: "0 32px" }}>
          {[
            { label: "Contracts Analyzed", value: 12400, suffix: "+" },
            { label: "Risk Clauses Flagged", value: 84000, suffix: "+" },
            { label: "Counter-Terms Generated", value: 31000, suffix: "+" },
            { label: "Compliance Rate", value: 98, suffix: "%" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 700, color: "#b5924c" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: "#7a7068", marginTop: 4, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.06em" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 32px", background: "#faf8f4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>THE PROCESS</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 800, marginTop: 10 }}>How It Works</h2>
            <p style={{ color: "#7a7068", fontSize: 17, marginTop: 12 }}>From upload to insight in under 90 seconds</p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 36, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg, #e0d9ce, #b5924c, #e0d9ce)", borderRadius: 2 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24 }}>
              {[
                { icon: "📤", num: "01", title: "Upload", desc: "Drag & drop your PDF contract. No account needed." },
                { icon: "⚡", num: "02", title: "Parallel Analysis", desc: "6 agents analyze simultaneously in under 90 seconds." },
                { icon: "📊", num: "03", title: "Risk Report", desc: "Every clause scored 0–100 and ranked by severity." },
                { icon: "📝", num: "04", title: "Counter-Terms", desc: "Copy-paste professional alternative clauses instantly." },
                { icon: "✅", num: "05", title: "Act", desc: "Sign with clarity, negotiate, or consult a lawyer." },
              ].map((s, i) => (
                <div key={i} className="step-card card-hover" style={{ background: "#fff", border: "1px solid #e0d9ce", borderRadius: 16, padding: "28px 20px", textAlign: "center", transition: "all 0.25s" }}>
                  <div style={{ width: 56, height: 56, background: "#f5f0e8", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, position: "relative", zIndex: 1 }}>
                    {s.icon}
                  </div>
                  <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#b5924c", letterSpacing: "0.1em", marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#7a7068", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS SECTION */}
      <section id="agents" style={{ padding: "100px 32px", background: "#1c1a17", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(181,146,76,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(181,146,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>THE TEAM</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 800, color: "#f5f0e8", marginTop: 10 }}>Meet Your Legal Team</h2>
            <p style={{ color: "#7a7068", fontSize: 17, marginTop: 12 }}>6 specialized AI agents working in parallel on every upload</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {AGENTS.map((a, i) => (
              <div key={i} className="card-hover agent-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px", transition: "all 0.25s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, background: a.color + "22", border: `1px solid ${a.color}44`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{a.icon}</div>
                  <span className="agent-num" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 24, fontWeight: 700, color: "#333", transition: "color 0.2s" }}>{a.num}</span>
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: "#f5f0e8", marginBottom: 8 }}>{a.name}</div>
                <div style={{ fontSize: 13, color: "#7a7068", lineHeight: 1.6 }}>{a.role}</div>
                <div style={{ marginTop: 16, width: "100%", height: 2, background: `linear-gradient(90deg, ${a.color}, transparent)`, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section style={{ padding: "100px 32px", background: "#f5f0e8" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>REAL IMPACT</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 800, marginTop: 10 }}>Before vs. After Karrar.ai</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div style={{ background: "#fff", border: "2px solid #fecaca", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 12, color: "#ef4444", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em", marginBottom: 16 }}>❌ BEFORE</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#4a4540", lineHeight: 1.8, fontStyle: "italic", borderLeft: "3px solid #fecaca", paddingLeft: 16 }}>
                "The Client may terminate this agreement at any time without prior notice and without liability for any work completed or in progress."
              </p>
              <div style={{ marginTop: 20, padding: "12px 16px", background: "#fef2f2", borderRadius: 10, fontSize: 13, color: "#7a7068" }}>
                😟 You have no idea what this means for your income.
              </div>
            </div>
            <div style={{ background: "#fff", border: "2px solid #bbf7d0", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 12, color: "#22c55e", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em", marginBottom: 16 }}>✅ AFTER</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <RiskBadge score={9.1} />
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#ef4444", fontWeight: 700 }}>CRITICAL RISK</span>
              </div>
              <p style={{ fontSize: 14, color: "#4a4540", lineHeight: 1.7, marginBottom: 16 }}>
                The client can cancel <em>anytime, for any reason</em>, and owes you <strong>₹0</strong> for completed work.
              </p>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: "#22c55e", fontFamily: "IBM Plex Mono, monospace", marginBottom: 6 }}>📝 COUNTER-TERM:</div>
                <p style={{ fontSize: 13, color: "#4a4540", fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.6 }}>
                  "Either party may terminate with 30 days written notice. Client shall pay for all work completed pro-rata."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section style={{ padding: "80px 32px", background: "#faf8f4" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>TRY IT NOW</span>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 40, fontWeight: 800, marginTop: 10, marginBottom: 12 }}>Upload Your Contract</h2>
          <p style={{ color: "#7a7068", fontSize: 16, marginBottom: 40 }}>No account required for your first analysis. Results in under 90 seconds.</p>

          {uploadState === "idle" && (
            <div
              className="upload-zone"
              onClick={triggerAnalysis}
              onDragOver={e => { e.preventDefault() }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Drag & drop your contract PDF</div>
              <div style={{ color: "#9a9088", fontSize: 14, marginBottom: 24 }}>or click to browse — supports PDF, DOCX</div>
              <button className="btn-dark" style={{ fontSize: 15, padding: "14px 32px" }}>Choose File</button>
            </div>
          )}

          {uploadState === "analyzing" && (
            <div style={{ background: "#fff", border: "1px solid #e0d9ce", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 16, animation: "spin 2s linear infinite", display: "inline-block" }}>⚙️</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Analyzing Your Contract</div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13, color: "#b5924c", marginBottom: 24 }}>{progressLabel}</div>
              <div style={{ background: "#f5f0e8", borderRadius: 20, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #b5924c, #d4af72)", borderRadius: 20, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 12, color: "#9a9088", marginTop: 8 }}>{progress}% complete</div>
            </div>
          )}

          {uploadState === "done" && (
            <div style={{ background: "#fff", border: "2px solid #22c55e", borderRadius: 20, padding: 40 }} className="fade-up">
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Analysis Complete!</div>
              <div style={{ color: "#7a7068", fontSize: 15, marginBottom: 28 }}>Your contract has been analyzed by all 6 agents.</div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#ef4444" }}>8.4</div>
                  <div style={{ fontSize: 11, color: "#9a9088", fontFamily: "IBM Plex Mono, monospace" }}>OVERALL RISK</div>
                </div>
                <div style={{ background: "#fef9ee", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#f59e0b" }}>7</div>
                  <div style={{ fontSize: 11, color: "#9a9088", fontFamily: "IBM Plex Mono, monospace" }}>FLAGGED CLAUSES</div>
                </div>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 800, color: "#22c55e" }}>4</div>
                  <div style={{ fontSize: 11, color: "#9a9088", fontFamily: "IBM Plex Mono, monospace" }}>COUNTER-TERMS</div>
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

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 32px", background: "#f5f0e8" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>PRICING</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 800, marginTop: 10 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "#7a7068", fontSize: 17, marginTop: 12 }}>Start free. Pay only when you need more.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { name: "Free", price: "₹0", period: "forever", color: "#7a7068", features: ["3 contracts/month", "Basic risk scoring", "Plain language summary", "Email support"], cta: "Get Started Free", featured: false },
              { name: "Pro", price: "₹999", period: "/month", color: "#b5924c", features: ["Unlimited contracts", "All 6 AI agents", "Counter-term generation", "Contract history", "Priority support", "Indian law database"], cta: "Start Pro", featured: true },
              { name: "Enterprise", price: "Custom", period: "", color: "#1c1a17", features: ["Everything in Pro", "API access", "DigiLocker integration", "Custom agents", "Dedicated support", "SLA guarantee"], cta: "Contact Us", featured: false },
            ].map((p, i) => (
              <div key={i} className="card-hover pricing-card" style={{ background: p.featured ? "#1c1a17" : "#fff", border: p.featured ? "2px solid #b5924c" : "1px solid #e0d9ce", borderRadius: 24, padding: 32, position: "relative", transition: "all 0.25s" }}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#b5924c", color: "#fff", fontSize: 11, fontFamily: "IBM Plex Mono, monospace", padding: "4px 14px", borderRadius: 20, letterSpacing: "0.06em" }}>MOST POPULAR</div>}
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: p.featured ? "#f5f0e8" : "#1c1a17", marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 40, fontWeight: 800, color: p.color }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: p.featured ? "#7a7068" : "#9a9088" }}>{p.period}</span>
                </div>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ color: "#b5924c", fontSize: 14 }}>✦</span>
                    <span style={{ fontSize: 14, color: p.featured ? "#c8c0b4" : "#4a4540" }}>{f}</span>
                  </div>
                ))}
                <button className={p.featured ? "btn-gold" : "btn-dark"} style={{ width: "100%", marginTop: 24, fontSize: 15, padding: "14px" }}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 32px", background: "#faf8f4" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: "#b5924c", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.12em" }}>TESTIMONIALS</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 800, marginTop: 10 }}>What People Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { quote: "I almost signed away my IP rights. Karrar.ai caught a critical clause and gave me the exact counter-term to send back. Saved me lakhs.", name: "Priya Mehta", role: "Freelance Designer, Mumbai", rating: 5 },
              { quote: "As a first-generation founder, I couldn't afford a lawyer for every vendor contract. This is like having a legal expert on call 24/7.", name: "Rohan Gupta", role: "Startup Founder, Bangalore", rating: 5 },
              { quote: "The plain language summary alone is worth it. My whole team can now understand contracts without calling our in-house counsel.", name: "Anita Sharma", role: "SME Owner, Delhi", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="card-hover testimonial-card" style={{ background: "#fff", border: "1px solid #e0d9ce", borderRadius: 20, padding: 28, transition: "all 0.25s" }}>
                <div style={{ color: "#b5924c", fontSize: 18, marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic", color: "#4a4540", lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ borderTop: "1px solid #f0ebe3", paddingTop: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1c1a17" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#9a9088", fontFamily: "IBM Plex Mono, monospace", marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 32px", background: "#1c1a17", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(181,146,76,0.1) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <ShieldLogo size={56} />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 48, fontWeight: 900, color: "#f5f0e8", marginTop: 20, marginBottom: 16 }}>
            Sign with <span style={{ color: "#b5924c", fontStyle: "italic" }}>Clarity.</span>
          </h2>
          <p style={{ color: "#7a7068", fontSize: 18, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Join thousands of Indians who negotiate contracts like professionals — for free.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/home" className="btn-gold" style={{ fontSize: 17, padding: "18px 40px", textDecoration: "none", display: "inline-block" }}>⬆ Upload a Contract — It's Free</Link>
            <button className="btn-outline" style={{ fontSize: 17, padding: "18px 40px", borderColor: "#555", color: "#f5f0e8" }}>View Pricing</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#141210", padding: "60px 32px 32px", color: "#7a7068" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <ShieldLogo size={32} />
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: "#f5f0e8" }}>Karrar.ai</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", maxWidth: 260 }}>India's first multi-agent legal AI for contracts. Built for freelancers, founders, and SMEs.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["🐦", "💼", "📸"].map((icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, background: "#1c1a17", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["How It Works", "Features", "Agents", "Pricing", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#b5924c", letterSpacing: "0.1em", marginBottom: 16 }}>{col.title.toUpperCase()}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 14, color: "#555", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#f5f0e8"}
                    onMouseLeave={e => e.target.style.color = "#555"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #222", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#444" }}>© 2024 Karrar.ai · Built for India 🇮🇳</div>
            <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#333", letterSpacing: "0.06em" }}>Hackanova 5.0 · Agentic AI Track · TCET</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
