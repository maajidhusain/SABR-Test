import { DashboardShell } from "@/components/dashboard-shell";
import { requireViewer } from "@/lib/auth";
import { getJobListings } from "@/lib/data";
import { JobBoardClient } from "./job-board-client";

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default async function JobsPage() {
  const viewer = await requireViewer();
  const all = await getJobListings();

  const listings =
    viewer.role === "taskforce" ? all : all.filter((j) => j.status === "approved");

  return (
    <DashboardShell viewer={viewer}>
      <div className="page-head">
        <div>
          <div className="kicker" style={{ marginBottom: 14 }}>Community · Job Board</div>
          <h1 className="serif">Job Opportunities</h1>
          <p className="page-lead">
            Curated openings from SABR-connected businesses and community employers.
            All listings are reviewed by the taskforce before appearing here.
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <a href="/jobs/request" className="btn primary" style={{ textDecoration: "none" }}>
            <PlusIcon /> Request a listing
          </a>
        </div>
      </div>

      <JobBoardClient listings={listings} isTaskforce={viewer.role === "taskforce"} />
    </DashboardShell>
  );
}
