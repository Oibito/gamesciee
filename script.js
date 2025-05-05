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

const segmentos = [100, 200, 300, 400, 500, 600, 'Passe a vez', 'Perde tudo'];

// Função para iniciar o jogo
function iniciarJogo() {
  // Captura os nomes dos grupos
  grupos = [];
  for (let i = 1; i <= 6; i++) {
    let nome = document.getElementById(`grupo${i}`).value.trim();
    if (nome) {
      grupos.push(nome);
    }
  }

  // Verifica se há ao menos um grupo
  if (grupos.length === 0) {
    alert("Insira ao menos um grupo.");
    return;
  }

  // Inicializa a pontuação dos grupos
  pontuacoes = Array(grupos.length).fill(0);

  // Esconde a tela de configuração e mostra o jogo
  document.getElementById("configuracao").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  // Seleciona o primeiro grupo aleatoriamente
  grupoAtual = Math.floor(Math.random() * grupos.length);

  // Atualiza o placar e o grupo atual
  atualizarPlacar();
  atualizarGrupoAtual();

  // Escolhe a palavra secreta
  escolherPalavra();

  // Desenha o painel (palavra secreta)
  desenharPainel();

  // Desenha a roleta
  desenharRoleta();
}

// Função para escolher a palavra secreta
function escolherPalavra() {
  const index = Math.floor(Math.random() * palavrasEPistas.length);
  palavraSecreta = palavrasEPistas[index].palavra.toLowerCase();
  letrasReveladas = Array(palavraSecreta.length).fill(false);
  document.getElementById("pista").textContent = `Pista: ${palavrasEPistas[index].pista}`;
}

// Função para desenhar o painel de letras
function desenharPainel() {
  const painel = document.getElementById("painel");
  painel.innerHTML = "";
  for (let i = 0; i < palavraSecreta.length; i++) {
    const span = document.createElement("span");
    span.className = "letra";
    const char = palavraSecreta[i];
    if (char === " ") {
      span.textContent = "-";
    } else {
      span.textContent = letrasReveladas[i] ? char.toUpperCase() : "";
    }
    painel.appendChild(span);
  }
}

// Função para atualizar o placar
function atualizarPlacar() {
  const placar = document.getElementById("placarGrupos");
  placar.innerHTML = "";
  grupos.forEach((grupo, index) => {
    placar.innerHTML += `<div>${grupo}: ${pontuacoes[index]} pontos</div>`;
  });
}

// Função para atualizar o grupo atual
function atualizarGrupoAtual() {
  document.getElementById("grupoAtual").textContent = `Vez do grupo: ${grupos[grupoAtual]}`;
}

// Função para desenhar a roleta
function desenharRoleta() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const total = segmentos.length;
  const angulo = 2 * Math.PI / total;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF4500";
    ctx.arc(150, 150, 150, i * angulo, (i + 1) * angulo);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "bold 14px sans-serif";
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(i * angulo + angulo / 2);
    ctx.textAlign = "right";
    ctx.fillText(segmentos[i], 140, 0);
    ctx.restore();
  }
}

// Função para girar a roleta
function girarRoleta() {
  const som = document.getElementById("somRoleta");
  som.play();
  const escolhido = Math.floor(Math.random() * segmentos.length);
  valorAtualRoleta = segmentos[escolhido];

  setTimeout(() => {
    alert(`Resultado da roleta: ${valorAtualRoleta}`);
    if (valorAtualRoleta === 'Passe a vez' || valorAtualRoleta === 'Perde tudo') {
      if (valorAtualRoleta === 'Perde tudo') pontuacoes[grupoAtual] = 0;
      grupoAtual = (grupoAtual + 1) % grupos.length;
      atualizarPlacar();
      atualizarGrupoAtual();
    }
  }, 1000);
