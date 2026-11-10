import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const FIELDS = [
  { id: 'name', label: 'FULL NAME', placeholder: 'Enter your full name', type: 'text' },
  { id: 'email', label: 'EMAIL ADDRESS', placeholder: 'Enter your email address', type: 'email' },
  { id: 'phone', label: 'PHONE NUMBER', placeholder: 'Enter your phone number', type: 'tel' },
  { id: 'dob', label: 'DATE OF BIRTH', placeholder: 'dd / mm / yyyy', type: 'date' },
];

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Enter your full name.';

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(f.email.trim())) {
    e.email = 'Enter a valid email address.';
  }

  if (!/^(?:\+91)?[6789]\d{9}$/.test(f.phone.replace(/[\s\-()]/g, ''))) {
    e.phone = 'Enter a valid 10-digit mobile number.';
  }

  if (!f.dob) {
    e.dob = 'Select date of birth.';
  } else {
    const dobDate = new Date(f.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    if (age < 15) {
      e.dob = 'Candidate must be at least 15 years old.';
    } else if (age > 100) {
      e.dob = 'Enter a valid date of birth.';
    }
  }
  return e;
}

function Field({ f, form, errors, touched, onChange, onBlur }) {
  const isErr = errors[f.id] && touched[f.id];

  if (f.id === 'dob') {
    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear - 5}-12-31`;
    const minDate = '1940-01-01';

    return (
      <div className="f-group">
        <label className="f-label" htmlFor="dob">
          {f.label} <span className="req">*</span>
        </label>
        <div className="f-input-wrapper">
          <input
            id="dob"
            className={`f-input ${isErr ? 'err' : ''}`}
            type="date"
            min={minDate}
            max={maxDate}
            value={form.dob}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="off"
            placeholder="dd / mm / yyyy"
          />
        </div>
        {isErr && (
          <span className="f-error">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {errors.dob}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="f-group">
      <label className="f-label" htmlFor={f.id}>
        {f.label} <span className="req">*</span>
      </label>
      <input
        id={f.id}
        className={`f-input ${isErr ? 'err' : ''}`}
        type={f.type}
        placeholder={f.placeholder}
        value={form[f.id]}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {isErr && (
        <span className="f-error">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {errors[f.id]}
        </span>
      )}
    </div>
  );
}

export default function Registration({ onStart }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);

  const onChange = ({ target: { id, value } }) => {
    setForm(p => ({ ...p, [id]: value }));
    if (touched[id]) setErrors(p => ({ ...p, [id]: validate({ ...form, [id]: value })[id] }));
  };

  const onBlur = ({ target: { id } }) => {
    setTouched(p => ({ ...p, [id]: true }));
    setErrors(p => ({ ...p, [id]: validate(form)[id] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, dob: true });
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 400));
    onStart({ ...form });
  };

  return (
    <div className="reg-root-page">

      {/* ── TOP HEADER (EXACT REFERENCE TREATMENT) ── */}
      <header className="reg-header">
        <div className="reg-header-inner">
          <div className="reg-brand-wrap">
            <Link to="/" className="reg-brand-link">
              <img src="/nsk.jpeg" alt="Networkz Systems" className="reg-brand-emblem" />
              <span className="reg-brand-name">NETWORKZ SYSTEMS</span>
              <span className="reg-brand-tag">KOLLAM CAMPUS</span>
            </Link>
          </div>

          <div className="reg-header-actions">
            <Link to="/" className="reg-back-btn" title="Return to Main Website">
              <span className="reg-back-arrow">→</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── MAIN HERO SECTION (55% / 45% BALANCED COMPOSITION) ── */}
      <main className="reg-hero-main">
        <div className="reg-hero-container">

          {/* Left Column (55%): Exam Presentation */}
          <div className="reg-hero-left">
            <div className="reg-text-wrap">
              <div className="reg-eyebrow-row">
                <span className="reg-orange-bar" />
                <span className="reg-eyebrow-text">CANDIDATE PORTAL</span>
              </div>

              <h2 className="reg-portal-subheading">NETWORKZ SYSTEMS KOLLAM</h2>

              <h1 className="reg-hero-title">
                SKILL<br />
                CONNECT<br />
                EXAM <span className="reg-title-orange">2026</span>
              </h1>

              <p className="reg-hero-desc">
                Comprehensive IT assessment in Networking, Cyber Security, Cloud Computing &amp; Programming.
              </p>
            </div>

            <div className="reg-stats-pill">
              <div className="reg-stat-col">
                <svg className="reg-stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span className="reg-stat-label">50 MCQs</span>
              </div>
              <div className="reg-stat-divider" />
              <div className="reg-stat-col">
                <svg className="reg-stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="reg-stat-label">30 Mins</span>
              </div>
              <div className="reg-stat-divider" />
              <div className="reg-stat-col">
                <svg className="reg-stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span className="reg-stat-label">1pt / Q</span>
              </div>
              <div className="reg-stat-divider" />
              <div className="reg-stat-col">
                <svg className="reg-stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="2" y1="20" x2="22" y2="20"></line>
                </svg>
                <span className="reg-stat-label">IT &amp; Cyber</span>
              </div>
            </div>
          </div>

          {/* Right Column (45%): Compact Registration Card */}
          <div className="reg-hero-right">
            <div className="reg-card">
              <h2 className="reg-card-title">Create Your Account</h2>
              <p className="reg-card-subtitle">
                Please fill in the details below to register for Skill Connect Exam 2026.
              </p>

              <form onSubmit={onSubmit} noValidate className="reg-form">
                <div className="reg-inputs-stack">
                  {FIELDS.map(f => (
                    <Field
                      key={f.id}
                      f={f}
                      form={form}
                      errors={errors}
                      touched={touched}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  ))}
                </div>

                <button type="submit" className="reg-submit-btn" disabled={busy}>
                  {busy ? (
                    <><span className="spinner" /> Setting up…</>
                  ) : (
                    <>START EXAM →</>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER (RESTORED EXACTLY AS IN REFERENCE) ── */}
      <footer className="reg-footer-bar">
        <div className="reg-footer-inner">
          <div className="reg-footer-left">
            <div className="reg-footer-org-badge">
              <span className="reg-footer-accent-bar" />
              <span className="reg-footer-org-title">ORGANIZED BY</span>
            </div>
            <div className="reg-footer-v-divider" />
            <div className="reg-footer-addr-block">
              <span className="reg-footer-brand-title">Networkz Systems</span>
              <span className="reg-footer-brand-sub">Pattathuvila Plaza, Chinnakkada, Kollam</span>
              <span className="reg-footer-brand-phone">Ph: 80 89 03 0405</span>
            </div>
          </div>

          <div className="reg-footer-right">
            <a
              href="https://www.instagram.com/networkz_systems_kollam/"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/Networkzsystemskollam"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
