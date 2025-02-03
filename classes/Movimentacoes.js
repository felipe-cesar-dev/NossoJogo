export default class Movimentacoes {
    constructor() {
      this.movimentacoes = [];
    }
  
    adicionarMovimentacao(movimentacao) {
      this.movimentacoes.push(movimentacao);
    }
  
    encontrarMovimentacao(callback) {
      return this.movimentacoes.find(callback);
    }
  
    realizarAcaoEmTodasMovimentacoes(callback) {
      this.movimentacoes.forEach(callback);
    }
  
    getMovimentacoes() {
      return this.movimentacoes;
    }
  }