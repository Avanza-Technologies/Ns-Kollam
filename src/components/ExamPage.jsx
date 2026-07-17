import { useState, useEffect, useRef, useCallback } from 'react';
import { questions, decryptCorrectIndex } from '../data/questions';
import './ExamPage.css';

const TOTAL = 60 * 60;

const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

const initials = name => name.trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase()||'').join('');

export default function ExamPage({ candidate, onSubmit }) {
  const [cur, setCur]         = useState(0);
  const [ans, setAns]         = useState({});
  const [left, setLeft]       = useState(TOTAL);
  const [modal, setModal]     = useState(false);
  const [blurred, setBlurred] = useState(false);
  const timerRef              = useRef(null);

  // Security restrictions
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      // Disable print screen key
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots are restricted during the exam.');
      }
      // Disable Ctrl+C, Ctrl+V, Ctrl+U (view source), Ctrl+Shift+I (devtools), F12
      if (
        (e.ctrlKey && ['c', 'C', 'u', 'U', 'v', 'V'].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ['i', 'I', 'j', 'J'].includes(e.key)) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    const handleBlur = () => setBlurred(true);
    const handleFocus = () => setBlurred(false);

    // Apply event listeners to document
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); onSubmit(ans); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // We store draft selection state for currently loaded question
  // and confirmed answers in ans. The count adjustments will only update
  // when clicking Next, Previous, or navigating to another question.
  const [draftAns, setDraftAns] = useState(null);

  useEffect(() => {
    // When cur changes, sync draft answer from the confirmed answers
    setDraftAns(ans[cur] !== undefined ? ans[cur] : null);
  }, [cur, ans]);

  const submit = useCallback(() => {
    clearInterval(timerRef.current);
    // Submit with current drafts confirmed
    const finalAns = { ...ans };
    if (draftAns !== null) {
      finalAns[cur] = draftAns;
    } else {
      delete finalAns[cur];
    }
    onSubmit(finalAns);
  }, [ans, draftAns, cur, onSubmit]);

  const pick = (i) => {
    setDraftAns((prev) => {
      // If same index is clicked again, deselect option (returns null)
      if (prev === i) return null;
      return i;
    });
  };

  const commitDraftAndGo = (targetIndex) => {
    setAns((prev) => {
      const nextAns = { ...prev };
      if (draftAns !== null) {
        nextAns[cur] = draftAns;
      } else {
        delete nextAns[cur];
      }
      return nextAns;
    });
    if (targetIndex >= 0 && targetIndex < questions.length) {
      setCur(targetIndex);
    }
  };

  const answered = Object.keys(ans).length;
  const pct      = Math.round(((cur + 1) / questions.length) * 100);
  const cls      = left <= 300 ? 'crit' : left <= 600 ? 'warn' : '';

  return (
    <div className="exam-page">

      {/* ── Top bar ── */}
      <header className="exam-bar">
        <div className="bar-brand" style={{ marginRight: '24px' }}>
          <span className="bar-brand-name" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Avanza Technologies</span>
        </div>

        <div className="bar-progress">
          <div className="bar-progress-top">
            <span>Question <strong>{cur+1}</strong> of {questions.length}</span>
            <span>{pct}%</span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="bar-right">
          <div className={`timer ${cls}`}>
            <div className="timer-dot" />
            <span className="timer-time">{fmt(left)}</span>
            <span className="timer-lbl">remaining</span>
          </div>

          <div className="cand-chip">
            <div className="cand-avatar">{initials(candidate.name)}</div>
            <span className="cand-name">{candidate.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="exam-body">

        {/* Question panel */}
        <div className="q-area" key={cur}>
          <div className="card q-card">
            <div className="q-meta">
              <span className="q-index">Question {cur + 1} / {questions.length}</span>
              <span className="badge badge-blue">{questions[cur].category}</span>
            </div>

            <p className="q-text">{questions[cur].question}</p>

            <div className="opts">
              {questions[cur].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className={`opt${draftAns === i ? ' opt-sel' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span className="opt-key">{String.fromCharCode(65+i)}</span>
                  <span className="opt-text">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nav row */}
          <div className="q-nav">
            <span className="q-nav-info">
              <b>{answered}</b> answered &nbsp;·&nbsp; <b>{questions.length - answered}</b> unanswered
            </span>
            <div className="q-nav-btns">
              <button className="btn btn-ghost" onClick={() => commitDraftAndGo(cur - 1)} disabled={cur === 0}>
                ← Previous
              </button>
              {cur < questions.length - 1
                ? <button className="btn btn-primary" onClick={() => commitDraftAndGo(cur + 1)}>Next →</button>
                : <button className="btn btn-primary" onClick={() => setModal(true)}>Finish</button>
              }
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="exam-aside">
          {/* Stats */}
          <div className="card aside-card">
            <div className="aside-section-title">Progress</div>
            <div className="stat-row">
              <div className="stat-chip">
                <div className="stat-val sv-green">{answered}</div>
                <div className="stat-lbl">Answered</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val sv-amber">{questions.length - answered}</div>
                <div className="stat-lbl">Pending</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val sv-blue">{cur + 1}</div>
                <div className="stat-lbl">Current</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val sv-gray">{questions.length}</div>
                <div className="stat-lbl">Total</div>
              </div>
            </div>
          </div>

          {/* Grid navigator */}
          <div className="card aside-card">
            <div className="aside-section-title">Questions</div>
            <div className="q-grid">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={['q-dot', i===cur?'cur':'', ans[i]!==undefined?'done':''].filter(Boolean).join(' ')}
                  onClick={() => commitDraftAndGo(i)}
                  title={`Q${i+1}${ans[i]!==undefined?' ✓':''}`}
                >{i+1}</div>
              ))}
            </div>
            <div className="q-legend">
              <div className="legend-row"><div className="ldot ldot-done"/>Answered</div>
              <div className="legend-row"><div className="ldot ldot-cur"/>Current</div>
              <div className="legend-row"><div className="ldot ldot-pending"/>Not answered</div>
            </div>
          </div>

          <button className="aside-submit" onClick={() => setModal(true)}>
            Submit Exam
          </button>
        </aside>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div className="modal-bg" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">📋</div>
            <h3>Submit your exam?</h3>
            <p>You won't be able to change answers after submitting. Please review before continuing.</p>
            <div className="modal-stats">
              <div className="ms-item">
                <div className="ms-val" style={{color:'var(--green)'}}>{answered}</div>
                <div className="ms-lbl">Answered</div>
              </div>
              <div className="ms-item">
                <div className="ms-val" style={{color:'var(--amber)'}}>{questions.length - answered}</div>
                <div className="ms-lbl">Skipped</div>
              </div>
              <div className="ms-item">
                <div className="ms-val" style={{color:'var(--blue)'}}>{fmt(left)}</div>
                <div className="ms-lbl">Remaining</div>
              </div>
            </div>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setModal(false)}>Review</button>
              <button className="btn btn-primary" onClick={submit}>Submit Now</button>
            </div>
          </div>
        </div>
      )}
      {/* Blur Overlay when tab is inactive */}
      {blurred && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          textAlign: 'center',
          padding: '24px'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px' }}>Exam Content Protected</h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Please return to the exam tab to continue. Switching windows or taking screenshots is restricted.</p>
        </div>
      )}
    </div>
  );
}
