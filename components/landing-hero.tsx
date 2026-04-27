"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const VARIANTS = [
  { id: "editorial", label: "Editorial" },
  { id: "split", label: "Split" },
  { id: "manifesto", label: "Manifesto" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const STORAGE_KEY = "sabr.landing.heroVariant";

export function LandingHero() {
  const [variant, setVariant] = useState<VariantId>("editorial");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as VariantId | null;
      if (stored && VARIANTS.some((v) => v.id === stored)) setVariant(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const cycle = (id: VariantId) => {
    setVariant(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="lp-hero" data-variant={variant}>
      <div className="lp-hero-grain" aria-hidden />
      <div className="lp-shell lp-hero-inner">
        {variant === "editorial" && <EditorialHero />}
        {variant === "split" && <SplitHero />}
        {variant === "manifesto" && <ManifestoHero />}
      </div>

      {mounted && (
        <div className="lp-variant-switch" role="tablist" aria-label="Hero variant">
          <span className="lp-kicker" style={{ marginRight: 10 }}>Hero</span>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={variant === v.id}
              className={`lp-variant-pill ${variant === v.id ? "is-active" : ""}`}
              onClick={() => cycle(v.id)}
              type="button"
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function HeroCTAs() {
  return (
    <div className="lp-cta-row">
      <Link href="/request-access" className="lp-btn lp-btn-primary">
        Apply for membership
      </Link>
      <Link href="/login" className="lp-btn lp-btn-ghost">
        Sign in
        <Arrow />
      </Link>
    </div>
  );
}

function Stamp({ children }: { children: ReactNode }) {
  return <div className="lp-stamp">{children}</div>;
}

function EditorialHero() {
  return (
    <div className="lp-hero-editorial">
      <div className="lp-kicker">Strategic Allocation of Business Resources · Vol. III, No. 14</div>
      <h1 className="lp-display">
        A private register of the
        <br />
        Chicagoland Shia community —
        <br />
        <em>built for warm introductions.</em>
      </h1>
      <p className="lp-lead lp-dropcap">
        SABR is an application-based network where vetted members, businesses, students, and
        sections find each other through context — not cold outreach. A doctor in Skokie can
        recommend a tax counsel in Naperville to a student in Hyde Park, and the trail of trust
        is preserved for the next person who needs it.
      </p>
      <HeroCTAs />
      <NetworkDiagram />
      <div className="lp-marginalia">
        <span className="lp-marker">¶</span>
        <span>
          Approved volunteers (taskforce) keep the directory honest. No public scraping, no ads.
        </span>
      </div>
    </div>
  );
}

function SplitHero() {
  return (
    <div className="lp-hero-split">
      <div>
        <Stamp>Vol. III · Issue 14</Stamp>
        <h1 className="lp-display lp-display-tight">
          The directory the
          <br />
          community keeps for
          <br />
          <em>itself.</em>
        </h1>
        <p className="lp-lead">
          412 members, 87 vetted businesses, 64 students, and 12 active sections — connected
          through introductions you can trace.
        </p>
        <HeroCTAs />
      </div>
      <aside className="lp-hero-aside">
        <div className="lp-kicker">This week</div>
        <ul className="lp-news-list">
          <li>
            <span className="lp-osnum">003</span>
            <div>
              <div className="lp-news-title">Strategic Allocation of Business Resources</div>
              <div className="lp-news-meta">Featured initiative · accepting submissions</div>
            </div>
          </li>
          <li>
            <span className="lp-osnum">011</span>
            <div>
              <div className="lp-news-title">New members joined this week</div>
              <div className="lp-news-meta">Across health, legal, engineering, and design</div>
            </div>
          </li>
          <li>
            <span className="lp-osnum">06</span>
            <div>
              <div className="lp-news-title">Healthcare leadership shifts in your second-degree</div>
              <div className="lp-news-meta">Worth a referral conversation</div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}

function ManifestoHero() {
  return (
    <div className="lp-hero-manifesto">
      <div className="lp-kicker">A statement on private community infrastructure</div>
      <h1 className="lp-display lp-display-xxl">
        Trust does not <em>scale.</em>
        <br />
        It compounds — among
        <br />
        people who know each other.
      </h1>
      <div className="lp-manifesto-foot">
        <p className="lp-lead" style={{ maxWidth: 520 }}>
          SABR exists for the Chicagoland Shia community to capture and pass on that compounding
          — without surrendering it to a feed.
        </p>
        <HeroCTAs />
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NetworkDiagram() {
  const inner: [number, number][] = [
    [50, 30], [70, 40], [78, 56], [70, 72],
    [50, 78], [30, 72], [22, 56], [30, 40],
  ];
  const outer: [number, number][] = [
    [50, 14], [76, 22], [90, 44], [90, 66], [76, 86],
    [50, 92], [24, 86], [10, 66], [10, 44], [24, 22],
  ];
  return (
    <div className="lp-network-figure" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="55" r="22" fill="none" stroke="rgba(31,58,46,0.08)" strokeDasharray="0.6 1.2" />
        <circle cx="50" cy="55" r="38" fill="none" stroke="rgba(31,58,46,0.06)" strokeDasharray="0.6 1.2" />
        {inner.map(([x, y], i) => (
          <line key={`i-${i}`} x1="50" y1="55" x2={x} y2={y} stroke="rgba(31,58,46,0.18)" strokeWidth="0.18" />
        ))}
        {outer.map(([x, y], i) => {
          const [ix, iy] = inner[i % inner.length];
          return (
            <line key={`o-${i}`} x1={ix} y1={iy} x2={x} y2={y} stroke="rgba(31,58,46,0.12)" strokeWidth="0.16" />
          );
        })}
        <circle cx="50" cy="55" r="2.4" fill="#1f3a2e" />
        <circle cx="50" cy="55" r="3.8" fill="none" stroke="#1f3a2e" strokeWidth="0.18" opacity="0.4" />
        {inner.map(([x, y], i) => (
          <circle key={`ic-${i}`} cx={x} cy={y} r="1.3" fill={["#a8542a", "#6b8068", "#b08840"][i % 3]} />
        ))}
        {outer.map(([x, y], i) => (
          <circle key={`oc-${i}`} cx={x} cy={y} r="0.9" fill={["#6b8068", "#a8542a", "#b08840", "#6b8068"][i % 4]} opacity="0.85" />
        ))}
        <text x="50" y="56.4" textAnchor="middle" fontSize="2.4" fontFamily="Source Serif 4, Georgia, serif" fill="#f6f1e8" fontStyle="italic">
          you
        </text>
      </svg>
      <div className="lp-network-caption">
        <span className="lp-kicker">Figure 1</span>
        <span>
          The community as it is recorded in the directory — your immediate ring, then the wider field.
        </span>
      </div>
    </div>
  );
}
