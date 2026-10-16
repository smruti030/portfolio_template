// Edit these lists to change content
const skills = [
  { name: "Python", level: 80 }, { name: "Java", level: 60 }, { name: "C", level: 85 },
  { name: "HTML", level: 75 }, { name: "CSS", level: 65 }, { name: "JavaScript", level: 55 }
];
const projects = [
  { title: "Project Name", tools: ["XYZ"], text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolor aliquam beatae tenetur facere perferendis mollitia.", link: "#" },
  { title: "Project Name", tools: ["XYZ"], text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet fugiat delectus eligendi mollitia ea vel deserunt id iusto maxime!", link: "#" }
];
const roles = ["Python developer", "web developer", "problem solver"];

// Build skills and projects
document.getElementById("skills-grid").innerHTML = skills.map(s => `
  <div class="col-6 col-lg-4"><div class="skill">
    <div class="skill-top"><span>${s.name}</span><b>${s.level}%</b></div>
    <div class="bar"><i data-level="${s.level}" style="--w:${s.level}%"></i></div>
  </div></div>`).join("");
document.getElementById("projects-grid").innerHTML = projects.map(p => `
  <div class="col-md-6"><a href="${p.link}" class="project-card">
    <h3>${p.title} <i class="bi bi-arrow-up-right"></i></h3>
    <div>${p.tools.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <p>${p.text}</p>
  </a></div>`).join("");

// Typing effect
const typed = document.getElementById("typed");
let r = 0, c = 0, del = false;
(function type() {
  const w = roles[r];
  typed.textContent = w.slice(0, c);
  if (!del && c === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 90);
})();

// Fill skill bars when visible
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.style.width = e.target.dataset.level + "%"; io.unobserve(e.target); }
}), { threshold: 0.4 });
document.querySelectorAll(".bar i").forEach(b => io.observe(b));

// Highlight current section in nav
const links = [...document.querySelectorAll(".site-nav .nav-link")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("header[id], section[id]").forEach(s => spy.observe(s));

// Close mobile menu after tapping a link
const menu = document.getElementById("nav");
links.forEach(l => l.addEventListener("click", () => {
  if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

// Back to top and footer year
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 400));
toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
document.getElementById("year").textContent = new Date().getFullYear();
