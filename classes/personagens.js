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
let primeiraMovimentacao = true;

function selecionarObjeto(objeto) {
  objetoSelecionado = objeto;
  if (!movimentacoes.includes(objeto)) {
    movimentacoes.push({ objeto, contador: 0 });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.blocoEntrada, .bloco, .marAreia, .marAreiaI, .porta, .blocoDeCombate, .areaDeNado').forEach(function(alvo) {
    alvo.addEventListener('click', function() {
      if (objetoSelecionado) {
        if (primeiraMovimentacao) {
          if (alvo.classList.contains('blocoEntrada')) {
            const movimentacao = movimentacoes.find((m) => m.objeto === objetoSelecionado);
            if (movimentacao && movimentacao.contador < 2) {
              this.innerHTML = "";
              this.appendChild(objetoSelecionado);
              movimentacao.contador++;
              objetoSelecionado.addEventListener('click', function() {
                selecionarObjeto(this);
              });
              primeiraMovimentacao = false;
            } else {
              console.log('Limite de movimentações atingido');
            }
          } else {
            console.log('Primeira movimentação deve ser para um blocoEntrada');
          }
        } else {
          const movimentacao = movimentacoes.find((m) => m.objeto === objetoSelecionado);
          if (movimentacao && movimentacao.contador < 2) {
            this.innerHTML = "";
            this.appendChild(objetoSelecionado);
            movimentacao.contador++;
            objetoSelecionado.addEventListener('click', function() {
              selecionarObjeto(this);
            });
          } else {
            console.log('Limite de movimentações atingido');
          }
        }
      }
    });
  });
});


