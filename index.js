import Cartas from "./assets/deckCartasDict.js";
import initBotaoIrAoFim from "./utils/botaoFimComeco.js";
import initRecolherStatusCartas from "./utils/botaoOcultarMostrarStatus.js";
import gerarNumeroAleatorio from "./utils/gerarNumerosAleatorios.js";
import arrayFromCelulas from "./utils/arrayFromCelulas.js";
import criarPropsCarta from "./utils/criarPropsDeCartas.js";
import estilizarCartas from "./utils/estilizarCarta.js";
import iEstilizarCartaStatus from "./utils/estilziarCartaStatus.js";
import Movimentacoes from "./classes/Movimentacoes.js";

// Variáveis globais
const celulas = document.querySelectorAll('td');
const textoLocomocao = document.querySelector('.locomocao') 
const botaoReset = document.getElementById('reset-button')
let divSelecionada = null; //desacoplada do criarCarta
let soma = 0
const movimentacoes = new Movimentacoes;
let celulasGeradas = [];

function criarCarta(celula, numeroAleatorio) {
  let div = null
  const carta = document.createElement('div');
  const locomocao = Cartas[numeroAleatorio].Locomocao;
  const movimentacao = { div: carta, movimentacao: locomocao };
  carta.classList.add('cartas');
  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  movimentacoes.adicionarMovimentacao(movimentacao);
  iEstilizarCartaStatus(carta, div, movimentacao, textoLocomocao )
  celula.appendChild(carta);
  celulasGeradas.push(celula);
  // Armazenar as propriedades da carta em uma variável
  const cartaProps = Cartas[numeroAleatorio];
  carta.props = criarPropsCarta(cartaProps);
  estilizarCartas(carta)
  // Deletar a propriedade de Cartas
  delete Cartas[numeroAleatorio];
  console.log(Object.keys(Cartas));
  // Adicionar as propriedades da carta ao objeto carta
  return carta;
}

function iCriarCarta(carta, numeroAleatorio){
  return criarCarta(carta,numeroAleatorio)
}

function gerarCartasNaTela() {
  const celulasParaGerar = arrayFromCelulas(celulas);
  if (celulasParaGerar.every((celula) => celula.children.length === 0)) {
    const cartasDisponiveis = Object.keys(Cartas).length;
    const cartasParaGerar = Math.min(cartasDisponiveis, 5);
    for (let i = 0; i < cartasParaGerar; i++) {
      const celula = celulasParaGerar[i];
      const numeroAleatorio = gerarNumeroAleatorio();
      console.log(`Número sorteado: ${numeroAleatorio}`);
      const carta = iCriarCarta(celula, numeroAleatorio);
      adicionarMovimentacao(carta, numeroAleatorio);
    }
    if (cartasDisponiveis < 6) {
      console.log(`Não há mais cartas disponíveis. ${cartasDisponiveis} cartas foram geradas.`);
    }
  } else {
    console.log('As células não estão vazias');
  }
}

export default function iGerarCartasNaTela(){
  return gerarCartasNaTela()
}

function adicionarMovimentacao(carta) {
  const locomocao = carta.props.Locomocao;
  const movimentacao = { div: carta, movimentacao: locomocao };
  movimentacoes.adicionarMovimentacao(movimentacao);
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

    // Verifica se a carta está tentando voltar para a linha 0
    if (newRow === 0 && rowIndex > 0) {
      console.log('Não é permitido voltar para a linha 0');
      return;
    }

    // Verifica se a célula destino já contém uma carta
    if (celula.children.length > 0) {
      console.log('Célula destino já contém uma carta');
      return;
    }

    // Verifica se a célula destino tem a classe "muro"
    if (celula.classList.contains('muro')) {
      console.log('Não é permitido mover para uma célula com a classe "muro"');
      return;
    }

    if (Math.abs(newRow - rowIndex) + Math.abs(newCell - cellIndex) === 1) {
      const movimentacao = movimentacoes.encontrarMovimentacao((m) => m.div === divSelecionada);
      if (movimentacao.movimentacao > 0) {
        celula.appendChild(divSelecionada);
        movimentacao.movimentacao--;
        if (movimentacao.movimentacao === 0) {
          celula.style.filter =  'brightness(50%)';
        }
        textoLocomocao.innerHTML = `Locomoção: ${movimentacao.movimentacao}`;
        celulasGeradas.push(celula);
      }
    } else {
      console.log('Movimento não permitido');
    }
  }
}

// Eventos

celulas.forEach((celula) => {
  celula.addEventListener('click', () => {
    moverCarta(celula);
  });
});

function handleResetButtonClick() {
  const turnos = document.querySelector('.turnos')
  const celulasPrimeiraLinha = arrayFromCelulas(celulas)
  if (celulasPrimeiraLinha.every((celula) => celula.children.length === 0)) {
    movimentacoes.realizarAcaoEmTodasMovimentacoes((m) => m.movimentacao = m.div.props.Locomocao);
    console.log('Movimentações resetadas');
    soma += 0.5;
    turnos.innerHTML = `Turno ${soma}`;
    iGerarCartasNaTela();
    celulasGeradas.forEach((celula) => {
      celula.style.filter = 'brightness(100%)';
    });
    celulasGeradas = [];
  } else {
    alert('Ainda há cartas na primeira linha!');
  }
}

botaoReset.addEventListener('click', handleResetButtonClick);

initRecolherStatusCartas()
initBotaoIrAoFim()
iGerarCartasNaTela();
