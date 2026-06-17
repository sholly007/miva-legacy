import Link from "next/link";

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
        <Link
          href="/"
          style={{
            color: "#6B7A99",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </nav>

      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          background: "radial-gradient(ellipse at top, #2A0A0D 0%, #0D1B2A 60%)",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, transparent, #E63946)",
            marginBottom: "32px",
          }}
        />
        <p
          style={{
            color: "#E63946",
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Why We Built This
        </p>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          The Story Behind<br />
          <span style={{ color: "#E63946" }}>Miva Legacy</span>
        </h1>
        <p
          style={{
            color: "#B0B8C8",
            fontSize: "clamp(16px, 2vw, 20px)",
            maxWidth: "600px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Built to preserve the Pioneer Class of 2025 — the first graduates of Miva Open University — as a permanent record of where it all began.
        </p>
      </section>

      <section
        style={{
          padding: "clamp(60px, 10vw, 100px) clamp(24px, 8vw, 120px)",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {storySections.map((section, index) => (
          <article
            key={section.label}
            style={{
              marginBottom: index < storySections.length - 1 ? "80px" : 0,
              paddingBottom: index < storySections.length - 1 ? "80px" : 0,
              borderBottom: index < storySections.length - 1 ? "1px solid #1F3154" : "none",
            }}
          >
            <p
              style={{
                color: "#E63946",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {section.label}
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                color: "#B0B8C8",
                lineHeight: 1.8,
                fontSize: "16px",
                fontWeight: 300,
              }}
            >
              {section.body}
            </p>
          </article>
        ))}
      </section>

      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 8vw, 80px)",
          backgroundColor: "#162338",
          borderTop: "1px solid #1F3154",
          borderBottom: "1px solid #1F3154",
        }}
      >
        <blockquote
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
            borderLeft: "none",
            padding: "clamp(32px, 5vw, 48px)",
            border: "1px solid rgba(230, 57, 70, 0.3)",
            backgroundColor: "#0D1B2A",
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#F5F5F0",
              marginBottom: "24px",
            }}
          >
            &ldquo;The first class does not just graduate — they become the standard by which every class that follows is measured.&rdquo;
          </p>
          <footer style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Pioneer Class · 2025
          </footer>
        </blockquote>
      </section>

      <section
        style={{
          padding: "clamp(80px, 10vw, 120px) 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#B0B8C8",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 40px",
            fontWeight: 300,
          }}
        >
          Explore the profiles of the graduates who made history as Miva Open University&apos;s founding class.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#E63946",
            color: "#F5F5F0",
            padding: "16px 40px",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Meet the Pioneer Class
        </Link>
      </section>

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
