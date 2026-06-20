import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";

const storySections = [
  {
    label: "The Beginning",
    title: "The first class to cross the finish line",
    body: "In 2026, Miva Open University celebrated a milestone that had never happened before — its first graduating cohort. The Pioneer Class walked a path no one had walked before them: navigating online lectures from Lagos to Abuja, balancing work and study, and proving that world-class education could reach every corner of Nigeria. Their journey was not just personal. It was historic.",
  },
  {
    label: "The Idea",
    title: "Why a yearbook wasn't enough",
    body: "Physical yearbooks fade, get lost, and reach only those who were there. The Pioneer Class deserved more than a printed memory that gathers dust on a shelf. Miva Legacy was conceived as a living archive — a permanent digital home where every graduate's story, photo, and achievement could live online forever, accessible to family, employers, and future classes for generations.",
  },
  {
    label: "The Mission",
    title: "Preserving what the pioneers built",
    body: "Miva Legacy exists to honour the Class of 2026 not as a footnote in university history, but as the foundation of everything that follows. Each profile is a chapter. Each photo is proof. Each quote is a voice that will still be heard long after graduation day. This is their record — and the first page of a legacy that will grow with every class to come.",
  },
];

export default function OurStoryPage() {
  return (
    <main>
      <SiteNav
        links={[
          { href: "/directory", label: "Meet the Class" },
          { href: "/", label: "Home" },
        ]}
      />

      <section className="story-hero">
        <div className="container hub-hero-content">
          <span className="hub-tag">Why We Built This</span>
          <h1 className="hub-title">
            The Story Behind <span className="text-accent">Miva Legacy</span>
          </h1>
          <p className="hub-subtitle" style={{ marginBottom: 0 }}>
            Built to preserve the Pioneer Class of 2026 — the first graduates of Miva Open University — as a permanent record of where it all began.
          </p>
        </div>
      </section>

      <section className="story-content">
        <div className="container" style={{ maxWidth: "800px" }}>
          {storySections.map((section) => (
            <article key={section.label} className="story-article">
              <p className="section-label">{section.label}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <blockquote className="quote-panel">
            <p>
              &ldquo;The first class does not just graduate — they become the standard by which every class that follows is measured.&rdquo;
            </p>
            <footer>Pioneer Class · 2026</footer>
          </blockquote>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <p>
            Explore the profiles of the graduates who made history as Miva Open University&apos;s founding class.
          </p>
          <Link href="/directory" className="btn-primary">
            Meet the Pioneer Class
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
