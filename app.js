let portfolioData = window.portfolioDataFallback;

const state = {
  noteFilter: "全部",
  noteQuery: ""
};

const profile = portfolioData.profile;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
let lastFocusedElement = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProfile() {
  $("#brandMark").textContent = profile.initials;
  $("#brandName").textContent = profile.name;
  $("#heroName").textContent = profile.name;
  $("#heroRole").textContent = profile.role + " · " + profile.focus;
  $("#heroSummary").textContent = profile.summary;
  $("#availability").textContent = profile.availability;
  $("#profileAvatar").textContent = profile.initials;
  $("#panelName").textContent = profile.name;
  $("#panelRole").textContent = profile.role;
  $("#panelEmail").textContent = profile.email;
  $("#panelEmail").href = "mailto:" + profile.email;
  $("#footerName").textContent = profile.name + " · " + profile.role;
  document.title = profile.name + " | " + profile.role + "作品集";

  $("#heroMeta").innerHTML = portfolioData.heroMeta.map(function (item) {
    return "<span>" + escapeHtml(item) + "</span>";
  }).join("");
  $("#panelMetrics").innerHTML = portfolioData.metrics.map(function (metric) {
    return "<div><strong>" + escapeHtml(metric.value) + "</strong><span>" + escapeHtml(metric.label) + "</span></div>";
  }).join("");

  const contactLinks = [
    { label: "GitHub", url: profile.github },
    { label: "所在地", text: profile.location }
  ];
  $("#contactLinks").innerHTML = contactLinks.map(function (item) {
    if (item.url) return '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' + escapeHtml(item.label) + " ↗</a>";
    return "<span>" + escapeHtml(item.text) + "</span>";
  }).join("");
}

function renderProjects() {
  const featured = portfolioData.projects[0];
  $("#featuredProject").innerHTML =
    '<div class="project-visual visual-main" aria-hidden="true">' +
      '<div class="visual-toolbar"><i></i><i></i><i></i><span>data-platform / overview</span></div>' +
      '<div class="visual-dashboard">' +
        '<div class="visual-sidebar"><span></span><span></span><span></span><span></span></div>' +
        '<div class="visual-content">' +
          '<div class="visual-head"><span></span><strong></strong></div>' +
          '<div class="visual-cards"><i></i><i></i><i></i></div>' +
          '<div class="visual-chart"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>' +
        '</div>' +
      '</div>' +
      '<div class="visual-note">' + escapeHtml(featured.highlight) + '</div>' +
    '</div>' +
    '<div class="featured-copy">' +
      '<div class="project-topline"><span>' + escapeHtml(featured.type) + '</span><span>' + escapeHtml(featured.period) + '</span></div>' +
      '<p class="project-role">' + escapeHtml(featured.role) + '</p>' +
      '<h3>' + escapeHtml(featured.title) + '</h3>' +
      '<p>' + escapeHtml(featured.summary) + '</p>' +
      '<div class="project-facts">' +
        '<div><span>主要难点</span><strong>' + escapeHtml(featured.challenge[0]) + '</strong></div>' +
        '<div><span>解决方式</span><strong>' + escapeHtml(featured.solution[0]) + '</strong></div>' +
        '<div><span>最终结果</span><strong>' + escapeHtml(featured.impact[0]) + '</strong></div>' +
      '</div>' +
      '<div class="stack-row">' + featured.stack.map(function (item) { return "<span>" + escapeHtml(item) + "</span>"; }).join("") + '</div>' +
      '<button class="detail-button" type="button" data-project="' + featured.id + '">查看完整项目拆解 <span>↗</span></button>' +
    '</div>';

  $("#projectGrid").innerHTML = portfolioData.projects.slice(1).map(function (project, index) {
    return '<article class="project-card reveal">' +
      '<div class="project-card-top"><span>' + escapeHtml(project.type) + '</span><strong>0' + (index + 2) + '</strong></div>' +
      '<p class="project-role">' + escapeHtml(project.role) + ' · ' + escapeHtml(project.period) + '</p>' +
      '<h3>' + escapeHtml(project.title) + '</h3>' +
      '<p>' + escapeHtml(project.summary) + '</p>' +
      '<div class="project-mini-block"><span>关键问题</span><p>' + escapeHtml(project.challenge[0]) + '</p></div>' +
      '<div class="project-mini-block"><span>解决与结果</span><p>' + escapeHtml(project.impact[0]) + '</p></div>' +
      '<div class="stack-row">' + project.stack.map(function (item) { return "<span>" + escapeHtml(item) + "</span>"; }).join("") + '</div>' +
      '<button class="text-button" type="button" data-project="' + project.id + '">项目详情 <span>→</span></button>' +
    '</article>';
  }).join("");
}

function renderExperience() {
  $("#experienceTimeline").innerHTML = portfolioData.experiences.map(function (experience, index) {
    return '<article class="timeline-item reveal">' +
      '<div class="timeline-dot"><span>' + String(index + 1).padStart(2, "0") + '</span></div>' +
      '<div class="timeline-card">' +
        '<p>' + escapeHtml(experience.period) + '</p>' +
        '<div class="timeline-title"><h3>' + escapeHtml(experience.company) + '</h3><span>' + escapeHtml(experience.role) + '</span></div>' +
        '<p class="timeline-summary">' + escapeHtml(experience.summary) + '</p>' +
        '<ul>' + experience.contributions.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + '</ul>' +
      '</div>' +
    '</article>';
  }).join("");
}

function renderSkills() {
  $("#skillsGrid").innerHTML = portfolioData.skills.map(function (skill) {
    return '<article class="skill-card reveal">' +
      '<div class="skill-icon">' + escapeHtml(skill.icon) + '</div>' +
      '<h3>' + escapeHtml(skill.title) + '</h3>' +
      '<p>' + escapeHtml(skill.description) + '</p>' +
      '<div class="skill-tags">' + skill.tags.map(function (tag) { return "<span>" + escapeHtml(tag) + "</span>"; }).join("") + '</div>' +
    '</article>';
  }).join("");
}

function renderStrengths() {
  $("#strengthGrid").innerHTML = portfolioData.strengths.map(function (item) {
    return '<article class="strength-card reveal"><span>' + escapeHtml(item.number) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p></article>';
  }).join("");
}

function renderNoteFilters() {
  const categories = ["全部"].concat([...new Set(portfolioData.notes.map(function (note) { return note.category; }))]);
  $("#noteFilters").innerHTML = categories.map(function (category) {
    return '<button class="filter-chip' + (category === state.noteFilter ? " active" : "") + '" type="button" data-filter="' + escapeHtml(category) + '">' + escapeHtml(category) + '</button>';
  }).join("");
}

function renderNotes() {
  const query = state.noteQuery.trim().toLowerCase();
  const notes = portfolioData.notes.filter(function (note) {
    const matchesCategory = state.noteFilter === "全部" || note.category === state.noteFilter;
    const searchable = [note.title, note.excerpt, note.category, note.sections.map(function (section) { return section.heading + section.content; }).join(" ")].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  $("#notesGrid").innerHTML = notes.map(function (note, index) {
    const coverStyle = note.coverImage ? ' style="background-image:url(' + escapeHtml(note.coverImage) + ')"' : "";
    const coverClass = note.coverImage ? " has-image" : "";
    return '<article class="note-card reveal visible" style="animation-delay:' + (index * 45) + 'ms">' +
      '<div class="note-cover cover-' + (index % 4 + 1) + coverClass + '"' + coverStyle + '><span>' + escapeHtml(note.category) + '</span><strong>' + escapeHtml(note.number) + '</strong></div>' +
      '<div class="note-body">' +
        '<div class="note-meta"><span>' + escapeHtml(note.date) + '</span><span>' + escapeHtml(note.readTime) + '</span></div>' +
        '<h3>' + escapeHtml(note.title) + '</h3>' +
        '<p>' + escapeHtml(note.excerpt) + '</p>' +
        '<button class="text-button" type="button" data-note="' + note.id + '">阅读复盘 <span>→</span></button>' +
      '</div>' +
    '</article>';
  }).join("");

  const isEmpty = notes.length === 0;
  $("#notesEmpty").hidden = !isEmpty;
  $("#notesGrid").hidden = isEmpty;
}

function openProject(id) {
  const project = portfolioData.projects.find(function (item) { return item.id === id; });
  if (!project) return;
  openModal({
    eyebrow: project.type,
    number: project.number,
    meta: project.role + " · " + project.period + " · " + project.stack.join(" / "),
    title: project.title,
    lead: project.summary,
    sections: [
      { heading: "遇到的难点", content: project.challenge },
      { heading: "我的解决方案", content: project.solution },
      { heading: "项目结果", content: project.impact }
    ]
  });
}

function openNote(id) {
  const note = portfolioData.notes.find(function (item) { return item.id === id; });
  if (!note) return;
  openModal({
    eyebrow: note.category,
    number: note.number,
    meta: note.date + " · " + note.readTime,
    title: note.title,
    lead: note.lead,
    sections: note.sections
  });
}

function renderRichContent(rawContent) {
  if (Array.isArray(rawContent)) {
    return "<ul>" + rawContent.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul>";
  }
  const text = String(rawContent || "").trim();
  if (text.startsWith("<")) return '<div class="rich-text">' + text + "</div>";
  const lines = text.split("\n").map(function (line) { return line.trim(); }).filter(Boolean);
  if (lines.length && lines.every(function (line) { return line.startsWith("- "); })) {
    return "<ul>" + lines.map(function (line) { return "<li>" + escapeHtml(line.slice(2)) + "</li>"; }).join("") + "</ul>";
  }
  return text.split(/\n{2,}/).map(function (paragraph) { return "<p>" + escapeHtml(paragraph.replace(/\n/g, " ")) + "</p>"; }).join("");
}

function openModal(data) {
  $("#modalEyebrow").textContent = data.eyebrow;
  $("#modalNumber").textContent = data.number;
  $("#modalMeta").textContent = data.meta;
  $("#modalTitle").textContent = data.title;
  $("#modalLead").textContent = data.lead;
  $("#modalSections").innerHTML = data.sections.map(function (section) {
    return '<section><h3>' + escapeHtml(section.heading) + '</h3>' + renderRichContent(section.content) + '</section>';
  }).join("");
  lastFocusedElement = document.activeElement;
  $("#detailModal").classList.add("open");
  $("#detailModal").setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $(".modal-close").focus();
}

function closeModal() {
  $("#detailModal").classList.remove("open");
  $("#detailModal").setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hr-portfolio-theme", theme);
  $(".theme-toggle").setAttribute("aria-label", theme === "dark" ? "切换浅色模式" : "切换深色模式");
  $('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#111713" : "#f5f3ed");
}

document.addEventListener("click", function (event) {
  const projectButton = event.target.closest("[data-project]");
  const noteButton = event.target.closest("[data-note]");
  const filterButton = event.target.closest("[data-filter]");
  if (projectButton) openProject(projectButton.dataset.project);
  if (noteButton) openNote(noteButton.dataset.note);
  if (filterButton) {
    state.noteFilter = filterButton.dataset.filter;
    renderNoteFilters();
    renderNotes();
  }
  if (event.target.closest("[data-close-modal]")) closeModal();
});

$("#noteSearch").addEventListener("input", function (event) {
  state.noteQuery = event.target.value;
  renderNotes();
});

$(".theme-toggle").addEventListener("click", function () {
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

const menuToggle = $(".menu-toggle");
const mainNav = $(".main-nav");
menuToggle.addEventListener("click", function () {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".main-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if ($("#detailModal").classList.contains("open")) closeModal();
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const header = $("#siteHeader");
const sections = $$("main section[id]");
const navLinks = $$(".nav-link");
window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 16);
  let current = "home";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}, { passive: true });

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeReveals() {
  $$(".reveal").forEach(function (element) {
    if (!element.classList.contains("visible")) observer.observe(element);
  });
}

async function loadManagedContent() {
  try {
    const responses = await Promise.all([
      fetch("_data/site.json", { cache: "no-store" }),
      fetch("_data/projects.json", { cache: "no-store" }),
      fetch("_data/notes.json", { cache: "no-store" })
    ]);
    if (responses.some(function (response) { return !response.ok; })) throw new Error("Managed content is unavailable");
    const site = await responses[0].json();
    const projects = await responses[1].json();
    const notes = await responses[2].json();
    portfolioData = {
      profile: site.profile,
      metrics: site.metrics,
      heroMeta: site.heroMeta,
      projects: projects.items,
      experiences: site.experiences,
      skills: site.skills,
      notes: notes.items,
      strengths: site.strengths
    };
  } catch (error) {
    console.info("Using bundled fallback content.", error);
  }
}

async function boot() {
  await loadManagedContent();
  renderProfile();
  renderProjects();
  renderExperience();
  renderSkills();
  renderStrengths();
  renderNoteFilters();
  renderNotes();
  observeReveals();
  setTheme(localStorage.getItem("hr-portfolio-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#currentYear").textContent = new Date().getFullYear();
}

boot();

