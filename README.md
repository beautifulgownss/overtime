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

In development — Acts I and II of a planned five-act structure are playable:

- **Act I, "The Offer":** cold open, core work loop, first characters, the
  roadmap review (Fork 1), the performance cycle, the ladder unlock.
- **Act II, "The Climb":** the postmortem (Fork 2), a confidence from Ray,
  the tiger team (Fork 3), the senior promotion, and the Act III teaser.

## How it works

The game has no visible morality stat. Choices at forks shift an internal
register, and the register rewrites the game around you:

- **Narration** — the same events are described in warmer or colder prose
  depending on who you're becoming.
- **The interface** — the color palette drains from dark pink toward cold
  gray-blue as choices accumulate. The transition is slow on purpose.
- **The world** — how other people's decisions get framed, which names dim
  on the ladder, what the log bothers to mention.

## Structure

Everything lives in `index.html` on purpose — engine code and narrative
content are separated into clearly marked sections within the file so the
writing can grow without touching the engine:

- **STATE / REGISTERS / LOG / ACTIONS / FORKS / SCHEDULER / LADDER / COCOON**
  — engine systems, documented inline. Forks are registered by id and
  persist across reloads, including mid-decision.
- **CONTENT** — all narrative: log lines, fork text, character beats,
  triggers. This is where most future work happens.

## Local development

No build step. Edit `index.html`, refresh the browser. A local server is
optional but avoids any browser quirks with `file://` paths:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Save data

Progress saves to the browser's `localStorage` automatically, including
decisions in progress. Clearing site data resets the game.

## Writing rules

For anyone (or any model) contributing prose:

- No em dashes in player-facing text.
- Every word earns its place. Understatement over lyricism.
- The observation does the work; the narrator never editorializes.
- The register system cools the *narration*, not the world. Other
  characters don't change; how she sees them does.
