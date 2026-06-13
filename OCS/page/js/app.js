/* ============================================
   OCS Open-code-Studio Docs - Main Application
   ============================================ */

(function() {
  'use strict';

  // === Configuration ===
  const ROUTES = {
    '/':            { file: 'README.md',         title: '首页' },
    '/projects':    { file: 'PROJECTS.md',        title: '开源项目' },
    '/contributing':{ file: 'CONTRIBUTING.md',    title: '贡献指南' },
    '/join':        { file: 'JOIN.md',            title: '加入我们' },
    '/contact':     { file: 'CONTACT.md',          title: '联系我们' },
  };

  const DEFAULT_ROUTE = '/';
  const DOC_DIR = '../docs';

  // === DOM References ===
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

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

    // Update theme icon SVG
    const isDark = theme === 'dark';
    themeIcon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // === Sidebar (Drawer) Management ===
  function openDrawer() {
    sidebar.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    sidebar.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  drawerOverlay.addEventListener('click', closeDrawer);

  navList.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      closeDrawer();
    }
  });

  // === Scroll to Top ===
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === Navigation ===
  function updateActiveNav(route) {
    navList.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });
  }

  // === TOC Generation ===
  function generateTOC(contentElement) {
    tocList.innerHTML = '';
    const headings = contentElement.querySelectorAll('h2, h3');

    if (headings.length === 0) {
      document.getElementById('tocSidebar').style.display = 'none';
      return;
    }

    document.getElementById('tocSidebar').style.display = 'block';

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', `#${heading.id}`);
        }
      });

      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  // === Text Processing ===
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // === Document Loading ===
  async function loadDocument(route) {
    const config = ROUTES[route];
    if (!config) {
      navigate(DEFAULT_ROUTE);
      return;
    }

    // Update title
    docTitle.textContent = config.title;
    document.title = `${config.title} - Open-code-Studio 文档`;

    // Show loading
    docBody.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>加载文档中...</p>
      </div>
    `;
    tocList.innerHTML = '';

    // Update active nav
    updateActiveNav(route);

    try {
      const response = await fetch(`${DOC_DIR}/${config.file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const md = await response.text();

      // Configure marked
      const renderer = new marked.Renderer();

      renderer.heading = function({ text, depth }) {
        const slug = text.toLowerCase()
          .replace(/[^\w\u4e00-\u9fff]+/g, '-')
          .replace(/^-+|-+$/g, '');
        const anchorId = `heading-${Date.now()}-${slug}`;
        return `<h${depth} id="${anchorId}">
          <a class="heading-anchor" href="#${anchorId}" aria-hidden="true">#</a>
          ${text}
        </h${depth}>`;
      };

      renderer.code = function({ text, lang, escaped }) {
        const language = lang || '';
        const validLang = language && hljs.getLanguage(language) ? language : '';
        const highlighted = validLang
          ? hljs.highlight(text, { language: validLang }).value
          : escapeHtml(text);
        return `<pre data-language="${language}"><code class="hljs${validLang ? ' language-' + validLang : ''}">${highlighted}</code></pre>`;
      };

      renderer.link = function({ href, tokens }) {
        const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
        const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        const inner = this.parser.parseInline(tokens);
        return `<a href="${href}"${attrs}>${inner}</a>`;
      };

      marked.use({ renderer, breaks: true, gfm: true });

      const html = marked.parse(md);

      // Set content
      docBody.innerHTML = html;

      // Generate TOC
      generateTOC(docBody);

      // Set meta
      docMeta.innerHTML = `<span>Open-code-Studio · 文档站点</span>`;

    } catch (err) {
      console.error('Failed to load document:', err);
      docBody.innerHTML = `
        <div class="loading-state" style="gap: 12px;">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--md-sys-color-error)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <p>文档加载失败</p>
          <p style="font-size: 14px; color: var(--md-sys-color-on-surface-variant);">${err.message}</p>
          <button onclick="location.reload()" style="
            margin-top: 12px;
            padding: 8px 24px;
            border-radius: var(--md-sys-shape-full);
            border: none;
            background-color: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            cursor: pointer;
            font-size: 14px;
          ">重新加载</button>
        </div>
      `;
    }
  }

  // === Router ===
  function navigate(route) {
    const hash = route.startsWith('#') ? route.slice(1) : route;
    window.location.hash = hash || DEFAULT_ROUTE;
  }

  function handleRoute() {
    const hash = window.location.hash.slice(1) || DEFAULT_ROUTE;
    loadDocument(hash);
  }

  window.addEventListener('hashchange', handleRoute);

  // === Initialize ===
  function init() {
    if (!window.location.hash) {
      window.location.hash = DEFAULT_ROUTE;
    } else {
      handleRoute();
    }
  }

  function waitForDeps() {
    if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
      init();
    } else {
      setTimeout(waitForDeps, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForDeps);
  } else {
    waitForDeps();
  }

  // === Theme Toggle Event ===
  themeToggle.addEventListener('click', toggleTheme);

  // === Keyboard shortcuts ===
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });

})();
