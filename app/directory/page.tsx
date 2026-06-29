"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import { ScrollReveal } from "../../components/ScrollReveal";
import { VALID_DEGREE_LEVELS } from "../../lib/constants";
import { getDirectoryTheme } from "../../lib/directoryTheme";
import Gallery from "../../components/Gallery";

type Student = {
  slug: string;
  full_name: string;
  program: string;
  profile_photo_url: string | null;
  bio: string | null;
  cohort_year: string | number | null;
  degree_level: string | null;
  [key: string]: any;
};

function bioPreview(bio: string | null, maxLength = 120) {
  if (!bio) return "Graduate of Miva Open University — view full profile for details.";
  if (bio.length <= maxLength) return bio;
  return `${bio.slice(0, maxLength).trim()}…`;
}

function getAchievements(achievements: unknown): string[] | string {
  if (!achievements) return [];
  if (Array.isArray(achievements)) {
    return achievements.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof achievements === "string") {
    return achievements.trim();
  }
  return [];
}

function getSkillsArray(achievements: unknown): string[] {
  if (!achievements) return [];
  if (Array.isArray(achievements)) {
    return achievements.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof achievements === "string") {
    return achievements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="social-btn">
      {children}
    </a>
  );
}

function DirectoryContent() {
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level");
  const isPostgraduate = levelParam === "postgraduate";
  const { theme } = getDirectoryTheme(isPostgraduate);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;
  
  // Modal state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fullStudentData, setFullStudentData] = useState<Student | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  // Handle browser back/forward and initial state from history
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.selectedStudentSlug) {
        const student = students.find(s => s.slug === event.state.selectedStudentSlug);
        if (student) {
          setSelectedStudent(student);
        }
      } else {
        setSelectedStudent(null);
      }
    };

    if (window.history.state?.selectedStudentSlug) {
      const student = students.find(s => s.slug === window.history.state.selectedStudentSlug);
      if (student) {
        setSelectedStudent(student);
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [students]);

  // Handle body overflow and scroll position when modal opens/closes
  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = 'hidden';
      // Set scrollTop=0 when modal opens
      if (modalOverlayRef.current) {
        modalOverlayRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedStudent]);
  
  // Fetch full student data
  useEffect(() => {
    const fetchFullData = async () => {
      if (selectedStudent) {
        setModalLoading(true);
        try {
          const { data, error } = await supabase
            .from("students")
            .select("*")
            .eq("slug", selectedStudent.slug)
            .single();
          
          if (error) {
            console.error("Error fetching full student data:", error);
            return;
          }
          
          setFullStudentData(data);
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setModalLoading(false);
        }
      } else {
        setFullStudentData(null);
      }
    };

    fetchFullData();
  }, [selectedStudent]);

  // Update history when selectedStudent changes
  useEffect(() => {
    if (selectedStudent && !isClosingModal) {
      window.history.pushState(
        { selectedStudentSlug: selectedStudent.slug },
        '',
        `#${selectedStudent.slug}`
      );
    } else if (!selectedStudent && isClosingModal) {
      setIsClosingModal(false);
    }
  }, [selectedStudent, isClosingModal]);

  // Handle closing the modal
  const handleCloseModal = () => {
    if (window.history.state?.selectedStudentSlug) {
      setIsClosingModal(true);
      window.history.back();
    } else {
      setSelectedStudent(null);
    }
  };

  // Fetch students from Supabase
  useEffect(() => {
    async function fetchStudents() {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("slug, full_name, program, profile_photo_url, bio, cohort_year, degree_level")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) {
          setLoading(false);
          return;
        }

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
    setCurrentPage(1);
  }, [debouncedSearch, selectedProgram, selectedCohort, selectedDegreeLevel]);

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
    return students.filter((student) => {
      const matchesSearch = debouncedSearch === "" ||
        student.full_name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesProgram = selectedProgram === "" || student.program === selectedProgram;
      const matchesCohort = selectedCohort === "" || String(student.cohort_year) === selectedCohort;
      
      let matchesDegreeLevel = true;
      if (selectedDegreeLevel === "undergraduate") {
        matchesDegreeLevel = student.degree_level === VALID_DEGREE_LEVELS.BACHELORS;
      } else if (selectedDegreeLevel === "postgraduate") {
        matchesDegreeLevel = 
          student.degree_level === VALID_DEGREE_LEVELS.MASTERS ||
          student.degree_level === VALID_DEGREE_LEVELS.PHD ||
          student.degree_level === VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA;
      } else if (selectedDegreeLevel) {
        matchesDegreeLevel = student.degree_level === selectedDegreeLevel;
      }

      return matchesSearch && matchesProgram && matchesCohort && matchesDegreeLevel;
    });
  }, [students, debouncedSearch, selectedProgram, selectedCohort, selectedDegreeLevel]);

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
      <main data-theme={theme}>
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
    <main data-theme={theme}>
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
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                {degreeLevels.map((level) => (
                  level !== VALID_DEGREE_LEVELS.BACHELORS && (
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
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="btn-card"
                    >
                      View Profile
                    </button>
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
                Miva Legacy is the digital graduating portfolio for Miva Open University — a structured, always-accessible record of every pioneer graduate's journey, achievements, and aspirations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Full Screen Modal */}
      {selectedStudent && (
        <div 
          ref={modalOverlayRef}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', paddingTop: '16px', paddingBottom: '16px' }}
          onClick={handleCloseModal}
        >
          <div 
            style={{ position: 'relative', width: '100%', maxWidth: '1200px' }} 
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={(e) => { e.stopPropagation(); handleCloseModal(); }} 
              className="lightbox-close"
              aria-label="Close profile" 
            > 
              ✕ 
            </button>
            <div 
              className="w-full bg-white overflow-y-auto"
            >

            {/* Loading State */}
            {modalLoading ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Loading Profile...</div>
              </div>
            ) : fullStudentData ? (
              <main data-theme={theme}>
                <SiteNav
                  badge="Member Verified"
                  links={[
                    { href: "/", label: "Home" },
                    { href: "/directory?level=undergraduate", label: "Undergraduate Alumni" },
                    { href: "/directory?level=postgraduate", label: "Postgraduate Alumni" },
                    { href: "/our-story", label: "Our Story" },
                  ]}
                />

                <div className="profile-page">
                  <div className="container profile-layout">
                    <aside className="panel panel-sidebar">
                      {fullStudentData.profile_photo_url ? (
                        <img src={fullStudentData.profile_photo_url} alt={fullStudentData.full_name} className="profile-avatar" />
                      ) : (
                        <div className="profile-avatar bg-gray-200 flex items-center justify-center text-4xl">
                          ◈
                        </div>
                      )}

                      <span className="verified-badge profile-verified">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        Member Verified
                      </span>

                      <h1 className="profile-sidebar-name">{fullStudentData.full_name}</h1>
                      <p className="profile-sidebar-degree">{fullStudentData.program}</p>

                      <ul className="profile-meta-list">
                        {fullStudentData.cohort_year && (
                          <li className="profile-meta-item">
                            <span className="profile-meta-label">Cohort</span>
                            <span className="profile-meta-value">Class of {fullStudentData.cohort_year}</span>
                          </li>
                        )}
                        {fullStudentData.matric_number && (
                          <li className="profile-meta-item">
                            <span className="profile-meta-label">Matriculation ID</span>
                            <span className="profile-meta-value">{fullStudentData.matric_number}</span>
                          </li>
                        )}
                        <li className="profile-meta-item">
                          <span className="profile-meta-label">Location</span>
                          <span className="profile-meta-value">Nigeria</span>
                        </li>
                        {fullStudentData.duration && (
                          <li className="profile-meta-item">
                            <span className="profile-meta-label">Duration</span>
                            <span className="profile-meta-value">{fullStudentData.duration}</span>
                          </li>
                        )}
                      </ul>

                      {getSkillsArray(fullStudentData.achievements).length > 0 && (
                        <div className="skill-list">
                          <p className="skill-list-title">Skills &amp; Milestones</p>
                          {getSkillsArray(fullStudentData.achievements).map((achievement, index) => (
                            <div key={`${achievement}-${index}`} className="skill-item">
                              <div className="skill-item-header">
                                <span>{achievement}</span>
                                <span>{Math.min(100, 85 + (index % 3) * 5)}%</span>
                              </div>
                              <div className="skill-bar">
                                <div className="skill-bar-fill" style={{ width: `${Math.min(100, 85 + (index % 3) * 5)}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </aside>

                    <div className="profile-main-stack">
                      <section className="panel">
                        <p className="panel-subheading">About</p>
                        <h2 className="panel-heading">Profile Overview</h2>
                        <p className="panel-bio">{fullStudentData.bio}</p>

                        <div className="profile-stats-row">
                          {fullStudentData.gpa && (
                            <div className="profile-stat">
                              <p className="profile-stat-label">GPA</p>
                              <p className="profile-stat-value accent">
                                {(() => {
                                  const gpa = parseFloat(fullStudentData.gpa);
                                  if (isNaN(gpa)) {
                                    return fullStudentData.gpa;
                                  }

                                  let degreeLevel = fullStudentData.degree_level;
                                  if (!degreeLevel) {
                                    const programLower = (fullStudentData.program || "").toLowerCase();
                                    if (programLower.includes("phd") || programLower.includes("doctor")) {
                                      degreeLevel = VALID_DEGREE_LEVELS.PHD;
                                    } else if (programLower.includes("msc") || programLower.includes("ma") || programLower.includes("mba") || programLower.includes("master")) {
                                      degreeLevel = VALID_DEGREE_LEVELS.MASTERS;
                                    } else if (programLower.includes("postgraduate diploma") || programLower.includes("pgd")) {
                                      degreeLevel = VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA;
                                    } else {
                                      degreeLevel = VALID_DEGREE_LEVELS.BACHELORS;
                                    }
                                  }

                                  let classification = "";

                                  if (degreeLevel === VALID_DEGREE_LEVELS.PHD) {
                                    return fullStudentData.gpa;
                                  } else if (degreeLevel === VALID_DEGREE_LEVELS.MASTERS || degreeLevel === VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA) {
                                    if (gpa >= 4.50 && gpa <= 5.00) {
                                      classification = "Distinction";
                                    } else if (gpa >= 3.50 && gpa <= 4.49) {
                                      classification = "Merit";
                                    } else if (gpa >= 3.00 && gpa <= 3.49) {
                                      classification = "Pass";
                                    }
                                  } else {
                                    if (gpa >= 4.50 && gpa <= 5.00) {
                                      classification = "First Class";
                                    } else if (gpa >= 3.50 && gpa <= 4.49) {
                                      classification = "Second Class Upper";
                                    } else if (gpa >= 2.40 && gpa <= 3.49) {
                                      classification = "Second Class Lower";
                                    } else if (gpa >= 1.50 && gpa <= 2.39) {
                                      classification = "Third Class";
                                    } else if (gpa >= 1.00 && gpa <= 1.49) {
                                      classification = "Pass";
                                    }
                                  }

                                  if (classification) {
                                    return `${classification} (${fullStudentData.gpa})`;
                                  } else {
                                    return fullStudentData.gpa;
                                  }
                                })()}
                              </p>
                            </div>
                          )}
                          {fullStudentData.duration && (
                            <div className="profile-stat">
                              <p className="profile-stat-label">Duration</p>
                              <p className="profile-stat-value">{fullStudentData.duration}</p>
                            </div>
                          )}
                          {fullStudentData.cohort_year && (
                            <div className="profile-stat">
                              <p className="profile-stat-label">Graduated</p>
                              <p className="profile-stat-value">{fullStudentData.cohort_year}</p>
                            </div>
                          )}
                        </div>

                        {fullStudentData.quote && <blockquote className="panel-quote">&ldquo;{fullStudentData.quote}&rdquo;</blockquote>}

                        {(fullStudentData.linkedin_url || fullStudentData.twitter_url || fullStudentData.instagram_url || fullStudentData.tiktok_url) && (
                          <div className="social-row" style={{ marginTop: "24px" }}>
                            <span className="social-label">Connect</span>
                            {fullStudentData.linkedin_url && (
                              <SocialButton href={fullStudentData.linkedin_url} label="LinkedIn profile">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.065 2.065 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </SocialButton>
                            )}
                            {fullStudentData.twitter_url && (
                              <SocialButton href={fullStudentData.twitter_url} label="Twitter / X profile">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </SocialButton>
                            )}
                            {fullStudentData.instagram_url && (
                              <SocialButton href={fullStudentData.instagram_url} label="Instagram profile">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </SocialButton>
                            )}
                            {fullStudentData.tiktok_url && (
                              <SocialButton href={fullStudentData.tiktok_url} label="TikTok profile">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.02-2.86-.21-4.14-1.03-1.6-.99-2.87-2.58-3.37-4.35-.2-.75-.25-1.53-.19-2.32.25-3.02 2.35-5.48 5.28-6.1.94-.2 1.93-.12 2.88.18 1.04.32 2.01.93 2.74 1.74.04-2.43.01-4.86.01-7.29 1.33.01 2.65.01 3.96.01zm-1.83 16.32c-1.51-.31-3.09.4-3.5 1.9-.19.68-.1 1.39.25 2.01.73 1.29 2.36 1.9 3.83 1.39 1.27-.43 2.17-1.57 2.32-2.89.13-1.1-.16-2.23-.84-3.14-.66-.88-1.63-1.45-2.69-1.57-.67-.08-1.34.02-1.97.26.04 1.32.01 2.63.01 3.95.33-.05.65-.12.98-.18-.03-1.24-.02-2.48-.02-3.73.55-.01 1.1.02 1.62.18.88.27 1.61.8 2.08 1.55.35.57.48 1.22.38 1.88-.26 1.64-1.79 2.75-3.45 2.39z" />
                                </svg>
                              </SocialButton>
                            )}
                          </div>
                        )}
                      </section>

                      {(function() {
                        const achievements = getAchievements(fullStudentData.achievements);
                        if (!achievements) return null;
                        if (Array.isArray(achievements) && achievements.length === 0) return null;
                        if (typeof achievements === "string" && achievements.length === 0) return null;
                        
                        return (
                          <section className="panel">
                            <p className="panel-subheading">Badges</p>
                            <h2 className="panel-heading">Achievements</h2>
                            {Array.isArray(achievements) ? (
                              <ul className="achievement-list">
                                {achievements.map((achievement, index) => (
                                  <li key={`${achievement}-${index}`} className="achievement-item">
                                    <span className="achievement-text">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="achievement-paragraph">{achievements}</p>
                            )}
                          </section>
                        );
                      })()}

                      {Array.isArray(fullStudentData.gallery_urls) && fullStudentData.gallery_urls.length > 0 && (
                        <section className="panel">
                          <p className="panel-subheading">Gallery</p>
                          <h2 className="panel-heading">Moments in Time</h2>
                          <Gallery images={fullStudentData.gallery_urls} studentName={fullStudentData.full_name} />
                        </section>
                      )}

                      {fullStudentData.memories && (
                        <section className="panel">
                          <p className="panel-subheading">Memories</p>
                          <h2 className="panel-heading">Looking Back</h2>
                          <p className="panel-text italic">&ldquo;{fullStudentData.memories}&rdquo;</p>
                        </section>
                      )}

                      {fullStudentData.aspirations && (
                        <section className="panel">
                          <p className="panel-subheading">Aspirations</p>
                          <h2 className="panel-heading">Where They Are Headed</h2>
                          <p className="panel-text">{fullStudentData.aspirations}</p>
                        </section>
                      )}
                    </div>
                  </div>
                </div>

                <SiteFooter />
              </main>
            ) : (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Student not found</div>
              </div>
            )}
          </div>
          </div>
        </div>
      )}

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
