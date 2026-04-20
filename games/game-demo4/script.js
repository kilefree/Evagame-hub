const levelNumber = document.getElementById('levelNumber');
const levelTitle = document.getElementById('levelTitle');
const levelHint = document.getElementById('levelHint');
const previewImage = document.getElementById('previewImage');
const puzzleBoard = document.getElementById('puzzleBoard');
const pieceTray = document.getElementById('pieceTray');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
const nextButton = document.getElementById('nextButton');

const levels = [
  {
    title: '快乐彩虹',
    hint: '把彩虹和云朵拼回晴朗的天空。',
    columns: 2,
    rows: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 260">
      <rect width="500" height="260" fill="#c4f2ff" />
      <circle cx="90" cy="70" r="50" fill="#ffe36b" />
      <path d="M60 70a4 4 0 0 1 8 0a4 4 0 0 1-8 0z" fill="#ffdb4f" />
      <path d="M45 90c30-12 40-28 52-36" stroke="#ffe36b" stroke-width="10" fill="none" stroke-linecap="round" />
      <path d="M160 200c34-58 110-89 166-62c48 22 70 72 68 104" fill="#fff" stroke="#fff" stroke-width="18" />
      <path d="M120 190c18-30 50-48 85-52c46-5 84 17 104 48" fill="#f2f9ff" />
      <path d="M185 160c8-54 50-82 92-102c38-18 86-24 129 4" stroke="#fb5f9b" stroke-width="22" fill="none" stroke-linecap="round" />
      <path d="M148 170c26-52 78-74 120-82c38-7 82-4 120 17" stroke="#fcbf49" stroke-width="22" fill="none" stroke-linecap="round" />
      <path d="M100 210c8-36 38-64 70-76c30-12 64-10 95 2" stroke="#45c6ff" stroke-width="22" fill="none" stroke-linecap="round" />
      <path d="M95 210c-16 0-32 10-39 24c-6 14-4 30 7 40c20 18 56 24 102 24s85-12 102-24c11-10 13-26 7-40c-7-14-23-24-39-24" fill="#ffffff" />
      <ellipse cx="140" cy="220" rx="56" ry="28" fill="#eef8ff" />
      <ellipse cx="310" cy="230" rx="68" ry="34" fill="#eef8ff" />
    </svg>`
  },
  {
    title: '甜甜熊猫',
    hint: '将可爱的熊猫拼回森林里的竹林。',
    columns: 2,
    rows: 2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#e6fcff" />
      <circle cx="155" cy="150" r="110" fill="#ffffff" />
      <circle cx="340" cy="180" r="90" fill="#ffffff" />
      <ellipse cx="170" cy="210" rx="55" ry="45" fill="#000" />
      <ellipse cx="340" cy="210" rx="45" ry="38" fill="#000" />
      <circle cx="172" cy="145" r="18" fill="#fff" />
      <circle cx="342" cy="145" r="15" fill="#fff" />
      <ellipse cx="250" cy="240" rx="38" ry="25" fill="#000" />
      <path d="M210 260c20 20 50 22 75 4" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" />
      <path d="M90 370c20-18 58-28 110-24c32 2 68 12 96 30" stroke="#3aa859" stroke-width="24" fill="none" stroke-linecap="round" />
      <path d="M320 420c16-22 44-38 78-44" stroke="#3aa859" stroke-width="24" fill="none" stroke-linecap="round" />
      <path d="M380 240c8-32 32-62 58-68c24-6 52 2 68 20" stroke="#60c97d" stroke-width="22" fill="none" stroke-linecap="round" />
    </svg>`
  },
  {
    title: '恐龙乐园',
    hint: '把恐龙拼成一张快乐的小动物图片。',
    columns: 3,
    rows: 3,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#d5f8ef" />
      <path d="M120 330c0-70 54-130 120-130s120 60 120 130" fill="#62c89d" />
      <path d="M110 330c0-80 62-145 140-145s140 65 140 145" fill="#4ab684" />
      <circle cx="210" cy="220" r="48" fill="#86d6b4" />
      <circle cx="310" cy="220" r="38" fill="#86d6b4" />
      <circle cx="180" cy="210" r="14" fill="#000" />
      <circle cx="300" cy="205" r="11" fill="#000" />
      <path d="M190 260c16 12 38 14 56 8" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round" />
      <path d="M180 380c-16 0-24 24-24 40c0 18 16 32 36 32s36-14 36-32c0-16-8-40-24-40" fill="#4ab684" />
      <path d="M280 382c-12 0-16 18-16 32c0 14 10 28 26 28s26-14 26-28c0-14-4-32-16-32" fill="#4ab684" />
      <path d="M140 120c30 22 72 24 114 16c30-6 56-18 78-36" stroke="#fd9d9a" stroke-width="24" fill="none" stroke-linecap="round" />
      <ellipse cx="370" cy="120" rx="82" ry="32" fill="#fff" opacity="0.9" />
      <ellipse cx="360" cy="110" rx="72" ry="22" fill="#fff" opacity="0.8" />
    </svg>`
  },
  {
    title: '小狗冒险',
    hint: '完成小狗的拼图，看看它在花园里玩耍。',
    columns: 4,
    rows: 4,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#e6f7ff" />
      <circle cx="150" cy="210" r="80" fill="#f8d98a" />
      <circle cx="360" cy="220" r="108" fill="#f8d98a" />
      <circle cx="150" cy="210" r="22" fill="#000" />
      <circle cx="360" cy="220" r="24" fill="#000" />
      <path d="M180 250c20 12 48 14 72 6" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round" />
      <path d="M320 320c-40 30-98 38-146 16" stroke="#c67e4c" stroke-width="28" fill="none" stroke-linecap="round" />
      <path d="M96 240c-32 54-26 120 18 166c18 18 44 28 70 28s52-10 70-28c22-22 38-52 40-86" fill="#f8d98a" />
      <path d="M350 340c32-16 76-18 114 2c22 12 36 34 36 58c0 36-30 64-66 64s-66-28-66-64c0-24 14-46 36-58" fill="#6bc1ff" />
      <path d="M120 430c32-14 72-18 108-10" stroke="#8cb8ff" stroke-width="24" fill="none" stroke-linecap="round" />
      <path d="M400 380c20-24 62-26 90-6" stroke="#99dd8a" stroke-width="20" fill="none" stroke-linecap="round" />
    </svg>`
  },
  {
    title: '气球小熊',
    hint: '最后一关，拼出小熊和五颜六色的气球。',
    columns: 5,
    rows: 5,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#fff2e8" />
      <circle cx="250" cy="140" r="64" fill="#fbbf91" />
      <circle cx="210" cy="180" r="28" fill="#8b5cf6" />
      <circle cx="295" cy="180" r="26" fill="#fb7185" />
      <path d="M170 220c38-26 88-24 128 4" stroke="#9c6644" stroke-width="24" fill="none" stroke-linecap="round" />
      <circle cx="240" cy="340" r="108" fill="#f7d28b" />
      <circle cx="190" cy="300" r="42" fill="#000" />
      <circle cx="290" cy="300" r="40" fill="#000" />
      <path d="M220 360c14 12 34 14 50 6" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round" />
      <path d="M250 448c0 16-12 28-26 28s-26-12-26-28v-80" stroke="#9c6644" stroke-width="18" fill="none" stroke-linecap="round" />
      <path d="M274 448c0 16 12 28 26 28s26-12 26-28v-80" stroke="#9c6644" stroke-width="18" fill="none" stroke-linecap="round" />
      <path d="M230 408c24 20 68 20 92 0" stroke="#9c6644" stroke-width="16" fill="none" stroke-linecap="round" />
      <ellipse cx="280" cy="420" rx="70" ry="20" fill="#fff7f0" />
      <path d="M120 90c-26 44 2 88 40 88s64-44 40-88c-14-24-36-34-60-28" fill="#a5f3fc" />
      <path d="M390 90c26 44-2 88-40 88s-64-44-40-88c14-24 36-34 60-28" fill="#fbcfe8" />
      <path d="M200 130c0 30-4 80 18 100" stroke="#f59e0b" stroke-width="14" fill="none" />
      <path d="M320 120c0 28 4 72-20 94" stroke="#22c55e" stroke-width="14" fill="none" />
    </svg>`
  }
];

let currentLevelIndex = 0;
let selectedPiece = null;
let currentLevel = null;

function createImageDataUri(svg) {
  return 'data:image/svg+xml,' + encodeURIComponent(svg.trim());
}

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function updateStatus(text) {
  statusText.textContent = text;
}

function getBackgroundPosition(level, pieceIndex) {
  const col = pieceIndex % level.columns;
  const row = Math.floor(pieceIndex / level.columns);
  const x = level.columns === 1 ? 0 : (col / (level.columns - 1)) * 100;
  const y = level.rows === 1 ? 0 : (row / (level.rows - 1)) * 100;
  return `${x}% ${y}%`;
}

function loadLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[currentLevelIndex];
  const imageUrl = createImageDataUri(currentLevel.svg);

  levelNumber.textContent = currentLevelIndex + 1;
  levelTitle.textContent = currentLevel.title;
  levelHint.textContent = currentLevel.hint;
  previewImage.style.backgroundImage = `url('${imageUrl}')`;
  previewImage.style.backgroundSize = 'cover';
  previewImage.style.backgroundPosition = 'center';

  puzzleBoard.style.setProperty('--columns', currentLevel.columns);
  puzzleBoard.innerHTML = '';
  pieceTray.innerHTML = '';
  selectedPiece = null;

  const pieceCount = currentLevel.columns * currentLevel.rows;
  const boardPieces = Array.from({ length: pieceCount }, (_, index) => index);
  const trayOrder = shuffle(boardPieces.slice());

  puzzleBoard.style.gridTemplateColumns = `repeat(${currentLevel.columns}, minmax(0, 1fr))`;

  boardPieces.forEach(index => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'board-cell';
    cell.dataset.target = index;
    cell.addEventListener('click', () => handleBoardClick(cell));
    puzzleBoard.appendChild(cell);
  });

  trayOrder.forEach(pieceIndex => {
    const piece = document.createElement('button');
    piece.type = 'button';
    piece.className = 'puzzle-piece';
    piece.dataset.piece = pieceIndex;
    piece.style.backgroundImage = `url('${imageUrl}')`;
    piece.style.backgroundSize = `${currentLevel.columns * 100}% ${currentLevel.rows * 100}%`;
    piece.style.backgroundPosition = getBackgroundPosition(currentLevel, pieceIndex);
    piece.addEventListener('click', () => selectPiece(piece));
    pieceTray.appendChild(piece);
  });

  nextButton.disabled = true;
  nextButton.textContent = currentLevelIndex < levels.length - 1 ? '下一关' : '完成全部';
  updateStatus('点击拼图碎片，再点击目标位置进行放置。');
}

function selectPiece(piece) {
  if (selectedPiece) {
    selectedPiece.classList.remove('selected');
  }

  if (selectedPiece === piece) {
    selectedPiece = null;
    updateStatus('已取消选择拼图碎片。');
    return;
  }

  selectedPiece = piece;
  selectedPiece.classList.add('selected');
  updateStatus('已选择拼图碎片，点击目标位置放置。');
}

function restorePieceToTray(piece) {
  piece.classList.remove('selected');
  piece.classList.remove('placed');
  pieceTray.appendChild(piece);
}

function placePieceToCell(piece, cell) {
  if (cell.firstElementChild) {
    restorePieceToTray(cell.firstElementChild);
  }

  cell.appendChild(piece);
  piece.classList.add('placed');
  piece.classList.remove('selected');
  selectedPiece = null;
  updateStatus('拼图碎片已放置。继续放置下一个碎片。');
  checkCompletion();
}

function handleBoardClick(cell) {
  if (selectedPiece && selectedPiece.parentElement === cell) {
    restorePieceToTray(selectedPiece);
    updateStatus('已撤回放置的碎片。');
    return;
  }

  if (selectedPiece) {
    placePieceToCell(selectedPiece, cell);
    return;
  }

  if (cell.firstElementChild) {
    selectPiece(cell.firstElementChild);
    updateStatus('已选择该位置上的碎片，选择目标位置进行移动。');
  } else {
    updateStatus('请先选择一个拼图碎片，再点击目标位置。');
  }
}

function checkCompletion() {
  const cells = Array.from(puzzleBoard.children);
  const completed = cells.every(cell => {
    const piece = cell.firstElementChild;
    return piece && Number(piece.dataset.piece) === Number(cell.dataset.target);
  });

  if (!completed) {
    return;
  }

  updateStatus('恭喜你，拼图完成啦！');
  nextButton.disabled = false;
}

restartButton.addEventListener('click', () => {
  loadLevel(currentLevelIndex);
});

nextButton.addEventListener('click', () => {
  if (currentLevelIndex < levels.length - 1) {
    loadLevel(currentLevelIndex + 1);
  } else {
    loadLevel(0);
  }
});

loadLevel(0);
