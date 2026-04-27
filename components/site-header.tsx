import Link from "next/link";

import { Viewer } from "@/lib/types";

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-5.2-5.2" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15L6 17z" />
      <path d="M10 21h4" />
    </svg>
  );
}

export function SiteHeader({ viewer }: { viewer: Viewer | null }) {
  const initials = viewer?.name
    ? viewer.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link href={viewer ? "/dashboard" : "/"} className="brand">
          <span className="brand-mark">S</span>
          <span>SABR</span>
          <span className="kicker" style={{ marginLeft: 6 }}>Chicagoland · Vol. III</span>
        </Link>
      </div>

      <div className="topbar-right">
        <div className="topbar-search" role="search">
          <SearchIcon />
          <span>Find members, businesses…</span>
          <kbd>⌘K</kbd>
        </div>

        <button className="icon-btn" type="button" aria-label="Notifications">
          <BellIcon />
        </button>

        {viewer ? (
          <Link href="/profile" className="topbar-avatar" aria-label="My profile">
            {initials}
          </Link>
        ) : (
          <Link href="/login" className="btn sm">Sign in</Link>
        )}
      </div>
    </header>
  );
}
