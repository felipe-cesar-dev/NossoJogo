import Cartas from "../assets/deckCartasDict.js";
import Personagem from "../classes/personagens.js"
import girarMapa from "./girarMapa.js";

girarMapa()


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





/// Gerar carta

function gerarCartas() {
  const botaoGerarCartas = document.querySelector(".gerarCartas");
  const deck = document.querySelector(".deck");

  botaoGerarCartas.addEventListener("click", () => {
    if (Object.keys(Cartas).length === 0) {
      alert("O deck chegou ao final!");
    } else {
      if (deck.children.length === 1) {
        // Verifica se o deck está vazio
        const cartasDisponiveis = Object.keys(Cartas);
        const cartasASortear = Math.min(cartasDisponiveis.length, 7);
        for (var i = 0; i < cartasASortear; i++) {
          const indiceAleatorio = Math.floor(Math.random() * cartasDisponiveis.length);
          const numeroAleatorio = cartasDisponiveis[indiceAleatorio];
          cartasDisponiveis.splice(indiceAleatorio, 1);
          var cartaSelecionada = Cartas[numeroAleatorio];
          var personagem = new Personagem(cartaSelecionada);
          personagem.criarPersonagem();
          delete Cartas[numeroAleatorio]; // Remove o índice do elemento sorteado
        }
        console.log("Cartas sorteadas com sucesso!"); } } });
}

gerarCartas()


