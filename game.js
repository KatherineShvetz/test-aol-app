/* Tic-Tac-Toe — plain JS, no dependencies. */
(function () {
  'use strict';

  var WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  function createGame() {
    return {
      board: new Array(9).fill(''),
      current: 'X',
      over: false,
      winner: null,
      winningLine: null
    };
  }

  /** Returns 'X', 'O' (winner), 'draw', or null if game is still going. */
  function evaluate(board) {
    for (var i = 0; i < WIN_LINES.length; i++) {
      var line = WIN_LINES[i];
      var a = board[line[0]];
      if (a && a === board[line[1]] && a === board[line[2]]) {
        return { winner: a, line: line };
      }
    }
    if (board.every(function (c) { return c !== ''; })) {
      return { winner: 'draw', line: null };
    }
    return null;
  }

  /**
   * Attempt to place `player` at `index`.
   * Returns the new game state, or null if the move is invalid
   * (occupied cell, game over, or wrong player).
   */
  function move(game, index, player) {
    if (game.over) return null;
    if (index < 0 || index > 8) return null;
    if (game.board[index] !== '') return null;
    if (player !== game.current) return null;

    var board = game.board.slice();
    board[index] = player;
    var result = evaluate(board);

    return {
      board: board,
      current: player === 'X' ? 'O' : 'X',
      over: result !== null,
      winner: result ? result.winner : null,
      winningLine: result ? result.line : null
    };
  }

  function statusText(game) {
    if (!game.over) return game.current + "'s turn";
    if (game.winner === 'draw') return "It's a draw!";
    return game.winner + ' wins!';
  }

  var state = createGame();

  function render() {
    var boardEl = document.getElementById('board');
    var statusEl = document.getElementById('status');
    if (!boardEl || !statusEl) return;

    if (boardEl.childElementCount !== 9) {
      boardEl.innerHTML = '';
      for (var i = 0; i < 9; i++) {
        var cell = document.createElement('button');
        cell.className = 'cell';
        cell.type = 'button';
        cell.dataset.index = String(i);
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-label', 'Cell ' + (i + 1));
        boardEl.appendChild(cell);
      }
    }

    for (var j = 0; j < 9; j++) {
      var c = boardEl.children[j];
      c.textContent = state.board[j];
      var taken = state.board[j] !== '';
      c.classList.toggle('taken', taken);
      var isWinning = state.over && state.winner !== 'draw' &&
        state.winningLine && state.winningLine.indexOf(j) !== -1;
      c.classList.toggle('win', !!isWinning);
      c.disabled = taken || state.over;
    }

    statusEl.textContent = statusText(state);
  }

  // DOM wiring (skipped in non-browser environments, e.g. tests).
  if (typeof document !== 'undefined' && document && document.getElementById) {
    document.addEventListener('DOMContentLoaded', function () {
      render();

      document.getElementById('board').addEventListener('click', function (e) {
        var cell = e.target.closest('.cell');
        if (!cell) return;
        var next = move(state, Number(cell.dataset.index), state.current);
        if (next) {
          state = next;
          render();
        }
      });

      document.getElementById('reset').addEventListener('click', function () {
        state = createGame();
        render();
      });
    });
  }

  window.ticTacToe = { createGame: createGame, move: move, evaluate: evaluate, statusText: statusText };
})();
