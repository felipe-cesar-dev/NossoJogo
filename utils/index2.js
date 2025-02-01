import Cartas from "../assets/deckCartasDict.js";
import Personagem from "../classes/personagens.js"
import girarMapa from "./girarMapa.js";

girarMapa()

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


