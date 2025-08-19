// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import translations from './translations.js';

const LANGS = ['ro', 'ru'];

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('quizLang');
    return saved && LANGS.includes(saved) ? saved : 'ro';
  });

  const { quizTitle, questionLabel, ofLabel, back, reset, resultTitle, disclaimer, start, questions, parties } = translations[lang];

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : Array(questions.length).fill(null);
  });

  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem('quizIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [showResult, setShowResult] = useState(() => {
    const saved = localStorage.getItem('quizComplete');
    return saved === 'true';
  });

  const [fadeIn, setFadeIn] = useState(true);
  const [started, setStarted] = useState(() => {
    const saved = localStorage.getItem('quizStarted');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('quizLang', lang);
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('quizIndex', current);
    localStorage.setItem('quizComplete', showResult);
    localStorage.setItem('quizStarted', started);
  }, [answers, current, showResult, started]);

  const handleAnswer = (scores) => {
    const nxt = [...answers];
    nxt[current] = scores;
    setAnswers(nxt);
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const goBack = () => current > 0 && setCurrent(current - 1);

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
    setStarted(false);
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizIndex');
    localStorage.removeItem('quizComplete');
    localStorage.removeItem('quizStarted');
  };

  const partyKeys = Object.keys(parties);
  const totals = Object.fromEntries(partyKeys.map(key => [key, 0]));

  answers.forEach(ans => {
    if (ans) {
      partyKeys.forEach(key => {
        totals[key] += ans[key] || 0;
      });
    }
  });

  const sortedParties = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const topParties = sortedParties.slice(0, 3);

  const progressPct = Math.round(((current + (showResult ? 1 : 0)) / questions.length) * 100);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="quiz-container">
      <div className="lang-toggle">
        {LANGS.map(l => (
          <button
            key={l}
            className={lang === l ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang(l)}
          >{l.toUpperCase()}</button>
        ))}
      </div>

      {!started ? (
        <div className="start-screen fade-in">
          <h1 className="quiz-title">{quizTitle}</h1>
          <p className="disclaimer">
            {disclaimer}
          </p>
          <button className="reset-btn" onClick={() => setStarted(true)}>{start}</button>
        </div>
      ) : !showResult ? (
        <div className={fadeIn ? 'fade-in' : ''}>
          <h1 className="quiz-title">{quizTitle}</h1>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPct}%` }} />
          </div>
          <h2 className="question-header">
            {questionLabel} {current + 1} {ofLabel} {questions.length}
          </h2>
          <p className="question-text">{questions[current].text}</p>
          <div className="options">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                className="option"
                onClick={() => handleAnswer(opt.scores)}
              >
                {opt.text}
              </button>
            ))}
          </div>
          <div className="nav-buttons">
            <button
              disabled={current === 0}
              className="back-btn"
              onClick={goBack}
            >
              ← {back}
            </button>
          </div>
        </div>
      ) : (
        <div className={fadeIn ? 'fade-in' : ''}>
          <h1 className="quiz-title">{resultTitle}</h1>
          <div className="results-list">
            {topParties.map(([key, score], idx) => (
              <React.Fragment key={key}>
                <div className="result-card row-layout">
                  <span className="medal">{medals[idx]}</span>
                  <img
                    src={`/logos/${key}.png`}
                    alt={parties[key]}
                    className="party-logo"
                  />
                  <div className="party-score big-score">{score}</div>
                </div>
                {idx < topParties.length - 1 && <hr className="result-separator" />}
              </React.Fragment>
            ))}
          </div>
          <button className="reset-btn" onClick={resetQuiz}>
            {reset}
          </button>
        </div>
      )}

      <footer className="footer">
        <p>
          Vibe-coded by <a href="https://www.linkedin.com/in/marin-frecautan" target="_blank" rel="noopener noreferrer">Marin</a>
        </p>
      </footer>
    </div>
  );
}