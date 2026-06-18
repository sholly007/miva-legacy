import { supabase } from "../../../lib/supabase";
import { SiteNav } from "../../../components/SiteNav";

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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D1B2A",
          color: "#F5F5F0",
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(20px, 5vw, 24px)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Student not found.
      </div>
    );
  }

  const achievements = getAchievements(student.achievements);
  const hasSocialLinks = student.linkedin_url || student.twitter_url;
  const hasGallery = Array.isArray(student.gallery_urls) && student.gallery_urls.length > 0;

  return (
    <main style={{ backgroundColor: "#0D1B2A", minHeight: "100vh", color: "#F5F5F0" }}>
      <SiteNav links={[{ href: "/", label: "Back to Class" }]} />

      <section className="profile-hero">
        <img src={student.profile_photo_url} alt={student.full_name} className="profile-photo" />

        <div style={{ minWidth: 0 }}>
          <p className="hero-eyebrow" style={{ marginBottom: "12px", letterSpacing: "0.2em" }}>
            {student.program}
          </p>

          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(28px, 7vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "24px",
              wordBreak: "break-word",
            }}
          >
            {student.full_name}
          </h1>

          <div className="stat-blocks">
            {student.gpa && (
              <div className="stat-block">
                <div style={{ color: "#6B7A99", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                  GPA
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 700, color: "#E63946" }}>
                  {student.gpa}
                </div>
              </div>
            )}

            {student.duration && (
              <div className="stat-block">
                <div style={{ color: "#6B7A99", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                  Duration
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 600, color: "#F5F5F0", wordBreak: "break-word" }}>
                  {student.duration}
                </div>
              </div>
            )}

            {student.cohort_year && (
              <div className="stat-block">
                <div style={{ color: "#6B7A99", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                  Class Of
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 700, color: "#F5F5F0" }}>
                  {student.cohort_year}
                </div>
              </div>
            )}
          </div>

          <p style={{ color: "#B0B8C8", lineHeight: 1.8, fontSize: "clamp(15px, 4vw, 16px)", marginBottom: student.quote ? "28px" : "32px", fontWeight: 300 }}>
            {student.bio}
          </p>

          {student.quote && (
            <blockquote style={{ borderLeft: "3px solid #E63946", paddingLeft: "20px", margin: "0 0 32px" }}>
              <p
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(17px, 4.5vw, 20px)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "#F5F5F0",
                }}
              >
                &ldquo;{student.quote}&rdquo;
              </p>
            </blockquote>
          )}

          {hasSocialLinks && (
            <div className="social-row">
              <span style={{ color: "#6B7A99", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", width: "100%" }}>
                Connect
              </span>
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
        </div>
      </section>

      {achievements.length > 0 && (
        <section className="section-pad-sm" style={{ borderTop: "1px solid #1F3154", backgroundColor: "#162338" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
              Achievements
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px, 6vw, 40px)", marginBottom: "32px" }}>
              What They Accomplished
            </h2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {achievements.map((achievement, index) => (
                <li
                  key={`${achievement}-${index}`}
                  className="achievement-item"
                  style={{ backgroundColor: "#0D1B2A", border: "1px solid #1F3154" }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#E63946",
                      color: "#F5F5F0",
                      fontFamily: "Playfair Display, serif",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="achievement-text" style={{ color: "#F5F5F0", paddingTop: "4px" }}>
                    {achievement}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {hasGallery && (
        <section className="section-pad-sm" style={{ borderTop: "1px solid #1F3154" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
              Gallery
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px, 6vw, 40px)", marginBottom: "32px" }}>
              Moments in Time
            </h2>
            <div className="gallery-grid">
              {student.gallery_urls.map((url: string, i: number) => (
                <img
                  key={i}
                  src={url}
                  alt={`${student.full_name} — photo ${i + 1}`}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: "1px solid #1F3154" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {student.memories && (
        <section className="section-pad-sm" style={{ borderTop: "1px solid #1F3154", backgroundColor: "#162338" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
              Memories
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px, 6vw, 40px)", marginBottom: "32px" }}>
              Looking Back
            </h2>
            <p style={{ color: "#B0B8C8", fontSize: "clamp(16px, 4vw, 18px)", lineHeight: 1.9, fontStyle: "italic" }}>
              &ldquo;{student.memories}&rdquo;
            </p>
          </div>
        </section>
      )}

      {student.aspirations && (
        <section className="section-pad-sm" style={{ borderTop: "1px solid #1F3154" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
              Aspirations
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px, 6vw, 40px)", marginBottom: "20px" }}>
              Where They Are Headed
            </h2>
            <p style={{ color: "#F5F5F0", fontSize: "clamp(17px, 4vw, 20px)", lineHeight: 1.7 }}>{student.aspirations}</p>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              background: "linear-gradient(135deg, #E63946 50%, #C0392B 100%)",
              clipPath: "polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)",
            }}
          />
          <span style={{ fontFamily: "Playfair Display, serif", color: "#F5F5F0", fontSize: "16px" }}>
            MIVA LEGACY
          </span>
        </div>
        <span style={{ color: "#6B7A99", fontSize: "12px", lineHeight: 1.5 }}>
          © 2025 Miva Open University · Pioneer Class
        </span>
      </footer>
    </main>
  );
}
