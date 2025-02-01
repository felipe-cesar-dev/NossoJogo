import Cartas from "./assets/deckCartasDict.js";
import girarMapa from "./utils/girarMapa.js";

// Funções de interface

function interfaceGerarNumeroAleatorio() {
  return gerarNumeroAleatorio();
}

function interfaceCriarCarta(celula, numeroAleatorio) {
  return criarCarta(celula, numeroAleatorio);
}

function interfaceGerarCartasNaTela() {
  gerarCartasNaTela();
}

function interfaceAdicionarMovimentacao(carta) {
  adicionarMovimentacao(carta);
}

function interfaceMoverCarta(celula) {
  moverCarta(celula);
}

// Funções principais

let numerosRepetidos = [];

function gerarNumeroAleatorio() {
  let numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * 18) + 1;
  } while (numerosRepetidos.includes(numeroAleatorio));
  numerosRepetidos.push(numeroAleatorio);
  return numeroAleatorio;
}

function criarCarta(celula, numeroAleatorio) {
  const carta = document.createElement('div');
  carta.classList.add('cartas');
  carta.style.width = '39px';
  carta.style.height = '39px';
  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  carta.style.backgroundSize = 'cover';
  carta.style.backgroundRepeat = 'no-repeat';
  celula.appendChild(carta);
  delete Cartas[numeroAleatorio];
  console.log(Object.keys(Cartas))
  return carta;
}

function gerarCartasNaTela() {
  const primeiraLinhaCelulas = Array.from(celulas).slice(0, 5);
  if (primeiraLinhaCelulas.every((celula) => celula.children.length === 0)) {
    const cartasDisponiveis = Object.keys(Cartas).length;
    const cartasParaGerar = Math.min(cartasDisponiveis, 5);
    for (let i = 0; i < cartasParaGerar; i++) {
      const celula = primeiraLinhaCelulas[i];
      const numeroAleatorio = interfaceGerarNumeroAleatorio();
      console.log(`Número sorteado: ${numeroAleatorio}`);
      const carta = interfaceCriarCarta(celula, numeroAleatorio);
      interfaceAdicionarMovimentacao(carta);
    }
    if (cartasDisponiveis < 5) {
      console.log(`Não há mais cartas disponíveis. ${cartasDisponiveis} cartas foram geradas.`);
    }
  } else {
    console.log('As células da primeira linha não estão vazias');
  }
}

function adicionarMovimentacao(carta) {
  movimentacoes.push({ div: carta, movimentacao: 2 });
  carta.addEventListener('click', () => {
    divSelecionada = carta;
    console.log('Div selecionada:', carta);
  });
}

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

// Variáveis globais
const gerarCartas = document.querySelector('.gerarCartas');
const celulas = document.querySelectorAll('td');
let divSelecionada = null;
let movimentacoes = [];

// Eventos
gerarCartas.addEventListener('click', () => {
  interfaceGerarCartasNaTela();
});

celulas.forEach((celula) => {
  celula.addEventListener('click', () => {
    interfaceMoverCarta(celula);
  });
});

document.getElementById('reset-button').addEventListener('click', () => {
  movimentacoes.forEach((m) => m.movimentacao = 2);
  console.log('Movimentações resetadas');
});

interfaceGerarCartasNaTela();
girarMapa();