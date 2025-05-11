// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Translation objects with per-option scores
const translations = {
  ro: {
    quizTitle: 'Chestionar partide Moldova',
    questionLabel: 'Întrebare',
    ofLabel: 'din',
    back: 'Înapoi',
    reset: 'Resetează chestionar',
    resultTitle: 'Partidul cu care ești aliniat:',
    questions: [
      {
        text: 'Moldova ar trebui să crească cheltuielile sociale.',
        options: [
          { text: 'Complet de acord', scores: { pas: 1, psrm: 3, pdm: 1, ppda: 0 } },
          { text: 'De acord',        scores: { pas: 1, psrm: 2, pdm: 1, ppda: 0 } },
          { text: 'Neutru',           scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Împotrivă',        scores: { pas: 3, psrm: 0, pdm: 0, ppda: 0 } }
        ]
      },
      {
        text: 'Moldova ar trebui să aprofundeze legăturile cu UE în loc de Rusia.',
        options: [
          { text: 'În totalitate UE', scores: { pas: 3, psrm: 0, pdm: 2, ppda: 1 } },
          { text: 'Mai mult UE',      scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Neutru',           scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Mai mult Rusia',   scores: { pas: 0, psrm: 3, pdm: 0, ppda: 1 } }
        ]
      },
      {
        text: 'Subvențiile agricole pentru fermierii mici ar trebui majorate.',
        options: [
          { text: 'Da, majorat',      scores: { pas: 1, psrm: 0, pdm: 1, ppda: 3 } },
          { text: 'Menținut',         scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Reducere mică',     scores: { pas: 0, psrm: 1, pdm: 2, ppda: 1 } },
          { text: 'Eliminat',         scores: { pas: 0, psrm: 2, pdm: 0, ppda: 1 } }
        ]
      },
      {
        text: 'Reforma anticorupție este o prioritate pentru tine.',
        options: [
          { text: 'Maxim prioritară', scores: { pas: 3, psrm: 0, pdm: 1, ppda: 2 } },
          { text: 'Prioritară',       scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Puțin prioritară', scores: { pas: 0, psrm: 1, pdm: 1, ppda: 0 } },
          { text: 'Neimportantă',      scores: { pas: 0, psrm: 3, pdm: 1, ppda: 0 } }
        ]
      },
      {
        text: 'Moldova ar trebui să investească masiv în energie regenerabilă.',
        options: [
          { text: 'Absolut',          scores: { pas: 2, psrm: 0, pdm: 1, ppda: 3 } },
          { text: 'Echilibrat',       scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Neutru',           scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Nu',               scores: { pas: 0, psrm: 3, pdm: 0, ppda: 0 } }
        ]
      }
    ],
    parties: {
      pas: 'PAS (Partidul Acțiune și Solidaritate)',
      psrm: 'PSRM (Partidul Socialiștilor)',
      pdm: 'PDM (Partidul Democrat)',
      ppda: 'PPDA (Platforma DA)'
    }
  },
  
  ru: {
    quizTitle: 'Опрос партий Молдовы',
    questionLabel: 'Вопрос',
    ofLabel: 'из',
    back: 'Назад',
    reset: 'Сбросить опрос',
    resultTitle: 'Партия, с которой вы совпадаете:',
    questions: [
      {
        text: 'Молдове следует увеличить социальные расходы.',
        options: [
          { text: 'Полностью согласен', scores: { pas: 1, psrm: 3, pdm: 1, ppda: 0 } },
          { text: 'Согласен',           scores: { pas: 1, psrm: 2, pdm: 1, ppda: 0 } },
          { text: 'Нейтрально',         scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Не согласен',        scores: { pas: 3, psrm: 0, pdm: 0, ppda: 0 } }
        ]
      },
      {
        text: 'Молдове следует укреплять связи с ЕС вместо России.',
        options: [
          { text: 'Только ЕС',          scores: { pas: 3, psrm: 0, pdm: 2, ppda: 1 } },
          { text: 'Скорее ЕС',         scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Нейтрально',        scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Скорее Россия',     scores: { pas: 0, psrm: 3, pdm: 0, ppda: 1 } }
        ]
      },
      {
        text: 'Сельскохозяйственные субсидии для мелких фермеров следует увеличить.',
        options: [
          { text: 'Да, увеличить',      scores: { pas: 1, psrm: 0, pdm: 1, ppda: 3 } },
          { text: 'Оставить',          scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Немного сократить',  scores: { pas: 0, psrm: 1, pdm: 2, ppda: 1 } },
          { text: 'Отменить',          scores: { pas: 0, psrm: 2, pdm: 0, ppda: 1 } }
        ]
      },
      {
        text: 'Борьба с коррупцией – приоритет для вас.',
        options: [
          { text: 'Крайне приоритетно', scores: { pas: 3, psrm: 0, pdm: 1, ppda: 2 } },
          { text: 'Приоритетно',       scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Средний приоритет', scores: { pas: 0, psrm: 1, pdm: 1, ppda: 0 } },
          { text: 'Не важно',          scores: { pas: 0, psrm: 3, pdm: 1, ppda: 0 } }
        ]
      },
      {
        text: 'Молдова должна существенно инвестировать в возобновляемую энергию.',
        options: [
          { text: 'Абсолютно',         scores: { pas: 2, psrm: 0, pdm: 1, ppda: 3 } },
          { text: 'Сбалансированно',   scores: { pas: 2, psrm: 0, pdm: 1, ppda: 1 } },
          { text: 'Нейтрально',        scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
          { text: 'Нет',               scores: { pas: 0, psrm: 3, pdm: 0, ppda: 0 } }
        ]
      }
    ],
    parties: {
      pas: 'ПАС (Партия Действия и Солидарности)',
      psrm: 'ПСРМ (Партия Социалистов)',
      pdm: 'ПДМ (Демократическая Партия)',
      ppda: 'ППДА (Платформа ДОСТОИНСТВА и ИСТИНЫ)'
    }
  }
};

const LANGS = ['ro', 'ru'];
const PARTY_KEYS = ['pas', 'psrm', 'pdm', 'ppda'];

export default function App() {
  // Language state
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('quizLang');
    return saved && LANGS.includes(saved) ? saved : 'ro';
  });

  // Localized content
  const { quizTitle, questionLabel, ofLabel, back, reset, resultTitle, questions, parties } = translations[lang];

  // Quiz state
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

  // Persist language
  useEffect(() => {
    localStorage.setItem('quizLang', lang);
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [lang]);

  // Persist quiz state
  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('quizIndex', current);
    localStorage.setItem('quizComplete', showResult);
  }, [answers, current, showResult]);

  // Handle answer selection
  const handleAnswer = (scores) => {
    const nxt = [...answers];
    nxt[current] = scores;
    setAnswers(nxt);
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  // Go back
  const goBack = () => current > 0 && setCurrent(current - 1);

  // Reset quiz
  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizIndex');
    localStorage.removeItem('quizComplete');
  };

  // Compute party totals
  const totals = PARTY_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  answers.forEach(ans => {
    if (ans) {
      PARTY_KEYS.forEach(key => {
        totals[key] += ans[key] || 0;
      });
    }
  });

  const winnerKey = PARTY_KEYS.reduce((maxKey, key) =>
    totals[key] > totals[maxKey] ? key : maxKey,
  PARTY_KEYS[0]);

  // Progress
  const progressPct = Math.round(((current + (showResult ? 1 : 0)) / questions.length) * 100);

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

      {!showResult ? (
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
          <h2 className="result-title">{resultTitle}</h2>
          <div className="result-card">
            <img
              src={`/logos/${winnerKey}.png`}
              alt={translations[lang].parties[winnerKey]}
              className="party-logo"
            />
            <p className="party-name">
              {translations[lang].parties[winnerKey]}
            </p>
          </div>
          <button className="reset-btn" onClick={resetQuiz}>
            {reset}
          </button>
        </div>
      )}
    </div>
  );
}