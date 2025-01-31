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


//Limitar criação de cartas
let objetoSelecionado = null;

function selecionarObjeto(objeto) {
  objetoSelecionado = objeto;
}

//Movimentar personagens
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.bloco, .porta, .blocoDeCombate, .areaDeNado').forEach(function(alvo) {
    alvo.addEventListener('click', function() {
      if (objetoSelecionado) {
        this.appendChild(objetoSelecionado);
        objetoSelecionado.addEventListener('click', function() {
          selecionarObjeto(this);
        });
      }
    });
  });
});
