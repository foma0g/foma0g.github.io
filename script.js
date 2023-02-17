// Получаем ссылки на ячейки игрового поля, на элементы сообщений и на кнопки
const cells = document.querySelectorAll(".cell");
const messageDisplay = document.getElementById("message");
const turnDisplay = document.getElementById("turn");
const resetButton = document.getElementById("reset");
const switchButton = document.getElementById("switch");

// Определяем массив для хранения значений ячеек
let boardValues = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

// Определяем константы для значений ячеек
const EMPTY = -1;
const HUMAN = 1;
const BOT = 0;

// Определяем константы для сообщений
const HUMAN_WIN_MESSAGE = "You win!";
const BOT_WIN_MESSAGE = "You lose.";
const DRAW_MESSAGE = "Draw.";

// Определяем переменные для отслеживания текущего игрока и состояния игры
let currentPlayer = HUMAN;
let gameInProgress = true;

// Функция для смены игрока
function switchPlayer() {
	currentPlayer = (currentPlayer === HUMAN) ? BOT : HUMAN;
	turnDisplay.textContent = (currentPlayer === HUMAN) ? "Your turn" : "Bot's turn";
}

// Функция для получения доступных ходов на текущем игровом поле
function getAvailableMoves(board) {
	return board.reduce((moves, cell, index) => {
		if (cell === EMPTY) {
			moves.push(index);
		}
		return moves;
	}, []);
}

// Функция для оценки текущего игрового состояния для бота
function evaluate(board, depth) {
	// Определяем возможные выигрышные комбинации
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	// Проверяем наличие победы в текущем состоянии игры
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] === board[b] && board[b] === board[c]) {
			if (board[a] === BOT) {
				return 10 - depth;
			} else if (board[a] === HUMAN) {
				return depth - 10;
			}
		}
	}

	// Если победителя нет, то возвращаем ничью
	return 0;
}

// Функция для минимакс-оценки текущего состояния игры
function minimax(board, depth, alpha, beta, maximizingPlayer) {
	// Проверяем наличие победителя в текущем состоянии игры
	const score = evaluate(board, depth);
	if (score !== 0) {
		return score;
	}

	// Проверяем наличие свободных ячеек на игровом поле
	const availableMoves = getAvailableMoves(board);
