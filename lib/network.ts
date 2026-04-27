import {
  BusinessProfile,
  MemberProfile,
  NetworkGraph,
  RelationshipEdge,
  RelationshipNode,
  StudentProfile,
  Viewer
} from "@/lib/types";

function overlapReasons(base: string[], candidate: string[], label: string) {
  const shared = base.filter((item) => candidate.includes(item));
  return shared.slice(0, 2).map((item) => `Shared ${label}: ${item}`);
}

function includesLoose(values: string[], query: string) {
  return values.some((value) => value.toLowerCase() === query.toLowerCase());
}

export function buildNetworkGraph(params: {
  viewer: Viewer;
  members: MemberProfile[];
  businesses: BusinessProfile[];
  students: StudentProfile[];
}): NetworkGraph {
  const { viewer, members, businesses, students } = params;
  const viewerMember = members.find((member) => member.profileId === viewer.id) ?? members[0];

  const candidates: Array<{
    id: string;
    kind: RelationshipNode["kind"];
    label: string;
    subtitle: string;
    score: number;
    reasons: string[];
  }> = [];

  members
    .filter((member) => member.profileId !== viewerMember?.profileId)
    .forEach((member) => {
      const reasons: string[] = [];
      if (viewerMember && member.industry === viewerMember.industry) {
        reasons.push(`Same industry: ${member.industry}`);
      }
      if (viewerMember && member.location === viewerMember.location) {
        reasons.push(`Same location: ${member.location}`);
      }
      if (viewerMember) {
        reasons.push(...overlapReasons(viewerMember.specialties, member.specialties, "specialty"));
        reasons.push(...overlapReasons(viewerMember.interests, member.interests, "interest"));
      }

      const score = reasons.length;
      if (score > 0) {
        candidates.push({
          id: member.id,
          kind: "member",
          label: member.fullName,
          subtitle: `${member.profession} · ${member.location}`,
          score,
          reasons
        });
      }
    });

  businesses.forEach((business) => {
    const reasons: string[] = [];
    if (viewerMember && business.ownerIndustry === viewerMember.industry) {
      reasons.push(`Business in your industry: ${business.ownerIndustry}`);
    }
    if (viewerMember && business.location === viewerMember.location) {
      reasons.push(`Nearby business: ${business.location}`);
    }
    if (viewerMember) {
      reasons.push(...overlapReasons(viewerMember.specialties, business.specialties, "specialty"));
    }

    const score = reasons.length;
    if (score > 0) {
      candidates.push({
        id: business.id,
        kind: "business",
        label: business.name,
        subtitle: `${business.category} · ${business.location}`,
        score,
        reasons
      });
    }
  });

  students.forEach((student) => {
    const reasons: string[] = [];
    if (viewerMember) {
      reasons.push(...overlapReasons(viewerMember.interests, student.interests, "interest"));
      if (
        includesLoose(student.interests, "startup building") &&
        includesLoose(viewerMember.interests, "Startups")
      ) {
        reasons.push("Potential startup mentorship fit");
      }
      if (
        includesLoose(student.interests, "Software engineering") &&
        includesLoose(viewerMember.interests, "Hiring")
      ) {
        reasons.push("Potential hiring or mentorship fit");
      }
    }

    const score = reasons.length;
    if (score > 0) {
      candidates.push({
        id: student.id,
        kind: "student",
        label: student.fullName,
        subtitle: `${student.fieldOfStudy} · ${student.school}`,
        score,
        reasons
      });
    }
  });

  const top = candidates.sort((a, b) => b.score - a.score).slice(0, 8);

  const viewerNode: RelationshipNode = {
    id: "viewer",
    kind: "viewer",
    label: viewer.name,
    subtitle: viewerMember
      ? `${viewerMember.profession} · ${viewerMember.location}`
      : "Community member",
    x: 300,
    y: 240,
    size: 34
  };

  const nodes: RelationshipNode[] = [viewerNode];
  const edges: RelationshipEdge[] = [];

  top.forEach((candidate, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(top.length, 1);
    const radius = 170 + (index % 2) * 24;
    nodes.push({
      id: candidate.id,
      kind: candidate.kind,
      label: candidate.label,
      subtitle: candidate.subtitle,
      x: 300 + Math.cos(angle) * radius,
      y: 240 + Math.sin(angle) * radius,
      size: 22 + candidate.score * 2
    });
    edges.push({
      id: `edge-${candidate.id}`,
      source: "viewer",
      target: candidate.id,
      score: candidate.score,
      reasons: candidate.reasons.slice(0, 3)
    });
  });

  return {
    nodes,
    edges
  };
}
