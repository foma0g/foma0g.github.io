const board = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameOver = false;

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const switchPlayer = () => {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
	for (let i = 0; i < winningCombos.length; i++) {
		const [a, b, c] = winningCombos[i];
		if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
			return board[a];
		}
	}
	return null;
};

const minimax = (depth, alpha, beta, maximizingPlayer) => {
	const result = checkWin();
	if (result !== null) {
		if (result === 'X') {
			return { score: -10 };
		} else if (result === 'O') {
			return { score: 10 };
		} else {
			return { score: 0 };
		}
	}

	if (maximizingPlayer) {
		let bestScore = -Infinity;
		let bestMove = null;
		for (let i = 0; i < board.length; i++) {
			if (board[i] === '') {
				board[i] = 'O';
				const score = minimax(depth + 1, alpha, beta, false).score;
				board[i] = '';
				if (score > bestScore) {
					bestScore = score;
					bestMove = i;
				}
				alpha = Math.max(alpha, bestScore);
				if (beta <= alpha) {
					break;
				}
			}
		}
		return depth === 0 ? bestMove : { score: bestScore };
	} else {
		let bestScore = Infinity;
		let bestMove = null;
		for (let i = 0; i < board.length; i++) {
			if (board[i] === '') {
				board[i] = 'X';
				const score = minimax(depth + 1, alpha, beta, true).score;
				board[i] = '';
				if (score < bestScore) {
					bestScore = score;
					bestMove = i;
				}
				beta = Math.min(beta, bestScore);
				if (beta <= alpha) {
					break;
				}
			}
		}
		return depth === 0 ? bestMove : { score: bestScore };
	}
};

const makeMove = (cell, index) => {
	board[index] = currentPlayer;
	cell.textContent = currentPlayer;
	const winner = checkWin();
	if (winner !== null) {
		gameOver = true;
		if (winner === 'X') {
			message.textContent = 'You win!';
		} else {
			message.textContent = 'You lose!';
		}
		return;
	}
	switchPlayer();
	const bestMove = minimax(0, -Infinity, Infinity, true);
	board[bestMove] = currentPlayer;
	cells[bestMove].textContent = currentPlayer;
	const computerWinner = checkWin();
	if (computerWinner !== null) {
		gameOver = true;
		if (computerWinner === 'X') {
			message.textContent = 'You win!';
		} else {
			message.textContent = 'You lose!';
		}
		return;
	}
	switchPlayer();
};

cells.forEach((cell, index) => {
	cell.addEventListener('click', () => {
		if (!gameOver && board[index] === '') {
			makeMove(cell, index);
		}
	});
});

resetButton.addEventListener('click', () => {
	board.fill('');
	cells.forEach(cell => {
		cell.textContent = '';
	});
	message.textContent = '';
	currentPlayer = 'X';
	gameOver = false;
});

