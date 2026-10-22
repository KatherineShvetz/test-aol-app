/* Standalone test harness for game.js — run with: node game.test.js */
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

// Load game.js in a sandbox with a stub `window` so no DOM is needed.
var code = fs.readFileSync(path.join(__dirname, 'game.js'), 'utf8');
var sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
var ttt = sandbox.window.ticTacToe;

var failures = 0;
var count = 0;

function check(name, actual, expected) {
  count++;
  var ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures++;
    console.log('FAIL: ' + name + '\n  expected: ' + JSON.stringify(expected) +
      '\n  actual:   ' + JSON.stringify(actual));
  } else {
    console.log('ok: ' + name);
  }
}

// --- createGame ---
var g = ttt.createGame();
check('new game board is empty', g.board, ['', '', '', '', '', '', '', '', '']);
check('X starts', g.current, 'X');
check('new game is not over', g.over, false);

// --- basic moves / turn taking ---
g = ttt.move(g, 0, 'X');
check('X move recorded', g.board[0], 'X');
check('turn passes to O', g.current, 'O');
g = ttt.move(g, 1, 'O');
check('O move recorded', g.board[1], 'O');
check('turn passes back to X', g.current, 'X');

// --- invalid moves ---
check('occupied cell rejected', ttt.move(g, 0, 'X'), null);
check('wrong player rejected', ttt.move(g, 2, 'O'), null);
check('out-of-range index rejected', ttt.move(g, 9, 'X'), null);

// --- X wins via top row ---
g = ttt.createGame();
g = ttt.move(g, 0, 'X');
g = ttt.move(g, 3, 'O');
g = ttt.move(g, 1, 'X');
g = ttt.move(g, 4, 'O');
g = ttt.move(g, 2, 'X');
check('X win detected', g.winner, 'X');
check('game over after win', g.over, true);
check('winning line reported', g.winningLine, [0, 1, 2]);
check('move after game over rejected', ttt.move(g, 8, 'O'), null);
check('status text on win', ttt.statusText(g), 'X wins!');

// --- O wins via a column ---
g = ttt.createGame();
g = ttt.move(g, 0, 'X'); g = ttt.move(g, 1, 'O');
g = ttt.move(g, 3, 'X'); g = ttt.move(g, 4, 'O');
g = ttt.move(g, 5, 'X'); g = ttt.move(g, 7, 'O');
check('O win via column', g.winner, 'O');
check('O winning line', g.winningLine, [1, 4, 7]);

// --- draw ---
g = ttt.createGame();
g = ttt.move(g, 0, 'X'); g = ttt.move(g, 1, 'O');
g = ttt.move(g, 2, 'X'); g = ttt.move(g, 4, 'O');
g = ttt.move(g, 3, 'X'); g = ttt.move(g, 5, 'O');
g = ttt.move(g, 7, 'X'); g = ttt.move(g, 6, 'O');
g = ttt.move(g, 8, 'X');
check('draw detected', g.winner, 'draw');
check('draw is over', g.over, true);
check('status text on draw', ttt.statusText(g), "It's a draw!");

// --- reset semantics ---
check('fresh game differs from finished one', ttt.createGame().board, ['', '', '', '', '', '', '', '', '']);

console.log('\n' + (count - failures) + '/' + count + ' tests passed');
process.exit(failures === 0 ? 0 : 1);
