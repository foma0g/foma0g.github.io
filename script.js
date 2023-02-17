function minimaxAlphaBeta(board, depth, alpha, beta, maximizingPlayer) {
  const winner = checkWinner(board);
  if (winner !== null) {
    return winner * (depth + 1);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 1;
        const eval = minimaxAlphaBeta(board, depth + 1, alpha, beta, false);
        board[i] = null;
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = -1;
        const eval = minimaxAlphaBeta(board, depth + 1, alpha, beta, true);
        board[i] = null;
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minEval;
  }
}

function findBestMoveAlphaBeta(board) {
  let bestEval = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 1;
      const eval = minimaxAlphaBeta(board, 0, -Infinity, Infinity, false);
      board[i] = null;
      if (eval > bestEval) {
        bestEval = eval;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
