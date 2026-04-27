"use client";

import { useMemo, useState } from "react";

import { ExperienceLevel, JobListing } from "@/lib/types";

const EXP_LABELS: Record<ExperienceLevel, string> = {
  internship: "Internship",
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior",
  executive: "Executive",
};

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const EXP_ORDER: ExperienceLevel[] = ["internship", "entry", "mid", "senior", "executive"];

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr)).sort();
}

export function JobBoardClient({
  listings,
  isTaskforce,
}: {
  listings: JobListing[];
  isTaskforce: boolean;
}) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [expLevel, setExpLevel] = useState<ExperienceLevel | "">("");
  const [location, setLocation] = useState("");

  const industries = useMemo(() => uniq(listings.map((j) => j.industry)), [listings]);
  const locations = useMemo(() => uniq(listings.map((j) => j.location)), [listings]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return listings.filter((j) => {
      if (
        q &&
        !j.title.toLowerCase().includes(q) &&
        !j.company.toLowerCase().includes(q) &&
        !j.description.toLowerCase().includes(q)
      )
        return false;
      if (industry && j.industry !== industry) return false;
      if (expLevel && j.experienceLevel !== expLevel) return false;
      if (location && j.location !== location) return false;
      return true;
    });
  }, [listings, search, industry, expLevel, location]);

  const hasFilters = !!(search || industry || expLevel || location);

  function clearFilters() {
    setSearch("");
    setIndustry("");
    setExpLevel("");
    setLocation("");
  }

  return (
    <>
      {/* Filter bar */}
      <div className="job-filters">
        <input
          type="search"
          className="field job-search"
          placeholder="Search title, company, or keyword…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select job-select"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select
          className="select job-select"
          value={expLevel}
          onChange={(e) => setExpLevel(e.target.value as ExperienceLevel | "")}
        >
          <option value="">All levels</option>
          {EXP_ORDER.map((l) => (
            <option key={l} value={l}>
              {EXP_LABELS[l]}
            </option>
          ))}
        </select>
        <select
          className="select job-select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button className="btn" type="button" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--mute)",
            letterSpacing: "0.06em",
          }}
        >
          {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          {hasFilters && filtered.length !== listings.length && ` of ${listings.length}`}
        </span>
        {isTaskforce && (
          <span style={{ fontSize: 12, color: "var(--mute)", fontStyle: "italic" }}>
            Taskforce view — pending listings visible
          </span>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          style={{
            padding: "48px 0",
            textAlign: "center",
            color: "var(--mute)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 15,
          }}
        >
          No listings match your filters.
        </div>
      ) : (
        <div className="index-list">
          {filtered.map((job, i) => (
            <div
              key={job.id}
              className={`job-row${isTaskforce ? " job-row--admin" : ""}`}
            >
              <span className="idx">{String(i + 1).padStart(3, "0")}</span>
              <div>
                <div className="row-name">{job.title}</div>
                <div className="row-role">
                  {job.company} &middot; {TYPE_LABELS[job.type]}
                </div>
              </div>
              <div className="row-tags">
                <span className="tag">{job.industry}</span>
                <span className="tag">{EXP_LABELS[job.experienceLevel]}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{job.location}</div>
              {isTaskforce && (
                <span
                  className={`tag job-status-${job.status}`}
                  style={{ justifySelf: "start" }}
                >
                  {job.status}
                </span>
              )}
              <a
                href={`mailto:${job.contactEmail}`}
                className="row-arrow"
                aria-label={`Contact about ${job.title}`}
              >
                <ArrowIcon />
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
