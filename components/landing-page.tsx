import Link from "next/link";

import { LandingHero } from "./landing-hero";

const PILLARS = [
  {
    roman: "I.",
    name: "Network",
    body: "A relationship map across 412 members — see who connects you to a doctor, a tax counsel, a logistics director, or a roofing crew you can trust.",
    meta: "412 members · 36 average close ties",
  },
  {
    roman: "II.",
    name: "Businesses",
    body: "87 community-owned businesses, vetted by members. Every listing carries a referral trail so you know who endorses what.",
    meta: "87 businesses · 12 industries",
  },
  {
    roman: "III.",
    name: "Students",
    body: "Mentorship pairings between professionals and 64 students across high school, undergrad, and graduate programs in Chicagoland.",
    meta: "64 students · 24 active pairings",
  },
  {
    roman: "IV.",
    name: "Sections",
    body: "Twelve standing programs — including the Strategic Allocation of Business Resources initiative — where members coordinate work the community needs done.",
    meta: "12 sections · 5 with open calls",
  },
];

const NUMBERS = [
  { val: "412", lab: "Members", note: "+24 this quarter" },
  { val: "87", lab: "Businesses", note: "+6 this month" },
  { val: "64", lab: "Students", note: "+11 this month" },
  { val: "12", lab: "Sections", note: "3 active calls" },
];

const STORIES = [
  {
    initials: "AR",
    tone: "moss",
    name: "Ali Raza",
    role: "Operations Director · Lakeshore Logistics",
    quote:
      "I joined for the directory. I stayed because three of my hires came through second-degree introductions I would never have made on LinkedIn.",
  },
  {
    initials: "FZ",
    tone: "gold",
    name: "Dr. Fatima Zehra",
    role: "Pediatric Dentist · Bright Path Dental",
    quote:
      "When a family asks for a referral I trust, I open SABR. Every name comes with context — who endorsed them, who they have helped before.",
  },
  {
    initials: "SH",
    tone: "rust",
    name: "Sara Hashmi",
    role: "Student · Northwestern, Class of '27",
    quote:
      "My mentor pairing started as one coffee. A year later, she has reviewed my portfolio four times and put me in touch with two of her former colleagues.",
  },
];

const FAQ = [
  {
    q: "Who is SABR for?",
    a: "Members of the Chicagoland Shia community — professionals, business owners, students, and volunteers — who want to find each other through warm introductions rather than cold outreach.",
  },
  {
    q: "How does membership work?",
    a: "Apply with a brief profile and a community reference. A volunteer taskforce reviews applications on a rolling basis. Most decisions take under a week.",
  },
  {
    q: "Is my information public?",
    a: "No. The directory is visible only to approved members. There is no public scraping, no advertising, and no sharing of records outside the community.",
  },
  {
    q: "Does it cost anything?",
    a: "Membership is free. The platform is funded by donations from members and supporters who believe in keeping community infrastructure community-owned.",
  },
  {
    q: "What is the Strategic Allocation of Business Resources?",
    a: "An ongoing initiative — and the namesake of SABR — through which members channel time, capital, and expertise into community-vetted ventures. Open calls publish each quarter.",
  },
  {
    q: "I am not in Chicagoland — can I join?",
    a: "Not yet. We are starting with one city to keep trust dense. Other regions are on the roadmap; the application form has a waitlist for them.",
  },
];

export function LandingPage() {
  return (
    <div className="lp-page">
      <header className="lp-topbar">
        <div className="lp-shell lp-topbar-inner">
          <Link href="/" className="lp-brand">
            <span className="lp-brand-mark">S</span>
            <span className="lp-brand-word">SABR</span>
            <span className="lp-kicker lp-brand-meta">Chicagoland · Vol. III</span>
          </Link>
          <nav className="lp-topnav">
            <a href="#what">What it is</a>
            <a href="#numbers">By the numbers</a>
            <a href="#stories">Members</a>
            <a href="#faq">FAQ</a>
            <Link href="/login" className="lp-link-quiet">Sign in</Link>
            <Link href="/request-access" className="lp-btn lp-btn-primary lp-btn-sm">Apply</Link>
          </nav>
        </div>
      </header>

      <LandingHero />

      {/* II. Pillars */}
      <section className="lp-section" id="what">
        <div className="lp-shell">
          <div className="lp-sec-head">
            <span className="lp-roman">II.</span>
            <h2 className="lp-h2">What SABR holds for the community</h2>
            <span className="lp-sec-meta">Four standing pillars</span>
          </div>
          <div className="lp-pillars">
            {PILLARS.map((p) => (
              <article key={p.name} className="lp-pillar">
                <div className="lp-pillar-head">
                  <span className="lp-roman lp-roman-sm">{p.roman}</span>
                  <h3 className="lp-h3">{p.name}</h3>
                </div>
                <p className="lp-body">{p.body}</p>
                <div className="lp-pillar-meta lp-osnum">{p.meta}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* III. Numbers */}
      <section className="lp-section lp-section-tinted" id="numbers">
        <div className="lp-shell">
          <div className="lp-sec-head">
            <span className="lp-roman">III.</span>
            <h2 className="lp-h2">Where the directory stands today</h2>
            <span className="lp-sec-meta">Updated weekly</span>
          </div>
          <div className="lp-numbers">
            {NUMBERS.map((n) => (
              <div className="lp-number" key={n.lab}>
                <div className="lp-number-lab lp-kicker">{n.lab}</div>
                <div className="lp-number-val">{n.val}</div>
                <div className="lp-number-note">{n.note}</div>
              </div>
            ))}
          </div>
          <p className="lp-body lp-numbers-note">
            Every figure here is recorded by hand and confirmed by a volunteer before it appears in
            the directory. The community keeps its own books.
          </p>
        </div>
      </section>

      {/* IV. Stories */}
      <section className="lp-section" id="stories">
        <div className="lp-shell">
          <div className="lp-sec-head">
            <span className="lp-roman">IV.</span>
            <h2 className="lp-h2">In the words of members</h2>
            <span className="lp-sec-meta">Three of forty-eight</span>
          </div>
          <div className="lp-stories">
            {STORIES.map((s) => (
              <figure key={s.name} className="lp-story">
                <div className="lp-story-head">
                  <span className={`lp-avatar lp-avatar-${s.tone}`}>{s.initials}</span>
                  <figcaption>
                    <div className="lp-story-name">{s.name}</div>
                    <div className="lp-story-role">{s.role}</div>
                  </figcaption>
                </div>
                <blockquote className="lp-quote">&ldquo;{s.quote}&rdquo;</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* V. FAQ */}
      <section className="lp-section lp-section-tinted" id="faq">
        <div className="lp-shell">
          <div className="lp-sec-head">
            <span className="lp-roman">V.</span>
            <h2 className="lp-h2">Frequently asked</h2>
            <span className="lp-sec-meta">Six entries</span>
          </div>
          <dl className="lp-faq">
            {FAQ.map((f, i) => (
              <div className="lp-faq-row" key={f.q}>
                <dt className="lp-faq-q">
                  <span className="lp-osnum lp-faq-idx">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                </dt>
                <dd className="lp-faq-a">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section lp-cta-section">
        <div className="lp-shell lp-cta-block">
          <h2 className="lp-h2 lp-cta-title">
            If the community has a place for you,
            <br />
            <em>SABR will help you find it.</em>
          </h2>
          <div className="lp-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/request-access" className="lp-btn lp-btn-primary lp-btn-lg">
              Apply for membership
            </Link>
            <Link href="/login" className="lp-btn lp-btn-ghost lp-btn-lg">
              Sign in
            </Link>
          </div>
          <p className="lp-cta-note lp-kicker">
            Reviewed by the SABR taskforce · Typically under one week
          </p>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-shell lp-footer-inner">
          <div className="lp-footer-brand">
            <span className="lp-brand-mark">S</span>
            <div>
              <div className="lp-footer-name">SABR · Chicagoland</div>
              <div className="lp-kicker">Strategic Allocation of Business Resources</div>
            </div>
          </div>
          <div className="lp-footer-cols">
            <div>
              <div className="lp-kicker">Membership</div>
              <Link href="/request-access">Apply</Link>
              <Link href="/login">Sign in</Link>
            </div>
            <div>
              <div className="lp-kicker">Programs</div>
              <a href="#what">Network</a>
              <a href="#what">Businesses</a>
              <a href="#what">Students</a>
              <a href="#what">Sections</a>
            </div>
            <div>
              <div className="lp-kicker">Contact</div>
              <a href="mailto:hello@sabr.community">hello@sabr.community</a>
              <a href="#">Taskforce</a>
            </div>
          </div>
        </div>
        <div className="lp-shell lp-footer-meta">
          <span>© 2026 SABR Chicagoland</span>
          <span>Vol. III · No. 14 · Apr 26</span>
        </div>
      </footer>
    </div>
  );
}
