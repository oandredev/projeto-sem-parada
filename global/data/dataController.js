const viagens = [
  {
    id: "1",
    destino: "São Paulo/SP",
    valorPassagem: "R$ 250,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP"],
    imagensBase: [
      "https://t3.ftcdn.net/jpg/01/24/15/06/360_F_124150627_OEbMpvnk0zk2zhfJ2YR2FNFnm2o2g3nu.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Aeroporto de Congonhas",
        chegada: "Terminal Rodoviário do Tietê",
      },
      volta: {
        saida: "Terminal Rodoviário do Tietê",
        chegada: "Aeroporto de Congonhas",
      },
    },
    tempoEstimado: "1h00",
    linkRota: "#",
    datas: { ida: "01/12/2025 08:00", volta: "05/12/2025 18:00" },
    assentosOcupados: ["1C", "2A", "5A", "5B", "8C"],
  },
  {
    id: "2",
    destino: "Campos do Jordão/SP",
    valorPassagem: "R$ 320,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Campos do Jordão/SP"],
    imagensBase: [
      "https://www.civitatis.com/blog/wp-content/uploads/2024/08/shutterstock_2222759763-scaled.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário do Tietê",
        chegada: "Rodoviária de Campos do Jordão",
      },
      volta: {
        saida: "Rodoviária de Campos do Jordão",
        chegada: "Terminal Rodoviário do Tietê",
      },
    },
    tempoEstimado: "2h30",
    linkRota: "#",
    datas: { ida: "06/12/2025 07:30", volta: "10/12/2025 17:00" },
    assentosOcupados: ["1A", "3B", "4C", "6A", "7B"],
  },
  {
    id: "3",
    destino: "Brotas/SP",
    valorPassagem: "R$ 280,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Brotas/SP"],
    imagensBase: [
      "https://brotas.com.br/wp-content/uploads/2017/08/areia-que-canta.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Barra Funda",
        chegada: "Rodoviária de Brotas",
      },
      volta: {
        saida: "Rodoviária de Brotas",
        chegada: "Terminal Rodoviário Barra Funda",
      },
    },
    tempoEstimado: "3h00",
    linkRota: "#",
    datas: { ida: "08/12/2025 06:45", volta: "12/12/2025 19:15" },
    assentosOcupados: ["2B", "4A", "5C", "7C", "9A"],
  },
  {
    id: "4",
    destino: "Holambra/SP",
    valorPassagem: "R$ 190,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Holambra/SP"],
    imagensBase: ["https://static.ndmais.com.br/2025/06/holambra-1.jpg"],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária de Holambra",
      },
      volta: {
        saida: "Rodoviária de Holambra",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "2h00",
    linkRota: "#",
    datas: { ida: "09/12/2025 09:00", volta: "11/12/2025 17:30" },
    assentosOcupados: ["1B", "2C", "3A", "4B", "5A"],
  },
  {
    id: "5",
    destino: "Aparecida/SP",
    valorPassagem: "R$ 170,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Aparecida/SP"],
    imagensBase: [
      "https://www.unitur.com.br/wp-content/uploads/2021/11/Basilica-de-Nossa-Senhora-de-Aparecida.-Fonte-Canva-1015x630.png",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Barra Funda",
        chegada: "Rodoviária de Aparecida",
      },
      volta: {
        saida: "Rodoviária de Aparecida",
        chegada: "Terminal Rodoviário Barra Funda",
      },
    },
    tempoEstimado: "3h30",
    linkRota: "#",
    datas: { ida: "11/12/2025 08:15", volta: "13/12/2025 18:45" },
    assentosOcupados: ["3C", "4A", "5B", "6C", "7A"],
  },
  {
    id: "6",
    destino: "Guarujá/SP",
    valorPassagem: "R$ 230,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Guarujá/SP"],
    imagensBase: [
      "https://magazine.zarpo.com.br/wp-content/uploads/2017/02/capa-mag_Praias-no-Guaruja-770x515.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária do Guarujá",
      },
      volta: {
        saida: "Rodoviária do Guarujá",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "4h00",
    linkRota: "#",
    datas: { ida: "12/12/2025 07:00", volta: "16/12/2025 19:00" },
    assentosOcupados: ["2C", "4A", "5A", "6B", "7C"],
  },
  {
    id: "7",
    destino: "Ilhabela/SP",
    valorPassagem: "R$ 360,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Ilhabela/SP"],
    imagensBase: [
      "https://www.viagenscinematograficas.com.br/wp-content/uploads/2020/09/Ilhabela-SP-Praias-O-que-Fazer-Capa-2-1536x1024.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária de Ilhabela",
      },
      volta: {
        saida: "Rodoviária de Ilhabela",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "5h00",
    linkRota: "#",
    datas: { ida: "14/12/2025 06:00", volta: "18/12/2025 20:00" },
    assentosOcupados: ["1A", "2B", "3C", "4A", "5B"],
  },
  {
    id: "8",
    destino: "Ubatuba/SP",
    valorPassagem: "R$ 340,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Ubatuba/SP"],
    imagensBase: [
      "https://images3.motor-reserva.com.br/curl/motor_reserva/images/pagina_generica/cliente_1408/202305281685304327Cedrinho.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Barra Funda",
        chegada: "Rodoviária de Ubatuba",
      },
      volta: {
        saida: "Rodoviária de Ubatuba",
        chegada: "Terminal Rodoviário Barra Funda",
      },
    },
    tempoEstimado: "5h30",
    linkRota: "#",
    datas: { ida: "15/12/2025 07:30", volta: "19/12/2025 21:00" },
    assentosOcupados: ["1B", "2C", "3A", "4B", "5C"],
  },
  {
    id: "9",
    destino: "Santos/SP",
    valorPassagem: "R$ 210,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Santos/SP"],
    imagensBase: [
      "https://www.olaviajantes.tur.br/wp-content/uploads/2024/04/jardins-da-orla-de-santos-scaled.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária de Santos",
      },
      volta: {
        saida: "Rodoviária de Santos",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "1h30",
    linkRota: "#",
    datas: { ida: "17/12/2025 08:00", volta: "20/12/2025 19:00" },
    assentosOcupados: ["2A", "3B", "4C", "5D", "6A"],
  },
  {
    id: "10",
    destino: "Serra da Mantiqueira/SP",
    valorPassagem: "R$ 390,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Serra da Mantiqueira/SP"],
    imagensBase: [
      "https://magazine.zarpo.com.br/wp-content/uploads/2018/09/10-cidades-imperdiveis-para-conhecer-na-serra-da-mantiqueira-2.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária de Serra da Mantiqueira",
      },
      volta: {
        saida: "Rodoviária de Serra da Mantiqueira",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "6h00",
    linkRota: "#",
    datas: { ida: "18/12/2025 06:00", volta: "22/12/2025 20:00" },
    assentosOcupados: ["1C", "2B", "3A", "4C", "5B"],
  },
  {
    id: "11",
    destino: "São Roque/SP",
    valorPassagem: "R$ 200,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "São Roque/SP"],
    imagensBase: [
      "https://naturam.com.br/wp-content/uploads/2021/03/6-vila-don-patto-sao-roque.jpg",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Barra Funda",
        chegada: "Rodoviária de São Roque",
      },
      volta: {
        saida: "Rodoviária de São Roque",
        chegada: "Terminal Rodoviário Barra Funda",
      },
    },
    tempoEstimado: "2h00",
    linkRota: "#",
    datas: { ida: "19/12/2025 07:00", volta: "21/12/2025 19:00" },
    assentosOcupados: ["2C", "3B", "4A", "5B", "6C"],
  },
  {
    id: "12",
    destino: "Cananeia/SP",
    valorPassagem: "R$ 310,00",
    tipo: "IDA e VOLTA",
    cidades: ["São Paulo/SP", "Cananeia/SP"],
    imagensBase: [
      "https://viajeibrasil.com/wp-content/uploads/2024/05/cachoeiras-de-cananeia.webp",
    ],
    imagensExtras: [],
    terminal: {
      ida: {
        saida: "Terminal Rodoviário Tietê",
        chegada: "Rodoviária de Cananeia",
      },
      volta: {
        saida: "Rodoviária de Cananeia",
        chegada: "Terminal Rodoviário Tietê",
      },
    },
    tempoEstimado: "6h30",
    linkRota: "#",
    datas: { ida: "20/12/2025 06:30", volta: "24/12/2025 20:30" },
    assentosOcupados: ["1A", "2B", "3C", "4D", "5A"],
  },
];

// Verifica isso a cada troca de tela
export function initializeViagens() {
  if (!localStorage.getItem("viagens")) {
    localStorage.setItem("viagens", JSON.stringify(viagens));
  }
}
