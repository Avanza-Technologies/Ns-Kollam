import { useState, useEffect, useRef } from 'react';
import './NetworkzHome.css';
import { COURSE_DETAILS } from './data/courseData';

/* ── Flatten courses for the catalog grid ── */
const CAT_LABELS = {
  1: 'SOFTWARE',
  2: 'AI & ELECTRONICS',
  3: 'NETWORKING',
  4: 'BUSINESS',
  5: 'INTERNSHIP',
};

const ALL_COURSES = Object.entries(COURSE_DETAILS)
  .filter(([id]) => parseInt(id) <= 5)
  .flatMap(([id, data]) =>
    data.courses.map((c) => ({
      ...c,
      category: CAT_LABELS[parseInt(id)],
      accent: data.accent,
      chapId: parseInt(id),
    }))
  );

const TABS = ['NETWORKING', 'SOFTWARE', 'AI & ELECTRONICS', 'BUSINESS', 'INTERNSHIP', 'ALL'];

/* ── Thumbnail gradient per chapter ── */
const THUMB = {
  1: 'linear-gradient(135deg,#0d1f35 0%,#071020 100%)',
  2: 'linear-gradient(135deg,#1a0d30 0%,#0c0618 100%)',
  3: 'linear-gradient(135deg,#0d2520 0%,#061410 100%)',
  4: 'linear-gradient(135deg,#2a1d08 0%,#140e04 100%)',
  5: 'linear-gradient(135deg,#0d1820 0%,#060c10 100%)',
};

/* ── Category icon characters ── */
const ICON = { 1: '<>', 2: 'AI', 3: '///', 4: '$$', 5: '✦' };

/* ── Stat data ── */
const STATS = [
  { value: '15+',  label: 'Programs',   ring: 1 },
  { value: '3',    label: 'States',     ring: 0.3 },
  { value: 'ISO',  label: '9001:2015',  ring: 1 },
  { value: '100%', label: 'Placement',  ring: 1 },
];

/* ─────────────────────────────────────────────────────────
   STAT RING COMPONENT
───────────────────────────────────────────────────────── */
function StatRing({ value, label, fill }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <div className="nz-stat">
      <div className="nz-stat-visual">
        <svg viewBox="0 0 80 80" className="nz-stat-svg">
          <circle cx="40" cy="40" r={r} className="nz-stat-track" />
          <circle
            cx="40" cy="40" r={r}
            className="nz-stat-ring"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - fill)}
          />
        </svg>
        <span className="nz-stat-value">{value}</span>
      </div>
      <span className="nz-stat-label">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COURSE CARD COMPONENT
───────────────────────────────────────────────────────── */
function CourseCard({ course, onSelect }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="nz-course-card" style={{ cursor: 'pointer' }} onClick={() => onSelect && onSelect(course)}>
      {/* Thumbnail with image & fallback */}
      <div className="nz-card-thumb" style={{ background: THUMB[course.chapId] }}>
        {course.image && !imgError ? (
          <img
            src={course.image}
            alt={course.name}
            className="nz-card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="nz-card-thumb-grid" />
        )}
        <div className="nz-card-thumb-overlay" />
        <span className="nz-card-badge">{course.category}</span>
      </div>

      {/* Body */}
      <div className="nz-card-body">
        <div className="nz-card-meta-row">
          <span className="nz-card-level" style={{ color: course.accent, borderColor: `${course.accent}40` }}>
            {course.level}
          </span>
          <span className="nz-card-dur">{course.duration}</span>
        </div>

        <h3 className="nz-card-title">{course.name}</h3>
        <p className="nz-card-desc">{course.desc}</p>

        <div className="nz-card-foot">
          <span className="nz-card-cert">{course.cert}</span>
          <button className="nz-card-btn" onClick={(e) => { e.stopPropagation(); onSelect && onSelect(course); }}>
            ENROLL NOW
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LUXURY VISION & PILLAR CARD
───────────────────────────────────────────────────────── */
function PillarCard({ title, tag, desc, highlight, stat, icon, gradient }) {
  return (
    <div className="nz-pillar-card" style={{ '--card-grad': gradient }}>
      <div className="nz-pillar-head">
        <span className="nz-pillar-icon">{icon}</span>
        <span className="nz-pillar-tag">{tag}</span>
      </div>
      <div className="nz-pillar-stat">{stat}</div>
      <h3 className="nz-pillar-title">{title}</h3>
      <p className="nz-pillar-desc">{desc}</p>
      <div className="nz-pillar-foot">
        <span className="nz-pillar-pill">{highlight}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CONTACT / ADVISOR INQUIRY FORM
───────────────────────────────────────────────────────── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', program: 'Software' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="nz-form-card">
      <div className="nz-form-header">
        <span className="nz-form-tag">KOLLAM ADMISSION DESK</span>
        <h3 className="nz-form-title">REQUEST A CALLBACK</h3>
        <p className="nz-form-sub">
          Fill in your details and our Kollam career advisor will call you with program syllabus & placement details.
        </p>
      </div>

      {submitted ? (
        <div className="nz-form-success">
          <div className="nz-success-icon">✓</div>
          <h4 className="nz-success-title">INQUIRY RECEIVED</h4>
          <p className="nz-success-text">
            Thank you <strong>{formData.name}</strong>! Our Kollam admission officer will call you at <strong>{formData.phone}</strong> shortly.
          </p>
          <button className="nz-btn-ghost nz-btn-sm" onClick={() => setSubmitted(false)}>
            SEND ANOTHER REQUEST
          </button>
        </div>
      ) : (
        <form className="nz-form-body" onSubmit={handleSubmit}>
          <div className="nz-form-group">
            <label className="nz-form-label">YOUR FULL NAME</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Nair"
              className="nz-form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="nz-form-group">
            <label className="nz-form-label">PHONE / WHATSAPP NUMBER</label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              className="nz-form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="nz-form-group">
            <label className="nz-form-label">PROGRAM OF INTEREST</label>
            <select
              className="nz-form-select"
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
            >
              <option value="Software">Software Product Training (Full Stack, C++, Data Science)</option>
              <option value="AI">AI & Electronics (Machine Learning, Deep Learning, Robotics)</option>
              <option value="Networking">Networking & Security (CCNA, CompTIA, AWS, Cyber)</option>
              <option value="Business">Business & Management (Digital Marketing, MS Office)</option>
              <option value="Internship">Internship Programs (120 Hours to 1 Year)</option>
            </select>
          </div>

          <button type="submit" className="nz-btn-primary nz-form-submit">
            TALK TO ADVISOR →
          </button>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   OFFICIAL NETWORKZ SYSTEMS BRAND LOGO COMPONENT
───────────────────────────────────────────────────────── */
function NetworkzOfficialLogo() {
  return (
    <div className="nz-official-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
      {/* Brand Text Column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '19px',
          fontWeight: 900,
          color: '#e30613',
          letterSpacing: '0.03em',
          lineHeight: 0.92,
          textTransform: 'uppercase'
        }}>
          NETWORKZ
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '18px',
          fontWeight: 900,
          color: '#e30613',
          letterSpacing: '0.14em',
          lineHeight: 1,
          textTransform: 'uppercase',
          marginTop: '1px'
        }}>
          SYSTEMS
        </div>
        <div style={{
          height: '2px',
          background: '#e30613',
          margin: '3px 0 2px 0',
          width: '100%'
        }} />
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '7px',
          fontWeight: 800,
          color: '#000000',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          AN ISO 9001 : 2015 CERTIFIED COMPANY
        </div>
      </div>

      {/* Emblem Wrap with Registered Mark */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          top: '-7px',
          right: '-5px',
          fontSize: '9px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          lineHeight: 1
        }}>®</span>

        {/* Yellow Square Emblem */}
        <div style={{
          width: '42px',
          height: '42px',
          background: '#f9a01b',
          borderRadius: '7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(249, 160, 27, 0.35)'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15.2" cy="4" r="1.4" fill="#ffffff" stroke="none" />
            <path d="M11.5 16.5 L 16 9.5 L 20 4.5" />
            <path d="M14.5 11 L 11 13 L 13 9.5" />
            <path d="M 19.8 4.2 C 19.8 4.2 21 3 21 2 C 20 2.2 19 3.2 19.8 4.2 Z" fill="#ffffff" stroke="none" />
            <path d="M 15 13 L 9.5 20.5" />
            <path d="M 12 16.5 L 15 17 L 18 20.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const ROLE_OPTIONS = [
  {
    id: 'Student (Study)',
    label: 'Student (Study)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'Job Seeker (Job)',
    label: 'Job Seeker (Job)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'Working Professional (Employee)',
    label: 'Working Professional (Employee)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    id: 'Other',
    label: 'Other',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

function CustomRoleSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedObj = ROLE_OPTIONS.find((o) => o.id === value) || ROLE_OPTIONS[0];

  return (
    <div className="nz-custom-select-wrap">
      <div
        className={`nz-custom-select-trigger ${isOpen ? 'nz-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="nz-select-val-text">
          <span className="nz-select-option-icon">{selectedObj.icon}</span>
          {selectedObj.label}
        </span>
        <svg
          className={`nz-select-chevron ${isOpen ? 'nz-rotate' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {isOpen && (
        <div className="nz-custom-select-dropdown">
          {ROLE_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className={`nz-custom-select-item ${value === opt.id ? 'nz-active' : ''}`}
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
            >
              <span className="nz-select-item-text">
                <span className="nz-select-option-icon">{opt.icon}</span>
                {opt.label}
              </span>
              {value === opt.id && <span className="nz-select-check">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   25TH ANNIVERSARY 10% OFFER POPUP MODAL
───────────────────────────────────────────────────────── */
function OfferModal({ course, onClose }) {
  const [formData, setFormData] = useState({ name: '', phone: '', role: 'Student (Study)' });
  const [claimed, setClaimed] = useState(false);

  if (!course) return null;

  const courseTitle = course.name || course.title || course.dur || 'Selected Program';

  const handleSubmit = (e) => {
    e.preventDefault();
    setClaimed(true);
  };

  return (
    <div className="nz-modal-overlay" onClick={onClose}>
      <div className="nz-modal-vertical-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Dark Header (Logo Name style) */}
        <div className="nz-vcard-header">
          <button className="nz-vcard-close" onClick={onClose} aria-label="Close modal">✕</button>
          
          <div className="nz-vcard-logo-emblem">
            <span className="nz-vcard-logo-text">NETWORKZ SYSTEMS</span>
          </div>
        </div>

        {/* Vibrant Red Facet Geometric Banner */}
        <div className="nz-vcard-ribbon">
          <div className="nz-ribbon-shimmer" />
          <div className="nz-ribbon-content">
            <span className="nz-ribbon-offer-text">🎉 25TH ANNIVERSARY CELEBRATION 🎉</span>
          </div>
        </div>

        {/* Middle Details & Form Body */}
        <div className="nz-vcard-body">
          <div className="nz-vcard-person-head">
            <h3 className="nz-vcard-name">
              <strong>YOU GOT 10%</strong> <span>OFFER PRICE NOW!</span>
            </h3>
            <p className="nz-vcard-role">
              For the 25th Anniversary Celebration, please fill the below form for getting offer ({courseTitle}).
            </p>
            <div className="nz-vcard-line" />
          </div>

          {claimed ? (
            <div className="nz-vcard-success">
              <div className="nz-vcard-qr-box">
                <div className="nz-qr-inner">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="#121216">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm1 1h2v2H5V5zm9-3h8v8h-8V2zm2 2v4h4V4h-4zm1 1h2v2h-2V5zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm1 1h2v2H5v-2zm13.5-2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                  </svg>
                </div>
                <span className="nz-qr-label">VOUCHER: NS25-OFFER10</span>
              </div>
              <h4 className="nz-vcard-claimed-title">OFFER CLAIMED!</h4>
              <p className="nz-vcard-claimed-sub">
                Congratulations <strong>{formData.name}</strong> ({formData.role})! You have unlocked 10% discount for <strong>{courseTitle}</strong>.
              </p>
              <button className="nz-vcard-btn" onClick={onClose}>DONE & CLOSE</button>
            </div>
          ) : (
            <form className="nz-vcard-form" onSubmit={handleSubmit}>
              
              <div className="nz-vcard-field">
                <span className="nz-vcard-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <div className="nz-vcard-input-box">
                  <label className="nz-vcard-lbl">NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="nz-vcard-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="nz-vcard-field">
                <span className="nz-vcard-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="nz-vcard-input-box">
                  <label className="nz-vcard-lbl">NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your mobile number"
                    className="nz-vcard-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="nz-vcard-field">
                <span className="nz-vcard-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <div className="nz-vcard-input-box">
                  <label className="nz-vcard-lbl">CURRENT ROLE (STUDY / JOB) *</label>
                  <CustomRoleSelect
                    value={formData.role}
                    onChange={(val) => setFormData({ ...formData, role: val })}
                  />
                </div>
              </div>

              <button type="submit" className="nz-vcard-btn">
                GET 10% OFFER NOW 🎉 →
              </button>
            </form>
          )}

          <div className="nz-vcard-footer-note">
            NETWORKZ SYSTEMS · 25TH ANNIVERSARY SPECIAL
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function NetworkzHome() {
  const [tab, setTab] = useState('NETWORKING');
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    document.body.style.background = '#1c2536';
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.body.style.background = '';
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const filtered = tab === 'ALL'
    ? ALL_COURSES
    : ALL_COURSES.filter((c) => c.category === tab);

  return (
    <div className="nz-root">

      {/* ════════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════════ */}
      <header className={`nz-nav${scrolled ? ' nz-nav--scrolled' : ''}`}>
        <nav className="nz-nav-links" aria-label="Main navigation">
          <a href="#programs">Programs</a>
          <a href="#catalog">Catalog</a>
          <a href="#internship">Internship</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nz-nav-right">
          <a href="/exam" className="nz-nav-portal">STUDENT PORTAL →</a>
        </div>
      </header>

      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="nz-hero" id="programs">
        {/* Background art */}
        <div className="nz-hero-bg">
          <div className="nz-hero-glow" />
          <div className="nz-hero-grid" />
        </div>

        <div className="nz-hero-content">
          <p className="nz-hero-eyebrow">
            <span className="nz-dot" />
            AN ISO 9001:2015 CERTIFIED COMPANY — KERALA · TAMIL NADU · KARNATAKA
          </p>
          <h1 className="nz-hero-headline">
            SUCCESS BEGINS<br />
            <em>WITH LEARNING</em><br />
            TODAY.
          </h1>
          <p className="nz-hero-sub">
            India's premier technology training institute offering industry-aligned programs
            in Software, AI, Networking, and Business — with 100% placement support.
          </p>
          <div className="nz-hero-actions">
            <a href="#catalog" className="nz-btn-primary">EXPLORE PROGRAMS</a>
            <a href="#contact"  className="nz-btn-ghost">TALK TO AN ADVISOR</a>
          </div>
        </div>

        {/* Hero Feature Showcase Box */}
        <div className="nz-hero-showcase">
          <div className="nz-showcase-card">
            {/* Showcase Background & Overlay */}
            <div className="nz-showcase-bg">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                alt="Indian Tech Students at Networkz Academy"
                className="nz-showcase-img"
              />
              <div className="nz-showcase-overlay" />
            </div>

            <div className="nz-showcase-body">
              <div className="nz-showcase-header">
                <span className="nz-showcase-tag">WELCOME TO NETWORKZ ACADEMY PORTAL</span>
                <h2 className="nz-showcase-title">LEARNING JUST GOT A LUXURY UPGRADE.</h2>
              </div>

              {/* Integrated Stat Rings Grid */}
              <div className="nz-hero-stats">
                <StatRing value="15+" label="Programs"  fill={1}   />
                <StatRing value="3"   label="States"    fill={0.33} />
                <StatRing value="ISO" label="9001:2015" fill={1}   />
                <StatRing value="100%" label="Placement" fill={1}  />
              </div>
            </div>

            {/* Showcase Footer Ticker */}
            <div className="nz-showcase-foot">
              <span className="nz-showcase-chip">PEARSON VUE AUTHORIZED</span>
              <span className="nz-showcase-chip">NSIM CERTIFIED PARTNER</span>
              <span className="nz-showcase-chip">100% PLACEMENT CELL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COURSE CATALOG
          ════════════════════════════════════════ */}
      <section className="nz-catalog" id="catalog">
        <div className="nz-catalog-header">
          <div>
            <h2 className="nz-section-title">COURSE CATALOG</h2>
            <p className="nz-section-sub">
              {ALL_COURSES.length} programs across 5 disciplines
            </p>
          </div>
          <div className="nz-tab-row" role="tablist" aria-label="Course categories">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className={`nz-tab${tab === t ? ' nz-tab--active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="nz-course-grid">
          {filtered.map((c) => (
            <CourseCard key={`${c.chapId}-${c.id}`} course={c} onSelect={setSelectedCourse} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          INTERNSHIP
          ════════════════════════════════════════ */}
      <section className="nz-internship" id="internship">
        <div className="nz-internship-inner">
          <div className="nz-internship-copy">
            <p className="nz-section-eyebrow">GET HANDS-ON EXPERIENCE</p>
            <h2 className="nz-section-title">INTERNSHIP<br />PROGRAMS</h2>
            <p className="nz-section-sub">
              From 120-hour sprints to full-year professional programs — real project
              experience with mentoring, portfolio building, and 100% placement support.
            </p>
          </div>
          <div className="nz-internship-tiers">
            {[
              { dur: '120 HRS', tag: 'SHORT SPRINT', desc: 'Intensive real-project exposure. Perfect for college internship requirements.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
              { dur: '3 MONTHS', tag: 'STANDARD', desc: 'Structured program with weekly mentoring and portfolio deliverables.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
              { dur: '6 MONTHS', tag: 'PROFESSIONAL', desc: 'Deep-dive specialization with client-grade project experience and placement.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
              { dur: '1 YEAR', tag: 'FLAGSHIP', desc: 'Full professional training + internship + placement guarantee program.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80' },
            ].map((tier) => (
              <div
                key={tier.dur}
                className="nz-tier-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCourse({ name: `Internship Program (${tier.dur} - ${tier.tag})`, category: 'INTERNSHIP' })}
              >
                <div className="nz-tier-img-wrap">
                  <img src={tier.img} alt={`Kerala Tech Students ${tier.dur}`} className="nz-tier-img" loading="lazy" />
                  <div className="nz-tier-overlay" />
                  <div className="nz-tier-badge">{tier.tag}</div>
                </div>
                <div className="nz-tier-body">
                  <div className="nz-tier-dur">{tier.dur}</div>
                  <p className="nz-tier-desc">{tier.desc}</p>
                  <button className="nz-btn-primary nz-btn-sm">APPLY NOW</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY CHOOSE NETWORKZ SYSTEMS — LUXURY SHOWCASE
          ════════════════════════════════════════ */}
      <section className="nz-credentials" id="about">
        <div className="nz-credentials-inner">
          
          <div className="nz-section-header-center">
            <p className="nz-section-eyebrow nz-center">ACCREDITATION & CAREER PROMISE</p>
            <h2 className="nz-section-title nz-center">WHY CHOOSE NETWORKZ SYSTEMS</h2>
            <p className="nz-section-sub nz-center" style={{ maxWidth: 640, margin: '0.8rem auto 3.5rem' }}>
              Internationally accredited, government-certified, and industry-connected
              — South India's most trusted technology training partner.
            </p>
          </div>

          {/* Asymmetric Vision + Pillars Showcase */}
          <div className="nz-asym-showcase">
            
            {/* Left: Vision & Mission Panel */}
            <div className="nz-vision-card">
              <div className="nz-vision-bg-glow" />
              <div className="nz-vision-quote-mark">“</div>
              <span className="nz-vision-tag">OUR VISION & MISSION</span>
              <h3 className="nz-vision-title">
                EMPOWERING SOUTH INDIA’S NEXT GENERATION OF TECH LEADERS.
              </h3>
              <p className="nz-vision-text">
                To bridge the gap between academic learning and real-world tech engineering.
                We empower every student across Kerala, Tamil Nadu, and Karnataka with world-class labs,
                certified global credentials, and lifelong technical mentorship.
              </p>
              <div className="nz-vision-pills">
                <span>ISO 9001:2015</span>
                <span>PEARSON VUE</span>
                <span>NSIM PARTNER</span>
              </div>
            </div>

            {/* Right: 4 Foundation Pillar Cards (2x2 Grid) */}
            <div className="nz-pillar-grid-2x2">
              <div className="nz-pillar-tile nz-tile-gold">
                <div className="nz-tile-orb" />
                <div className="nz-tile-head">
                  <span className="nz-tile-stat">200+</span>
                  <span className="nz-tile-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                </div>
                <h4 className="nz-tile-title">100% PLACEMENT ASSISTANCE</h4>
                <p className="nz-tile-desc">
                  Active hiring tie-ups with 200+ top IT recruiters across South India. Mock technical interviews & direct placement drives.
                </p>
                <div className="nz-tile-foot-row">
                  <span className="nz-tile-pill">CAREER PROMISE</span>
                  <span className="nz-tile-live-dot"><span className="nz-pulse-dot" /> ACTIVE NETWORK</span>
                </div>
              </div>

              <div className="nz-pillar-tile nz-tile-blue">
                <div className="nz-tile-orb" />
                <div className="nz-tile-head">
                  <span className="nz-tile-stat">∞</span>
                  <span className="nz-tile-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.178 8c5.096 0 5.096 8 0 8-2.613 0-4.887-2.112-6.178-4.004C10.708 13.888 8.434 16 5.822 16c-5.096 0-5.096-8 0-8 2.613 0 4.887 2.112 6.178 4.004C13.292 10.112 15.566 8 18.178 8z" />
                    </svg>
                  </span>
                </div>
                <h4 className="nz-tile-title">LIFELONG LAB & TRAINING SUPPORT</h4>
                <p className="nz-tile-desc">
                  Permanent access to Networkz technical labs, updated course wares, e-workbooks, and ongoing guidance long after graduation.
                </p>
                <div className="nz-tile-foot-row">
                  <span className="nz-tile-pill">LIFELONG ACCESS</span>
                  <span className="nz-tile-live-dot"><span className="nz-pulse-dot" /> ALWAYS UNLOCKED</span>
                </div>
              </div>

              <div className="nz-pillar-tile nz-tile-purple">
                <div className="nz-tile-orb" />
                <div className="nz-tile-head">
                  <span className="nz-tile-stat">CPD</span>
                  <span className="nz-tile-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </span>
                </div>
                <h4 className="nz-tile-title">SKILL DEVELOPMENT PROGRAMME</h4>
                <p className="nz-tile-desc">
                  End-to-end industry-specific curriculum, CPD certified technical trainers, soft skills development, and Pearson VUE exam prep.
                </p>
                <div className="nz-tile-foot-row">
                  <span className="nz-tile-pill">CERTIFIED TRAINERS</span>
                  <span className="nz-tile-live-dot"><span className="nz-pulse-dot" /> VERIFIED CREDENTIALS</span>
                </div>
              </div>

              <div className="nz-pillar-tile nz-tile-emerald">
                <div className="nz-tile-orb" />
                <div className="nz-tile-head">
                  <span className="nz-tile-stat">100%</span>
                  <span className="nz-tile-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </span>
                </div>
                <h4 className="nz-tile-title">INDUSTRIAL HANDS-ON TRAINING</h4>
                <p className="nz-tile-desc">
                  Real-world client project exposure, live server lab practice, e-workbook exercises, and final-year academic project support.
                </p>
                <div className="nz-tile-foot-row">
                  <span className="nz-tile-pill">PRACTICAL LABS</span>
                  <span className="nz-tile-live-dot"><span className="nz-pulse-dot" /> LIVE LABS ACTIVE</span>
                </div>
              </div>
            </div>

          </div>

          {/* 8 Core Benefits Grid — Modern Matrix */}
          <div className="nz-matrix-box">
            <h3 className="nz-matrix-title">EVERYTHING INCLUDED IN YOUR TRAINING</h3>
            <div className="nz-matrix-grid">
              {[
                { num: '01', title: 'Industry-Specific Skills', desc: 'Start-to-end curriculum aligned with top IT hiring managers' },
                { num: '02', title: 'Certified Course Wares', desc: 'Official training course wares & reference materials' },
                { num: '03', title: 'E-Workbook Lab Practice', desc: 'Guided e-workbooks for hands-on practical lab exercises' },
                { num: '04', title: 'Placement Support', desc: 'Dedicated career cell, job alerts & placement drives' },
                { num: '05', title: 'Academic Project Assistance', desc: 'Expert guidance & lab support for college projects' },
                { num: '06', title: 'CPD Certified Trainers', desc: 'Instruction by experienced certified technical experts' },
                { num: '07', title: 'Pearson VUE Testing Centre', desc: 'Authorized center for Cisco, AWS, Azure & CompTIA exams' },
                { num: '08', title: 'Lifelong Tech Support', desc: 'Continued lab access and technical mentorship' },
              ].map((item) => (
                <div key={item.num} className="nz-matrix-item">
                  <span className="nz-matrix-num">{item.num}</span>
                  <div>
                    <div className="nz-matrix-name">{item.title}</div>
                    <div className="nz-matrix-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT US — KOLLAM HEADQUARTERS HUB
          ════════════════════════════════════════ */}
      <section className="nz-locations" id="contact">
        <div className="nz-locations-inner">
          <div className="nz-location-header">
            <p className="nz-section-eyebrow">HEADQUARTERS & MAIN CAMPUS — KOLLAM, KERALA</p>
            <h2 className="nz-section-title">CONTACT US</h2>
            <p className="nz-section-sub">
              Connect directly with our Kollam campus team for program inquiries, syllabus details, and admissions.
            </p>
          </div>

          <div className="nz-kollam-hub-grid">
            
            {/* Left: Kollam Campus Details Card */}
            <div className="nz-kollam-card">
              <div className="nz-kollam-banner">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Networkz Systems Kollam Campus"
                  className="nz-kollam-banner-img"
                  loading="lazy"
                />
                <div className="nz-kollam-banner-overlay" />
                <span className="nz-kollam-badge">MAIN CAMPUS · KERALA</span>
              </div>

              <div className="nz-kollam-content">
                <h3 className="nz-kollam-title">Networkz Systems Kollam</h3>
                <p className="nz-kollam-subtitle">ISO 9001:2015 Certified · Pearson VUE Authorized Exam Centre</p>

                <div className="nz-kollam-info-list">
                  <div className="nz-kollam-info-item">
                    <span className="nz-kollam-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div>
                      <div className="nz-kollam-info-label">CAMPUS ADDRESS</div>
                      <div className="nz-kollam-info-val">
                        2nd Floor, Pattathuvila Plaza, Vadayattukotta Rd, Chinnakada, Kollam, Kerala 691001
                      </div>
                    </div>
                  </div>

                  <div className="nz-kollam-info-item">
                    <span className="nz-kollam-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <div className="nz-kollam-info-label">ADMISSION HOTLINE</div>
                      <a href="tel:08089030405" className="nz-kollam-info-val nz-gold-link">
                        +91 80890 30405
                      </a>
                    </div>
                  </div>

                  <div className="nz-kollam-info-item">
                    <span className="nz-kollam-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div>
                      <div className="nz-kollam-info-label">EMAIL INQUIRIES</div>
                      <a href="mailto:support@nskollam.com" className="nz-kollam-info-val nz-gold-link">
                        support@nskollam.com
                      </a>
                    </div>
                  </div>

                  <div className="nz-kollam-info-item">
                    <span className="nz-kollam-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <div className="nz-kollam-info-label">WORKING HOURS</div>
                      <div className="nz-kollam-info-val">Monday – Saturday: 9:00 AM – 6:30 PM</div>
                    </div>
                  </div>
                </div>

                <div className="nz-kollam-actions">
                  <a href="tel:08089030405" className="nz-btn-primary">CALL NOW: 080890 30405</a>
                  <a
                    href="https://maps.google.com/?q=Networkz+Systems+Kollam+Chinnakada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-btn-ghost"
                  >
                    GET DIRECTIONS ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Advisor Inquiry Form */}
            <ContactForm />

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer className="nz-footer">
        <div className="nz-footer-inner">
          <div className="nz-footer-copy">
            © 2025 Networkz Systems · ISO 9001:2015 · Pearson VUE Authorized · NSIM Certified
          </div>
        </div>
      </footer>

      {/* 25TH ANNIVERSARY OFFER POPUP MODAL */}
      <OfferModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />

    </div>
  );
}
