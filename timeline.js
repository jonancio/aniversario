"use strict";
// Edita estos recuerdos para añadir fotos y anécdotas reales más adelante.
const levels = [
  { title: "El comienzo", date: "15 de febrero de 2025", icon: "❤️", description: "El inicio oficial de nuestro mundo 1-1. Una aventura que comenzó con la decisión de elegirnos." },
  { title: "Nuestras aventuras", date: "2025", icon: "🎟️", description: "Risas, viajes y momentos que sumaron. Cada experiencia fue un pequeño power-up de nuestra historia." },
  { title: "Construir un hogar", date: "2026", icon: "🏡", description: "Una nueva etapa: compartir rutinas, descubrir pequeños detalles y construir nuestro propio espacio." },
  { title: "Aprender a ser equipo", date: "2025–2026", icon: "⭐", description: "No todos los niveles son fáciles. También aprendemos conversando, escuchándonos y creciendo." },
  { title: "El siguiente nivel", date: "Continuará…", icon: "🎮", description: "Nuestra historia sigue escribiéndose. No necesitamos saber todo lo que viene para disfrutar esta partida." }
];
const key = "aniversario.timeline.visited.v1";
let visited = [];
try {
  const stored = JSON.parse(localStorage.getItem(key) || "[]");
  if (Array.isArray(stored)) visited = stored.filter(n => Number.isInteger(n) && n >= 0 && n < levels.length);
} catch (_) { visited = []; }
const dialog = document.getElementById("levelDialog");
const buttons = Array.from(document.querySelectorAll(".level-node"));
let current = null;
function renderProgress() {
  buttons.forEach((button, index) => {
    const done = visited.includes(index);
    button.classList.toggle("visited", done);
    button.setAttribute("aria-label", "Nivel " + (index + 1) + ": " + levels[index].title + (done ? ", visitado" : ", sin visitar"));
  });
  document.getElementById("levelStatus").textContent = visited.length + " de " + levels.length + " recuerdos visitados";
}
function openLevel(index) {
  current = index;
  const level = levels[index];
  document.getElementById("levelLabel").textContent = "LEVEL " + (index + 1);
  document.getElementById("levelTitle").textContent = level.title;
  document.getElementById("levelDate").textContent = level.date;
  document.getElementById("levelDescription").textContent = level.description;
  document.getElementById("levelIllustration").textContent = level.icon;
  document.getElementById("levelComplete").textContent = visited.includes(index) ? "★ Recuerdo guardado" : "★ Guardar recuerdo";
  if (!dialog.open) dialog.showModal();
}
buttons.forEach((button, index) => button.addEventListener("click", () => openLevel(index)));
document.getElementById("levelClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.getElementById("levelComplete").addEventListener("click", () => {
  if (current === null) return;
  if (!visited.includes(current)) visited.push(current);
  try { localStorage.setItem(key, JSON.stringify(visited)); } catch (_) { /* La página sigue funcionando sin almacenamiento */ }
  renderProgress();
  dialog.close();
});
renderProgress();
