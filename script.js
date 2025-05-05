document.getElementById("iniciar-jogo").addEventListener("click", iniciarJogo);
document.getElementById("girar-roleta").addEventListener("click", girarRoleta);
document.getElementById("adivinhar-letra").addEventListener("click", adivinharLetra);
document.getElementById("adivinhar-palavra").addEventListener("click", adivinharPalavra);

const palavrasEPistas = [
  { palavra: "Henri Fayol", pista: "Teorias da Administração" },
  { palavra: "Administração Científica", pista: "Teorias da Administração" },
  { palavra: "Burocracia segundo Weber", pista: "Teorias da Administração" },
  { palavra: "Teoria das Relações Humanas", pista: "Teorias da Administração" },
  { palavra: "Planejamento, Organização, Direção, Controle (PODC)", pista: "Teorias da Administração" },
  { palavra: "Taylorismo", pista: "Teorias da Administração" },
  { palavra: "Eficiência e Eficácia", pista: "Teorias da Administração" },
  { palavra: "Teoria Neoclássica", pista: "Teorias da Administração" },
  { palavra: "Ambiente Organizacional", pista: "Teorias da Administração" },
  { palavra: "Hierarquização", pista: "Teorias da Administração" },
  { palavra: "Tecnologias de Comunicação", pista: "Teorias da Administração" },
  { palavra: "Administração Moderna", pista: "Teorias da Administração" },
  { palavra: "Processo de Globalização", pista: "Teorias da Administração" },
  { palavra: "Humanística", pista: "Teorias da Administração" },
  { palavra: "Gestão de Colaboradores", pista: "Gestão Contemporânea" },
  { palavra: "Gestão Contemporânea", pista: "Gestão Contemporânea" },
  { palavra: "Gestão Horizontal", pista: "Gestão Contemporânea" },
  { palavra: "Aspectos de Gestão", pista: "Gestão Contemporânea" },
  { palavra: "Pré Histórico", pista: "Teorias da Administração" },
  { palavra: "Efeito Hawthorne", pista: "Teorias da Administração" },
  { palavra: "Relações Humanas", pista: "Teorias da Administração" },
  { palavra: "Conhecimento Multidisciplinar", pista: "Teorias da Administração" },
  { palavra: "Max Weber", pista: "Teorias da Administração" },
  { palavra: "Competência Técnica", pista: "Teorias da Administração" },
  { palavra: "Promoção e Seleção", pista: "Teorias da Administração" },
  { palavra: "Direitos e Deveres", pista: "Teorias da Administração" },
  { palavra: "Linha de Montagem", pista: "Teorias da Administração" },
  { palavra: "Crescente Divisão", pista: "Teorias da Administração" }
];

let grupos = [];
let pontuacoes = [];
let grupoAtual = 0;
let palavraSecreta = "";
let letrasReveladas = [];
let letrasUsadas = [];
let valorAtualRoleta = 0;

const segmentos = [100, 200, 300, 400, 500, 600,
