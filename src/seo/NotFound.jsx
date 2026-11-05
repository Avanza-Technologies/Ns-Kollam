import React from 'react';
import './NotFound.css';

export default function NotFound() {
  const whatsappUrl = 'https://wa.me/918089030405?text=Hello%20Networkz%20Systems%20Kollam!%20I%20am%20looking%20for%20a%20course.';

  return (
    <div className="nf-page">
      {/* ── Asymmetric Full-Width Navbar ── */}
      <header className="nf-nav">
        <div className="nf-nav-inner">
          <div className="nf-brand-wrap">
            <a href="/" className="nf-brand">
              <img src="/nsk.jpeg" alt="Networkz Systems" className="nf-brand-img" />
              <span className="nf-brand-title">NETWORKZ SYSTEMS</span>
              <span className="nf-brand-tag">KOLLAM CAMPUS</span>
            </a>
          </div>

          <ul className="nf-menu">
            <li><a href="/" className="nf-menu-link">HOME</a></li>
            <li><a href="/courses" className="nf-menu-link">ALL COURSES</a></li>
            <li><a href="/internships-kollam" className="nf-menu-link">INTERNSHIPS</a></li>
            <li><a href="/cybersecurity" className="nf-menu-link">CYBER SECURITY</a></li>
            <li><a href="/digital-marketing" className="nf-menu-link">DIGITAL MARKETING</a></li>
          </ul>

          <div className="nf-nav-ctas">
            <a href="/" className="nf-btn-home">
              ← RETURN HOME
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="nf-btn-whatsapp">
              ENQUIRE NOW ↗
            </a>
          </div>
        </div>
      </header>

      {/* ── 404 Hero Body ── */}
      <main className="nf-hero">
        <div className="nf-watermark-404" aria-hidden="true">
          404
        </div>

        <div className="nf-hero-content">
          <div className="nf-badge">
            <span>• ERROR 404 • ROUTE NOT FOUND</span>
          </div>

          <h1 className="nf-title">
            PAGE NOT FOUND.
          </h1>

          <p className="nf-subtitle">
            The page or curriculum syllabus you are looking for might have been moved, renamed, or is temporarily unavailable at our Kollam campus portal.
          </p>

          <div className="nf-actions">
            <a href="/" className="nf-btn-primary">
              ← RETURN TO HOMEPAGE
            </a>
            <a href="/courses" className="nf-btn-secondary">
              EXPLORE IT COURSES →
            </a>
          </div>

          {/* Quick Directory Cards */}
          <div className="nf-quick-section">
            <span className="nf-quick-label">POPULAR ACADEMIC DISCIPLINES</span>
            <div className="nf-quick-grid">
              <a href="/courses" className="nf-quick-card">
                <span className="nf-card-name">Software Training</span>
                <span className="nf-card-sub">Python • Java • MERN</span>
              </a>
              <a href="/cybersecurity" className="nf-quick-card">
                <span className="nf-card-name">Cyber Security</span>
                <span className="nf-card-sub">Ethical Hacking • SOC</span>
              </a>
              <a href="/digital-marketing" className="nf-quick-card">
                <span className="nf-card-name">Digital Marketing</span>
                <span className="nf-card-sub">SEO • Meta • Ads</span>
              </a>
              <a href="/internships-kollam" className="nf-quick-card">
                <span className="nf-card-name">Internship Programs</span>
                <span className="nf-card-sub">Live Projects • Mentoring</span>
              </a>
            </div>
          </div>

          {/* Admissions Desk Assistance */}
          <div className="nf-assist-bar">
            <span>Need direct assistance?</span>
            <span>📞 Call Admissions: <a href="tel:+918089030405" className="nf-assist-link">+91 80890 30405</a></span>
            <span>📍 Chinnakada, Kollam</span>
          </div>
        </div>
      </main>
    </div>
  );
}
