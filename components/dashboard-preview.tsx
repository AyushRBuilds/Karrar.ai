"use client";

import { FadeUp } from "./motion-helpers";

export function DashboardPreview() {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 20px",
        background: "#000000",
        color: "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              marginBottom: 16,
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Your Analysis Dashboard
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontSize: 18,
              color: "#666",
              maxWidth: 600,
              margin: "0 auto 60px",
              textAlign: "center",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Upload any contract and get instant AI-powered insights across six specialized dimensions.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(196,158,108,0.15)",
              background: "linear-gradient(135deg, #0D0F13 0%, #0A0C11 100%)",
              padding: 2,
              overflow: "hidden",
            }}
          >
            {/* Mock dashboard image placeholder */}
            <div
              style={{
                background: "linear-gradient(135deg, #0F1115 0%, #131518 100%)",
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#444",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Dashboard Preview - Contract Analysis Interface
            </div>
          </div>
        </FadeUp>

        {/* Key metrics */}
        <FadeUp delay={0.3}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              marginTop: 60,
            }}
          >
            {[
              { label: "AI Agents Running", value: "6" },
              { label: "Clauses Analyzed", value: "100+" },
              { label: "Risk Flags", value: "Real-time" },
              { label: "Counter Terms", value: "Auto-Generated" },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  padding: 20,
                  borderRadius: 12,
                  border: "1px solid rgba(196,158,108,0.1)",
                  background: "rgba(196,158,108,0.03)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#C49E6C",
                    marginBottom: 8,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
