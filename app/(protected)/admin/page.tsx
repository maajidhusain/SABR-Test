import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { requireTaskforce } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function updateRequestStatus(formData: FormData) {
  "use server";

  if (!hasSupabaseEnv()) {
    return;
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "pending");
  const supabase = await createSupabaseServerClient();
  await supabase?.from("access_requests").update({ status }).eq("id", id);
  redirect("/admin");
}

async function createSectionItem(formData: FormData) {
  "use server";

  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase?.from("section_content").insert({
    slug: formData.get("slug"),
    title: formData.get("title"),
    overview: formData.get("overview"),
    items: [
      {
        title: String(formData.get("itemTitle") ?? ""),
        description: String(formData.get("itemDescription") ?? ""),
        badge: String(formData.get("itemBadge") ?? "")
      }
    ]
  });
  redirect("/admin");
}

export default async function AdminPage() {
  const viewer = await requireTaskforce();
  const { accessRequests, sections } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="Taskforce admin"
      intro="Manage approvals, records, and SABR initiatives from one secure operations layer."
    >
      <div className="two-col">
        <section className="card" style={{ padding: "1.4rem" }}>
          <h2 style={{ marginTop: 0 }}>Pending access requests</h2>
          <div className="grid">
            {accessRequests.map((request) => (
              <article key={request.id} style={{ paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
                <strong>{request.fullName}</strong>
                <p className="section-copy">{request.email} · {request.currentTitle} at {request.currentOrganization}</p>
                <p className="section-copy">{request.workLocation} · {request.primaryInstitution}</p>
                <p className="section-copy">{request.communityOfferings}</p>
                <form action={updateRequestStatus} style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginTop: "0.7rem" }}>
                  <input type="hidden" name="id" value={request.id} />
                  <button className="button button-secondary" name="status" value="approved" type="submit">
                    Approve
                  </button>
                  <button className="button button-danger" name="status" value="rejected" type="submit">
                    Reject
                  </button>
                </form>
              </article>
            ))}
          </div>
        </section>
        <section className="card" style={{ padding: "1.4rem" }}>
          <h2 style={{ marginTop: 0 }}>Add SABR section content</h2>
          <form action={createSectionItem} className="grid">
            <label className="label">
              Section slug
              <select className="select" name="slug" defaultValue="job-opportunities">
                {sections.map((section) => (
                  <option key={section.slug} value={section.slug}>
                    {section.slug}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Title
              <input className="field" name="title" required />
            </label>
            <label className="label">
              Overview
              <textarea className="textarea" name="overview" required />
            </label>
            <label className="label">
              Item title
              <input className="field" name="itemTitle" required />
            </label>
            <label className="label">
              Item description
              <textarea className="textarea" name="itemDescription" required />
            </label>
            <label className="label">
              Badge
              <input className="field" name="itemBadge" />
            </label>
            <button className="button button-primary" type="submit">
              Save section content
            </button>
          </form>
        </section>
      </div>
    </DashboardShell>
  );
}
