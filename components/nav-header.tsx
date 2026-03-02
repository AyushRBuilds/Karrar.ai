"use client";

import { motion } from "framer-motion";
import { KarrarLogo } from "./karrar-logo";

export function NavHeader({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(196,158,108,0.08)",
        padding: "16px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <KarrarLogo size={24} wordmark={true} />

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          <a
            href="#features"
            style={{
              fontSize: 14,
              color: "#999",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C49E6C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          >
            Features
          </a>
          <a
            href="#agents"
            style={{
              fontSize: 14,
              color: "#999",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C49E6C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          >
            Agents
          </a>
          <a
            href="#pricing"
            style={{
              fontSize: 14,
              color: "#999",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C49E6C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          >
            Pricing
          </a>

          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 20px",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              border: "1px solid rgba(196,158,108,0.3)",
              background: "rgba(196,158,108,0.1)",
              color: "#C49E6C",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.2s",
            }}
          >
            Get Started
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}
