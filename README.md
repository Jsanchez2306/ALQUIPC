# ALQUIPC — Sistema de Facturación de Portátiles

ALQUIPC es un aplicativo web para la gestión de alquiler de portátiles por días, con cálculo automático de facturas, ajustes según la opción de alquiler y control de días adicionales.

---

## Características

- Registro y login de usuarios usando **LocalStorage**.
- Cada cliente recibe automáticamente un **ID único** al registrarse.
- La ID se usa para identificar al cliente al generar la factura.
- Validación de ID en el formulario de alquiler: obligatorio y debe existir en el sistema.
- Cálculo de facturación automático según:
  - Número de equipos (mínimo 2, máximo 20)
  - Días iniciales (mínimo 1)
  - Días adicionales (0 a 15) — cada día adicional aumenta la factura un 2% por equipo, hasta un máximo de 30%.
  - Opción de alquiler:
    - Dentro de la ciudad (0% ajuste)
    - Fuera de la ciudad (+5%)
    - Dentro del establecimiento (−5%)
- Validaciones de formulario:
  - Nombre: solo letras y espacios, entre 3 y 30 caracteres
  - Teléfono: solo números, exactamente 10 dígitos
  - Correo: formato válido
  - Todos los campos obligatorios, excepto días adicionales
- Resumen detallado de la factura con:
  - Datos del cliente (nombre, ID, correo, teléfono)
  - Número de equipos
  - Días iniciales y adicionales
  - Descuentos y ajustes
  - Valor total

---

## Instalación

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en un navegador moderno (Chrome, Edge, Firefox).

---

## Uso

1. Accede a `index.html` para registrarte o iniciar sesión.
2. Al iniciar sesión, se mostrará tu nombre y correo en la sección de facturación.
3. Completa el formulario de alquiler:
   - Ingresa tu **ID de cliente**
   - Número de equipos
   - Días iniciales y adicionales
   - Opción de alquiler
4. Haz clic en **Calcular factura** para ver el resumen y el total.
5. Puedes **copiar** el resumen al portapapeles.
6. Haz clic en **Logout** para cerrar sesión.

---

## Detalles técnicos

- Frontend: HTML5, CSS3, JS Vanilla, Bootstrap 5.
- Persistencia: **LocalStorage** para usuarios y sesión.
- Validaciones: JS + regex para correo, nombre y teléfono.
- Lógica de días adicionales: aumenta la factura un 2% por día adicional, hasta un máximo de 30%.
- Ajustes por opción de alquiler aplicados correctamente.

---

## Notas

- Esta versión está pensada para **uso local**; no requiere backend.
- Ideal para demostraciones y pruebas.
- Se implementaron límites para evitar números absurdos o negativos en los días iniciales y adicionales.

---

## Autor

Proyecto realizado por **Juan Sanchez**.
