// Grabs README screenshots by loading index.html and setting game state
// directly via page.evaluate, rather than clicking through a real
// multi-minute playthrough (cooldowns + energy regen make that slow, and
// the mechanics were already verified separately — this script only
// needs the *resulting* state to render a screenshot from).
// Not part of the shipped game. Run with: node capture-screenshots.js
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'screenshots');
const INDEX_URL = 'file://' + path.join(ROOT, 'index.html');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

async function shot(page, name) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file });
  console.log('saved', name);
}

// the clean-path forkHistory shared by the post-promotion and post-layoff
// states: credited Jess, wrote the postmortem straight, staffed the tiger
// team as a team. matches the real clickthrough run earlier in this repo's
// history.
const CLEAN_FORK_HISTORY = [
  { id: 'fork1', choice: 'correct', t: Date.now() },
  { id: 'fork2', choice: 'straight', t: Date.now() },
  { id: 'fork3', choice: 'shared', t: Date.now() },
];

async function setState(page, overrides) {
  await page.evaluate((o) => {
    Object.assign(S, o.top);
    Object.assign(S.flags, o.flags);
    if (o.forkHistory) S.forkHistory = o.forkHistory;
    applyRegister();
    renderHud();
    renderLadder();
    removeAction('findDesk');
    addAction(ACT_WORK);
    addAction(ACT_STEP_OUTSIDE);
    save();
  }, overrides);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 760, height: 1000 } });

  await page.goto(INDEX_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // 1. cold open — the game's actual boot sequence, unmodified
  await page.waitForTimeout(2800);
  await shot(page, '01-cold-open.png');

  // 2. post-promotion ladder: zero-sum promotion has fired (Phase 1),
  // Jess is dimmed, "you" is L5. layoff hasn't happened yet, so Okafor/
  // Lind/Aiyar/Nora are all still present.
  await setState(page, {
    top: { act: 3, impact: 197, workClicks: 60, dirty: 0 },
    forkHistory: CLEAN_FORK_HISTORY,
    flags: {
      hudVisible: true, ladderUnlocked: true, creditedJess: true,
      postmortemHonest: true, promoDelayed: true, sharedTeam: true,
      senior: true, staff: true, dim_jess: true,
    },
  });
  await page.click('#tab-ladder');
  await page.waitForTimeout(200);
  await shot(page, '02-promotion-ladder-dimmed-jess.png');

  // 3. post-layoff ladder (Phase 2), register 1 — the clean path, so
  // dirty stayed at 0. Okafor/Lind/Aiyar/Jess are gone entirely.
  await setState(page, {
    top: { impact: 223 },
    flags: { gone_okafor: true, gone_lind: true, gone_aiyar: true, gone_jess: true },
  });
  await page.waitForTimeout(200);
  await shot(page, '03-post-layoff-ladder-r1.png');

  // 4. bonus: same end state, forced to register 3 to show the Phase 4
  // "people blur" effect. Not reachable on this clean run organically —
  // dirty would need to be 2 — included as a second option for the README.
  await setState(page, { top: { dirty: 2 } });
  await page.waitForTimeout(200);
  await shot(page, '04-bonus-r3-people-blur.png');

  await browser.close();
  console.log('done');
})();
