import { DashboardShell } from "@/components/dashboard-shell";
import { requireViewer } from "@/lib/auth";
import { JobRequestForm } from "./job-request-form";

export default async function JobRequestPage() {
  const viewer = await requireViewer();

  return (
    <DashboardShell viewer={viewer}>
      <div className="page-head">
        <div>
          <div className="kicker" style={{ marginBottom: 14 }}>Job Board · New Listing</div>
          <h1 className="serif">Request a listing</h1>
          <p className="page-lead">
            Submit a job opening for taskforce review. Once approved, it will appear on the
            community job board.
          </p>
        </div>
      </div>

      <JobRequestForm />
    </DashboardShell>
  );
}
