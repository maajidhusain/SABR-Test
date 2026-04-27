import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getViewer } from "@/lib/auth";

export default async function PendingPage() {
  const viewer = await getViewer();

  return (
    <>
      <SiteHeader viewer={viewer} />
      <div className="shell" style={{ padding: "4rem 0" }}>
        <section className="card" style={{ padding: "2rem", maxWidth: "720px" }}>
          <span className="pill">Approval pending</span>
          <h1 className="section-title" style={{ marginTop: "1rem" }}>
            Your access request is still being reviewed.
          </h1>
          <p className="section-copy" style={{ marginTop: "0.8rem" }}>
            The taskforce needs to approve accounts before private community data becomes visible. Once approved, your magic-link login will take you directly into the platform.
          </p>
          <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <Link className="button button-secondary" href="/">
              Return home
            </Link>
            <Link className="button button-primary" href="/logout">
              Sign out
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
