import {
  getLoggedUser,
  logoutUser,
} from "../../services/loginService/loginService.js";
import { updateHeader } from "../header/headerController.js";
import { initializeViagens } from "../data/dataController.js";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeAll, 3); // Delay pra evitar alerta de desempenho
});

function initializeAll() {
  /* Evita que botões de visibilidade da senha assumam o foco do input field */
  document.querySelectorAll(".togglePasswordVisibility").forEach((btn) => {
    btn.addEventListener("mousedown", (e) => e.preventDefault());
  });

  /* Verifica se já há um usuário logado assim que a página é carregada, como todas as páginas possuem
  o global.js, consequentemente tem o usuário atualizado a cada troca de página*/
  let loggedUser = getLoggedUser();

  updateHeader(loggedUser);

  initializeViagens();
}

const btn = document.getElementById("logoutButton");
if (btn) {
  btn.addEventListener("click", logout);
}

export function logout() {
  logoutUser();
  location.href = "/";
}
