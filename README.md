# Overtime

A text-driven strategy game in the lineage of *A Dark Room* — climb the ladder
at a prestigious tech company through a series of small, escalating choices.
No accounts, no backend, no tracking. Single HTML file, runs entirely in the
browser.

## Play it

Open `index.html` in any browser. That's the whole install.

If this repo is pushed to GitHub with Pages enabled (Settings → Pages →
deploy from `main` / root), it'll be playable at:

```
https://<your-username>.github.io/overtime/
```

## Status

Early vertical slice — Act I of a planned five-act structure. Engine
(state, log renderer, fork system, ladder screen, cocoon track) is built;
content is being written act by act.

## Structure

Everything lives in `index.html` on purpose — engine code and narrative
content are separated into clearly marked sections within the file so the
writing can grow without touching the engine:

- **STATE / REGISTERS / LOG / ACTIONS / FORKS / SCHEDULER / LADDER / COCOON**
  — engine systems, documented inline.
- **CONTENT** — all narrative: log lines, fork text, character beats. This
  is where most future work happens.

## Local development

No build step. Edit `index.html`, refresh the browser. A local server is
optional but avoids any browser quirks with `file://` paths:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Save data

Progress saves to the browser's `localStorage` automatically. Clearing site
data resets the game.
