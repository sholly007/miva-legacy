"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { updateStudent } from "../../admin/actions";
import Link from "next/link";

export default function EditStudentPage({ params }: { params: { token: string } }) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [form, setForm] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("edit_token", params.token)
          .single();

        if (error || !data) {
          setStudent(null);
        } else {
          setStudent(data);
          const newForm = {
            fullName: String(data.full_name ?? ""),
            photoUrl: String(data.profile_photo_url ?? ""),
            degree: String(data.program ?? ""),
            degreeLevel: String(data.degree_level ?? ""),
            duration: String(data.duration ?? ""),
            bio: String(data.bio ?? ""),
            linkedinUrl: String(data.linkedin_url ?? ""),
            twitterUrl: String(data.twitter_url ?? ""),
            graduationYear: data.cohort_year?.toString() ?? "2026",
            gpa: data.gpa?.toString() ?? "",
            achievements: (data.achievements ?? []).join("\n"),
            galleryUrls: (data.gallery_urls ?? []).join("\n"),
          };
          setForm(newForm);
        }
      } catch (e) {
        setStudent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [params.token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const result = await updateStudent(params.token, form);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return (
      <main className="admin-page">
        <div className="container" style={{ paddingTop: "80px" }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="admin-page">
        <div className="container" style={{ paddingTop: "80px" }}>
          <section className="admin-section">
            <div className="story-hero" style={{ padding: "60px 0" }}>
              <div className="container hub-hero-content">
                <h1 className="hub-title">Invalid or Expired Edit Link</h1>
                <p className="hub-subtitle" style={{ marginBottom: 0 }}>
                  The link you used is not valid. Please check the URL or request a new edit link.
                </p>
                <div className="btn-group" style={{ marginTop: "32px" }}>
                  <Link href="/" className="btn-primary">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <nav className="admin-nav">
        <Link href="/" className="admin-nav-brand">
          <span className="site-nav-mark" aria-hidden="true" />
          <span className="admin-nav-title">MIVA LEGACY</span>
        </Link>
        <span className="admin-nav-label">Edit Profile</span>
      </nav>

      <section className="admin-section">
        <p className="admin-eyebrow">Edit Your Profile</p>
        <h1 className="admin-heading">{student.full_name}</h1>
        <p className="admin-description">
          Update your graduate profile details below.
        </p>

        {success && (
          <div className="admin-alert" style={{ background: "#d1fae5", color: "#065f46", borderColor: "#10b981" }}>
            Profile updated successfully!
          </div>
        )}

        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
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
              Profile Photo URL
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
            <label className="admin-label" htmlFor="degreeLevel">
              Degree Level
            </label>
            <select
              id="degreeLevel"
              value={form.degreeLevel}
              onChange={(e) => updateField("degreeLevel", e.target.value)}
              className="admin-input"
            >
              <option value="">Select Degree Level</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Postgraduate Diploma">Postgraduate Diploma</option>
            </select>
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
              placeholder='e.g. "2 years" or "2023 - 2026"'
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

          <div>
            <label className="admin-label" htmlFor="galleryUrls">
              Gallery Photo URLs
            </label>
            <textarea
              id="galleryUrls"
              value={form.galleryUrls}
              onChange={(e) => updateField("galleryUrls", e.target.value)}
              rows={5}
              placeholder="One photo URL per line"
              className="admin-input"
              style={{ resize: "vertical" }}
            />
          </div>

          <button type="submit" disabled={submitting} className="admin-submit">
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}
