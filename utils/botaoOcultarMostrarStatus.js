const recolherStatatusCartas = document.querySelector('.recolherStatusCartas')
const exibirCarta = document.querySelector('.exibirCarta')
let estadoBotao = false


export default function initRecolherStatusCartas() {
    recolherStatatusCartas.addEventListener('click', () => {
      if (!estadoBotao) {
        exibirCarta.style.opacity = 0;
        setTimeout(() => {
          exibirCarta.style.visibility = 'hidden';
        }, 500);
        recolherStatatusCartas.innerHTML = 'Mostrar Status';
        estadoBotao = true;
      } else {
        exibirCarta.style.visibility = 'visible';
        exibirCarta.style.opacity = 1;
        recolherStatatusCartas.innerHTML = 'Ocultar Status';
        estadoBotao = false;
      }
    });
  }