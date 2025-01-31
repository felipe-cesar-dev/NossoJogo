export default function girarMapa() {
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
  }
  