// Load chess.js
const boardElement = document.querySelector(".container ul");
const statusText = document.getElementById("tog");
const resetButton = document.getElementById("reset-btn");

const game = new Chess(); // Initialize the chess game

let selectedSquare = null;

// Function to update the board visually
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

  checkGameStatus(); // Check for checkmate, stalemate, or check
  coloring();
}

// Function to color the board
function coloring() {
  document.querySelectorAll(".box").forEach((square) => {
    const row = parseInt(square.dataset.row, 10);
    const col = parseInt(square.dataset.col, 10);
    square.style.backgroundColor =
      (row + col) % 2 === 0 ? "rgb(232 235 239)" : "rgb(125 135 150)";
    square.style.border = "none"; // Reset highlights
  });
}

// Handle player move selection
function handlePlayerMove(row, col) {
  if (game.game_over()) return; // Prevent moves if the game is over

  const algebraicSquare = String.fromCharCode(97 + col) + (8 - row); // Convert row/col to algebraic notation

  if (selectedSquare) {
    // Try to move the selected piece to the clicked square
    const moveAttempt = {
      from: selectedSquare,
      to: algebraicSquare,
      promotion: "q",
    };
    const legalMoves = game.moves({ verbose: true }).map((m) => m.from + m.to);

    if (!legalMoves.includes(moveAttempt.from + moveAttempt.to)) {
      if (game.in_check()) {
        statusText.textContent = "Protect your king!";
      }
      return;
    }

    const move = game.move(moveAttempt);
    if (move) {
      selectedSquare = null; // Deselect after a valid move
      updateBoard();
    } else {
      selectedSquare = null; // Reset selection if move is invalid
      updateBoard();
    }
  } else {
    // Select a piece
    const piece = game.get(algebraicSquare);
    if (piece && piece.color === game.turn()) {
      selectedSquare = algebraicSquare;
      highlightMoves(algebraicSquare);
    }
  }
}

// Highlight legal moves for selected piece
function highlightMoves(square) {
  document.querySelectorAll(".box").forEach((el) => (el.style.border = "none"));

  const moves = game.moves({ square, verbose: true });
  moves.forEach((move) => {
    const targetRow = 8 - parseInt(move.to[1], 10);
    const targetCol = move.to.charCodeAt(0) - 97;
    const targetSquare = document.querySelector(
      `[data-row='${targetRow}'][data-col='${targetCol}']`
    );

    if (targetSquare) {
      targetSquare.style.border = "2px solid greenyellow";
    }
  });
}

// Check game status (Checkmate, Stalemate, Check)
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

// Reset game
resetButton.addEventListener("click", () => {
  game.reset();
  selectedSquare = null; // Ensure no selection remains
  updateBoard();
});

// Initialize board
updateBoard();
