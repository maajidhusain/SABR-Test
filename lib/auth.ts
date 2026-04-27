import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Viewer } from "@/lib/types";

const DEMO_COOKIE = "sabr_demo_session";

type DemoRole = "member" | "taskforce";

const demoViewers: Record<DemoRole, Viewer> = {
  member: {
    id: "user-3",
    email: "hasan@sabr-demo.org",
    name: "Hasan Abidi",
    role: "member",
    approvalStatus: "approved",
    metroAreaId: "metro-chicago",
    isDemo: true
  },
  taskforce: {
    id: "user-1",
    email: "ali@sabr-demo.org",
    name: "Ali Raza",
    role: "taskforce",
    approvalStatus: "approved",
    metroAreaId: "metro-chicago",
    isDemo: true
  }
};

export async function getViewer(): Promise<Viewer | null> {
  if (!hasSupabaseEnv()) {
    const cookieStore = await cookies();
    const demoRole = cookieStore.get(DEMO_COOKIE)?.value as DemoRole | undefined;
    return demoRole ? demoViewers[demoRole] : null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return null;
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (!profileData) {
    return null;
  }

  return {
    id: profileData.id,
    email: authData.user.email ?? "",
    name: profileData.full_name,
    role: profileData.role,
    approvalStatus: profileData.approval_status,
    metroAreaId: profileData.metro_area_id,
    isDemo: false
  };
}

export async function requireViewer() {
  const viewer = await getViewer();
  if (!viewer) {
    redirect("/login");
  }
  if (viewer.approvalStatus !== "approved") {
    redirect("/pending");
  }
  return viewer;
}

export async function requireTaskforce() {
  const viewer = await requireViewer();
  if (viewer.role !== "taskforce") {
    redirect("/dashboard");
  }
  return viewer;
}

export async function startDemoSession(role: DemoRole) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export async function clearSession() {
  if (!hasSupabaseEnv()) {
    const cookieStore = await cookies();
    cookieStore.delete(DEMO_COOKIE);
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
}
