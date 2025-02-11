//array para slice da func gerarCartasNaTela e botaoReset
export default function arrayFromCelulas(celulas){
    return Array.from(celulas).slice(12, 21)
}