/* ============================================
   JMCL Docs - config.json driven
   ============================================ */
(function() {
  'use strict';

  // === Default fallback ===
  const ROUTES = {};
  let FILE_TO_ROUTE = {};
  let SITE = { name:'JMCL', titleSuffix:'JMCL 文档', meta:'Open-code-Studio · JMCL 文档', docDir:'../docs/JMCL' };
  let NAV = [];
  let SIDEBAR_LINKS = [];
  const DEFAULT_ROUTE = '/';

  // SVG icons
  const ICONS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    devices: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    schedule: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    handshake: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    computer: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    translate: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    description: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  };
  function iconSVG(name) { return ICONS[name] || ICONS.description; }

  // === Load config.json ===
  async function loadConfig() {
    try {
      const resp = await fetch('config.json');
      if (!resp.ok) return;
      const cfg = await resp.json();
      if (cfg.site) Object.assign(SITE, cfg.site);
      if (cfg.nav && Array.isArray(cfg.nav)) {
        NAV = cfg.nav;
        const nr = {}, nf = {};
        function processNav(items, parentRoute) {
          items.forEach(item => {
            const route = item.route || (parentRoute ? parentRoute + '/' : '/') + (item.title || item.file||'').toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');
            const slug = route.split('/').pop();
            let file = item.file;
            if (!file) {
              if (item.children) file = route.replace(/^\//, '') + '/README.md';
              else if (parentRoute) file = parentRoute.replace(/^\//, '') + '/docs/' + slug + '.md';
              else file = route === '/' ? 'README.md' : route.replace(/^\//, '') + '.md';
            }
            nr[route] = { file, title: item.title, icon: item.icon || 'description' };
            nf[file] = route;
            if (item.children) processNav(item.children, route);
          });
        }
        processNav(cfg.nav);
        Object.assign(ROUTES, nr); Object.assign(FILE_TO_ROUTE, nf);
      }
      SIDEBAR_LINKS = cfg.sidebarLinks || [];
    } catch (e) { console.warn('config.json load failed:', e.message); }
  }

  // Render sidebar from config (supports nested)
  function renderSidebar() {
    if (!NAV.length) return;
    function buildHTML(items, depth) {
      return items.map(item => {
        const hasKids = item.children && item.children.length;
        const route = hasKids ? null : (item.route || (item.title || '').toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, ''));
        const pad = depth * 16;
        let html = '';
        if (hasKids) {
          html += `<li class="nav-category" style="padding-left:${pad}px;font-size:11px;font-weight:600;color:var(--md-sys-color-on-surface-variant);padding-top:12px;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">${item.title}</li>`;
          html += buildHTML(item.children, depth + 1);
        } else {
          html += `<li class="nav-item${route === DEFAULT_ROUTE ? ' active' : ''}" data-route="#${route}" style="padding-left:${pad}px;">
            <a href="#${route}" class="nav-link">
              <svg viewBox="0 0 24 24" width="20" height="20" class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSVG(item.icon || 'description')}</svg>
              <span class="nav-label">${item.title}</span>
            </a>
          </li>`;
        }
        return html;
      }).join('');
    }
    navList.innerHTML = buildHTML(NAV, 0);
  }

  function renderSidebarLinks() {
    const container = $('#sidebarLinks');
    if (!container) return;
    container.innerHTML = SIDEBAR_LINKS.map(link => `
      <a href="${link.url}" class="sidebar-footer-link" style="margin-top:4px"${link.external ? ' target="_blank"' : ''}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSVG(link.external ? 'external' : 'home')}</svg>
        ${link.title}
      </a>`).join('');
  }

  // === DOM References ===
  const $ = (sel) => document.querySelector(sel);
  const docTitle = $('#docTitle');
  const docBody = $('#docBody');
  const docMeta = $('#docMeta');
  const navList = $('#navList');
  const sidebar = $('#sidebar');
  const drawerOverlay = $('#drawerOverlay');
  const menuToggle = $('#menuToggle');
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const scrollTopBtn = $('#scrollTop');
  const tocList = $('#tocList');

  // === Theme Management ===
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    themeIcon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
  function toggleTheme() {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }
  setTheme(getPreferredTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });

  // === Sidebar (Drawer) ===
  function openDrawer() { sidebar.classList.add('open'); drawerOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { sidebar.classList.remove('open'); drawerOverlay.classList.remove('active'); document.body.style.overflow = ''; }
  menuToggle.addEventListener('click', () => { sidebar.classList.contains('open') ? closeDrawer() : openDrawer(); });
  drawerOverlay.addEventListener('click', closeDrawer);
  navList.addEventListener('click', (e) => { if (window.innerWidth <= 768) closeDrawer(); });

  // === Scroll to Top ===
  window.addEventListener('scroll', () => { scrollTopBtn.classList.toggle('visible', window.scrollY > 300); }, { passive: true });
  scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // === Navigation ===
  function updateActiveNav(route) {
    navList.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });
  }

  // === TOC ===
  function generateTOC(contentElement) {
    tocList.innerHTML = '';
    const headings = contentElement.querySelectorAll('h2, h3');
    if (!headings.length) { document.getElementById('tocSidebar').style.display = 'none'; return; }
    document.getElementById('tocSidebar').style.display = 'block';
    headings.forEach((heading, i) => {
      if (!heading.id) heading.id = `${i}`;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`; a.textContent = heading.textContent;
      a.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.getElementById(heading.id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', `#${heading.id}`); }
      });
      li.appendChild(a); tocList.appendChild(li);
    });
  }

  function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

  // === Preprocess Markdown ===
  function preprocessMarkdown(md) {
    md = md.replace(/<!--\s*#(?:BEGIN|END)\s+\w+\s*-->/g, '');
    md = md.replace(/<!--\s*#PROPERTY.*?-->/g, '');
    md = md.replace(/<div align="center">[\s\S]*?<\/div>/g, '');
    md = md.replace(/\n{3,}/g, '\n\n');
    return md.trim();
  }

  function processTxt(text) {
    const lines = text.split('\n');
    let html = '', inList = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) { if (inList) { html += '</ol>'; inList = false; } continue; }
      if (/^第[一二三四五六七八九十百千]+条/.test(line)) { if (inList) { html += '</ol>'; inList = false; } html += `<h2 id="${i}">${escapeHtml(line)}</h2>`; continue; }
      if (/^\d+[\)\.]/.test(line) || /^[\(（]\d+[\)）]/.test(line)) {
        if (!inList) { html += '<ol style="list-style:none;padding-left:0;">'; inList = true; }
        const content = line.replace(/^[\d]+[\)\.]\s*/, '').replace(/^[\(（][\d]+[\)）]\s*/, '');
        html += `<li style="margin-bottom:8px;padding-left:1.5em;text-indent:-1.5em;"><strong>${line.match(/^[\d]+[\)\.]/)?.[0]||''}</strong> ${content}</li>`;
        continue;
      }
      if (/^[\(（][a-z][\)）]/.test(line)) { if (inList) { html += '</ol>'; inList = false; } html += `<p style="padding-left:1.5em;margin:4px 0;"><em>${escapeHtml(line)}</em></p>`; continue; }
      if (inList) { html += '</ol>'; inList = false; }
      html += `<p>${escapeHtml(line)}</p>`;
    }
    if (inList) html += '</ol>';
    return html;
  }

  // === Document Loading ===
  async function loadDocument(route) {
    let config = ROUTES[route];
    if (!config && (route.endsWith('.md') || route.endsWith('.txt'))) {
      config = { file: route, title: route.replace(/\.(md|txt)$/i, '') };
    }
    if (!config) { navigate(DEFAULT_ROUTE); return; }

    docTitle.textContent = config.title;
    document.title = `${config.title} - ${SITE.titleSuffix}`;
    docBody.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>加载文档中...</p></div>';
    tocList.innerHTML = '';
    updateActiveNav(route);

    try {
      const response = await fetch(`${SITE.docDir}/${config.file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rawText = await response.text();
      pageCache[route] = { title: config.title, content: rawText, file: config.file };
      let html;

      if (config.file.endsWith('.txt')) {
        html = processTxt(rawText);
      } else {
        let md = preprocessMarkdown(rawText);
        const renderer = new marked.Renderer();
        renderer.heading = function({ text, depth }) {
          const slug = text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');
          return `<h${depth} id="${slug}"><a class="heading-anchor" href="#${slug}" aria-hidden="true">#</a>${text}</h${depth}>`;
        };
        renderer.code = function({ text, lang }) {
          const language = lang || '';
          const validLang = language && hljs.getLanguage(language) ? language : '';
          const highlighted = validLang ? hljs.highlight(text, { language: validLang }).value : escapeHtml(text);
          return `<pre data-language="${language}"><code class="hljs${validLang?' language-'+validLang:''}">${highlighted}</code></pre>`;
        };
        renderer.link = function({ href, tokens }) {
          const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
          return `<a href="${href}"${isExternal?' target="_blank" rel="noopener noreferrer"':''}>${this.parser.parseInline(tokens)}</a>`;
        };
        marked.use({ renderer, breaks: true, gfm: true });
        html = marked.parse(md);
      }

      docBody.innerHTML = html;
      generateTOC(docBody);

      const scrollTo = sessionStorage.getItem('scrollTo');
      if (scrollTo) {
        sessionStorage.removeItem('scrollTo');
        const s = scrollTo.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');
        setTimeout(() => { const el = document.getElementById(s); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 200);
      }
      docMeta.innerHTML = `<span>${SITE.meta}</span>`;
    } catch (err) {
      console.error('Failed to load document:', err);
      docBody.innerHTML = `<div class="loading-state" style="gap:12px"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--md-sys-color-error)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><p>文档加载失败</p><p style="font-size:14px;color:var(--md-sys-color-on-surface-variant)">${err.message}</p><button onclick="location.reload()" style="margin-top:12px;padding:8px 24px;border-radius:9999px;border:none;background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);cursor:pointer;font-size:14px">重新加载</button></div>`;
    }
  }

  // === Router ===
  function navigate(route) { window.location.hash = (route.startsWith('#') ? route.slice(1) : route) || DEFAULT_ROUTE; }
  function handleRoute() {
    const hash = window.location.hash.slice(1);
    if (!hash || hash.startsWith('/') || hash.endsWith('.md') || hash.endsWith('.txt')) {
      loadDocument(hash || DEFAULT_ROUTE);
    }
    // else: page-internal anchor (e.g. #1-some-section) — let browser scroll naturally
  }
  window.addEventListener('hashchange', handleRoute);

  // === Intercept .md/.txt links ===
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

  themeToggle.addEventListener('click', toggleTheme);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('open')) closeDrawer(); });

  // === Init ===
  const pageCache = {};
  async function init() {
    await loadConfig();
    renderSidebar();
    renderSidebarLinks();
    if (!window.location.hash) window.location.hash = DEFAULT_ROUTE;
    else handleRoute();

    // Expose OWD API
    window.OWD = {
      config: SITE, routes: ROUTES, nav: NAV,
      cache: pageCache,
      navigate(route) { if (route) navigate('#' + route.replace(/^#/, '')); },
      async getPage(route) {
        const r = ROUTES[route];
        if (!r) return null;
        if (pageCache[route]) return pageCache[route];
        try {
          const resp = await fetch(`${SITE.docDir}/${r.file}`);
          if (!resp.ok) return null;
          const text = await resp.text();
          pageCache[route] = { title: r.title, content: text, file: r.file };
          return pageCache[route];
        } catch (e) { return null; }
      },
      search(query) {
        const q = query.toLowerCase();
        const results = [];
        for (const [route, page] of Object.entries(pageCache)) {
          if (page.content.toLowerCase().includes(q)) {
            const idx = page.content.toLowerCase().indexOf(q);
            const snippet = page.content.substring(Math.max(0, idx - 30), idx + q.length + 80).replace(/\n/g, ' ');
            results.push({ route, title: page.title, snippet: '...' + snippet + '...', file: page.file });
          }
        }
        return results;
      },
      async searchAll(query) {
        const allRoutes = Object.keys(ROUTES);
        await Promise.all(allRoutes.map(r => this.getPage(r)));
        return this.search(query);
      }
    };
  }

  function waitForDeps() {
    if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') init();
    else setTimeout(waitForDeps, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForDeps);
  else waitForDeps();
})();
