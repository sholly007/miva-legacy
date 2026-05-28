export default function Home() {
  return (
    <main>
      {/* NAVIGATION */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(10px)',
      }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          color: '#C9A84C',
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          MIVA LEGACY
        </span>
        <span style={{
          color: '#606060',
          fontSize: '13px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          Pioneer Class · 2025
        </span>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse at top, #1a1500 0%, #0A0A0A 60%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative line */}
        <div style={{
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, #C9A84C)',
          marginBottom: '40px',
        }} />

        <p style={{
          color: '#C9A84C',
          fontSize: '12px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}>
          Miva Open University · Nigeria
        </p>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(42px, 8vw, 96px)',
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: '24px',
          maxWidth: '900px',
        }}>
          The Pioneer<br />
          <span style={{ color: '#C9A84C' }}>Class of 2025</span>
        </h1>

        <p style={{
          color: '#A0A09A',
          fontSize: 'clamp(16px, 2vw, 20px)',
          maxWidth: '560px',
          lineHeight: 1.7,
          marginBottom: '56px',
          fontWeight: 300,
        }}>
          The first to walk this path. A permanent digital record 
          of the graduates who built the foundation of something lasting.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#students" style={{
            backgroundColor: '#C9A84C',
            color: '#0A0A0A',
            padding: '16px 40px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Meet the Class
          </a>
          <a href="#about" style={{
            border: '1px solid rgba(201, 168, 76, 0.4)',
            color: '#C9A84C',
            padding: '16px 40px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Our Story
          </a>
        </div>

        {/* Decorative bottom line */}
        <div style={{
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, #C9A84C, transparent)',
          marginTop: '80px',
        }} />
      </section>

      {/* STATS SECTION */}
      <section style={{
        padding: '80px 40px',
        borderTop: '1px solid #1A1A1A',
        borderBottom: '1px solid #1A1A1A',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(40px, 8vw, 120px)',
        flexWrap: 'wrap',
        backgroundColor: '#111111',
      }}>
        {[
          { number: '2025', label: 'Graduating Year' },
          { number: '1st', label: 'Pioneer Set' },
          { number: '∞', label: 'Legacy' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#C9A84C',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              {stat.number}
            </div>
            <div style={{
              color: '#606060',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          <div>
            <p style={{
              color: '#C9A84C',
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              About This Archive
            </p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: '24px',
            }}>
              More than a yearbook.<br />A permanent home.
            </h2>
            <p style={{
              color: '#A0A09A',
              lineHeight: 1.8,
              fontSize: '16px',
              fontWeight: 300,
            }}>
              Miva Legacy is the digital graduating portfolio for Miva Open University. 
              Unlike a physical yearbook that fades and gets lost, this platform lives 
              online permanently — accessible from anywhere, at any time, for generations.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { title: 'Each Student', desc: 'Gets a dedicated profile page with photos, bio, achievements, and memories.' },
              { title: 'Every Class', desc: 'Future graduating sets will be added, building a growing legacy over time.' },
              { title: 'Forever Online', desc: 'No printing costs. No lost copies. Always accessible from any device.' },
            ].map((item) => (
              <div key={item.title} style={{
                padding: '24px',
                border: '1px solid #1A1A1A',
                borderLeft: '3px solid #C9A84C',
                backgroundColor: '#111111',
              }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '18px',
                  marginBottom: '8px',
                  color: '#F5F5F0',
                }}>
                  {item.title}
                </div>
                <div style={{
                  color: '#A0A09A',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENTS PLACEHOLDER SECTION */}
      <section id="students" style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 80px)',
        backgroundColor: '#111111',
        borderTop: '1px solid #1A1A1A',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Pioneer Class · 2025
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 600,
          }}>
            Meet the Graduates
          </h2>
        </div>

        {/* Placeholder cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} style={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #222222',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}>
              {/* Photo placeholder */}
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: '#222222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#333333', fontSize: '48px' }}>◈</span>
              </div>
              {/* Info */}
              <div style={{ padding: '20px' }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '18px',
                  marginBottom: '4px',
                }}>
                  Graduate Name
                </div>
                <div style={{
                  color: '#C9A84C',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  Programme · 2025
                </div>
                <div style={{
                  color: '#606060',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}>
                  "Placeholder quote from the graduate..."
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid #1A1A1A',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          color: '#C9A84C',
          fontSize: '16px',
        }}>
          MIVA LEGACY
        </span>
        <span style={{ color: '#606060', fontSize: '13px' }}>
          © 2025 Miva Open University · Pioneer Class
        </span>
      </footer>
    </main>
  );
}