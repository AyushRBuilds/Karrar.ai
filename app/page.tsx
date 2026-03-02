"use client";

import { NavHeader } from "@/components/nav-header";

export default function Page() {
  const handleGetStarted = () => {
    alert("Get started functionality coming soon!");
  };

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", fontFamily: "DM Sans, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      <NavHeader onGetStarted={handleGetStarted} />
      
      <main style={{ paddingTop: 72 }}>
        {/* Hero Section */}
        <section style={{ padding: "80px 32px", textAlign: "center" }}>
          <h1 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 56,
            fontWeight: 900,
            marginBottom: 16,
            color: "#FFFFFF"
          }}>AI-Powered Legal Contract Analysis</h1>
          <p style={{ fontSize: 18, color: "#888", maxWidth: 600, margin: "0 auto 32px" }}>
            Analyze, negotiate, and understand contracts in seconds with our intelligent AI agents.
          </p>
          <button onClick={handleGetStarted} style={{
            background: "linear-gradient(135deg, #C49E6C, #F5D08A)",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "12px 32px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif"
          }}>Get Started Free</button>
        </section>

        {/* Features Section */}
        <section style={{ padding: "80px 32px", background: "rgba(196,158,108,0.02)" }}>
          <h2 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 40,
            fontWeight: 900,
            marginBottom: 48,
            textAlign: "center",
            color: "#FFFFFF"
          }}>Intelligent AI Agents</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto"
          }}>
            {[
              { title: "Risk Scoring", desc: "Identifies and scores financial and legal risks" },
              { title: "Completeness Check", desc: "Ensures all required clauses are present" },
              { title: "Negotiation AI", desc: "Generates counter-terms automatically" },
              { title: "Regulatory Review", desc: "Checks compliance with Indian law" },
              { title: "Consistency Check", desc: "Finds contradictions and inconsistencies" },
              { title: "Plain Language", desc: "Translates legal jargon to simple language" }
            ].map((agent, i) => (
              <div key={i} style={{
                background: "rgba(15,17,21,0.8)",
                border: "1px solid rgba(196,158,108,0.1)",
                borderRadius: 12,
                padding: 24
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#C49E6C" }}>
                  {agent.title}
                </h3>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: "80px 32px", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 40,
            fontWeight: 900,
            marginBottom: 24,
            color: "#FFFFFF"
          }}>Ready to analyze your contracts?</h2>
          <p style={{ fontSize: 16, color: "#888", marginBottom: 32 }}>
            Join thousands of legal professionals using Karrar.ai
          </p>
          <button onClick={handleGetStarted} style={{
            background: "linear-gradient(135deg, #C49E6C, #F5D08A)",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "14px 40px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif"
          }}>Start Free Trial</button>
        </section>
      </main>
    </div>
  );
}
        <KarrarLogo size={28} />
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
              <div key={i} style={{ background: "#0F1115", border: "1px solid #1E2228", borderRadius: 12, padding: "14px 16px" }}>
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
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const dashRef = useRef(null);
  const dashProgress = useScrollProgress(dashRef);
  const [uploadState, setUploadState] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

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
    <div style={{ fontFamily: "DM Sans, sans-serif", background: "#000000", color: "#FFFFFF", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-16px)} }
        @keyframes float2  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes goldBeam { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes icFloat { 0%,100%{transform:translateY(0) rotate(var(--rot))} 50%{transform:translateY(-12px) rotate(var(--rot))} }

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
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.7) !important; }
        .agent-card:hover { border-color: rgba(196,158,108,0.4) !important; }

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
            <button className="btn-ghost" style={{ padding:"8px 20px", fontSize:13 }}>Login</button>
            <button className="btn-gold" style={{ padding:"9px 22px", fontSize:13 }}>Try Free →</button>
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
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 55% at 50% 45%, rgba(196,158,108,0.10) 0%, rgba(196,158,108,0.03) 50%, transparent 75%)", pointerEvents:"none" }} />
        {/* Subtle horizontal beam */}
        <div style={{ position:"absolute", top:"42%", left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, rgba(196,158,108,0.15) 30%, rgba(245,208,138,0.3) 50%, rgba(196,158,108,0.15) 70%, transparent 100%)", pointerEvents:"none", animation:"goldBeam 6s ease-in-out infinite" }} />

        {/* Content — centered */}
        <div style={{ textAlign:"center", maxWidth:860, padding:"0 32px", position:"relative", zIndex:1 }}>

          {/* Badge */}
          <div className="fade-up-1" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(196,158,108,0.08)", border:"1px solid rgba(196,158,108,0.22)", borderRadius:20, padding:"6px 16px", marginBottom:32 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"linear-gradient(90deg,#C49E6C,#F5D08A)", display:"inline-block", animation:"pulse 2s infinite" }} />
            <span style={{ fontSize:12, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.07em" }}>Hackanova 5.0 · Agentic AI Track</span>
          </div>

          {/* Logo lockup */}
          <div className="fade-up-2" style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <KarrarLogo size={52} />
          </div>

          {/* Headline */}
          <h1 className="fade-up-3" style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(56px, 8vw, 96px)", fontWeight:900, lineHeight:1.02, marginBottom:28, textShadow:"0 0 100px rgba(196,158,108,0.12)" }}>
            Understand.{" "}
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Negotiate.</span>{" "}
            Sign.
          </h1>

          {/* Subhead */}
          <p className="fade-up-4" style={{ fontSize:"clamp(16px, 2vw, 20px)", color:"#888", lineHeight:1.75, marginBottom:8 }}>
            <strong style={{ color:"#FFFFFF" }}>India's First Multi-Agent Legal AI.</strong>
          </p>
          <p className="fade-up-4" style={{ fontSize:"clamp(14px, 1.6vw, 17px)", color:"#666", lineHeight:1.75, marginBottom:40 }}>
            Audit Contracts, Analyze Risks &amp; Draft Counter-Terms in Plain English,{" "}
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:600 }}>Under Indian Law.</span>
          </p>

          {/* CTA */}
          <div className="fade-up-5" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
            <button className="btn-gold" style={{ padding:"16px 36px", fontSize:16, display:"flex", alignItems:"center", gap:10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14V4"/><polyline points="8,8 12,4 16,8"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
              Upload a Contract — It's Free
            </button>
            <button className="btn-ghost" style={{ padding:"16px 28px", fontSize:16 }}>Watch Demo →</button>
          </div>

          {/* Trust badges */}
          <div className="fade-up-6" style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}>
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
          </div>

          {/* Legal icon row (like Image 1 bottom) */}
          <div className="fade-up-6" style={{ display:"flex", gap:24, justifyContent:"center", marginTop:52, opacity:0.25, color:"#C49E6C" }}>
            {[WmScales, WmSeal, WmQuill, WmPillar, WmScales].map((Ic, i) => <Ic key={i} size={28} />)}
          </div>
        </div>

        {/* Bottom fade into dashboard section */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:"linear-gradient(transparent, #000000)", pointerEvents:"none" }} />
      </section>

      {/* ── DASHBOARD SCROLL-REVEAL SECTION ─────────────── */}
      <section ref={dashRef} style={{ padding:"80px 0 0", background:"#000000", position:"relative", overflow:"hidden" }}>
        {/* Section label */}
        <div style={{ textAlign:"center", marginBottom:48, padding:"0 32px" }}>
          <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.14em", display:"block", marginBottom:12 }}>THE PLATFORM</span>
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,60px)", fontWeight:900, color:"#FFFFFF", lineHeight:1.1 }}>
            Your Intelligent<br />
            <span style={{ background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Contract Command Centre</span>
          </h2>
          <p style={{ color:"#555", fontSize:16, marginTop:16 }}>6 AI agents. Real-time risk scoring. Counter-terms in one click.</p>
        </div>

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
        <div style={{ display:"flex", gap:56, justifyContent:"center", flexWrap:"wrap", padding:"0 32px" }}>
          {[
            { label:"Contracts Analyzed", value:12400, suffix:"+" },
            { label:"Risk Clauses Flagged", value:84000, suffix:"+" },
            { label:"Counter-Terms Generated", value:31000, suffix:"+" },
            { label:"Compliance Rate", value:98, suffix:"%" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"Playfair Display, serif", fontSize:38, fontWeight:700, background:"linear-gradient(90deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize:11, color:"#444", marginTop:6, fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.08em" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section id="how-it-works" style={{ padding:"120px 32px", background:"#000000" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>THE PROCESS</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>From Upload to Insight</h2>
            <p style={{ color:"#666", fontSize:16, marginTop:12 }}>in under 90 seconds</p>
          </div>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:36, left:"8%", right:"8%", height:1, background:"linear-gradient(90deg,transparent,rgba(196,158,108,0.4),transparent)" }} />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20 }}>
              {[
                { num:"01", title:"Upload",            desc:"Drag & drop your PDF contract. No account needed." },
                { num:"02", title:"Parallel Analysis", desc:"6 agents analyze simultaneously in under 90 seconds." },
                { num:"03", title:"Risk Report",       desc:"Every clause scored 0–100 and ranked by severity." },
                { num:"04", title:"Counter-Terms",     desc:"Copy-paste professional alternative clauses instantly." },
                { num:"05", title:"Act",               desc:"Sign with clarity, negotiate, or consult a lawyer." },
              ].map((s,i) => (
                <div key={i} className="card-hover" style={{ background:"#0A0B0E", border:"1px solid #1E2228", borderRadius:16, padding:"28px 18px", textAlign:"center", transition:"all 0.28s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,158,108,0.35)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#1E2228"}}>
                  <div style={{ width:52, height:52, background:"rgba(196,158,108,0.06)", border:"1px solid rgba(196,158,108,0.12)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <span style={{ fontFamily:"Playfair Display, serif", fontSize:22, fontWeight:900, background:"linear-gradient(135deg,#C49E6C,#F5D08A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{i+1}</span>
                  </div>
                  <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10, color:"#C49E6C", letterSpacing:"0.1em", marginBottom:8 }}>{s.num}</div>
                  <div style={{ fontFamily:"Playfair Display, serif", fontSize:16, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontSize:12, color:"#555", lineHeight:1.65 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENTS ────────────────────────────────────────── */}
      <section id="agents" style={{ padding:"120px 32px", background:"#030303", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(196,158,108,0.06) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>THE TEAM</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Meet Your Legal Team</h2>
            <p style={{ color:"#666", fontSize:16, marginTop:12 }}>6 specialized AI agents working in parallel on every upload</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { name:"Completeness Agent",      role:"Finds missing annexures & schedules",  color:"#3b82f6", num:"01", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><polyline points="8,10 10,12 13,8"/></svg> },
              { name:"Risk & Red Flag Agent",   role:"Scores every clause 0–100",            color:"#ef4444", num:"02", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg> },
              { name:"Negotiation Agent",       role:"Generates copy-paste counter-terms",   color:"#C49E6C", num:"03", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 16H3v-4"/><path d="M3 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M17 8h4v4"/><path d="M21 12c0 4.4-3.6 8-8 8s-8-3.6-8-8"/></svg> },
              { name:"Draft Consistency Agent", role:"Catches internal contradictions",      color:"#8b5cf6", num:"04", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="11" height="14" rx="1.5"/><rect x="10" y="3" width="11" height="14" rx="1.5" fill="#030303"/><line x1="13" y1="8" x2="18" y2="8"/><line x1="13" y1="11" x2="17" y2="11"/></svg> },
              { name:"Regulatory Agent",        role:"Cross-checks Indian Contract Act",     color:"#22c55e", num:"05", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 3 9 14 14 0 0 1-3 9 14 14 0 0 1-3-9 14 14 0 0 1 3-9z"/></svg> },
              { name:"Explanation Agent",       role:"Translates legalese to plain English", color:"#f59e0b", num:"06", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="13" y1="10" x2="16" y2="10"/><line x1="9" y1="13" x2="15" y2="13"/></svg> },
            ].map((a,i) => (
              <div key={i} className="card-hover agent-card" style={{ background:"#0A0B0E", border:"1px solid #1E2228", borderRadius:20, padding:"28px", transition:"all 0.25s", cursor:"default" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{ width:46, height:46, background:a.color+"18", border:`1px solid ${a.color}30`, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", color:a.color }}>
                    {a.icon}
                  </div>
                  <span style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:22, fontWeight:700, color:"#1A1A1A", transition:"color 0.2s" }}>{a.num}</span>
                </div>
                <div style={{ fontFamily:"Playfair Display, serif", fontSize:17, fontWeight:700, color:"#FFFFFF", marginBottom:8 }}>{a.name}</div>
                <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{a.role}</div>
                <div style={{ marginTop:16, height:2, background:`linear-gradient(90deg,${a.color},transparent)`, borderRadius:2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────── */}
      <section id="features" style={{ padding:"120px 32px", background:"#000000" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>REAL IMPACT</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Before vs. After Karrar.ai</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
            <div style={{ background:"#0A0B0E", border:"1px solid rgba(239,68,68,0.2)", borderRadius:20, padding:32 }}>
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
            </div>
            <div style={{ background:"#0A0B0E", border:"1px solid rgba(34,197,94,0.2)", borderRadius:20, padding:32 }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── UPLOAD DEMO ───────────────────────────────────── */}
      <section style={{ padding:"120px 32px", background:"#030303" }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>TRY IT NOW</span>
          <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:900, color:"#FFFFFF", marginTop:10, marginBottom:12 }}>Upload Your Contract</h2>
          <p style={{ color:"#555", fontSize:15, marginBottom:40 }}>No account required. Results in under 90 seconds.</p>

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
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ fontSize:11, color:"#C49E6C", fontFamily:"IBM Plex Mono, monospace", letterSpacing:"0.12em" }}>PRICING</span>
            <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#FFFFFF", marginTop:10 }}>Simple, Transparent Pricing</h2>
            <p style={{ color:"#555", fontSize:16, marginTop:12 }}>Start free. Pay only when you need more.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { name:"Free", price:"₹0", period:"forever", features:["3 contracts/month","Basic risk scoring","Plain language summary","Email support"], cta:"Get Started Free", featured:false },
              { name:"Pro", price:"₹999", period:"/month", features:["Unlimited contracts","All 6 AI agents","Counter-term generation","Contract history","Priority support","Indian law database"], cta:"Start Pro", featured:true },
              { name:"Enterprise", price:"Custom", period:"", features:["Everything in Pro","API access","DigiLocker integration","Custom agents","Dedicated support","SLA guarantee"], cta:"Contact Us", featured:false },
            ].map((p,i) => (
              <div key={i} style={{ background:p.featured ? "#0F1115" : "#08090C", border:p.featured ? "1px solid rgba(196,158,108,0.45)" : "1px solid #1A1B1E", borderRadius:22, padding:32, position:"relative", transition:"all 0.28s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 28px 70px rgba(0,0,0,0.7)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""}}>
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
                <button className={p.featured ? "btn-gold" : "btn-dark"} style={{ width:"100%", marginTop:24, fontSize:14, padding:"13px" }}>{p.cta}</button>
              </div>
            ))}
          </div>
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
            <button className="btn-gold" style={{ fontSize:17, padding:"17px 40px" }}>Upload a Contract — It's Free</button>
            <button className="btn-ghost" style={{ fontSize:17, padding:"17px 40px" }}>View Pricing</button>
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
            <div style={{ fontFamily:"IBM Plex Mono, monospace", fontSize:10, color:"#2A2A2A", letterSpacing:"0.06em" }}>Hackanova 5.0 · Agentic AI Track · TCET</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
