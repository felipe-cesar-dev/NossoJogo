import Cartas from "./assets/deckCartasDict.js";
import girarMapa from "./utils/girarMapa.js";

const gerarCartas = document.querySelector('.gerarCartas');
const celulas = document.querySelectorAll('td');
let divSelecionada = null;
let movimentacoes = [];

// Função para gerar um número aleatório entre 1 e 18
let numerosRepetidos = [];
function gerarNumeroAleatorio() {
  let numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * 18) + 1;
  } while (numerosRepetidos.includes(numeroAleatorio));
  // Evita repetição de cartas
  numerosRepetidos.push(numeroAleatorio);
  // Adiciona o número sorteado ao array
  return numeroAleatorio;
}

// Função para criar uma carta
function criarCarta(celula, numeroAleatorio) {
  const carta = document.createElement('div');
  carta.classList.add('cartas');
  carta.style.width = '39px';
  carta.style.height = '39px';
  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  carta.style.backgroundSize = 'cover';
  carta.style.backgroundRepeat = 'no-repeat';
  celula.appendChild(carta);
  return carta;
}

// Função para gerar cartas
function gerarCartasNaTela() {
  const primeiraLinhaCelulas = Array.from(celulas).slice(0, 5);
  if (primeiraLinhaCelulas.every((celula) => celula.children.length === 0)) {
    for (let i = 0; i < 5; i++) {
      const celula = primeiraLinhaCelulas[i];
      const numeroAleatorio = gerarNumeroAleatorio();
      console.log(`Número sorteado: ${numeroAleatorio}`);
      const carta = criarCarta(celula, numeroAleatorio);
      adicionarMovimentacao(carta);
    }
  } else {
    console.log('As células da primeira linha não estão vazias');
  }
}

// Adiciona o evento de clique ao botão gerar cartas
gerarCartas.addEventListener('click', () => {
  gerarCartasNaTela();
});


// Função para adicionar uma carta ao array movimentacoes
function adicionarMovimentacao(carta) {
  movimentacoes.push({ div: carta, movimentacao: 2 });
  carta.addEventListener('click', () => {
    divSelecionada = carta;
    console.log('Div selecionada:', carta);
  });
}

// Função para mover uma carta
function moverCarta(celula) {
  if (divSelecionada) {
    const celulaAtual = divSelecionada.parentNode;
    const rowIndex = celulaAtual.parentNode.rowIndex;
    const cellIndex = celulaAtual.cellIndex;
    const newRow = celula.parentNode.rowIndex;
    const newCell = celula.cellIndex;
    if (Math.abs(newRow - rowIndex) + Math.abs(newCell - cellIndex) === 1) {
      const movimentacao = movimentacoes.find((m) => m.div === divSelecionada).movimentacao;
      if (movimentacao > 0) {
        celula.appendChild(divSelecionada);
        movimentacoes.find((m) => m.div === divSelecionada).movimentacao--;
      }
    } else {
      console.log('Movimento não permitido');
    }
  }
}

// Adiciona o evento de clique às células
celulas.forEach((celula) => {
  celula.addEventListener('click', () => {
    moverCarta(celula);
  });
});


// Adiciona o evento de clique ao botão reset
document.getElementById('reset-button').addEventListener('click', () => {
  movimentacoes.forEach((m) => m.movimentacao = 2);
  console.log('Movimentações resetadas');
});

gerarCartasNaTela();
girarMapa();