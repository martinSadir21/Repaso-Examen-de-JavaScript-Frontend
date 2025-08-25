// Referencias
const cityForm = document.getElementById("cityForm");
const selectCity = document.getElementById("selectCity");

// Cargar ciudades desde datos.json
function cargarOpcionesCiudades() {
  fetch("public/datos.json")
    .then(res => {
      if (!res.ok) throw new Error("Error al leer datos.json");
      return res.json();
    })
    .then(data => {
      const ciudades = data.ciudades || [];
      // Guardar en localStorage
      localStorage.setItem("datosClima", JSON.stringify(ciudades));

      // Poblar el select
      selectCity.innerHTML = '<option value="" disabled selected>Seleccioná una ciudad</option>';
      ciudades.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.nombre;
        opt.textContent = c.nombre;
        selectCity.appendChild(opt);
      });
    })
    .catch(err => {
      console.error("Error cargando ciudades:", err);
      alert("No se pudieron cargar las ciudades. Asegurate de abrir con Live Server.");
    });
}

// Enviar formulario
cityForm.addEventListener("submit", e => {
  e.preventDefault();
  const city = selectCity.value;
  if (!city) {
    alert("Seleccioná una ciudad");
    return;
  }
  localStorage.setItem("ciudadSeleccionada", city);

  // Actualizar historial
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  if (!historial.includes(city)) {
    historial.push(city);
    localStorage.setItem("historial", JSON.stringify(historial));
  }

  window.location.href = "clima.html";
});

// Cargar ciudades al inicio
document.addEventListener("DOMContentLoaded", cargarOpcionesCiudades);
