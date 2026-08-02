import './ResultsPage.css';

const initials = name =>
  name.trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase()||'').join('');

export default function ResultsPage({ candidate, onRetake }) {
  return (
    <div className="done-page">
      <div className="done-card">

        {/* Company Header */}
        <div className="done-brand">
          Networkz Systems • Skill Connect 2026
        </div>

        {/* Success Icon */}
        <div className="done-check">✓</div>

        <h1 className="done-title">Exam Submitted Successfully</h1>
        <p className="done-sub">
          Thank you for completing the Skill Connect Exam 2026.
          Your responses have been recorded securely.
        </p>

        <div className="done-divider" />

        {/* Candidate Info Card */}
        <div className="done-cand">
          <div className="done-avatar">{candidate ? initials(candidate.name) : 'ST'}</div>
          <div className="done-cand-info">
            <div className="done-cand-name">{candidate ? candidate.name : 'Student Candidate'}</div>
            <div className="done-cand-email">{candidate ? candidate.email : 'candidate@email.com'}</div>
          </div>
          <div className="done-submitted">✓ Confirmed</div>
        </div>

        {/* Notice */}
        <div className="done-notice">
          <span className="done-notice-icon">📋</span>
          <p>
            <strong>Result Evaluation Notice:</strong> Your test score will be processed and communicated directly to your registered email and phone number. Contact the campus desk below for instant verification.
          </p>
        </div>

        {/* Contact Information */}
        <div className="done-contact">
          <div className="done-contact-label">Kollam Admission Desk</div>
          <div className="done-contact-org">Networkz Systems</div>
          <div className="done-contact-addr">
            Pattathuvila Plaza, Vadayattukotta Rd, Chinnakkada, Kollam
          </div>
          <div className="done-contact-phone">
            <span>📞</span>
            <span>+91 80 89 03 04 05</span>
          </div>
        </div>

        {onRetake && (
          <button className="done-btn" onClick={onRetake}>
            Register Another Candidate →
          </button>
        )}

      </div>
    </div>
  );
}
