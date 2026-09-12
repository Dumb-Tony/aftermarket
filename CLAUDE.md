# Aftermarket — project instructions

A top-down wave shooter where a discarded combat robot rebuilds itself out of what it
kills. Browser-first (itch.io style), wrapped for Steam later from this same codebase.
The whole game is **one file: `index.html`**. No build step, no dependencies.

Owner: Tony (@Dumb-Tony). Repo: https://github.com/Dumb-Tony/aftermarket

---

## Do this first

The repo was created empty and the code has not been pushed yet. If `git log` shows
no remote commits:

```
git add -A
git commit -m "Aftermarket"
git push -u origin main
```

Then enable GitHub Pages (Settings > Pages > Source: `main` / `/ (root)`) and give Tony
the link: `https://dumb-tony.github.io/aftermarket/`. **The Pages URL is what he wants
posted in chat** — that's what he sends friends for playtesting. Not file downloads.

---

## The one sentence the design hangs on

> Your robot is a circuit. Every liability is a resource you haven't found the part for yet.

Firing makes **heat**, and heat stalls you. Firing **shoves you backwards**. Kills leave
**scrap** that goes cold in twenty seconds. Moving builds **charge**, and charge pays for
every button. All four are problems in the stock chassis, and each one is some part's fuel.

If a proposed change doesn't serve that sentence, it probably shouldn't ship.

## Rules that are load-bearing — don't quietly break these

- **Recoil is a force, not a stat.** Every shot applies a physical impulse opposite your
  aim. This is why aiming and moving are the same problem. Auto-fire would delete it.
- **The attack layer is split.** Arms are manually aimed. The *rig* (auras, orbitals,
  arcs, turrets, drones, trails) is autonomous and carries the late-run screen-fill.
  This is the resolution to "power fantasy vs manual aim" that the genre converged on.
- **Scrap is the XP gem.** The survivor-like hoovering loop and the fight-forward rule
  are deliberately the same mechanic.
- **The palette law.** Nothing on screen flashes in a colour that isn't a resource:
  heat orange, charge cyan, kinetic bone, scrap brass. Every effect is self-labelling.
  `COL.me` and `COL.meRim` are **reserved for the player chassis** — no effect may use
  them. Losing the player in their own VFX is the #1 cited failure of this genre.
- **Every part makes a resource or drinks one.** No neutrals. If you can't say which in
  four words, it doesn't ship.
- **Combo names are printed on the components.** Any card that is half of an overbuild
  says so. The combination is a plan you execute, not a secret you stumble into.
- **No part is a trap you can't see.** The Coolant Cell on a Furnace Core is *meant* to
  be bad — and the workshop schematic shows your damage draining away. Nothing in the UI
  says "suboptimal"; you can just see it.

## Layout of index.html

Roughly 2,900 lines, in labelled sections. Search for the banner comments:

| Section | What's in it |
|---|---|
| `AUDIO` | Three-bus WebAudio graph, convolution room, synthesised SFX. No asset files. |
| `MUSIC` | Step sequencer that reads the heat bar. Cold = low pulse; hot = filter opens, arp enters. |
| `PARTS` | 31 parts across core / arm / leg / utility. `makes` and `drinks` drive the schematic. |
| `ARENAS, DIFFICULTY, HANDICAPS` | Six arenas with hazards and salvage bias; three difficulties; the Book. |
| `META` | localStorage: unlocks, contracts, records, the Locker, options. |
| `THE RIG` | Upgrade trees, overbuilds, `rigRecalc()` resolves everything into `pl.R`. |
| `RIG RUNTIME` | The autonomous subsystems ticking each frame. |
| `LEVEL-UP` | Card UI, banish, reroll, build sheet. |
| `COMBAT` / `ENEMIES` / `BOSSES` | Firing, leg actions, six enemy types, four champions. |
| `RENDER` | `drawChassis()` builds the robot from its parts — appearance tracks the build. |
| `WORKSHOP` | The schematic. Pipes between mounts, sparks for orphaned output, drains for sinks. |

Player state lives in `G.players[]` entities with their own `mounts`, `S` (part stats)
and `R` (rig stats) — **not globals** — so a second robot can drop in without touching
the systems. Co-op is designed for and not built. Keep it that way.

## Test before you ship

Tony's standing rule: playtest, don't ship on a build-succeeds check. There's a harness
in `tools/` — see `tools/README.md`. Run `node tools/balance.js` after any tuning pass.

Current shape: trap build ~1.7, baseline ~5.0, coherent builds 6–11, and a strong build
wins the 15-wave card in roughly six minutes of combat without winning every time.

## Run structure

Three acts, fifteen waves. Champions at 5 and 10, **The Inheritor** at 15 — it fights as
each of the three archetype bosses in turn as its health drops. Beating it takes the card
and unlocks Endless. 14 of 31 parts start unlocked; the rest sit behind 17 contracts.

## Open questions — genuinely open, don't resolve them silently

- **Convergence.** The thing that kills survivor-likes by run 200 is a solved optimal
  build. Defences here are weighted offers rather than a slot cap, sixteen trees against
  three cards, and banish. Unproven.
- **Is health *parts*?** Enemies shooting parts off you mid-wave is thematic and might be
  a death spiral. Nothing currently degrades your chassis while you're using it.
- **Dismemberment** (how you kill deciding intact-part vs raw scrap) is described in
  `docs/DESIGN.md` and was deliberately cut. Tony decided against it — don't re-add.
- **How much recoil is fun** for builds that aren't skaters. One tuning value that
  probably decides whether the premise works.

`docs/DESIGN.md` has the full reasoning, the genre research it came from, and the
balance findings. Read it before making design changes.

## Working with Tony

- Ask clarifying questions before multi-step work; he'll tell you when he wants you to
  just go. He responds well to plain analogies over detailed technical breakdowns.
- Prototypes stay as one self-contained HTML file he can open and send to friends.
- Everything lives at `C:\Dev\<game>` locally and in a public GitHub repo.
