import Link from "next/link";
import type { Route } from "next";

import { Viewer } from "@/lib/types";

export function DashboardShell({
  viewer,
  title,
  intro,
  children
}: {
  viewer: Viewer;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const links: { href: Route; label: string }[] = [
    { href: "/dashboard", label: "Overview" },
    { href: "/community", label: "Community" },
    { href: "/businesses", label: "Businesses" },
    { href: "/students", label: "Students" },
    { href: "/network", label: "Network" },
    { href: "/sections", label: "SABR sections" }
  ];

  if (viewer.role === "taskforce") {
    links.push({ href: "/admin", label: "Taskforce admin" });
  }

  return (
    <div className="shell" style={{ padding: "2rem 0 3rem" }}>
      <div className="grid" style={{ gridTemplateColumns: "280px minmax(0, 1fr)", alignItems: "start" }}>
        <aside className="card" style={{ padding: "1rem", position: "sticky", top: "94px" }}>
          <div
            style={{
              padding: "1rem",
              borderRadius: "20px",
              background: "linear-gradient(140deg, rgba(27,94,74,0.14), rgba(180,106,54,0.16))"
            }}
          >
            <div className="pill">{viewer.role === "taskforce" ? "Taskforce" : "Member"} view</div>
            <h2 style={{ margin: "0.9rem 0 0.35rem", fontSize: "1.4rem" }}>{viewer.name}</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>
              Approved access for Chicagoland. Secure data remains private to members and taskforce only.
            </p>
          </div>
          <div className="grid" style={{ marginTop: "1rem" }}>
            {links.map((link) => (
              <Link key={link.href} className="pill" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="grid">
          <section className="card" style={{ padding: "1.6rem 1.6rem 1.4rem" }}>
            <h1 className="section-title">{title}</h1>
            <p className="section-copy" style={{ marginTop: "0.8rem" }}>
              {intro}
            </p>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
