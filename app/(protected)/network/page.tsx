import { DashboardShell } from "@/components/dashboard-shell";
import { NetworkGraphView } from "@/components/network-graph";
import { requireViewer } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";
import { buildNetworkGraph } from "@/lib/network";

export default async function NetworkPage() {
  const viewer = await requireViewer();
  const { members, businesses, students } = await getDirectoryBundle();

  const graph = buildNetworkGraph({
    viewer,
    members,
    businesses,
    students
  });

  return (
    <DashboardShell
      viewer={viewer}
      title="Network view"
      intro="A knowledge-graph style discovery view that centers the signed-in member and explains why nearby people, businesses, and students may be relevant."
    >
      <NetworkGraphView graph={graph} />
    </DashboardShell>
  );
}
