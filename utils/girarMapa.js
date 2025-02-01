export default function girarMapa() {
    let mapaGirado = false;
    document.querySelector('.girarBotao').addEventListener('click', function() {
      if (!mapaGirado) {
        document.querySelector('table').style.transform = 'rotate(180deg)';
        document.querySelector('table').style.transition = 'transform 0.2s ease-in-out';
        mapaGirado = true;
      } else {
        document.querySelector('table').style.transform = 'rotate(0deg)';
        document.querySelector('table').style.transition = 'transform 0.2s ease-in-out';
        mapaGirado = false;
      }
    });
  }
  