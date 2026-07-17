import './ResultsPage.css';

const initials = name =>
  name.trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase()||'').join('');

export default function ResultsPage({ candidate, onRetake }) {
  return (
    <div className="done-page">
      <div className="card done-card">

        {/* Company Logo Text */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', letterSpacing: '-0.3px' }}>
            Avanza Technologies
          </div>
        </div>

        {/* Success icon */}
        <div className="done-check">✓</div>

        <h1 className="done-title">Exam submitted successfully</h1>
        <p className="done-sub">
          Thank you for completing the Skill Connect Exam 2026.
          Your responses have been recorded.
        </p>

        <div className="done-divider" />

        {/* Candidate */}
        <div className="done-cand">
          <div className="done-avatar">{initials(candidate.name)}</div>
          <div className="done-cand-info">
            <div className="done-cand-name">{candidate.name}</div>
            <div className="done-cand-email">{candidate.email}</div>
          </div>
          <div className="done-submitted">✓ Submitted</div>
        </div>

        {/* Notice */}
        <div className="done-notice">
          <span className="done-notice-icon">📋</span>
          <p>
            <strong>Result notice:</strong> Your exam will be evaluated and
            results communicated to you separately. Please contact the centre
            below for any result enquiries or assistance.
          </p>
        </div>

        {/* Contact */}
        <div className="done-contact">
          <div className="done-contact-label">Contact</div>
          <div className="done-contact-org">Networkz Systems</div>
          <div className="done-contact-addr">
            Pattathuvila Plaza, Vadayattukotta Rd,<br />
            Chinnakkada, Kollam
          </div>
          <div className="done-contact-phone">
            <div className="done-phone-icon">📞</div>
            <span className="done-phone-num">80 89 03 04 05</span>
          </div>
        </div>

      </div>
    </div>
  );
}
