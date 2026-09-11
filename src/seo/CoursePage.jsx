import React, { useState } from 'react';
import { catalog, coursePages, directoryPages } from './catalog.js';
import { COURSE_DETAILS } from '../networkz/data/courseData.js';
import './CoursePage.css';

export default function CoursePage({ path }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const page = coursePages[path] || directoryPages[path] || {
    name: 'IT Courses in Kollam',
    title: 'IT Courses in Kollam | Networkz Systems',
    description: 'Explore software, AI, cyber security, networking and digital marketing courses at Networkz Systems Kollam.',
    kind: 'directory'
  };

  const isDirectory = Boolean(page.kind);
  const isInternships = page.kind === 'internships';

  // Filter courses based on whether page is internships or all courses directory
  const coursesToDisplay = isInternships 
    ? catalog.filter(c => c.categoryId === '5')
    : catalog;

  // Group by category for directory view
  const categoryGroups = Object.entries(COURSE_DETAILS).map(([id, group]) => ({
    id,
    name: group.category,
    courses: coursesToDisplay.filter(c => c.categoryId === id)
  })).filter(g => g.courses.length > 0);

  // WhatsApp enquiry link generator
  const whatsappUrl = `https://wa.me/918089030405?text=${encodeURIComponent(
    `Hello Networkz Systems Kollam, please share details, fees, syllabus and upcoming batch schedules for ${page.name}.`
  )}`;

  return (
    <div className="cp-root">
      {/* ── Sticky Luxury Header ── */}
      <header className="cp-nav">
        <div className="cp-nav-inner">
          <a href="/" className="cp-brand">
            <span className="cp-brand-title">NETWORKZ SYSTEMS</span>
            <span className="cp-brand-tag">KOLLAM CAMPUS</span>
          </a>

          <ul className="cp-menu">
            <li><a href="/" className="cp-menu-link">HOME</a></li>
            <li><a href="/courses" className={`cp-menu-link ${path === '/courses' ? 'active' : ''}`}>COURSES</a></li>
            <li><a href="/internships-kollam" className={`cp-menu-link ${path === '/internships-kollam' ? 'active' : ''}`}>INTERNSHIPS</a></li>
          </ul>

          <div className="cp-nav-ctas">
            <a href="tel:+918089030405" className="cp-btn-call">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 80890 30405</span>
            </a>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cp-btn-whatsapp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>Enquire</span>
            </a>

            <button 
              type="button" 
              className="cp-mobile-toggle" 
              onClick={() => setMobileNavOpen(prev => !prev)}
              aria-label="Toggle Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileNavOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="cp-mobile-drawer">
            <a href="/" className="cp-mobile-link">Home Page</a>
            <a href="/courses" className="cp-mobile-link">All IT Courses</a>
            <a href="/cybersecurity" className="cp-mobile-link">Cyber Security & Ethical Hacking</a>
            <a href="/digital-marketing" className="cp-mobile-link">Digital Marketing Professional</a>
            <a href="/internships-kollam" className="cp-mobile-link">Internship Programs</a>
          </div>
        )}
      </header>

      {/* ── Breadcrumb Bar ── */}
      <div className="cp-crumb-wrapper">
        <div className="cp-container">
          <nav aria-label="Breadcrumb" className="cp-crumb">
            <a href="/">Home</a>
            <span className="cp-crumb-sep">/</span>
            {isDirectory ? (
              <span className="cp-crumb-current" aria-current="page">{page.name}</span>
            ) : (
              <>
                <a href="/courses">Courses</a>
                <span className="cp-crumb-sep">/</span>
                <span className="cp-crumb-current" aria-current="page">{page.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <section className="cp-hero">
        <div className="cp-container">
          <div className="cp-eyebrow-pill">
            <span className="cp-eyebrow-dot"></span>
            <span>{page.category || 'OFFICIAL TRAINING CATALOG · KOLLAM'}</span>
          </div>

          <h1 className="cp-hero-title">{page.name}</h1>

          <p className="cp-hero-desc">
            {isDirectory ? (
              page.description
            ) : (
              `Master ${page.name.replace(' Course in Kollam', '')} with industry-grade practical training at Networkz Systems Kollam Campus (Chinnakada). Covered topics include ${page.topics.join(', ')}.`
            )}
          </p>

          <div className="cp-hero-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cp-hero-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>{isDirectory ? 'Request Course Catalogue & Fees' : 'Enquire on WhatsApp'}</span>
            </a>

            <a href="tel:+918089030405" className="cp-hero-btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call +91 80890 30405</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="cp-stats-grid">
            <div className="cp-stat-card">
              <div className="cp-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="cp-stat-label">Duration</div>
                <div className="cp-stat-val">{page.duration || 'Flexible Hours'}</div>
              </div>
            </div>

            <div className="cp-stat-card">
              <div className="cp-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <div className="cp-stat-label">Course Level</div>
                <div className="cp-stat-val">{page.level || 'INTERMEDIATE TO ADVANCED'}</div>
              </div>
            </div>

            <div className="cp-stat-card">
              <div className="cp-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="cp-stat-label">Location</div>
                <div className="cp-stat-val">Chinnakada, Kollam</div>
              </div>
            </div>

            <div className="cp-stat-card">
              <div className="cp-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <div>
                <div className="cp-stat-label">Certification</div>
                <div className="cp-stat-val">{page.cert || 'ISO Certified'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Section ── */}
      <main className="cp-main-section">
        <div className="cp-container">
          {isDirectory ? (
            /* ── Directory Page View (/courses and /internships-kollam) ── */
            categoryGroups.map((grp) => (
              <section key={grp.id} className="cp-cat-group">
                <div className="cp-cat-header">
                  <h2 className="cp-cat-name">{grp.name}</h2>
                  <span className="cp-cat-count">{grp.courses.length} Programs</span>
                </div>

                <div className="cp-cards-grid">
                  {grp.courses.map((c) => (
                    <a key={c.id} href={c.path} className="cp-course-card">
                      <div className="cp-card-img-wrapper">
                        <img src={c.image} alt={c.name} className="cp-card-img" loading="lazy" />
                        <div className="cp-card-badges">
                          <span className="cp-badge-dur">{c.duration}</span>
                          <span className="cp-badge-level">{c.level}</span>
                        </div>
                      </div>

                      <div className="cp-card-body">
                        <h3 className="cp-card-title">{c.name}</h3>
                        <p className="cp-card-desc">
                          {c.desc.replace('100% placement', 'placement support')}
                        </p>

                        <div className="cp-card-footer">
                          <span className="cp-card-link-text">
                            <span>Explore Course</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))
          ) : (
            /* ── Individual Course Landing Page View ── */
            <>
              {/* Curriculum / What You Will Learn Section */}
              <section style={{ marginBottom: '4rem' }}>
                <h2 className="cp-section-title">What You Will Study in This Course</h2>
                <p className="cp-section-sub">
                  Hands-on curriculum structured to build real-world proficiency with industry tools.
                </p>

                <div className="cp-topics-grid">
                  {page.topics && page.topics.map((topic, idx) => (
                    <div key={idx} className="cp-topic-card">
                      <div className="cp-topic-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="cp-topic-text">{topic}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Study at Networkz Systems Kollam */}
              <section style={{ marginBottom: '4rem' }}>
                <h2 className="cp-section-title">Why Networkz Systems Kollam Campus?</h2>
                <p className="cp-section-sub">
                  Kollam's premier technical institute for career-oriented IT certifications and hands-on skill development.
                </p>

                <div className="cp-features-grid">
                  <div className="cp-feature-card">
                    <div className="cp-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <h3 className="cp-feature-title">Placement Assistance</h3>
                    <p className="cp-feature-text">Dedicated placement cell with interview scheduling, resume building, and hiring partner connections in Kerala & Pan-India.</p>
                  </div>

                  <div className="cp-feature-card">
                    <div className="cp-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </div>
                    <h3 className="cp-feature-title">100% Practical Labs</h3>
                    <p className="cp-feature-text">Learn by doing with live project work, lab hardware, microservices environments, and mentored coding sessions.</p>
                  </div>

                  <div className="cp-feature-card">
                    <div className="cp-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className="cp-feature-title">Expert Mentors</h3>
                    <p className="cp-feature-text">Classes conducted by seasoned industry developers, cloud engineers, and certified security practitioners.</p>
                  </div>

                  <div className="cp-feature-card">
                    <div className="cp-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                      </svg>
                    </div>
                    <h3 className="cp-feature-title">ISO Certified Institute</h3>
                    <p className="cp-feature-text">Globally recognized training quality with official certificates valid for job applications worldwide.</p>
                  </div>
                </div>
              </section>

              {/* Related Courses Grid */}
              {catalog.filter(c => c.categoryId === page.categoryId && c.id !== page.id).length > 0 && (
                <section style={{ marginBottom: '4rem' }}>
                  <h2 className="cp-section-title">Related Courses in Kollam</h2>
                  <p className="cp-section-sub">Explore complementary skill paths in {page.category}.</p>

                  <div className="cp-cards-grid">
                    {catalog.filter(c => c.categoryId === page.categoryId && c.id !== page.id).slice(0, 3).map((c) => (
                      <a key={c.id} href={c.path} className="cp-course-card">
                        <div className="cp-card-img-wrapper">
                          <img src={c.image} alt={c.name} className="cp-card-img" loading="lazy" />
                          <div className="cp-card-badges">
                            <span className="cp-badge-dur">{c.duration}</span>
                            <span className="cp-badge-level">{c.level}</span>
                          </div>
                        </div>

                        <div className="cp-card-body">
                          <h3 className="cp-card-title">{c.name}</h3>
                          <p className="cp-card-desc">{c.desc}</p>
                          <div className="cp-card-footer">
                            <span className="cp-card-link-text">
                              <span>View Course</span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Campus Location & Contact Card */}
          <div className="cp-contact-card">
            <div className="cp-contact-info">
              <h3>Visit Networkz Systems Kollam</h3>
              <address>
                2nd Floor, Pattathuvila Plaza, Vadayattukotta Road,<br />
                Chinnakada, Kollam, Kerala 691001
              </address>
              <div className="cp-contact-hours">Monday – Sunday: 9:00 AM – 5:30 PM</div>
            </div>

            <div className="cp-contact-actions">
              <a 
                href="https://maps.google.com/?q=Networkz+Systems+Pattathuvila+Plaza+Chinnakada+Kollam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cp-hero-btn-secondary"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Get Directions</span>
              </a>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cp-hero-btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <span>Enquire Fees & Batches</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="cp-footer">
        <div className="cp-container">
          <div className="cp-footer-inner">
            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>Networkz Systems Kollam Campus</strong>
              <span>© {new Date().getFullYear()} Networkz Systems. All rights reserved.</span>
            </div>

            <div className="cp-footer-links">
              <a href="/courses">All IT Courses</a>
              <a href="/cybersecurity">Cyber Security</a>
              <a href="/digital-marketing">Digital Marketing</a>
              <a href="/internships-kollam">Internship Programs</a>
              <a href="/">Home</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
