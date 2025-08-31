# ALQUIPC — Sistema de Facturación de Portátiles

ALQUIPC es un aplicativo web para la gestión de alquiler de portátiles por días, con cálculo automático de facturas, descuentos por días adicionales y ajustes según la opción de alquiler.

---

## Características

  - Registro y login de usuarios usando **LocalStorage**.
- Cálculo de facturación automático según:
  - Número de equipos
  - Días iniciales y adicionales (descuento automático)
  - Opción de alquiler (dentro/afuera de la ciudad, dentro del establecimiento)
- Validaciones de formulario:
  - Nombre solo letras
  - Teléfono mínimo 10 números
  - Campos obligatorios


---

## Instalación

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en un navegador moderno (Chrome, Edge, Firefox).

---

## Uso

1. Accede a `index.html` para registrarte o iniciar sesión. (Pagina principal)
2. Al iniciar sesión, se mostrará tu correo en la sección de facturación.
3. Completa el formulario de alquiler:
   - Nombre completo
   - Teléfono
   - Número de equipos (mínimo 2)
   - Días iniciales y adicionales
   - Opción de alquiler
4. Haz clic en **Calcular factura** para ver el resumen y el total.
5. Puedes **copiar** el resumen al portapapeles.
6. Clic en **Logout** para cerrar sesión.

---

## Detalles técnicos

- Frontend: HTML5, CSS3, JS Vanilla, Bootstrap 5.
- Persistencia: **LocalStorage** para usuarios y sesión.
- Validaciones: JS + regex para correo, nombre y teléfono.

---

## Notas

- Esta versión está pensada para **uso local**; no requiere backend.
- Ideal para demostraciones y pruebas.

---

## Autor

Proyecto realizado por Juan Sanchez.