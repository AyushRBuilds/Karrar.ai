"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./motion-helpers";

export function CTASection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "100px 20px",
        background: "#000000",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(196,158,108,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 900,
              marginBottom: 24,
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Understand Your Contracts?
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p
            style={{
              fontSize: 18,
              color: "#999",
              marginBottom: 40,
              lineHeight: 1.6,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Upload your first contract and experience AI-powered legal intelligence. No credit card required.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <motion.button
            onClick={onGetStarted}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(196,158,108,0.6), 0 20px 40px rgba(0,0,0,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 48px",
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #C49E6C 0%, #F5D08A 60%, #C49E6C 100%)",
              backgroundSize: "200% auto",
              color: "#000",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.02em",
              transition: "background-position 0.3s",
            }}
          >
            Start Analyzing Now →
          </motion.button>
        </FadeUp>

        <FadeUp delay={0.45}>
          <p
            style={{
              fontSize: 13,
              color: "#555",
              marginTop: 32,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Trusted by legal professionals, startups, and enterprises across India
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
