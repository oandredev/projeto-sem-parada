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

export function saveSeatsSelection(seatsSelectedsRef) {
  const loggedUser = getLoggedUser();
  if (!loggedUser) {
    alert("É necessário estar logado. Por favor, faça login para continuar.");
    return;
  }

  const offer = getOfferSelectionByUser();
  if (!offer) return;

  // Carrega lista (sempre array)
  let seatsSelection = JSON.parse(localStorage.getItem("seatsSelection")) || [];

  // Remove QUALQUER pré-seleção existente do usuário
  seatsSelection = seatsSelection.filter(
    (item) => item.userId !== loggedUser.id
  );

  // Adiciona a nova seleção única
  seatsSelection.push({
    userId: loggedUser.id,
    offer: offer,
    seats: seatsSelectedsRef,
  });

  // Salva
  localStorage.setItem("seatsSelection", JSON.stringify(seatsSelection));

  window.location.href = "/cart/cart.html";
}

export function getSeatsSelectionByUser() {
  const loggedUser = getLoggedUser();
  if (!loggedUser) return [];

  const offerSavedBefore = getOfferSelectionByUser();
  if (!offerSavedBefore) return [];

  const seatsSelection = JSON.parse(localStorage.getItem("seatsSelection"));
  if (!Array.isArray(seatsSelection)) return [];

  const seatsForUser = seatsSelection.find(
    (preSelection) =>
      preSelection.userId === loggedUser.id &&
      preSelection.offer.id === offerSavedBefore.id
  );

  return seatsForUser ? seatsForUser.seats : [];
}

// Esse método é chamado toda vez que o usuário entra na tela de ofertas
export function clearCartAndSelectionForUser() {
  const loggedUser = getLoggedUser();
  if (!loggedUser) return;

  // Limpa carrinho
  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  carts = carts.filter((item) => item.userId !== loggedUser.id);
  localStorage.setItem("carts", JSON.stringify(carts));

  // Limpa seleção de assentos
  let seatsSelection = JSON.parse(localStorage.getItem("seatsSelection")) || [];
  seatsSelection = seatsSelection.filter(
    (item) => item.userId !== loggedUser.id
  );
  localStorage.setItem("seatsSelection", JSON.stringify(seatsSelection));
}
