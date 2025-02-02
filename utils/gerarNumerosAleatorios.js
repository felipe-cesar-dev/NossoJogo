let numerosRepetidos = [];

export default function gerarNumeroAleatorio() {
    let numeroAleatorio;
    do {
      numeroAleatorio = Math.floor(Math.random() * 27) + 1;
    } while (numerosRepetidos.includes(numeroAleatorio));
    numerosRepetidos.push(numeroAleatorio);
    return numeroAleatorio;
  }