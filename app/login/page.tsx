'use client'

import { useState } from "react";
import Link from "next/link";

// ── Exact logo recreation as SVG ─────────────────────────────────
const KarrarLogo = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 110" fill="none">
    {/* Shield outer shape */}
    <path
      d="M50 4 L8 20 L8 55 C8 78 26 98 50 106 C74 98 92 78 92 55 L92 20 Z"
      fill="#1a1714"
      stroke="#1a1714"
      strokeWidth="1"
    />
    {/* Inner cream shield inset */}
    <path
      d="M50 10 L14 24 L14 55 C14 75 29 93 50 100 C71 93 86 75 86 55 L86 24 Z"
      fill="#f0ece0"
    />
    {/* Centre dividing line */}
    <line x1="50" y1="10" x2="50" y2="100" stroke="#1a1714" strokeWidth="3.5"/>
    {/* Left half fill dark */}
    <clipPath id="leftClip">
      <path d="M50 10 L14 24 L14 55 C14 75 29 93 50 100 Z"/>
    </clipPath>
    <path
      d="M50 10 L14 24 L14 55 C14 75 29 93 50 100 Z"
      fill="#1a1714"
    />
    {/* K letter on left half (cream) */}
    <text
      x="31"
      y="68"
      textAnchor="middle"
      fill="#f0ece0"
      fontSize="38"
      fontWeight="900"
      fontFamily="Georgia, serif"
      style={{ letterSpacing: "-2px" }}
    >K</text>

    {/* Brain/circuit icon on right half (dark on cream) */}
    {/* Brain outline */}
    <g transform="translate(52, 32)">
      {/* Brain blob */}
      <path
        d="M8 8 C8 4 11 2 14 3 C16 1 20 2 21 5 C24 5 26 8 25 11 C27 13 27 17 24 18 C24 21 21 23 18 22 C16 24 12 24 10 22 C7 22 5 20 5 17 C3 15 3 11 5 9 C5 8.5 6.5 7.5 8 8Z"
        fill="none"
        stroke="#1a1714"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Centre brain divide */}
      <line x1="15" y1="3" x2="15" y2="22" stroke="#1a1714" strokeWidth="1.5" strokeDasharray="2,1.5"/>
      {/* Circuit nodes */}
      <circle cx="9" cy="11" r="2" fill="#1a1714"/>
      <circle cx="21" cy="11" r="2" fill="#1a1714"/>
      <circle cx="15" cy="17" r="2" fill="#1a1714"/>
      {/* Circuit lines */}
      <line x1="9" y1="11" x2="15" y2="17" stroke="#1a1714" strokeWidth="1.5"/>
      <line x1="21" y1="11" x2="15" y2="17" stroke="#1a1714" strokeWidth="1.5"/>
      <line x1="9" y1="11" x2="6" y2="14" stroke="#1a1714" strokeWidth="1.5"/>
      <line x1="21" y1="11" x2="24" y2="14" stroke="#1a1714" strokeWidth="1.5"/>
      {/* Outer connecting dots */}
      <circle cx="6" cy="14" r="1.5" fill="#1a1714"/>
      <circle cx="24" cy="14" r="1.5" fill="#1a1714"/>
    </g>
  </svg>
);

const EyeIcon = ({ show }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9088" strokeWidth="2">
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b0a898" strokeWidth="2">
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/>
    <polyline points="9,12 11,14 15,10"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const DEMO_EMAIL = "demo@karrar.ai";
const DEMO_PASSWORD = "karrar2024";

export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [focusField, setFocusField]     = useState(null);
  const [demoFilling, setDemoFilling]   = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // ── Typewriter-style demo fill ───────────────────────
  const fillDemo = async () => {
    if (demoFilling) return;
    setDemoFilling(true);
    setEmail("");
    setPassword("");
    setError("");

    // type email char by char
    for (let i = 0; i <= DEMO_EMAIL.length; i++) {
      await new Promise(r => setTimeout(r, 38));
      setEmail(DEMO_EMAIL.slice(0, i));
    }
    await new Promise(r => setTimeout(r, 150));
    // type password char by char
    for (let i = 0; i <= DEMO_PASSWORD.length; i++) {
      await new Promise(r => setTimeout(r, 60));
      setPassword(DEMO_PASSWORD.slice(0, i));
    }
    setDemoFilling(false);
  };

  // ── Login submit ─────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  const inputBase = (field) => ({
    width: "100%",
    padding: "13px 16px",
    fontSize: 15,
    fontFamily: "DM Sans, sans-serif",
    color: "#1c1a17",
    background: "#faf8f4",
    border: `1.5px solid ${focusField === field ? "#b5924c" : "#e0d9ce"}`,
    borderRadius: 10,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #eee9df 0%, #e8e0d2 50%, #ddd5c6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "DM Sans, sans-serif",
      padding: "24px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes successPop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes demoGlow { 0%,100%{box-shadow:0 0 0 0 rgba(181,146,76,0)} 50%{box-shadow:0 0 0 4px rgba(181,146,76,0.2)} }
        .login-card { animation: fadeUp 0.55s cubic-bezier(.16,1,.3,1) both; }
        .error-card { animation: shake 0.38s ease; }
        .success-card { animation: successPop 0.4s cubic-bezier(.16,1,.3,1) both; }
        .btn-dark  { transition: all 0.2s; }
        .btn-dark:hover:not(:disabled)  { background:#2d2a24 !important; transform:translateY(-1px); box-shadow:0 8px 24px rgba(28,26,23,0.28); }
        .btn-dark:active  { transform:translateY(0) !important; }
        .btn-google:hover { background:#f5f1ea !important; border-color:#c8bfb0 !important; }
        .btn-demo { transition: all 0.2s; }
        .btn-demo:hover:not(:disabled) { background: rgba(181,146,76,0.15) !important; border-color: #b5924c !important; transform:translateY(-1px); }
        .btn-demo:active { transform:translateY(0) !important; }
        .link-btn:hover { color:#b5924c !important; cursor:pointer; }
        input::placeholder { color:#c0b8ae; }
        input:focus { background: #fff !important; }
      `}</style>

      {/* Watermark scales icons */}
      {[
        {x:"6%",y:"10%",s:90,r:-15}, {x:"82%",y:"7%",s:70,r:20},
        {x:"4%",y:"70%",s:80,r:-8},  {x:"86%",y:"68%",s:100,r:12},
        {x:"45%",y:"3%",s:56,r:5},   {x:"48%",y:"86%",s:64,r:-5},
      ].map((p,i) => (
        <svg key={i} width={p.s} height={p.s} viewBox="0 0 24 24"
          style={{position:"absolute",left:p.x,top:p.y,opacity:0.045,color:"#8a7055",transform:`rotate(${p.r}deg)`,pointerEvents:"none"}}
          fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M12 3v18M3 7l9-4 9 4M5 7l-2 7h4L5 7zM19 7l-2 7h4L19 7z"/><path d="M3 21h18"/>
        </svg>
      ))}

      {/* ── Back to Landing ── */}
      <Link href="/"
        style={{
          position:"fixed", top:20, left:24, zIndex:50,
          display:"flex", alignItems:"center", gap:7,
          background:"rgba(255,255,255,0.78)",
          backdropFilter:"blur(12px)",
          border:"1px solid #e0d9ce",
          borderRadius:10,
          padding:"9px 16px",
          fontSize:13.5,
          fontFamily:"DM Sans, sans-serif",
          fontWeight:500,
          color:"#1c1a17",
          cursor:"pointer",
          boxShadow:"0 2px 12px rgba(28,26,23,0.08)",
          transition:"all 0.2s",
          textDecoration:"none",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.96)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(28,26,23,0.14)"; e.currentTarget.style.transform="translateY(-1px)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.78)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(28,26,23,0.08)"; e.currentTarget.style.transform="translateY(0)";}}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1c1a17" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        Back to Landing
      </Link>

      {/* ── Card ── */}
      <div
        className={`login-card${error ? " error-card" : ""}`}
        style={{
          background: "#ffffff",
          borderRadius: 22,
          padding: "40px 36px 30px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(28,26,23,0.13), 0 32px 80px rgba(28,26,23,0.07)",
          border: "1px solid rgba(224,217,206,0.8)",
        }}
      >
        {/* ── Logo ── */}
        <div style={{textAlign:"center", marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
            <KarrarLogo size={64}/>
          </div>
          <div style={{
            fontFamily:"Playfair Display, serif",
            fontSize:22, fontWeight:700, color:"#1c1a17",
            letterSpacing:"0.01em", lineHeight:1.2,
          }}>Karrar.ai</div>
          <div style={{
            fontSize:12.5, color:"#a8a09a",
            marginTop:4, fontFamily:"DM Sans, sans-serif",
            letterSpacing:"0.04em",
          }}>Multi-Agent Legal Intelligence</div>
        </div>

        {/* Divider */}
        <div style={{height:1, background:"linear-gradient(90deg,transparent,#e8e2d8,transparent)", margin:"22px 0"}}/>

        {loginSuccess ? (
          /* ── Success ── */
          <div className="success-card" style={{textAlign:"center", padding:"16px 0"}}>
            <div style={{
              width:72, height:72, background:"#f0fdf4", border:"2px solid #bbf7d0",
              borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 16px", fontSize:32,
            }}>✅</div>
            <div style={{fontFamily:"Playfair Display, serif",fontSize:22,fontWeight:700,color:"#166534",marginBottom:8}}>
              Welcome back!
            </div>
            <div style={{fontSize:14,color:"#6a9a78",marginBottom:24}}>
              Redirecting to your dashboard…
            </div>
            <div style={{background:"#f0fdf4",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0,animation:"spin 1s linear infinite"}}/>
              <span style={{fontSize:13,color:"#166534",fontFamily:"IBM Plex Mono, monospace"}}>
                Loading dashboard…
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* ── Heading ── */}
            <h1 style={{
              fontFamily:"Playfair Display, serif",
              fontSize:26, fontWeight:700, color:"#1c1a17",
              textAlign:"center", marginBottom:22,
            }}>Welcome Back</h1>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div style={{marginBottom:12}}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e=>{setEmail(e.target.value);setError("");}}
                  onFocus={()=>setFocusField("email")}
                  onBlur={()=>setFocusField(null)}
                  style={inputBase("email")}
                  required
                />
              </div>

              {/* Password */}
              <div style={{marginBottom:12, position:"relative"}}>
                <input
                  type={showPassword?"text":"password"}
                  placeholder="Password"
                  value={password}
                  onChange={e=>{setPassword(e.target.value);setError("");}}
                  onFocus={()=>setFocusField("password")}
                  onBlur={()=>setFocusField(null)}
                  style={{...inputBase("password"), paddingRight:46}}
                  required
                />
                <button type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",padding:4,cursor:"pointer",display:"flex",alignItems:"center",opacity:0.7,transition:"opacity 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="0.7"}
                >
                  <EyeIcon show={showPassword}/>
                </button>
              </div>

              {/* Remember me row */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}
                  onClick={()=>setRememberMe(!rememberMe)}>
                  <div style={{
                    width:16,height:16,
                    border:`1.5px solid ${rememberMe?"#b5924c":"#c8bfb0"}`,
                    borderRadius:4,
                    background:rememberMe?"#b5924c":"#fff",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0, transition:"all 0.18s",
                  }}>
                    {rememberMe && (
                      <svg width="10" height="8" viewBox="0 0 10 8">
                        <polyline points="1,4 4,7 9,1" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{fontSize:13.5,color:"#7a7068",userSelect:"none"}}>Remember me</span>
                </label>
                <span className="link-btn" style={{fontSize:13,color:"#9a9088",transition:"color 0.2s"}}>
                  Forgot Password?
                </span>
              </div>

              {/* Error banner */}
              {error && (
                <div style={{
                  background:"#fef2f2",border:"1px solid #fecaca",borderRadius:9,
                  padding:"10px 14px",fontSize:13,color:"#dc2626",
                  marginBottom:14,display:"flex",alignItems:"center",gap:8,
                }}>
                  <span>⚠️</span><span>{error}</span>
                </div>
              )}

              {/* ── Login button ── */}
              <button type="submit" className="btn-dark"
                disabled={loading}
                style={{
                  width:"100%",padding:"14px",
                  background:"#1c1a17",color:"#fff",
                  border:"none",borderRadius:11,
                  fontSize:15.5,fontFamily:"DM Sans, sans-serif",
                  fontWeight:600,cursor:loading?"not-allowed":"pointer",
                  letterSpacing:"0.01em",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  opacity:loading?0.85:1,
                  marginBottom:10,
                }}>
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{animation:"spin 0.7s linear infinite"}}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Verifying…
                  </>
                ) : "Login"}
              </button>

              {/* ── 🎯 Demo button ── */}
              <button type="button" className="btn-demo"
                disabled={demoFilling}
                onClick={fillDemo}
                style={{
                  width:"100%",padding:"12px",
                  background:"rgba(181,146,76,0.08)",
                  color:demoFilling?"#b5924c":"#9a7840",
                  border:"1.5px solid rgba(181,146,76,0.3)",
                  borderRadius:11,
                  fontSize:14,fontFamily:"IBM Plex Mono, monospace",
                  fontWeight:500,cursor:demoFilling?"not-allowed":"pointer",
                  letterSpacing:"0.04em",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  marginBottom:10,
                  animation: demoFilling?"none":"demoGlow 2.5s ease-in-out infinite",
                }}>
                {demoFilling ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{animation:"spin 0.7s linear infinite", color:"#b5924c"}}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Filling credentials…
                  </>
                ) : (
                  <>
                    <span style={{fontSize:15}}>💡</span>
                    Use Demo Credentials
                  </>
                )}
              </button>

              {/* Google button */}
              <button type="button" className="btn-google"
                style={{
                  width:"100%",padding:"12px",
                  background:"#fff",color:"#1c1a17",
                  border:"1.5px solid #e0d9ce",borderRadius:11,
                  fontSize:14.5,fontFamily:"DM Sans, sans-serif",
                  fontWeight:500,cursor:"pointer",
                  transition:"all 0.2s",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                }}>
                <GoogleIcon/>
                Continue with Google
              </button>
            </form>

            {/* Trust badges */}
            <div style={{marginTop:22,display:"flex",flexDirection:"column",gap:8}}>
              {[
                "Your contracts are end-to-end encrypted",
                "Your contracts are never used for training",
                "Compliant with Indian data protection standards",
              ].map((txt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <ShieldCheckIcon/>
                  <span style={{fontSize:12,color:"#b0a898"}}>{txt}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom */}
        {!loginSuccess && (
          <div style={{
            marginTop:22,paddingTop:18,
            borderTop:"1px solid #f0ece4",
            display:"flex",justifyContent:"space-between",alignItems:"center",
          }}>
            <span style={{fontSize:13,color:"#9a9088"}}>Don't have an account?</span>
            <span className="link-btn"
              style={{fontSize:13,color:"#1c1a17",fontWeight:700,transition:"color 0.2s"}}>
              Sign up ›
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
