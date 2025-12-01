import {
  getOfferSelectionByUser,
  getSeatsSelectionByUser,
} from "../services/cartService/cartService.js";
import { getLoggedUser } from "../services/loginService/loginService.js";

let offerSelection;

document.addEventListener("DOMContentLoaded", initializeCart);

function initializeCart() {
  offerSelection = getOfferSelectionByUser();

  if (offerSelection === null) {
    alert(
      "Nenhuma oferta selecionada. Redirecionando para a página de ofertas."
    );
    window.location.href = "/offers/offers.html";
  }

  updateRouteInfo();
  generatePassengerList();
  updatePaymentTotal();
}

function updateRouteInfo() {
  const routeTitle = document.getElementById("routeTitle");
  const category = document.getElementById("category");
  const value = document.getElementById("value");
  const departureDate = document.getElementById("departureDate");
  const departurePoint = document.getElementById("departurePoint");
  const returnDate = document.getElementById("returnDate");
  const returnPoint = document.getElementById("returnPoint");

  routeTitle.textContent = `${offerSelection.cidades[0]} ⇄ ${offerSelection.destino}`;

  category.textContent = offerSelection.tipo;

  value.textContent = `R$ ${Number(offerSelection.valorPassagem).toFixed(2)}`;

  departureDate.textContent = offerSelection.datas?.ida ?? " - ";
  returnDate.textContent = offerSelection.datas?.volta ?? " - ";
  departurePoint.textContent =
    offerSelection.terminal?.ida?.saida +
      " → " +
      offerSelection.terminal?.ida?.chegada ?? " - ";
  returnPoint.textContent =
    offerSelection.terminal?.volta?.saida +
      " → " +
      offerSelection.terminal?.volta?.chegada ?? " - ";
}
function generatePassengerList() {
  const seatsSelected = getSeatsSelectionByUser();

  for (let i = 0; i < seatsSelected.length; i++) {
    addPassengerRow({
      index: i + 1,
      seat: seatsSelected[i],
      type: "INTEIRA",
      value: offerSelection.valorPassagem,
    });
  }
}
function addPassengerRow({ index, seat, type, value }) {
  const seatList = document.getElementById("passengerList");

  const row = document.createElement("tr");

  // IDs únicos usando index
  const nameId = `name_${index}`;
  const cpfId = `cpf_${index}`;
  const errorNameId = `errorName_${index}`;
  const errorCPFId = `errorCPF_${index}`;

  row.innerHTML = `
    <td>${index}</td>

    <!-- COLUNA NOME + CPF -->
    <td>
      <small id="${errorNameId}" class="inputError"></small>
      <input
        type="text"
        name="name"
        id="${nameId}"
        maxlength="50"
        required
        oninput="this.value = this.value.replace(/[^A-Za-zÀ-ÿ\\s]/g, ''); NameIsValid(this.value, '${errorNameId}'); FormIsValid(this.form)"
        onchange="UpdateFirstInput('${nameId}'); NameIsValid(this.value, '${errorNameId}')"
      />

    </td>
    <td ">
    <small id="${errorCPFId}" class="inputError">Teste</small>
      <input
        type="text"
        name="cpf"
        id="${cpfId}"
        maxlength="14"
        required
        placeholder="123.456.789-10"
        oninput="this.value = formatCPF(this.value); CPFIsValid(this.value, '${errorCPFId}'); FormIsValid(this.form)"
        onchange="UpdateFirstInput('${cpfId}'); CPFIsValid(this.value, '${errorCPFId}')"
     </td>

    <td>${seat}</td>
    <td>${type}</td>
    <td>R$ ${Number(value).toFixed(2)}</td>

  `;

  seatList.appendChild(row);
}

function editSeats() {
  window.location.href = "/seat-selection/seat-selection.html";
}

function updatePaymentTotal() {
  const totalFinal = document.getElementById("totalFinal");
  const seatsSelected = getSeatsSelectionByUser();
  const totalAmount =
    seatsSelected.length * Number(offerSelection.valorPassagem);
  totalFinal.innerHTML = `<b>Total:</b> R$ ${totalAmount.toFixed(2)}`;
}

/*===================== PAGAMENTO ===================== */

// Registra o listener quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("seatBtn");
  if (!btn) return;
  btn.addEventListener("click", editSeats);
});

document.addEventListener("DOMContentLoaded", () => {
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const installmentsBox = document.getElementById("installmentsBox");
  const installmentsSelect = document.getElementById("installmentsSelect");
  const finishBtn = document.getElementById("finishOrderBtn");

  installmentsBox.style.display = "none";

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      PaymentChange(radio.value);
      validatePaymentForm();
    });
  });

  installmentsSelect.addEventListener("change", () => {
    validatePaymentForm();
  });

  function PaymentChange(method) {
    if (method === "credito") {
      installmentsBox.style.display = "block";
    } else {
      installmentsBox.style.display = "none";
      installmentsSelect.value = "0";
    }
  }

  // =====================================================
  function validatePaymentForm() {
    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked'
    );

    if (!selectedPayment) {
      finishBtn.disabled = true;
      return;
    }

    if (selectedPayment.value === "credito") {
      const parcel = installmentsSelect.value;
      finishBtn.disabled = parcel === "0";
      return;
    }

    finishBtn.disabled = false;
  }
});

// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const installmentsBox = document.getElementById("installmentsBox");
  const installmentsSelect = document.getElementById("installmentsSelect");
  const finishBtn = document.getElementById("finishOrderBtn");

  installmentsBox.style.display = "none";

  /* =========== EVENTOS DE PAGAMENTO =========== */
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      handlePaymentChange(radio.value);
      FormIsValid();
    });
  });

  installmentsSelect.addEventListener("change", FormIsValid);

  function handlePaymentChange(method) {
    if (method === "credito") {
      installmentsBox.style.display = "block";
    } else {
      installmentsBox.style.display = "none";
      installmentsSelect.value = "0";
    }
  }

  /* ===================================================== */

  /* VALIDAÇÃO | Outras validações são feitas no validator.js */
  function FormIsValid() {
    const passengerRows = document.querySelectorAll("#passengerList tr");

    let allValid = true;

    passengerRows.forEach((row) => {
      const nameInput = row.querySelector('input[name="name"]');
      const cpfInput = row.querySelector('input[name="cpf"]');

      if (!nameInput || !cpfInput) return;

      const isNameValid = NameIsValid(nameInput.value, null, true);
      const isCPFValid = CPFIsValid(cpfInput.value, null, true);

      if (!isNameValid || !isCPFValid) {
        allValid = false;
      }
    });

    /* ====== Forma de pagamento ====== */
    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked'
    );

    if (!selectedPayment) {
      finishBtn.disabled = true;
      return false;
    }

    /* ====== Parcelas (somente crédito) ====== */
    if (selectedPayment.value === "credito") {
      if (installmentsSelect.value === "0") {
        finishBtn.disabled = true;
        return false;
      }
    }

    /* ====== Todos validos ====== */
    finishBtn.disabled = !allValid;
    return allValid;
  }

  window.FormIsValid = FormIsValid;
});

/*========================== Finalizar compra ==========================*/

const finishBtn = document.getElementById("finishOrderBtn");

finishBtn.addEventListener("click", () => {
  finalizePurchase();
});

function collectFormData() {
  const passengers = [];
  const rows = document.querySelectorAll("#passengerList tr");

  rows.forEach((row) => {
    const name = row.querySelector('input[name="name"]')?.value.trim();
    const cpf = row.querySelector('input[name="cpf"]')?.value.trim();
    const seat = row.children[3]?.textContent;
    const type = row.children[4]?.textContent;
    const value = row.children[5]?.textContent.replace("R$ ", "");

    passengers.push({
      name,
      cpf,
      seat,
      type,
      value: Number(value),
    });
  });

  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  )?.value;

  const installments =
    paymentMethod === "credito"
      ? document.getElementById("installmentsSelect").value
      : null;

  return {
    userId: getLoggedUser().id,
    offer: offerSelection,
    passengers,
    payment: {
      method: paymentMethod,
      installments: installments,
    },
    total: passengers.reduce((acc, p) => acc + p.value, 0),
    date: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };
}

function finalizePurchase() {
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  )?.value;

  const data = collectFormData();
  const seatsList = data.passengers.map((p) => p.seat);

  savePurchase(data);
  updateSeatsLockeds(seatsList);

  finishBtn.disabled = true;
  finishBtn.textContent = "Processando...";

  setTimeout(() => {
    finishBtn.textContent = "Reserva Finalizada";
    alert("Reserva finalizada com sucesso!");

    if (selectedPayment === "credito" || selectedPayment === "debito") {
      window.location.href =
        "/purchase-confirmation/purchase-confirmation.html";
    } else if (selectedPayment === "pix") {
      window.location.href = "/payment-qr-code/payment-qr-code.html";
    } else {
      window.location.href = "/payment-ticket/payment-ticket.html";
    }
  }, 3000);
}

function savePurchase(data) {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  history.push(data);

  localStorage.setItem("history", JSON.stringify(history));
}

function updateSeatsLockeds(newSeatsLocked) {
  const viagens = JSON.parse(localStorage.getItem("viagens")) || [];

  const tripIndex = viagens.findIndex(
    (v) => v.id === String(offerSelection.id)
  );

  if (tripIndex !== -1) {
    const currentOccupied = viagens[tripIndex].assentosOcupados || [];

    viagens[tripIndex].assentosOcupados = [
      ...currentOccupied,
      ...newSeatsLocked,
    ];
    localStorage.setItem("viagens", JSON.stringify(viagens));

    console.log("Assentos atualizados:", viagens[tripIndex].assentosOcupados);
  } else {
    console.error("Viagem não encontrada para atualização de assentos.");
  }
}
