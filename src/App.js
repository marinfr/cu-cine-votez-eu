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

  const { quizStartTitle, questionLabel, ofLabel, back, reset, resultTitle, disclaimer, privacy, start, parties, questions, options } = translations[lang];

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : Array(Object.keys(questions).length).fill(null);
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
    nxt[current - 1] = scores;
    setAnswers(nxt);
    if (current < Object.keys(questions).length) setCurrent(current + 1);
    else setShowResult(true);
  };

  const goBack = () => current > 1 ? setCurrent(current - 1) : resetQuiz();

  const resetQuiz = () => {
    setAnswers(Array(Object.keys(questions).length).fill(null));
    setStarted(false);
    setShowResult(false);
    setCurrent(0);
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
  const topParties = sortedParties.slice(0, 5);

  const progressPct = Math.round(((current - 1 + (showResult ? 1 : 0)) / Object.keys(questions).length) * 100);

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
          <h1 className="quiz-title">{quizStartTitle}</h1>
          <p className="disclaimer" dangerouslySetInnerHTML={{ __html: disclaimer }}>
          </p>
          <p className="disclaimer">
            {privacy}
          </p>
          <button className="reset-btn" onClick={() => { setCurrent(1); setStarted(true); }}>{start}</button>
        </div>
      ) : !showResult ? (
        <div className={fadeIn ? 'fade-in' : ''}>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPct}%` }} />
          </div>
          <h2 className="question-header">
            {questionLabel} {current} {ofLabel} {Object.keys(questions).length}
          </h2>
          <p className="question-text">{questions[current].text}</p>
          <div className="options">
            {Object.entries(options).map(([i, opt]) => (
              <button
                key={i}
                className="option"
                onClick={() => handleAnswer(questions[current].options[i])}
              >
                {opt}
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
                <p className="party-name">{parties[key]}</p>
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
        <p>
          <a href="https://github.com/marinfr/cu-cine-votez-eu" target="_blank" rel="noopener noreferrer">
            <img alt="github" className="gh-link" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"/>
          </a>
        </p>
      </footer>
    </div>
  );
}