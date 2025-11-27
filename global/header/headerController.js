export function updateHeader(loggedUser) {
  const accoutContainer =
    document.getElementsByClassName("account-container")[0];
  const userMenuContainer = document.getElementsByClassName(
    "user-menu-container"
  )[0];
  const loginButton = document.getElementById("joinInAccount");
  const signupButton = document.getElementById("createAccount");
  const userNameDisplay = document.getElementById("username1");
  const userNameDisplay2 = document.getElementById("username2");
  const userEmail = document.getElementById("emailUser");

  if (
    !loggedUser ||
    !loginButton ||
    !signupButton ||
    !userNameDisplay ||
    !userNameDisplay2 ||
    !userEmail ||
    !accoutContainer ||
    !userMenuContainer
  ) {
    accoutContainer.style.display = "flex";
    return;
  }

  if (loggedUser) {
    accoutContainer.style.display = "none";
    userMenuContainer.style.display = "flex";
    userNameDisplay.textContent = String(loggedUser.name);
    userNameDisplay2.textContent = String(loggedUser.name);
    userEmail.textContent = String(loggedUser.email);
  } else {
    accoutContainer.style.display = "flex";
    userMenuContainer.style.display = "none";
    userNameDisplay.textContent = ``;
    userNameDisplay2.textContent = ``;
    userEmail.textContent = ``;
  }
}
