import {
  AccessRequest,
  BusinessProfile,
  DirectoryBundle,
  MemberProfile,
  MetroArea,
  SectionContent,
  StudentProfile
} from "@/lib/types";

const metro: MetroArea = {
  id: "metro-chicago",
  slug: "chicagoland",
  name: "Chicagoland",
  region: "Illinois",
  isActive: true
};

export const mockMembers: MemberProfile[] = [
  {
    id: "member-1",
    profileId: "user-1",
    fullName: "Ali Raza",
    profession: "Operations Director",
    employer: "Lakeshore Logistics",
    location: "Naperville",
    industry: "Logistics",
    specialties: ["Supply chain", "Vendor operations", "Procurement"],
    interests: ["Mentorship", "Community strategy", "Startups"],
    contactVisibility: "directory"
  },
  {
    id: "member-2",
    profileId: "user-2",
    fullName: "Fatima Zehra",
    profession: "Pediatric Dentist",
    employer: "Bright Path Dental",
    location: "Skokie",
    industry: "Healthcare",
    specialties: ["Family dentistry", "Practice growth", "Parent education"],
    interests: ["Youth programming", "Women founders", "Volunteer care"],
    contactVisibility: "directory"
  },
  {
    id: "member-3",
    profileId: "user-3",
    fullName: "Hasan Abidi",
    profession: "Software Engineer",
    employer: "Midwest Health Tech",
    location: "Chicago",
    industry: "Technology",
    specialties: ["Product engineering", "Data systems", "Automation"],
    interests: ["Hiring", "Student mentorship", "AI tools"],
    contactVisibility: "directory"
  },
  {
    id: "member-4",
    profileId: "user-4",
    fullName: "Zainab Jafri",
    profession: "Commercial Realtor",
    employer: "Cityline Advisors",
    location: "Oak Brook",
    industry: "Real Estate",
    specialties: ["Site selection", "Lease negotiation", "Retail buildout"],
    interests: ["Business networking", "Local investment"],
    contactVisibility: "directory"
  }
];

export const mockBusinesses: BusinessProfile[] = [
  {
    id: "business-1",
    ownerProfileId: "user-1",
    name: "Sabr Fulfillment Partners",
    category: "Business Services",
    services: ["Inventory management", "Warehousing", "Vendor sourcing"],
    location: "Aurora",
    specialties: ["Supply chain", "Vendor operations", "Growth planning"],
    contactEmail: "contact@sabrfulfillment.example",
    ownerIndustry: "Logistics",
    summary: "Operations support for growing product businesses across the Chicago suburbs."
  },
  {
    id: "business-2",
    ownerProfileId: "user-2",
    name: "Bright Path Dental",
    category: "Healthcare",
    services: ["Family dentistry", "Pediatric care", "Education workshops"],
    location: "Skokie",
    specialties: ["Healthcare", "Families", "Parent education"],
    contactEmail: "hello@brightpath.example",
    ownerIndustry: "Healthcare",
    summary: "Community-centered pediatric dental practice with strong educational outreach."
  },
  {
    id: "business-3",
    ownerProfileId: "user-4",
    name: "Cityline Advisors",
    category: "Real Estate",
    services: ["Commercial leasing", "Retail site search", "Tenant advisory"],
    location: "Oak Brook",
    specialties: ["Real estate", "Retail", "Growth planning"],
    contactEmail: "info@cityline.example",
    ownerIndustry: "Real Estate",
    summary: "Commercial property advisory for businesses opening or expanding in Chicagoland."
  }
];

export const mockStudents: StudentProfile[] = [
  {
    id: "student-1",
    profileId: "user-5",
    fullName: "Murtaza Naqvi",
    school: "University of Illinois Chicago",
    fieldOfStudy: "Computer Science",
    graduationYear: 2027,
    interests: ["Software engineering", "AI tools", "Startup building"],
    careerDirection: "Seeking engineering internships and founder mentorship."
  },
  {
    id: "student-2",
    profileId: "user-6",
    fullName: "Maryam Rizvi",
    school: "Northwestern University",
    fieldOfStudy: "Public Health",
    graduationYear: 2026,
    interests: ["Community health", "Healthcare operations", "Research"],
    careerDirection: "Interested in healthcare analytics and community wellness programs."
  }
];

export const mockSections: SectionContent[] = [
  {
    id: "section-1",
    slug: "communities",
    title: "SABR Communities",
    overview: "Local relationship-building across neighborhoods, masajid, professions, and service circles.",
    items: [
      { title: "Northside connectors", description: "Monthly gathering for professionals and families in the north suburbs.", badge: "Monthly" },
      { title: "Neighborhood ambassadors", description: "Trusted point people for outreach, needs discovery, and local announcements." }
    ]
  },
  {
    id: "section-2",
    slug: "war-webinars",
    title: "WAR Webinars",
    overview: "Action-oriented webinars centered on wisdom, advocacy, and resilience.",
    items: [
      { title: "Economic readiness briefing", description: "A practical discussion on job resilience and halal career pivots.", badge: "Next up" },
      { title: "Parenting under pressure", description: "Community resource session for families navigating uncertainty." }
    ]
  },
  {
    id: "section-3",
    slug: "job-opportunities",
    title: "Job Opportunities",
    overview: "Referrals, openings, and warm introductions shared inside the community.",
    items: [
      { title: "Product operations associate", description: "Referral opportunity through a community-owned logistics business." },
      { title: "Dental office coordinator", description: "Part-time and full-time openings in Skokie." }
    ]
  },
  {
    id: "section-4",
    slug: "startup-think-tank",
    title: "Startup Think Tank",
    overview: "A collaborative incubator model for founders, operators, and advisors.",
    items: [
      { title: "Pitch review circle", description: "Founders get structured feedback from operators and investors.", badge: "Pilot" },
      { title: "Resource match board", description: "Connects startup needs with subject-matter experts in the directory." }
    ]
  },
  {
    id: "section-5",
    slug: "seniors",
    title: "SABR Seniors",
    overview: "Programming and outreach to keep senior community members visible, supported, and connected.",
    items: [
      { title: "Transportation needs intake", description: "Taskforce-led list of members who need ride coordination." },
      { title: "Intergenerational lunch", description: "Youth and seniors paired around oral-history and practical support." }
    ]
  }
];

export const mockAccessRequests: AccessRequest[] = [
  {
    id: "request-1",
    email: "newmember@example.com",
    fullName: "Sara Mehdi",
    dateOfBirth: "1995-07-19",
    gender: "Female",
    age: 30,
    phoneNumber: "(312) 555-0100",
    workNumber: "(312) 555-0199",
    professionalEmail: "sara.mehdi@carebridge.example",
    linkedinProfile: "https://linkedin.com/in/sara-mehdi",
    preferredContactMethods: ["Text Messages", "Personal Email", "LinkedIn Message"],
    highestEducation: "DDS",
    institutions: "University of Illinois Chicago",
    additionalCredentials: "Healthcare Leadership Certificate, 2024",
    currentTitle: "Practice Operations Manager",
    currentOrganization: "CareBridge Health",
    workLocation: "Chicago, IL",
    organizationWebsite: "https://carebridge.example/jobs",
    industryExperience: "Healthcare operations, 7 years",
    resumePath: "access-requests/request-1/resume.pdf",
    headshotPath: "access-requests/request-1/headshot.jpg",
    volunteeringInterest: "Yes",
    primaryInstitution: "IEC Hussaini",
    communityOfferings: "Healthcare operations support, mentoring, Arabic and Urdu.",
    feedback: "Would love stronger healthcare and student mentorship channels.",
    status: "pending",
    requestedAt: "2026-04-22"
  },
  {
    id: "request-2",
    email: "mentor@example.com",
    fullName: "Jawad Rizvi",
    dateOfBirth: "1988-11-03",
    gender: "Male",
    age: 37,
    phoneNumber: "(847) 555-0142",
    workNumber: "(847) 555-0107",
    professionalEmail: "jawad.rizvi@firmexample.com",
    linkedinProfile: "https://linkedin.com/in/jawadrizvi",
    preferredContactMethods: ["Phone Call/Voicemail", "WhatsApp", "Work Email"],
    highestEducation: "JD",
    institutions: "Loyola University Chicago; DePaul University",
    additionalCredentials: "Startup Advisor, 2025",
    currentTitle: "Attorney",
    currentOrganization: "Rizvi Legal Group",
    workLocation: "Skokie, IL",
    organizationWebsite: "https://rizvilegal.example/careers",
    industryExperience: "Law and startup advisory, 11 years",
    resumePath: "access-requests/request-2/resume.pdf",
    headshotPath: "access-requests/request-2/headshot.png",
    volunteeringInterest: "Maybe",
    primaryInstitution: "Baitul Ilm Academy",
    communityOfferings: "Legal clinics, startup mentorship, public speaking, Gujarati.",
    feedback: "A founders and professionals roundtable would be helpful.",
    status: "pending",
    requestedAt: "2026-04-24"
  }
];

export const mockDirectoryBundle: DirectoryBundle = {
  metros: [metro],
  members: mockMembers,
  businesses: mockBusinesses,
  students: mockStudents,
  sections: mockSections,
  accessRequests: mockAccessRequests
};
