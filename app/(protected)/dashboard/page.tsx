import { DashboardShell } from "@/components/dashboard-shell";
import { getDirectoryBundle } from "@/lib/data";
import { requireViewer } from "@/lib/auth";

export default async function DashboardPage() {
  const viewer = await requireViewer();
  const { members, businesses, students, sections } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="Member home"
      intro="A private starting point for discovery, referrals, mentorship, and SABR initiative coordination."
    >
      <section className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {[
          [`${members.length}`, "Community members"],
          [`${businesses.length}`, "Businesses and services"],
          [`${students.length}`, "Student profiles"],
          [`${sections.length}`, "SABR program modules"]
        ].map(([value, label]) => (
          <article key={label} className="card" style={{ padding: "1.2rem" }}>
            <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)" }}>{value}</div>
            <p className="section-copy">{label}</p>
          </article>
        ))}
      </section>
      <div className="two-col">
        <section className="card" style={{ padding: "1.4rem" }}>
          <h2 style={{ marginTop: 0 }}>How the private experience works</h2>
          <p className="section-copy">
            Members can browse directories and explore relationship matches. Taskforce members can also approve users, manage records, and update SABR section content directly.
          </p>
        </section>
        <section className="card" style={{ padding: "1.4rem" }}>
          <h2 style={{ marginTop: 0 }}>Phase 1 operating cost</h2>
          <p className="section-copy">
            Budget about `$25/month` for Supabase Pro, with total early run-rate usually landing around `$25-$45/month` including hosting.
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
