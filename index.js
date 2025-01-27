///Arrastar elementos

const objeto = document.getElementById('objeto');
const bloco = document.querySelectorAll('.bloco');
const porta = document.querySelectorAll('.porta');
const combate = document.querySelectorAll('.blocoDeCombate');
const nado = document.querySelectorAll('.areaDeNado');

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

bloco.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});




objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

porta.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});


objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

combate.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});

nado.forEach((div) => {
  div.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  div.addEventListener('drop', (event) => {
    event.preventDefault();
    const objetoId = event.dataTransfer.getData('text');
    const objeto = document.getElementById(objetoId);
    div.appendChild(objeto);
  });
});
 

/// Arrastar navegação

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var id = event.dataTransfer.getData("text");
  var elementoArrastado = document.getElementById(id);
  event.target.appendChild(elementoArrastado);
}


///girar mapa
let mapaGirado = false;

document.querySelector('.girarBotao').addEventListener('click', function() {
  if (!mapaGirado) {
    document.querySelector('.mapa').style.transform = 'rotate(180deg)';
    mapaGirado = true;
  } else {
    document.querySelector('.mapa').style.transform = 'rotate(0deg)';
    mapaGirado = false;
  }
});