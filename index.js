import Cartas from "./assets/deckCartasDict.js";
import initBotaoIrAoFim from "./utils/botaoFimComeco.js";
import initRecolherStatusCartas from "./utils/botaoOcultarMostrarStatus.js";
import gerarNumeroAleatorio from "./utils/gerarNumerosAleatorios.js";

// Variáveis globais
const celulas = document.querySelectorAll('td');
const exibirCarta = document.querySelector('.exibirCarta')
const imagem = document.querySelector('img')
const textoCarta = document.querySelector('.textoCarta') 
const textoLocomocao = document.querySelector('.locomocao') 
const botaoReset = document.getElementById('reset-button')
const turnos = document.querySelector('.turnos')  
let divSelecionada = null;
let movimentacoes = [];
let soma = 0

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

function criarCarta(celula, numeroAleatorio) {
  const carta = document.createElement('div');
  carta.classList.add('cartas');
  carta.style.width = '40px';
  carta.style.height = '40px';
  carta.style.backgroundImage = `url(${Cartas[numeroAleatorio].img})`;
  carta.style.backgroundSize = 'cover';
  carta.style.backgroundRepeat = 'no-repeat';

  const locomocao = Cartas[numeroAleatorio].Locomocao;
  const movimentacao = { div: carta, movimentacao: locomocao };
  movimentacoes.push(movimentacao);

  carta.addEventListener('click', () => {
    divSelecionada = carta;
    console.log('Div selecionada:', carta);
    textoLocomocao.innerHTML = `Locomoção: ${movimentacao.movimentacao}`;
    exibirCarta.appendChild(imagem, textoCarta)
    imagem.src = carta.props.img
    imagem.style.display = 'block'
    textoCarta.innerHTML = `Nome: ${carta.props.Nome}\nVida: ${carta.props.Vida}\n Ataque: ${carta.props.Ataque}` 
  });

  celula.appendChild(carta);

  // Armazenar as propriedades da carta em uma variável
  const cartaProps = Cartas[numeroAleatorio];
  // Deletar a propriedade de Cartas
  delete Cartas[numeroAleatorio];
  console.log(Object.keys(Cartas));

  // Adicionar as propriedades da carta ao objeto carta
  carta.props = {
    Nome: cartaProps.Nome,
    Ataque: parseInt(cartaProps.Ataque),
    Vida: parseInt(cartaProps.Vida),
    Locomocao: parseInt(cartaProps.Locomocao),
    Perfuracao: cartaProps.Perfuracao,
    Magia: cartaProps.Magia,
    voar: cartaProps.voar,
    andar: cartaProps.andar,
    nadar: cartaProps.nadar,
    img: cartaProps.img
  };

  return carta;
}

function gerarCartasNaTela() {
  const celulasParaGerar = Array.from(celulas).slice(10, 20);
  if (celulasParaGerar.every((celula) => celula.children.length === 0)) {
    const cartasDisponiveis = Object.keys(Cartas).length;
    const cartasParaGerar = Math.min(cartasDisponiveis, 10);
    for (let i = 0; i < cartasParaGerar; i++) {
      const celula = celulasParaGerar[i];
      const numeroAleatorio = interfaceGerarNumeroAleatorio();
      console.log(`Número sorteado: ${numeroAleatorio}`);
      const carta = interfaceCriarCarta(celula, numeroAleatorio);
      interfaceAdicionarMovimentacao(carta, numeroAleatorio);
    }
    if (cartasDisponiveis < 10) {
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
    interfaceMoverCarta(celula);
  });
});

botaoReset.addEventListener('click', () => {
  const celulasPrimeiraLinha = Array.from(celulas).slice(10, 20);
  if (celulasPrimeiraLinha.every((celula) => celula.children.length === 0)) {
    movimentacoes.forEach((m) => m.movimentacao = m.div.props.Locomocao);
    console.log('Movimentações resetadas');
    soma += 0.5;
    turnos.innerHTML = `Turno ${soma}`;
    interfaceGerarCartasNaTela();
  } else {
    alert('Ainda há cartas na primeira linha!');
  }
});

initRecolherStatusCartas()
initBotaoIrAoFim()
interfaceGerarCartasNaTela();
