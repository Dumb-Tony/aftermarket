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

Things this harness has caught that playing never did: salvage picks that never
refreshed after the first workshop, a furnace brawler that cooked itself to death on
wave one, and stacked damage reduction that made one build effectively immortal.
