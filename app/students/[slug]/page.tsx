import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { SiteNav } from "../../../components/SiteNav";
import { SiteFooter } from "../../../components/SiteFooter";

export const dynamic = "force-dynamic";

function getAchievements(achievements: unknown): string[] {
  if (!achievements) return [];
  if (Array.isArray(achievements)) {
    return achievements.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof achievements === "string") {
    return achievements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="social-btn">
      {children}
    </a>
  );
}

export default async function StudentProfile({ params }: { params: { slug: string } }) {
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!student) {
    return (
      <div className="profile-not-found">
        Student not found.
      </div>
    );
  }

  const achievements = getAchievements(student.achievements);
  const hasSocialLinks = student.linkedin_url || student.twitter_url;
  const hasGallery = Array.isArray(student.gallery_urls) && student.gallery_urls.length > 0;

  return (
    <main>
      <SiteNav
        badge="Member Verified"
        links={[
          { href: "/directory", label: "Directory" },
          { href: "/our-story", label: "Our Story" },
        ]}
      />

      <div className="profile-page">
        <div className="container profile-layout">
          <aside className="panel panel-sidebar">
            <img src={student.profile_photo_url} alt={student.full_name} className="profile-avatar" />

            <span className="verified-badge profile-verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Member Verified
            </span>

            <h1 className="profile-sidebar-name">{student.full_name}</h1>
            <p className="profile-sidebar-degree">{student.program}</p>

            <ul className="profile-meta-list">
              {student.cohort_year && (
                <li className="profile-meta-item">
                  <span className="profile-meta-label">Cohort</span>
                  <span className="profile-meta-value">Class of {student.cohort_year}</span>
                </li>
              )}
              <li className="profile-meta-item">
                <span className="profile-meta-label">Student ID</span>
                <span className="profile-meta-value">{student.slug}</span>
              </li>
              <li className="profile-meta-item">
                <span className="profile-meta-label">Location</span>
                <span className="profile-meta-value">Nigeria</span>
              </li>
              {student.duration && (
                <li className="profile-meta-item">
                  <span className="profile-meta-label">Duration</span>
                  <span className="profile-meta-value">{student.duration}</span>
                </li>
              )}
            </ul>

            {achievements.length > 0 && (
              <div className="skill-list">
                <p className="skill-list-title">Skills &amp; Milestones</p>
                {achievements.map((achievement, index) => (
                  <div key={`${achievement}-${index}`} className="skill-item">
                    <div className="skill-item-header">
                      <span>{achievement}</span>
                      <span>{Math.min(100, 85 + (index % 3) * 5)}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${Math.min(100, 85 + (index % 3) * 5)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>

          <div className="profile-main-stack">
            <section className="panel">
              <p className="panel-subheading">About</p>
              <h2 className="panel-heading">Profile Overview</h2>
              <p className="panel-bio">{student.bio}</p>

              <div className="profile-stats-row">
                {student.gpa && (
                  <div className="profile-stat">
                    <p className="profile-stat-label">GPA</p>
                    <p className="profile-stat-value accent">{student.gpa}</p>
                  </div>
                )}
                {student.duration && (
                  <div className="profile-stat">
                    <p className="profile-stat-label">Duration</p>
                    <p className="profile-stat-value">{student.duration}</p>
                  </div>
                )}
                {student.cohort_year && (
                  <div className="profile-stat">
                    <p className="profile-stat-label">Graduated</p>
                    <p className="profile-stat-value">{student.cohort_year}</p>
                  </div>
                )}
              </div>

              {student.quote && <blockquote className="panel-quote">&ldquo;{student.quote}&rdquo;</blockquote>}

              {hasSocialLinks && (
                <div className="social-row" style={{ marginTop: "24px" }}>
                  <span className="social-label">Connect</span>
                  {student.linkedin_url && (
                    <SocialButton href={student.linkedin_url} label="LinkedIn profile">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.065 2.065 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </SocialButton>
                  )}
                  {student.twitter_url && (
                    <SocialButton href={student.twitter_url} label="Twitter / X profile">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </SocialButton>
                  )}
                </div>
              )}
            </section>

            {achievements.length > 0 && (
              <section className="panel">
                <p className="panel-subheading">Badges</p>
                <h2 className="panel-heading">Achievements</h2>
                <div className="badge-grid">
                  {achievements.map((achievement, index) => (
                    <span key={`${achievement}-${index}`} className="badge-chip">
                      {achievement}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {hasGallery && (
              <section className="panel">
                <p className="panel-subheading">Gallery</p>
                <h2 className="panel-heading">Moments in Time</h2>
                <div className="gallery-grid">
                  {student.gallery_urls.map((url: string, i: number) => (
                    <img key={i} src={url} alt={`${student.full_name} — photo ${i + 1}`} />
                  ))}
                </div>
              </section>
            )}

            {student.memories && (
              <section className="panel">
                <p className="panel-subheading">Memories</p>
                <h2 className="panel-heading">Looking Back</h2>
                <p className="panel-text italic">&ldquo;{student.memories}&rdquo;</p>
              </section>
            )}

            {student.aspirations && (
              <section className="panel">
                <p className="panel-subheading">Aspirations</p>
                <h2 className="panel-heading">Where They Are Headed</h2>
                <p className="panel-text">{student.aspirations}</p>
              </section>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
