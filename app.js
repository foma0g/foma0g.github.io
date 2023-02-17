// Selecting all the cells and the reset button
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const switchButton = document.querySelector(".switch");

// Defining the game state
let currentPlayer = "X";
let gameLive = true;
let botTurn = false;

// Function to handle clicking on cells
const handleCellClick = (e) => {
  const cell = e.target;
  // Check if the game is live and the cell is empty
  if (gameLive && cell.textContent === "") {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    checkWin();
    // Switch the player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!botTurn && gameLive) {
      botTurn = true;
      setTimeout(makeBotMove, 500);
    }
  }
};

// Function to check for a win
const checkWin = () => {
  const cellsArray = Array.from(cells);
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
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      cellsArray[a].textContent &&
      cellsArray[a].textContent === cellsArray[b].textContent &&
      cellsArray[a].textContent === cellsArray[c].textContent
    ) {
      gameLive = false;
      cellsArray[a].classList.add("winner");
      cellsArray[b].classList.add("winner");
      cellsArray[c].classList.add("winner");
      const winner = cellsArray[a].textContent;
      if (winner === "X") {
        alert("You win!");
      } else {
        alert("Bot wins!");
      }
    }
  });
  if (!cellsArray.some((cell) => cell.textContent === "") && gameLive) {
    gameLive = false;
    alert("Tie!");
  }
};

// Function to make a bot move
const makeBotMove = () => {
  const cellsArray = Array.from(cells);
  const emptyCells = cellsArray.filter((cell) => cell.textContent === "");
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomIndex].textContent = "O";
  emptyCells[randomIndex].classList.add("O");
  checkWin();
  botTurn = false;
  currentPlayer = "X";
};

// Adding an event listener to each cell
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Adding an event listener to the reset button
resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner", "X", "O");
  });
  gameLive = true;
  currentPlayer = "X";
  botTurn = false;
});

// Adding an event listener to the switch button
switchButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner", "X", "O");
  });
  gameLive = true;
  if (currentPlayer === "X") {
    currentPlayer = "O";
    botTurn = true;
    makeBotMove();
  } else {
    currentPlayer = "X";
    bot
