const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const pauseButton = document.getElementById('pauseButton');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDesc = document.getElementById('overlayDesc');
const scoreValue = document.getElementById('scoreValue');
const controlButtons = document.querySelectorAll('.control-button');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 8, y: 8 }];
let velocity = { x: 0, y: 0 };
let food = { x: 12, y: 10 };
let score = 0;
let running = false;
let paused = false;
let gameOver = false;
let gameLoopId;

const colors = {
  bg: '#05040c',
  grid: 'rgba(255, 255, 255, 0.05)',
  snake: '#ff3cff',
  snakeHead: '#08f0ff',
  food: '#4cff8e',
  trail: 'rgba(138, 43, 226, 0.35)'
};

function resetGame() {
  snake = [{ x: 8, y: 8 }];
  velocity = { x: 0, y: 0 };
  placeFood();
  score = 0;
  scoreValue.textContent = score;
  running = false;
  paused = false;
  gameOver = false;
  setPauseVisibility(false);
  showOverlay('赛博朋克 贪吃蛇', '点击开始游戏进入高速闪烁模式。');
}

function setPauseVisibility(visible) {
  if (visible) {
    pauseButton.classList.remove('hidden');
    pauseButton.textContent = '暂停';
  } else {
    pauseButton.classList.add('hidden');
  }
}

function showOverlay(title, description) {
  overlayTitle.textContent = title;
  overlayDesc.textContent = description;
  overlay.classList.remove('hidden');
  startButton.classList.remove('hidden');
  restartButton.classList.add('hidden');
}

function showGameOver() {
  running = false;
  gameOver = true;
  overlayTitle.textContent = '游戏结束';
  overlayDesc.textContent = `最终得分 ${score}，按下重新开始再战一次。`;
  startButton.classList.add('hidden');
  restartButton.classList.remove('hidden');
  overlay.classList.remove('hidden');
  setPauseVisibility(false);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };

  if (snake.some(part => part.x === food.x && part.y === food.y)) {
    placeFood();
  }
}

function gameTick() {
  if (!running) return;

  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    showGameOver();
    return;
  }

  if (snake.some(part => part.x === head.x && part.y === head.y)) {
    showGameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreValue.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  drawScene();
}

function drawScene() {
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = colors.food;
  ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);

  snake.slice(1).forEach(part => {
    ctx.fillStyle = colors.trail;
    ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = colors.snakeHead;
  ctx.fillRect(snake[0].x * gridSize + 1, snake[0].y * gridSize + 1, gridSize - 2, gridSize - 2);
  ctx.strokeStyle = colors.snake;
  ctx.strokeRect(snake[0].x * gridSize + 1, snake[0].y * gridSize + 1, gridSize - 2, gridSize - 2);
}

function startGame() {
  if (running) return;
  if (velocity.x === 0 && velocity.y === 0) {
    velocity = { x: 1, y: 0 };
  }
  running = true;
  paused = false;
  setPauseVisibility(true);
  overlay.classList.add('hidden');
  if (gameLoopId) clearInterval(gameLoopId);
  gameLoopId = setInterval(gameTick, 120);
}

function setDirection(direction) {
  if (!running && !gameOver) {
    startGame();
  }

  switch (direction) {
    case 'up':
      if (velocity.y !== 1) velocity = { x: 0, y: -1 };
      break;
    case 'down':
      if (velocity.y !== -1) velocity = { x: 0, y: 1 };
      break;
    case 'left':
      if (velocity.x !== 1) velocity = { x: -1, y: 0 };
      break;
    case 'right':
      if (velocity.x !== -1) velocity = { x: 1, y: 0 };
      break;
  }
}

let touchStartPoint = null;

function handleTouchStart(event) {
  if (event.changedTouches.length === 0) return;
  const touch = event.changedTouches[0];
  touchStartPoint = { x: touch.clientX, y: touch.clientY };
}

function handleTouchEnd(event) {
  if (!touchStartPoint || event.changedTouches.length === 0) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStartPoint.x;
  const dy = touch.clientY - touchStartPoint.y;
  touchStartPoint = null;

  if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

  if (Math.abs(dx) > Math.abs(dy)) {
    setDirection(dx > 0 ? 'right' : 'left');
  } else {
    setDirection(dy > 0 ? 'down' : 'up');
  }
}

function pauseGame() {
  if (!running) return;
  running = false;
  paused = true;
  clearInterval(gameLoopId);
  pauseButton.textContent = '继续';
}

function togglePause() {
  if (running) {
    pauseGame();
  } else if (paused) {
    startGame();
  }
}

function restartGame() {
  resetGame();
  startGame();
}

window.addEventListener('keydown', event => {
  const key = event.key;
  if (!running && !gameOver && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
    startGame();
  }
  switch (key) {
    case 'ArrowUp':
    case 'w':
      if (velocity.y !== 1) velocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
    case 's':
      if (velocity.y !== -1) velocity = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
    case 'a':
      if (velocity.x !== 1) velocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
    case 'd':
      if (velocity.x !== -1) velocity = { x: 1, y: 0 };
      break;
  }
});

controlButtons.forEach(button => {
  button.addEventListener('click', () => {
    setDirection(button.dataset.direction);
  });
});

canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

startButton.addEventListener('click', () => {
  startGame();
});

restartButton.addEventListener('click', () => {
  restartGame();
});

pauseButton.addEventListener('click', () => {
  togglePause();
});

resetGame();
