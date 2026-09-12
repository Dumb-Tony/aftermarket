const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel:'chrome' });
  const p = await b.newPage({ viewport:{width:1280,height:800} });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '..', 'index.html'),{waitUntil:'load'});
  const run = (diff,seed) => p.evaluate(({diff,seed})=>{
    chosenDiff=diff; wantEndless=false; startGame();
    const pl=P0();
    Object.assign(pl.mounts,{core:'ballast',armA:'slug',armB:'slug',leg:'skates',utilA:'vent',utilB:'plating'});
    for (const v of Object.values(pl.mounts)) if(v&&!pl.owned.includes(v)) pl.owned.push(v);
    recalc(pl); pl.hp=pl.maxHp;
    let ticks=0; const ARN=Object.keys(ARENAS); const deaths=[];
    while (ticks<60*60*25 && G.mode!=='dead' && !G.won){
      if (G.mode==='shop'){
        Object.assign(P0().mounts,{core:'ballast',armA:'slug',armB:'slug',leg:'skates',utilA:'vent',utilB:'plating'});
        recalc(P0());
        G.arena=ARN[(G.wave+seed)%ARN.length]; G.hazards=buildHazards(ARENAS[G.arena].haz); G.handicap=null;
        document.getElementById('shop').classList.add('hide'); startWave(); continue;
      }
      if (G.levelOpen){
        const cs=G.offerCards; let best=cs[0];
        for (const c of cs){ if (c.over){ best=c; break; }
          if (c.node==='t3' || (famCount(P0(),c.tree)>0 && c.node!=='t1')) best=c; }
        chooseCard(best); continue;
      }
      const q=P0();
      if (!q.dead){
        const boss=G.enemies.find(e=>e.boss);
        let best=boss||null,bd=1e18;
        if (!best) for (const e of G.enemies){ const d=dist2(e,q); if(d<bd){bd=d;best=e;} }
        if (best){ mouse.x=best.x; mouse.y=best.y; } else { mouse.x=W/2; mouse.y=H/2; }
        mouse.down=true;
        let ax=best?Math.atan2(q.y-best.y,q.x-best.x):0;
        if (q.x<180||q.x>W-180||q.y<180||q.y>H-180) ax=Math.atan2(H/2-q.y,W/2-q.x);
        keys.KeyD=Math.cos(ax)>.3; keys.KeyA=Math.cos(ax)<-.3;
        keys.KeyS=Math.sin(ax)>.3; keys.KeyW=Math.sin(ax)<-.3;
        if (hotness(q)>.7) useUtil(q,0);
        if (ticks%75===0) legAction(q);
      }
      update(); ticks++;
    }
    return { diff, won:G.won, wave:G.wave, secs:(ticks/60)|0, kills:G.kills };
  },{diff,seed});
  for (const d of ['scrapper','contender']) for (let s=0;s<3;s++)
    console.log(JSON.stringify(await run(d,s)));
  console.log('ERRORS', errs.length?errs.slice(0,5):'none');
  await b.close();
})();
