const form = document.getElementById("alquilerForm");
const resultadoDiv = document.getElementById("resultado");
const btnCopiar = document.getElementById("btnCopiar");
const btnLimpiar = document.getElementById("btnLimpiar");
const logoutBtn = document.getElementById("logoutBtn");

// Logout usuario
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
});

// Obtener el correo del usuario
const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
const correoUsuario = usuario ? usuario.correo : "No registrado";

// Mostrar el correo al cargar
resultadoDiv.textContent = `Cliente: ${correoUsuario}\nCompleta el formulario y calcula para ver el resumen aquí.`;

// Formulario Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formValido = true;
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const equipos = document.getElementById("equipos");
  const diasIniciales = document.getElementById("diasIniciales");
  const diasAdicionales = document.getElementById("diasAdicionales");
  const opcion = document.getElementById("opcion");
  [nombre, telefono, equipos, diasIniciales, opcion].forEach(c => c.classList.remove("is-invalid"));

  // Validaciones para el formulario
  if (nombre.value.trim() === "") {
    nombre.classList.add("is-invalid");
    nombre.nextElementSibling.textContent = "Debe ingresar su nombre.";
    formValido = false;
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.value.trim())) {
    nombre.classList.add("is-invalid");
    nombre.nextElementSibling.textContent = "Nombre inválido: solo letras y espacios.";
    formValido = false;
  }
  if (telefono.value.trim() === "") {
    telefono.classList.add("is-invalid");
    telefono.nextElementSibling.textContent = "Debe ingresar su teléfono.";
    formValido = false;
  } else if (!/^\d{10,}$/.test(telefono.value.trim())) {
    telefono.classList.add("is-invalid");
    telefono.nextElementSibling.textContent = "Teléfono inválido: solo números y mínimo 10 dígitos.";
    formValido = false;
  }
  if (equipos.value === "" || Number(equipos.value) < 2) {
    equipos.classList.add("is-invalid");
    equipos.nextElementSibling.textContent = "Debe alquilar mínimo 2 equipos.";
    formValido = false;
  }
  if (diasIniciales.value === "" || Number(diasIniciales.value) < 1) {
    diasIniciales.classList.add("is-invalid");
    diasIniciales.nextElementSibling.textContent = "Debe ingresar al menos 1 día.";
    formValido = false;
  }
  if (opcion.value === "") {
    opcion.classList.add("is-invalid");
    opcion.nextElementSibling.textContent = "Debe seleccionar una opción.";
    formValido = false;
  }
  if (!formValido) return;

  // Cálculo de costos
  const eq = Number(equipos.value);
  const di = Number(diasIniciales.value);
  const da = Number(diasAdicionales.value) || 0;
  const base = 35000;
  let subtotal = eq * di * base;
  let descuento = Math.min(da * 0.02, 0.3);
  let adicional = eq * da * base * (1 - descuento);
  subtotal += adicional;
  let ajuste = 0;
  if (opcion.value === "fuera") ajuste = 0.05;
  if (opcion.value === "establecimiento") ajuste = -0.05;
  const total = subtotal * (1 + ajuste);

  // Resumen de costos
  const resumenHTML = `
<ul class="list-group list-group-flush">
  <li class="list-group-item"><strong>Cliente:</strong> ${correoUsuario}</li>
  <li class="list-group-item"><strong>Nombre:</strong> ${nombre.value.trim()}</li>
  <li class="list-group-item"><strong>Teléfono:</strong> ${telefono.value.trim()}</li>
  <li class="list-group-item"><strong>Número de equipos:</strong> ${eq}</li>
  <li class="list-group-item"><strong>Días iniciales:</strong> ${di}</li>
  <li class="list-group-item"><strong>Días adicionales:</strong> ${da} (Descuento: ${(descuento * 100).toFixed(0)}%)</li>
  <li class="list-group-item"><strong>Opción:</strong> ${opcion.options[opcion.selectedIndex].text}</li>
  <li class="list-group-item"><strong>Valor total:</strong> $${total.toLocaleString()}</li>
</ul>`;
  resultadoDiv.classList.remove("placeholder");
  resultadoDiv.innerHTML = resumenHTML;
  btnCopiar.disabled = false;
});

// Mostrar modal de copiado
btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(resultadoDiv.innerText).then(() => {
    const modal = new bootstrap.Modal(document.getElementById('copiadoModal'));
    modal.show();
  });
});

// Limpiar el formulario
btnLimpiar.addEventListener("click", () => {
  form.reset();
  resultadoDiv.textContent = `Cliente: ${correoUsuario}\nCompleta el formulario y calcula para ver el resumen aquí.`;
  resultadoDiv.classList.add("placeholder");
  btnCopiar.disabled = true;
  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
});
