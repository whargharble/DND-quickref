// Basic tab behavior + render functions. Data comes from window.QUICKREF_DATA
(function(){
  // PWA basic handler (optional)
  let deferredPrompt;
  const installBtn = document.getElementById('install-btn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  installBtn?.addEventListener('click', async () => {
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = {
    spells: document.getElementById('panel-spells'),
    conditions: document.getElementById('panel-conditions'),
    actions: document.getElementById('panel-actions'),
    personality: document.getElementById('panel-personality')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      document.querySelectorAll('.panel').forEach(p => p.hidden = true);
      tab.classList.add('active'); tab.setAttribute('aria-selected','true');
      const target = tab.id.replace('tab-','');
      panels[target].hidden = false;
    });
  });

  const data = window.QUICKREF_DATA || {};
  renderSnapshot(data.character);
  renderSpells(data.spells);
  renderConditions(data.conditions);
  renderActions(data.actions);
  renderPersonality(data.personality);

  function renderSnapshot(c){
    const el = document.getElementById('char-snapshot');
    if(!c) return;
    el.innerHTML = `
      <span class="pill"><strong>${escapeHTML(c.name)}</strong> – L${c.level} ${escapeHTML(c.cls)}</span>
      <span class="pill">AC ${c.ac}</span>
      <span class="pill hearts" aria-label="HP">
        ${heartPips(c.hp_current, c.hp_max)}
      </span>
      <span class="pill">Slots ${'●'.repeat(c.slots_used)}${'○'.repeat(Math.max(c.slots_total - c.slots_used,0))}</span>
    `;
  }

  function heartPips(current, max){
    const hearts = [];
    for(let i=0;i<max;i++){
      hearts.push(`<span class="heart ${i<current?'':'empty'}" aria-hidden="true"></span>`);
    }
    return hearts.join('');
  }

  function renderSpells(spells){
    const ul = document.getElementById('spells-list');
    ul.innerHTML = (spells||[]).map(s => `
      <li class="card">
        <h3>${escapeHTML(s.name)}</h3>
        <div class="meta">${escapeHTML(s.meta||'')}</div>
        <div class="desc">${escapeHTML(s.desc||'')}</div>
      </li>
    `).join('');
  }

  function renderConditions(conds){
    const ul = document.getElementById('conditions-list');
    ul.innerHTML = (conds||[]).map(c => `
      <li class="card">
        <h3>${escapeHTML(c.name)}</h3>
        <div class="desc">${escapeHTML(c.desc||'')}</div>
      </li>
    `).join('');
  }

  function renderActions(actions){
    const ul = document.getElementById('actions-list');
    ul.innerHTML = (actions||[]).map(a => `
      <li class="card">
        <h3>${escapeHTML(a.name)}</h3>
        <div class="desc">${escapeHTML(a.desc||'')}</div>
      </li>
    `).join('');
  }

  function renderPersonality(p){
    const box = document.getElementById('personality');
    if(!p){ box.textContent = 'No personality anchors set.'; return; }
    const mk = (label, items) => items?.length ? `
      <div class="card">
        <h3>${label}</h3>
        <div>${items.map(i => `<span class="badge">${escapeHTML(i)}</span>`).join(' ')}</div>
      </div>` : '';
    box.innerHTML = (mk('Traits', p.traits) + mk('Ideals', p.ideals) + mk('Bonds', p.bonds) + mk('Flaws', p.flaws));
  }

  function escapeHTML(str){ return (str??'').replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s])); }
})();
