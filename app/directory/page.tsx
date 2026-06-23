"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import { ScrollReveal } from "../../components/ScrollReveal";

type Student = {
  slug: string;
  full_name: string;
  program: string;
  profile_photo_url: string | null;
  bio: string | null;
  cohort_year: string | number | null;
  degree_level: string | null;
};

function bioPreview(bio: string | null, maxLength = 120) {
  if (!bio) return "Graduate of Miva Open University — view full profile for details.";
  if (bio.length <= maxLength) return bio;
  return `${bio.slice(0, maxLength).trim()}…`;
}

function DirectoryContent() {
  const mountId = Math.random().toString(36).substring(7);
  console.log(`[Directory] Component rendering - mountId: ${mountId}, timestamp: ${Date.now()}`);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const levelParam = searchParams.get("level");

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;
  const savedScrollPositionRef = useRef(0);

  // Fetch students from Supabase
  useEffect(() => {
    async function fetchStudents() {
      try {
        console.log("Fetching students from Supabase...");
        const { data, error } = await supabase
          .from("students")
          .select("slug, full_name, program, profile_photo_url, bio, cohort_year, degree_level")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          setLoading(false);
          return;
        }

        console.log("Fetched students:", data?.length || 0);
        if (data) {
          setStudents(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);



  // Define valid degree levels
  const VALID_DEGREE_LEVELS = {
    BACHELORS: "Bachelor's (BSc/BA/BEng/LLB/etc.)",
    MASTERS: "Master's (MSc/MA/MBA/etc.)",
    PHD: "PhD",
    POSTGRAD_DIPLOMA: "Postgraduate Diploma"
  };

  // Handle URL parameter for initial filter
  useEffect(() => {
    if (levelParam === "undergraduate") {
      setSelectedDegreeLevel("undergraduate");
    } else if (levelParam === "postgraduate") {
      setSelectedDegreeLevel("postgraduate");
    } else {
      setSelectedDegreeLevel("");
    }
  }, [levelParam]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when search/filter changes
  useEffect(() => {
    console.log(`[Directory] Pagination reset triggered - search: ${debouncedSearch}, program: ${selectedProgram}, cohort: ${selectedCohort}, level: ${selectedDegreeLevel}`);
    setCurrentPage(1);
  }, [debouncedSearch, selectedProgram, selectedCohort, selectedDegreeLevel]);

  // Save scroll position when navigating to modal, restore when returning
  useEffect(() => {
    console.log(`[Directory] Pathname changed to: ${pathname}`);
    // Check if pathname changed to modal route
    if (pathname.startsWith('/directory/students/')) {
      // Save scroll position before modal opens
      savedScrollPositionRef.current = window.scrollY;
      console.log(`[Directory] Saved scroll position: ${savedScrollPositionRef.current}`);
    } else if (pathname === '/directory') {
      // Restore scroll position when returning to directory
      if (savedScrollPositionRef.current > 0) {
        // Use setTimeout to ensure DOM is ready after Next.js scroll reset
        setTimeout(() => {
          console.log(`[Directory] Restoring scroll position to: ${savedScrollPositionRef.current}`);
          window.scrollTo(0, savedScrollPositionRef.current);
          savedScrollPositionRef.current = 0;
        }, 0);
      }
    }
  }, [pathname]);

  // Get unique programs, cohorts, and degree levels for filters
  const programs = useMemo(() => {
    const uniquePrograms = [...new Set(students.map((s) => s.program).filter(Boolean))];
    return uniquePrograms.sort();
  }, [students]);

  const cohorts = useMemo(() => {
    const uniqueCohorts = [...new Set(students.map((s) => s.cohort_year).filter((year): year is string | number => Boolean(year)))];
    return uniqueCohorts.sort((a, b) => (Number(a) || 0) - (Number(b) || 0));
  }, [students]);

  const degreeLevels = useMemo(() => {
    const uniqueLevels = [...new Set(students.map((s) => s.degree_level).filter((level): level is string => Boolean(level)))];
    return uniqueLevels.sort();
  }, [students]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    console.log(`[Filter] selectedDegreeLevel: ${JSON.stringify(selectedDegreeLevel)}`);
    console.log(`[Filter] VALID_DEGREE_LEVELS:`, VALID_DEGREE_LEVELS);
    
    const filtered = students.filter((student) => {
      const matchesSearch = debouncedSearch === "" ||
        student.full_name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesProgram = selectedProgram === "" || student.program === selectedProgram;
      const matchesCohort = selectedCohort === "" || String(student.cohort_year) === selectedCohort;
      
      let matchesDegreeLevel = true;
      if (selectedDegreeLevel === "undergraduate") {
        matchesDegreeLevel = student.degree_level === VALID_DEGREE_LEVELS.BACHELORS;
        console.log(`[Filter] ${student.full_name} (${JSON.stringify(student.degree_level)}) → undergrad match? ${matchesDegreeLevel}`);
      } else if (selectedDegreeLevel === "postgraduate") {
        matchesDegreeLevel = 
          student.degree_level === VALID_DEGREE_LEVELS.MASTERS ||
          student.degree_level === VALID_DEGREE_LEVELS.PHD ||
          student.degree_level === VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA;
        console.log(`[Filter] ${student.full_name} (${JSON.stringify(student.degree_level)}) → postgrad match? ${matchesDegreeLevel}`);
      } else if (selectedDegreeLevel) {
        matchesDegreeLevel = student.degree_level === selectedDegreeLevel;
      }

      return matchesSearch && matchesProgram && matchesCohort && matchesDegreeLevel;
    });
    
    console.log(`[Filter] Total students: ${students.length} → Filtered: ${filtered.length}`);
    return filtered;
  }, [students, debouncedSearch, selectedProgram, selectedCohort, selectedDegreeLevel, VALID_DEGREE_LEVELS]);

  // Determine dynamic heading
  const getHeading = () => {
    if (levelParam === "undergraduate") return "Undergraduate Alumni";
    if (levelParam === "postgraduate") return "Postgraduate Alumni";
    return "Meet the Graduates";
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedProgram("");
    setSelectedCohort("");
    setSelectedDegreeLevel("");
  };

  const navLinks = [
    { href: "/directory?level=undergraduate", label: "Undergraduate Alumni" },
    { href: "/directory?level=postgraduate", label: "Postgraduate Alumni" },
    { href: "/our-story", label: "Our Story" },
  ];

  if (loading) {
    return (
      <main>
        <SiteNav links={navLinks} />
        <section className="alumni-section alumni-section-directory">
          <div className="container">
            <div className="section-header">
              <p className="section-label">Alumni Directory</p>
              <h2 className="section-title">{getHeading()}</h2>
            </div>
            <p>Loading...</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <SiteNav links={navLinks} />

      <section className="alumni-section alumni-section-directory">
        <div className="container">
          <div className="section-header animate-fade-up animate-delay-1">
            <p className="section-label">Alumni Directory</p>
            <h2 className="section-title">{getHeading()}</h2>
          </div>

          {/* Search and Filters */}
          <div className="directory-filters animate-fade-up animate-delay-2">
            <div className="filter-search">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-dropdowns">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="filter-select"
              >
                <option value="">All Programs</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>

              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="filter-select"
              >
                <option value="">All Cohorts</option>
                {cohorts.map((cohort) => (
                  <option key={cohort || ""} value={cohort || ""}>
                    Class of {cohort}
                  </option>
                ))}
              </select>

              <select
                value={selectedDegreeLevel}
                onChange={(e) => setSelectedDegreeLevel(e.target.value)}
                className="filter-select"
              >
                <option value="">All Degree Levels</option>
                <option value="Bachelor's">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                {degreeLevels.map((level) => (
                  level !== "Bachelor's" && (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {filteredStudents.length > 0 && (
            <p className="results-count animate-fade-up animate-delay-3">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} graduate{filteredStudents.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Student Grid */}
          {currentStudents.length > 0 ? (
            <div className="alumni-grid">
              {currentStudents.map((student, index) => (
                <ScrollReveal key={student.slug} delay={index * 80}>
                  <article className="alumni-card">
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
                    <Link href={`/directory/students/${student.slug}?from=directory`} className="btn-card">
                      View Profile
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="empty-state animate-fade-up animate-delay-3">
              <p>No graduates found matching your search.</p>
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination animate-fade-up animate-delay-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => (
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`pagination-number ${currentPage === page ? "active" : ""}`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="alumni-section alumni-section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollReveal>
            <div className="about-panel">
              <p className="section-label">About This Archive</p>
              <h2>More than a yearbook. A permanent alumni home.</h2>
              <p>
                Miva Legacy is the digital graduating portfolio for Miva Open University — a structured, always-accessible record of every pioneer graduate&apos;s journey, achievements, and aspirations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function Directory() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
