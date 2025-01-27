const verdeDivs = document.querySelectorAll('.verde');

verdeDivs.forEach(div => {
  div.onclick = () => {
    alert('OTÁRIO!!!');
  };
});

const amareloDivs = document.querySelectorAll('.amarelo');

  amareloDivs.forEach(div => {
  div.onclick = () => {
    alert('OTÁRIO!!!');
  };
});

const azulDivs = document.querySelectorAll('.azul');

azulDivs.forEach(div => {
  div.onclick = () => {
    alert('OTÁRIO!!!');
  };
});


const objeto = document.getElementById('objeto');
const vdivs = document.querySelectorAll('.verde');

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

vdivs.forEach((div) => {
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


const adivs = document.querySelectorAll('.azul');

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

adivs.forEach((div) => {
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

const amdivs = document.querySelectorAll('.amarelo');

objeto.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', objeto.id);
});

amdivs.forEach((div) => {
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