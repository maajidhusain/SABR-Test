import Link from "next/link";

const NODES = [
  { x: 85, y: 128 }, { x: 165, y: 152 }, { x: 262, y: 84 },
  { x: 442, y: 44 }, { x: 548, y: 108 }, { x: 662, y: 68 },
  { x: 802, y: 102 }, { x: 952, y: 70 }, { x: 1068, y: 132 },
  { x: 1098, y: 238 }, { x: 968, y: 292 }, { x: 820, y: 262 },
  { x: 658, y: 308 }, { x: 508, y: 282 }, { x: 348, y: 326 },
  { x: 192, y: 302 }, { x: 102, y: 242 },
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  [15, 16], [16, 0], [4, 11], [2, 13], [5, 12], [6, 10], [1, 15],
];

function NetworkSVG() {
  return (
    <svg
      viewBox="0 0 1200 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="rgba(59,130,246,0.18)"
          strokeWidth="1.5"
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={i % 3 === 0 ? 6 : 4.5}
          fill={i % 3 === 0 ? "rgba(59,130,246,0.55)" : "rgba(59,130,246,0.35)"}
        />
      ))}
    </svg>
  );
}

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: -1,
        left: 0,
        width: "100%",
        height: 72,
        display: "block"
      }}
    >
      <path
        d="M0,36 C180,72 360,0 540,36 C720,72 900,8 1080,36 C1200,56 1320,20 1440,36 L1440,72 L0,72 Z"
        fill="#f0f5ff"
      />
    </svg>
  );
}

const spotlights = [
  {
    name: "Ali Raza",
    title: "Operations Director",
    org: "Lakeshore Logistics",
    quote: "Building bridges between logistics professionals and community entrepreneurs.",
    color: "#dbeafe",
    initials: "AR",
    avatarBg: "#3b82f6"
  },
  {
    featured: true,
    name: "SABR — Strategic Allocation of Business Resources",
    description: "Earn recognition and connect with trusted professionals by sharing your expertise across the community.",
    badge: "⭐ Featured Initiative"
  },
  {
    name: "Fatima Zehra",
    title: "Pediatric Dentist",
    org: "Bright Path Dental",
    quote: "Unlocking healthcare access through community knowledge sharing.",
    color: "#f3e8ff",
    initials: "FZ",
    avatarBg: "#8b5cf6"
  }
];

const groups = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="3" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <circle cx="13" cy="7" r="3" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path d="M1 17c0-2.761 2.686-5 6-5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M13 12c3.314 0 6 2.239 6 5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    name: "SABR Communities",
    count: "240 Members"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path d="M8 8l4 2-4 2V8z" fill="#3b82f6" />
      </svg>
    ),
    name: "WAR Webinars",
    count: "185 Members"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="14" height="10" rx="2" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path d="M7 6V5a3 3 0 016 0v1" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="11" r="1.5" fill="#3b82f6" />
      </svg>
    ),
    name: "Job Opportunities",
    count: "320 Members"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2a6 6 0 00-3 11.196V15a1 1 0 001 1h4a1 1 0 001-1v-1.804A6 6 0 0010 2z" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M8 18h4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Startup Think Tank",
    count: "95 Members"
  }
];

export function Hero() {
  return (
    <>
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #ffffff 0%, #eff6ff 100%)",
          padding: "5rem 1rem 7rem",
          overflow: "hidden",
          textAlign: "center"
        }}
      >
        <NetworkSVG />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <h1
            style={{
              margin: "0 0 1rem",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#1e293b"
            }}
          >
            Connect &amp; Discover Your Community
          </h1>
          <p
            style={{
              margin: "0 0 2rem",
              color: "#64748b",
              fontSize: "1.1rem",
              lineHeight: 1.7
            }}
          >
            Find trusted professionals, mentors, and businesses in the SABR network.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "0.6rem 0.75rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              maxWidth: 560,
              margin: "0 auto"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="8" cy="8" r="5.5" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <path d="M12.5 12.5l3 3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Find your peers, skills, or interests..."
              style={{
                flex: 1,
                border: 0,
                outline: "none",
                background: "transparent",
                color: "#1e293b",
                fontSize: "0.95rem"
              }}
            />
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* ── Community Spotlights ─────────────────────────────────── */}
      <section style={{ background: "#f0f5ff", padding: "3rem 1rem 2.5rem" }}>
        <div className="shell">
          <h2
            style={{
              margin: "0 0 1.5rem",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1e293b",
              borderBottom: "2px solid #3b82f6",
              display: "inline-block",
              paddingBottom: "0.4rem"
            }}
          >
            Community Spotlights
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem"
            }}
          >
            {spotlights.map((item, i) =>
              item.featured ? (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      height: 140,
                      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <svg viewBox="0 0 400 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} aria-hidden="true">
                      {[[60,40],[140,20],[240,60],[320,30],[380,70],[80,110],[200,90],[300,120]].map(([x,y],j)=>(
                        <circle key={j} cx={x} cy={y} r={4} fill="white" />
                      ))}
                      <line x1="60" y1="40" x2="140" y2="20" stroke="white" strokeWidth="1" />
                      <line x1="140" y1="20" x2="240" y2="60" stroke="white" strokeWidth="1" />
                      <line x1="240" y1="60" x2="320" y2="30" stroke="white" strokeWidth="1" />
                      <line x1="320" y1="30" x2="380" y2="70" stroke="white" strokeWidth="1" />
                      <line x1="80" y1="110" x2="200" y2="90" stroke="white" strokeWidth="1" />
                      <line x1="200" y1="90" x2="300" y2="120" stroke="white" strokeWidth="1" />
                    </svg>
                    <span
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        left: "0.75rem",
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        padding: "0.25rem 0.6rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.3)"
                      }}
                    >
                      ⭐ Featured Initiative
                    </span>
                  </div>
                  <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
                    <p style={{ margin: "0 0 0.35rem", fontWeight: 700, fontSize: "0.98rem", color: "#1e293b" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: "0 0 1rem", color: "#64748b", fontSize: "0.88rem", lineHeight: 1.55 }}>
                      {item.description}
                    </p>
                    <Link
                      href="/request-access"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.45rem 1rem",
                        background: "#3b82f6",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.85rem"
                      }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: item.avatarBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1rem",
                        flexShrink: 0
                      }}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.98rem" }}>{item.name}</div>
                      <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{item.title}</div>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      color: "#475569",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                      fontStyle: "italic"
                    }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <Link
                    href="/community"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.45rem 1rem",
                      background: "#3b82f6",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      alignSelf: "flex-start"
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Active Groups ────────────────────────────────────────── */}
      <section style={{ background: "#f0f5ff", padding: "0.5rem 1rem 3.5rem" }}>
        <div className="shell">
          <h2
            style={{
              margin: "0 0 1.25rem",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1e293b"
            }}
          >
            Active Groups
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem"
            }}
          >
            {groups.map((group) => (
              <div
                key={group.name}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "1.1rem 1.25rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {group.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.95rem" }}>{group.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "0.15rem" }}>{group.count}</div>
                </div>
                <Link
                  href="/community"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.4rem 1rem",
                    background: "#3b82f6",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    alignSelf: "flex-start"
                  }}
                >
                  Join
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#f0f5ff",
          borderTop: "1px solid #e2e8f0",
          padding: "1.5rem 1rem"
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}
        >
          {["About", "Help Center", "Contact", "Privacy Policy"].map((label) => (
            <a
              key={label}
              href="#"
              style={{ color: "#94a3b8", fontSize: "0.88rem", fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
