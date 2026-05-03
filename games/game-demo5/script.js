// 游戏状态
const savedLanguage = localStorage.getItem('demo5Language') || 'zh-CN';

let gameState = {
  score: 0,
  questionNum: 0,
  maxRange: 10,
  language: savedLanguage,
  currentQuestion: null,
  isAnswered: false
};

// DOM 元素
const rangeSelect = document.getElementById('rangeSelect');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const settingsPanel = document.querySelector('.settings-panel');
const questionNum = document.getElementById('questionNum');
const scoreValue = document.getElementById('scoreValue');
const equation = document.getElementById('equation');
const answersGrid = document.getElementById('answersGrid');
const feedback = document.getElementById('feedback');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDesc = document.getElementById('overlayDesc');
const finalScore = document.getElementById('finalScore');
const totalQuestions = document.getElementById('totalQuestions');
const restartButton = document.getElementById('restartButton');
const speakButton = document.getElementById('speakButton');

// 数字朗读文本 - 优化粤语和英文
const numberTexts = {
  'zh-CN': {
    0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九',
    10: '十', 11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五', 16: '十六', 17: '十七', 18: '十八', 19: '十九',
    20: '二十', 30: '三十', 40: '四十', 50: '五十', 60: '六十', 70: '七十', 80: '八十', 90: '九十',
    100: '一百'
  },
  'zh-TW': {
    0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九',
    10: '十', 11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五', 16: '十六', 17: '十七', 18: '十八', 19: '十九',
    20: '二十', 30: '三十', 40: '四十', 50: '五十', 60: '六十', 70: '七十', 80: '八十', 90: '九十',
    100: '一百'
  },
  'en': {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
    10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety',
    100: 'one hundred'
  }
};

// 操作符文本
const operatorTexts = {
  'zh-CN': { '+': '加', '-': '减' },
  'zh-TW': { '+': '加', '-': '减' },
  'en': { '+': 'plus', '-': 'minus' }
};

// 反馈文本
const feedbackTexts = {
  'zh-CN': { correct: '正确！', wrong: '错误！' },
  'zh-TW': { correct: '正確！', wrong: '錯誤！' },
  'en': { correct: 'Correct!', wrong: 'Wrong!' }
};

// 语言设置映射 - 使用更准确的语音代码
const languageSettings = {
  'zh-CN': {
    lang: 'zh-CN',
    rate: 0.95,
    pitch: 1.05,
    voiceNames: ['Mandarin', 'Google 普通话', 'Huihui', 'Yun']
  },
  'zh-TW': {
    lang: 'zh-TW',
    rate: 0.9,
    pitch: 1.05,
    voiceNames: ['Cantonese', 'Yue', 'Google 香港', 'Tracy', 'Mei']
  },
  'en': {
    lang: 'en-US',
    rate: 1.05,
    pitch: 1,
    voiceNames: ['Google US English', 'Microsoft Zira', 'Alex', 'Samantha', 'Daniel']
  }
};

// 获取可用的语音并选择最佳匹配
function getBestVoice(lang) {
  const voices = window.speechSynthesis.getVoices();
  const settings = languageSettings[lang] || languageSettings['zh-CN'];

  if (!voices || voices.length === 0) {
    return null;
  }

  const findByName = (part) => voices.find(v => v.name.includes(part) || v.voiceURI.includes(part));

  if (settings.voiceNames) {
    for (const namePart of settings.voiceNames) {
      const match = findByName(namePart);
      if (match) {
        return match;
      }
    }
  }

  let bestVoice = voices.find(v => v.lang === settings.lang)
    || voices.find(v => v.lang.startsWith(settings.lang.split('-')[0]))
    || voices.find(v => v.lang.includes(settings.lang.split('-')[0]));

  if (!bestVoice) {
    if (lang === 'zh-TW') {
      bestVoice = voices.find(v => v.lang.includes('yue'))
        || voices.find(v => v.lang.includes('zh'))
        || findByName('Cantonese');
    } else if (lang === 'en') {
      bestVoice = voices.find(v => v.lang.includes('en'))
        || findByName('English');
    }
  }

  return bestVoice;
}

// 初始化事件监听
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
speakButton.addEventListener('click', speakQuestion);

// 语言切换按钮事件
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const newLang = btn.dataset.lang;
    changeLanguage(newLang);
  });
});

updateLanguageButtonState();

answersGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('answer-button') && !gameState.isAnswered) {
    handleAnswer(parseInt(e.target.dataset.index));
  }
});

// 开始游戏
function startGame() {
  gameState.maxRange = parseInt(rangeSelect.value);
  gameState.score = 0;
  gameState.questionNum = 0;
  gameState.isAnswered = false;

  settingsPanel.classList.add('hidden');
  gameArea.classList.remove('hidden');
  overlay.classList.add('hidden');

  updateLanguageButtonState();
  nextQuestion();
}

// 重新开始
function restartGame() {
  gameState.score = 0;
  gameState.questionNum = 0;
  gameState.isAnswered = false;

  overlay.classList.add('hidden');
  feedback.classList.add('hidden');

  nextQuestion();
}

// 生成下一题
function nextQuestion() {
  gameState.questionNum++;
  gameState.isAnswered = false;

  // 更新显示
  questionNum.textContent = gameState.questionNum;
  scoreValue.textContent = gameState.score;
  feedback.classList.add('hidden');

  // 随机决定加法或减法
  const isAddition = Math.random() > 0.5;
  
  let num1, num2, correctAnswer;
  
  if (isAddition) {
    num1 = Math.floor(Math.random() * gameState.maxRange) + 1;
    num2 = Math.floor(Math.random() * gameState.maxRange) + 1;
    correctAnswer = num1 + num2;
    gameState.currentQuestion = {
      num1: num1,
      num2: num2,
      operator: '+',
      answer: correctAnswer
    };
  } else {
    // 确保减法结果为正数
    num1 = Math.floor(Math.random() * gameState.maxRange) + 1;
    num2 = Math.floor(Math.random() * gameState.maxRange) + 1;
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    correctAnswer = larger - smaller;
    gameState.currentQuestion = {
      num1: larger,
      num2: smaller,
      operator: '-',
      answer: correctAnswer
    };
    num1 = larger;
    num2 = smaller;
  }

  showQuestion(num1, num2, isAddition ? '+' : '-', correctAnswer);
}

// 显示题目
function showQuestion(num1, num2, operator, correctAnswer) {
  equation.textContent = `${num1} ${operator} ${num2} = ?`;

  // 生成四个答案选项
  const answers = generateAnswers(correctAnswer, num1, num2, operator);

  // 随机打乱答案顺序
  const shuffled = shuffleArray([...answers]);

  // 更新按钮
  const buttons = answersGrid.querySelectorAll('.answer-button');
  buttons.forEach((btn, index) => {
    btn.textContent = shuffled[index];
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
  });

  // 保存正确答案索引
  gameState.currentAnswer = shuffled.indexOf(correctAnswer);
}

// 生成答案选项
function generateAnswers(correctAnswer, num1, num2, operator) {
  const answers = new Set();
  answers.add(correctAnswer);

  // 生成干扰选项
  while (answers.size < 4) {
    let wrongAnswer;
    const offset = Math.floor(Math.random() * 10) - 5;
    wrongAnswer = correctAnswer + offset;

    // 确保干扰答案不为负数且不重复
    if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
      answers.add(wrongAnswer);
    }
  }

  return Array.from(answers);
}

// 洗牌数组
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 处理答案
function handleAnswer(selectedIndex) {
  if (gameState.isAnswered) return;

  gameState.isAnswered = true;
  const buttons = answersGrid.querySelectorAll('.answer-button');
  const isCorrect = selectedIndex === gameState.currentAnswer;

  // 显示正确答案和用户选择
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === gameState.currentAnswer) {
      btn.classList.add('correct');
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // 更新分数
  if (isCorrect) {
    gameState.score++;
    scoreValue.textContent = gameState.score;
  }

  // 显示反馈
  const lang = gameState.language;
  feedback.textContent = isCorrect ? feedbackTexts[lang].correct : feedbackTexts[lang].wrong;
  feedback.classList.remove('hidden', 'correct', 'wrong');
  feedback.classList.add(isCorrect ? 'correct' : 'wrong');

  // 朗读答案
  speakResult(isCorrect);

  // 延迟进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 朗读题目
function speakQuestion() {
  if (!gameState.currentQuestion) return;

  const q = gameState.currentQuestion;
  const lang = gameState.language;
  const num1 = formatNumberForSpeech(q.num1, lang);
  const num2 = formatNumberForSpeech(q.num2, lang);
  const opText = operatorTexts[lang][q.operator];

  let text;
  if (lang === 'en') {
    text = `${num1} ${opText} ${num2} equals?`;
  } else if (lang === 'zh-TW') {
    text = `${num1} ${opText} ${num2} 等於幾多？`;
  } else {
    text = `${num1} ${opText} ${num2} 等于多少？`;
  }

  speak(text);
}

// 朗读结果
function speakResult(isCorrect) {
  const lang = gameState.language;
  const text = isCorrect 
    ? (lang === 'en' ? 'Correct!' : feedbackTexts[lang].correct)
    : (lang === 'en' ? 'Wrong!' : feedbackTexts[lang].wrong);
  
  speak(text);
}

// 使用 Web Speech API 朗读 - 使用最佳语音
function speak(text) {
  if ('speechSynthesis' in window) {
    // 停止当前朗读
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 使用优化后的语言设置
    const settings = languageSettings[gameState.language] || languageSettings['zh-CN'];
    utterance.lang = settings.lang;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = 1;
    
    // 尝试获取最佳语音
    const voice = getBestVoice(gameState.language);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

function updateLanguageButtonState() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === gameState.language);
  });
  document.documentElement.lang = gameState.language === 'en' ? 'en' : gameState.language;
  localStorage.setItem('demo5Language', gameState.language);
}

function formatNumberForSpeech(num, lang) {
  const texts = numberTexts[lang];
  if (texts[num]) {
    return texts[num];
  }

  if (lang === 'en') {
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const units = num % 10;
      return units === 0 ? texts[tens] : `${texts[tens]} ${texts[units]}`;
    }
    return String(num);
  }

  const tens = Math.floor(num / 10);
  const units = num % 10;
  const tensText = tens === 1 ? '十' : texts[tens * 10];
  return units === 0 ? tensText : `${tensText}${texts[units]}`;
}

// 初始化语音列表（某些浏览器需要）
if ('speechSynthesis' in window) {
  // 预先加载语音列表
  window.speechSynthesis.getVoices();
  
  // 某些浏览器需要在用户交互后才能获取语音
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
    };
  }
}

// 切换语言
function changeLanguage(newLang) {
  gameState.language = newLang;
  updateLanguageButtonState();
  
  // 如果有当前题目，朗读当前题目
  if (gameState.currentQuestion) {
    setTimeout(() => speakQuestion(), 100);
  }
}

// 显示结束画面
function showGameOver() {
  overlayTitle.textContent = gameState.language === 'en' ? 'Game Over' : '游戏结束';
  finalScore.textContent = gameState.score;
  totalQuestions.textContent = gameState.questionNum;
  
  const descText = gameState.language === 'en' 
    ? `Your score: ${gameState.score} / ${gameState.questionNum}`
    : `你的得分：${gameState.score} / ${gameState.questionNum}`;
  overlayDesc.innerHTML = descText;
  
  overlay.classList.remove('hidden');
}