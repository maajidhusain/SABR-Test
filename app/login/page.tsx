import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getViewer, startDemoSession } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function magicLinkAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  if (!email) {
    return;
  }

  if (!hasSupabaseEnv()) {
    await startDemoSession("member");
    redirect("/dashboard");
  }

  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`
    }
  });
}

async function demoLoginAction(formData: FormData) {
  "use server";

  const role = formData.get("role") === "taskforce" ? "taskforce" : "member";
  await startDemoSession(role);
  redirect("/dashboard");
}

export default async function LoginPage() {
  const viewer = await getViewer();
  if (viewer) {
    redirect("/dashboard");
  }

  const demoMode = !hasSupabaseEnv();

  return (
    <>
      <SiteHeader viewer={viewer} />
      <div className="shell" style={{ padding: "3rem 0" }}>
        <div className="two-col">
          <section className="card" style={{ padding: "1.8rem" }}>
            <span className="pill">{demoMode ? "Demo auth active" : "Magic link login"}</span>
            <h1 className="section-title" style={{ marginTop: "1rem" }}>
              Private access for approved members
            </h1>
            <p className="section-copy" style={{ marginTop: "0.8rem" }}>
              Directory and network data only unlock after sign-in and approval. Taskforce members get elevated management tools once their role is set.
            </p>
            <form action={magicLinkAction} className="grid" style={{ marginTop: "1.3rem" }}>
              <label className="label">
                Email address
                <input className="field" name="email" type="email" placeholder="you@example.com" required />
              </label>
              <button className="button button-primary" type="submit">
                {demoMode ? "Enter demo member view" : "Send magic link"}
              </button>
            </form>
            <p className="section-copy" style={{ marginTop: "1rem" }}>
              Need access first? <Link href="/request-access" style={{ color: "var(--brand)", fontWeight: 700 }}>Submit a request</Link>.
            </p>
          </section>
          <section className="grid">
            <article className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ marginTop: 0 }}>Security model</h2>
              <p className="section-copy">
                Supabase Auth handles passwordless login, while database row-level policies protect private member records even if someone attempts direct API access.
              </p>
            </article>
            {demoMode ? (
              <article className="card" style={{ padding: "1.5rem" }}>
                <h2 style={{ marginTop: 0 }}>Demo roles</h2>
                <p className="section-copy">
                  This repo ships with a local demo mode until Supabase keys are configured.
                </p>
                <form action={demoLoginAction} style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <button className="button button-secondary" name="role" value="member" type="submit">
                    Demo member
                  </button>
                  <button className="button button-secondary" name="role" value="taskforce" type="submit">
                    Demo taskforce
                  </button>
                </form>
              </article>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
}
