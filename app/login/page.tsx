'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Logo Component using actual image ─────────────────────────────
const KarrarLogo = ({ size = 56 }) => (
  <Image
    src="/karrar-logo.png"
    alt="Karrar.ai"
    width={size}
    height={size}
    priority
  />
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    {/* Custom Google-inspired icon in Karrar theme */}
    <circle cx="12" cy="12" r="9" stroke="#b5924c" strokeWidth="1.5" fill="none"/>
    <path d="M12 6C9.24 6 7 8.24 7 11c0 1.66.75 3.13 1.9 4.1l-1.2 1.5c-.3.4-.1.95.35 1.05.45.1.85-.15.98-.55l1.15-1.45c.5.15 1.02.25 1.57.25 2.76 0 5-2.24 5-5S14.76 6 12 6z" fill="#b5924c"/>
    <circle cx="12" cy="11" r="2.5" fill="#f5f0e8"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5924c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Custom envelope icon */}
    <path d="M4 5h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z"/>
    <path d="M23 6L12 13 1 6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5924c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Custom lock icon */}
    <rect x="4" y="10" width="16" height="10" rx="1.5"/>
    <path d="M7 10V7c0-2.21 1.79-4 4-4s4 1.79 4 4v3"/>
    <circle cx="12" cy="15" r="1.5" fill="#b5924c"/>
  </svg>
);

const CheckboxIcon = ({ checked }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={checked ? "#b5924c" : "#d4cfc2"} strokeWidth="1.5" fill={checked ? "#fef9ee" : "none"}/>
    {checked && <path d="M8 12l3 3 5-6" stroke="#b5924c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
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
              <div style={{marginBottom:12, position:"relative"}}>
                <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",pointerEvents:"none"}}>
                  <EmailIcon/>
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e=>{setEmail(e.target.value);setError("");}}
                  onFocus={()=>setFocusField("email")}
                  onBlur={()=>setFocusField(null)}
                  style={{...inputBase("email"), paddingLeft:46}}
                  required
                />
              </div>

              {/* Password */}
              <div style={{marginBottom:12, position:"relative"}}>
                <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",pointerEvents:"none"}}>
                  <LockIcon/>
                </div>
                <input
                  type={showPassword?"text":"password"}
                  placeholder="Password"
                  value={password}
                  onChange={e=>{setPassword(e.target.value);setError("");}}
                  onFocus={()=>setFocusField("password")}
                  onBlur={()=>setFocusField(null)}
                  style={{...inputBase("password"), paddingLeft:46, paddingRight:46}}
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626" stroke="none">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01" stroke="#fef2f2" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{error}</span>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5924c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v6M5 7l4 4M19 7l-4 4M12 15c2 0 4-1 4-3s-2-3-4-3-4 1-4 3 2 3 4 3z"/>
                    </svg>
                    Try Demo Credentials
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
