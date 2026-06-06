import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function StudentProfile({ params }: { params: { slug: string } }) {
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("slug", params.slug)
    .single();

  console.log("SLUG:", params.slug);
  console.log("STUDENT:", student);
  console.log("ERROR:", error);

  if (!student) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0D1B2A", color: "#F5F5F0", fontFamily: "serif", fontSize: "24px" }}>
        Student not found.
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "#0D1B2A", minHeight: "100vh", color: "#F5F5F0" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(230,57,70,0.2)", backgroundColor: "rgba(13,27,42,0.95)", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #E63946 50%, #C0392B 100%)", clipPath: "polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)" }} />
          <Link href="/" style={{ fontFamily: "serif", color: "#F5F5F0", fontSize: "20px", fontWeight: 600, textDecoration: "none" }}>MIVA LEGACY</Link>
        </div>
        <Link href="/" style={{ color: "#6B7A99", fontSize: "13px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>Back to Class</Link>
      </nav>

      <section style={{ padding: "120px 40px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", maxWidth: "1200px", margin: "0 auto", gap: "80px", alignItems: "center" }}>
        <img src={student.profile_photo_url} alt={student.full_name} style={{ width: "100%", maxWidth: "460px", aspectRatio: "3/4", objectFit: "cover", border: "1px solid #1F3154" }} />
        <div>
          <p style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>{student.program} · {student.duration}</p>
          <h1 style={{ fontFamily: "serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "32px" }}>{student.full_name}</h1>
          <p style={{ color: "#B0B8C8", lineHeight: 1.8, fontSize: "16px", marginBottom: "40px" }}>{student.bio}</p>
          <blockquote style={{ borderLeft: "3px solid #E63946", paddingLeft: "24px", margin: "0 0 40px" }}>
            <p style={{ fontFamily: "serif", fontSize: "20px", fontStyle: "italic", lineHeight: 1.6 }}>"{student.quote}"</p>
          </blockquote>
          <div style={{ display: "flex", gap: "16px" }}>
            {student.linkedin_url && <a href={student.linkedin_url} target="_blank" rel="noreferrer" style={{ color: "#E63946", fontSize: "13px", textDecoration: "none", border: "1px solid rgba(230,57,70,0.4)", padding: "10px 20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>LinkedIn</a>}
            {student.twitter_url && <a href={student.twitter_url} target="_blank" rel="noreferrer" style={{ color: "#E63946", fontSize: "13px", textDecoration: "none", border: "1px solid rgba(230,57,70,0.4)", padding: "10px 20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Twitter</a>}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154", backgroundColor: "#162338" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>Achievements</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 3vw, 40px)", marginBottom: "40px" }}>What They Accomplished</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {student.achievements?.map((a: string, i: number) => (
              <div key={i} style={{ padding: "20px 24px", borderLeft: "3px solid #E63946", backgroundColor: "#0D1B2A", color: "#F5F5F0", fontSize: "15px" }}>{a}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>Gallery</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 3vw, 40px)", marginBottom: "40px" }}>Moments in Time</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {student.gallery_urls?.map((url: string, i: number) => (
              <img key={i} src={url} alt={`Photo ${i + 1}`} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: "1px solid #1F3154" }} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154", backgroundColor: "#162338" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>Memories</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 3vw, 40px)", marginBottom: "40px" }}>Looking Back</h2>
          <p style={{ color: "#B0B8C8", fontSize: "18px", lineHeight: 1.9, fontStyle: "italic" }}>"{student.memories}"</p>
        </div>
      </section>

      <section style={{ padding: "80px 40px", borderTop: "1px solid #1F3154" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#E63946", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>Aspirations</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 3vw, 40px)", marginBottom: "24px" }}>Where They are Headed</h2>
          <p style={{ color: "#F5F5F0", fontSize: "20px", lineHeight: 1.7 }}>{student.aspirations}</p>
        </div>
      </section>

      <footer style={{ padding: "40px", borderTop: "1px solid #1F3154", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0D1B2A" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "24px", background: "linear-gradient(135deg, #E63946 50%, #C0392B 100%)", clipPath: "polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%)" }} />
          <span style={{ fontFamily: "serif", color: "#F5F5F0", fontSize: "16px" }}>MIVA LEGACY</span>
        </div>
        <span style={{ color: "#6B7A99", fontSize: "13px" }}>© 2025 Miva Open University · Pioneer Class</span>
      </footer>
    </main>
  );
}