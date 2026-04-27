"use client";

import Link from "next/link";
import { useState } from "react";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Legal",
  "Finance",
  "Real Estate",
  "Logistics",
  "Education",
  "Other",
];

const EXP_OPTIONS = [
  { value: "internship", label: "Internship" },
  { value: "entry",      label: "Entry level" },
  { value: "mid",        label: "Mid level" },
  { value: "senior",     label: "Senior" },
  { value: "executive",  label: "Executive" },
];

const TYPE_OPTIONS = [
  { value: "full-time",  label: "Full-time" },
  { value: "part-time",  label: "Part-time" },
  { value: "contract",   label: "Contract" },
  { value: "internship", label: "Internship" },
];

const EMPTY = {
  title: "",
  company: "",
  industry: "",
  experienceLevel: "",
  location: "",
  type: "",
  description: "",
  contactEmail: "",
  applicationUrl: "",
};

export function JobRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY);

  function set(field: keyof typeof EMPTY, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 560, paddingTop: 8 }}>
        <div className="aside-callout">
          <div className="aside-marker" style={{ color: "var(--moss)" }}>✓</div>
          <div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 15,
                color: "var(--ink)",
                marginBottom: 4,
              }}
            >
              Listing request submitted
            </div>
            <div style={{ fontSize: 13, color: "var(--mute)" }}>
              A taskforce member will review your submission before it appears on the job
              board. You&rsquo;ll hear back via email.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Link href="/jobs" className="linkish">
            ← Back to job board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 640, display: "grid", gap: 20 }}
    >
      <div className="two-col">
        <label className="label">
          Job title <span style={{ color: "var(--rust)" }}>*</span>
          <input
            className="field"
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Operations Manager"
          />
        </label>
        <label className="label">
          Company <span style={{ color: "var(--rust)" }}>*</span>
          <input
            className="field"
            required
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="e.g. Bright Path Dental"
          />
        </label>
      </div>

      <div className="two-col">
        <label className="label">
          Industry <span style={{ color: "var(--rust)" }}>*</span>
          <select
            className="select"
            required
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          Experience level <span style={{ color: "var(--rust)" }}>*</span>
          <select
            className="select"
            required
            value={form.experienceLevel}
            onChange={(e) => set("experienceLevel", e.target.value)}
          >
            <option value="">Select a level</option>
            {EXP_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="two-col">
        <label className="label">
          Location <span style={{ color: "var(--rust)" }}>*</span>
          <input
            className="field"
            required
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Chicago, IL"
          />
        </label>
        <label className="label">
          Employment type <span style={{ color: "var(--rust)" }}>*</span>
          <select
            className="select"
            required
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
          >
            <option value="">Select a type</option>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="label">
        Description <span style={{ color: "var(--rust)" }}>*</span>
        <textarea
          className="textarea"
          required
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for…"
        />
      </label>

      <div className="two-col">
        <label className="label">
          Contact email <span style={{ color: "var(--rust)" }}>*</span>
          <input
            type="email"
            className="field"
            required
            value={form.contactEmail}
            onChange={(e) => set("contactEmail", e.target.value)}
            placeholder="hiring@company.com"
          />
        </label>
        <label className="label">
          Application URL{" "}
          <span style={{ fontSize: 11, color: "var(--mute)" }}>(optional)</span>
          <input
            type="url"
            className="field"
            value={form.applicationUrl}
            onChange={(e) => set("applicationUrl", e.target.value)}
            placeholder="https://…"
          />
        </label>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", paddingTop: 8 }}>
        <button type="submit" className="btn primary">
          Submit for review
        </button>
        <Link href="/jobs" className="linkish">
          Cancel
        </Link>
      </div>
    </form>
  );
}
