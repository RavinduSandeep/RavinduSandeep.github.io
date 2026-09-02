/* ============================================================================
   Ravindu Madanayaka — Engineering Portfolio
   Rendering + interactions. Content lives in data.js (window.PORTFOLIO).
   ========================================================================== */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  if (!D) return;

  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqMobile = matchMedia("(max-width: 759px)");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  var icon = function (id, size) {
    size = size || 16;
    return '<svg width="' + size + '" height="' + size + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  };
  var headerH = function () { return ($(".site-header") || {}).offsetHeight || 64; };
  var fitOf = function (p) { return p.coverFit === "cover" ? "cover" : "contain"; };
  var mediaHTML = function (p, cls, eager) {
    return '<div class="' + cls + ' fit-' + fitOf(p) + '">' +
      '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '"' + (eager ? "" : ' loading="lazy"') + ' decoding="async" />' +
      "</div>";
  };
  var tagsHTML = function (list, cls) {
    return (list || []).map(function (t) { return '<span class="' + (cls || "tag") + '">' + esc(t) + "</span>"; }).join("");
  };
  // Make a non-button element behave like a button (Enter / Space).
  var buttonize = function (node, fn) {
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.addEventListener("click", fn);
    node.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
    });
  };

  /* ------------------------------------------------------- profile links */
  function fillLinks() {
    var p = D.profile;
    var set = function (sel, v) { $$(sel).forEach(function (n) { n.textContent = v; }); };
    set("[data-profile-subline]", p.subline);
    if (p.name) set("[data-profile-name]", p.name);
    if (p.title) set("[data-profile-title]", p.title);
    if (p.specialization) set("[data-profile-specialization]", p.specialization);
    set("[data-email-text]", p.email || "");
    var link = function (sel, href) {
      $$(sel).forEach(function (a) { if (href) { a.href = href; } else { a.style.display = "none"; } });
    };
    link("[data-resume]", p.resume);
    link("[data-github]", p.github);
    link("[data-linkedin]", p.linkedin);
    link("[data-scholar]", p.scholar);
    link("[data-email]", p.email ? "mailto:" + p.email : "");
    var roles = $("[data-roles]");
    if (roles) p.roles.forEach(function (r) { roles.appendChild(el("li", null, esc(r))); });
    var y = $("[data-year]"); if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------- stack panel */
  function buildSpec() {
    var host = $("[data-spec]");
    if (!host) return;
    var rows = D.stack.map(function (s, i) {
      var r = el("div", "spec-row");
      r.innerHTML =
        '<span class="spec-idx">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="spec-layer">' + esc(s.layer) + "</span>" +
        '<span class="spec-note">' + esc(s.note) + "</span>" +
        '<span class="spec-pip" aria-hidden="true"></span>';
      host.appendChild(r);
      return r;
    });
    if (reduceMotion) { rows.forEach(function (r) { r.classList.add("lit"); }); return; }
    var i = 0;
    rows[0].classList.add("lit");
    setInterval(function () {
      rows[i].classList.remove("lit");
      i = (i + 1) % rows.length;
      rows[i].classList.add("lit");
    }, 1800);
  }

  /* ------------------------------------------------------- featured */
  function buildFeatured() {
    var host = $("[data-featured]");
    if (!host) return;
    var list = D.projects.filter(function (p) { return p.featured; }).slice(0, 4);
    list.forEach(function (p) {
      var t = el("article", "ftile");
      t.setAttribute("aria-label", "Open case study: " + p.title);
      t.innerHTML =
        mediaHTML(p, "ftile-media") +
        '<div class="ftile-body"><span class="ftile-cat">' + esc(p.category) + "</span>" +
        '<h3 class="ftile-title">' + esc(p.title) + "</h3></div>";
      buttonize(t, function () { openProject(D.projects, D.projects.indexOf(p), t); });
      host.appendChild(t);
    });
  }

  /* ------------------------------------------------------- projects rail */
  var rail = $("[data-projects]");
  var railCount = $("[data-rail-count]");
  var railPrev = $("[data-rail-prev]");
  var railNext = $("[data-rail-next]");
  var activeFilter = "All";
  var visible = [];

  function categories() {
    var set = ["All"];
    D.projects.forEach(function (p) { if (set.indexOf(p.category) === -1) set.push(p.category); });
    return set;
  }
  function buildFilters() {
    var host = $("[data-filters]");
    if (!host) return;
    categories().forEach(function (cat) {
      var b = el("button", "tab", esc(cat));
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", cat === "All" ? "true" : "false");
      b.addEventListener("click", function () {
        activeFilter = cat;
        $$(".tab", host).forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
        renderProjects();
      });
      host.appendChild(b);
    });
  }
  function projectCard(p, i) {
    var c = el("article", "pcard");
    c.setAttribute("aria-label", "Open case study: " + p.title);
    var badges = p.confidential ? '<span class="badge conf">Confidential</span>' : "";
    c.innerHTML =
      '<div class="pcard-media fit-' + fitOf(p) + '">' +
        (badges ? '<div class="pcard-badges">' + badges + "</div>" : "") +
        '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async" />' +
      "</div>" +
      '<div class="pcard-body">' +
        '<div class="pcard-meta"><span class="pcard-cat">' + esc(p.category) + '</span><span class="pcard-year">' + esc(p.year) + "</span></div>" +
        '<h3 class="pcard-title">' + esc(p.title) + "</h3>" +
        '<p class="pcard-problem">' + esc(p.problem) + "</p>" +
        '<div class="pcard-tags">' + tagsHTML(p.tech) + "</div>" +
        '<span class="pcard-cta">Open case study ' + icon("i-arrow", 14) + "</span>" +
      "</div>";
    buttonize(c, function () { openProject(visible, i, c); });
    return c;
  }
  function renderProjects() {
    if (!rail) return;
    visible = D.projects.filter(function (p) { return activeFilter === "All" || p.category === activeFilter; });
    rail.innerHTML = "";
    rail.classList.toggle("rail-empty", visible.length === 0);
    if (!visible.length) { rail.innerHTML = "<p>No projects in this category yet.</p>"; }
    visible.forEach(function (p, i) { rail.appendChild(projectCard(p, i)); });
    rail.scrollLeft = 0;
    updateRail();
  }
  function railCards() { return $$(".pcard", rail); }
  function railPad() { return parseFloat(getComputedStyle(rail).paddingLeft) || 0; }
  function cardStart(c) { return c.offsetLeft - railPad(); }
  function currentIndex() {
    var cards = railCards(), sl = rail.scrollLeft, idx = 0, best = Infinity;
    cards.forEach(function (c, i) {
      var d = Math.abs(cardStart(c) - sl);
      if (d < best) { best = d; idx = i; }
    });
    return idx;
  }
  function updateRail() {
    if (!rail) return;
    var cards = railCards(), n = cards.length;
    var idx = n ? currentIndex() : -1;
    if (railCount) railCount.textContent = (n ? idx + 1 : 0) + " / " + n;
    var atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    if (railPrev) railPrev.disabled = idx <= 0;
    if (railNext) railNext.disabled = n === 0 || atEnd;
  }
  function scrollToCard(i) {
    var cards = railCards();
    if (!cards[i]) return;
    rail.scrollTo({ left: cardStart(cards[i]), behavior: reduceMotion ? "auto" : "smooth" });
  }
  function initRail() {
    if (!rail) return;
    var ticking = false;
    rail.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateRail(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", updateRail);
    if (railPrev) railPrev.addEventListener("click", function () { scrollToCard(currentIndex() - 1); });
    if (railNext) railNext.addEventListener("click", function () { scrollToCard(currentIndex() + 1); });
    // Keyboard: left/right arrows move the rail when a card is focused.
    rail.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); var n = railCards()[currentIndex() + 1]; if (n) n.focus(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); var pv = railCards()[currentIndex() - 1]; if (pv) pv.focus(); }
    });
  }

  /* ------------------------------------------------------- modal */
  var modal = $("#projectModal");
  var modalSide = $("[data-modal-side]");
  var modalMain = $("[data-modal-main]");
  var modalList = [], modalIdx = -1, lastFocused = null;

  function archFlow(steps) {
    return '<div class="arch-flow">' + steps.map(function (s, i) {
      return '<span class="arch-node"><span class="box">' + esc(s) + "</span>" +
        (i < steps.length - 1 ? '<span class="arrow" aria-hidden="true">→</span>' : "") + "</span>";
    }).join("") + "</div>";
  }
  function section(title, body) {
    return '<div class="modal-section"><h4>' + esc(title) + "</h4>" + body + "</div>";
  }
  function renderModal() {
    var p = modalList[modalIdx];
    if (!p) return;
    $("[data-modal-cat]").textContent = p.category;
    $("[data-modal-year]").textContent = p.year;
    $("[data-modal-title]").textContent = p.title;

    var links = "";
    if (p.links) {
      if (p.links.github) links += '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(p.links.github) + '">' + icon("i-github", 14) + "GitHub</a>";
      if (p.links.demo) links += '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(p.links.demo) + '">Live demo ' + icon("i-ext", 14) + "</a>";
      if (p.links.caseStudy) links += '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(p.links.caseStudy) + '">Read more ' + icon("i-ext", 14) + "</a>";
    }
    modalSide.innerHTML =
      mediaHTML(p, "modal-hero", true) +
      '<div class="side-block"><h4>Technologies</h4><div class="side-chips">' + tagsHTML(p.tech, "chip") + "</div></div>" +
      (links ? '<div class="side-block"><h4>Links</h4><div class="modal-links">' + links + "</div></div>" : "") +
      (p.confidential ? '<p class="modal-note">Some technical details, metrics and source are confidential to the employer/client and are intentionally omitted.</p>' : "");

    var contribution = (p.contribution || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var prev = modalList[modalIdx - 1], next = modalList[modalIdx + 1];
    modalMain.innerHTML =
      section("The challenge", "<p>" + esc(p.challenge) + "</p>") +
      section("The solution", "<p>" + esc(p.solution) + "</p>") +
      (contribution ? section("My contribution", '<ul class="dash-list">' + contribution + "</ul>") : "") +
      (p.architecture ? section("System architecture", archFlow(p.architecture)) : "") +
      section("Result / impact", "<p>" + esc(p.result) + "</p>") +
      '<div class="modal-foot">' +
        '<button type="button" class="modal-navbtn prev" data-modal-prev' + (prev ? "" : " disabled") + '><small>Previous</small><span>' + esc(prev ? prev.title : "—") + "</span></button>" +
        '<button type="button" class="modal-navbtn next" data-modal-next' + (next ? "" : " disabled") + '><small>Next</small><span>' + esc(next ? next.title : "—") + "</span></button>" +
      "</div>";
    modalMain.scrollTop = 0;
    modalSide.scrollTop = 0;
    $(".modal-panel", modal).scrollTop = 0;
    var pb = $("[data-modal-prev]", modalMain), nb = $("[data-modal-next]", modalMain);
    if (pb) pb.addEventListener("click", function () { if (modalIdx > 0) { modalIdx--; renderModal(); } });
    if (nb) nb.addEventListener("click", function () { if (modalIdx < modalList.length - 1) { modalIdx++; renderModal(); } });
  }
  function openProject(list, idx, trigger) {
    if (!modal) return;
    modalList = list; modalIdx = idx;
    lastFocused = trigger || document.activeElement;
    renderModal();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
    document.addEventListener("keydown", onModalKey);
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKey);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function onModalKey(e) {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key === "ArrowRight" && modalIdx < modalList.length - 1) { modalIdx++; renderModal(); return; }
    if (e.key === "ArrowLeft" && modalIdx > 0) { modalIdx--; renderModal(); return; }
    if (e.key === "Tab") {
      var f = $$('a[href], button:not([disabled])', modal).filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  if (modal) $$("[data-modal-close]", modal).forEach(function (b) { b.addEventListener("click", closeModal); });

  /* ------------------------------------------------------- experience tabs */
  function buildExperience() {
    var tabs = $("[data-xp-tabs]"), panels = $("[data-xp-panels]");
    if (!tabs || !panels) return;
    var tabEls = [], panelEls = [];
    D.experience.forEach(function (x, i) {
      var t = el("button", "xp-tab");
      t.type = "button";
      t.id = "xp-tab-" + i;
      t.setAttribute("role", "tab");
      t.setAttribute("aria-controls", "xp-panel-" + i);
      t.innerHTML =
        '<span class="xp-tab-co">' + esc(x.company) + "</span>" +
        '<span class="xp-tab-role">' + esc(x.role) + "</span>" +
        '<span class="xp-tab-period">' + esc(x.period) + "</span>";
      t.addEventListener("click", function () { select(i); });
      tabs.appendChild(t); tabEls.push(t);

      var p = el("div", "xp-panel");
      p.id = "xp-panel-" + i;
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", t.id);
      p.innerHTML =
        '<div class="xp-period">' + esc(x.period) + "</div>" +
        '<h3 class="xp-role">' + esc(x.role) + "</h3>" +
        '<div class="xp-co">' + esc(x.company) + ' · <span class="xp-loc">' + esc(x.location) + "</span></div>" +
        '<p class="xp-summary">' + esc(x.summary) + "</p>" +
        '<ul class="xp-points">' + x.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>" +
        '<div class="xp-tags">' + tagsHTML(x.tech) + "</div>";
      panels.appendChild(p); panelEls.push(p);
    });
    function select(i, focus) {
      tabEls.forEach(function (t, j) {
        t.setAttribute("aria-selected", j === i ? "true" : "false");
        t.setAttribute("tabindex", j === i ? "0" : "-1");
      });
      panelEls.forEach(function (p, j) {
        p.hidden = j !== i;
        if (j === i) { p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; }
      });
      if (focus) tabEls[i].focus();
      if (mqMobile.matches) tabEls[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    }
    tabs.addEventListener("keydown", function (e) {
      var cur = tabEls.indexOf(document.activeElement);
      if (cur < 0) return;
      var n = tabEls.length, next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (cur + 1) % n;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (cur - 1 + n) % n;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = n - 1;
      if (next != null) { e.preventDefault(); select(next, true); }
    });
    select(0);
  }

  /* ------------------------------------------------------- skills */
  function buildCapabilities() {
    var host = $("[data-capabilities]");
    if (!host) return;
    D.capabilities.forEach(function (g) {
      var d = el("details", "cap-card");
      d.innerHTML =
        '<summary><span class="dot" aria-hidden="true"></span>' + esc(g.group) +
          '<span class="cap-count">' + g.items.length + "</span>" +
          '<span class="cap-chev">' + icon("i-chev-d", 18) + "</span></summary>" +
        '<div class="cap-chips">' + tagsHTML(g.items, "chip") + "</div>";
      var s = $("summary", d);
      s.addEventListener("click", function (e) { if (!mqMobile.matches) e.preventDefault(); });
      host.appendChild(d);
    });
    syncAccordion();
  }
  function syncAccordion() {
    var mobile = mqMobile.matches;
    $$(".cap-card").forEach(function (d, i) { d.open = mobile ? i === 0 : true; });
  }

  /* ------------------------------------------------------- research */
  function buildAchievements() {
    var host = $("[data-achievements]");
    if (!host || !D.achievements) return;
    D.achievements.forEach(function (a) {
      host.appendChild(el("div", "ach",
        '<span class="ach-label">' + esc(a.label) + "</span>" +
        '<span class="ach-detail">' + esc(a.detail) + "</span>" +
        '<span class="ach-year">' + esc(a.year) + "</span>"));
    });
  }
  function buildResearch() {
    var host = $("[data-research]");
    if (!host) return;
    D.research.forEach(function (r) {
      host.appendChild(el("article", "rcard",
        '<div class="rcard-top"><span class="rbadge">★ ' + esc(r.award) + '</span><span class="rcard-year">' + esc(r.year) + "</span></div>" +
        '<h4 class="rcard-title">' + esc(r.title) + "</h4>" +
        '<p class="rcard-venue">' + esc(r.venue) + "</p>" +
        '<dl class="rcard-pao">' +
          "<div><dt>Problem</dt><dd>" + esc(r.problem) + "</dd></div>" +
          "<div><dt>Approach</dt><dd>" + esc(r.approach) + "</dd></div>" +
          "<div><dt>Outcome</dt><dd>" + esc(r.outcome) + "</dd></div>" +
        "</dl>"));
    });
  }
  function buildPublications() {
    var host = $("[data-publications]");
    if (!host || !D.publications) return;
    D.publications.forEach(function (pub) {
      host.appendChild(el("li", "pub",
        '<div class="pub-top"><span class="pub-type">' + esc(pub.type) + '</span><span class="pub-year">' + esc(pub.year) + "</span></div>" +
        '<h4 class="pub-title">' + esc(pub.title) + "</h4>" +
        '<p class="pub-authors">' + esc(pub.authors).replace(/(R\.S\.W\.\s*Madanayaka)/, "<strong>$1</strong>") + "</p>" +
        '<p class="pub-venue">' + esc(pub.venue) + "</p>" +
        (pub.link ? '<a class="pub-link" href="' + esc(pub.link) + '" target="_blank" rel="noopener">View publication ' + icon("i-ext", 12) + "</a>" : "")));
    });
  }

  /* ------------------------------------------------------- education */
  function buildEducation() {
    var host = $("[data-education]");
    if (!host) return;
    D.education.forEach(function (e2) {
      host.appendChild(el("li", "edu" + (e2.primary ? " primary" : ""),
        '<span class="edu-period">' + esc(e2.period) + "</span>" +
        '<h3 class="edu-qual">' + esc(e2.qualification) + "</h3>" +
        '<span class="edu-school">' + esc(e2.school) + "</span>" +
        (e2.detail ? '<p class="edu-detail">' + esc(e2.detail) + "</p>" : "")));
    });
  }

  /* ------------------------------------------------------- reveal */
  function initReveal() {
    var targets = $$(".reveal, .stagger");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      targets.forEach(function (t) { t.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
    // Safety net: anything already in the viewport is revealed even if the
    // observer is delayed (e.g. background tab, throttled timers).
    setTimeout(function () {
      targets.forEach(function (t) {
        if (t.getBoundingClientRect().top < window.innerHeight) t.classList.add("in");
      });
    }, 1500);
  }

  /* ------------------------------------------------------- nav spy */
  function initNavSpy() {
    var header = $(".site-header");
    var links = $$("[data-nav]");
    var ids = [];
    links.forEach(function (l) {
      var id = (l.getAttribute("href") || "").replace("#", "");
      if (id && ids.indexOf(id) === -1 && document.getElementById(id)) ids.push(id);
    });
    var sections = ids.map(function (id) { return document.getElementById(id); });
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      var y = window.scrollY + headerH() + 40;
      var ordered = sections.slice().sort(function (a, b) { return a.offsetTop - b.offsetTop; });
      var cur = ordered.length ? ordered[0].id : "";
      ordered.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
      var doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2 && ordered.length) cur = ordered[ordered.length - 1].id;
      links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + cur); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    // "Home" links go to the very top rather than the hero's scroll-padding offset.
    $$("[data-home]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", location.pathname + location.search);
      });
    });
  }

  /* ------------------------------------------------------- mobile menu */
  function initMenu() {
    var btn = $("#menuBtn"), nav = $("#primaryNav"), backdrop = $("#navBackdrop");
    if (!btn || !nav) return;
    function toggle(open) {
      var willOpen = open != null ? open : !nav.classList.contains("open");
      nav.classList.toggle("open", willOpen);
      btn.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
      btn.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
      if (backdrop) backdrop.hidden = !willOpen;
    }
    btn.addEventListener("click", function () { toggle(); });
    if (backdrop) backdrop.addEventListener("click", function () { toggle(false); });
    $$("a", nav).forEach(function (l) { l.addEventListener("click", function () { toggle(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) toggle(false); });
    var mqNav = matchMedia("(min-width: 901px)");
    var onChange = function () { if (mqNav.matches) toggle(false); };
    mqNav.addEventListener ? mqNav.addEventListener("change", onChange) : mqNav.addListener(onChange);
  }

  /* ------------------------------------------------------- theme */
  function initTheme() {
    var btn = $("#themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------- init */
  fillLinks();
  buildSpec();
  buildFeatured();
  buildFilters();
  renderProjects();
  initRail();
  buildExperience();
  buildCapabilities();
  buildAchievements();
  buildResearch();
  buildPublications();
  buildEducation();
  initReveal();
  initNavSpy();
  initMenu();
  initTheme();
  var onMq = function () { syncAccordion(); updateRail(); };
  mqMobile.addEventListener ? mqMobile.addEventListener("change", onMq) : mqMobile.addListener(onMq);
  window.addEventListener("load", updateRail);
})();
