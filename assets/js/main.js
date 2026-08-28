/* ============================================================================
   Ravindu Madanayaka — Engineering Portfolio
   Rendering + interactions. Content lives in data.js (window.PORTFOLIO).
   ========================================================================== */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  if (!D) return;

  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  // Basic HTML escape for text injected into markup.
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  /* ------------------------------------------------------- profile links */
  function fillLinks() {
    var p = D.profile;
    $("[data-profile-subline]") && ($("[data-profile-subline]").textContent = p.subline);
    $$("[data-resume]").forEach(function (a) {
      if (p.resume) { a.href = p.resume; } else { a.style.display = "none"; }
    });
    $$("[data-github]").forEach(function (a) { p.github ? (a.href = p.github) : (a.style.display = "none"); });
    $$("[data-linkedin]").forEach(function (a) { p.linkedin ? (a.href = p.linkedin) : (a.style.display = "none"); });
    $$("[data-email]").forEach(function (a) { p.email ? (a.href = "mailto:" + p.email) : (a.style.display = "none"); });
    var roles = $("[data-roles]");
    if (roles) p.roles.forEach(function (r) { roles.appendChild(el("li", null, esc(r))); });
    var y = $("[data-year]"); if (y) y.textContent = "2026";
  }

  /* --------------------------------------------------------- hero dataflow */
  function buildDataflow() {
    var host = $("[data-dataflow]");
    if (!host) return;
    var nodes = [];
    D.dataflow.forEach(function (name, i) {
      var node = el("div", "node");
      node.innerHTML =
        '<span class="node-idx">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="node-name">' + esc(name) + "</span>" +
        '<span class="node-pip"></span>';
      host.appendChild(node);
      nodes.push(node);
      if (i < D.dataflow.length - 1) {
        var link = el("div", "node-link");
        host.appendChild(link);
        node._link = link;
      }
    });
    if (reduceMotion) { nodes.forEach(function (n) { n.classList.add("lit"); if (n._link) n._link.classList.add("lit"); }); return; }
    var i = 0;
    setInterval(function () {
      nodes.forEach(function (n) { n.classList.remove("lit"); if (n._link) n._link.classList.remove("lit"); });
      var lit = 0;
      var tick = setInterval(function () {
        if (lit > i) { clearInterval(tick); return; }
        var n = nodes[lit];
        if (n) { n.classList.add("lit"); if (n._link) n._link.classList.add("lit"); }
        lit++;
      }, 130);
      i = (i + 1) % nodes.length;
    }, 2600);
  }

  /* -------------------------------------------------------------- stack */
  function buildStack() {
    var host = $("[data-stack]");
    if (!host) return;
    D.stack.forEach(function (s, i) {
      var item = el("div", "stack-item reveal");
      item.innerHTML =
        '<div class="stack-num">' + String(i + 1).padStart(2, "0") + "</div>" +
        '<div class="stack-layer">' + esc(s.layer) + "</div>" +
        '<p class="stack-note">' + esc(s.note) + "</p>";
      host.appendChild(item);
    });
  }

  /* ------------------------------------------------------------ projects */
  var activeFilter = "All";
  function projectCategories() {
    var set = ["All"];
    D.projects.forEach(function (p) { if (set.indexOf(p.category) === -1) set.push(p.category); });
    return set;
  }
  function buildFilters() {
    var host = $("[data-filters]");
    if (!host) return;
    projectCategories().forEach(function (cat) {
      var b = el("button", "filter-btn" + (cat === "All" ? " active" : ""), esc(cat));
      b.setAttribute("type", "button");
      b.addEventListener("click", function () {
        activeFilter = cat;
        $$(".filter-btn", host).forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderProjects();
      });
      host.appendChild(b);
    });
  }
  function card(p) {
    var c = el("button", "project-card" + (p.featured ? " featured" : ""));
    c.setAttribute("type", "button");
    c.setAttribute("aria-label", "Open case study: " + p.title);
    var badges = '<span class="card-badge">' + esc(p.year) + "</span>";
    if (p.confidential) badges += '<span class="card-badge conf">Confidential</span>';
    var tags = (p.tech || []).slice(0, p.featured ? 6 : 4)
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    var extra = (p.tech || []).length - (p.featured ? 6 : 4);
    if (extra > 0) tags += '<span class="tag more">+' + extra + "</span>";
    var fit = p.coverFit === "cover" ? "cover" : "contain";
    c.innerHTML =
      '<div class="card-media fit-' + fit + '">' +
        '<div class="card-badges">' + badges + "</div>" +
        '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy" style="object-fit:' + fit + '" />' +
        '<span class="card-open">Case study →</span>' +
      "</div>" +
      '<div class="card-body">' +
        '<span class="card-cat">' + esc(p.category) + "</span>" +
        '<h3 class="card-title">' + esc(p.title) + "</h3>" +
        '<p class="card-problem">' + esc(p.problem) + "</p>" +
        '<div class="card-tags">' + tags + "</div>" +
      "</div>";
    c.addEventListener("click", function () { openModal(p); });
    return c;
  }
  function renderProjects() {
    var host = $("[data-projects]");
    if (!host) return;
    host.innerHTML = "";
    D.projects
      .filter(function (p) { return activeFilter === "All" || p.category === activeFilter; })
      .forEach(function (p) { host.appendChild(card(p)); });
    // trigger reveal for freshly injected cards
    requestAnimationFrame(function () { host.classList.add("in"); });
  }

  /* -------------------------------------------------------------- modal */
  var modal = $("#projectModal");
  var modalBody = $("[data-modal-body]");
  var lastFocused = null;

  function archFlow(steps) {
    return '<div class="arch-flow">' + steps.map(function (s, i) {
      return '<span class="arch-node"><span class="box">' + esc(s) + "</span>" +
        (i < steps.length - 1 ? '<span class="arrow">→</span>' : "") + "</span>";
    }).join("") + "</div>";
  }
  function openModal(p) {
    if (!modal) return;
    lastFocused = document.activeElement;
    var links = "";
    if (p.links) {
      if (p.links.github) links += '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + esc(p.links.github) + '">GitHub ↗</a>';
      if (p.links.demo) links += '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + esc(p.links.demo) + '">Live demo ↗</a>';
      if (p.links.caseStudy) links += '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + esc(p.links.caseStudy) + '">Read more ↗</a>';
    }
    var contribution = (p.contribution || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    modalBody.innerHTML =
      '<span class="modal-cat">' + esc(p.category) + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + esc(p.title) + "</h3>" +
      '<span class="modal-year">' + esc(p.year) + "</span>" +
      '<div class="modal-hero fit-' + (p.coverFit === "cover" ? "cover" : "contain") + '"><img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" style="object-fit:' + (p.coverFit === "cover" ? "cover" : "contain") + '" /></div>' +
      section("The Challenge", "<p>" + esc(p.challenge) + "</p>") +
      section("The Solution", "<p>" + esc(p.solution) + "</p>") +
      (contribution ? section("My Contribution", "<ul>" + contribution + "</ul>") : "") +
      (p.architecture ? section("System Architecture", archFlow(p.architecture)) : "") +
      section("Technologies", '<div class="modal-tags">' + (p.tech || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>") +
      section("Result / Impact", "<p>" + esc(p.result) + "</p>") +
      (p.confidential ? '<div class="modal-note">Some technical details, metrics and source are confidential to the employer/client and are intentionally omitted.</div>' : "") +
      (links ? '<div class="modal-links">' + links + "</div>" : "");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
    document.addEventListener("keydown", onKey);
  }
  function section(title, body) {
    return '<div class="modal-section"><h4>' + esc(title) + "</h4>" + body + "</div>";
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (lastFocused) lastFocused.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      var f = $$('a[href], button:not([disabled])', modal).filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  if (modal) $$("[data-modal-close]", modal).forEach(function (b) { b.addEventListener("click", closeModal); });

  /* --------------------------------------------------------- capabilities */
  function buildCapabilities() {
    var host = $("[data-capabilities]");
    if (!host) return;
    D.capabilities.forEach(function (g) {
      var card = el("div", "cap-card reveal");
      card.innerHTML =
        '<div class="cap-head"><span class="dot"></span><h3>' + esc(g.group) + "</h3></div>" +
        '<ul class="cap-list">' + g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
      host.appendChild(card);
    });
  }

  /* ---------------------------------------------------------- experience */
  function buildExperience() {
    var host = $("[data-experience]");
    if (!host) return;
    D.experience.forEach(function (e2) {
      var li = el("li", "tl-item");
      li.innerHTML =
        '<div class="tl-period">' + esc(e2.period) + "</div>" +
        '<h3 class="tl-role">' + esc(e2.role) + "</h3>" +
        '<div class="tl-company">' + esc(e2.company) + ' · <span class="tl-loc">' + esc(e2.location) + "</span></div>" +
        '<p class="tl-summary">' + esc(e2.summary) + "</p>" +
        '<ul class="tl-points">' + e2.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
        '<div class="tl-tags">' + (e2.tech || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>";
      host.appendChild(li);
    });
  }

  /* ------------------------------------------------------------ research */
  function buildResearch() {
    var host = $("[data-research]");
    if (!host) return;
    D.research.forEach(function (r) {
      var card = el("div", "research-card reveal");
      card.innerHTML =
        '<span class="research-award">★ ' + esc(r.award) + "</span>" +
        '<h3 class="research-title">' + esc(r.title) + "</h3>" +
        '<p class="research-venue">' + esc(r.venue) + " · " + esc(r.year) + "</p>" +
        '<div class="research-row"><dt>Problem</dt><dd>' + esc(r.problem) + "</dd></div>" +
        '<div class="research-row"><dt>Approach</dt><dd>' + esc(r.approach) + "</dd></div>" +
        '<div class="research-row"><dt>Outcome</dt><dd>' + esc(r.outcome) + "</dd></div>";
      host.appendChild(card);
    });
  }

  /* --------------------------------------------------------- publications */
  function buildPublications() {
    var host = $("[data-publications]");
    if (!host || !D.publications) return;
    D.publications.forEach(function (pub) {
      var card = el("div", "pub-card reveal");
      card.innerHTML =
        '<div class="pub-top"><span class="pub-type">' + esc(pub.type) + "</span>" +
        '<span class="pub-year">' + esc(pub.year) + "</span></div>" +
        '<h3 class="pub-title">' + esc(pub.title) + "</h3>" +
        '<p class="pub-authors">' + esc(pub.authors).replace(/(R\.S\.W\.\s*Madanayaka)/, '<strong style="color:var(--text)">$1</strong>') + "</p>" +
        '<p class="pub-venue">' + esc(pub.venue) + "</p>" +
        (pub.link ? '<a class="pub-link" href="' + esc(pub.link) + '" target="_blank" rel="noopener">View publication ↗</a>' : "");
      host.appendChild(card);
    });
    var s = $("[data-scholar]");
    if (s) { D.profile.scholar ? (s.href = D.profile.scholar) : (s.style.display = "none"); }
  }

  /* ----------------------------------------------------------- education */
  function buildEducation() {
    var host = $("[data-education]");
    if (!host) return;
    D.education.forEach(function (e2) {
      var card = el("div", "edu-card reveal" + (e2.primary ? " primary" : ""));
      card.innerHTML =
        '<div class="edu-period">' + esc(e2.period) + "</div>" +
        '<h3 class="edu-qual">' + esc(e2.qualification) + "</h3>" +
        '<div class="edu-school">' + esc(e2.school) + "</div>" +
        (e2.detail ? '<p class="edu-detail">' + esc(e2.detail) + "</p>" : "");
      host.appendChild(card);
    });
  }

  /* -------------------------------------------------- scroll interactions */
  function initReveal() {
    var targets = $$(".reveal, .projects-grid, .cap-grid, .stack-flow, .research-grid, .edu-grid, .timeline");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      targets.forEach(function (t) { t.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  function initNavSpy() {
    var header = $(".site-header");
    var links = $$("[data-nav]");
    var sections = links.map(function (l) { return $(l.getAttribute("href")); }).filter(Boolean);
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      var pos = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
      links.forEach(function (l) {
        l.classList.toggle("active", current && l.getAttribute("href") === "#" + current.id);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMenu() {
    var btn = $("#menuBtn"), nav = $(".nav");
    if (!btn || !nav) return;
    function toggle(open) {
      var willOpen = open != null ? open : !nav.classList.contains("open");
      nav.classList.toggle("open", willOpen);
      btn.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    }
    btn.addEventListener("click", function () { toggle(); });
    $$(".nav-link").forEach(function (l) { l.addEventListener("click", function () { toggle(false); }); });
  }

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

  /* ---------------------------------------------------------------- init */
  fillLinks();
  buildDataflow();
  buildStack();
  buildFilters();
  renderProjects();
  buildCapabilities();
  buildExperience();
  buildResearch();
  buildPublications();
  buildEducation();
  initReveal();
  initNavSpy();
  initMenu();
  initTheme();
})();
