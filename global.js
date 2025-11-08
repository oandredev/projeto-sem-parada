/* Evita que botões de visibilidade da senha assumam o foco do input field */

document.querySelectorAll(".togglePasswordVisibility").forEach((btn) => {
  btn.addEventListener("mousedown", (e) => e.preventDefault());
});
