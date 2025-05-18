let filas = [];
let encabezados = [];

async function cargarDatos() {
  const respuesta = await fetch('https://api.sheetbest.com/sheets/1a92cbd9-89c3-45bf-8412-362385f0147b');
  const datos = await respuesta.json();

  if (datos.length === 0) return;

  encabezados = Object.keys(datos[0]);
  filas = datos.map(obj => encabezados.map(encabezado => obj[encabezado]));

  const thead = document.querySelector('thead');
  thead.innerHTML = '<tr>' + encabezados.map(h => `<th>${h}</th>`).join('') + '</tr>';

  mostrarFilas(filas);
}

function mostrarFilas(filasFiltradas) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  filasFiltradas.forEach(fila => {
    const filaHTML = '<tr>' + fila.map(celda => `<td>${celda || ''}</td>`).join('') + '</tr>';
    tbody.innerHTML += filaHTML;
  });
}

function filtrarTabla() {
  const entrada = document.getElementById('entrada').value.toLowerCase();
  const filtradas = filas.filter(fila =>
    fila.join(' ').toLowerCase().includes(entrada)
  );
  mostrarFilas(filtradas);
}

document.getElementById('entrada').addEventListener('input', filtrarTabla);

cargarDatos();
