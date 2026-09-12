# Test harness

Two headless scripts that play the game so you don't have to trust a build-succeeds check.

```
npm install playwright
node tools/balance.js     # relative strength of nine fixed builds, 3 runs each
node tools/fullrun.js     # can a strong build actually reach and beat wave 15?
```

Both drive a real browser against `index.html`, bot the player, and print a table.
They call the game's own globals (`G`, `P0()`, `update()`, `chooseCard()`, `install()`),
so they break if those are renamed — which is a feature, not a bug.

## What the numbers mean

`balance.js` is the important one. It plays every build with the *same* mediocre bot,
so it measures builds against each other, not skill. The bar to clear:

- the deliberate trap build (furnace + Coolant Cell) sits clearly **below** the baseline
- coherent builds sit clearly **above** it
- the spread between best and worst coherent build stays inside about **2x**

If those three hold, the build system is doing its job. Re-run after any tuning pass.

**`brawler2` is exempt from the bar.** It is `furnace/lance/walker/vent` — `brawler`
with Walker Legs swapped in for Skates — and it sits in the table as a control, not as a
candidate. The furnace is the one core whose damage needs you standing in melee range,
and recoil is what gets you back out; walker legs plant you there instead. It runs 1–3
and is *meant* to. Read the three bars above with `brawler2` set aside. The pair exists
to show that the leg choice decides the build: 6.5 on skates against 2.3 on walker.

**Three runs is noisy.** Builds whose code path did not change still wobble by up to
±1.7 waves between passes, and one turret run wandered to wave 20. Treat any gap under
about 2 waves as nothing, and run the script twice before you believe a change.

**The bot rides heat on `heatDamage` cores** — it vents at 0.93 instead of the flat 0.75
everything else uses, and skips the timed util fire. An earlier version dumped heat every
~2.6s no matter how cold, which pinned the furnace near 1.0x damage for whole runs and
reported a working build as sitting below baseline. If you add another core that pays you
for hoarding a resource, check the bot spends it the way a player would before you trust
the number it prints.

Things this harness has caught that playing never did: salvage picks that never
refreshed after the first workshop, a furnace brawler that cooked itself to death on
wave one, and stacked damage reduction that made one build effectively immortal.
