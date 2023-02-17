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

const player = 'O';
const bot = 'X';

const checkWin = () => {
	for (let i = 0; i < winningCombos.length; i++) {
		const [a, b, c] = winningCombos[i];
		if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
			return board[a];
		}
	}
	return null;
};

function minimax(depth, maximizingPlayer, alpha, beta) {
    const score = evaluate();
    if (score === 10) {
        return score - depth;
    } else if (score === -10) {
        return score + depth;
    } else if (board.includes('') === false) {
        return 0;
    }

    if (maximizingPlayer) {
        let maxScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = bot;
                let score = minimax(depth + 1, false, alpha, beta);
                board[i] = '';
                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = player;
                let score = minimax(depth + 1, true, alpha, beta);
                board[i] = '';
                minScore = Math.min(minScore, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minScore;
    }
}

function evaluate() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === bot) {
                return 10;
            } else {
                return -10;
            }
        }
    }
    return 0;
}

function makeMove(cell, index) {
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
}

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

