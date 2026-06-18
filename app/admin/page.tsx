"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { addStudent, verifyPassword } from "./actions";

const emptyForm = {
  fullName: "",
  photoUrl: "",
  degree: "",
  duration: "",
  bio: "",
  linkedinUrl: "",
  twitterUrl: "",
  graduationYear: "2025",
  gpa: "",
  achievements: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    const valid = await verifyPassword(password);
    if (valid) {
      setAuthenticated(true);
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  }

  async function handleStudentSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSuccessMessage("");

    const result = await addStudent(password, form);

    setSubmitting(false);

    if (result.success) {
      setSuccessMessage(`${form.fullName} has been added successfully.`);
      setForm(emptyForm);
    } else {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <main className="admin-page">
      <nav className="admin-nav">
        <Link href="/" className="admin-nav-brand">
          <span className="site-nav-mark" aria-hidden="true" />
          <span className="admin-nav-title">MIVA LEGACY</span>
        </Link>
        <span className="admin-nav-label">Admin</span>
      </nav>

      <section className="admin-section">
        {!authenticated ? (
          <>
            <p className="admin-eyebrow">Restricted Access</p>
            <h1 className="admin-heading">Admin Login</h1>
            <p className="admin-description">
              Enter the admin password to add new students to the archive.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <label className="admin-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                style={{ marginBottom: "16px" }}
                required
              />
              {passwordError && <p className="admin-error">{passwordError}</p>}
              <button type="submit" className="admin-submit admin-submit-enter">
                Enter
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="admin-eyebrow">Student Management</p>
            <h1 className="admin-heading">Add New Student</h1>
            <p className="admin-description">
              Fill in the details below to publish a new graduate profile.
            </p>

            {successMessage && <div className="admin-alert">{successMessage}</div>}

            {submitError && <div className="admin-alert admin-alert-error">{submitError}</div>}

            <form onSubmit={handleStudentSubmit} className="admin-form">
              <div>
                <label className="admin-label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="photoUrl">
                  Photo URL
                </label>
                <input
                  id="photoUrl"
                  type="url"
                  value={form.photoUrl}
                  onChange={(e) => updateField("photoUrl", e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="degree">
                  Degree
                </label>
                <input
                  id="degree"
                  type="text"
                  value={form.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="duration">
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  value={form.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  placeholder='e.g. "2 years" or "2022 - 2025"'
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={4}
                  className="admin-input"
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="linkedinUrl">
                  LinkedIn URL
                </label>
                <input
                  id="linkedinUrl"
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="twitterUrl">
                  Twitter URL
                </label>
                <input
                  id="twitterUrl"
                  type="url"
                  value={form.twitterUrl}
                  onChange={(e) => updateField("twitterUrl", e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-grid">
                <div>
                  <label className="admin-label" htmlFor="graduationYear">
                    Graduation Year
                  </label>
                  <input
                    id="graduationYear"
                    type="number"
                    value={form.graduationYear}
                    onChange={(e) => updateField("graduationYear", e.target.value)}
                    className="admin-input"
                    required
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="gpa">
                    GPA
                  </label>
                  <input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    value={form.gpa}
                    onChange={(e) => updateField("gpa", e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label" htmlFor="achievements">
                  Achievements
                </label>
                <textarea
                  id="achievements"
                  value={form.achievements}
                  onChange={(e) => updateField("achievements", e.target.value)}
                  rows={5}
                  placeholder="One achievement per line"
                  className="admin-input"
                  style={{ resize: "vertical" }}
                />
              </div>

              <button type="submit" disabled={submitting} className="admin-submit">
                {submitting ? "Adding..." : "Add Student"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
