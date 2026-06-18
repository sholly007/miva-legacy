import { supabase } from "../lib/supabase";
import { SiteNav } from "../components/SiteNav";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: students } = await supabase
    .from("students")
    .select("slug, full_name, program, profile_photo_url, quote")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main style={{ backgroundColor: "#0D1B2A", color: "#F5F5F0" }}>
      <SiteNav
        tagline="Pioneer Class · 2025"
        links={[
          { href: "#students", label: "Meet the Class" },
          { href: "/our-story", label: "Our Story" },
        ]}
      />

      <section className="page-hero">
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, #E63946)", marginBottom: "32px" }} />
        <p className="hero-eyebrow">Miva Open University · Nigeria</p>
        <h1 className="hero-title">
          The Pioneer
          <br />
          <span style={{ color: "#E63946" }}>Class of 2025</span>
        </h1>
        <p className="hero-subtitle">
          The first to walk this path. A permanent digital record of the graduates who built the foundation of something lasting.
        </p>
        <div className="btn-group">
          <a href="#students" className="btn-primary">
            Meet the Class
          </a>
          <a href="/our-story" className="btn-secondary">
            Our Story
          </a>
        </div>
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, #E63946, transparent)", marginTop: "48px" }} />
      </section>

      <section
        className="stats-row"
        style={{ borderTop: "1px solid #1F3154", borderBottom: "1px solid #1F3154", backgroundColor: "#162338" }}
      >
        {[
          { number: "2025", label: "Graduating Year" },
          { number: "1st", label: "Pioneer Set" },
          { number: "∞", label: "Legacy" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(32px, 8vw, 56px)",
                color: "#E63946",
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {stat.number}
            </div>
            <div style={{ color: "#6B7A99", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <section id="about" className="section-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="about-grid">
          <div>
            <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
              About This Archive
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 6vw, 48px)",
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              More than a yearbook.
              <br />
              A permanent home.
            </h2>
            <p style={{ color: "#B0B8C8", lineHeight: 1.8, fontSize: "clamp(15px, 4vw, 16px)", fontWeight: 300 }}>
              Miva Legacy is the digital graduating portfolio for Miva Open University. Unlike a physical yearbook that fades and gets lost, this platform lives online permanently — accessible from anywhere, at any time, for generations.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "Each Student", desc: "Gets a dedicated profile page with photos, bio, achievements, and memories." },
              { title: "Every Class", desc: "Future graduating sets will be added, building a growing legacy over time." },
              { title: "Forever Online", desc: "No printing costs. No lost copies. Always accessible from any device." },
            ].map((item) => (
              <div
                key={item.title}
                style={{ padding: "20px", border: "1px solid #1F3154", borderLeft: "3px solid #E63946", backgroundColor: "#162338" }}
              >
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "17px", marginBottom: "8px", color: "#F5F5F0" }}>
                  {item.title}
                </div>
                <div style={{ color: "#B0B8C8", fontSize: "14px", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="students"
        className="section-pad"
        style={{ backgroundColor: "#162338", borderTop: "1px solid #1F3154" }}
      >
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
          <p className="hero-eyebrow" style={{ marginBottom: "16px" }}>
            Pioneer Class · 2025
          </p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 6vw, 56px)", fontWeight: 600 }}>
            Meet the Graduates
          </h2>
        </div>
        <div className="student-grid">
          {students?.map((student) => (
            <a key={student.slug} href={`/students/${student.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ backgroundColor: "#1B2A4A", border: "1px solid #1F3154", overflow: "hidden" }}>
                <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#1F3154", overflow: "hidden" }}>
                  {student.profile_photo_url ? (
                    <img src={student.profile_photo_url} alt={student.full_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#2A3F6B", fontSize: "48px" }}>◈</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(17px, 4vw, 18px)", marginBottom: "4px", color: "#F5F5F0" }}>
                    {student.full_name}
                  </div>
                  <div style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                    {student.program}
                  </div>
                  {student.quote && (
                    <div style={{ color: "#6B7A99", fontSize: "13px", fontStyle: "italic", lineHeight: 1.5 }}>
                      &ldquo;{student.quote}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

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
          <span style={{ fontFamily: "Playfair Display, serif", color: "#F5F5F0", fontSize: "16px" }}>MIVA LEGACY</span>
        </div>
        <span style={{ color: "#6B7A99", fontSize: "12px", lineHeight: 1.5 }}>
          © 2025 Miva Open University · Pioneer Class
        </span>
      </footer>
    </main>
  );
}
