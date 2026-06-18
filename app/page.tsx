import Link from "next/link";
import { supabase } from "../lib/supabase";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

export const dynamic = "force-dynamic";

function bioPreview(bio: string | null, maxLength = 120) {
  if (!bio) return "Graduate of Miva Open University — view full profile for details.";
  if (bio.length <= maxLength) return bio;
  return `${bio.slice(0, maxLength).trim()}…`;
}

export default async function Home() {
  const { data: students } = await supabase
    .from("students")
    .select("slug, full_name, program, profile_photo_url, bio, cohort_year")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <SiteNav
        links={[
          { href: "#students", label: "Meet the Class" },
          { href: "/our-story", label: "Our Story" },
        ]}
      />

      <section className="hub-hero">
        <div className="container hub-hero-content">
          <span className="hub-tag">Miva Open University</span>
          <h1 className="hub-title">Pioneer Class Alumni Directory</h1>
          <p className="hub-subtitle">
            Connect with the graduates who built the foundation of Miva Open University. Browse profiles, explore achievements, and celebrate the Class of 2025.
          </p>
          <div className="btn-group">
            <a href="#students" className="btn-primary">
              Meet the Class
            </a>
            <Link href="/our-story" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section id="students" className="alumni-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Alumni Directory</p>
            <h2 className="section-title">Meet the Graduates</h2>
          </div>

          <div className="alumni-grid">
            {students?.map((student) => (
              <article key={student.slug} className="alumni-card">
                {student.profile_photo_url ? (
                  <img src={student.profile_photo_url} alt={student.full_name} className="alumni-card-photo" />
                ) : (
                  <div className="alumni-card-photo-placeholder" aria-hidden="true">
                    ◈
                  </div>
                )}
                <h3 className="alumni-card-name">{student.full_name}</h3>
                <p className="alumni-card-degree">{student.program}</p>
                {student.cohort_year && (
                  <span className="alumni-card-cohort">Class of {student.cohort_year}</span>
                )}
                <p className="alumni-card-bio">{bioPreview(student.bio)}</p>
                <Link href={`/students/${student.slug}`} className="btn-card">
                  View Profile
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="alumni-section alumni-section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-panel">
            <p className="section-label">About This Archive</p>
            <h2>More than a yearbook. A permanent alumni home.</h2>
            <p>
              Miva Legacy is the digital graduating portfolio for Miva Open University — a structured, always-accessible record of every pioneer graduate&apos;s journey, achievements, and aspirations.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
