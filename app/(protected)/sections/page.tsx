import { DashboardShell } from "@/components/dashboard-shell";
import { requireViewer } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";

export default async function SectionsPage() {
  const viewer = await requireViewer();
  const { sections } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="SABR sections"
      intro="Each initiative is modeled as editable platform content so taskforce members can manage growth without hardcoded page updates."
    >
      <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {sections.map((section) => (
          <article key={section.id} className="card" style={{ padding: "1.3rem" }}>
            <div className="pill">{section.slug}</div>
            <h2 style={{ marginBottom: "0.35rem" }}>{section.title}</h2>
            <p className="section-copy">{section.overview}</p>
            <div className="grid" style={{ marginTop: "1rem" }}>
              {section.items.map((item) => (
                <div key={item.title} style={{ paddingTop: "0.85rem", borderTop: "1px solid var(--line)" }}>
                  <strong>{item.title}</strong>
                  {item.badge ? <span className="pill" style={{ marginLeft: "0.55rem" }}>{item.badge}</span> : null}
                  <p className="section-copy" style={{ marginTop: "0.35rem" }}>{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
