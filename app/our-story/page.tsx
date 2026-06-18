import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";

const storySections = [
  {
    label: "The Beginning",
    title: "The first class to cross the finish line",
    body: "In 2025, Miva Open University celebrated a milestone that had never happened before — its first graduating cohort. The Pioneer Class walked a path no one had walked before them: navigating online lectures from Lagos to Abuja, balancing work and study, and proving that world-class education could reach every corner of Nigeria. Their journey was not just personal. It was historic.",
  },
  {
    label: "The Idea",
    title: "Why a yearbook wasn't enough",
    body: "Physical yearbooks fade, get lost, and reach only those who were there. The Pioneer Class deserved more than a printed memory that gathers dust on a shelf. Miva Legacy was conceived as a living archive — a permanent digital home where every graduate's story, photo, and achievement could live online forever, accessible to family, employers, and future classes for generations.",
  },
  {
    label: "The Mission",
    title: "Preserving what the pioneers built",
    body: "Miva Legacy exists to honour the Class of 2025 not as a footnote in university history, but as the foundation of everything that follows. Each profile is a chapter. Each photo is proof. Each quote is a voice that will still be heard long after graduation day. This is their record — and the first page of a legacy that will grow with every class to come.",
  },
];

export default function OurStoryPage() {
  return (
    <main style={{ backgroundColor: "#0D1B2A", color: "#F5F5F0", minHeight: "100vh" }}>
      <SiteNav
        links={[
          { href: "/", label: "Back to Home" },
          { href: "/#students", label: "Meet the Class" },
        ]}
      />

      <section className="page-hero page-hero-compact">
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, #E63946)", marginBottom: "24px" }} />
        <p className="hero-eyebrow">Why We Built This</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(30px, 8vw, 72px)" }}>
          The Story Behind
          <br />
          <span style={{ color: "#E63946" }}>Miva Legacy</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Built to preserve the Pioneer Class of 2025 — the first graduates of Miva Open University — as a permanent record of where it all began.
        </p>
      </section>

      <section className="section-pad" style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "clamp(40px, 8vw, 60px)" }}>
        {storySections.map((section, index) => (
          <article
            key={section.label}
            style={{
              marginBottom: index < storySections.length - 1 ? "clamp(48px, 8vw, 80px)" : 0,
              paddingBottom: index < storySections.length - 1 ? "clamp(48px, 8vw, 80px)" : 0,
              borderBottom: index < storySections.length - 1 ? "1px solid #1F3154" : "none",
            }}
          >
            <p className="hero-eyebrow" style={{ marginBottom: "12px" }}>
              {section.label}
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(24px, 6vw, 40px)",
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              {section.title}
            </h2>
            <p style={{ color: "#B0B8C8", lineHeight: 1.8, fontSize: "clamp(15px, 4vw, 16px)", fontWeight: 300 }}>
              {section.body}
            </p>
          </article>
        ))}
      </section>

      <section
        className="section-pad-sm"
        style={{ backgroundColor: "#162338", borderTop: "1px solid #1F3154", borderBottom: "1px solid #1F3154" }}
      >
        <blockquote className="quote-box">
          <p>
            &ldquo;The first class does not just graduate — they become the standard by which every class that follows is measured.&rdquo;
          </p>
          <footer style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Pioneer Class · 2025
          </footer>
        </blockquote>
      </section>

      <section className="section-pad" style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#B0B8C8",
            fontSize: "clamp(15px, 4vw, 16px)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 32px",
            fontWeight: 300,
            padding: "0 4px",
          }}
        >
          Explore the profiles of the graduates who made history as Miva Open University&apos;s founding class.
        </p>
        <Link href="/" className="btn-primary" style={{ margin: "0 auto" }}>
          Meet the Pioneer Class
        </Link>
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
