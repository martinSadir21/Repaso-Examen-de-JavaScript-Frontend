// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
}

// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
    // Obtener los datos del clima almacenados en localStorage
    // Buscar la ciudad en los datos obtenidos
    if (ciudadEncontrada) {
        // Mostrar la información del clima en la tabla
        // Agregar la ciudad al historial en localStorage
    } else {
        console.error(`No se encontró información para la ciudad ${ciudad}`);
        // Manejar el caso donde no se encuentra la ciudad en los datos
    }
}

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudad) {
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    // Evitar duplicados en el historial
    // Actualizar la lista en el DOM
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    // Limpiar el historial actual
    // Obtener el array de historial desde el LocalStorage
    // Recorrer el historial y cargar en el dom
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    // Vaciar historial en localStorage
    // Vaciar la lista de historial en el DOM
}

// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // obtener parámetros GET de la URL (ciudad seleccionada)
    // obtener información de clima de una ciudad desde localStorage
    // actualizar el historial en el DOM desde localStorage
});

// 9. Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
