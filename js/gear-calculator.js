(()=>{
  const root=document.getElementById('gear-calc-app');
  if(!root)return;
  const helical=root.dataset.gearType==='helical';
  const form=document.getElementById('gear-form');
  const input=id=>document.getElementById(id);
  const num=id=>Number(input(id)?.value||0);
  const fmt=(value,digits=3)=>Number(value).toLocaleString('ko-KR',{maximumFractionDigits:digits});
  const row=(label,value1,value2,symbol)=>`<tr><th scope="row">${label}<small>${symbol}</small></th><td><strong>${value1}</strong></td><td><strong>${value2}</strong></td></tr>`;

  function calculate(){
    if(!form.checkValidity())return;
    const z1=num('gear-z1'),z2=num('gear-z2'),moduleValue=num('gear-module');
    const alpha=num('gear-angle')*Math.PI/180;
    const beta=helical?num('gear-helix')*Math.PI/180:0;
    const clearance=helical?num('gear-clearance'):.25;
    const transverseModule=helical?moduleValue/Math.cos(beta):moduleValue;
    const transverseAngle=helical?Math.atan(Math.tan(alpha)/Math.cos(beta)):alpha;
    const pitch1=transverseModule*z1,pitch2=transverseModule*z2;
    const outer1=pitch1+2*moduleValue,outer2=pitch2+2*moduleValue;
    const root1=pitch1-2*(1+clearance)*moduleValue,root2=pitch2-2*(1+clearance)*moduleValue;
    const base1=pitch1*Math.cos(transverseAngle),base2=pitch2*Math.cos(transverseAngle);
    const feed1=Math.PI*pitch1,feed2=Math.PI*pitch2,center=(pitch1+pitch2)/2;

    input('gear-center').textContent=`${fmt(center)} mm`;
    input('gear-ratio').textContent=`${fmt(z2/z1)} : 1`;
    if(helical)input('gear-transverse-angle').textContent=`${fmt(transverseAngle*180/Math.PI)}°`;
    input('drawing-center-label').textContent=`a = ${fmt(center)} mm`;
    input('drawing-d1-label').textContent=`d₁ = ${fmt(pitch1)} mm`;
    input('drawing-d2-label').textContent=`d₂ = ${fmt(pitch2)} mm`;
    input('gear-results').innerHTML=
      row('잇수',fmt(z1,0),fmt(z2,0),'z')+
      row('피치원지름',`${fmt(pitch1)} mm`,`${fmt(pitch2)} mm`,'d')+
      row('이끝원지름',`${fmt(outer1)} mm`,`${fmt(outer2)} mm`,'da')+
      row('이뿌리원지름',`${fmt(root1)} mm`,`${fmt(root2)} mm`,'df')+
      row('기초원지름',`${fmt(base1)} mm`,`${fmt(base2)} mm`,'db')+
      row('1회전당 이송량',`${fmt(feed1)} mm`,`${fmt(feed2)} mm`,'πd');
    input('gear-driven-rev').textContent=`기어 2가 ${fmt(z1/z2)} 회전 (반대 방향)`;
    const formulas=helical
      ? ['정면 모듈 mt = mn / cos β','정면 압력각 αt = tan⁻¹(tan αn / cos β)','피치원지름 d = mn × z / cos β','중심거리 a = mn(z₁ + z₂) / (2 cos β)','이끝원지름 da = d + 2mn','이뿌리원지름 df = d − 2(1 + c*)mn','기초원지름 db = d cos αt','1회전 이송량 L = πd']
      : ['피치원지름 d = mz','중심거리 a = m(z₁ + z₂) / 2','이끝원지름 da = m(z + 2)','이뿌리원지름 df = m(z − 2.5)','기초원지름 db = d cos α','1회전 이송량 L = πd'];
    input('gear-formula-list').innerHTML=formulas.map(formula=>`<li>${formula}</li>`).join('');
  }

  form.addEventListener('submit',event=>{event.preventDefault();calculate();});
  form.addEventListener('input',calculate);
  input('gear-example').addEventListener('click',()=>{
    input('gear-z1').value=20;input('gear-z2').value=40;input('gear-module').value=2;input('gear-angle').value=20;
    if(helical){input('gear-clearance').value=.25;input('gear-helix').value=20;}
    calculate();
  });
  input('gear-reset').addEventListener('click',()=>{form.reset();calculate();});
  calculate();
})();
