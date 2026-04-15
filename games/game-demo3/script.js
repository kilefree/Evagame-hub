const cardsContainer = document.getElementById('cards');
const feedback = document.getElementById('feedback');
const langSelect = document.getElementById('langSelect');
const instructionText = document.getElementById('instructionText');

const letters = [
  { letter: 'A', emoji: '🦒', theme: { zh: '像拱桥的长颈鹿', yue: '似拱橋嘅長頸鹿', en: 'a giraffe arch' }, names: { zh: '长颈鹿', yue: '長頸鹿', en: 'giraffe' }, sound: { zh: '嘶嘶', yue: '嘶嘶', en: 'hum' } },
  { letter: 'B', emoji: '🦋', theme: { zh: '像B形的蝴蝶', yue: '似B形嘅蝴蝶', en: 'a butterfly shape' }, names: { zh: '蝴蝶', yue: '蝴蝶', en: 'butterfly' }, sound: { zh: '扇翅', yue: '扇翼', en: 'flutter' } },
  { letter: 'C', emoji: '🐢', theme: { zh: '像弯月的乌龟', yue: '似彎月嘅烏龜', en: 'a moon turtle' }, names: { zh: '乌龟', yue: '烏龜', en: 'turtle' }, sound: { zh: '咕咕', yue: '咕咕', en: 'grunt' } },
  { letter: 'D', emoji: '🐘', theme: { zh: '像D形的大象鼻子', yue: '似D形嘅大象鼻', en: 'an elephant trunk' }, names: { zh: '大象', yue: '大象', en: 'elephant' }, sound: { zh: '噗噗', yue: '噗噗', en: 'trumpet' } },
  { letter: 'E', emoji: '🦌', theme: { zh: '像E叉角的鹿', yue: '似E叉角嘅鹿', en: 'a deer antler' }, names: { zh: '鹿', yue: '鹿', en: 'deer' }, sound: { zh: '咩', yue: '咩', en: 'bleat' } },
  { letter: 'F', emoji: '🦜', theme: { zh: '像F飞起的鸟', yue: '似F飛起嘅鳥', en: 'a flying bird' }, names: { zh: '鸟', yue: '鳥', en: 'bird' }, sound: { zh: '啾啾', yue: '啾啾', en: 'chirp' } },
  { letter: 'G', emoji: '🦍', theme: { zh: '像G弯头的猩猩', yue: '似G彎頭嘅猩猩', en: 'a gorilla curve' }, names: { zh: '猩猩', yue: '猩猩', en: 'gorilla' }, sound: { zh: '呜呜', yue: '呜呜', en: 'grumble' } },
  { letter: 'H', emoji: '🐴', theme: { zh: '像H横杠的马', yue: '似H橫槓嘅馬', en: 'a horse with bars' }, names: { zh: '马', yue: '馬', en: 'horse' }, sound: { zh: '嘶', yue: '嘶', en: 'neigh' } },
  { letter: 'I', emoji: '🐍', theme: { zh: '像I竖直的蛇', yue: '似I直立嘅蛇', en: 'a vertical snake' }, names: { zh: '蛇', yue: '蛇', en: 'snake' }, sound: { zh: '嘶嘶', yue: '嘶嘶', en: 'hiss' } },
  { letter: 'J', emoji: '🦩', theme: { zh: '像J弯钩的火烈鸟', yue: '似J彎鉤嘅火烈鳥', en: 'a flamingo hook' }, names: { zh: '火烈鸟', yue: '火烈鳥', en: 'flamingo' }, sound: { zh: '呀呀', yue: '呀呀', en: 'honk' } },
  { letter: 'K', emoji: '🦉', theme: { zh: '像K展开的猫头鹰翅膀', yue: '似K展開嘅貓頭鷹翼', en: 'an owl wing' }, names: { zh: '猫头鹰', yue: '貓頭鷹', en: 'owl' }, sound: { zh: '咕咕', yue: '咕咕', en: 'hoot' } },
  { letter: 'L', emoji: '🦙', theme: { zh: '像L竖腿的羊驼', yue: '似L直腿嘅羊駝', en: 'an alpaca leg' }, names: { zh: '羊驼', yue: '羊駝', en: 'alpaca' }, sound: { zh: '咩', yue: '咩', en: 'maa' } },
  { letter: 'M', emoji: '🐻', theme: { zh: '像M山峰的熊耳', yue: '似M山峰嘅熊耳', en: 'bear ears' }, names: { zh: '熊', yue: '熊', en: 'bear' }, sound: { zh: '嗷呜', yue: '嗷呜', en: 'roar' } },
  { letter: 'N', emoji: '🐧', theme: { zh: '像N弯腿的企鹅', yue: '似N彎腿嘅企鵝', en: 'a penguin bend' }, names: { zh: '企鹅', yue: '企鵝', en: 'penguin' }, sound: { zh: '咕咕', yue: '咕咕', en: 'honk' } },
  { letter: 'O', emoji: '🐙', theme: { zh: '像O圈的章鱼', yue: '似O圈嘅章魚', en: 'an octopus ring' }, names: { zh: '章鱼', yue: '章魚', en: 'octopus' }, sound: { zh: '啊呀', yue: '啊呀', en: 'squawk' } },
  { letter: 'P', emoji: '🦚', theme: { zh: '像P展开的孔雀', yue: '似P展開嘅孔雀', en: 'a peacock fan' }, names: { zh: '孔雀', yue: '孔雀', en: 'peacock' }, sound: { zh: '咯咯', yue: '咯咯', en: 'honk' } },
  { letter: 'Q', emoji: '🦝', theme: { zh: '像Q圈尾的浣熊', yue: '似Q圈尾嘅浣熊', en: 'a raccoon tail' }, names: { zh: '浣熊', yue: '浣熊', en: 'raccoon' }, sound: { zh: '咕噜', yue: '咕嚕', en: 'chitter' } },
  { letter: 'R', emoji: '🦏', theme: { zh: '像R弯角的犀牛', yue: '似R彎角嘅犀牛', en: 'a rhino horn' }, names: { zh: '犀牛', yue: '犀牛', en: 'rhino' }, sound: { zh: '哞', yue: '哞', en: 'grunt' } },
  { letter: 'S', emoji: '🐍', theme: { zh: '像S弯曲的蛇', yue: '似S彎曲嘅蛇', en: 'a snake curl' }, names: { zh: '蛇', yue: '蛇', en: 'snake' }, sound: { zh: '嘶嘶', yue: '嘶嘶', en: 'hiss' } },
  { letter: 'T', emoji: '🦢', theme: { zh: '像T立起来的天鹅', yue: '似T直立嘅天鵝', en: 'a swan neck' }, names: { zh: '天鹅', yue: '天鵝', en: 'swan' }, sound: { zh: '啾啾', yue: '啾啾', en: 'honk' } },
  { letter: 'U', emoji: '🦄', theme: { zh: '像U弯曲的独角兽', yue: '似U彎曲嘅獨角獸', en: 'a unicorn curve' }, names: { zh: '独角兽', yue: '獨角獸', en: 'unicorn' }, sound: { zh: '嘘', yue: '嘘', en: 'sparkle' } },
  { letter: 'V', emoji: '🦅', theme: { zh: '像V展翅的鹰', yue: '似V展翅嘅鷹', en: 'a flying eagle' }, names: { zh: '鹰', yue: '鷹', en: 'eagle' }, sound: { zh: '呜呜', yue: '嗚嗚', en: 'screech' } },
  { letter: 'W', emoji: '🦫', theme: { zh: '像W张开的水獭', yue: '似W張開嘅水獺', en: 'an otter spread' }, names: { zh: '水獭', yue: '水獺', en: 'otter' }, sound: { zh: '噜噜', yue: '噜噜', en: 'chuckle' } },
  { letter: 'X', emoji: '🦌', theme: { zh: '像X交叉的鹿角', yue: '似X交叉嘅鹿角', en: 'crossed deer horns' }, names: { zh: '鹿', yue: '鹿', en: 'deer' }, sound: { zh: '咩', yue: '咩', en: 'bleat' } },
  { letter: 'Y', emoji: '🦚', theme: { zh: '像Y叉形的孔雀尾', yue: '似Y叉形嘅孔雀尾', en: 'a peacock tail' }, names: { zh: '孔雀', yue: '孔雀', en: 'peacock' }, sound: { zh: '咯咯', yue: '咯咯', en: 'honk' } },
  { letter: 'Z', emoji: '🦓', theme: { zh: '像Z斜纹的斑马', yue: '似Z斜紋嘅斑馬', en: 'a zebra stripe' }, names: { zh: '斑马', yue: '斑馬', en: 'zebra' }, sound: { zh: '嘶嘶', yue: '嘶嘶', en: 'bray' } }
];

let currentLang = 'zh';
const langMap = { zh: 'zh-CN', yue: 'yue-HK', en: 'en-US' };

function say(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langMap[currentLang] || 'en-US';
  utterance.rate = currentLang === 'en' ? 1.0 : 0.95;
  utterance.pitch = 1.0;
  const voices = speechSynthesis.getVoices();
  const langKey = utterance.lang.split('-')[0].toLowerCase();
  let matched = voices.find(voice => voice.lang.toLowerCase().startsWith(langKey));
  if (currentLang === 'en') {
    const preferred = ['google', 'samantha', 'alex', 'zira', 'victoria'];
    matched = voices.find(voice =>
      voice.lang.toLowerCase().startsWith('en') &&
      preferred.some(name => voice.name.toLowerCase().includes(name))
    ) || matched;
  }
  if (matched) utterance.voice = matched;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getInstruction() {
  if (currentLang === 'yue') return '請左右滑動，選擇你喜歡嘅字母動物卡片。';
  if (currentLang === 'en') return 'Swipe left or right to find a letter animal card.';
  return '请左右滑动，选择你喜欢的字母动物卡片。';
}

function getFeedbackText(animal) {
  const letter = animal.letter;
  const name = animal.names[currentLang];
  if (currentLang === 'yue') return `好叻！${letter} 好似 ${name}。`;
  if (currentLang === 'en') return `Great! ${letter} looks like ${name}.`;
  return `太棒了！${letter} 像 ${name}。`;
}

function getSpeakText(animal) {
  const letter = animal.letter;
  const name = animal.names[currentLang];
  if (currentLang === 'yue') return `${letter}，似 ${name}，佢會話 ${animal.sound.yue}`;
  if (currentLang === 'en') return `${letter} looks like ${name}. It says ${animal.sound.en}.`;
  return `${letter}，像 ${name}，它会说 ${animal.sound.zh}`;
}

function createAnimalCard(animal) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'card';
  card.innerHTML = `
    <div class="card__letter">${animal.letter}</div>
    <div class="card__emoji">${animal.emoji}</div>
    <div class="card__name">${animal.theme[currentLang]}</div>
  `;
  card.addEventListener('click', () => handleCardClick(animal));
  return card;
}

function renderCards() {
  cardsContainer.innerHTML = '';
  const displayLetters = shuffleArray(letters);
  displayLetters.forEach(animal => cardsContainer.appendChild(createAnimalCard(animal)));
  instructionText.textContent = getInstruction();
}

function handleCardClick(animal) {
  feedback.textContent = getFeedbackText(animal);
  feedback.style.color = '#2c5e33';
  say(getSpeakText(animal));
}

function updateLangButtons() {
  const buttons = langSelect.querySelectorAll('.lang-button');
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
  renderCards();
  instructionText.textContent = getInstruction();
  feedback.textContent = '';
}

langSelect.addEventListener('click', event => {
  const button = event.target.closest('.lang-button');
  if (!button) return;
  currentLang = button.dataset.lang;
  updateLangButtons();
});

function initGame() {
  renderCards();
}

initGame();
