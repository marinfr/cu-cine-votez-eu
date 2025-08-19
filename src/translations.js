const elements = {
  ro: {
    quizTitle: 'Chestionar partide Moldova',
    questionLabel: 'Întrebare',
    ofLabel: 'din',
    back: 'Înapoi',
    reset: 'Resetează chestionar',
    resultTitle: 'Rezultate:',
    start: 'Start',
    disclaimer: 'Acest chestionar este doar orientativ și nu poate înlocui o analiză atentă a programelor, valorilor și candidaților. Alegerea votului necesită mai multă reflecție decât rezultatul unui quiz.'
  },
  ru: {
    quizTitle: 'Опрос партий Молдовы',
    questionLabel: 'Вопрос',
    ofLabel: 'из',
    back: 'Назад',
    reset: 'Сбросить опрос',
    resultTitle: 'Rezultate:',
    start: 'Start',
    disclaimer: 'Acest chestionar este doar orientativ și nu poate înlocui o analiză atentă a programelor, valorilor și candidaților. Alegerea votului necesită mai multă reflecție decât rezultatul unui quiz.'
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

const questions = {
  ro: {
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
    ]
  },
  ru: {
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
    ]
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

export default deepMergeAll(elements, questions, parties);