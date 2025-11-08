/* ========================================================================= */

/* Exibir/Ocultar Senhas */

function TogglePasswordVisibility(id, forceHide = false) {
  const passwordInput = document
    .getElementById(`togglePasswordContainer${id}`)
    .querySelector("input");

  const showIcon = document.getElementById(`show-icon-${id}`);
  const hideIcon = document.getElementById(`hide-icon-${id}`);

  if (passwordInput.type === "password" && !forceHide) {
    passwordInput.type = "text";
    showIcon.style.display = "none";
    hideIcon.style.display = "block";
  } else {
    passwordInput.type = "password";
    showIcon.style.display = "block";
    hideIcon.style.display = "none";
  }
}

/* ========================================================================= */
function ValidateLogin(form) {
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  // Get Users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Reset Alert
  const alertLoginOrPassword = document.getElementById("errorLoginOrPassword");
  if (alertLoginOrPassword) {
    alertLoginOrPassword.textContent = "";
    alertLoginOrPassword.style.display = "none";
  }

  // Validade User
  const userFound = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!userFound) {
    if (alertLoginOrPassword) {
      alertLoginOrPassword.textContent = "E-mail ou senha incorretos.";
      alertLoginOrPassword.style.display = "block";
    } else {
      console.warn("Elemento de erro 'errorLoginOrPassword' não encontrado.");
    }
    alertLoginOrPassword.textContent = "E-mail ou senha incorretos.";
    alertLoginOrPassword.style.display = "block";
    return false;
  }

  localStorage.setItem("loggedUser", JSON.stringify(userFound));

  // TALVEZ ADICIONAR A OPÇÃO DE "LEMBRAR DE MIM" PARA LOGIN AUTOMÁTICO

  // REDIRECIONA PARA A PÁGINA PRINCIPAL (FALTA FAZER)

  return true;
}
