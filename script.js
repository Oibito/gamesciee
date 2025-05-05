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
  { palavra: "Processor de Globalização", pista: "Teorias da Administração" },
  { palavra: "Humanística", pista: "Teorias da Administração" },
  { palavra: "Gestão de Colaboradores", pista: "Gestão Contemporânea" },
  { palavra: "Gestão Contemporânea", pista: "Gestão Contemporânea" },
  { palavra: "Gestão Horizontal", pista: "Gestão Contemporânea" },
  { palavra: "Aspectos de Gestão", pista: "Gestão Contemporânea" },
  { palavra: "Teorias da Administração", pista: "Teorias da Administração" },
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

let anguloRoleta = 0;
let girando = false;

function iniciarJogo() {
  grupos = [];
  for (let i = 1; i <= 6; i++) {
    let nome = document.getElementById(`grupo${i}`).value.trim();
    if (nome) grupos.push(nome);
  }
  if (grupos.length === 0) {
    alert("Insira ao menos um grupo.");
    return;
  }
  pontuacoes = Array(grupos.length).fill(0);
  document.getElementById("configuracao").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  grupoAtual = Math.floor(Math.random() * grupos.length);
  atualizarPlacar();
  atualizarGrupoAtual();
  escolherPalavra();
  desenharPainel();
  desenharRoleta();
}

function escolherPalavra() {
  const index = Math.floor(Math.random() * palavrasEPistas.length);
  palavraSecreta = palavrasEPistas[index].palavra.toLowerCase();
  letrasReveladas = Array(palavraSecreta.length).fill(false);
  document.getElementById("pista").textContent = `Pista: ${palavrasEPistas[index].pista}`;
}

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

function atualizarPlacar() {
  const placar = document.getElementById("placarGrupos");
  placar.innerHTML = "";
  grupos.forEach((grupo, index) => {
    placar.innerHTML += `<div>${grupo}: ${pontuacoes[index]} pontos</div>`;
  });
}

function atualizarGrupoAtual() {
  document.getElementById("grupoAtual").textContent = `Vez do grupo: ${grupos[grupoAtual]}`;
}

function desenharRoleta() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const total = segmentos.length;
  const anguloPorSegmento = 2 * Math.PI / total;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF4500";
    ctx.arc(150, 150, 150, anguloRoleta + i * anguloPorSegmento, anguloRoleta + (i + 1) * anguloPorSegmento);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "bold 14px sans-serif";
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(anguloRoleta + i * anguloPorSegmento + anguloPorSegmento / 2);
    ctx.textAlign = "right";
    ctx.fillText(segmentos[i], 140, 0);
    ctx.restore();
  }
}

function girarRoleta() {
  if (girando) return;

  girando = true;
  const som = document.getElementById("somRoleta");
  som.play();

  const duracao = 3000;
  const segmentosCount = segmentos.length;
  const anguloFinal = Math.floor(Math.random() * segmentosCount) * (2 * Math.PI / segmentosCount);

  let inicioTempo = null;

  function animarRoleta(tempoAtual) {
    if (!inicioTempo) inicioTempo = tempoAtual;

    const tempoDecorrido = tempoAtual - inicioTempo;
    const progresso = Math.min(tempoDecorrido / duracao, 1);

    anguloRoleta = progresso * anguloFinal + 10 * Math.PI;

    desenharRoleta();

    if (progresso < 1) {
      requestAnimationFrame(animarRoleta);
    } else {
      const escolhido = Math.floor(((anguloRoleta % (2 * Math.PI)) / (2 * Math.PI)) * segmentosCount);
      valorAtualRoleta = segmentos[escolhido];
      setTimeout(() => {
        alert(`Resultado da roleta: ${valorAtualRoleta}`);
        if (valorAtualRoleta === 'Passe a vez' || valorAtualRoleta === 'Perde tudo') {
          if (valorAtualRoleta === 'Perde tudo') pontuacoes[grupoAtual] = 0;
          grupoAtual = (grupoAtual + 1) % grupos.length;
          atualizarPlacar();
          atualizarGrupoAtual();
        }
      }, 500);
      girando = false;
    }
  }

  requestAnimationFrame(animarRoleta);
}

function adivinharLetra() {
  const letra = document.getElementById("letra").value.trim().toLowerCase();
  if (letra && !letrasUsadas.includes(letra)) {
    letrasUsadas.push(letra);
    let acerto = false;
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        letrasReveladas[i] = true;
        acerto = true;
      }
    }
    if (acerto) {
      pontuacoes[grupoAtual] += 50;
    } else {
      pontuacoes[grupoAtual] -= 25;
    }
    letrasUsadas.push(letra);
    atualizarPlacar();
    desenharPainel();
    atualizarGrupoAtual();
  }
}

function adivinharPalavra() {
  const palavra = document.getElementById("palpite").value.trim().toLowerCase();
  if (palavra === palavraSecreta) {
    alert("Parabéns! Você acertou a palavra!");
    pontuacoes[grupoAtual] += 200;
    atualizarPlacar();
    desenharPainel();
    escolherPalavra();
  } else {
    alert("Palpite errado! Perdeu pontos!");
    pontuacoes[grupoAtual] -= 100;
    atualizarPlacar();
    grupoAtual = (grupoAtual + 1) % grupos.length;
    atualizarGrupoAtual();
  }
}
