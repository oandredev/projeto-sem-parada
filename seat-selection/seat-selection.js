import {
  getOfferSelectionByUser,
  saveSeatsSelection,
  getSeatsSelectionByUser,
} from "../services/cartService/cartService.js";

const offerSelected = getOfferSelectionByUser();

// CONFIGURANDO O MAPA E O PREÇO DOS ASSENTOS
const NUM_FILEIRAS = 8; // Número de fileiras no ônibus
const ASSENTOS_POR_FILEIRA = 4; // Total de assentos por fileira (ex: A, B, C, D)
const ASSENTOS_CORREDOR_ESQ = 2; // Quantos assentos antes do corredor (ex: A, B)
const PRECO_ASSENTO_UNITARIO = Number(offerSelected?.valorPassagem) || 0; // Preço de cada assento

const ASSENTOS_INICIAIS_OCUPADOS = offerSelected?.assentosOcupados ?? [];

// VARIÁVEIS GLOBAIS E ELEMENTOS DO DOM*/

const mapaAssentosDiv = document.getElementById("mapa-assentos");
const assentosSelecionadosUl = document.getElementById("assentos-selecionados");
const totalValorSpan = document.getElementById("total-valor");
const btnProsseguir = document.getElementById("btn-prosseguir");
const btnLimparSelecao = document.getElementById("btn-limpar-selecao");

let assentosAtualmenteSelecionados = []; // Armazena os IDs dos assentos selecionados
let precoTotal = 0;

function atualizarAssentosSelecionados() {
  assentosAtualmenteSelecionados = getSeatsSelectionByUser();

  for (const id of assentosAtualmenteSelecionados) {
    const assento = document.querySelector(`.assento[data-id="${id}"]`);
    if (assento && !assento.classList.contains("ocupado")) {
      assento.classList.add("selecionado");
    }
  }

  atualizarResumoCompra();
}

// FUNÇÕES PRINCIPAIS

/**
 * Gera o mapa de assentos no HTML baseado nas configurações.
 */
function gerarMapaAssentos() {
  mapaAssentosDiv.innerHTML = ""; // Limpa qualquer conteúdo existente

  for (let i = 1; i <= NUM_FILEIRAS; i++) {
    const fileiraDiv = document.createElement("div");
    fileiraDiv.classList.add("fileira");

    const grupoEsquerda = document.createElement("div");
    grupoEsquerda.classList.add("grupo-assentos");

    const grupoDireita = document.createElement("div");
    grupoDireita.classList.add("grupo-assentos");

    for (let j = 0; j < ASSENTOS_POR_FILEIRA; j++) {
      // Mapeia o índice do assento para uma letra (A, B, C, D...)
      const letraAssento = String.fromCharCode(65 + j); // 65 é o código ASCII para 'A'
      const idAssento = `${i}${letraAssento}`; // Ex: "1A", "1B", "1C", "1D"

      const assentoDiv = document.createElement("div");
      assentoDiv.classList.add("assento");
      assentoDiv.setAttribute("data-id", idAssento); // Armazena o ID no elemento para fácil acesso
      assentoDiv.textContent = idAssento; // Exibe o ID dentro do assento

      // Verifica se o assento deve ser inicialmente ocupado
      if (ASSENTOS_INICIAIS_OCUPADOS.includes(idAssento)) {
        assentoDiv.classList.add("ocupado");
      } else {
        // Adiciona o evento de clique apenas para assentos disponíveis
        assentoDiv.addEventListener("click", () => toggleAssento(idAssento));
      }

      // Divide os assentos entre esquerda e direita para simular o corredor
      if (j < ASSENTOS_CORREDOR_ESQ) {
        grupoEsquerda.appendChild(assentoDiv);
      } else {
        grupoDireita.appendChild(assentoDiv);
      }
    }

    fileiraDiv.appendChild(grupoEsquerda);
    fileiraDiv.appendChild(grupoDireita);
    mapaAssentosDiv.appendChild(fileiraDiv);
  }
}

/**
 * Adiciona ou remove um assento da seleção.
 * @param {string} id Assento a ser alternado.
 */
function toggleAssento(id) {
  const assentoElement = document.querySelector(`.assento[data-id="${id}"]`);

  // Se o assento estiver ocupado, não faz nada
  if (assentoElement.classList.contains("ocupado")) {
    return;
  }

  // Alterna a classe 'selecionado'
  assentoElement.classList.toggle("selecionado");

  // Adiciona ou remove da lista de assentos selecionados
  if (assentoElement.classList.contains("selecionado")) {
    assentosAtualmenteSelecionados.push(id);
  } else {
    assentosAtualmenteSelecionados = assentosAtualmenteSelecionados.filter(
      (item) => item !== id
    );
  }

  atualizarResumoCompra();
}

/**
 * Remove um assento da lista de seleção no resumo e atualiza o mapa.
 * @param {string} id Assento a ser removido da seleção.
 */
function removerAssentoDaSelecao(id) {
  const assentoElement = document.querySelector(`.assento[data-id="${id}"]`);
  if (assentoElement && assentoElement.classList.contains("selecionado")) {
    assentoElement.classList.remove("selecionado");
  }
  assentosAtualmenteSelecionados = assentosAtualmenteSelecionados.filter(
    (item) => item !== id
  );
  atualizarResumoCompra();
}

/**
 * Atualiza a lista de assentos selecionados no painel de resumo
 * e recalcula o valor total.
 */
function atualizarResumoCompra() {
  assentosSelecionadosUl.innerHTML = ""; // Limpa a lista atual

  if (assentosAtualmenteSelecionados.length === 0) {
    const li = document.createElement("li");
    li.style.textAlign = "center";
    li.style.color = "#777";
    li.textContent = "Nenhum assento selecionado";
    assentosSelecionadosUl.appendChild(li);
    precoTotal = 0;
  } else {
    assentosAtualmenteSelecionados.sort((a, b) => {
      // Ordena para melhor visualização
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

    assentosAtualmenteSelecionados.forEach((id) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>Assento ${id}</span> 
                                    <button onclick="removerAssentoDaSelecao('${id}')">Remover</button>`;
      assentosSelecionadosUl.appendChild(li);
    });

    precoTotal = assentosAtualmenteSelecionados.length * PRECO_ASSENTO_UNITARIO;
  }

  totalValorSpan.textContent = `Subtotal: R$ ${precoTotal
    .toFixed(2)
    .replace(".", ",")}`; // Formato monetário
}

/**
 * Simula a finalização da compra: marca os assentos como ocupados.
 */
function prosseguirComCompra() {
  if (assentosAtualmenteSelecionados.length === 0) {
    alert("Por favor, selecione ao menos um assento para prosseguir.");
    return;
  }

  saveSeatsSelection(assentosAtualmenteSelecionados);
}

/**
 * Limpa todos os assentos selecionados, sem finalizar a compra.
 */
function limparSelecao() {
  if (assentosAtualmenteSelecionados.length === 0) {
    return;
  }

  const confirmacao = confirm(
    "Deseja realmente limpar todos os assentos selecionados?"
  );
  if (confirmacao) {
    assentosAtualmenteSelecionados.forEach((id) => {
      const assentoElement = document.querySelector(
        `.assento[data-id="${id}"]`
      );
      if (assentoElement) {
        assentoElement.classList.remove("selecionado");
      }
    });
    assentosAtualmenteSelecionados = [];
    atualizarResumoCompra();
  }
}

// INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", () => {
  gerarMapaAssentos();
  atualizarAssentosSelecionados();
  atualizarResumoCompra(); // Garante que o resumo inicial esteja correto

  // Adiciona eventos aos botões de ação
  btnProsseguir.addEventListener("click", prosseguirComCompra);
  btnLimparSelecao.addEventListener("click", limparSelecao);
});

// Torna a função global para uso nos botões gerados dinamicamente
window.removerAssentoDaSelecao = removerAssentoDaSelecao;
