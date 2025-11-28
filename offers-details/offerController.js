import { saveOfferSelection } from "../services/cartService/cartService.js";

console.log("offerController loaded");
export function trySaveOfferSelection(offerId) {
  saveOfferSelection(offerId);
}

window.trySaveOfferSelection = trySaveOfferSelection;

