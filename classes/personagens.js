export class Personagem {
    constructor(nome, locomocao, classe, imgPath) {
      this.nome = String;
      this.locomocao = locomocao;
      this.classe = classe;
      this.img = new Image()
      this.img.src = imgPath
    }
}
