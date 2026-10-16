(() => {
  const release='0.2.3';
  const appBase=new URL('./',document.currentScript.src);
  function versionLink(anchor){
    const raw=anchor.getAttribute('href');
    if(!raw||raw.startsWith('#'))return;
    const url=new URL(raw,location.href);
    if(url.origin!==appBase.origin||!url.pathname.startsWith(appBase.pathname))return;
    if(!url.pathname.endsWith('/')&&!url.pathname.endsWith('.html'))return;
    url.searchParams.set('v',release);anchor.href=url.href;
  }
  document.querySelectorAll('a[href]').forEach(versionLink);
  document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(a)versionLink(a);},true);

  const style = document.createElement('style');
  style.textContent = `
    body{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
    body>header{padding-right:118px;min-height:96px}
    .app-header .topbar{padding-right:112px}
    .app-update{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:calc(env(safe-area-inset-right,0px) + 12px);z-index:1000;display:flex;align-items:center;gap:5px;min-height:44px;padding:10px 12px;border:1px solid #6c89a6;border-radius:10px;background:#223c57;color:#fff;font:600 14px system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 8px #0003}
    .app-update:disabled{opacity:.8;cursor:wait}
    .app-update-status{position:fixed;top:calc(env(safe-area-inset-top,0px) + 65px);right:12px;z-index:1001;max-width:calc(100vw - 24px);padding:12px;border-radius:10px;background:#19283c;color:#fff;font:14px system-ui;box-shadow:0 3px 15px #0004}
    @media(max-width:520px){body>header strong{display:block;font-size:16px;line-height:1.4}body>header p{font-size:12px;line-height:1.5}.app-update{font-size:13px;padding:9px}}
    @media print{.app-update,.app-update-status{display:none!important}}
  `;
  document.head.append(style);
  const button=document.createElement('button');
  button.type='button';button.className='app-update';button.textContent='↻ 업데이트';button.setAttribute('aria-label','최신 버전으로 업데이트');
  const status=document.createElement('div');status.className='app-update-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.hidden=true;
  document.body.append(button,status);
  button.addEventListener('click',async()=>{
    button.disabled=true;button.textContent='↻ 확인 중';status.hidden=false;status.textContent='최신 화면을 불러오는 중이야…';
    try {
      const url=new URL(location.href);url.searchParams.set('_update',String(Date.now()));
      const response=await fetch(url,{cache:'reload'});
      if(!response.ok)throw new Error('화면을 가져오지 못했어.');
      const doc=new DOMParser().parseFromString(await response.text(),'text/html');
      const assets=[...doc.querySelectorAll('script[src],link[rel="stylesheet"][href]')].map(e=>new URL(e.getAttribute('src')||e.getAttribute('href'),url)).filter(u=>u.origin===location.origin);
      await Promise.all(assets.map(async asset=>{const r=await fetch(asset,{cache:'reload'});if(!r.ok)throw new Error('파일을 가져오지 못했어.');await r.arrayBuffer();}));
      location.replace(url.href);
    } catch(error) {
      status.textContent='업데이트하지 못했어. 인터넷 연결을 확인하고 다시 눌러줘.';
      button.disabled=false;button.textContent='↻ 다시 시도';
    }
  });
})();
