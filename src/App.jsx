import { useState } from 'react';
import Registration from './components/Registration';
import ExamPage from './components/ExamPage';
import ResultsPage from './components/ResultsPage';
import { questions, decryptCorrectIndex } from './data/questions';
import './App.css';

const PHASE = { REGISTER: 'register', EXAM: 'exam', DONE: 'done' };
const WEB3FORMS_KEY = '1bf66af5-6a27-45fe-815d-2048a9571a25';

export default function App() {
  const [phase, setPhase]         = useState(PHASE.REGISTER);
  const [candidate, setCandidate] = useState(null);

  const handleStart  = (info)  => { setCandidate(info); setPhase(PHASE.EXAM); };

  const handleSubmit = (answers) => {
    // Calculate score using decrypted indices
    let score = 0;
    questions.forEach((q, i) => {
      const decryptedIdx = decryptCorrectIndex(q.correctEncrypted);
      if (answers[i] === decryptedIdx) {
        score += 1;
      }
    });

    // Send payload to Web3Forms to deliver directly to email
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New Exam Submission: ${candidate.name} (${score}/${questions.length})`,
      from_name: 'Skill Connect Exam Portal',
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      dob: candidate.dob,
      score: `${score} / ${questions.length} (${Math.round((score / questions.length) * 100)}%)`
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Error logging to Web3Forms:', err));

    setPhase(PHASE.DONE);
  };

  const handleRetake = () => { setCandidate(null); setPhase(PHASE.REGISTER); };

  return (
    <>
      {phase === PHASE.REGISTER && (
        <Registration onStart={handleStart} />
      )}
      {phase === PHASE.EXAM && (
        <ExamPage candidate={candidate} onSubmit={handleSubmit} />
      )}
      {phase === PHASE.DONE && (
        <ResultsPage candidate={candidate} onRetake={handleRetake} />
      )}
    </>
  );
}
