export default function estilizarCartaStatus(carta, div, movimentacao, textoLocomocao){
    const textoCarta = document.querySelector('.textoCarta') 
    const exibirCarta = document.querySelector('.exibirCarta')
    const imagem = document.querySelector('img')
    carta.addEventListener('click', () => {
      div = carta;
      div.style.opacity = '0.7'
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