export default function initBotaoIrAoFim() {
    const botaoIrAoFim = document.getElementById('ir-ao-fim');
    const body = document.querySelector('body');
    let isFim = false;
  
    botaoIrAoFim.addEventListener('click', () => {
      if (isFim) {
        body.scrollTop = 0;
        window.scrollTo(0, 0);
        isFim = false;
        botaoIrAoFim.innerHTML = 'Fim do mapa!';
      } else {
        body.scrollTop = body.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        isFim = true;
        botaoIrAoFim.innerHTML = 'Começo do mapa!';
      }
    });
  }