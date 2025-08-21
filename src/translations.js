const elements = {
  ro: {
    quizStartTitle: 'Nu ştii cu cine să votezi...',
    questionLabel: 'Întrebarea',
    ofLabel: 'din',
    back: 'Înapoi',
    reset: 'Resetează chestionarul',
    resultTitle: 'Rezultate:',
    start: 'Start',
    disclaimer: 'la Alegerile pentru Parlamentul Republicii Moldova din <strong>28 septembrie 2025</strong>? Te ajut. Dar să știi că acest chestionar nu poate înlocui o analiză atentă a programelor și valorilor ale candidaților. Decizia ta merită mai multă reflecție decât rezultatul unui quiz.',
    privacy: 'Toată interacțiunea și rezultatul sunt stocate doar la tine și nu sunt transmise nimănui.'
  },
  ru: {
    quizStartTitle: 'Nu ştii cu cine să votezi...',
    questionLabel: 'Întrebarea',
    ofLabel: 'din',
    back: 'Înapoi',
    reset: 'Resetează chestionarul',
    resultTitle: 'Rezultate:',
    start: 'Start',
    disclaimer: 'la Alegerile pentru Parlamentul Republicii Moldova din <strong>28 septembrie 2025</strong>? Te ajut. Dar să știi că acest chestionar nu poate înlocui o analiză atentă a programelor și valorilor ale candidaților. Decizia ta merită mai multă reflecție decât rezultatul unui quiz.',
    privacy: 'Toată interacțiunea și rezultatul sunt stocate doar la tine și nu sunt transmise nimănui.'
  }
}

const parties = {
  ro: {
    parties: {
      pas: 'PAS (Partidul Acțiune și Solidaritate)',
      psrm: 'PSRM (Partidul Socialiștilor)',
      pdm: 'PDM (Partidul Democrat)',
      ppda: 'PPDA (Platforma DA)'
    }
  },
  ru: {
    parties: {
      pas: 'ПАС (Партия Действия и Солидарности)',
      psrm: 'ПСРМ (Партия Социалистов)',
      pdm: 'ПДМ (Демократическая Партия)',
      ppda: 'ППДА (Платформа ДОСТОИНСТВА и ИСТИНЫ)'
    }
  }
}

const roQuestions = {
  ro: {
    questions: {
      1: {
        text: 'Moldova ar trebui să crească cheltuielile sociale.',
        options: {
          1: { text: 'Complet de acord' },
          2: { text: 'De acord' },
          3: { text: 'Neutru' },
          4: { text: 'Împotrivă' }
        }
      },
      2: {
        text: 'Test.',
        options: {
          1: { text: 'Complet de acord' },
          2: { text: 'De acord' },
          3: { text: 'Neutru' },
          4: { text: 'Împotrivă' }
        }
      }
    }
  }
}

const ruQuestions = {
  ru: {
    questions: {
      1: {
        text: 'Moldova ar trebui să crească cheltuielile sociale.',
        options: {
          1: { text: 'Complet de acord' },
          2: { text: 'De acord' },
          3: { text: 'Neutru' },
          4: { text: 'Împotrivă' }
        }
      },
      2: {
        text: 'Test.',
        options: {
          1: { text: 'Complet de acord' },
          2: { text: 'De acord' },
          3: { text: 'Neutru' },
          4: { text: 'Împotrivă' }
        }
      }
    }
  }
}

const scores = {
  questions: {
    1: {
      options: {
        1: { scores: { pas: 1, psrm: 3, pdm: 1, ppda: 5 } },
        2: { scores: { pas: 1, psrm: 2, pdm: 1, ppda: 0 } },
        3: { scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
        4: { scores: { pas: 3, psrm: 0, pdm: 0, ppda: 0 } }
      }
    },
    2: {
      options: {
        1: { scores: { pas: 1, psrm: 3, pdm: 1, ppda: 5 } },
        2: { scores: { pas: 1, psrm: 2, pdm: 1, ppda: 0 } },
        3: { scores: { pas: 1, psrm: 1, pdm: 1, ppda: 1 } },
        4: { scores: { pas: 3, psrm: 0, pdm: 0, ppda: 0 } }
      }
    }
  }
}

const deepMergeAll = (...objects) => {
  const result = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && typeof result[key] === 'object' && result[key] !== null) {
          result[key] = deepMergeAll(result[key], obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
  }

  return result;
};

const roQuestionsWithScores = deepMergeAll(roQuestions, { ro: scores });
const ruQuestionsWithScores = deepMergeAll(ruQuestions, { ru: scores });

export default deepMergeAll(elements, parties, roQuestionsWithScores, ruQuestionsWithScores);