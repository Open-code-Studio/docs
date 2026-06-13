/* ============================================
   OCS JMCL Docs - Main Application
   ============================================ */

(function() {
  'use strict';

  // === Configuration ===
  const ROUTES = {
    '/':             { file: 'README_zh.md',         title: '项目介绍', icon: 'home' },
    '/platform':     { file: 'PLATFORM_zh.md',        title: '平台支持', icon: 'devices' },
    '/release':      { file: 'ReleaseSchedule_zh.md', title: '发布计划', icon: 'schedule' },
    '/contributing': { file: 'Contributing_zh.md',    title: '贡献指南', icon: 'handshake' },
    '/macos':        { file: 'macOS_Usage_zh.md',     title: 'macOS 技巧', icon: 'computer' },
    '/localization': { file: 'Localization_zh.md',    title: '本地化指南', icon: 'translate' },
    '/license':      { file: '使用许可.txt',           title: '使用许可', icon: 'description' },
  };

  // Build filename → route reverse mapping for internal doc links
  const FILE_TO_ROUTE = {};
  for (const [route, cfg] of Object.entries(ROUTES)) {
    FILE_TO_ROUTE[cfg.file] = route;
  }

  const DEFAULT_ROUTE = '/';
  const DOC_DIR = '../docs/JMCL';

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

    // Update theme icon SVG (moon for dark, sun for light)
    const isDark = theme === 'dark';
    themeIcon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'       // moon
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'; // sun
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Listen for system theme changes
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
    if (sidebar.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on nav click (mobile)
  navList.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      closeDrawer();
    }
  });

  // === Scroll to Top ===
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
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

      // Smooth scroll for TOC links
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

  // === Markdown Processing ===
  function preprocessMarkdown(md) {
    // Strip macro comments like <!-- #BEGIN ... --> and <!-- #END ... -->
    md = md.replace(/<!--\s*#(?:BEGIN|END)\s+\w+\s*-->/g, '');
    // Strip <!-- #PROPERTY ... --> lines
    md = md.replace(/<!--\s*#PROPERTY.*?-->/g, '');
    // Strip language switcher div
    md = md.replace(/<div align="center">[\s\S]*?<\/div>/g, '');
    // Clean up empty lines
    md = md.replace(/\n{3,}/g, '\n\n');
    return md.trim();
  }

  function processTxt(text) {
    // Convert plain text file to HTML paragraphs
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        if (inList) {
          html += '</ol>';
          inList = false;
        }
        continue;
      }

      // Check if looks like a heading (numbered with period like "第一条")
      if (/^第[一二三四五六七八九十百千]+条/.test(line)) {
        if (inList) {
          html += '</ol>';
          inList = false;
        }
        html += `<h2 id="heading-${i}">${escapeHtml(line)}</h2>`;
        continue;
      }

      // Check if looks like a list item (numbered like "1)" or "1.")
      if (/^\d+[\)\.]/.test(line) || /^[\(（]\d+[\)）]/.test(line)) {
        if (!inList) {
          html += '<ol style="list-style: none; padding-left: 0;">';
          inList = true;
        }
        const content = line.replace(/^[\d]+[\)\.]\s*/, '').replace(/^[\(（][\d]+[\)）]\s*/, '');
        const numPrefix = line.match(/^[\d]+[\)\.]/);
        html += `<li style="margin-bottom: 8px; padding-left: 1.5em; text-indent: -1.5em;"><strong>${numPrefix ? numPrefix[0] : ''}</strong> ${content}</li>`;
        continue;
      }

      // Check for subsection markers like "(" + letter + ")"
      if (/^[\(（][a-z][\)）]/.test(line)) {
        if (inList) {
          html += '</ol>';
          inList = false;
        }
        html += `<p style="padding-left: 1.5em; margin: 4px 0;"><em>${escapeHtml(line)}</em></p>`;
        continue;
      }

      if (inList) {
        html += '</ol>';
        inList = false;
      }

      // Regular paragraph
      html += `<p>${escapeHtml(line)}</p>`;
    }

    if (inList) {
      html += '</ol>';
    }

    return html;
  }

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
    document.title = `${config.title} - JMCL 文档`;

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

      let html;

      if (config.file.endsWith('.txt')) {
        // Plain text file
        const text = await response.text();
        html = processTxt(text);
      } else {
        // Markdown file
        let md = await response.text();
        md = preprocessMarkdown(md);

        // Configure marked
        const renderer = new marked.Renderer();

        // Custom heading renderer to add anchor links
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

        // Custom code renderer
        renderer.code = function({ text, lang, escaped }) {
          const language = lang || '';
          const validLang = language && hljs.getLanguage(language) ? language : '';
          const highlighted = validLang
            ? hljs.highlight(text, { language: validLang }).value
            : escapeHtml(text);
          return `<pre data-language="${language}"><code class="hljs${validLang ? ' language-' + validLang : ''}">${highlighted}</code></pre>`;
        };

        // Custom link renderer - open external links in new tab
        renderer.link = function({ href, tokens }) {
          const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
          const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
          const inner = this.parser.parseInline(tokens);
          return `<a href="${href}"${attrs}>${inner}</a>`;
        };

        marked.use({ renderer, breaks: true, gfm: true });

        html = marked.parse(md);
      }

      // Set content
      docBody.innerHTML = html;

      // Generate TOC
      generateTOC(docBody);

      // Set meta
      docMeta.innerHTML = `<span>Open-code-Studio · JMCL 文档</span>`;

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

  // Listen for hash changes
  window.addEventListener('hashchange', handleRoute);

  // === Initialize ===
  function init() {
    // If there's no hash, set default
    if (!window.location.hash) {
      window.location.hash = DEFAULT_ROUTE;
    } else {
      handleRoute();
    }
  }

  // Wait for marked and hljs to load
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

  // === Intercept internal .md / .txt links → hash route ===
  docBody.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    // Extract filename from URL (ignore path, hash, query)
    const filename = href.split('/').pop().split('#')[0].split('?')[0];
    const route = FILE_TO_ROUTE[decodeURIComponent(filename)];
    if (route) {
      e.preventDefault();
      navigate(`#${route}`);
    }
  });

  // === Theme Toggle Event ===
  themeToggle.addEventListener('click', toggleTheme);

  // === Keyboard shortcuts ===
  document.addEventListener('keydown', (e) => {
    // Escape to close drawer
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });

})();