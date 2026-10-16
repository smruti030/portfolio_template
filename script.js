// ----- Data (edit here, the page builds itself) -----
const skills = [
  { name: "Python", level: 80 }, { name: "Java", level: 60 }, { name: "C", level: 85 },
  { name: "HTML", level: 75 },   { name: "CSS", level: 65 },  { name: "JavaScript", level: 55 }
];
const projects = [
  { title: "Project Name", tools: ["XYZ"], text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolor aliquam beatae tenetur facere perferendis mollitia commodi possimus iure iusto.", link: "#" },
  { title: "Project Name", tools: ["XYZ"], text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet fugiat delectus eligendi mollitia ea vel deserunt id iusto maxime!", link: "#" }
];
const roles = ["Masters Student", "Python Developer", "Web Developer", "Problem Solver"];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ----- Build skills and projects -----
document.getElementById("skills-grid").innerHTML = [skills.slice(0, 3), skills.slice(3)].map(col =>
  `<div class="col-md-6">${col.map(s => `
    <p class="mb-1 mt-3">${s.name}</p>
    <div class="progress" role="progressbar" aria-label="${s.name}" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" data-level="${s.level}">${s.level}%</div>
    </div>`).join("")}</div>`).join("");

document.getElementById("projects-grid").innerHTML = projects.map(p => `
  <div class="col-md-6"><div class="card project-card h-100 reveal"><div class="card-body">
    <h5 class="card-title">${p.title}</h5>
    <p class="tools"><i class="bi bi-tools"></i> ${p.tools.map(t => `<span class="tag">${t}</span>`).join("")}</p>
    <p style="text-align:justify">${p.text}</p>
    <a href="${p.link}" class="btn btn-sm btn-outline-info">View project</a>
  </div></div></div>`).join("");

// ----- Typing effect -----
const typedEl = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
}
if (reduceMotion) typedEl.textContent = roles[0]; else type();

// ----- Animate skill bars + fade in cards when scrolled into view -----
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    e.target.querySelectorAll?.(".progress-bar").forEach(b => b.style.width = b.dataset.level + "%");
    io.unobserve(e.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll("#skill, .reveal").forEach(el => io.observe(el));
document.querySelectorAll("#academic-cards .card").forEach(el => { el.classList.add("reveal"); io.observe(el); });

// ----- Active nav link on scroll -----
const links = [...document.querySelectorAll(".site-nav .nav-link")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id], article[id]").forEach(s => spy.observe(s));

// ----- Close mobile menu after clicking a link -----
const menu = document.getElementById("navbarNav");
links.forEach(l => l.addEventListener("click", () => {
  if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

// ----- Back to top + footer year -----
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 400));
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();
