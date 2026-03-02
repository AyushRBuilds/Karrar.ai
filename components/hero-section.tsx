"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedHeadline, FloatingBadge, FadeUp } from "./motion-helpers";
import { LEGAL_ICONS } from "./watermark-icons";
import { KarrarLogo } from "./karrar-logo";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000000",
        color: "#FFFFFF",
      }}
    >
      {/* Cursor glow */}
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 1,
          left: mouse.x - 300,
          top: mouse.y - 300,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(196,158,108,0.12) 0%, rgba(196,158,108,0.04) 35%, transparent 70%)",
          borderRadius: "50%",
          transition: "left 0.08s ease-out, top 0.08s ease-out",
        }}
      />

      {/* Dot grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #b5924c1a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Watermark legal icons */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="iconGlow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {LEGAL_ICONS.map((icon, i) => {
          const Ic = icon.Ic;
          return (
            <g
              key={i}
              transform={`translate(${icon.x}, ${icon.y}) rotate(${icon.rot})`}
              opacity="0.08"
              filter="url(#iconGlow)"
            >
              <Ic size={icon.size} />
            </g>
          );
        })}
      </svg>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <FadeUp delay={0}>
          <div style={{ marginBottom: 20 }}>
            <FloatingBadge>
              <motion.div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(196,158,108,0.25)",
                  background: "rgba(196,158,108,0.06)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#C49E6C",
                  fontFamily: "DM Sans, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                ✨ AI-Powered Legal Intelligence
              </motion.div>
            </FloatingBadge>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <AnimatedHeadline
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.1,
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Audit, Negotiate & Understand Your Contracts Instantly
          </AnimatedHeadline>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p
            style={{
              fontSize: 18,
              color: "#999",
              maxWidth: 600,
              margin: "0 auto 32px",
              lineHeight: 1.6,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
            }}
          >
            Meet Karrar — the AI agent that reads between the lines, flags hidden risks, and generates negotiation strategies in seconds.
          </p>
        </FadeUp>

        <FadeUp delay={0.45}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(196,158,108,0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "14px 36px",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #C49E6C 0%, #F5D08A 60%, #C49E6C 100%)",
                color: "#000",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Get Started Free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, borderColor: "rgba(196,158,108,0.5)" }}
              style={{
                padding: "14px 36px",
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 12,
                border: "1px solid rgba(196,158,108,0.2)",
                background: "transparent",
                color: "#CCC",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                transition: "all 0.2s",
              }}
            >
              View Demo
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
