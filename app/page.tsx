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
            <h1 className="hub-title animate-fade-up animate-delay-2">Pioneer Class Alumni Directory</h1>
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
