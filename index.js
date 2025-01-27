

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

// Selecione o botão e a div personagem
const botaoGerarCartas = document.querySelector(".gerarCartas");
const divPersonagem = document.querySelector(".personagem");

// Adicione um evento de clique ao botão
botaoGerarCartas.addEventListener("click", () => {
  // Crie um novo objeto da classe Personagem
  const personagem = new Personagem('Leonidas','a pé', 'guerreiro', "./images/iLeonidas.jpg");
  
  // Crie o elemento HTML para o personagem
  const elemento = personagem.criarElemento();
  
  // Adicione o elemento HTML à div personagem
  divPersonagem.appendChild(elemento);
});


class Personagem {
  constructor(nome, locomocao, classe, imgPath) {
    this.nome = nome;
    this.locomocao = locomocao;
    this.classe = classe;
    this.imgPath = imgPath;
  }
  
  criarElemento() {
    const div = document.querySelector(".personagem");
    div.style.cursor = 'pointer'
    div.style.backgroundImage = `url(${this.imgPath})`;
    div.style.backgroundSize = 'cover';
    div.style.width = '32px';
    div.style.height = '32px';
    div.style.marginLeft = '1px'
    div.style.marginTop = '1px'
    div.style.border = '2px solid rgb(0,14,138)'
  
    // Adicione o evento de mouseover
    div.addEventListener("mouseover", () => {
      div.style.transform = "scale(1.2)";
      div.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    });
  
    // Adicione o evento de mouseout
    div.addEventListener("mouseout", () => {
      div.style.transform = "scale(1)";
      div.style.boxShadow = "none";
    });
  }
}