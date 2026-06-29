import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { SiteNav } from "../../../components/SiteNav";
import { SiteFooter } from "../../../components/SiteFooter";
import { VALID_DEGREE_LEVELS } from "../../../lib/constants";
import Gallery from "../../../components/Gallery";

export const dynamic = "force-dynamic";

function getAchievements(achievements: unknown): string[] | string {
  if (!achievements) return [];
  if (Array.isArray(achievements)) {
    return achievements.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof achievements === "string") {
    return achievements.trim();
  }
  return [];
}

function getSkillsArray(achievements: unknown): string[] {
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
  const hasSocialLinks = student.linkedin_url || student.twitter_url || student.instagram_url || student.tiktok_url;
  const hasGallery = Array.isArray(student.gallery_urls) && student.gallery_urls.length > 0;
  const isPostgraduate = 
    student.degree_level === VALID_DEGREE_LEVELS.MASTERS || 
    student.degree_level === VALID_DEGREE_LEVELS.PHD || 
    student.degree_level === VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA;

  return (
    <main data-theme={isPostgraduate ? "postgraduate" : "undergraduate"}>
      <SiteNav
        badge="Member Verified"
        links={[
          { href: "/", label: "Home" },
          { href: "/directory?level=undergraduate", label: "Undergraduate Alumni" },
          { href: "/directory?level=postgraduate", label: "Postgraduate Alumni" },
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
              {student.matric_number && (
                <li className="profile-meta-item">
                  <span className="profile-meta-label">Matriculation ID</span>
                  <span className="profile-meta-value">{student.matric_number}</span>
                </li>
              )}
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

            {getSkillsArray(student.achievements).length > 0 && (
                        <div className="skill-list">
                          <p className="skill-list-title">Skills &amp; Milestones</p>
                          {getSkillsArray(student.achievements).map((achievement, index) => (
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
                            <p className="profile-stat-value accent">
                      {(() => {
                        const gpa = parseFloat(student.gpa);
                        if (isNaN(gpa)) {
                          return student.gpa;
                        }

                        // Determine degree level
                        let degreeLevel = student.degree_level;
                        if (!degreeLevel) {
                          // Fallback: infer from program field
                          const programLower = (student.program || "").toLowerCase();
                          if (programLower.includes("phd") || programLower.includes("doctor")) {
                            degreeLevel = VALID_DEGREE_LEVELS.PHD;
                          } else if (programLower.includes("msc") || programLower.includes("ma") || programLower.includes("mba") || programLower.includes("master")) {
                            degreeLevel = VALID_DEGREE_LEVELS.MASTERS;
                          } else if (programLower.includes("postgraduate diploma") || programLower.includes("pgd")) {
                            degreeLevel = VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA;
                          } else {
                            // Default to Bachelor's if can't determine
                            degreeLevel = VALID_DEGREE_LEVELS.BACHELORS;
                          }
                        }

                        let classification = "";

                        if (degreeLevel === VALID_DEGREE_LEVELS.PHD) {
                          // No classification for PhD, just show GPA
                          return student.gpa;
                        } else if (degreeLevel === VALID_DEGREE_LEVELS.MASTERS || degreeLevel === VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA) {
                          // Master's/PGD classification
                          if (gpa >= 4.50 && gpa <= 5.00) {
                            classification = "Distinction";
                          } else if (gpa >= 3.50 && gpa <= 4.49) {
                            classification = "Merit";
                          } else if (gpa >= 3.00 && gpa <= 3.49) {
                            classification = "Pass";
                          }
                        } else {
                          // Bachelor's classification (default)
                          if (gpa >= 4.50 && gpa <= 5.00) {
                            classification = "First Class";
                          } else if (gpa >= 3.50 && gpa <= 4.49) {
                            classification = "Second Class Upper";
                          } else if (gpa >= 2.40 && gpa <= 3.49) {
                            classification = "Second Class Lower";
                          } else if (gpa >= 1.50 && gpa <= 2.39) {
                            classification = "Third Class";
                          } else if (gpa >= 1.00 && gpa <= 1.49) {
                            classification = "Pass";
                          }
                        }

                        if (classification) {
                          return `${classification} (${student.gpa})`;
                        } else {
                          return student.gpa;
                        }
                      })()}
                    </p>
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
                  {student.instagram_url && (
                    <SocialButton href={student.instagram_url} label="Instagram profile">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </SocialButton>
                  )}
                  {student.tiktok_url && (
                    <SocialButton href={student.tiktok_url} label="TikTok profile">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.02-2.86-.21-4.14-1.03-1.6-.99-2.87-2.58-3.37-4.35-.2-.75-.25-1.53-.19-2.32.25-3.02 2.35-5.48 5.28-6.1.94-.2 1.93-.12 2.88.18 1.04.32 2.01.93 2.74 1.74.04-2.43.01-4.86.01-7.29 1.33.01 2.65.01 3.96.01zm-1.83 16.32c-1.51-.31-3.09.4-3.5 1.9-.19.68-.1 1.39.25 2.01.73 1.29 2.36 1.9 3.83 1.39 1.27-.43 2.17-1.57 2.32-2.89.13-1.1-.16-2.23-.84-3.14-.66-.88-1.63-1.45-2.69-1.57-.67-.08-1.34.02-1.97.26.04 1.32.01 2.63.01 3.95.33-.05.65-.12.98-.18-.03-1.24-.02-2.48-.02-3.73.55-.01 1.1.02 1.62.18.88.27 1.61.8 2.08 1.55.35.57.48 1.22.38 1.88-.26 1.64-1.79 2.75-3.45 2.39z" />
                      </svg>
                    </SocialButton>
                  )}
                </div>
              )}
            </section>

            {achievements && (Array.isArray(achievements) ? achievements.length > 0 : achievements.length > 0) && (
              <section className="panel">
                <p className="panel-subheading">Badges</p>
                <h2 className="panel-heading">Achievements</h2>
                {Array.isArray(achievements) ? (
                  <ul className="achievement-list">
                    {achievements.map((achievement, index) => (
                      <li key={`${achievement}-${index}`} className="achievement-item">
                        <span className="achievement-text">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="achievement-paragraph">{achievements}</p>
                )}
              </section>
            )}

            {hasGallery && (
              <section className="panel">
                <p className="panel-subheading">Gallery</p>
                <h2 className="panel-heading">Moments in Time</h2>
                <Gallery images={student.gallery_urls} studentName={student.full_name} />
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
