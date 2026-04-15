const colorCard = document.getElementById('colorCard');
const options = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('nextButton');
const langSelect = document.getElementById('langSelect');
const questionText = document.getElementById('questionText');

const colors = [
  { id: 'red', names: { zh: '红色', yue: '紅色', en: 'red' }, value: '#ff5a5a' },
  { id: 'yellow', names: { zh: '黄色', yue: '黃色', en: 'yellow' }, value: '#ffd54f' },
  { id: 'blue', names: { zh: '蓝色', yue: '藍色', en: 'blue' }, value: '#4fa8ff' },
  { id: 'green', names: { zh: '绿色', yue: '綠色', en: 'green' }, value: '#65d08c' },
  { id: 'purple', names: { zh: '紫色', yue: '紫色', en: 'purple' }, value: '#a964ff' },
  { id: 'orange', names: { zh: '橙色', yue: '橙色', en: 'orange' }, value: '#ff9a4f' }
];

const shapes = [
  { id: 'circle', names: { zh: '圆形', yue: '圓形', en: 'circle' } },
  { id: 'square', names: { zh: '方块', yue: '方塊', en: 'square' } },
  { id: 'triangle', names: { zh: '三角形', yue: '三角形', en: 'triangle' } }
];

let currentColor;
let currentShape;
let currentLang = 'zh';

const langMap = {
  zh: 'zh-CN',
  yue: 'yue-HK',
  en: 'en-US'
};

function say(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langMap[currentLang] || 'en-US';
  utterance.rate = currentLang === 'en' ? 1.0 : 0.9;
  utterance.pitch = currentLang === 'en' ? 1.0 : 1.1;
  const voices = speechSynthesis.getVoices();
  const langPrefix = utterance.lang.split('-')[0].toLowerCase();
  let matched = voices.find(voice => voice.lang.toLowerCase().startsWith(langPrefix));

  if (currentLang === 'en') {
    const preferred = ['google us english', 'microsoft zira', 'samantha', 'alex', 'en-us', 'english'];
    matched = voices.find(voice =>
      voice.lang.toLowerCase().startsWith('en') &&
      preferred.some(name => voice.name.toLowerCase().includes(name))
    ) || matched;
  }

  if (!matched && currentLang === 'yue') {
    matched = voices.find(voice => voice.lang.toLowerCase().startsWith('zh'));
  }

  if (matched) utterance.voice = matched;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function getQuestionText() {
  if (currentLang === 'yue') return '佢係咩顏色？';
  if (currentLang === 'en') return 'What color is this?';
  return '它是什么颜色？';
}

function getCorrectText() {
  const colorName = currentColor.names[currentLang];
  const shapeName = currentShape.names[currentLang];
  if (currentLang === 'yue') return `回答正確！呢個係${colorName}嘅${shapeName}。`;
  if (currentLang === 'en') return `Correct! This is a ${colorName} ${shapeName}.`;
  return `回答正确！这是${colorName}的${shapeName}。`;
}

function getCorrectSpeakText() {
  if (currentLang === 'yue') return `回答正確，呢個係${currentColor.names.yue}嘅${currentShape.names.yue}。`;
  if (currentLang === 'en') return `Correct! This is a ${currentColor.names.en} ${currentShape.names.en}.`;
  return `回答正确，這是${currentColor.names.zh}的${currentShape.names.zh}。`;
}

function getWrongText() {
  if (currentLang === 'yue') return '再試一次，睇下係咪呢個顏色。';
  if (currentLang === 'en') return 'Try again, check if it is this color.';
  return '再试一次，看看是不是这个颜色。';
}

function getPromptText() {
  if (currentLang === 'yue') return '小朋友，呢個係咩顏色？';
  if (currentLang === 'en') return 'Little friend, what color is this?';
  return '小朋友，这是什么颜色？';
}

function createShape() {
  colorCard.innerHTML = '';
  const shape = document.createElement('div');
  shape.classList.add('shape', currentShape.id);
  if (currentShape.id !== 'triangle') {
    shape.style.backgroundColor = currentColor.value;
  } else {
    shape.style.borderBottomColor = currentColor.value;
  }
  colorCard.appendChild(shape);
}

function pickQuestion() {
  const colorIndex = Math.floor(Math.random() * colors.length);
  currentColor = colors[colorIndex];
  currentShape = shapes[Math.floor(Math.random() * shapes.length)];
  createShape();
  feedback.textContent = '';
  questionText.textContent = getQuestionText();
  say(getPromptText());
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function renderOptions() {
  options.innerHTML = '';
  const otherColors = colors.filter(item => item.id !== currentColor.id);
  const shuffledOthers = shuffleArray(otherColors).slice(0, 3);
  const choiceOptions = shuffleArray([...shuffledOthers, currentColor]);

  choiceOptions.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.textContent = option.names[currentLang];
    button.style.color = option.value;
    button.addEventListener('click', () => handleAnswer(option));
    options.appendChild(button);
  });
}

function updateLangButtons() {
  const buttons = langSelect.querySelectorAll('.lang-button');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  const nextLabel = currentLang === 'en' ? 'Next' : '下一题';
  nextButton.textContent = nextLabel;
  questionText.textContent = getQuestionText();
}

function handleAnswer(option) {
  if (option.id === currentColor.id) {
    const message = getCorrectText();
    feedback.textContent = message;
    feedback.style.color = '#2d7f3b';
    say(getCorrectSpeakText());
    nextButton.disabled = false;
    nextButton.focus();
  } else {
    feedback.textContent = getWrongText();
    feedback.style.color = '#d23232';
    say(getWrongText());
  }
}

langSelect.addEventListener('click', event => {
  const button = event.target.closest('.lang-button');
  if (!button) return;
  currentLang = button.dataset.lang;
  updateLangButtons();
  renderOptions();
});

nextButton.addEventListener('click', () => {
  pickQuestion();
  renderOptions();
  nextButton.disabled = true;
});

function initGame() {
  updateLangButtons();
  pickQuestion();
  renderOptions();
  nextButton.disabled = true;
}

initGame();
