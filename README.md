# Tic-Tac-Toe

A zero-dependency tic-tac-toe game in plain HTML/CSS/JS. Nothing to install, no build step.

## Run

Open `index.html` directly in a browser, or serve it statically.

**Important:** run the server from the repository root (the folder that contains `index.html`), otherwise the server has no page to show.

```sh
# from the repo root (the folder containing index.html):
python3 -m http.server 8000
```

If port 8000 is already in use, the server exits with `Address already in use` — pick another port, e.g. `python3 -m http.server 8080`, and visit the matching URL.

Then visit <http://localhost:8000> (or the port you chose).

### Troubleshooting

- **Blank page or "File not found" / directory listing:** you started the server from the wrong folder. Stop it (Ctrl+C), `cd` to the folder containing `index.html`, and start it again.
- **`Address already in use`:** port 8000 is taken; use another port (see above).
- **Prefer Node?** `npx serve .` also works from the repo root.

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
