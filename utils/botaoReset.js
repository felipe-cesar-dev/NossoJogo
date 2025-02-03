import arrayFromCelulas from "./arrayFromCelulas";
import Movimentacoes from "../classes/Movimentacoes";
import iGerarCartasNaTela from "..";

export function handleResetButtonClick( movimentacoes = new Movimentacoes(), soma, turnos, celulas) {
  const celulasPrimeiraLinha = arrayFromCelulas(celulas);
  if (celulasPrimeiraLinha.every((celula) => celula.children.length === 0)) {
    movimentacoes.realizarAcaoEmTodasMovimentacoes((m) => m.movimentacao = m.div.props.Locomocao);
    console.log('Movimentações resetadas');
    soma += 0.5;
    turnos.innerHTML = `Turno ${soma}`;
    iGerarCartasNaTela();
  } else {
    alert('Ainda há cartas na primeira linha!');
  }
}