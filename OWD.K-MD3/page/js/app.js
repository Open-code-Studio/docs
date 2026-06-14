/* ============================================
   Openwebdocs.kit-MD3 Docs - config.json driven
   ============================================ */
(function() {
  'use strict';

  const ROUTES = {};
  let FILE_TO_ROUTE = {};
  let SITE = { name:'Openwebdocs.kit-MD3', titleSuffix:'Openwebdocs.kit-MD3', meta:'Openwebdocs.kit-MD3 · 文档站点框架', docDir:'../docs' };
  let NAV = [];
  let SIDEBAR_LINKS = [];
  const DEFAULT_ROUTE = '/';

  const ICONS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    devices: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    schedule: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    computer: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    customize: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  };
  function iconSVG(name) { return ICONS[name] || ICONS.info; }

  async function loadConfig() {
    try {
      const resp = await fetch('config.json');
      if (!resp.ok) return;
      const cfg = await resp.json();
      if (cfg.site) Object.assign(SITE, cfg.site);
      if (cfg.nav && Array.isArray(cfg.nav)) {
        NAV = cfg.nav;
        const nr = {}, nf = {};
        cfg.nav.forEach(item => {
          nr[item.route] = { file: item.file, title: item.title, icon: item.icon || 'info' };
          nf[item.file] = item.route;
        });
        Object.assign(ROUTES, nr); Object.assign(FILE_TO_ROUTE, nf);
      }
      SIDEBAR_LINKS = cfg.sidebarLinks || [];
    } catch (e) { console.warn('config.json load failed:', e.message); }
  }

  function renderSidebarNav() {
    if (!NAV.length) return;
    navList.innerHTML = NAV.map(item => `
      <li class="nav-item${item.route === DEFAULT_ROUTE ? ' active' : ''}" data-route="${item.route}">
        <a href="#${item.route}" class="nav-link">
          <svg viewBox="0 0 24 24" width="20" height="20" class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSVG(item.icon)}</svg>
          <span class="nav-label">${item.title}</span>
        </a>
      </li>`).join('');
  }

  function renderSidebarLinks() {
    const container = $('#sidebarLinks');
    if (!container) return;
    container.innerHTML = `<div class="sidebar__section-label">链接</div>` + SIDEBAR_LINKS.map(link => `
      <a href="${link.url}" class="sidebar-footer-link" style="margin-top:4px"${link.external ? ' target="_blank"' : ''}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSVG(link.external ? 'external' : 'home')}</svg>
        ${link.title}
      </a>`).join('');
  }

  const $ = (sel) => document.querySelector(sel);
  const docTitle = $('#docTitle'), docBody = $('#docBody'), docMeta = $('#docMeta');
  const navList = $('#navList'), sidebar = $('#sidebar'), drawerOverlay = $('#drawerOverlay');
  const menuToggle = $('#menuToggle'), themeToggle = $('#themeToggle'), themeIcon = $('#themeIcon');
  const scrollTopBtn = $('#scrollTop'), tocList = $('#tocList');

  function getPreferredTheme() { return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    themeIcon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
  setTheme(getPreferredTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => { if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light'); });

  function openDrawer() { sidebar.classList.add('open'); drawerOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { sidebar.classList.remove('open'); drawerOverlay.classList.remove('active'); document.body.style.overflow = ''; }
  menuToggle.addEventListener('click', () => { sidebar.classList.contains('open') ? closeDrawer() : openDrawer(); });
  drawerOverlay.addEventListener('click', closeDrawer);
  navList.addEventListener('click', (e) => { if (window.innerWidth <= 768) closeDrawer(); });
  window.addEventListener('scroll', () => { scrollTopBtn.classList.toggle('visible', window.scrollY > 300); }, { passive: true });
  scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  function updateActiveNav(route) { navList.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.route === route)); }

  function generateTOC(el) {
    tocList.innerHTML = '';
    const hs = el.querySelectorAll('h2, h3');
    if (!hs.length) { document.getElementById('tocSidebar').style.display = 'none'; return; }
    document.getElementById('tocSidebar').style.display = 'block';
    hs.forEach((h, i) => {
      if (!h.id) h.id = `${i}`;
      const li = document.createElement('li'), a = document.createElement('a');
      a.href = `#${h.id}`; a.textContent = h.textContent; a.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
      a.addEventListener('click', (e) => { e.preventDefault(); const t = document.getElementById(h.id); if (t) { t.scrollIntoView({ behavior:'smooth', block:'start' }); history.replaceState(null,'',`#${h.id}`); } });
      li.appendChild(a); tocList.appendChild(li);
    });
  }

  function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

  async function loadDocument(route) {
    let config = ROUTES[route];
    if (!config && (route.endsWith('.md') || route.endsWith('.txt'))) config = { file: route, title: route.replace(/\.(md|txt)$/i, '') };
    if (!config) { navigate(DEFAULT_ROUTE); return; }
    docTitle.textContent = config.title;
    document.title = `${config.title} - ${SITE.titleSuffix}`;
    docBody.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>加载文档中...</p></div>';
    tocList.innerHTML = ''; updateActiveNav(route);
    try {
      const response = await fetch(`${SITE.docDir}/${config.file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const md = await response.text();
      const renderer = new marked.Renderer();
      renderer.heading = function({ text, depth }) {
        const slug = text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');
        return `<h${depth} id="${slug}"><a class="heading-anchor" href="#${slug}" aria-hidden="true">#</a>${text}</h${depth}>`;
      };
      renderer.code = function({ text, lang }) {
        const language = lang || '', validLang = language && hljs.getLanguage(language) ? language : '';
        const highlighted = validLang ? hljs.highlight(text, { language: validLang }).value : escapeHtml(text);
        return `<pre data-language="${language}"><code class="hljs${validLang?' language-'+validLang:''}">${highlighted}</code></pre>`;
      };
      renderer.link = function({ href, tokens }) {
        const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
        return `<a href="${href}"${isExternal?' target="_blank" rel="noopener noreferrer"':''}>${this.parser.parseInline(tokens)}</a>`;
      };
      marked.use({ renderer, breaks: true, gfm: true });
      docBody.innerHTML = marked.parse(md);
      generateTOC(docBody);
      const scrollTo = sessionStorage.getItem('scrollTo');
      if (scrollTo) { sessionStorage.removeItem('scrollTo'); const s = scrollTo.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, ''); setTimeout(() => { const el = document.getElementById(s); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); }, 200); }
      docMeta.innerHTML = `<span>${SITE.meta}</span>`;
    } catch (err) {
      console.error('Failed to load document:', err);
      docBody.innerHTML = `<div class="loading-state" style="gap:12px"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--md-sys-color-error)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><p>文档加载失败</p><p style="font-size:14px;color:var(--md-sys-color-on-surface-variant)">${err.message}</p><button onclick="location.reload()" style="margin-top:12px;padding:8px 24px;border-radius:9999px;border:none;background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);cursor:pointer;font-size:14px">重新加载</button></div>`;
    }
  }

  function navigate(route) { window.location.hash = (route.startsWith('#') ? route.slice(1) : route) || DEFAULT_ROUTE; }
  function handleRoute() {
    const hash = window.location.hash.slice(1);
    if (!hash || hash.startsWith('/') || hash.endsWith('.md') || hash.endsWith('.txt')) {
      loadDocument(hash || DEFAULT_ROUTE);
    }
  }
  window.addEventListener('hashchange', handleRoute);

  docBody.addEventListener('click', (e) => {
    const link = e.target.closest('a'); if (!link) return;
    const href = link.getAttribute('href'); if (!href) return;
    const lastPart = href.split('/').pop();
    const [filename, anchor] = lastPart.split('#');
    const decoded = decodeURIComponent(filename.split('?')[0]);
    if (!decoded.endsWith('.md') && !decoded.endsWith('.txt')) return;
    e.preventDefault();
    const route = FILE_TO_ROUTE[decoded] || decoded;
    if (anchor) sessionStorage.setItem('scrollTo', anchor);
    navigate(`#${route}`);
  });

  themeToggle.addEventListener('click', () => { setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('open')) closeDrawer(); });

  async function init() {
    await loadConfig();
    renderSidebarNav();
    renderSidebarLinks();
    if (!window.location.hash) window.location.hash = DEFAULT_ROUTE;
    else handleRoute();
  }
  function waitForDeps() { if (typeof marked!=='undefined' && typeof hljs!=='undefined') init(); else setTimeout(waitForDeps, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForDeps);
  else waitForDeps();
})();
