const form = document.getElementById("alquilerForm");
const resultadoDiv = document.getElementById("resultado");
const btnCopiar = document.getElementById("btnCopiar");
const btnLimpiar = document.getElementById("btnLimpiar");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
});

const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
resultadoDiv.textContent = usuarioActual
  ? `Cliente: ${usuarioActual.nombre}\nCompleta el formulario y calcula para ver el resumen aquí.`
  : "Cliente: -\nCompleta el formulario y calcula para ver el resumen aquí.";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formValido = true;

  const idInput = document.getElementById("idCliente");
  const equipos = document.getElementById("equipos");
  const diasIniciales = document.getElementById("diasIniciales");
  const diasAdicionales = document.getElementById("diasAdicionales");
  const opcion = document.getElementById("opcion");

  const diFeedback = diasIniciales.nextElementSibling;
  const daFeedback = diasAdicionales.nextElementSibling;

  [idInput, equipos, diasIniciales, diasAdicionales, opcion].forEach(c => c.classList.remove("is-invalid"));

  const idValor = idInput.value.trim();
  if (!idValor) {
    idInput.classList.add("is-invalid");
    idInput.nextElementSibling.textContent = "Debe ingresar su ID.";
    formValido = false;
  } else {
    const users = JSON.parse(localStorage.getItem("usuarios") || "{}");
    if (!users[idValor]) {
      idInput.classList.add("is-invalid");
      idInput.nextElementSibling.textContent = "ID no encontrado.";
      formValido = false;
    }
  }

  if (equipos.value === "" || Number(equipos.value) < 2 || Number(equipos.value) > 20) {
    equipos.classList.add("is-invalid");
    equipos.nextElementSibling.textContent = "Número de equipos inválido (2-20).";
    formValido = false;
  }

  const di = Number(diasIniciales.value);
  if (diasIniciales.value === "" || di < 1 || di > 30) {
    diasIniciales.classList.add("is-invalid");
    diFeedback.textContent = "Días iniciales deben estar entre 1 y 30.";
    formValido = false;
  } else {
    diasIniciales.classList.remove("is-invalid");
    diFeedback.textContent = "Ejemplo: 3 días";
  }

  const da = Number(diasAdicionales.value) || 0;
  if (da < 0 || da > 15) {
    diasAdicionales.classList.add("is-invalid");
    daFeedback.classList.add("text-danger");
    daFeedback.textContent = "Días adicionales deben ser entre 0 y 15.";
    formValido = false;
  } else {
    diasAdicionales.classList.remove("is-invalid");
    daFeedback.classList.remove("text-danger");
    daFeedback.textContent = "Cada día adicional tiene 2% de descuento (máx. 30%).";
  }

  if (opcion.value === "") {
    opcion.classList.add("is-invalid");
    opcion.nextElementSibling.textContent = "Debe seleccionar una opción.";
    formValido = false;
  }

  if (!formValido) return;

  const eq = Number(equipos.value);
  const base = 35000;
  let subtotal = eq * di * base;
  let descuento = Math.min(da * 0.02, 0.3);
  let adicional = eq * da * base * (1 - descuento);
  subtotal += adicional;
  let ajuste = 0;
  if (opcion.value === "fuera") ajuste = 0.05;
  if (opcion.value === "establecimiento") ajuste = -0.05;
  const total = subtotal * (1 + ajuste);
  const users = JSON.parse(localStorage.getItem("usuarios") || "{}");
  const userData = users[idValor];
  const resumenHTML = `
<ul class="list-group list-group-flush">
  <li class="list-group-item"><strong>Cliente:</strong> ${userData.nombre}</li>
  <li class="list-group-item"><strong>ID:</strong> ${userData.id}</li>
  <li class="list-group-item"><strong>Correo:</strong> ${userData.correo}</li>
  <li class="list-group-item"><strong>Teléfono:</strong> ${userData.telefono}</li>
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

btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(resultadoDiv.innerText).then(() => {
    const modal = new bootstrap.Modal(document.getElementById('copiadoModal'));
    modal.show();
  });
});

btnLimpiar.addEventListener("click", () => {
  form.reset();
  resultadoDiv.textContent = usuarioActual
    ? `Cliente: ${usuarioActual.nombre}\nCompleta el formulario y calcula para ver el resumen aquí.`
    : "Cliente: -\nCompleta el formulario y calcula para ver el resumen aquí.";
  resultadoDiv.classList.add("placeholder");
  btnCopiar.disabled = true;
  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  diasIniciales.nextElementSibling.textContent = "Ejemplo: 3 días";
  diasAdicionales.nextElementSibling.textContent = "Cada día adicional tiene 2% de descuento (máx. 30%).";
  diasAdicionales.nextElementSibling.classList.remove("text-danger");
});
