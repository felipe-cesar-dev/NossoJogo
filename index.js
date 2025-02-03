import Cartas from "./assets/deckCartasDict.js";
import initBotaoIrAoFim from "./utils/botaoFimComeco.js";
import initRecolherStatusCartas from "./utils/botaoOcultarMostrarStatus.js";
import gerarNumeroAleatorio from "./utils/gerarNumerosAleatorios.js";
import arrayFromCelulas from "./utils/arrayFromCelulas.js";
import criarPropsCarta from "./utils/criarPropsDeCartas.js";

// Variáveis globais
const celulas = document.querySelectorAll('td');
const textoLocomocao = document.querySelector('.locomocao') 
const botaoReset = document.getElementById('reset-button')
let divSelecionada = null;
let movimentacoes = [];
let soma = 0
// Funções principais

function criarCarta(celula, numeroAleatorio) {
  const textoCarta = document.querySelector('.textoCarta') 
  const exibirCarta = document.querySelector('.exibirCarta')
  const imagem = document.querySelector('img')
  const carta = document.createElement('div');
  const locomocao = Cartas[numeroAleatorio].Locomocao;
  const movimentacao = { div: carta, movimentacao: locomocao };
  carta.classList.add('cartas');
  carta.style.width = '40px';
  carta.style.height = '40px';
  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  carta.style.backgroundSize = 'cover';
  carta.style.backgroundRepeat = 'no-repeat';
  movimentacoes.push(movimentacao);
  carta.addEventListener('click', () => {
    if (divSelecionada && divSelecionada !== carta) {
      divSelecionada.style.opacity = '1';
    }
    divSelecionada = carta;
    console.log('Div selecionada:', carta);
    divSelecionada.style.opacity = '0.5'
    textoLocomocao.innerHTML = `Locomoção: ${movimentacao.movimentacao}`
    exibirCarta.appendChild(imagem, textoCarta)
    imagem.src = carta.props.img
    imagem.style.display = 'block'
    textoCarta.innerHTML = `Nome: ${carta.props.Nome}\nVida: ${carta.props.Vida}\n Ataque: ${carta.props.Ataque}`
  });
  document.addEventListener('click', (event) => {
    if (divSelecionada && !divSelecionada.contains(event.target)) {
      divSelecionada.style.opacity = '1';
    }
  });
  celula.appendChild(carta);
  // Armazenar as propriedades da carta em uma variável
  const cartaProps = Cartas[numeroAleatorio];
  carta.props = criarPropsCarta(cartaProps);
  // Deletar a propriedade de Cartas
  delete Cartas[numeroAleatorio];
  console.log(Object.keys(Cartas));
  // Adicionar as propriedades da carta ao objeto carta
  return carta;
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
      const carta = criarCarta(celula, numeroAleatorio);
      adicionarMovimentacao(carta, numeroAleatorio);
    }
    if (cartasDisponiveis < 6) {
      console.log(`Não há mais cartas disponíveis. ${cartasDisponiveis} cartas foram geradas.`);
    }
  } else {
    console.log('As células não estão vazias');
  }
}

function adicionarMovimentacao(carta) {
  const locomocao = carta.props.Locomocao;
  const movimentacao = { div: carta, movimentacao: locomocao };
  movimentacoes.push(movimentacao);
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
      const movimentacao = movimentacoes.find((m) => m.div === divSelecionada);
      if (movimentacao.movimentacao > 0) {
        celula.appendChild(divSelecionada);
        movimentacao.movimentacao--;
        textoLocomocao.innerHTML = `Locomoção: ${movimentacao.movimentacao}`;
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


botaoReset.addEventListener('click', () => {
const turnos = document.querySelector('.turnos')  
const celulasPrimeiraLinha = arrayFromCelulas(celulas)
if (celulasPrimeiraLinha.every((celula) => celula.children.length === 0)) {
    movimentacoes.forEach((m) => m.movimentacao = m.div.props.Locomocao);
    console.log('Movimentações resetadas');
    soma += 0.5;
    turnos.innerHTML = `Turno ${soma}`;
    gerarCartasNaTela();
} else {
    alert('Ainda há cartas na primeira linha!');
}
});



initRecolherStatusCartas()
initBotaoIrAoFim()
gerarCartasNaTela();
