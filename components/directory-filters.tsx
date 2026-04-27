"use client";

import { useEffect, useMemo, useState } from "react";

import { BusinessProfile, MemberProfile, StudentProfile } from "@/lib/types";

type Mode = "members" | "businesses" | "students";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColors = ["av-rust", "av-moss", "av-gold", "av-stone"];
function avatarColor(id: string) {
  const idx = id.charCodeAt(id.length - 1) % avatarColors.length;
  return avatarColors[idx];
}

function useEscapeKey(onClose: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "0.5rem", alignItems: "baseline" }}>
      <span className="kicker">{label}</span>
      <span style={{ fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

function PillList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="kicker" style={{ marginBottom: "0.5rem" }}>{label}</p>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {items.map((item) => (
          <span key={item} className="pill">{item}</span>
        ))}
      </div>
    </div>
  );
}

function ModalShell({ onClose, avatarLabel, avatarColorClass, headline, sub, pill, children }: {
  onClose: () => void;
  avatarLabel: string;
  avatarColorClass: string;
  headline: string;
  sub: string;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(31, 58, 46, 0.35)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--ivory)",
          border: "1px solid var(--rule)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-lg)",
          width: "100%",
          maxWidth: 520,
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            padding: "1.5rem 1.5rem 1.2rem",
            borderBottom: "1px solid var(--rule)",
            flexShrink: 0,
          }}
        >
          <div className={`av av-lg ${avatarColorClass}`} style={{ flexShrink: 0 }}>
            {avatarLabel}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: "1.2rem", lineHeight: 1.2, marginBottom: "0.25rem" }}>{headline}</h3>
            <p className="section-copy" style={{ fontSize: "0.92rem" }}>{sub}</p>
            <div style={{ marginTop: "0.5rem" }}>
              <span className="pill">{pill}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              border: "1px solid var(--rule)",
              borderRadius: "50%",
              background: "var(--paper)",
              color: "var(--mute)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              fontSize: "1rem",
              lineHeight: 1,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ padding: "1.4rem 1.5rem", display: "grid", gap: "1rem", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function MemberModal({ member, onClose }: { member: MemberProfile; onClose: () => void }) {
  useEscapeKey(onClose);
  return (
    <ModalShell
      onClose={onClose}
      avatarLabel={initials(member.fullName)}
      avatarColorClass={avatarColor(member.id)}
      headline={member.fullName}
      sub={`${member.profession} · ${member.employer}`}
      pill={member.industry}
    >
      <ProfileRow label="Location" value={member.location} />
      <ProfileRow label="Industry" value={member.industry} />
      <ProfileRow label="Current title" value={`${member.profession} at ${member.employer}`} />
      <ProfileRow label="Schools attended" value={member.institutions} />
      <ProfileRow label="Masjid affiliation" value={member.masjidAffiliation} />
      {member.additionalCredentials && (
        <ProfileRow label="Credentials" value={member.additionalCredentials} />
      )}
      {member.industryExperience && (
        <ProfileRow label="Experience" value={member.industryExperience} />
      )}
      <PillList label="Specialties" items={member.specialties} />
      <PillList label="Interests" items={member.interests} />
    </ModalShell>
  );
}

function BusinessModal({ business, onClose }: { business: BusinessProfile; onClose: () => void }) {
  useEscapeKey(onClose);
  return (
    <ModalShell
      onClose={onClose}
      avatarLabel={initials(business.name)}
      avatarColorClass={avatarColor(business.id)}
      headline={business.name}
      sub={`${business.category} · ${business.location}`}
      pill={business.ownerIndustry}
    >
      <ProfileRow label="Category" value={business.category} />
      <ProfileRow label="Location" value={business.location} />
      <ProfileRow label="Industry" value={business.ownerIndustry} />
      {business.summary && <ProfileRow label="About" value={business.summary} />}
      {business.contactEmail && <ProfileRow label="Contact" value={business.contactEmail} />}
      <PillList label="Services" items={business.services} />
      <PillList label="Specialties" items={business.specialties} />
    </ModalShell>
  );
}

function StudentModal({ student, onClose }: { student: StudentProfile; onClose: () => void }) {
  useEscapeKey(onClose);
  return (
    <ModalShell
      onClose={onClose}
      avatarLabel={initials(student.fullName)}
      avatarColorClass={avatarColor(student.id)}
      headline={student.fullName}
      sub={`${student.fieldOfStudy} · ${student.school}`}
      pill={String(student.graduationYear)}
    >
      <ProfileRow label="School" value={student.school} />
      <ProfileRow label="Field of study" value={student.fieldOfStudy} />
      <ProfileRow label="Graduation year" value={String(student.graduationYear)} />
      {student.careerDirection && <ProfileRow label="Career direction" value={student.careerDirection} />}
      <PillList label="Interests" items={student.interests} />
    </ModalShell>
  );
}

export function DirectoryFilters({
  mode,
  members,
  businesses,
  students
}: {
  mode: Mode;
  members?: MemberProfile[];
  businesses?: BusinessProfile[];
  students?: StudentProfile[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessProfile | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const rows = useMemo(() => {
    if (mode === "members" && members) {
      const filtered = members.filter((member) => {
        const matchesQuery =
          `${member.fullName} ${member.profession} ${member.industry} ${member.specialties.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          member.location === filter ||
          member.industry === filter ||
          member.profession === filter ||
          member.specialties.includes(filter);
        return matchesQuery && matchesFilter;
      });
      filtered.sort((a, b) =>
        sort === "industry"
          ? a.industry.localeCompare(b.industry)
          : sort === "location"
            ? a.location.localeCompare(b.location)
            : a.fullName.localeCompare(b.fullName)
      );
      return filtered.map((member) => (
        <button
          key={member.id}
          className="card"
          onClick={() => setSelectedMember(member)}
          style={{
            padding: "1.2rem",
            textAlign: "left",
            cursor: "pointer",
            width: "100%",
            border: "1px solid var(--rule)",
            transition: "border-color 140ms ease, box-shadow 140ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(31,58,46,0.3)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--rule)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className={`av av-md ${avatarColor(member.id)}`} style={{ flexShrink: 0 }}>
              {initials(member.fullName)}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>{member.fullName}</h3>
              <p className="section-copy" style={{ fontSize: "0.85rem" }}>
                {member.profession}
              </p>
            </div>
          </div>
          <div className="pill" style={{ marginBottom: "0.5rem" }}>{member.industry}</div>
          <p className="section-copy" style={{ fontSize: "0.83rem" }}>{member.location}</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            {member.specialties.slice(0, 3).map((specialty) => (
              <span key={specialty} className="pill" style={{ fontSize: "0.8rem" }}>{specialty}</span>
            ))}
          </div>
        </button>
      ));
    }

    if (mode === "businesses" && businesses) {
      const filtered = businesses.filter((business) => {
        const matchesQuery =
          `${business.name} ${business.category} ${business.location} ${business.services.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          business.category === filter ||
          business.location === filter ||
          business.ownerIndustry === filter ||
          business.services.includes(filter);
        return matchesQuery && matchesFilter;
      });
      filtered.sort((a, b) =>
        sort === "category"
          ? a.category.localeCompare(b.category)
          : sort === "location"
            ? a.location.localeCompare(b.location)
            : a.name.localeCompare(b.name)
      );
      return filtered.map((business) => (
        <button
          key={business.id}
          className="card"
          onClick={() => setSelectedBusiness(business)}
          style={{
            padding: "1.2rem",
            textAlign: "left",
            cursor: "pointer",
            width: "100%",
            border: "1px solid var(--rule)",
            transition: "border-color 140ms ease, box-shadow 140ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(31,58,46,0.3)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--rule)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className={`av av-md ${avatarColor(business.id)}`} style={{ flexShrink: 0 }}>
              {initials(business.name)}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>{business.name}</h3>
              <p className="section-copy" style={{ fontSize: "0.85rem" }}>{business.category}</p>
            </div>
          </div>
          <p className="section-copy" style={{ fontSize: "0.83rem", marginBottom: "0.5rem" }}>{business.summary}</p>
          <p className="section-copy" style={{ fontSize: "0.83rem" }}>{business.location} · {business.ownerIndustry}</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            {business.services.slice(0, 3).map((service) => (
              <span key={service} className="pill" style={{ fontSize: "0.8rem" }}>{service}</span>
            ))}
          </div>
        </button>
      ));
    }

    if (mode === "students" && students) {
      const filtered = students.filter((student) => {
        const matchesQuery =
          `${student.fullName} ${student.school} ${student.fieldOfStudy} ${student.interests.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          student.school === filter ||
          student.fieldOfStudy === filter ||
          student.interests.includes(filter);
        return matchesQuery && matchesFilter;
      });
      filtered.sort((a, b) =>
        sort === "graduation"
          ? a.graduationYear - b.graduationYear
          : sort === "school"
            ? a.school.localeCompare(b.school)
            : a.fullName.localeCompare(b.fullName)
      );
      return filtered.map((student) => (
        <button
          key={student.id}
          className="card"
          onClick={() => setSelectedStudent(student)}
          style={{
            padding: "1.2rem",
            textAlign: "left",
            cursor: "pointer",
            width: "100%",
            border: "1px solid var(--rule)",
            transition: "border-color 140ms ease, box-shadow 140ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(31,58,46,0.3)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--rule)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className={`av av-md ${avatarColor(student.id)}`} style={{ flexShrink: 0 }}>
              {initials(student.fullName)}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>{student.fullName}</h3>
              <p className="section-copy" style={{ fontSize: "0.85rem" }}>{student.fieldOfStudy}</p>
            </div>
          </div>
          <div className="pill" style={{ marginBottom: "0.5rem" }}>{student.graduationYear}</div>
          <p className="section-copy" style={{ fontSize: "0.83rem" }}>{student.school}</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            {student.interests.slice(0, 3).map((interest) => (
              <span key={interest} className="pill" style={{ fontSize: "0.8rem" }}>{interest}</span>
            ))}
          </div>
        </button>
      ));
    }

    return [];
  }, [mode, members, businesses, students, query, filter, sort]);

  const filterOptions = useMemo(() => {
    if (mode === "members" && members) {
      return Array.from(
        new Set(
          members.flatMap((member) => [
            member.location,
            member.industry,
            member.profession,
            ...member.specialties
          ])
        )
      );
    }
    if (mode === "businesses" && businesses) {
      return Array.from(
        new Set(
          businesses.flatMap((business) => [
            business.category,
            business.location,
            business.ownerIndustry,
            ...business.services
          ])
        )
      );
    }
    if (mode === "students" && students) {
      return Array.from(
        new Set(
          students.flatMap((student) => [student.school, student.fieldOfStudy, ...student.interests])
        )
      );
    }
    return [];
  }, [mode, members, businesses, students]);

  return (
    <>
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
      {selectedBusiness && (
        <BusinessModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
      )}
      {selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
      <section className="grid">
        <div className="card" style={{ padding: "1rem" }}>
          <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr 1fr" }}>
            <label className="label">
              Search
              <input className="field" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find by name, category, specialty, or interest" />
            </label>
            <label className="label">
              Filter
              <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Sort
              <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="name">Name</option>
                <option value={mode === "students" ? "school" : mode === "members" ? "industry" : "category"}>
                  {mode === "students" ? "School" : mode === "members" ? "Industry" : "Category"}
                </option>
                <option value={mode === "students" ? "graduation" : "location"}>
                  {mode === "students" ? "Graduation year" : "Location"}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {rows}
        </div>
      </section>
    </>
  );
}
