# Aftermarket

A top-down wave shooter about a discarded combat robot that rebuilds itself out of the things it kills.

Single HTML file. No build step, no dependencies. Open `index.html` in any browser.

---

## The idea

Firing makes **heat**, and heat stalls you.
Firing **shoves you backwards**, and being shoved ruins your aim.
Killing things leaves **scrap** on the floor that goes cold and worthless in twenty seconds.
Moving builds **charge**, and charge is the only thing that pays for a button.

In the stock chassis all four are problems. Every one of them is somebody's engine.

> Your robot is a circuit. Every liability is a resource you haven't found the part for yet.

## Two layers

Your **arms** stay in your hands. You aim them, you fire them, and every shot still shoves you backwards — recoil is a force, not a stat, and it is still the thing that makes movement and aiming the same problem.

Everything else fights on its own. Auras, orbiting plate, arc nets, turrets, drones, burning exhaust — **the rig** is the autonomous layer, and it is what you actually build over a run. Late waves fill the screen without ever asking you to track eighty enemies with a crosshair.

## Levelling

Scrap is the gem. Picking it up is how you level, so the economy and the forward pressure are the same mechanic — you level by fighting *into* your own kills.

Levelling pauses, shoves the crowd off you, and offers three cards. Every tree is the same shape, so you learn it once:

```
Tier I  ──▶ take up to five times, the subsystem's power level
   │
   ├── Tier II-a ─┐
   └── Tier II-b ─┴──▶ Tier III, the capstone that changes its behaviour
```

Eight subsystems, eight passives, and six **overbuilds** — combinations of two finished trees that rewrite a rule. Overbuild names are printed on every card that qualifies for one, so a combination is a plan you execute rather than a secret you stumble into. Slag Aura and Exhaust Trail both finished gets you **SCORCHED EARTH**: heat stops shedding on its own, your ceiling doubles, and everything you touch burns.

Reroll and banish are free tools, not currency. A bad offer is something you fix.

## Controls

| | |
|---|---|
| `WASD` | thrust |
| `Mouse` | aim |
| `Left click` | fire |
| `Space` / right click | leg action — dash, brace, carve, leap or anchor, depending on your legs |
| `Q` / `E` | utility mounts |
| `1` `2` `3` | pick a level-up card |
| `R` | reroll the offer |
| `Enter` | deploy next wave |
| `Esc` | pause |

Touch: left half of the screen to move, right half to aim and fire, tap the left half for the leg action.

## Three rules carry the whole game

**Recoil is a force, not a stat.** Every shot applies a physical shove opposite your aim. Walker legs eat most of it, treads eat all of it, skates eat none. Aiming and moving are permanently the same action.

**Scrap cools.** Kills drop junk that stays hot for twenty seconds — full value, and usable as fuel. After that it's cold: worth half, and inert. You have to fight forward, into your own kills.

**Charge comes from moving.** Every button on your robot is paid for by the fact that you didn't stand still.

## The workshop is still there

Cards run during a wave. Between waves the workshop still opens, because the genre's most-cited weakness is never having a moment where your build is legible — and the plumbing schematic already is that moment. Mounts and parts are the slow layer you rearrange deliberately; the rig is the fast layer that grows inside a wave.

## Six mounts, thirty-one parts

One core, two arms, one leg assembly, two utility mounts. No inventory grid — installing means replacing, and the robot visibly changes shape as you do it.

Between waves the workshop opens: the arena stays live, a test dummy stands in the middle, and swapping anything you already own is free and instant. Your build is drawn as **plumbing** — pipes between mounts, sparks where a resource has nowhere to go, a drain glyph where something is eating a resource and giving nothing back. Nothing tells you a choice is bad. You can just see it.

Hover a part to see the robot it would make. Hit **SPEC** if you want the numbers.

## Things worth finding

- A **Slag Vent** is a panic button on treads. On **Skate Legs** it's an afterburner — and suddenly you *want* to be hot.
- Overheating is a stun and a fail state, until the **Meltdown Tap** turns it into the button you press on purpose.
- The **Magnet** is a convenience item, until a **Furnace Core** turns it into a reload.
- A **Governor Core** makes the same wreckage into charge instead, and charge is drones.
- **Mismatched arms** twist your chassis. On frictionless legs that twist is a steering wheel.
- The **Coolant Cell** is an obviously good part. Bolt it to a furnace and watch the schematic.

## The card

Three acts, fifteen waves, one champion at the end. A wave, then the workshop, then you pick where to fight next. Every third deploy the house offers you a bet: take a handicap — a sealed arm socket, an electrified floor, no workshop next round — for an extra salvage pick.

Six arenas, each with its own hazard and its own salvage bias. Floor vents that erupt on a cycle, powered rollers crossing the deck, electrified rails, a cold store that bleeds your heat away twice as fast.

Every fifth wave is a champion, and every champion is a build. **The Kiln** runs a furnace. **Ricochet** runs skates and its own recoil. **The Foreman** fights behind the mess it makes. Each drops its signature part when it dies, so bosses double as the tutorial for builds you haven't tried.

Wave fifteen is **The Inheritor**, wearing everything that lost. It fights you as all three champions in turn, and beating it takes the card. Winning once opens **Endless**, where the card never stops and the champions come round again.

Win or lose, you bank one part in **the Locker** and start the next run with it bolted on.

## Unlocking

You start with fourteen parts. The other seventeen are behind contracts — reach wave eight, beat a specific champion, overheat fifteen times, build twenty-five drones, win on Champion. Contracts track across every run and the Record screen shows what's left. Offers only ever draw from what you've unlocked, so the pool widens as you play.

## Difficulty

**Scrapper** for people who don't play twin-stick shooters — you'll still see the good combinations. **Contender** is the intended card. **Champion** assumes you already know what your build does.

## Sound

Everything is synthesised at runtime; there are no audio files. The score is a step sequencer that reads your heat bar — cold, it's a low pulse in an empty shed; as you run hot the filter opens and an arpeggio comes in over the top. You can hear your own build.

Volumes, screen shake and damage numbers are in Options. A gamepad works if one's plugged in: left stick moves, right stick aims and fires, A is the leg action, shoulder buttons are your utilities.

## Enemies

Every unit either counters a resource or supplies one.

| Unit | What it does to you |
|---|---|
| Hound | Winds up, then lunges. Arrives in packs |
| Stanchion | Plants itself, telegraphs, and owns a lane |
| Husk | Armoured — shrugs off small hits, wants heavy ones |
| Tanker | Bursts into a cold cloud on death. Hard counter to heat builds |
| Jammer | Suppresses your charge regeneration. Turns your buttons off |
| Vulture | Ignores you completely and eats the scrap off your floor |

## Status

Playable end to end: a card you can win, seventeen contracts to unlock the rest of the catalogue, and an endless mode past the finish line. Everything persists to `localStorage`.

Co-op is designed for but not built — players are entities in `G.players`, not globals, so a second robot drops in without touching the systems.

## Licence

MIT — see [LICENSE](LICENSE).
