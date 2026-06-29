import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

export default function Home() {
  return (
    <main>
      <SiteNav
        links={[
          { href: "/directory?level=undergraduate", label: "Undergraduate Alumni" },
          { href: "/directory?level=postgraduate", label: "Postgraduate Alumni" },
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g className="star-ring">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = i * 30;
                        return (
                          <g key={i} transform={`rotate(${angle} 12 12)`}>
                            <svg x="12" y="3" width="3.5" height="3.5" viewBox="0 0 24 24" fill="#E63946">
                              <path d="M12 1.6l2.9 5.8 6.4.9-4.6 4.5 1.1 6.4L12 18.9l-5.8 3 1.1-6.4L2.7 8.3l6.4-.9L12 1.6z" />
                            </svg>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                  <svg className="center-star" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <svg x="7" y="7" width="10" height="10" viewBox="0 0 24 24" fill="#E63946">
                      <path d="M12 1.6l2.9 5.8 6.4.9-4.6 4.5 1.1 6.4L12 18.9l-5.8 3 1.1-6.4L2.7 8.3l6.4-.9L12 1.6z" />
                    </svg>
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
