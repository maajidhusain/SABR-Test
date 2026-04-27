import { DashboardShell } from "@/components/dashboard-shell";
import { getDirectoryBundle } from "@/lib/data";
import { requireViewer } from "@/lib/auth";

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const SPOTLIGHTS = [
  {
    featured: true,
    kicker: "Featured initiative · Vol. III, No. 14",
    title: "Strategic Allocation of Business Resources",
    body: "A standing call for members to channel time, capital, and expertise into community-vetted ventures across Chicagoland.",
    cta: "Read the brief",
  },
  {
    kicker: "Member spotlight",
    initials: "AR",
    tone: "moss",
    who: "Ali Raza",
    role: "Operations Director · Lakeshore Logistics",
    quote: "Building bridges between logistics professionals and community entrepreneurs.",
  },
  {
    kicker: "Member spotlight",
    initials: "FZ",
    tone: "gold",
    who: "Dr. Fatima Zehra",
    role: "Pediatric Dentist · Bright Path Dental",
    quote: "Unlocking healthcare access through community knowledge sharing.",
  },
];

const NEW_MEMBERS = [
  { idx: "001", initials: "SH", tone: "rust",  name: "Sara Hashmi",   role: "UX Researcher",     loc: "Lincoln Park", tags: ["Design", "Research"] },
  { idx: "002", initials: "MK", tone: "moss",  name: "Mehdi Kazmi",   role: "Tax Counsel",       loc: "Naperville",   tags: ["Legal", "Tax"] },
  { idx: "003", initials: "ZA", tone: "gold",  name: "Zainab Ahmed",  role: "OB-GYN",            loc: "Skokie",       tags: ["Health"] },
  { idx: "004", initials: "RJ", tone: "stone", name: "Reza Jafari",   role: "Software Engineer", loc: "Hyde Park",    tags: ["Eng", "AI"] },
  { idx: "005", initials: "NK", tone: "rust",  name: "Nadia Khan",    role: "Architect",         loc: "Oak Park",     tags: ["Civic"] },
];

const NET_NODES = [
  { x: 50, y: 50, r: 5,   tone: "ink"  },
  { x: 30, y: 36, r: 3.2, tone: "rust" },
  { x: 70, y: 38, r: 3.2, tone: "rust" },
  { x: 35, y: 65, r: 3.2, tone: "moss" },
  { x: 65, y: 66, r: 3.2, tone: "rust" },
  { x: 50, y: 28, r: 3.2, tone: "gold" },
  { x: 50, y: 72, r: 3.2, tone: "moss" },
  { x: 18, y: 25, r: 2.4, tone: "rust" },
  { x: 82, y: 26, r: 2.4, tone: "moss" },
  { x: 14, y: 55, r: 2.4, tone: "gold" },
  { x: 86, y: 58, r: 2.4, tone: "moss" },
  { x: 24, y: 80, r: 2.4, tone: "rust" },
  { x: 76, y: 82, r: 2.4, tone: "rust" },
  { x: 42, y: 18, r: 2.4, tone: "moss" },
  { x: 60, y: 20, r: 2.4, tone: "gold" },
  { x: 38, y: 88, r: 2.4, tone: "moss" },
  { x: 62, y: 88, r: 2.4, tone: "rust" },
] as const;

const TONE_COLOR: Record<string, string> = {
  ink: "#1f3a2e",
  rust: "#a8542a",
  moss: "#6b8068",
  gold: "#b08840",
};

function NetworkPreview() {
  const edges: [number, number][] = [
    ...NET_NODES.slice(1).map((_, i) => [0, i + 1] as [number, number]),
    [1, 2], [3, 4], [7, 9], [8, 10], [5, 1], [5, 2], [6, 3], [6, 4],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    >
      <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(31,58,46,0.08)" strokeDasharray="0.8 1.2" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(31,58,46,0.06)" strokeDasharray="0.8 1.2" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={NET_NODES[a].x} y1={NET_NODES[a].y}
          x2={NET_NODES[b].x} y2={NET_NODES[b].y}
          stroke="rgba(31,58,46,0.18)" strokeWidth="0.22"
        />
      ))}
      {NET_NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r * 0.18} fill={TONE_COLOR[n.tone]} opacity="0.92" />
          {i === 0 && (
            <circle cx={n.x} cy={n.y} r={n.r * 0.32} fill="none" stroke={TONE_COLOR[n.tone]} strokeWidth="0.2" opacity="0.4" />
          )}
        </g>
      ))}
      <text x="50" y="47" textAnchor="middle" fontSize="2.2" fontFamily="Source Serif 4, Georgia, serif" fill="#7a7268">
        Maajid
      </text>
    </svg>
  );
}

export default async function DashboardPage() {
  const viewer = await requireViewer();
  const { members, businesses, students, sections } = await getDirectoryBundle();

  const firstName = viewer.name?.split(" ")[0] ?? "there";

  const kpis = [
    { lab: "Members",     val: members.length,   delta: "+24 this quarter",  neutral: false },
    { lab: "Businesses",  val: businesses.length, delta: "+6 this month",    neutral: false },
    { lab: "Students",    val: students.length,   delta: "+11 this month",   neutral: false },
    { lab: "Initiatives", val: sections.length,   delta: "3 active calls",   neutral: true  },
  ];

  return (
    <DashboardShell viewer={viewer}>
      {/* Masthead */}
      <div className="page-head">
        <div>
          <div className="kicker" style={{ marginBottom: 14 }}>Member Home · Issue 14</div>
          <h1 className="serif">
            Good morning,{" "}
            <em style={{ fontStyle: "italic", color: "var(--rust)" }}>{firstName}.</em>
          </h1>
          <p className="page-lead">
            A private starting point for discovery, referrals, and mentorship across the
            Chicagoland Shia community. Six new members joined this week, and three SABR
            initiatives are accepting submissions.
          </p>
        </div>
        <div className="issue-stamp">
          <div className="vol">Vol. III &middot; No. 14</div>
          <div className="date">Apr 27 · 2026</div>
          <div style={{ marginTop: 12 }}>
            <button className="btn primary" type="button">
              <PlusIcon /> New introduction
            </button>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="kpi-row">
        {kpis.map((k) => (
          <div className="kpi" key={k.lab}>
            <div className="kpi-lab">{k.lab}</div>
            <div className="kpi-val">{k.val}</div>
            <div className={`kpi-delta${k.neutral ? " neutral" : ""}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* I. Spotlights */}
      <div className="sec-head">
        <div className="roman">I.</div>
        <h2>Spotlights from the network</h2>
        <div className="sec-meta">Curated weekly</div>
      </div>

      <div className="spot-grid">
        {SPOTLIGHTS.map((s, i) =>
          s.featured ? (
            <div key={i} className="spot featured">
              <div className="kicker">{s.kicker}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.2 }}>{s.title}</h3>
              <p style={{ color: "rgba(246,241,232,0.78)", fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
              <div className="spot-foot">
                <a href="/sections" className="linkish" style={{ color: "var(--paper)", borderColor: "var(--paper)" }}>
                  {s.cta} <ArrowIcon />
                </a>
              </div>
            </div>
          ) : (
            <div key={i} className="spot">
              <div className="kicker">{s.kicker}</div>
              <div className="spot-head">
                <div className={`av av-md av-${s.tone}`}>{s.initials}</div>
                <div>
                  <div className="spot-who">{s.who}</div>
                  <div className="spot-role">{s.role}</div>
                </div>
              </div>
              <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
              <div className="spot-foot">
                <a href="/community" className="linkish">
                  View profile <ArrowIcon />
                </a>
              </div>
            </div>
          )
        )}
      </div>

      <div className="spacer-lg" />

      {/* II + III: Network preview & New members */}
      <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 32 }}>

        {/* II. Network preview */}
        <div>
          <div className="sec-head">
            <div className="roman">II.</div>
            <h2>Your immediate network</h2>
            <div className="sec-meta">36 close · {members.length} reachable</div>
          </div>

          <div className="network-mini-card">
            <div className="network-mini-stage">
              <NetworkPreview />
            </div>
            <div className="network-mini-legend">
              <span className="tag">You</span>
              <span className="tag">Members · 18</span>
              <span className="tag">Businesses · 9</span>
              <span className="tag">Students · 6</span>
              <a href="/network" className="linkish" style={{ marginLeft: "auto" }}>
                Open full network <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="spacer-md" />

          <div className="aside-callout">
            <div className="aside-marker">¶</div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>
                Three of your second-degree contacts moved into healthcare leadership this quarter.
              </div>
              <div style={{ fontSize: 12, color: "var(--mute)" }}>
                Worth a referral conversation — explore in the network view.
              </div>
            </div>
          </div>
        </div>

        {/* III. New members */}
        <div>
          <div className="sec-head">
            <div className="roman">III.</div>
            <h2>New to the directory</h2>
            <div className="sec-meta">5 of 11 ↓</div>
          </div>

          <div className="index-list">
            {NEW_MEMBERS.map((m) => (
              <a key={m.idx} href="/community" className="index-row">
                <span className="idx">{m.idx}</span>
                <div className={`av av-sm av-${m.tone}`}>{m.initials}</div>
                <div>
                  <div className="row-name">{m.name}</div>
                  <div className="row-role">{m.role} · {m.loc}</div>
                </div>
                <div className="row-tags">
                  {m.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="row-arrow"><ArrowIcon /></div>
              </a>
            ))}
          </div>

          <div style={{ paddingTop: 14, textAlign: "right" }}>
            <a href="/community" className="linkish">
              Browse community directory <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
