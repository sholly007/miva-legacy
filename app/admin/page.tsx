"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { addStudent, verifyPassword } from "./actions";

const emptyForm = {
  fullName: "",
  photoUrl: "",
  degree: "",
  bio: "",
  linkedinUrl: "",
  twitterUrl: "",
  graduationYear: "2025",
  gpa: "",
  achievements: "",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#B0B8C8",
  fontSize: "12px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "#162338",
  border: "1px solid #1F3154",
  color: "#F5F5F0",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
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
    <main style={{ backgroundColor: "#0D1B2A", minHeight: "100vh", color: "#F5F5F0" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(230, 57, 70, 0.2)",
          backgroundColor: "rgba(13, 27, 42, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #E63946 50%, #C0392B 100%)",
              clipPath: "polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)",
            }}
          />
          <Link
            href="/"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#F5F5F0",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
          >
            MIVA LEGACY
          </Link>
        </div>
        <span
          style={{
            color: "#6B7A99",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Admin
        </span>
      </nav>

      <section
        style={{
          padding: "120px 24px 80px",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        {!authenticated ? (
          <>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Restricted Access
            </p>
            <h1
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Admin Login
            </h1>
            <p style={{ color: "#B0B8C8", marginBottom: "40px", lineHeight: 1.7, fontWeight: 300 }}>
              Enter the admin password to add new students to the archive.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <label style={labelStyle} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, marginBottom: "16px" }}
                required
              />
              {passwordError && (
                <p style={{ color: "#E63946", fontSize: "14px", marginBottom: "16px" }}>{passwordError}</p>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: "#E63946",
                  color: "#F5F5F0",
                  padding: "14px 32px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Enter
              </button>
            </form>
          </>
        ) : (
          <>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Student Management
            </p>
            <h1
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Add New Student
            </h1>
            <p style={{ color: "#B0B8C8", marginBottom: "40px", lineHeight: 1.7, fontWeight: 300 }}>
              Fill in the details below to publish a new graduate profile.
            </p>

            {successMessage && (
              <div
                style={{
                  padding: "16px 20px",
                  marginBottom: "32px",
                  border: "1px solid rgba(230, 57, 70, 0.4)",
                  borderLeft: "3px solid #E63946",
                  backgroundColor: "#162338",
                  color: "#F5F5F0",
                  fontSize: "14px",
                }}
              >
                {successMessage}
              </div>
            )}

            {submitError && (
              <div
                style={{
                  padding: "16px 20px",
                  marginBottom: "32px",
                  border: "1px solid rgba(230, 57, 70, 0.4)",
                  backgroundColor: "#2A0A0D",
                  color: "#E63946",
                  fontSize: "14px",
                }}
              >
                {submitError}
              </div>
            )}

            <form onSubmit={handleStudentSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={labelStyle} htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="photoUrl">
                  Photo URL
                </label>
                <input
                  id="photoUrl"
                  type="url"
                  value={form.photoUrl}
                  onChange={(e) => updateField("photoUrl", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="degree">
                  Degree
                </label>
                <input
                  id="degree"
                  type="text"
                  value={form.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  required
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="linkedinUrl">
                  LinkedIn URL
                </label>
                <input
                  id="linkedinUrl"
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="twitterUrl">
                  Twitter URL
                </label>
                <input
                  id="twitterUrl"
                  type="url"
                  value={form.twitterUrl}
                  onChange={(e) => updateField("twitterUrl", e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <label style={labelStyle} htmlFor="graduationYear">
                    Graduation Year
                  </label>
                  <input
                    id="graduationYear"
                    type="number"
                    value={form.graduationYear}
                    onChange={(e) => updateField("graduationYear", e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="gpa">
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
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle} htmlFor="achievements">
                  Achievements
                </label>
                <textarea
                  id="achievements"
                  value={form.achievements}
                  onChange={(e) => updateField("achievements", e.target.value)}
                  rows={5}
                  placeholder="One achievement per line"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? "#6B7A99" : "#E63946",
                  color: "#F5F5F0",
                  padding: "16px 40px",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  alignSelf: "flex-start",
                }}
              >
                {submitting ? "Adding..." : "Add Student"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
