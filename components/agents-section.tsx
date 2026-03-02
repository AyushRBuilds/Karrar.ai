"use client";

import { StaggerContainer, StaggerChild, MotionCard, FadeUp } from "./motion-helpers";

const agents = [
  {
    name: "Completeness Agent",
    description: "Checks for missing schedules, annexures & referenced docs",
    emoji: "📋",
    color: "#3b82f6",
  },
  {
    name: "Risk Scoring Agent",
    description: "Scores every clause 0–100, flags financial exposure in ₹",
    emoji: "⚠️",
    color: "#ef4444",
  },
  {
    name: "Negotiation Agent",
    description: "Generates ready-to-send counter-terms for high-risk clauses",
    emoji: "🤝",
    color: "#C49E6C",
  },
  {
    name: "Consistency Agent",
    description: "Finds internal contradictions across the full document",
    emoji: "🔍",
    color: "#8b5cf6",
  },
  {
    name: "Regulatory Agent",
    description: "Cross-references Indian Contract Act & DPDP Act 2023",
    emoji: "⚖️",
    color: "#22c55e",
  },
  {
    name: "Explanation Agent",
    description: "Translates dense legalese into plain Hindi/English",
    emoji: "💡",
    color: "#f59e0b",
  },
];

export function AgentsSection() {
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
            Meet Your AI Agents
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
            Six specialized AI agents work in parallel to analyze, score, and negotiate your contracts.
          </p>
        </FadeUp>

        <StaggerContainer stagger={0.08}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {agents.map((agent) => (
              <StaggerChild key={agent.name}>
                <MotionCard
                  color={agent.color}
                  style={{
                    padding: 24,
                    borderRadius: 14,
                    border: `1px solid ${agent.color}22`,
                    background: `linear-gradient(135deg, #0D0F13 0%, #0A0C11 100%)`,
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{agent.emoji}</div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: agent.color,
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {agent.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#999",
                      lineHeight: 1.6,
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {agent.description}
                  </p>
                </MotionCard>
              </StaggerChild>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
