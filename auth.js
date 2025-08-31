const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const successModal = new bootstrap.Modal(document.getElementById('successModal'));
const modalOkBtn = document.getElementById("modalOkBtn");

function generarID() {
    return 'ID' + Math.floor(Math.random() * 1000000);
}

function showSuccessModal(message, tipo = "login") {
    const modalBody = document.querySelector("#successModal .modal-body");
    modalBody.innerHTML = message;
    const header = document.querySelector("#successModal .modal-header");
    header.classList.remove("bg-danger");
    header.classList.add("bg-success");
    successModal.show();

    modalOkBtn.onclick = () => {
        successModal.hide();
        if (tipo === "login") {
            window.location.href = "formularioFactura.html";
        } else if (tipo === "register") {
            const loginTab = new bootstrap.Tab(document.querySelector("#login-tab"));
            loginTab.show();
        }
    }
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function limpiarErrores(campos) {
    campos.forEach(el => el.classList.remove("is-invalid"));
}

function validarCampos(campos) {
    let valido = true;
    campos.forEach(({ el, tipo, min, max, msg }) => {
        const valor = el.value.trim();
        el.classList.remove("is-invalid");

        if (!valor) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = msg;
            valido = false;
        }
        else if (tipo === "email") {
            if (!validarEmail(valor)) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = "Correo inválido.";
                valido = false;
            } else if (valor.length < min) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = `Correo demasiado corto (mínimo ${min} caracteres).`;
                valido = false;
            } else if (valor.length > max) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = `Correo demasiado largo (máx. ${max} caracteres).`;
                valido = false;
            }
        }
        else if (tipo === "password" && valor.length < min) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = `Contraseña debe tener al menos ${min} caracteres.`;
            valido = false;
        }
        else if (tipo === "nombre") {
            if (valor.length < min) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = `Nombre demasiado corto (mínimo ${min} caracteres).`;
                valido = false;
            } else if (valor.length > max) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = `Nombre demasiado largo (máx. ${max} caracteres).`;
                valido = false;
            } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
                el.classList.add("is-invalid");
                el.nextElementSibling.textContent = "Nombre inválido: solo letras y espacios.";
                valido = false;
            }
        }
        else if (tipo === "telefono" && !/^\d+$/.test(valor)) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = "Teléfono inválido: solo números.";
            valido = false;
        }
        else if (tipo === "telefono" && (valor.length !== max)) {
            el.classList.add("is-invalid");
            el.nextElementSibling.textContent = `Teléfono inválido: debe tener ${max} dígitos.`;
            valido = false;
        }
    });
    return valido;
}

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const regNombre = document.getElementById("regNombre");
    const regTelefono = document.getElementById("regTelefono");
    const regCorreo = document.getElementById("regCorreo");
    const regPass = document.getElementById("regPass");

    limpiarErrores([regNombre, regTelefono, regCorreo, regPass]);

    const campos = [
        { el: regNombre, tipo: "nombre", min: 3, max: 30, msg: "Ingresa tu nombre." },
        { el: regTelefono, tipo: "telefono", min: 10, max: 10, msg: "Ingresa tu teléfono." },
        { el: regCorreo, tipo: "email", min: 6, max: 30, msg: "Ingresa tu correo." },
        { el: regPass, tipo: "password", min: 6, msg: "Ingresa tu contraseña." }
    ];

    if (!validarCampos(campos)) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

    if (Object.values(usuarios).some(u => u.correo === regCorreo.value.trim())) {
        regCorreo.classList.add("is-invalid");
        regCorreo.nextElementSibling.textContent = "Este correo ya está registrado.";
        return;
    }

    const id = generarID();
    usuarios[id] = {
        id,
        nombre: regNombre.value.trim(),
        telefono: regTelefono.value.trim(),
        correo: regCorreo.value.trim(),
        pass: regPass.value.trim()
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActual", JSON.stringify(usuarios[id]));

    showSuccessModal(`
        <p>¡Registro exitoso!</p>
        <p><strong>Tu ID:</strong> ${id}</p>
        <p>Ahora puedes iniciar sesión usando tu correo y contraseña.</p>
    `, "register");
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginCorreo = document.getElementById("loginCorreo");
    const loginPass = document.getElementById("loginPass");

    limpiarErrores([loginCorreo, loginPass]);

    const campos = [
        { el: loginCorreo, tipo: "email", min: 6, max: 30, msg: "Ingresa tu correo." },
        { el: loginPass, tipo: "password", min: 6, msg: "Ingresa tu contraseña." }
    ];

    if (!validarCampos(campos)) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const usuario = Object.values(usuarios).find(u => u.correo === loginCorreo.value.trim());

    if (!usuario) {
        loginCorreo.classList.add("is-invalid");
        loginCorreo.nextElementSibling.textContent = "Correo no registrado.";
        return;
    }

    if (usuario.pass !== loginPass.value.trim()) {
        loginPass.classList.add("is-invalid");
        loginPass.nextElementSibling.textContent = "Contraseña incorrecta.";
        return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    showSuccessModal("¡Login exitoso! Serás redirigido a la página de facturación.", "login");
});
