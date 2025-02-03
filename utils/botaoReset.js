import interfaceGerarCartasNaTela from "..";

const reset = botaoReset.addEventListener('click', () => {
    const celulasPrimeiraLinha = Array.from(celulas).slice(10, 20);
    if (celulasPrimeiraLinha.every((celula) => celula.children.length === 0)) {
      movimentacoes.forEach((m) => m.movimentacao = m.div.props.Locomocao);
      console.log('Movimentações resetadas');
      soma += 0.5;
      turnos.innerHTML = `Turno ${soma}`;
      interfaceGerarCartasNaTela();
    } else {
      alert('Ainda há cartas na primeira linha!');
    }
  });