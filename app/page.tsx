import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

export default function Home() {
  return (
    <main>
      <SiteNav
        links={[
          { href: "/directory", label: "Meet the Class" },
          { href: "/our-story", label: "Our Story" },
        ]}
      />

      <div className="gradient-divider" />

      <section className="hub-hero hub-hero-minimal">
        <div className="container hub-hero-content">
          <div className="hub-hero-glass">
            <span className="hub-tag animate-fade-up animate-delay-1">
              Miva Open University
              <span className="hub-tag-underline" />
            </span>
            <h1 className="hub-title animate-fade-up animate-delay-2">
              Pioneer Class Alumni{" "}
              <span className="directory-word-wrap">
                Directory
                <span className="sparkle-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E63946">
                    <path d="M12 0c0.3 1.2 1.2 2.2 2.4 2.7 1.2 0.5 2.4 0.5 3.6 0.1 1.2-0.4 2.2-1.3 2.7-2.5 0.5-1.2 0.5-2.5 0.1-3.7-0.4-1.2-1.3-2.2-2.5-2.7-1.2-0.5-2.5-0.5-3.7-0.1-1.2 0.4-2.2 1.3-2.7 2.5z" />
                    <path d="M12 24c-0.3-1.2-1.2-2.2-2.4-2.7-1.2-0.5-2.4-0.5-3.6-0.1-1.2 0.4-2.2 1.3-2.7 2.5-0.5 1.2-0.5 2.5-0.1 3.7 0.4 1.2 1.3 2.2 2.5 2.7 1.2 0.5 2.5 0.5 3.7 0.1 1.2-0.4 2.2-1.3 2.7-2.5z" />
                    <path d="M0 12c1.2-0.3 2.2-1.2 2.7-2.4 0.5-1.2 0.5-2.4 0.1-3.6-0.4-1.2-1.3-2.2-2.5-2.7-1.2-0.5-2.5-0.5-3.7-0.1-1.2 0.4-2.2 1.3-2.7 2.5-0.5 1.2-0.5 2.5-0.1 3.7 0.4 1.2 1.3 2.2 2.5 2.7 1.2 0.5 2.5 0.5 3.7 0.1 1.2-0.4 2.2-1.3 2.7-2.5z" />
                    <path d="M24 12c-1.2 0.3-2.2 1.2-2.7 2.4-0.5 1.2-0.5 2.4-0.1 3.6 0.4 1.2 1.3 2.2 2.5 2.7 1.2 0.5 2.5 0.5 3.7 0.1 1.2-0.4 2.2-1.3 2.7-2.5 0.5-1.2 0.5-2.5 0.1-3.7-0.4-1.2-1.3-2.2-2.5-2.7-1.2-0.5-2.5-0.5-3.7-0.1-1.2 0.4-2.2 1.3-2.7 2.5z" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="hub-subtitle animate-fade-up animate-delay-3">
              Connect with the graduates who built the foundation of Miva Open University. Browse profiles, explore achievements, and celebrate the Class of 2026.
            </p>
            <div className="btn-group animate-fade-up animate-delay-4">
              <Link href="/directory" className="btn-primary">
                Meet the Class
              </Link>
              <Link href="/our-story" className="btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      <SiteFooter />
    </main>
  );
}
