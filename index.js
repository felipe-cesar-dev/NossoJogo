

///Arrastar elementos

/*const objeto = document.getElementById('objeto');
const bloco = document.querySelectorAll('.bloco');
const porta = document.querySelectorAll('.porta');
const combate = document.querySelectorAll('.blocoDeCombate');
const nado = document.querySelectorAll('.areaDeNado');

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

bloco.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

porta.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});


objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

combate.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});

nado.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});
 

/// Arrastar navegação

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var id = event.dataTransfer.getData("text");
  var elementoArrastado = document.getElementById(id);
  event.target.appendChild(elementoArrastado);
}
*/

///girar mapa
let mapaGirado = false;

document.querySelector('.girarBotao').addEventListener('click', function() {
  if (!mapaGirado) {
    document.querySelector('.mapa').style.transform = 'rotate(180deg)';
    document.querySelector('.mapa').style.transition = 'transform 0.2s ease-in-out';
    mapaGirado = true;
  } else {
    document.querySelector('.mapa').style.transform = 'rotate(0deg)';
    document.querySelector('.mapa').style.transition = 'transform 0.2s ease-in-out';
    mapaGirado = false;
  }
});



/// Gerar cartas

class Personagem {
  constructor(nome, locomocao, classe, imgPath) {
    this.nome = nome;
    this.locomocao = locomocao;
    this.classe = classe;
    this.imgPath = imgPath;
  }

  criarPersonagem() {
    const div = document.createElement('div');
    div.className = 'personagem';
    div.style.backgroundImage = `url(${this.imgPath})`;
    div.style.backgroundSize = 'cover';
    div.style.width = '32px';
    div.style.height = '32px';
    div.style.marginLeft = '1px';
    div.style.marginTop = '1px';
    div.style.border = '2px solid rgb(0,14,138)';
    div.style.cursor = 'pointer';

    div.addEventListener("mouseover", () => {
      div.style.transform = "scale(1.2)";
      div.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    });

    div.addEventListener("mouseout", () => {
      div.style.transform = "scale(1)";
      div.style.boxShadow = "none";
    });

    div.addEventListener('click', function() {
      selecionarObjeto(this);
    });

    const deck = document.querySelector('.deck');
    deck.appendChild(div);
  }
}

const botaoGerarCartas = document.querySelector(".gerarCartas");
const personagens = [
  new Personagem('Leonidas', 'a pé', 'espartano', './images/iLeonidas.jpg'),
  new Personagem('Aquiles', 'a pé', 'guerreiro', './images/iGuerreiro.jpg'),
  new Personagem('Zion', 'a pé', 'arqueiro', './images/iNinja.jpg'),
  new Personagem('Zion', 'a pé', 'arqueiro', './images/iNinja.jpg'),
  new Personagem('Dante', 'a pé', 'berserker', './images/iBerserker.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg'),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg')
];



let objetoSelecionado = null;

function selecionarObjeto(objeto) {
  objetoSelecionado = objeto;
}

//Limitar criação de cartas

botaoGerarCartas.addEventListener("click", () => {
  const deck = document.querySelector(".deck");
  const cartas = deck.querySelectorAll(".personagem");
  if (cartas.length === 0) {
    personagens.slice(0, 10).forEach(personagem => personagem.criarPersonagem());
  }
});

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



