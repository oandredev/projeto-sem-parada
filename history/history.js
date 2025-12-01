import { getLoggedUser } from "../services/loginService/loginService.js";

document.addEventListener("DOMContentLoaded", initializeHistory);

function formatPaymentMethod(method) {
  //  Formata o método de pagamento para exibição legível (PIX, Cartão de Crédito, etc.)
  switch (method?.toLowerCase()) {
    case "pix":
      return "PIX";
    case "credito":
      return "Cartão de Crédito";
    case "debito":
      return "Cartão de Débito";
    case "boleto":
      return "Boleto";
    default:
      return method?.toUpperCase() ?? "Não Informado";
  }
}

function formatCurrency(value) {
  // Formata valores monetários para o padrão brasileiro (R$ 0,00)
  const numericValue = parseFloat(value);
  return isNaN(numericValue)
    ? "0,00"
    : numericValue.toFixed(2).replace(".", ",");
}

function formatDate(dateString) {
  // Formato '01/12/2025 08:00' (datas.ida/volta) ou '27/11/2025' (date)
  return dateString ? dateString.replace(/:\d{2}$/, "").trim() : "N/A";
}

function initializeHistory() {
  // inicializa depois que carrega o html
  const loggedUser = getLoggedUser();
  const container = document.getElementById("history-container");

  if (!loggedUser) {
    // Se o usuário não estiver logado, exibe mensagem ou redireciona
    container.innerHTML = `<p class="empty-state">Faça login para ver seu histórico de compras.</p>`;
    return;
  }

  // 1. Carrega todo o histórico do localStorage
  const allHistory = JSON.parse(localStorage.getItem("history")) || [];

  // 2. Filtra apenas os pedidos do usuário logado
  const userHistory = allHistory.filter(
    (entry) => entry.userId === loggedUser.id
  );

  // 3. Renderiza o HTML
  renderHistory(userHistory, container);
}

function renderHistory(historyData, container) {
  // Estado Vazio. Caso não haja compras no histórico
  if (historyData.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <p>Você ainda não tem passagens compradas.</p>
                <a href="../offers/offers.html" class="btn-offers">Ver Ofertas</a>
            </div>
        `;
    return;
  }

  let htmlContent = "";

  const originalHistory = JSON.parse(localStorage.getItem("history")) || [];

  // Loop principal sobre as compras finalizadas (Revertido para mostrar as mais recentes primeiro)
  historyData
    .slice()
    .reverse()
    .forEach((entry, i) => {
      // Dados Principais do Objeto de Compra

      const pedidoId =
        originalHistory.findIndex(
          (h) =>
            h.userId === entry.userId &&
            h.date === entry.date &&
            h.total === entry.total
        ) + 1; // ID baseado na posição no array original
      const status = "CONCLUÍDA"; // Assumindo concluída para itens no histórico -- depois veremos outros status
      const dataCompra = formatDate(entry.date);

      // Busca a origem de forma segura.
      const origem = entry.offer.cidades?.[0] || "N/A";

      const destino = entry.offer.destino;
      const metodoPagamento = entry.payment.method;
      const parcelas = entry.payment.installments;
      const total = formatCurrency(entry.total);

      let itemsHtml = "";

      // Loop interno para os passageiros (A lista de passagens compradas)
      entry.passengers.forEach((passenger) => {
        const trecho = "IDA";

        const assentoPuro = passenger.seat.replace("ID", "").replace("VOL", ""); // a intenção aqui era fazer ida e volta mas ficou só ida por hora

        // Montagem do HTML de cada passageiro

        itemsHtml += `
                <div class="cart-row item-row">
                    <span class="col-item">
                        **${trecho}** - ${origem} para ${destino}
                        <br />
                        <small class="customization-details">
                            Passageiro: ${passenger.name} (${passenger.type})
                        </small>
                    </span>
                    <span class="col-seat">${assentoPuro}</span>
                    <span class="col-value-base">R$ ${formatCurrency(
                      passenger.value / 2
                    )}</span>
                </div>
            `;
      });

      // Loop interno para os passageiros (A lista de passagens compradas)
      entry.passengers.forEach((passenger) => {
        const trecho = "VOLTA";

        const assentoPuro = passenger.seat.replace("ID", "").replace("VOL", ""); // a intenção aqui era fazer ida e volta mas ficou só ida por hora

        // Montagem do HTML de cada passageiro

        itemsHtml += `
                <div class="cart-row item-row">
                    <span class="col-item">
                        **${trecho}** - ${destino} para ${origem}
                        <br />
                        <small class="customization-details">
                            Passageiro: ${passenger.name} (${passenger.type})
                        </small>
                    </span>
                    <span class="col-seat">${assentoPuro}</span>
                    <span class="col-value-base">R$ ${formatCurrency(
                      passenger.value / 2
                    )}</span>
                </div>
            `;
      });

      // Criação do Cartão HTML completo

      //   <!---- ${entry.offer.tipo}
      // **************************************************
      // aqui antes era Ida e Volta, conforme a variável ---->

      htmlContent += `
            <div class="history-card">
                <div class="card-header">
                    <h2>COMPRA: #${pedidoId} - STATUS: (${status})</h2>
                    <p>Itinerário: ${origem} ⇄ ${destino}</p>
                    <p>Compra Realizada em: ${dataCompra}</p>
                </div>

                <div class="card-body">
                    <div class="detail-group">
                        <p><strong>Tipo de Viagem:</strong> Ida/Volta </p> 
                        <p>
                            <strong>Pagamento:</strong> ${formatPaymentMethod(
                              metodoPagamento
                            )}
                            ${
                              metodoPagamento === "credito" &&
                              parcelas &&
                              parcelas !== "0"
                                ? ` (${parcelas}x)`
                                : ""
                            }
                        </p>
                    </div>

                    <div class="cart-table history-items">
                        <div class="cart-row header-row">
                            <span class="col-item">Trecho e Passageiro</span>
                            <span class="col-seat">Assento</span>
                            <span class="col-value-base">Valor</span>
                        </div>
                        
                        ${itemsHtml} 

                    </div>

                    <div class="card-footer">
                        <p class="total-amount">
                            <strong>Total da Compra: R$ ${total}</strong>
                        </p>
                    </div>
                </div>
            </div>
            ${i < historyData.length - 1 ? '<hr class="separator" />' : ""}
        `;
    });

  // Injeta o HTML renderizado no container
  container.innerHTML = htmlContent;
}
