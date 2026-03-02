"use client";

export default function Page() {
  return (
    <div style={{
      background: "#000000",
      color: "#FFFFFF",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      width: "100%"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000000; color: #FFFFFF; }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(196,158,108,0.1)",
        padding: "16px 32px",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 900,
          color: "#C49E6C"
        }}>Karrar.ai</div>
        <button style={{
          background: "linear-gradient(135deg, #C49E6C, #F5D08A)",
          color: "#000",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif"
        }}>Get Started</button>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: 72 }}>
        {/* Hero */}
        <section style={{
          padding: "100px 32px",
          textAlign: "center",
          maxWidth: 1200,
          margin: "0 auto"
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 8vw, 64px)",
            fontWeight: 900,
            marginBottom: 24,
            lineHeight: 1.2
          }}>
            AI-Powered Legal Contract Analysis
          </h1>
          <p style={{
            fontSize: 18,
            color: "#888",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.6
          }}>
            Analyze, negotiate, and understand contracts in seconds with intelligent AI agents.
          </p>
          <button style={{
            background: "linear-gradient(135deg, #C49E6C, #F5D08A)",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "14px 40px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.3s ease"
          }}>Start Free Trial</button>
        </section>

        {/* Features Grid */}
        <section style={{
          padding: "80px 32px",
          background: "rgba(196,158,108,0.03)",
          borderTop: "1px solid rgba(196,158,108,0.1)",
          borderBottom: "1px solid rgba(196,158,108,0.1)"
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 900,
            marginBottom: 60,
            textAlign: "center"
          }}>AI Agents</h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto"
          }}>
            {[
              { name: "Risk Scoring", desc: "Identifies financial and legal risks with precision scoring" },
              { name: "Completeness", desc: "Ensures all required clauses and schedules are present" },
              { name: "Negotiation", desc: "Generates counter-terms automatically for high-risk items" },
              { name: "Consistency", desc: "Finds contradictions and inconsistencies across documents" },
              { name: "Regulatory", desc: "Checks compliance with Indian Contract Act & DPDP Act" },
              { name: "Explanation", desc: "Translates legal jargon into simple Hindi and English" }
            ].map((agent, i) => (
              <div key={i} style={{
                background: "rgba(15,17,21,0.8)",
                border: "1px solid rgba(196,158,108,0.15)",
                borderRadius: 12,
                padding: 32,
                transition: "all 0.3s ease",
                cursor: "pointer"
              }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,158,108,0.4)";
                e.currentTarget.style.background = "rgba(15,17,21,0.95)";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,158,108,0.15)";
                e.currentTarget.style.background = "rgba(15,17,21,0.8)";
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "#C49E6C"
                }}>{agent.name}</h3>
                <p style={{
                  fontSize: 14,
                  color: "#888",
                  lineHeight: 1.6
                }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Preview */}
        <section style={{
          padding: "80px 32px",
          maxWidth: 1200,
          margin: "0 auto"
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 900,
            marginBottom: 40,
            textAlign: "center"
          }}>Dashboard Preview</h2>
          
          <div style={{
            background: "rgba(15,17,21,0.9)",
            border: "1px solid rgba(196,158,108,0.15)",
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            color: "#666"
          }}>
            <p style={{ fontSize: 16, marginBottom: 16 }}>Upload your contracts and get instant analysis</p>
            <div style={{
              background: "rgba(196,158,108,0.05)",
              border: "2px dashed rgba(196,158,108,0.2)",
              borderRadius: 12,
              padding: 60,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }} onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,158,108,0.4)";
              e.currentTarget.style.background = "rgba(196,158,108,0.1)";
            }} onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,158,108,0.2)";
              e.currentTarget.style.background = "rgba(196,158,108,0.05)";
            }}>
              <p style={{ color: "#C49E6C", fontWeight: 600 }}>Drop your PDF or click to upload</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: "100px 32px",
          background: "rgba(196,158,108,0.03)",
          borderTop: "1px solid rgba(196,158,108,0.1)",
          textAlign: "center"
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 900,
            marginBottom: 24
          }}>Ready to analyze your contracts?</h2>
          <p style={{
            fontSize: 16,
            color: "#888",
            marginBottom: 40
          }}>Join thousands of legal professionals using Karrar.ai</p>
          <button style={{
            background: "linear-gradient(135deg, #C49E6C, #F5D08A)",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "16px 48px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif"
          }}>Start Your Free Trial</button>
        </section>
      </main>
    </div>
  );
}
