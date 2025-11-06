let alertName, alertCPF, alertEmail, alertPassword, alertPasswordC;
let firstInputName = true,
  firstInputCPF = true,
  firstInputEmail = true,
  firstInputPassword = true,
  firstInputPasswordC = true;

/* ========================================================================= */

window.addEventListener("DOMContentLoaded", onInit);

function onInit() {
  alertName = document.getElementById("errorName");
  alertCPF = document.getElementById("errorCPF");
  alertEmail = document.getElementById("errorEmail");
  alertPassword = document.getElementById("errorPassword");
  alertPasswordC = document.getElementById("errorPasswordC");
}

/* ========================================================================= */

/* Isso é pra evitar que o usuário recebe erros antes de digitar "tudo" na primeira tentativa */

function UpdateFirstInput(input) {
  if (input === "name") firstInputName = false;
  else if (input === "cpf") firstInputCPF = false;
  else if (input === "email") firstInputEmail = false;
  else if (input === "password") firstInputPassword = false;
  else if (input === "passwordC") firstInputPasswordC = false;
}

/* ========================================================================= */

function FormIsValid(form) {
  const name = form.name.value;
  const cpf = form.cpf.value.replace(/\D/g, "");
  const email = form.email.value;
  const password = form.password.value;
  const passwordConfirmation = form.passwordConfirmation.value;

  const valid =
    NameIsValid(name) &
    CPFIsValid(cpf) &
    EmailIsValid(email) &
    PasswordIsValid(password) &
    PasswordsAreValid(password, passwordConfirmation);

  if (!valid) return false;

  console.log("✅ Cadastro feito com sucesso");
  return true;
}

/* ========================================================================= */
/* Nome */

function NameIsValid(name) {
  if (firstInputName) {
    alertName.style.display = "none";
    return true;
  }

  const nameWithoutSpaces = name.replace(/\s+/g, "");

  if (nameWithoutSpaces.length < 3) {
    alertName.textContent = "Nome inválido — mínimo 3 letras.";
    alertName.style.display = "block";
    return false;
  }

  alertName.style.display = "none";
  return true;
}

/* ========================================================================= */
/* CPF */

function formatCPF(raw) {
  const nums = String(raw).replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 3) return nums;
  if (nums.length <= 6) return nums.replace(/(\d{3})(\d+)/, "$1.$2");
  if (nums.length <= 9) return nums.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

function CPFIsValid(cpfRef) {
  if (firstInputCPF) {
    alertCPF.style.display = "none";
    return true;
  }

  const cpf = cpfRef.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    alertCPF.textContent = "CPF inválido.";
    alertCPF.style.display = "block";
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) {
    alertCPF.textContent = "CPF inválido.";
    alertCPF.style.display = "block";
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) {
    alertCPF.textContent = "CPF inválido.";
    alertCPF.style.display = "block";
    return false;
  }

  alertCPF.style.display = "none";
  return true;
}

/* ========================================================================= */
/* E-mail */

function EmailIsValid(email) {
  if (firstInputEmail) {
    alertEmail.style.display = "none";
    return true;
  }

  const rules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!rules.test(email)) {
    alertEmail.textContent = "E-mail inválido.";
    alertEmail.style.display = "block";
    return false;
  }

  alertEmail.style.display = "none";
  return true;
}

/* ========================================================================= */
/* Senha */

function PasswordIsValid(password) {
  if (firstInputPassword) {
    alertPassword.style.display = "none";
    return true;
  }

  const rules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  if (!rules.test(password)) {
    alertPassword.textContent =
      "Senha inválida — mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.";
    alertPassword.style.display = "block";
    return false;
  }

  alertPassword.style.display = "none";

  // Atualiza validação da confirmação
  const passwordConfirmation = document.getElementById("passwordConfirmation");
  if (passwordConfirmation && passwordConfirmation.value.length > 0)
    PasswordsAreValid(
      document.getElementById("password"),
      passwordConfirmation
    );

  return true;
}

/* ========================================================================= */
/* Confirmar Senhas */

function PasswordsAreValid(password = null, passwordConfirmation = null) {
  if (firstInputPasswordC) {
    alertPasswordC.style.display = "none";
    return true;
  }

  if (!password || !passwordConfirmation) {
    password = document.getElementById("password");
    passwordConfirmation = document.getElementById("passwordConfirmation");
  }

  if (!password || !passwordConfirmation) return false;

  if (password.value !== passwordConfirmation.value) {
    alertPasswordC.textContent = "Senhas não coincidem.";
    alertPasswordC.style.display = "block";
    return false;
  }

  alertPasswordC.style.display = "none";
  return true;
}
