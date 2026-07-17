import { useState } from 'react';
import './Registration.css';

const FIELDS = [
  { id: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text', half: false },
  { id: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', half: false },
  { id: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel', half: true },
  { id: 'dob', label: 'Date of Birth', placeholder: '', type: 'date', half: true },
];

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email.';
  if (!/^[+\d\s\-()\[\]]{7,15}$/.test(f.phone)) e.phone = 'Enter a valid phone number.';
  if (!f.dob) e.dob = 'Select date of birth.';
  return e;
}

function Field({ f, form, errors, touched, onChange, onBlur }) {
  if (f.id === 'dob') {
    // Generate valid min/max date strings
    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear - 5}-12-31`;
    const minDate = '1940-01-01';

    const showPicker = (e) => {
      if (typeof e.target.showPicker === 'function') {
        try { e.target.showPicker(); } catch (err) {}
      }
    };

    return (
      <div className="f-group">
        <label className="f-label" htmlFor="dob">
          {f.label} <span className="req">*</span>
        </label>
        <input
          id="dob"
          className={`f-input${errors.dob && touched.dob ? ' err' : ''}`}
          type="date"
          min={minDate}
          max={maxDate}
          value={form.dob}
          onChange={onChange}
          onBlur={onBlur}
          onClick={showPicker}
          onFocus={showPicker}
          onKeyDown={(e) => e.preventDefault()} // Block typing entirely to force calendar usage
          autoComplete="off"
        />
        {errors.dob && touched.dob && (
          <span className="f-error">{errors.dob}</span>
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
        className={`f-input${errors[f.id] && touched[f.id] ? ' err' : ''}`}
        type={f.type}
        placeholder={f.placeholder}
        value={form[f.id]}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {errors[f.id] && touched[f.id] && (
        <span className="f-error">{errors[f.id]}</span>
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

  const fullFields = FIELDS.filter(f => !f.half);
  const halfFields = FIELDS.filter(f => f.half);

  return (
    <div className="reg-wrap">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="reg-side">
        <div className="reg-logo" style={{ marginBottom: '40px' }}>
        </div>

        <h1 className="reg-side-title">
          Skill Connect<br />
          <span>Exam 2026</span>
        </h1>

        <p className="reg-side-desc">
          A comprehensive IT assessment covering Networking, Cybersecurity,
          Programming, Cloud Computing, AI/ML and more.
        </p>

        <div className="reg-details">
          <div className="reg-detail-row">
            <div className="reg-detail-icon">📋</div>
            <div className="reg-detail-text">
              <div className="reg-detail-label">Questions</div>
              <div className="reg-detail-val">50 Multiple Choice</div>
            </div>
          </div>
          <div className="reg-detail-row">
            <div className="reg-detail-icon">⏱</div>
            <div className="reg-detail-text">
              <div className="reg-detail-label">Duration</div>
              <div className="reg-detail-val">30 Minutes</div>
            </div>
          </div>
          <div className="reg-detail-row">
            <div className="reg-detail-icon">🏆</div>
            <div className="reg-detail-text">
              <div className="reg-detail-label">Marking</div>
              <div className="reg-detail-val">1 Mark per Question</div>
            </div>
          </div>
          <div className="reg-detail-row">
            <div className="reg-detail-icon">🌐</div>
            <div className="reg-detail-text">
              <div className="reg-detail-label">Topics</div>
              <div className="reg-detail-val">Networking, Cyber, Cloud, Dev</div>
            </div>
          </div>
        </div>

        <div className="reg-side-footer">
          <div className="reg-side-footer-label">Organised by</div>
          <div className="reg-side-footer-org">Networkz Systems</div>
          <div className="reg-side-footer-addr">
            Pattathuvila Plaza, Vadayattukotta Rd,<br />
            Chinnakkada, Kollam<br />
            Ph: 80 89 03 04 05
          </div>
        </div>
      </aside>

      {/* ── RIGHT FORM ── */}
      <main className="reg-main">
        <div className="reg-form-box">

          <div className="reg-form-heading">
            <h2>Create Your Account</h2>
            <p>Please fill in the details below to register for Skill Connect Exam 2026.</p>
          </div>

          <div className="card reg-form-card">
            <form onSubmit={onSubmit} noValidate>
              <div className="reg-fields">
                {fullFields.map(f => (
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
                <div className="reg-row">
                  {halfFields.map(f => (
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
              </div>

              <button type="submit" className="reg-submit-btn" disabled={busy}>
                {busy
                  ? <><span className="spinner" /> Setting up…</>
                  : 'Start Exam →'
                }
              </button>
            </form>
          </div>

          <div className="reg-meta-strip">
            {[
              { num: '50', lbl: 'Questions' },
              { num: '30', lbl: 'Minutes' },
              { num: 'MCQ', lbl: 'Format' },
              { num: '1pt', lbl: 'Per Q' },
            ].map(m => (
              <div className="reg-meta-cell" key={m.lbl}>
                <div className="reg-meta-num">{m.num}</div>
                <div className="reg-meta-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}
