import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockDirectoryBundle } from "@/lib/mock-data";
import { hasSupabaseEnv } from "@/lib/env";
import { DirectoryBundle } from "@/lib/types";

export const getDirectoryBundle = cache(async (): Promise<DirectoryBundle> => {
  if (!hasSupabaseEnv()) {
    return mockDirectoryBundle;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return mockDirectoryBundle;
  }

  const [
    metrosRes,
    membersRes,
    businessesRes,
    studentsRes,
    sectionsRes,
    requestsRes
  ] = await Promise.all([
    supabase.from("metro_areas").select("*").order("name"),
    supabase.from("member_profiles").select("*").order("full_name"),
    supabase.from("business_profiles").select("*").order("name"),
    supabase.from("student_profiles").select("*").order("full_name"),
    supabase.from("section_content").select("*").order("title"),
    supabase.from("access_requests").select("*").order("requested_at", { ascending: false })
  ]);

  return {
    metros: metrosRes.data ?? mockDirectoryBundle.metros,
    members: membersRes.data ?? mockDirectoryBundle.members,
    businesses: businessesRes.data ?? mockDirectoryBundle.businesses,
    students: studentsRes.data ?? mockDirectoryBundle.students,
    sections: (sectionsRes.data as DirectoryBundle["sections"]) ?? mockDirectoryBundle.sections,
    accessRequests: requestsRes.data ?? mockDirectoryBundle.accessRequests
  };
});
