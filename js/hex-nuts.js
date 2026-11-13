(() => {
  'use strict';
  const select = document.getElementById('nut-size');
  const rows = [...document.querySelectorAll('.nut-table tbody tr')];
  const title = document.getElementById('nut-result-title');
  const summary = document.getElementById('nut-selection');
  const count = document.getElementById('nut-count');
  function render() {
    const selected = select.value;
    let visible = 0;
    rows.forEach(row => {
      row.hidden = selected !== 'all' && row.dataset.size !== selected;
      if (!row.hidden) visible++;
    });
    title.textContent = selected === 'all' ? '전체 규격' : `${selected} 규격`;
    count.textContent = `${visible}개 규격`;
    if (selected === 'all') {
      summary.textContent = '호칭을 선택하면 해당 규격만 표시합니다.';
    } else {
      const cells = rows.find(row => row.dataset.size === selected).cells;
      summary.textContent = `${selected} × P${cells[1].textContent} · 대변 ${cells[2].textContent} mm · 높이 ${cells[3].textContent} mm`;
    }
  }
  select.addEventListener('change', render);
  document.getElementById('nut-reset').addEventListener('click', () => {
    select.value = 'all';
    render();
  });
  render();
})();
