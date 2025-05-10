import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Party definitions
const parties = [
  { id: 'pas', name: 'Party of Action and Solidarity (PAS)' },
  { id: 'bcs', name: 'Bloc of Communists and Socialists (BCS)' },
  { id: 'victory', name: 'Victory (Ilan Shor bloc)' },
  { id: 'alternative', name: 'Alternative (Ion Ceban bloc)' },
  { id: 'nstru', name: 'Our Party (Partidul Nostru)' },
];

// Questionnaire
const questions = [
  {
    id: 1,
    text: 'Which foreign policy direction do you support for Moldova?',
    options: [
      { text: 'Further EU integration and Western alignment', scores: { pas: 2, alternative: 1 } },
      { text: 'Maintain neutrality between East and West', scores: { alternative: 2 } },
      { text: 'Stronger ties with Russia', scores: { bcs: 2, victory: 1 } },
    ],
  },
  {
    id: 2,
    text: 'What is your preferred economic model?',
    options: [
      { text: 'Liberal free market with minimal state intervention', scores: { pas: 2 } },
      { text: 'Balanced market with social safety nets', scores: { alternative: 2, nstru: 1 } },
      { text: 'Strong state-led economy and redistribution', scores: { bcs: 2, victory: 1 } },
    ],
  },
  {
    id: 3,
    text: 'How do you prioritize anti-corruption and judicial reform?',
    options: [
      { text: 'Top priority - urgent and deep reforms needed', scores: { pas: 2 } },
      { text: 'Important but should be balanced with stability', scores: { alternative: 2, nstru: 1 } },
      { text: 'Not a priority - focus on traditional governance', scores: { bcs: 2, victory: 1 } },
    ],
  },
  {
    id: 4,
    text: 'What is your stance on social and cultural issues?',
    options: [
      { text: 'Progressive and reform-oriented', scores: { pas: 2, alternative: 1 } },
      { text: 'Moderate and consensus-driven', scores: { alternative: 2, nstru: 1 } },
      { text: 'Traditional and conservative values', scores: { bcs: 2, victory: 1 } },
    ],
  },
  {
    id: 5,
    text: 'How should power be distributed between central and local authorities?',
    options: [
      { text: 'Strong central government for cohesion', scores: { pas: 1, bcs: 1 } },
      { text: 'Decentralization to empower local communities', scores: { alternative: 2, nstru: 1 } },
      { text: 'Mixed approach with clear competences', scores: { pas: 1, alternative: 1, bcs: 1 } },
    ],
  },
];

function App() {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load state from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('quizState'));
      if (saved) {
        setAnswers(saved.answers || {});
        setCurrentIndex(
          typeof saved.currentIndex === 'number' ? saved.currentIndex : 0
        );
      }
    } catch (e) {
      console.warn('Failed to parse saved state', e);
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify({ answers, currentIndex }));
  }, [answers, currentIndex]);

  const completed = Object.keys(answers).length === questions.length;

  const handleSelect = (idx) => {
    const qid = questions[currentIndex].id;
    setAnswers({ ...answers, [qid]: idx });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const computeScores = () => {
    const scoreMap = parties.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {});
    Object.entries(answers).forEach(([qid, optIdx]) => {
      const question = questions.find(q => q.id === parseInt(qid));
      if (question) {
        const optionScores = question.options[optIdx].scores;
        Object.entries(optionScores).forEach(([pid, val]) => {
          scoreMap[pid] += val;
        });
      }
    });
    return scoreMap;
  };

  const getResult = () => {
    const scores = computeScores();
    const maxScore = Math.max(...Object.values(scores));
    return parties.filter(p => scores[p.id] === maxScore);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    localStorage.removeItem('quizState');
  };

  if (!completed) {
    const question = questions[currentIndex];
    const selectedIdx = answers[question.id];

    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Question {currentIndex + 1} of {questions.length}</h2>
        <p>{question.text}</p>
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            style={{
              display: 'block',
              margin: '0.5rem 0',
              padding: '0.5rem 1rem',
              background: idx === selectedIdx ? '#ddd' : '#fff',
            }}
          >
            {opt.text}
          </button>
        ))}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handlePrev} disabled={currentIndex === 0} style={{ marginRight: '1rem' }}>
            Previous
          </button>
          <button onClick={handleNext} disabled={selectedIdx == null}>
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    );
  }

  const results = getResult();
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Your political alignment results</h2>
      {results.length === 1 ? (
        <p>You are most aligned with <strong>{results[0].name}</strong>.</p>
      ) : (
        <p>
          You are equally aligned with:
          <ul>
            {results.map(r => <li key={r.id}>{r.name}</li>)}
          </ul>
        </p>
      )}
      <button onClick={handleReset} style={{ marginTop: '1rem' }}>
        Reset Quiz
      </button>
    </div>
  );
}

export default App;
