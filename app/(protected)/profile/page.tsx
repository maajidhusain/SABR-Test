import { redirect } from "next/navigation";

import { requireViewer } from "@/lib/auth";
import { getMemberProfile } from "@/lib/data";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { DashboardShell } from "@/components/dashboard-shell";

async function updateProfileAction(formData: FormData) {
  "use server";

  const { requireViewer: rv } = await import("@/lib/auth");
  const viewer = await rv();

  const wantsResume = formData.get("wantsResume") === "yes";
  const resumeFile = formData.get("resume") as File | null;
  const resumeProvided = resumeFile && resumeFile.size > 0;

  let resumePath: string | null = null;

  if (wantsResume && resumeProvided) {
    const adminClient = createSupabaseAdminClient();
    if (adminClient) {
      const ext = resumeFile.name.split(".").pop() ?? "pdf";
      resumePath = `member-profiles/${viewer.id}/resume.${ext}`;
      await adminClient.storage.from("request-files").upload(resumePath, resumeFile, {
        contentType: resumeFile.type || "application/octet-stream",
        upsert: true
      });
    }
  }

  if (!hasSupabaseEnv()) {
    redirect("/profile?saved=1");
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const updatePayload: Record<string, unknown> = {
      institutions: String(formData.get("institutions") ?? ""),
      additional_credentials: String(formData.get("additionalCredentials") ?? "") || null,
      profession: String(formData.get("profession") ?? ""),
      employer: String(formData.get("employer") ?? ""),
      location: String(formData.get("location") ?? ""),
      organization_website: String(formData.get("organizationWebsite") ?? "") || null,
      industry_experience: String(formData.get("industryExperience") ?? ""),
      wants_resume: wantsResume
    };

    if (resumePath) {
      updatePayload.resume_path = resumePath;
    } else if (!wantsResume) {
      updatePayload.resume_path = null;
    }

    await supabase
      .from("member_profiles")
      .update(updatePayload)
      .eq("profile_id", viewer.id);
  }

  redirect("/profile?saved=1");
}

export default async function ProfilePage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const viewer = await requireViewer();
  const profile = await getMemberProfile(viewer.id);
  const params = await searchParams;
  const saved = params.saved === "1";

  return (
    <DashboardShell
      viewer={viewer}
      title="My Profile"
      intro="Keep your professional details current for the directory and network matches."
    >
      {saved && (
        <div
          style={{
            background: "var(--primary)",
            color: "#fff",
            borderRadius: "14px",
            padding: "0.75rem 1.25rem",
            marginBottom: "1.5rem",
            fontSize: "0.9rem"
          }}
        >
          Profile updated successfully.
        </div>
      )}

      {!profile && (
        <div
          className="card"
          style={{ padding: "1.5rem", color: "var(--muted)", fontSize: "0.9rem" }}
        >
          No member profile found for your account. Contact the SABR taskforce to have your profile created.
        </div>
      )}

      {profile && (
        <form action={updateProfileAction} className="card grid" style={{ padding: "1.5rem" }}>
          <div className="two-col">
            <label className="label">
              Educational Institutions Attended or Attending
              <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
              <input
                className="field"
                name="institutions"
                defaultValue={profile.institutions}
                required
              />
            </label>
            <label className="label">
              Additional Degrees or Certifications
              <span style={{ color: "var(--muted)", fontSize: "0.78rem", marginLeft: "0.4rem" }}>
                (e.g. MBA Candidate, 2026)
              </span>
              <input
                className="field"
                name="additionalCredentials"
                defaultValue={profile.additionalCredentials ?? ""}
              />
            </label>
          </div>

          <div className="two-col">
            <label className="label">
              Current Job Title / Position
              <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
              <input
                className="field"
                name="profession"
                defaultValue={profile.profession}
                required
              />
            </label>
            <label className="label">
              Current Company / Firm / Organization
              <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
              <input
                className="field"
                name="employer"
                defaultValue={profile.employer}
                required
              />
            </label>
          </div>

          <div className="two-col">
            <label className="label">
              Work City and State
              <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
              <span style={{ color: "var(--muted)", fontSize: "0.78rem", marginLeft: "0.4rem" }}>
                (if fully remote, list where you reside)
              </span>
              <input
                className="field"
                name="location"
                defaultValue={profile.location}
                required
              />
            </label>
            <label className="label">
              Company / Firm / Organization Website or Jobs Site
              <input
                className="field"
                name="organizationWebsite"
                type="url"
                defaultValue={profile.organizationWebsite ?? ""}
              />
            </label>
          </div>

          <label className="label">
            Industry / Field of Expertise &amp; Years of Experience
            <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
            <input
              className="field"
              name="industryExperience"
              defaultValue={profile.industryExperience}
              required
            />
          </label>

          <fieldset style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "1rem" }}>
            <legend style={{ padding: "0 0.4rem", color: "var(--muted)" }}>
              Would you like to send your CV / Resume to the community?
            </legend>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <label style={{ display: "flex", gap: "0.55rem", alignItems: "center" }}>
                <input
                  name="wantsResume"
                  type="radio"
                  value="yes"
                  defaultChecked={profile.wantsResume}
                />
                <span>Yes</span>
              </label>
              <label style={{ display: "flex", gap: "0.55rem", alignItems: "center" }}>
                <input
                  name="wantsResume"
                  type="radio"
                  value="no"
                  defaultChecked={!profile.wantsResume}
                />
                <span>No</span>
              </label>
            </div>
            <label className="label" style={{ marginBottom: 0 }}>
              Upload CV / Resume (PDF or Word)
              {profile.resumePath && (
                <span style={{ color: "var(--primary)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>
                  — file on file
                </span>
              )}
              <input className="field" name="resume" type="file" accept=".pdf,.doc,.docx" />
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button className="button button-primary" type="submit">
              Save changes
            </button>
            <a href="/dashboard" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              Cancel
            </a>
          </div>
        </form>
      )}
    </DashboardShell>
  );
}
