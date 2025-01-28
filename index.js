

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
    mapaGirado = true;
  } else {
    document.querySelector('.mapa').style.transform = 'rotate(0deg)';
    mapaGirado = false;
  }
});


///clicar e mover o personagem

let objetoSelecionado = null;

function selecionarObjeto(objeto) {
  objetoSelecionado = objeto;
}

document.querySelectorAll('.personagem').forEach(function(objeto) {
  objeto.addEventListener('click', function() {
    selecionarObjeto(this);
  });
});

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


///Gerar Cartas


class Personagem {
  constructor(nome, locomocao, classe, imgPath, div) {
    this.nome = nome;
    this.locomocao = locomocao;
    this.classe = classe;
    this.imgPath = imgPath;
    this.div = div;
  }

  criarPersonagem() {
    this.div.style.backgroundImage = `url(${this.imgPath})`;
    this.div.style.backgroundSize = 'cover';
    this.div.style.width = '32px';
    this.div.style.height = '32px';
    this.div.style.marginLeft = '1px'
    this.div.style.marginTop = '1px'
    this.div.style.border = '2px solid rgb(0,14,138)'
    this.div.style.cursor = 'pointer';

    this.div.addEventListener("mouseover", () => {
      this.div.style.transform = "scale(1.2)";
      this.div.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    });

    this.div.addEventListener("mouseout", () => {
      this.div.style.transform = "scale(1)";
      this.div.style.boxShadow = "none";
    });
  }
}

const botaoGerarCartas = document.querySelector(".gerarCartas");
const divs = document.querySelectorAll(".personagem");

const personagens = [
  new Personagem('Leonidas', 'a pé', 'espartano', './images/iLeonidas.jpg', divs[0]),
  new Personagem('Aquiles', 'a pé', 'guerreiro', './images/iGuerreiro.jpg', divs[1]),
  new Personagem('Zion', 'a pé', 'arqueiro', './images/iNinja.jpg', divs[2]),
  new Personagem('Dante', 'a pé', 'berserker', './images/iBerserker.jpg', divs[3]),
  new Personagem('Xin', 'a pé', 'samurai', './images/iSamurai.jpg', divs[4])
  
];

botaoGerarCartas.addEventListener("click", () => {
  personagens.forEach(personagem => personagem.criarPersonagem());
});


