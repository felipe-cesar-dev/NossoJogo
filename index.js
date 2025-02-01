import Cartas from "./assets/deckCartasDict.js";
import girarMapa from "./utils/girarMapa.js";

const gerarCartas = document.querySelector('.gerarCartas');
const celulas = document.querySelectorAll('td');
let divSelecionada = null;
let movimentacoes = [];

// Cria as divs das cartas
for (let i = 0; i < 5; i++) {
  const celula = celulas[i];
  const carta = document.createElement('div');
  carta.classList.add('cartas');
  carta.style.width = '39px';
  carta.style.height = '39px';

  // Gera um número aleatório entre 1 e o número de cartas
  let numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * Object.keys(Cartas).length) + 1;
  } while (numeroAleatorio === i + 1); // Evita repetição de cartas

  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  carta.style.backgroundSize = 'cover';
  carta.style.backgroundRepeat = 'no-repeat';
  celula.appendChild(carta);
}

const cartas = document.querySelectorAll('.cartas');
cartas.forEach((div) => {
  movimentacoes.push({ div, movimentacao: 2 });
  div.addEventListener('click', () => {
    divSelecionada = div;
    console.log('Div selecionada:', div);
  });
});

celulas.forEach((celula) => {
  celula.addEventListener('click', () => {
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
          console.log(`Movimentações restantes para a div ${divSelecionada}: ${movimentacoes.find((m) => m.div === divSelecionada).movimentacao}`);
        }
      } else {
        console.log('Movimento não permitido');
      }
    }
  });
});

gerarCartas.addEventListener('click', () => {
  const primeiraLinhaCelulas = Array.from(celulas).slice(0, 5);
  if (primeiraLinhaCelulas.every((celula) => celula.children.length === 0)) {
    for (let i = 0; i < 5; i++) {
      const celula = primeiraLinhaCelulas[i];
      const carta = document.createElement('div');
      carta.classList.add('cartas');
      carta.style.width = '39px';
      carta.style.height = '39px';

      // Gera um número aleatório entre 1 e o número de cartas
      let numeroAleatorio;
      do {
        numeroAleatorio = Math.floor(Math.random() * Object.keys(Cartas).length) + 1;
      } while (numeroAleatorio === i + 1); // Evita repetição de cartas

      carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
      carta.style.backgroundSize = 'cover';
      carta.style.backgroundRepeat = 'no-repeat';
      celula.appendChild(carta);

      // Adiciona a carta ao array movimentacoes
      movimentacoes.push({ div: carta, movimentacao: 2 });

      // Adiciona o evento de clique à carta
      carta.addEventListener('click', () => {
        divSelecionada = carta;
        console.log('Div selecionada:', carta);
      });
    }
  } else {
    console.log('As células da primeira linha não estão vazias');
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  movimentacoes.forEach((m) => m.movimentacao = 2);
  console.log('Movimentações resetadas');
});


girarMapa()