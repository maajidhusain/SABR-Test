export type Role = "member" | "taskforce";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export type MetroArea = {
  id: string;
  slug: string;
  name: string;
  region: string;
  isActive: boolean;
};

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  approvalStatus: ApprovalStatus;
  metroAreaId: string;
  bio: string;
};

export type MemberProfile = {
  id: string;
  profileId: string;
  fullName: string;
  profession: string;
  employer: string;
  location: string;
  industry: string;
  specialties: string[];
  interests: string[];
  contactVisibility: "directory" | "taskforce-only";
  institutions: string;
  masjidAffiliation: string;
  additionalCredentials: string | null;
  organizationWebsite: string | null;
  industryExperience: string;
  wantsResume: boolean;
  resumePath: string | null;
};

export type BusinessProfile = {
  id: string;
  ownerProfileId: string;
  name: string;
  category: string;
  services: string[];
  location: string;
  specialties: string[];
  contactEmail: string;
  ownerIndustry: string;
  summary: string;
};

export type StudentProfile = {
  id: string;
  profileId: string;
  fullName: string;
  school: string;
  fieldOfStudy: string;
  graduationYear: number;
  interests: string[];
  careerDirection: string;
};

export type SectionSlug =
  | "communities"
  | "war-webinars"
  | "job-opportunities"
  | "startup-think-tank"
  | "seniors";

export type ExperienceLevel = "internship" | "entry" | "mid" | "senior" | "executive";

export type JobListing = {
  id: string;
  title: string;
  company: string;
  industry: string;
  experienceLevel: ExperienceLevel;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  contactEmail: string;
  applicationUrl: string | null;
  status: ApprovalStatus;
  requestedBy: string;
  requestedAt: string;
};

export type SectionContent = {
  id: string;
  slug: SectionSlug;
  title: string;
  overview: string;
  items: {
    title: string;
    description: string;
    badge?: string;
  }[];
};

export type AccessRequest = {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  phoneNumber: string;
  workNumber: string | null;
  professionalEmail: string | null;
  linkedinProfile: string | null;
  preferredContactMethods: string[];
  highestEducation: string;
  institutions: string;
  additionalCredentials: string | null;
  currentTitle: string;
  currentOrganization: string;
  workLocation: string;
  organizationWebsite: string | null;
  industryExperience: string;
  resumePath: string | null;
  headshotPath: string | null;
  volunteeringInterest: string;
  primaryInstitution: string;
  communityOfferings: string;
  feedback: string | null;
  status: ApprovalStatus;
  requestedAt: string;
};

export type Viewer = {
  id: string;
  email: string;
  name: string;
  role: Role;
  approvalStatus: ApprovalStatus;
  metroAreaId: string;
  isDemo: boolean;
};

export type DirectoryBundle = {
  metros: MetroArea[];
  members: MemberProfile[];
  businesses: BusinessProfile[];
  students: StudentProfile[];
  sections: SectionContent[];
  accessRequests: AccessRequest[];
};

export type RelationshipNode = {
  id: string;
  kind: "viewer" | "member" | "business" | "student";
  label: string;
  subtitle: string;
  x: number;
  y: number;
  size: number;
};

export type RelationshipEdge = {
  id: string;
  source: string;
  target: string;
  score: number;
  reasons: string[];
};

export type NetworkGraph = {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
};
