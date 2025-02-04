export default function estilizarCartaStatus(carta, textoCarta, exibirCarta, imagem, div, movimentacao, textoLocomocao){
    carta.addEventListener('click', () => {
      if (div && div !== carta) {
        div.style.opacity = '1';
      }
      div = carta;
      console.log('Div selecionada:', carta);
      div.style.opacity = '0.5'
      textoLocomocao.innerHTML = `Locomoção: ${movimentacao.movimentacao}`
      exibirCarta.appendChild(imagem, textoCarta)
      imagem.src = carta.props.img
      imagem.style.display = 'block'
      textoCarta.innerHTML = `Nome: ${carta.props.Nome}\nVida: ${carta.props.Vida}\n Ataque: ${carta.props.Ataque}`
    });
    document.addEventListener('click', (event) => {
      if (div && !div.contains(event.target)) {
        div.style.opacity = '1';
      }
    });
  }