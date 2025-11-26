let alertName, alertCPF, alertEmail, alertPassword, alertPasswordC;
let firstInputName = true,
  firstInputCPF = true,
  firstInputEmail = true,
  firstInputPassword = true,
  firstInputPasswordC = true;
let buttonSubmit;

/* Forms data */
let nameField;
let cpfField;
let emailField;
let passwordField;
let passwordConfirmationField;

/* ========================================================================= */

window.addEventListener("DOMContentLoaded", onInit);

function onInit() {
  alertName = document.getElementById("errorName");
  alertCPF = document.getElementById("errorCPF");
  alertEmail = document.getElementById("errorEmail");
  alertPassword = document.getElementById("errorPassword");
  alertPasswordC = document.getElementById("errorPasswordC");
  buttonSubmit = document.getElementById("buttonSubmit");
}

/* ========================================================================= */

function UpdateFirstInput(input) {
  if (input === "name") firstInputName = false;
  else if (input === "cpf") firstInputCPF = false;
  else if (input === "email") firstInputEmail = false;
  else if (input === "password") firstInputPassword = false;
  else if (input === "passwordC") firstInputPasswordC = false;
}

/* ========================================================================= */

function FormIsValid(form) {
  nameField = form.name.value;
  cpfField = form.cpf.value.replace(/\D/g, "");
  emailField = form.email.value;
  passwordField = form.password.value;
  passwordConfirmationField = form.passwordConfirmation.value;

  const valid =
    NameIsValid(nameField) &&
    CPFIsValid(cpfField) &&
    EmailIsValid(emailField) &&
    PasswordIsValid(passwordField) &&
    PasswordsAreValid(form.password, form.passwordConfirmation);

  buttonSubmit.disabled = !valid;
  return valid;
}

function SaveUserData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = {
    id: users.length + 1,
    email: emailField,
    password: passwordField,
    name: nameField,
    cpf: cpfField,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  setTimeout(() => {
    window.location.href = "/login/login.html";
  }, 100);

  return false;
}

/* ========================================================================= */
/* Nome */

function NameIsValid(name) {
  const nameWithoutSpaces = name.replace(/\s+/g, "");
  const isValid = nameWithoutSpaces.length >= 3;

  if (!firstInputName) {
    alertName.style.display = isValid ? "none" : "block";
    if (!isValid) alertName.textContent = "Nome inválido — mínimo 3 letras.";
  } else {
    alertName.style.display = "none";
  }

  return isValid;
}

/* ========================================================================= */
/* CPF */

/* CPF */

function formatCPF(raw) {
  const nums = String(raw).replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 3) return nums;
  if (nums.length <= 6) return nums.replace(/(\d{3})(\d+)/, "$1.$2");
  if (nums.length <= 9) return nums.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

function CPFIsValid(cpfRef) {
  const cpf = cpfRef.replace(/\D/g, "");
  let isValid = true;

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) isValid = false;

  if (isValid) {
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9])) isValid = false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[10])) isValid = false;
  }

  if (!firstInputCPF) {
    alertCPF.style.display = isValid ? "none" : "block";
    if (!isValid) alertCPF.textContent = "CPF inválido.";
  } else {
    alertCPF.style.display = "none";
  }

  return isValid;
}

/* ========================================================================= */
/* E-mail */

function EmailIsValid(email) {
  const rules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = rules.test(email);

  if (!firstInputEmail) {
    alertEmail.style.display = isValid ? "none" : "block";
    if (!isValid) alertEmail.textContent = "E-mail inválido.";
  } else {
    alertEmail.style.display = "none";
  }

  return isValid;
}

/* ========================================================================= */
/* Senha */

function PasswordIsValid(password) {
  const rules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  const isValid = rules.test(password);

  if (!firstInputPassword) {
    alertPassword.style.display = isValid ? "none" : "block";
    if (!isValid)
      alertPassword.textContent =
        "Senha inválida — mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.";
  } else {
    alertPassword.style.display = "none";
  }

  // Atualiza alerta de confirmação se já digitado
  const passwordConfirmation = document.getElementById("passwordConfirmation");
  if (passwordConfirmation && passwordConfirmation.value.length > 0)
    PasswordsAreValid(
      document.getElementById("password"),
      passwordConfirmation
    );

  return isValid;
}

/* ========================================================================= */
/* Confirmar Senhas */

function PasswordsAreValid(password = null, passwordConfirmation = null) {
  if (!password || !passwordConfirmation) {
    password = document.getElementById("password");
    passwordConfirmation = document.getElementById("passwordConfirmation");
  }

  if (!password || !passwordConfirmation) return false;

  const match = password.value === passwordConfirmation.value;

  if (!firstInputPasswordC) {
    alertPasswordC.style.display = match ? "none" : "block";
    if (!match) alertPasswordC.textContent = "Senhas não coincidem.";
  } else {
    alertPasswordC.style.display = "none";
  }

  return match;
}

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
