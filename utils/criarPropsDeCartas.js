export default function criarPropsCarta(cartaProps) {
    return {
      Nome: cartaProps.Nome,
      Ataque: parseInt(cartaProps.Ataque),
      Vida: parseInt(cartaProps.Vida),
      Locomocao: parseInt(cartaProps.Locomocao),
      Perfuracao: cartaProps.Perfuracao,
      Magia: cartaProps.Magia,
      voar: cartaProps.voar,
      andar: cartaProps.andar,
      nadar: cartaProps.nadar,
      img: cartaProps.img
    };
  }