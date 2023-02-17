const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const cells = document.querySelectorAll('.board-cell');

let turn = 'X';
let gameOver = false;

// Ход игрока всегда первый
let currentPlayer = "X";

// Все победные комбинации
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Ход бота
function botMove() {
  let availableCells = getAvailableCells();
  let index = Math.floor(Math.random() * availableCells.length);
  let cell = availableCells[index];
  board[cell] = "O";
  cellElements[cell].classList.add("O");
  currentPlayer = "X";
  checkWin();
}

// Получение доступных ячеек для хода
function getAvailableCells() {
  return board
    .map((cell, index) => {
      if (cell === "") {
        return index;
      }
      return null;
    })
    .filter((cell) => cell !== null);
}

// Изменение текущего игрока и добавление соответствующего класса ячейке
function handlePlayerMove(cell, index) {
  cell.classList.add(currentPlayer);
  board[index] = currentPlayer;
  currentPlayer = "O";
  checkWin();
  setTimeout(botMove, 500);
}

// Проверка на победу
function checkWin() {
  let isWin = false;
  for (let combination of winningCombinations) {
    if (
      board[combination[0]] !== "" &&
      board[combination[0]] === board[combination[1]] &&
      board[combination[1]] === board[combination[2]]
    ) {
      isWin = true;
      break;
    }
  }

  if (isWin) {
    cellElements.forEach((cell) => (cell.style.pointerEvents = "none"));
    winMessage.innerText = "WIN";
    winMessage.style.display = "block";
  } else if (getAvailableCells().length === 0) {
    cellElements.forEach((cell) => (cell.style.pointerEvents = "none"));
    winMessage.innerText = "TIE";
    winMessage.style.display = "block";
  }
}

// Обработчик клика по ячейке
function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute("data-cell-index"));

  if (board[index] !== "" || currentPlayer !== "X") {
    return;
  }

  handlePlayerMove(cell, index);
}

// Обработчик клика по кнопке "Сбросить"
function handleReset() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cellElements.forEach((cell) => {
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.style.pointerEvents = "auto";
  });
  winMessage.style.display = "none";
}

// Добавление обработчиков событий
cellElements.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", handleReset);
