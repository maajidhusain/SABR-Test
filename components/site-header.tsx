import Link from "next/link";
import type { CSSProperties } from "react";

import { Viewer } from "@/lib/types";

const navLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.4rem 0.85rem",
  borderRadius: "999px",
  color: "#64748b",
  fontSize: "0.92rem",
  fontWeight: 500,
  transition: "background 120ms ease, color 120ms ease"
};

const activeLinkStyle: CSSProperties = {
  ...navLinkStyle,
  background: "#f1f5f9",
  color: "#1e293b",
  fontWeight: 600
};

const primaryButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "38px",
  padding: "0.5rem 1rem",
  borderRadius: "10px",
  background: "#3b82f6",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.9rem",
  border: 0
};

const secondaryButtonStyle: CSSProperties = {
  ...primaryButtonStyle,
  background: "#ffffff",
  color: "#1e293b",
  border: "1px solid #e2e8f0"
};

function GridIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#3b82f6" />
      <circle cx="9" cy="9" r="2" fill="white" />
      <circle cx="14" cy="9" r="2" fill="white" />
      <circle cx="19" cy="9" r="2" fill="white" />
      <circle cx="9" cy="14" r="2" fill="white" />
      <circle cx="14" cy="14" r="2" fill="white" />
      <circle cx="19" cy="14" r="2" fill="white" />
      <circle cx="9" cy="19" r="2" fill="white" />
      <circle cx="14" cy="19" r="2" fill="white" />
      <circle cx="19" cy="19" r="2" fill="white" />
    </svg>
  );
}

function AvatarIcon() {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #cbd5e1"
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="7" r="3.5" fill="#94a3b8" />
        <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function SiteHeader({ viewer }: { viewer: Viewer | null }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(16px)",
        background: "rgba(255, 255, 255, 0.88)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 6px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div
        className="shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 0"
        }}
      >
        <Link
          href={viewer ? "/dashboard" : "/"}
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <GridIcon />
          <strong
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: "-0.01em"
            }}
          >
            Community Hub
          </strong>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" }}>
          {viewer ? (
            <>
              <Link href="/" style={activeLinkStyle}>Home</Link>
              <Link href="/network" style={navLinkStyle}>Network Map</Link>
              <Link href="/community" style={navLinkStyle}>Groups</Link>
              <Link href="/businesses" style={navLinkStyle}>Resources</Link>
              {viewer.role === "taskforce" && (
                <Link href="/admin" style={navLinkStyle}>Taskforce</Link>
              )}
              <div style={{ marginLeft: "0.5rem" }}>
                <Link href="/logout">
                  <AvatarIcon />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/" style={activeLinkStyle}>Home</Link>
              <Link href="/network" style={navLinkStyle}>Network Map</Link>
              <Link href="/community" style={navLinkStyle}>Groups</Link>
              <Link href="/businesses" style={navLinkStyle}>Resources</Link>
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "0.5rem" }}>
                <Link href="/login" style={secondaryButtonStyle}>Sign in</Link>
                <Link href="/request-access" style={primaryButtonStyle}>Get started</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
