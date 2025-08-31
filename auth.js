const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const successModal = new bootstrap.Modal(document.getElementById('successModal'));
const modalOkBtn = document.getElementById("modalOkBtn");

// Mostrar el modal de éxito
function showSuccessModal(message) {
    const modalBody = document.querySelector("#successModal .modal-body");
    modalBody.textContent = message;
    const header = document.querySelector("#successModal .modal-header");
    header.classList.remove("bg-danger");
    header.classList.add("bg-success");
    successModal.show();
    modalOkBtn.onclick = () => { window.location.href = "index.html"; }
}

// Validacion del email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Limpiar errores del formulario
function limpiarErrores(campos) {
    campos.forEach(el => el.classList.remove("is-invalid"));
}

// Validacion de campos de el formulario
function validarCampos(form, campos) {
    let valido = true;
    campos.forEach(({ id, tipo, min, msg }) => {
        const el = document.getElementById(id);
        const valor = el.value.trim();
        el.classList.remove("is-invalid");

        if (!valor) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = msg;
            valido = false;
        } else if (tipo === "email" && !validarEmail(valor)) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = "Correo inválido.";
            valido = false;
        } else if (tipo === "password" && valor.length < min) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = `Contraseña debe tener al menos ${min} caracteres.`;
            valido = false;
        }
    });
    return valido;
}

// Registrar usuario
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar errores previos
    limpiarErrores([document.getElementById("regCorreo"), document.getElementById("regPass")]);

    const campos = [
        { id: "regCorreo", tipo: "email", msg: "Ingresa tu correo." },
        { id: "regPass", tipo: "password", min: 6, msg: "Ingresa tu contraseña." }
    ];
    if (!validarCampos(registerForm, campos)) return;

    const correo = document.getElementById("regCorreo").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    let users = JSON.parse(localStorage.getItem("usuarios") || "{}");
    if (users[correo]) {
        const el = document.getElementById("regCorreo");
        el.classList.add("is-invalid");
        el.nextElementSibling.textContent = "Este correo ya está registrado.";
        return;
    }

    // Guardar usuario en localStorage
    users[correo] = pass;
    localStorage.setItem("usuarios", JSON.stringify(users));
    localStorage.setItem("usuarioActual", JSON.stringify({ correo }));

    showSuccessModal("¡Registro exitoso! Serás redirigido a la página principal.");
});

// Loguear usuario
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar errores previos
    limpiarErrores([document.getElementById("loginCorreo"), document.getElementById("loginPass")]);

    const campos = [
        { id: "loginCorreo", tipo: "email", msg: "Ingresa tu correo." },
        { id: "loginPass", tipo: "password", min: 6, msg: "Ingresa tu contraseña." }
    ];
    if (!validarCampos(loginForm, campos)) return;

    const correo = document.getElementById("loginCorreo").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("usuarios") || "{}");

    if (!users[correo]) {
        const el = document.getElementById("loginCorreo");
        el.classList.add("is-invalid");
        el.nextElementSibling.textContent = "Este correo no existe.";
        return;
    }

    if (users[correo] !== pass) {
        const el = document.getElementById("loginPass");
        el.classList.add("is-invalid");
        el.nextElementSibling.textContent = "Contraseña incorrecta.";
        return;
    }

    // Login correcto
    localStorage.setItem("usuarioActual", JSON.stringify({ correo }));
    showSuccessModal("¡Login exitoso! Serás redirigido a la página principal.");
});
