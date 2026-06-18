import { supabase } from "../lib/supabase";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: students } = await supabase
    .from("students")
    .select("slug, full_name, program, profile_photo_url, quote")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(230, 57, 70, 0.2)',
        backgroundColor: 'rgba(13, 27, 42, 0.95)', backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #E63946 50%, #C0392B 100%)', clipPath: 'polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)' }} />
          <span style={{ fontFamily: 'Playfair Display, serif', color: '#F5F5F0', fontSize: '20px', fontWeight: 600, letterSpacing: '0.05em' }}>MIVA LEGACY</span>
        </div>
        <span style={{ color: '#6B7A99', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Pioneer Class · 2025</span>
      </nav>

      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', textAlign: 'center', padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse at top, #2A0A0D 0%, #0D1B2A 60%)',
      }}>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, #E63946)', marginBottom: '40px' }} />
        <p style={{ color: '#E63946', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>Miva Open University · Nigeria</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, marginBottom: '24px', maxWidth: '900px' }}>
          The Pioneer<br /><span style={{ color: '#E63946' }}>Class of 2025</span>
        </h1>
        <p style={{ color: '#B0B8C8', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '56px', fontWeight: 300 }}>
          The first to walk this path. A permanent digital record of the graduates who built the foundation of something lasting.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#students" style={{ backgroundColor: '#E63946', color: '#F5F5F0', padding: '16px 40px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Meet the Class</a>
          <a href="/our-story" style={{ border: '1px solid rgba(230, 57, 70, 0.4)', color: '#E63946', padding: '16px 40px', fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Our Story</a>
        </div>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, #E63946, transparent)', marginTop: '80px' }} />
      </section>

      <section style={{
        padding: '80px 40px', borderTop: '1px solid #1F3154', borderBottom: '1px solid #1F3154',
        display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 8vw, 120px)', flexWrap: 'wrap',
        backgroundColor: '#162338',
      }}>
        {[{ number: '2025', label: 'Graduating Year' }, { number: '1st', label: 'Pioneer Set' }, { number: '∞', label: 'Legacy' }].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: '#E63946', fontWeight: 700, lineHeight: 1, marginBottom: '8px' }}>{stat.number}</div>
            <div style={{ color: '#6B7A99', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      <section id="about" style={{ padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#E63946', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>About This Archive</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: '24px' }}>More than a yearbook.<br />A permanent home.</h2>
            <p style={{ color: '#B0B8C8', lineHeight: 1.8, fontSize: '16px', fontWeight: 300 }}>
              Miva Legacy is the digital graduating portfolio for Miva Open University. Unlike a physical yearbook that fades and gets lost, this platform lives online permanently — accessible from anywhere, at any time, for generations.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { title: 'Each Student', desc: 'Gets a dedicated profile page with photos, bio, achievements, and memories.' },
              { title: 'Every Class', desc: 'Future graduating sets will be added, building a growing legacy over time.' },
              { title: 'Forever Online', desc: 'No printing costs. No lost copies. Always accessible from any device.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', border: '1px solid #1F3154', borderLeft: '3px solid #E63946', backgroundColor: '#162338' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', marginBottom: '8px', color: '#F5F5F0' }}>{item.title}</div>
                <div style={{ color: '#B0B8C8', fontSize: '14px', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="students" style={{ padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 80px)', backgroundColor: '#162338', borderTop: '1px solid #1F3154' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#E63946', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>Pioneer Class · 2025</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 600 }}>Meet the Graduates</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {students?.map((student) => (
            <a key={student.slug} href={`/students/${student.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#1B2A4A', border: '1px solid #1F3154', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#1F3154', overflow: 'hidden' }}>
                  {student.profile_photo_url ? (
                    <img src={student.profile_photo_url} alt={student.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#2A3F6B', fontSize: '48px' }}>◈</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', marginBottom: '4px', color: '#F5F5F0' }}>{student.full_name}</div>
                  <div style={{ color: '#E63946', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>{student.program}</div>
                  <div style={{ color: '#6B7A99', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.5 }}>"{student.quote}"</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ padding: '40px', borderTop: '1px solid #1F3154', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', backgroundColor: '#0D1B2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #E63946 50%, #C0392B 100%)', clipPath: 'polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)' }} />
          <span style={{ fontFamily: 'Playfair Display, serif', color: '#F5F5F0', fontSize: '16px' }}>MIVA LEGACY</span>
        </div>
        <span style={{ color: '#6B7A99', fontSize: '13px' }}>© 2025 Miva Open University · Pioneer Class</span>
      </footer>
    </main>
  );
}