import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getViewer } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function requestAccessAction(formData: FormData) {
  "use server";

  if (!hasSupabaseEnv()) {
    redirect("/login");
  }

  const supabase = await createSupabaseServerClient();
  const preferredContactMethods = formData.getAll("preferredContactMethods").map(String);

  if (!preferredContactMethods.length) {
    return;
  }

  const dob = new Date(String(formData.get("dateOfBirth") ?? ""));
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;

  const resumePath = String(formData.get("resumeLink") ?? "") || null;
  const headshotPath = String(formData.get("headshotLink") ?? "") || null;

  await supabase?.from("access_requests").insert({
    email: String(formData.get("email") ?? ""),
    full_name: String(formData.get("fullName") ?? ""),
    date_of_birth: String(formData.get("dateOfBirth") ?? ""),
    gender: String(formData.get("gender") ?? ""),
    age,
    phone_number: String(formData.get("phoneNumber") ?? ""),
    work_number: String(formData.get("workNumber") ?? "") || null,
    professional_email: String(formData.get("professionalEmail") ?? "") || null,
    linkedin_profile: String(formData.get("linkedinProfile") ?? "") || null,
    preferred_contact_methods: preferredContactMethods,
    highest_education: String(formData.get("highestEducation") ?? ""),
    institutions: String(formData.get("institutions") ?? ""),
    additional_credentials: String(formData.get("additionalCredentials") ?? "") || null,
    current_title: String(formData.get("currentTitle") ?? ""),
    current_organization: String(formData.get("currentOrganization") ?? ""),
    work_location: String(formData.get("workLocation") ?? ""),
    organization_website: String(formData.get("organizationWebsite") ?? "") || null,
    industry_experience: String(formData.get("industryExperience") ?? ""),
    resume_path: resumePath,
    headshot_path: headshotPath,
    volunteering_interest: String(formData.get("volunteeringInterest") ?? ""),
    primary_institution: String(formData.get("primaryInstitution") ?? ""),
    community_offerings: String(formData.get("communityOfferings") ?? ""),
    feedback: String(formData.get("feedback") ?? "") || null
  });

  redirect("/login");
}

export default async function RequestAccessPage() {
  const viewer = await getViewer();
  const demoMode = !hasSupabaseEnv();
  const contactOptions = [
    "Text Messages",
    "Phone Call/Voicemail",
    "WhatsApp",
    "Signal",
    "LinkedIn Message",
    "Personal Email",
    "Work Email",
    "All of the Above are Acceptable",
    "Only Contact me through SABR taskforce (SABR.mission@gmail.com)"
  ];
  const mosqueOptions = [
    "Baitul Ilm Academy",
    "IEC Hussaini",
    "Sacred Roots",
    "Masom",
    "Ahlul Bayt Center",
    "Al Zahra",
    "City of Knowledge (TX)",
    "Other"
  ];
  const volunteeringOptions = ["Yes", "No", "Maybe", "Other"];

  return (
    <>
      <SiteHeader viewer={viewer} />
      <div className="shell" style={{ padding: "3rem 0" }}>
        <div className="two-col">
          <section className="card" style={{ padding: "1.8rem" }}>
            <span className="pill">{demoMode ? "Supabase required for live intake" : "Approval-based onboarding"}</span>
            <h1 className="section-title" style={{ marginTop: "1rem" }}>
              Request access to SABR
            </h1>
            <p className="section-copy" style={{ marginTop: "0.8rem" }}>
              This intake mirrors the SABR join request fields so the taskforce can onboard members with complete networking, business, and community context from the start.
            </p>
            <p className="section-copy" style={{ marginTop: "0.8rem" }}>
              {demoMode
                ? "To submit this live form, add Supabase environment variables and create a `request-files` storage bucket."
                : "All fields are required so the private member directory and future networking matches start with complete information."}
            </p>
          </section>
          <form action={requestAccessAction} className="card grid" style={{ padding: "1.5rem" }}>
            <div className="two-col">
              <label className="label">
                Email
                <input className="field" name="email" type="email" required />
              </label>
              <label className="label">
                DATE of Birth
                <input className="field" name="dateOfBirth" type="date" required />
              </label>
            </div>
            <div className="two-col">
              <label className="label">
                FULL Name
                <input className="field" name="fullName" required />
              </label>
              <label className="label">
                Gender
                <input className="field" name="gender" required />
              </label>
            </div>
            <div className="two-col">
              <label className="label">
                Phone Number (US only)
                <input className="field" name="phoneNumber" type="tel" required />
              </label>
              <label className="label">
                Work Number (US only)
                <input className="field" name="workNumber" type="tel" />
              </label>
            </div>
            <div className="two-col">
              <label className="label">
                Email (professional/work)
                <input className="field" name="professionalEmail" type="email" />
              </label>
              <label className="label">
                LinkedIn Profile Link
                <input className="field" name="linkedinProfile" type="url" />
              </label>
            </div>
            <fieldset style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "1rem" }}>
              <legend style={{ padding: "0 0.4rem", color: "var(--muted)" }}>
                Preferred Contact Method
              </legend>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {contactOptions.map((option) => (
                  <label key={option} style={{ display: "flex", gap: "0.65rem", alignItems: "start", color: "var(--foreground)" }}>
                    <input name="preferredContactMethods" type="checkbox" value={option} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="two-col">
              <label className="label">
                Highest Education Attained
                <input className="field" name="highestEducation" required />
              </label>
              <label className="label">
                Educational Institutions Attended or Attending
                <input className="field" name="institutions" required />
              </label>
            </div>
            <label className="label">
              Additional Degrees or Certifications
              <input className="field" name="additionalCredentials" />
            </label>
            <div className="two-col">
              <label className="label">
                Current Job Title/Position
                <input className="field" name="currentTitle" required />
              </label>
              <label className="label">
                Current Company/Firm/Organization
                <input className="field" name="currentOrganization" required />
              </label>
            </div>
            <div className="two-col">
              <label className="label">
                Work City and State
                <input className="field" name="workLocation" required />
              </label>
              <label className="label">
                Company/Firm/Organization website or Jobs Site
                <input className="field" name="organizationWebsite" type="url" />
              </label>
            </div>
            <label className="label">
              Industry/Field of Expertise & Years of Experience
              <input className="field" name="industryExperience" required />
            </label>
            <div className="two-col">
              <label className="label">
                CV / Resume (Google Drive link)
                <span style={{ color: "var(--muted)", fontSize: "0.78rem", marginLeft: "0.4rem" }}>
                  Share your file and paste the link
                </span>
                <input className="field" name="resumeLink" type="url" placeholder="https://drive.google.com/..." />
              </label>
              <label className="label">
                Headshot (Google Drive link)
                <span style={{ color: "var(--muted)", fontSize: "0.78rem", marginLeft: "0.4rem" }}>
                  Share your photo and paste the link
                </span>
                <input className="field" name="headshotLink" type="url" placeholder="https://drive.google.com/..." />
              </label>
            </div>
            <fieldset style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "1rem" }}>
              <legend style={{ padding: "0 0.4rem", color: "var(--muted)" }}>
                Interested in community volunteering, mentoring, open to network?
              </legend>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {volunteeringOptions.map((option) => (
                  <label key={option} style={{ display: "flex", gap: "0.55rem", alignItems: "center" }}>
                    <input name="volunteeringInterest" type="radio" value={option} required />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="label">
              Which Mosque/Religious Institution do you primarily attend?
              <select className="select" name="primaryInstitution" required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {mosqueOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Skills, expertise, talents, businesses, services, and languages spoken
              <textarea className="textarea" name="communityOfferings" required />
            </label>
            <label className="label">
              Thoughts, ideas, suggestions, or feedback
              <textarea className="textarea" name="feedback" />
            </label>
            <button className="button button-primary" type="submit">
              Submit request
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
