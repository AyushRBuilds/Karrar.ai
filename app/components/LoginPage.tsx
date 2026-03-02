"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KarrarLogo } from "./KarrarLogo";

export function LoginPage({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans, sans-serif",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          left: mouse.x - 300,
          top: mouse.y - 300,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(196,158,108,0.08) 0%, rgba(196,158,108,0.03) 35%, transparent 70%)",
          borderRadius: "50%",
          transition: "left 0.08s ease-out, top 0.08s ease-out",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #b5924c1a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
          animation: "gridPulse 6s ease-in-out infinite",
        }}
      />

      {/* Radial ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(196,158,108,0.055) 0%, transparent 60%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(196,158,108,0.025) 0%, transparent 60%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onBack}
        style={{
          position: "fixed",
          top: 24,
          left: 28,
          background: "rgba(15,16,20,0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid #1E2228",
          borderRadius: 8,
          color: "#666",
          fontSize: 13,
          padding: "7px 15px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          zIndex: 100,
          fontFamily: "DM Sans, sans-serif",
        }}
        whileHover={{ borderColor: "rgba(196,158,108,0.35)", color: "#C49E6C" }}
        whileTap={{ scale: 0.97 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </motion.button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 400,
          margin: "0 16px",
          background: "linear-gradient(160deg, #0E1016 0%, #090A0D 100%)",
          border: "1px solid #1A1D26",
          borderRadius: 22,
          padding: "36px 32px 28px",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(196,158,108,0.08), 0 0 80px rgba(196,158,108,0.03)",
        }}
      >
        {/* Top shimmer line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(196,158,108,0.6), transparent)",
            borderRadius: 1,
          }}
        />
        {/* Bottom faint line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "30%",
            right: "30%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(196,158,108,0.15), transparent)",
            borderRadius: 1,
          }}
        />

        {/* Logo lockup */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ textAlign: "center", marginBottom: 6 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <KarrarLogo size={44} wordmark={true} />
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 10.5,
              color: "#8B7355",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Multi-Agent Legal Intelligence
          </div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            margin: "22px 0 24px",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #1E2228 20%, #1E2228 80%, transparent)",
          }}
        />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ textAlign: "center", marginBottom: 26 }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 27,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              marginBottom: 5,
            }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p style={{ fontSize: 13.5, color: "#4A4F5E", fontWeight: 400 }}>
            {isSignUp
              ? "Start reviewing contracts with AI today"
              : "Sign in to your Karrar.ai account"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {isSignUp && <input className="li" type="text" placeholder="Full Name" />}

          <input
            className="li"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              className="li"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: 46 }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: showPass ? "#C49E6C" : "#3A3D48",
                padding: 0,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
              }}
            >
              {showPass ? (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {!isSignUp && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                className="lchk"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                id="remember"
              />
              <label
                htmlFor="remember"
                style={{
                  fontSize: 13,
                  color: "#777",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Remember me
              </label>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEmail("demo@karrar.ai");
              setPassword("Demo@1234");
              setTimeout(onSuccess, 400);
            }}
            className="lgbtn"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="ggbtn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Demo credentials */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#1A1D24" }} />
            <span style={{ fontSize: 11, color: "#333" }}>or try a demo</span>
            <div style={{ flex: 1, height: 1, background: "#1A1D24" }} />
          </div>

          <motion.button
            whileHover={{
              scale: 1.01,
              borderColor: "rgba(196,158,108,0.5)",
              background: "rgba(196,158,108,0.06)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEmail("demo@karrar.ai");
              setPassword("Demo@1234");
              setIsSignUp(false);
              setTimeout(onSuccess, 400);
            }}
            style={{
              width: "100%",
              background: "transparent",
              border: "1px dashed rgba(196,158,108,0.25)",
              borderRadius: 10,
              padding: "11px 16px",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              color: "#C49E6C",
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Use Demo Credentials
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8 }}
        >
          {[
            "Your contracts are end-to-end encrypted",
            "Your contracts are never used for training",
            "Compliant with Indian data protection standards",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(196,158,108,0.5)"
                strokeWidth="2.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{ fontSize: 12, color: "#3A3F50" }}>{t}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom switch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            marginTop: 22,
            textAlign: "center",
            fontSize: 13,
            color: "#3A3F50",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <span
                className="lnk"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </span>
            </span>
          ) : (
            <>
              <span
                className="lnk"
                style={{ fontWeight: 500 }}
                onClick={() => setIsSignUp(false)}
              >
                Forgot Password?
              </span>
              <span>
                No account?{" "}
                <span
                  className="lnk"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up ›
                </span>
              </span>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
