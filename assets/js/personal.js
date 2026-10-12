(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { preference = localStorage.getItem('personal-site-theme'); } catch (_) {}

  function showTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.title = toggle.getAttribute('aria-label');
    }
  }
  showTheme(root.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      showTheme(preference);
      try { localStorage.setItem('personal-site-theme', preference); } catch (_) {}
    });
  }
  systemTheme.addEventListener('change', event => {
    if (preference !== 'dark' && preference !== 'light') showTheme(event.matches ? 'dark' : 'light');
  });

  function updateTitle() {
    const sections = { '#news': 'News', '#selected-publications': 'Selected Publications', '#about-me': 'Homepage' };
    const pageTitle = document.body.dataset.pageTitle;
    const sectionTitle = document.body.dataset.home === 'true' ? sections[window.location.hash] : null;
    document.title = `${document.body.dataset.siteName} - ${sectionTitle || pageTitle}`;
  }
  updateTitle();
  window.addEventListener('hashchange', updateTitle);

  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeaderHeight = () => root.style.setProperty('--header-height', `${header.offsetHeight}px`);
    updateHeaderHeight();
    if (window.ResizeObserver) new ResizeObserver(updateHeaderHeight).observe(header);
    else window.addEventListener('resize', updateHeaderHeight);
  }
})();
