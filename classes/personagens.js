export default class Personagem {
  constructor(cartas) {
    this.imgPath = cartas.img;
  }

  criarPersonagem() {
    const div = document.createElement('div');
    div.className = 'personagem';
    div.style.backgroundImage = `url(${this.imgPath})`;
    div.style.backgroundSize = 'cover';
    div.style.width = '32px';
    div.style.height = '32px';
    div.style.border = '2px solid rgb(0,14,138)';
    div.style.cursor = 'pointer';

    div.addEventListener("mouseover", () => {
      div.style.transform = "scale(1.5)";
      div.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    });

    div.addEventListener("mouseout", () => {
      div.style.transform = "scale(1)";
      div.style.boxShadow = "none";
    });

    div.addEventListener("click", () => {
      
    })

    div.addEventListener('click', function() {
      selecionarObjeto(this);
    });

    const deck = document.querySelector('.deck');
    deck.appendChild(div);
  }
}


let objetoSelecionado = null;
let movimentacoes = [];
let posicaoInicial = null;

function selecionarObjeto(objeto) {
  objetoSelecionado = objeto;
  if (!movimentacoes.find((m) => m.objeto === objetoSelecionado)) {
    movimentacoes.push({ objeto: objetoSelecionado, contador: 0, primeiraMovimentacao: true, resetado: false });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.blocoEntrada, .bloco, .marAreia, .marAreiaI, .porta, .blocoDeCombate, .areaDeNado').forEach(function(alvo) {
    alvo.addEventListener('click', function() {
      if (objetoSelecionado) {
        if (alvo.children.length > 0) {
          console.log('Não é possível mover o objeto para essa posição, pois já há um objeto lá.');
          return;
        }
        const movimentacao = movimentacoes.find((m) => m.objeto === objetoSelecionado);
        if (movimentacao.primeiraMovimentacao) {
          if (alvo.classList.contains('blocoEntrada')) {
            this.innerHTML = "";
            this.appendChild(objetoSelecionado);
            movimentacao.contador++;
            movimentacao.primeiraMovimentacao = false;
            posicaoInicial = this;
            objetoSelecionado.addEventListener('click', function() {
              selecionarObjeto(this);
            });
          } else {
            console.log('Primeira movimentação deve ser para um blocoEntrada');
          }
        } else {
          if (movimentacao.resetado) {
            if (movimentacao.contador < 2) {
              if (alvo.children.length === 0) {
                const posicaoAtual = this;
                const diferencaX = Math.abs(posicaoAtual.offsetLeft - posicaoInicial.offsetLeft);
                const diferencaY = Math.abs(posicaoAtual.offsetTop - posicaoInicial.offsetTop);
                if (diferencaX <= 50 && diferencaY <= 50 && !(diferencaX > 0 && diferencaY > 0)) {
                  this.innerHTML = "";
                  this.appendChild(objetoSelecionado);
                  movimentacao.contador++;
                  objetoSelecionado.addEventListener('click', function() {
                    selecionarObjeto(this);
                  });
                  posicaoInicial = this; // Atualiza a posição inicial
                } else {
                  console.log('Movimentação inválida');
                }
              } else {
                console.log('Não é possível mover o objeto para essa posição, pois já há um objeto lá.');
              }
            } else {
              console.log('Limite de movimentações atingido');
            }
          } else {
            if (movimentacao.contador < 2) {
              if (alvo.children.length === 0) {
                const posicaoAtual = this;
                const diferencaX = Math.abs(posicaoAtual.offsetLeft - posicaoInicial.offsetLeft);
                const diferencaY = Math.abs(posicaoAtual.offsetTop - posicaoInicial.offsetTop);
                if (diferencaX <= 50 && diferencaY <= 50 && !(diferencaX > 0 && diferencaY > 0)) {
                  this.innerHTML = "";
                  this.appendChild(objetoSelecionado);
                  movimentacao.contador++;
                  objetoSelecionado.addEventListener('click', function() {
                    selecionarObjeto(this);
                  });
                  posicaoInicial = this; // Atualiza a posição inicial
                } else {
                  console.log('Movimentação inválida');
                }
              } else {
                console.log('Não é possível mover o objeto para essa posição, pois já há um objeto lá.');
              }
            } else {
              console.log('Limite de movimentações atingido');
            }
          }
        }
      }
    });
  });
});

document.querySelector('.resetar').addEventListener('click', function() {
  const movimentacao = movimentacoes.find((m) => m.objeto === objetoSelecionado);
  movimentacao.contador = 0;
  movimentacao.resetado = true;
  console.log('Movimentação resetada');
});
















