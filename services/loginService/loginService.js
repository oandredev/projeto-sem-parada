export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser")) || null;
}

export function logoutUser() {
  return localStorage.removeItem("loggedUser");
}
