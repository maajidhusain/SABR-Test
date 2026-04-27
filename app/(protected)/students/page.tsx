import { DashboardShell } from "@/components/dashboard-shell";
import { DirectoryFilters } from "@/components/directory-filters";
import { requireViewer } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";

export default async function StudentsPage() {
  const viewer = await requireViewer();
  const { students } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="Student directory"
      intro="A simple, private student view designed for opportunity discovery, mentorship pathways, and hiring visibility."
    >
      <DirectoryFilters mode="students" students={students} />
    </DashboardShell>
  );
}
