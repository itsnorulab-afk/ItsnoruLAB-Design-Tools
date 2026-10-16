(() => {
  const select = document.getElementById('theme-select');
  if (!select) return;

  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  select.value = current;

  select.addEventListener('change', () => {
    const theme = select.value === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portal_theme', theme);
    } catch (error) {
      // Storage may be unavailable in a restricted browser; the current page still changes.
    }
  });
})();
