import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockDirectoryBundle, mockJobListings, mockMembers } from "@/lib/mock-data";
import { hasSupabaseEnv } from "@/lib/env";
import { DirectoryBundle, JobListing, MemberProfile } from "@/lib/types";

function mapMemberProfileRow(row: Record<string, unknown>): MemberProfile {
  return {
    id: row.id as string,
    profileId: ((row.profile_id ?? row.profileId) as string) ?? "",
    fullName: ((row.full_name ?? row.fullName) as string) ?? "",
    profession: (row.profession as string) ?? "",
    employer: (row.employer as string) ?? "",
    location: (row.location as string) ?? "",
    industry: (row.industry as string) ?? "",
    specialties: (row.specialties as string[]) ?? [],
    interests: (row.interests as string[]) ?? [],
    contactVisibility: ((row.contact_visibility ?? row.contactVisibility) as "directory" | "taskforce-only") ?? "directory",
    institutions: ((row.institutions as string) ?? ""),
    additionalCredentials: ((row.additional_credentials ?? row.additionalCredentials) as string | null) ?? null,
    organizationWebsite: ((row.organization_website ?? row.organizationWebsite) as string | null) ?? null,
    industryExperience: ((row.industry_experience ?? row.industryExperience) as string) ?? "",
    wantsResume: ((row.wants_resume ?? row.wantsResume) as boolean) ?? false,
    resumePath: ((row.resume_path ?? row.resumePath) as string | null) ?? null,
  };
}

export async function getMemberProfile(profileId: string): Promise<MemberProfile | null> {
  if (!hasSupabaseEnv()) {
    const mock = mockMembers.find((m) => m.profileId === profileId);
    return mock ? mapMemberProfileRow(mock as unknown as Record<string, unknown>) : null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("member_profiles")
    .select("*")
    .eq("profile_id", profileId)
    .maybeSingle();

  if (!data) return null;
  return mapMemberProfileRow(data as Record<string, unknown>);
}

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

export const getJobListings = cache(async (): Promise<JobListing[]> => {
  if (!hasSupabaseEnv()) return mockJobListings;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return mockJobListings;

  const { data } = await supabase
    .from("job_listings")
    .select("*")
    .order("requested_at", { ascending: false });

  return (data as JobListing[]) ?? mockJobListings;
});
