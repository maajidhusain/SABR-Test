"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Viewer } from "@/lib/types";

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5M5 10v10h14V10" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7h12M7 6l4 11M17 6l-4 11" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 14a4 4 0 1 0-8 0M2 21c0-3.3 4.5-5 8-5M22 21c0-3-3-4.5-6-5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 1 1 6 0v2" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-4 9 4-9 4-9-4zM7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5zM8 7h7M8 11h7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    </svg>
  );
}

function UserEditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="7" r="4" />
      <path d="M2 21c0-4 3.6-7 8-7" />
      <path d="M18.5 15.5l-5 5H21v-2.5l-2.5-2.5zM16 14l2 2" />
    </svg>
  );
}

const DIRECTORY_LINKS = [
  { href: "/dashboard",  label: "Member home",  icon: HomeIcon,    count: null },
  { href: "/network",    label: "Network",       icon: NetworkIcon, count: 412 },
  { href: "/community",  label: "Community",     icon: UsersIcon,   count: 240 },
  { href: "/businesses", label: "Businesses",    icon: BagIcon,     count: 87  },
  { href: "/students",   label: "Students",      icon: CapIcon,     count: 64  },
];

const PROGRAM_LINKS = [
  { href: "/jobs",     label: "Job Board",     icon: BriefcaseIcon, count: null },
  { href: "/sections", label: "SABR sections", icon: BookIcon,      count: 12   },
  { href: "/admin",    label: "Taskforce",     icon: ShieldIcon,    count: null },
];

const ACCOUNT_LINKS = [
  { href: "/profile", label: "My Profile", icon: UserEditIcon, count: null },
];

export function DashboardSidebar({ viewer }: { viewer: Viewer }) {
  const pathname = usePathname();

  const initials = viewer.name
    ? viewer.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const visiblePrograms =
    viewer.role === "taskforce" ? PROGRAM_LINKS : PROGRAM_LINKS.filter((l) => l.href !== "/admin");

  return (
    <aside className="sidebar">
      <div className="side-section">
        <div className="kicker">Directory</div>
        {DIRECTORY_LINKS.map(({ href, label, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className={`side-link${isActive(href) ? " active" : ""}`}
          >
            <Icon />
            <span>{label}</span>
            {count != null && <span className="side-badge">{count}</span>}
          </Link>
        ))}
      </div>

      <div className="side-section">
        <div className="kicker">Programs</div>
        {visiblePrograms.map(({ href, label, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className={`side-link${isActive(href) ? " active" : ""}`}
          >
            <Icon />
            <span>{label}</span>
            {count != null && <span className="side-badge">{count}</span>}
          </Link>
        ))}
      </div>

      <div className="side-section">
        <div className="kicker">Account</div>
        {ACCOUNT_LINKS.map(({ href, label, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className={`side-link${isActive(href) ? " active" : ""}`}
          >
            <Icon />
            <span>{label}</span>
            {count != null && <span className="side-badge">{count}</span>}
          </Link>
        ))}
      </div>

      <div className="side-foot">
        <div className="side-foot-avatar">{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div className="side-foot-name">{viewer.name}</div>
          <div className="side-foot-role">
            {viewer.role === "taskforce" ? "Taskforce · Editor" : "Member"}
          </div>
        </div>
      </div>
    </aside>
  );
}
