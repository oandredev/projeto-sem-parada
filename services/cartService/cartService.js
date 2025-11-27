import { getLoggedUser } from "../loginService/loginService.js";

export function saveOfferSelection(offerId) {
  console.log("Saving offer selection for offerId:", offerId);
  const loggedUser = getLoggedUser();
  if (!loggedUser) return;

  let carts = JSON.parse(localStorage.getItem("carts")) || [];

  const existingIndex = carts.findIndex(
    (item) => item.userId === loggedUser.id
  );

  const offer = getOfferSelection(offerId);

  if (existingIndex !== -1) {
    // Substitui a oferta existente
    carts[existingIndex].offer = offer;
  } else {
    // Adiciona novo carrinho se não existir
    carts.push({
      userId: loggedUser.id,
      offer: offer,
    });
  }

  localStorage.setItem("carts", JSON.stringify(carts));

  window.location.href = "/seat-selection/seat-selection.html";
}

function getOfferSelection(idOffer) {
  const viagens = JSON.parse(localStorage.getItem("viagens")) || [];
  const id = Number(idOffer); // converte sempre para number
  return viagens.find((offer) => offer.id == id) || null;
}

export function getOfferSelectionByUser() {
  // Pega salva pelo usuário logado
  const loggedUser = getLoggedUser();
  if (!loggedUser) return null;

  // Busca o carrinho do usuário logado
  const carts = JSON.parse(localStorage.getItem("carts")) || [];
  const cart = carts.find((item) => item.userId === loggedUser.id);

  return cart?.offer ?? null;
}
