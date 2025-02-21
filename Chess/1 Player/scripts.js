const boardElement = document.querySelector(".container ul");
const statusText = document.getElementById("tog");
const resetButton = document.getElementById("reset-btn");

const game = new Chess();

function updateBoard() {
  boardElement.innerHTML = "";
  const board = game.board();

  for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("div");

    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      const square = document.createElement("li");
      square.classList.add("box");
      square.dataset.row = row;
      square.dataset.col = col;

      if (piece) {
        square.innerHTML = `<img class='all-img' src="images/${piece.color}${piece.type}.png" alt="">`;
        square.style.cursor = "pointer";
      }

      square.addEventListener("click", () => handlePlayerMove(row, col));
      rowDiv.appendChild(square);
    }
    boardElement.appendChild(rowDiv);
  }
  statusText.textContent =
    game.turn() === "w" ? "White's Turn" : "Black's Turn";
  coloring();
}

function coloring() {
  document.querySelectorAll(".box").forEach((square) => {
    const row = parseInt(square.dataset.row, 10);
    const col = parseInt(square.dataset.col, 10);
    square.style.backgroundColor =
      (row + col) % 2 === 0 ? "rgb(232 235 239)" : "rgb(125 135 150)";
  });
}

let selectedSquare = null;
function handlePlayerMove(row, col) {
  if (game.turn() !== "w") return;

  const algebraicSquare = String.fromCharCode(97 + col) + (8 - row);

  if (selectedSquare) {
    const moveAttempt = {
      from: selectedSquare,
      to: algebraicSquare,
      promotion: "q",
    };
    const legalMoves = game.moves({ verbose: true }).map((m) => m.from + m.to);

    if (!legalMoves.includes(moveAttempt.from + moveAttempt.to)) {
      if (game.in_check() && game.turn() === "w") {
        statusText.textContent = "Protect your king!";
      }
      return;
    }

    const move = game.move(moveAttempt);
    if (move) {
      selectedSquare = null;
      updateBoard();
      setTimeout(makeAIMove, 500);
    }
  } else {
    const piece = game.get(algebraicSquare);
    if (piece && piece.color === "w") {
      selectedSquare = algebraicSquare;
      highlightMoves(algebraicSquare);
    }
  }
}

function highlightMoves(square) {
  document.querySelectorAll(".box").forEach((el) => (el.style.border = "none"));
  const moves = game.moves({ square, verbose: true });
  moves.forEach((move) => {
    const target = document.querySelector(
      `[data-row='${8 - move.to[1]}'][data-col='${move.to.charCodeAt(0) - 97}']`
    );
    if (target) target.style.border = "2px solid greenyellow";
  });
}

function makeAIMove() {
  if (game.game_over() || game.turn() !== "b") return;

  statusText.textContent = "AI is thinking...";

  const depth = parseInt(document.getElementById("difficulty").value);

  setTimeout(() => {
    const bestMove = minimaxRoot(depth, game, true);
    game.move(bestMove);
    updateBoard();
    statusText.textContent =
      game.turn() === "w" ? "White's Turn" : "Black's Turn";
  }, 100);
}

const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

function evaluateBoard(game) {
  let evaluation = 0;
  const board = game.board();

  board.forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        const value = pieceValues[piece.type] || 0;
        evaluation += piece.color === "w" ? value : -value;
      }
    });
  });
  return evaluation;
}

function checkGameStatus() {
  if (game.in_checkmate()) {
    statusText.textContent =
      game.turn() === "w"
        ? "Black Wins by Checkmate!"
        : "White Wins by Checkmate!";
  } else if (game.in_stalemate()) {
    statusText.textContent = "Stalemate! The game is a draw.";
  } else if (game.in_check()) {
    statusText.textContent =
      game.turn() === "w" ? "White is in Check!" : "Black is in Check!";
  } else {
    statusText.textContent =
      game.turn() === "w" ? "White's Turn" : "Black's Turn";
  }
}

function minimax(depth, game, isMaximizing) {
  if (depth === 0) return evaluateBoard(game);

  const moves = game.moves();
  let bestValue = isMaximizing ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    const value = minimax(depth - 1, game, !isMaximizing);
    game.undo();

    bestValue = isMaximizing
      ? Math.max(bestValue, value)
      : Math.min(bestValue, value);
  }
  return bestValue;
}

function minimaxRoot(depth, game, isMaximizing) {
  const moves = game.moves();
  let bestMove = null;
  let bestValue = -Infinity;

  for (const move of moves) {
    game.move(move);
    const value = minimax(depth - 1, game, !isMaximizing);
    game.undo();

    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }
  return bestMove;
}

resetButton.addEventListener("click", () => {
  game.reset();
  updateBoard();
});

updateBoard();
