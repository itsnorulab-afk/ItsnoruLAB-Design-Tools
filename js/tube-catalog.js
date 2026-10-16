(()=>{
  const select=(id)=>document.getElementById(id);
  const filterRows=(rootId, filters, countId)=>{
    const root=document.getElementById(rootId);
    if(!root)return;
    const rows=[...root.querySelectorAll('tbody tr')];
    const update=()=>{
      let visible=0;
      rows.forEach(row=>{
        const match=filters.every(([id,key])=>select(id).value==='all'||row.dataset[key]===select(id).value);
        row.hidden=!match;
        if(match)visible+=1;
      });
      select(countId).textContent=`${visible}개 규격`;
    };
    filters.forEach(([id])=>select(id)?.addEventListener('change',update));
    return update;
  };

  const squareUpdate=filterRows('square-tube-app', [['tube-shape','shape'],['tube-size','size'],['tube-thickness','thickness']], 'tube-result-count');
  select('tube-filter-reset')?.addEventListener('click',()=>{['tube-shape','tube-size','tube-thickness'].forEach(id=>select(id).value='all');squareUpdate();});
  const honedUpdate=filterRows('honed-tube-app', [['honed-material','material'],['honed-inner','inner'],['honed-thickness','thickness']], 'honed-result-count');
  select('honed-filter-reset')?.addEventListener('click',()=>{['honed-material','honed-inner','honed-thickness'].forEach(id=>select(id).value='all');honedUpdate();});
})();
