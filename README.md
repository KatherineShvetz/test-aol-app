# Tic-Tac-Toe

A zero-dependency tic-tac-toe game in plain HTML/CSS/JS. Nothing to install, no build step.

## Run

Open `index.html` directly in a browser, or serve it statically:

```sh
python3 -m http.server
```

Then visit <http://localhost:8000>.

## Test

```sh
node game.test.js
```

Runs 21 tests with no framework — the only requirement is Node.js.

## Project structure

| File           | Purpose                                  |
| -------------- | ---------------------------------------- |
| `index.html`   | Page: status line, board, reset button   |
| `style.css`    | Styling (dark theme, win highlighting)   |
| `game.js`      | Pure game engine + DOM wiring            |
| `game.test.js` | Standalone Node test harness (21 tests)  |

## Features / rules

- 3x3 board, two players (X and O); **X starts** each game.
- Win detection across all 8 lines (rows, columns, diagonals) — winning cells highlighted.
- Draw detection when the board fills with no winner.
- **New Game** button resets the board and turn.
- Invalid clicks ignored: occupied cells, clicks after game over.
