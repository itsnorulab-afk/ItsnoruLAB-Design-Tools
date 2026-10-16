(()=>{
  const byId=id=>document.getElementById(id),root=byId('bushing-app');
  if(!root)return;
  const ids=['bushing-type','bushing-inner','bushing-outer','bushing-length'];
  const keys=['type','inner','outer','length'];
  const rows=[...root.querySelectorAll('tbody tr')];
  const update=()=>{
    let visible=0;
    rows.forEach(row=>{
      const match=ids.every((id,index)=>byId(id).value==='all'||row.dataset[keys[index]]===byId(id).value);
      row.hidden=!match;if(match)visible+=1;
    });
    byId('bushing-result-count').textContent=`${visible}개 규격`;
  };
  ids.forEach(id=>byId(id)?.addEventListener('change',update));
  byId('bushing-filter-reset')?.addEventListener('click',()=>{ids.forEach(id=>{byId(id).value='all';});update();});
})();
