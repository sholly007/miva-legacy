import Link from "next/link";
import { supabase } from "../../../lib/supabase";

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
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        border: "1px solid rgba(230, 57, 70, 0.4)",
        backgroundColor: "#162338",
        color: "#E63946",
        textDecoration: "none",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
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
          fontSize: "24px",
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
              width: "28px",
              height: "28px",
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
              textDecoration: "none",
            }}
          >
            MIVA LEGACY
          </Link>
        </div>
        <Link
          href="/"
          style={{
            color: "#6B7A99",
            fontSize: "13px",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Back to Class
        </Link>
      </nav>

      <section
        style={{
          padding: "120px 40px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "80px",
          alignItems: "start",
        }}
      >
        <img
          src={student.profile_photo_url}
          alt={student.full_name}
          style={{
            width: "100%",
            maxWidth: "460px",
            aspectRatio: "3/4",
            objectFit: "cover",
            border: "1px solid #1F3154",
          }}
        />

        <div>
          <p
            style={{
              color: "#E63946",
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            {student.program}
          </p>

          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "28px",
            }}
          >
            {student.full_name}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {student.gpa && (
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#162338",
                  border: "1px solid #1F3154",
                  borderTop: "3px solid #E63946",
                  minWidth: "100px",
                }}
              >
                <div
                  style={{
                    color: "#6B7A99",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  GPA
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#E63946",
                  }}
                >
                  {student.gpa}
                </div>
              </div>
            )}

            {student.duration && (
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#162338",
                  border: "1px solid #1F3154",
                  borderTop: "3px solid #E63946",
                  minWidth: "120px",
                }}
              >
                <div
                  style={{
                    color: "#6B7A99",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Duration
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#F5F5F0",
                  }}
                >
                  {student.duration}
                </div>
              </div>
            )}

            {student.cohort_year && (
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#162338",
                  border: "1px solid #1F3154",
                  borderTop: "3px solid #E63946",
                  minWidth: "120px",
                }}
              >
                <div
                  style={{
                    color: "#6B7A99",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Class Of
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#F5F5F0",
                  }}
                >
                  {student.cohort_year}
                </div>
              </div>
            )}
          </div>

          <p
            style={{
              color: "#B0B8C8",
              lineHeight: 1.8,
              fontSize: "16px",
              marginBottom: student.quote ? "32px" : "40px",
              fontWeight: 300,
            }}
          >
            {student.bio}
          </p>

          {student.quote && (
            <blockquote
              style={{
                borderLeft: "3px solid #E63946",
                paddingLeft: "24px",
                margin: "0 0 40px",
              }}
            >
              <p
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "20px",
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
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span
                style={{
                  color: "#6B7A99",
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginRight: "4px",
                }}
              >
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
        <section
          style={{
            padding: "80px 40px",
            borderTop: "1px solid #1F3154",
            backgroundColor: "#162338",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Achievements
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                marginBottom: "40px",
              }}
            >
              What They Accomplished
            </h2>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {achievements.map((achievement, index) => (
                <li
                  key={`${achievement}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "20px 24px",
                    backgroundColor: "#0D1B2A",
                    border: "1px solid #1F3154",
                  }}
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
                  <span
                    style={{
                      color: "#F5F5F0",
                      fontSize: "16px",
                      lineHeight: 1.6,
                      paddingTop: "4px",
                    }}
                  >
                    {achievement}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {hasGallery && (
        <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Gallery
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                marginBottom: "40px",
              }}
            >
              Moments in Time
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {student.gallery_urls.map((url: string, i: number) => (
                <img
                  key={i}
                  src={url}
                  alt={`${student.full_name} — photo ${i + 1}`}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    border: "1px solid #1F3154",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {student.memories && (
        <section
          style={{
            padding: "80px 40px",
            borderTop: "1px solid #1F3154",
            backgroundColor: "#162338",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Memories
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                marginBottom: "40px",
              }}
            >
              Looking Back
            </h2>
            <p
              style={{
                color: "#B0B8C8",
                fontSize: "18px",
                lineHeight: 1.9,
                fontStyle: "italic",
              }}
            >
              &ldquo;{student.memories}&rdquo;
            </p>
          </div>
        </section>
      )}

      {student.aspirations && (
        <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Aspirations
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                marginBottom: "24px",
              }}
            >
              Where They Are Headed
            </h2>
            <p style={{ color: "#F5F5F0", fontSize: "20px", lineHeight: 1.7 }}>{student.aspirations}</p>
          </div>
        </section>
      )}

      <footer
        style={{
          padding: "40px",
          borderTop: "1px solid #1F3154",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          backgroundColor: "#0D1B2A",
        }}
      >
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
        <span style={{ color: "#6B7A99", fontSize: "13px" }}>
          © 2025 Miva Open University · Pioneer Class
        </span>
      </footer>
    </main>
  );
}
