const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel:'chrome' });
  const p = await b.newPage({ viewport:{width:1280,height:800} });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '..', 'index.html'),{waitUntil:'load'});
  const BUILDS = {
    'baseline  stock/rifle/walker':        {core:'stock',armA:'rifle',armB:'rifle',leg:'walker',utilA:null,utilB:null},
    'brawler   furnace/lance/skates/vent': {core:'furnace',armA:'lance',armB:'shear',leg:'skates',utilA:'vent',utilB:'ram'},
    'skater    ballast/slug/skates':       {core:'ballast',armA:'slug',armB:'nail',leg:'skates',utilA:'brace',utilB:'plating'},
    'swarm     governor/intake/bay':       {core:'governor',armA:'intake',armB:'arc',leg:'walker',utilA:'bay',utilB:'bay'},
    'brawler2  furnace/lance/walker/vent':  {core:'furnace',armA:'lance',armB:'shear',leg:'walker',utilA:'vent',utilB:'ram'},
    'charge    capacitor/arc/piston':       {core:'capacitor',armA:'arc',armB:'rifle',leg:'piston',utilA:'thermo',utilB:'shield'},
    'mortar    dynamo/mortar/treads':       {core:'dynamo',armA:'mortar',armB:'nail',leg:'treads',utilA:'overclock',utilB:'plating'},
    'turret    ballast/slug x2/treads':    {core:'ballast',armA:'slug',armB:'slug',leg:'treads',utilA:'plating',utilB:'shield'},
    'antisyn   furnace + coolant':         {core:'furnace',armA:'lance',armB:'lance',leg:'walker',utilA:'coolant',utilB:'coolant'},
  };
  const run = (mounts, seed) => p.evaluate(({mounts,seed}) => {
    chosenDiff='contender'; startGame();
    const pl = P0();
    Object.assign(pl.mounts, mounts);
    for (const v of Object.values(mounts)) if (v && !pl.owned.includes(v)) pl.owned.push(v);
    recalc(pl); pl.hp = pl.maxHp;
    let ticks=0; const ARN=Object.keys(ARENAS);
    try {
      while (ticks < 60*60*20){
        if (G.mode==='dead') break;
        if (G.mode==='shop'){
          Object.assign(P0().mounts, mounts); recalc(P0());   /* build stays fixed */
          G.arena = ARN[(G.wave+seed)%ARN.length];
          G.hazards = buildHazards(ARENAS[G.arena].haz); G.handicap=null;
          document.getElementById('shop').classList.add('hide'); startWave(); continue;
        }
        const q = P0();
        if (!q.dead){
          let best=null,bd=1e18;
          for (const e of G.enemies){ const d=dist2(e,q); if(d<bd){bd=d;best=e;} }
          if (best){ mouse.x=best.x; mouse.y=best.y; } else { mouse.x=W/2; mouse.y=H/2; }
          mouse.down=true;
          const wantClose = q.S.heatDamage || (q.S.arms[0]&&q.S.arms[0].kind!=='gun');
          let ax = best ? Math.atan2(q.y-best.y,q.x-best.x) : 0;
          if (wantClose && best && bd > 130*130) ax += Math.PI;
          if (q.x<170||q.x>W-170||q.y<170||q.y>H-170) ax = Math.atan2(H/2-q.y, W/2-q.x);
          keys.KeyD=Math.cos(ax)>.3; keys.KeyA=Math.cos(ax)<-.3;
          keys.KeyS=Math.sin(ax)>.3; keys.KeyW=Math.sin(ax)<-.3;
          keys.Space = (q.S.act==='brace'||q.S.act==='anchor') && best && bd > 200*200;
          if (best && bd < 90*90 && q.legT<=0) legAction(q);
          /* Heat is not a hazard on a heatDamage core - damage is 1+hot*1.45 and the
             only cost is crossing the lid (0.85s stagger, 10hp, heat back to 0). The
             flat .75 dump plus the timed fire below emptied the furnace every ~2.6s,
             pinning it near 1.0x all run. Ride the curve and vent just under the lid,
             where Slag Vent's refund is biggest anyway. Other builds: unchanged. */
          if (q.S.heatDamage){
            if (hotness(q) > .93){ useUtil(q,0); useUtil(q,1); }
          } else {
            if (hotness(q)>.75 || q.charge>=90){ useUtil(q,0); useUtil(q,1); }
            if (ticks%90===0){ useUtil(q,0); useUtil(q,1); }
          }
        }
        update(); ticks++;
      }
    } catch(err){ return {fatal:err.message}; }
    return { wave:G.wave, kills:G.kills, secs:+(ticks/60).toFixed(0) };
  }, {mounts,seed});
  const rows=[];
  for (const [name,m] of Object.entries(BUILDS)){
    const rs=[]; for (let s=0;s<3;s++) rs.push(await run(m,s));
    const w = rs.map(r=>r.wave), t = rs.map(r=>r.secs);
    rows.push([name, (w.reduce((a,c)=>a+c,0)/3).toFixed(1), w.join('/'), (t.reduce((a,c)=>a+c,0)/3).toFixed(0)+'s']);
  }
  console.log('build'.padEnd(36), 'avg wave', ' runs', '  avg time');
  for (const r of rows) console.log(r[0].padEnd(36), r[1].padStart(8), ' ', r[2].padEnd(8), r[3]);
  console.log('ERRORS', errs.length?errs.slice(0,5):'none');
  await b.close();
})();
