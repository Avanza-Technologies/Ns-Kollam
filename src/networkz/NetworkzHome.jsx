import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  .filter(([id]) => parseInt(id, 10) <= 5)
  .flatMap(([id, data]) =>
    data.courses.map((c) => ({
      ...c,
      category: CAT_LABELS[parseInt(id, 10)],
      accent: data.accent,
      chapId: parseInt(id, 10),
    }))
  );

const TABS = ['NETWORKING', 'SOFTWARE', 'AI & ELECTRONICS', 'BUSINESS', 'INTERNSHIP', 'ALL'];

const TAB_ICONS = {
  'NETWORKING': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  'SOFTWARE': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'AI & ELECTRONICS': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
    </svg>
  ),
  'BUSINESS': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'INTERNSHIP': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  'ALL': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

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
  { value: '15+', label: 'Programs', ring: 1 },
  { value: '3', label: 'States', ring: 0.3 },
  { value: 'ISO', label: '9001:2015', ring: 1 },
  { value: '100%', label: 'Placement', ring: 1 },
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

const WHATSAPP_PHONE = '918089030405';

const getWhatsAppUrl = (customMsg) => {
  const defaultMsg = [
    'NETWORKZ SYSTEMS KOLLAM',
    '══════════════════════',
    'Admissions Inquiry',
    '══════════════════════',
    '',
    'Hello Admissions Desk! I would like to inquire about your courses, fee structure, and batch schedules.',
    '',
    'Campus: Chinnakada, Kollam'
  ].join('\n');
  const msg = customMsg || defaultMsg;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

const createOfferWhatsAppMessage = (name, phone, role, courseTitle) => {
  return [
    'NETWORKZ SYSTEMS KOLLAM',
    '══════════════════════',
    '25TH ANNIVERSARY 10% OFFER CLAIM',
    '══════════════════════',
    '',
    `Candidate Name : ${name || 'N/A'}`,
    `Phone Number : ${phone || 'N/A'}`,
    `Current Status : ${role || 'N/A'}`,
    `Selected Course : ${courseTitle}`,
    '',
    'Discount Voucher : NS25-OFFER10 (10% OFF)',
    'Campus Location : Chinnakada, Kollam',
    '',
    '══════════════════════',
    'Hello Admissions Team! Please verify my 10% discount voucher and send enrollment details. Thank you!'
  ].join('\n');
};

const createCallbackWhatsAppMessage = (name, phone, program) => {
  return [
    'NETWORKZ SYSTEMS KOLLAM',
    '══════════════════════',
    'ADMISSION CALLBACK REQUEST',
    '══════════════════════',
    '',
    `Candidate Name : ${name || 'N/A'}`,
    `Phone Number : ${phone || 'N/A'}`,
    `Program Interest : ${program}`,
    '',
    'Campus Location : Chinnakada, Kollam',
    '',
    '══════════════════════',
    'Hello Admissions Team! Please call me with program syllabus, fee details, and batch timings. Thank you!'
  ].join('\n');
};

const IT_WATERMARKS = {
  NETWORKING: (
    <svg className="nz-card-it-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <path d="M20 20h20v20H20zM60 20h20v20H60zM40 60h20v20H40z" strokeWidth="1.5" />
      <path d="M30 40v10h40V40M50 50v10" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="30" cy="45" r="2" fill="currentColor" />
      <circle cx="70" cy="45" r="2" fill="currentColor" />
    </svg>
  ),
  SOFTWARE: (
    <svg className="nz-card-it-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <path d="M25 35L10 50l15 15M75 35l15 15-15 15M55 25L45 75" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'AI & ELECTRONICS': (
    <svg className="nz-card-it-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <rect x="25" y="25" width="50" height="50" rx="6" strokeWidth="1.5" />
      <rect x="40" y="40" width="20" height="20" rx="2" strokeWidth="1.5" />
      <path d="M35 15v10M50 15v10M65 15v10M35 75v10M50 75v10M65 75v10M15 35h10M15 50h10M15 65h10M75 35h10M75 50h10M75 65h10" strokeWidth="1.5" />
    </svg>
  ),
  BUSINESS: (
    <svg className="nz-card-it-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <rect x="15" y="20" width="70" height="60" rx="4" strokeWidth="1.5" />
      <path d="M25 65L45 45l15 15 25-25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="85" cy="35" r="3" fill="currentColor" />
    </svg>
  ),
  INTERNSHIP: (
    <svg className="nz-card-it-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <path d="M50 15L15 35l35 20 35-20z" strokeWidth="1.5" />
      <path d="M25 42v25c0 10 25 18 25 18s25-8 25-18V42" strokeWidth="1.5" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────
   COURSE CARD COMPONENT
───────────────────────────────────────────────────────── */
function CourseCard({ course, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const watermark = IT_WATERMARKS[course.category] || IT_WATERMARKS.NETWORKING;

  return (
    <div
      className="nz-course-card"
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(course)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(course);
        }
      }}
    >

      {/* High-Tech IT Watermark Overlay */}
      {watermark}

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

        {/* IT Live Status Tag */}
        <span className="nz-card-tech-live-tag">
          <span className="nz-pulse-dot" /> LIVE LAB
        </span>
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

const PROGRAM_OPTIONS = [
  {
    id: 'Software Product Training (Full Stack, C++, Data Science)',
    label: 'Software Product Training (Full Stack, C++, Data Science)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'AI & Electronics (Machine Learning, Deep Learning, Robotics)',
    label: 'AI & Electronics (Machine Learning, Deep Learning, Robotics)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
      </svg>
    ),
  },
  {
    id: 'Networking & Security (CCNA, CompTIA, AWS, Cyber)',
    label: 'Networking & Security (CCNA, CompTIA, AWS, Cyber)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'Business & Management (Digital Marketing, MS Office)',
    label: 'Business & Management (Digital Marketing, MS Office)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'Internship Programs (120 Hours to 1 Year)',
    label: 'Internship Programs (120 Hours to 1 Year)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

function CustomProgramSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedObj = PROGRAM_OPTIONS.find((o) => o.id === value) || PROGRAM_OPTIONS[0];

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
          stroke="#00a8c6"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {isOpen && (
        <div className="nz-custom-select-dropdown">
          {PROGRAM_OPTIONS.map((opt) => (
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
   CONTACT / ADVISOR INQUIRY FORM
───────────────────────────────────────────────────────── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'Software Product Training (Full Stack, C++, Data Science)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
      const waUrl = getWhatsAppUrl(createCallbackWhatsAppMessage(formData.name, formData.phone, formData.program));
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getSuccessWaUrl = () => {
    return getWhatsAppUrl(createCallbackWhatsAppMessage(formData.name, formData.phone, formData.program));
  };

  return (
    <div className="nz-form-card">
      <div className="nz-form-header">
        <span className="nz-form-tag">KOLLAM ADMISSION DESK</span>
        <h3 className="nz-form-title">Request a Callback</h3>
        <div className="nz-contact-accent-line" />
        <p className="nz-form-sub">
          Connect with our campus team for course details, syllabus, fees and admissions.
        </p>
      </div>

      {submitted ? (
        <div className="nz-form-success">
          <div className="nz-success-icon">✓</div>
          <h4 className="nz-success-title">INQUIRY SENT TO HELP DESK</h4>
          <p className="nz-success-text">
            Thank you <strong>{formData.name}</strong>! Your inquiry details have been forwarded to our Kollam admission desk.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.6rem' }}>
            <a
              href={getSuccessWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="nz-btn-primary nz-btn-sm"
              style={{ textDecoration: 'none' }}
            >
              RESEND ON WHATSAPP 💬
            </a>
            <button className="nz-btn-ghost nz-btn-sm" onClick={() => setSubmitted(false)}>
              SEND ANOTHER
            </button>
          </div>
        </div>
      ) : (
        <form className="nz-vcard-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

          <div className="nz-vcard-field">
            <span className="nz-vcard-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <div className="nz-vcard-input-box">
              <label className="nz-vcard-lbl">YOUR FULL NAME *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Nair"
                className="nz-vcard-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="nz-vcard-field">
            <span className="nz-vcard-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div className="nz-vcard-input-box">
              <label className="nz-vcard-lbl">PHONE / WHATSAPP NUMBER *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                className="nz-vcard-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="nz-vcard-field">
            <span className="nz-vcard-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <div className="nz-vcard-input-box">
              <label className="nz-vcard-lbl">PROGRAM OF INTEREST *</label>
              <CustomProgramSelect
                value={formData.program}
                onChange={(val) => setFormData({ ...formData, program: val })}
              />
            </div>
          </div>

          <button type="submit" className="nz-vcard-btn" style={{ marginTop: '0.4rem' }}>
            TALK TO ADVISOR <span style={{ fontSize: '1.1rem', marginLeft: '0.2rem' }}>↗</span>
          </button>

          <div className="nz-security-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Your information is safe with us.</span>
          </div>

          {/* Bottom 3 Trust Columns */}
          <div className="nz-contact-trust-bar">
            <div className="nz-contact-trust-item">
              <div className="nz-trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="nz-trust-title">Quick Response</div>
                <div className="nz-trust-sub">Within 15 mins</div>
              </div>
            </div>

            <div className="nz-contact-trust-item">
              <div className="nz-trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div>
                <div className="nz-trust-title">Expert Advisors</div>
                <div className="nz-trust-sub">We're here to help</div>
              </div>
            </div>

            <div className="nz-contact-trust-item">
              <div className="nz-trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <div className="nz-trust-title">100% Secure</div>
                <div className="nz-trust-sub">Privacy Protected</div>
              </div>
            </div>
          </div>

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
    const msg = createOfferWhatsAppMessage(formData.name, formData.phone, formData.role, courseTitle);
    const waUrl = getWhatsAppUrl(msg);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const getWaOfferUrl = () => {
    const msg = createOfferWhatsAppMessage(formData.name, formData.phone, formData.role, courseTitle);
    return getWhatsAppUrl(msg);
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
              <h4 className="nz-vcard-claimed-title">OFFER DISPATCHED TO WHATSAPP!</h4>
              <p className="nz-vcard-claimed-sub">
                Congratulations <strong>{formData.name}</strong> ({formData.role})! Your 10% discount claim for <strong>{courseTitle}</strong> has been opened on WhatsApp.
              </p>
              <a
                href={getWaOfferUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="nz-vcard-btn-wa"
              >
                RE-OPEN WHATSAPP 💬 →
              </a>
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
   OUR HIRING PARTNERS — INFINITE RUNNING MARQUEE BANNER
───────────────────────────────────────────────────────── */
function HiringPartnersBanner() {
  const partners = [
    {
      id: 'akhira',
      name: 'Akhira Services',
      logo: (
        <svg viewBox="0 0 140 40" width="120" height="34">
          <path d="M10 28 L18 10 L26 28 L22 28 L18 17 L14 28 Z" fill="#e30613" />
          <path d="M14 22 L22 22" stroke="#1c2536" strokeWidth="2" />
          <text x="32" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="13.5" fill="#1c2536">Akhira</text>
          <text x="32" y="32" fontFamily="'Sora', sans-serif" fontWeight="600" fontSize="6.5" fill="#64748b" letterSpacing="0.12em">SERVICES</text>
        </svg>
      )
    },
    {
      id: 'alpha',
      name: 'Alpha Technologies Group Inc.',
      logo: (
        <svg viewBox="0 0 160 40" width="130" height="34">
          <circle cx="16" cy="20" r="10" fill="none" stroke="#00839c" strokeWidth="2.5" />
          <path d="M10 20 L22 20 M16 10 L16 30" stroke="#00839c" strokeWidth="1.5" />
          <text x="32" y="21" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="11" fill="#0f172a">ALPHA</text>
          <text x="32" y="30" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="6.5" fill="#334155" letterSpacing="0.05em">TECHNOLOGIES</text>
        </svg>
      )
    },
    {
      id: 'asko',
      name: 'ASKO',
      logo: (
        <svg viewBox="0 0 120 40" width="100" height="34">
          <path d="M10 8 H32 V32 H10 Z" fill="#e30613" rx="3" />
          <path d="M15 28 L21 13 L27 28 H23 L21 21 H19 L17 28 Z" fill="#ffffff" />
          <text x="38" y="27" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="16" fill="#1e293b" letterSpacing="0.05em">ASKO</text>
        </svg>
      )
    },
    {
      id: 'ooma',
      name: 'OOMA Cyber Solutions',
      logo: (
        <svg viewBox="0 0 140 40" width="115" height="34">
          <circle cx="16" cy="20" r="10" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
          <circle cx="16" cy="20" r="4" fill="#0284c7" />
          <text x="32" y="22" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="13.5" fill="#0f172a" letterSpacing="0.1em">OOMA</text>
          <text x="32" y="31" fontFamily="'Sora', sans-serif" fontWeight="600" fontSize="6" fill="#64748b" letterSpacing="0.1em">CYBER SOLUTIONS</text>
        </svg>
      )
    },
    {
      id: 'hatch',
      name: 'HATCH',
      logo: (
        <svg viewBox="0 0 110 40" width="95" height="34">
          <rect x="5" y="8" width="95" height="24" rx="2" fill="#e30613" />
          <text x="52.5" y="24.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="13" fill="#ffffff" textAnchor="middle" letterSpacing="0.14em">HATCH</text>
        </svg>
      )
    },
    {
      id: 'ust',
      name: 'UST',
      logo: (
        <svg viewBox="0 0 120 40" width="100" height="34">
          <path d="M10 26 L18 10 L26 26 Z" fill="#e30613" />
          <path d="M16 26 L24 10 L32 26 Z" fill="#00a8c6" />
          <path d="M22 26 L30 10 L38 26 Z" fill="#22c55e" />
          <text x="44" y="26" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="18" fill="#0f172a" letterSpacing="0.05em">UST</text>
        </svg>
      )
    },
    {
      id: 'muthoot-finance',
      name: 'Muthoot Finance',
      logo: (
        <svg viewBox="0 0 150 40" width="125" height="34">
          <rect x="5" y="6" width="28" height="28" fill="#e30613" rx="3" />
          <circle cx="19" cy="20" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M15 24 V16 L19 20 L23 16 V24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="38" y="20" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="11" fill="#e30613">Muthoot</text>
          <text x="38" y="30" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="10" fill="#1e293b">Finance</text>
        </svg>
      )
    },
    {
      id: 'muthoot-honda',
      name: 'Muthoot Honda',
      logo: (
        <svg viewBox="0 0 150 40" width="125" height="34">
          <path d="M6 10 H28 V16 H14 V20 H26 V26 H14 V30 H28 V36 H6 Z" fill="#0284c7" />
          <text x="34" y="20" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="12" fill="#0284c7" letterSpacing="0.02em">muthoot</text>
          <text x="34" y="31" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="11" fill="#e30613" letterSpacing="0.08em">HONDA</text>
        </svg>
      )
    },
    {
      id: 'netweb',
      name: 'Netweb Technologies',
      logo: (
        <svg viewBox="0 0 160 40" width="135" height="34">
          <text x="5" y="22" fontFamily="'Space Grotesk', sans-serif" fontStyle="italic" fontWeight="900" fontSize="17" fill="#00a8c6">Netweb</text>
          <text x="5" y="32" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="8" fill="#38bdf8" letterSpacing="0.22em">TECHNOLOGIES</text>
        </svg>
      )
    },
    {
      id: 'reliance',
      name: 'Reliance Industries Limited',
      logo: (
        <svg viewBox="0 0 160 40" width="130" height="34">
          <polygon points="18,8 24,14 18,20 12,14" fill="#d97706" />
          <circle cx="18" cy="27" r="3" fill="#d97706" />
          <text x="32" y="21" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="12.5" fill="#0f172a">Reliance</text>
          <text x="32" y="30" fontFamily="'Sora', sans-serif" fontWeight="600" fontSize="6.5" fill="#64748b" letterSpacing="0.08em">Industries Limited</text>
        </svg>
      )
    },
    {
      id: 'sameera',
      name: 'Sameera',
      logo: (
        <svg viewBox="0 0 130 40" width="105" height="34">
          <text x="5" y="24" fontFamily="'Space Grotesk', cursive, sans-serif" fontStyle="italic" fontWeight="900" fontSize="18" fill="#e30613">Sameera</text>
          <text x="75" y="16" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="6" fill="#e30613">PVT LTD</text>
        </svg>
      )
    },
    {
      id: 'technopark',
      name: 'Technopark Trivandrum',
      logo: (
        <svg viewBox="0 0 160 40" width="135" height="34">
          <rect x="6" y="10" width="8" height="20" fill="#16a34a" rx="1" />
          <rect x="16" y="6" width="8" height="24" fill="#00a8c6" rx="1" />
          <rect x="26" y="14" width="8" height="16" fill="#16a34a" rx="1" />
          <text x="38" y="21" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="11.5" fill="#0f172a" letterSpacing="0.04em">TECHNOPARK</text>
          <text x="38" y="30" fontFamily="'Sora', sans-serif" fontWeight="600" fontSize="6.5" fill="#16a34a" letterSpacing="0.14em">HARMONY AT WORK</text>
        </svg>
      )
    },
    {
      id: 'zwan',
      name: 'Zwan',
      logo: (
        <svg viewBox="0 0 110 40" width="95" height="34">
          <text x="5" y="28" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="22" fill="#e30613" letterSpacing="-0.03em">zwan</text>
        </svg>
      )
    }
  ];

  // Duplicate the array twice for an endless smooth seamless loop
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="nz-partners-section">
      <div className="nz-partners-header">
        <p className="nz-section-eyebrow nz-center">CAREER TIE-UPS & PLACEMENTS</p>
        <h2 className="nz-partners-title">Our Hiring Partners</h2>
        <p className="nz-partners-sub">
          Top tech enterprises, corporate leaders, and IT recruiters actively hiring Networkz Systems graduates
        </p>
      </div>

      <div className="nz-marquee-wrapper">
        <div className="nz-marquee-track">
          {marqueeItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="nz-partner-card">
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function NetworkzHome() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('NETWORKING');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('programs');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.background = '#1c2536';
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['programs', 'catalog', 'internship', 'about', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      document.body.style.background = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { ALL: ALL_COURSES.length };
    Object.values(CAT_LABELS).forEach((label) => {
      counts[label] = ALL_COURSES.filter((c) => c.category === label).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_COURSES.filter((c) => {
      const matchesTab = !q ? (tab === 'ALL' || c.category === tab) : true;
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.cert.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [tab, searchQuery]);

  const handleTabSelect = (selectedCategory) => {
    setTab(selectedCategory);
    setSearchQuery('');
  };

  return (
    <div className="nz-root">

      {/* ════════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════════ */}
      <header className={`nz-nav${scrolled ? ' nz-nav--scrolled' : ''}`}>
        <div className="nz-nav-left">
          <a href="#programs" className="nz-nav-brand">
            <span className="nz-brand-title">NETWORKZ <span className="nz-brand-accent">SYSTEMS</span></span>
            <span className="nz-brand-badge">KOLLAM</span>
          </a>
        </div>

        <nav className={`nz-nav-links ${mobileMenuOpen ? 'nz-mobile-open' : ''}`} aria-label="Main navigation">
          {[
            { id: 'programs', label: 'Programs' },
            { id: 'catalog', label: 'Catalog' },
            { id: 'internship', label: 'Internship' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeNav === id ? 'nz-nav-active' : ''}
              onClick={() => {
                setActiveNav(id);
                setMobileMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
          <a href="/exam" className="nz-mobile-portal-btn" onClick={() => setMobileMenuOpen(false)}>SKILL EXAM →</a>
        </nav>

        <div className="nz-nav-right">
          <a href="/exam" className="nz-nav-portal">SKILL EXAM →</a>
        </div>

        <button
          className="nz-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {mobileMenuOpen && (
          <div className="nz-mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
        )}
      </header>

      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="nz-hero" id="programs">
        {/* Creative Background Art */}
        <div className="nz-hero-bg">
          <div className="nz-hero-orb-cyan" />
          <div className="nz-hero-orb-indigo" />
          <div className="nz-hero-grid-overlay" />

          {/* Cyber Tech SVG Circuit Grid */}
          <svg className="nz-hero-circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00a8c6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d="M-100,200 Q300,150 600,300 T1500,250" fill="none" stroke="url(#cyanGlow)" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M-100,500 Q400,650 900,450 T1600,600" fill="none" stroke="url(#cyanGlow)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="300" cy="195" r="4" fill="#00a8c6" className="nz-glow-node" />
            <circle cx="600" cy="300" r="5" fill="#38bdf8" className="nz-glow-node-pulse" />
            <circle cx="900" cy="450" r="4" fill="#00a8c6" className="nz-glow-node" />
          </svg>

          {/* Floating Data Particles */}
          <div className="nz-particle-field">
            <span className="nz-particle p1">✦</span>
            <span className="nz-particle p2">●</span>
            <span className="nz-particle p3">◆</span>
            <span className="nz-particle p4">✦</span>
            <span className="nz-particle p5">●</span>
          </div>
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
            <a href="#catalog" className="nz-btn-primary" onClick={() => setActiveNav('catalog')}>EXPLORE PROGRAMS</a>
            <a href="#contact" className="nz-btn-ghost" onClick={() => setActiveNav('contact')}>TALK TO AN ADVISOR</a>
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
                <StatRing value="15+" label="Programs" fill={1} />
                <StatRing value="3" label="States" fill={0.33} />
                <StatRing value="ISO" label="9001:2015" fill={1} />
                <StatRing value="100%" label="Placement" fill={1} />
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
          <div className="nz-catalog-title-box">
            <h2 className="nz-section-title">COURSE CATALOG</h2>
            <p className="nz-section-sub">
              {searchQuery
                ? `Found ${filtered.length} ${filtered.length === 1 ? 'course' : 'courses'} matching "${searchQuery}" across all categories`
                : `Showing ${filtered.length} ${filtered.length === 1 ? 'program' : 'programs'} ${tab !== 'ALL' ? `in ${tab}` : 'across all disciplines'}`
              }
            </p>
          </div>

          {/* Search Box Input */}
          <div className="nz-search-box">
            <svg className="nz-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search courses by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nz-search-input"
            />
            {searchQuery && (
              <button className="nz-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">✕</button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs Row */}
        <div className="nz-tab-row-container">
          <div className="nz-tab-row" role="tablist" aria-label="Course categories">
            {TABS.map((t) => {
              const isActive = tab === t && !searchQuery;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={isActive}
                  className={`nz-tab${isActive ? ' nz-tab--active' : ''}`}
                  onClick={() => handleTabSelect(t)}
                >
                  <span className="nz-tab-icon">{TAB_ICONS[t]}</span>
                  <span className="nz-tab-label">{t}</span>
                  <span className="nz-tab-badge">{categoryCounts[t] || 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid or Empty State */}
        {filtered.length > 0 ? (
          <div className="nz-course-grid">
            {filtered.map((c) => (
              <CourseCard
                key={`${c.chapId}-${c.id}`}
                course={c}
                onSelect={(course) => {
                  const nameLower = (course.name || '').toLowerCase();
                  if (course.id === 'cyber' || course.id === 'ethical' || nameLower.includes('cyber') || nameLower.includes('ethical')) {
                    navigate('/cybersecurity');
                  } else if (course.id === 'digital-marketing' || course.id === 'marketing' || nameLower.includes('digital marketing') || nameLower.includes('marketing')) {
                    navigate('/digital-marketing');
                  } else {
                    setSelectedCourse(course);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="nz-empty-catalog">
            <div className="nz-empty-icon">🔍</div>
            <h3 className="nz-empty-title">NO COURSES FOUND</h3>
            <p className="nz-empty-sub">We couldn't find any courses matching your search "{searchQuery}" in category "{tab}".</p>
            <button className="nz-btn-ghost nz-btn-sm" onClick={() => { setTab('ALL'); setSearchQuery(''); }}>
              CLEAR FILTERS & SHOW ALL COURSES
            </button>
          </div>
        )}
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
                onClick={() => setSelectedCourse({ name: `Internship Program (${tier.dur} - ${tier.tag})`, category: 'INTERNSHIP' })}
              >
                <div className="nz-tier-img-wrap">
                  <img src={tier.img} alt={`Tech Internship ${tier.dur}`} className="nz-tier-img" loading="lazy" />
                  <div className="nz-tier-overlay" />
                  <div className="nz-tier-badge">
                    <span className="nz-pulse-dot" /> {tier.tag}
                  </div>
                </div>
                <div className="nz-tier-body">
                  <div className="nz-tier-dur">{tier.dur}</div>
                  <p className="nz-tier-desc">{tier.desc}</p>
                  <button className="nz-tier-btn">
                    <span>APPLY NOW</span>
                    <span className="nz-tier-btn-arrow">↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR HIRING PARTNERS — RUNNING BANNER
          ════════════════════════════════════════ */}
      <HiringPartnersBanner />

      {/* ════════════════════════════════════════
          WHY CHOOSE NETWORKZ SYSTEMS — LUXURY SHOWCASE
          ════════════════════════════════════════ */}
      <section className="nz-credentials-new" id="about">
        <div className="nz-credentials-container">

          {/* Section Header */}
          <div className="nz-why-header-center">
            <p className="nz-section-eyebrow nz-center">ACCREDITATION & CAREER PROMISE</p>
            <h2 className="nz-section-title nz-center">WHY CHOOSE NETWORKZ SYSTEMS</h2>
            <p className="nz-section-sub nz-center" style={{ maxWidth: 640, margin: '0.8rem auto 3.5rem' }}>
              Internationally accredited, government-certified, and industry-connected — South India's most trusted technology training partner.
            </p>
          </div>

          {/* Top 4-Column Feature Card Container */}
          <div className="nz-feature-white-card">

            {/* Col 1 */}
            <div className="nz-feature-col">
              <div className="nz-feature-icon-circle nz-icon-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="nz-feature-title">
                <span className="nz-feature-highlight">200+</span><br />
                100% PLACEMENT ASSISTANCE
              </h3>
              <p className="nz-feature-desc">
                Active tie-ups with 200+ top IT recruiters across South India. Mock interviews, resume building & placement drives.
              </p>
            </div>

            {/* Col 2 */}
            <div className="nz-feature-col">
              <div className="nz-feature-icon-circle nz-icon-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.178 8c5.096 0 5.096 8 0 8-2.613 0-4.887-2.112-6.178-4.004C10.708 13.888 8.434 16 5.822 16c-5.096 0-5.096-8 0-8 2.613 0 4.887 2.112 6.178 4.004C13.292 10.112 15.566 8 18.178 8z" />
                </svg>
              </div>
              <h3 className="nz-feature-title">
                LIFELONG LAB<br />
                & TRAINING SUPPORT
              </h3>
              <p className="nz-feature-desc">
                Lifetime access to our technical labs, updated course content, recorded sessions, and guidance even after the course.
              </p>

            </div>

            {/* Col 3 */}
            <div className="nz-feature-col">
              <div className="nz-feature-icon-circle nz-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 className="nz-feature-title">
                <span className="nz-feature-highlight">CPD</span><br />
                SKILL DEVELOPMENT PROGRAMME
              </h3>
              <p className="nz-feature-desc">
                End-to-end industry-specific curriculum, CPD certified trainers, soft skills development, and Pearson VUE exam preparation.
              </p>
            </div>

            {/* Col 4 */}
            <div className="nz-feature-col">
              <div className="nz-feature-icon-circle nz-icon-cyan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="nz-feature-title">
                <span className="nz-feature-highlight">100%</span><br />
                INDUSTRIAL HANDS-ON TRAINING
              </h3>
              <p className="nz-feature-desc">
                Real-world client projects, live server lab practice, e-workbook exercises, and final-year academic project support.
              </p>
            </div>

          </div>

          {/* Middle Stat Counter Dark Bar */}
          <div className="nz-stat-dark-bar">
            <div className="nz-stat-bar-item">
              <div className="nz-stat-bar-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <div className="nz-stat-bar-num">8K+</div>
                <div className="nz-stat-bar-lbl">Students Trained</div>
              </div>
            </div>

            <div className="nz-stat-bar-divider" />

            <div className="nz-stat-bar-item">
              <div className="nz-stat-bar-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <div className="nz-stat-bar-num">200+</div>
                <div className="nz-stat-bar-lbl">Recruiter Partners</div>
              </div>
            </div>

            <div className="nz-stat-bar-divider" />

            <div className="nz-stat-bar-item">
              <div className="nz-stat-bar-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="nz-stat-bar-num">7+</div>
                <div className="nz-stat-bar-lbl">Branches Across Kerala</div>
              </div>
            </div>

            <div className="nz-stat-bar-divider" />

            <div className="nz-stat-bar-item">
              <div className="nz-stat-bar-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div>
                <div className="nz-stat-bar-num">95%</div>
                <div className="nz-stat-bar-lbl">Placement Success Rate</div>
              </div>
            </div>
          </div>

          {/* Bottom Journey Section */}
          <div className="nz-journey-section">
            <div className="nz-journey-header">
              <div>
                <p className="nz-journey-eyebrow">COMPLETE LEARNING EXPERIENCE</p>
                <h3 className="nz-journey-title">
                  EVERYTHING INCLUDED<br />
                  IN YOUR TRAINING JOURNEY
                </h3>
                <div className="nz-journey-line" />
              </div>
              <p className="nz-journey-sub">
                Our comprehensive ecosystem helps you build job-ready skills with confidence and competence.
              </p>
            </div>

            {/* 8 Benefit Cards Grid */}
            <div className="nz-journey-grid">

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Industry-Specific Skills</h4>
                  <p className="nz-journey-card-desc">Start-to-end curriculum aligned with top IT hiring managers.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Certified Coursewares</h4>
                  <p className="nz-journey-card-desc">Official training course wares & reference materials.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">E-Workbook Lab Practice</h4>
                  <p className="nz-journey-card-desc">Guided e-workbooks for hands-on practical lab exercises.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Placement Support</h4>
                  <p className="nz-journey-card-desc">Dedicated career cell, job alerts & placement drives.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Academic Project Assistance</h4>
                  <p className="nz-journey-card-desc">Expert guidance & lab support for college projects.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">CPD Certified Trainers</h4>
                  <p className="nz-journey-card-desc">Instruction by experienced certified technical experts.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Pearson VUE Testing Centre</h4>
                  <p className="nz-journey-card-desc">Authorized center for Cisco, AWS, Azure & CompTIA exams.</p>
                </div>
              </div>

              <div className="nz-journey-card">
                <div className="nz-journey-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="nz-journey-card-title">Lifelong Tech Support</h4>
                  <p className="nz-journey-card-desc">Continued lab access and technical mentorship.</p>
                </div>
              </div>

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
            <p className="nz-section-eyebrow">KOLLAM, KERALA</p>
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
                <span className="nz-kollam-badge">
                  <span className="nz-pulse-dot" /> VISIT OUR CAMPUS
                </span>
              </div>

              <div className="nz-kollam-content">
                <div className="nz-kollam-header-block">
                  <h3 className="nz-kollam-title">NETWORKZ SYSTEMS KOLLAM</h3>
                  <div className="nz-contact-accent-line" />
                  <div className="nz-kollam-cert-badges">
                    <span className="nz-cert-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      ISO 9001:2015 Certified
                    </span>
                    <span className="nz-cert-badge nz-cert-badge-gold">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Pearson VUE Authorized Exam Centre
                    </span>
                  </div>
                </div>

                <div className="nz-kollam-info-list">
                  {/* Address */}
                  <div className="nz-kollam-info-item">
                    <svg className="nz-kollam-inline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div className="nz-kollam-info-text">
                      <div className="nz-kollam-info-label">CAMPUS ADDRESS</div>
                      <div className="nz-kollam-info-val">
                        2nd Floor, Pattathuvila Plaza, Vadayattukotta Rd, Chinnakada, Kollam, Kerala 691001
                      </div>
                    </div>
                  </div>

                  {/* Hotline */}
                  <div className="nz-kollam-info-item">
                    <svg className="nz-kollam-inline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div className="nz-kollam-info-text">
                      <div className="nz-kollam-info-label">ADMISSION HOTLINE</div>
                      <a
                        href="https://wa.me/918089030405?text=Hi%20Networkz%20Systems%20Kollam!%20I%20want%20to%20inquire%20about%20admissions."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nz-kollam-info-val nz-gold-link"
                      >
                        +91 80890 30405 <span className="nz-link-arrow">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="nz-kollam-info-item">
                    <svg className="nz-kollam-inline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div className="nz-kollam-info-text">
                      <div className="nz-kollam-info-label">EMAIL INQUIRIES</div>
                      <a href="mailto:support@nskollam.com" className="nz-kollam-info-val nz-gold-link">
                        support@nskollam.com <span className="nz-link-arrow">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="nz-kollam-info-item">
                    <svg className="nz-kollam-inline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div className="nz-kollam-info-text">
                      <div className="nz-kollam-info-label">WORKING HOURS</div>
                      <div className="nz-kollam-info-val">Monday – Saturday: 9:00 AM – 6:30 PM</div>
                    </div>
                  </div>
                </div>

                <div className="nz-kollam-actions">
                  <a
                    href="https://maps.google.com/?q=Networkz+Systems+Kollam+Chinnakada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-kollam-btn-directions"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Get Directions on Google Maps</span>
                    <span className="nz-btn-arrow">↗</span>
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
