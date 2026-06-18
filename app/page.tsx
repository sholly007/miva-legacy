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

      <section className="hub-hero hub-hero-minimal">
        <div className="container hub-hero-content">
          <span className="hub-tag">Miva Open University</span>
          <h1 className="hub-title">Pioneer Class Alumni Directory</h1>
          <p className="hub-subtitle">
            Connect with the graduates who built the foundation of Miva Open University. Browse profiles, explore achievements, and celebrate the Class of 2025.
          </p>
          <div className="btn-group">
            <Link href="/directory" className="btn-primary">
              Meet the Class
            </Link>
            <Link href="/our-story" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
