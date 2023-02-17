const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const cells = document.querySelectorAll('.board-cell');

let turn = 'X';
let gameOver = false;

// функция для проверки победителя
function checkWin() {
  // ...
}

// функция для обработки хода игрока
function handleTurn(e) {
  if (!gameOver && e.target.textContent === '') {
    e.target.textContent = turn;
    checkWin();
    turn = turn === 'X' ? 'O' : 'X';
    new Audio('notification.mp3').play();
  }
}

// функция для сброса игры
function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  turn = 'X';
  gameOver = false;
}

cells.forEach(cell => cell.addEventListener('click', handleTurn));
resetButton.addEventListener('click', resetGame);
