"use client";

import { useMemo, useState } from "react";

import { BusinessProfile, MemberProfile, StudentProfile } from "@/lib/types";

type Mode = "members" | "businesses" | "students";

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
        <article key={member.id} className="card" style={{ padding: "1.2rem" }}>
          <div className="pill">{member.industry}</div>
          <h3 style={{ marginBottom: "0.2rem" }}>{member.fullName}</h3>
          <p className="section-copy">{member.profession} at {member.employer}</p>
          <p className="section-copy">{member.location}</p>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
            {member.specialties.map((specialty) => (
              <span key={specialty} className="pill">{specialty}</span>
            ))}
          </div>
        </article>
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
        <article key={business.id} className="card" style={{ padding: "1.2rem" }}>
          <div className="pill">{business.category}</div>
          <h3 style={{ marginBottom: "0.2rem" }}>{business.name}</h3>
          <p className="section-copy">{business.summary}</p>
          <p className="section-copy">{business.location} · {business.ownerIndustry}</p>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
            {business.services.map((service) => (
              <span key={service} className="pill">{service}</span>
            ))}
          </div>
        </article>
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
        <article key={student.id} className="card" style={{ padding: "1.2rem" }}>
          <div className="pill">{student.graduationYear}</div>
          <h3 style={{ marginBottom: "0.2rem" }}>{student.fullName}</h3>
          <p className="section-copy">{student.fieldOfStudy} at {student.school}</p>
          <p className="section-copy">{student.careerDirection}</p>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
            {student.interests.map((interest) => (
              <span key={interest} className="pill">{interest}</span>
            ))}
          </div>
        </article>
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
  );
}
