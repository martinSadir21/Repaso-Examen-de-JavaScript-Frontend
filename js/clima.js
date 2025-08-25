// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)
const tablaBody = document.querySelector('#weatherTable tbody');
const listaHistorial = document.getElementById('historyList');
const btnVaciarHistorial = document.getElementById('clearHistoryBtn');

// ---------- Utilidades ----------
function leerCiudadesDeLocalStorage() {
  try {
    const raw = localStorage.getItem('datosClima');
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombreParametro);
}

// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
  // Obtener los datos del clima almacenados en localStorage
  const ciudades = leerCiudadesDeLocalStorage();

  // Buscar la ciudad en los datos obtenidos
  const ciudadEncontrada = ciudades.find(c => c.nombre === ciudad);

  if (ciudadEncontrada) {
    // Mostrar la información del clima en la tabla
    mostrarClimaEnTabla(ciudadEncontrada);

    // Agregar la ciudad al historial en localStorage
    agregarCiudadAHistorial(ciudadEncontrada.nombre);
  } else {
    console.error(`No se encontró información para la ciudad ${ciudad}`);
    // Manejar el caso donde no se encuentra la ciudad en los datos
    tablaBody.innerHTML = `<tr><td colspan="3">No se encontró información para <strong>${ciudad ?? '(sin ciudad)'}</strong>.</td></tr>`;
  }
}

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudadObj) {
  // ciudadObj debe tener: nombre, temperatura, condicion
  tablaBody.innerHTML = `
    <tr>
      <td>${ciudadObj.nombre}</td>
      <td>${ciudadObj.temperatura}</td>
      <td>${ciudadObj.condicion}</td>
    </tr>
  `;
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
  // Evitar duplicados en el historial
  const raw = localStorage.getItem('historial');
  let historial = [];
  try {
    historial = JSON.parse(raw) || [];
  } catch {
    historial = [];
  }

  if (!historial.includes(ciudad)) {
    historial.push(ciudad);
    localStorage.setItem('historial', JSON.stringify(historial));
  }

  // Actualizar la lista en el DOM
  actualizarHistorialEnDOM();
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
  // Limpiar el historial actual
  listaHistorial.innerHTML = '';

  // Obtener el array de historial desde el LocalStorage
  let historial = [];
  try {
    historial = JSON.parse(localStorage.getItem('historial')) || [];
  } catch {
    historial = [];
  }

  // Recorrer el historial y cargar en el DOM
  if (historial.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Sin consultas previas.';
    listaHistorial.appendChild(li);
    return;
  }

  historial.forEach(ciudad => {
    const li = document.createElement('li');
    li.textContent = ciudad;
    listaHistorial.appendChild(li);
  });
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
  // Vaciar historial en localStorage
  localStorage.removeItem('historial');

  // Vaciar la lista de historial en el DOM
  listaHistorial.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = 'Historial vacío.';
  listaHistorial.appendChild(li);
}

// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  // obtener parámetros GET de la URL (ciudad seleccionada)
  let ciudad = obtenerParametroGET('city');

  // fallback: si no vino por GET, usar la última seleccionada guardada
  if (!ciudad) {
    ciudad = localStorage.getItem('ciudadSeleccionada');
  }

  // obtener información de clima de una ciudad desde localStorage
  if (ciudad) {
    obtenerInfoClima(ciudad);
  } else {
    tablaBody.innerHTML = `<tr><td colspan="3">No hay ciudad seleccionada. Volvé a la página anterior y elegí una ciudad.</td></tr>`;
  }

  // actualizar el historial en el DOM desde localStorage
  actualizarHistorialEnDOM();
});

// 9. Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
btnVaciarHistorial.addEventListener('click', vaciarHistorial);
