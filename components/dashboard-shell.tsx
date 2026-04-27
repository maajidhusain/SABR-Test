import { Viewer } from "@/lib/types";

import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardShell({
  viewer,
  title,
  intro,
  children
}: {
  viewer: Viewer;
  title?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <DashboardSidebar viewer={viewer} />
      <main className="page-content">
        {title && (
          <div className="page-head">
            <div>
              <h1 className="serif">{title}</h1>
              {intro && <p className="page-lead">{intro}</p>}
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
