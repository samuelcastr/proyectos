// Elementos del DOM
const registroForm = document.getElementById('registroForm');
const loginForm = document.getElementById('loginForm');
const irLogin = document.getElementById('irLogin');
const irRegistro = document.getElementById('irRegistro');

// Mostrar el formulario de login y ocultar el de registro
irLogin.addEventListener('click', () => {
  registroForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Mostrar el formulario de registro y ocultar el de login
irRegistro.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registroForm.classList.remove('hidden');
});

// Obtener referencia al botón de registro
const btnRegistro = document.getElementById('btnRegistro');

btnRegistro.addEventListener('click', () => {
  const nombre = document.getElementById('registroNombre').value.trim();
  const usuario = document.getElementById('registroUsuario').value.trim();
  const clave = document.getElementById('registroClave').value;
  const rol = document.getElementById('registroRol').value;
  const mensaje = document.getElementById('mensaje');

  if (!nombre || !usuario || !clave || !rol) {
    mensaje.textContent = 'Por favor, completa todos los campos.';
    mensaje.style.color = 'red';
    return;
  }

  if (localStorage.getItem(usuario)) {
    mensaje.textContent = 'Este usuario ya está registrado.';
    mensaje.style.color = 'red';
    return;
  }

  const datos = {
    nombre: nombre,
    clave: clave,
    rol: rol
  };

  localStorage.setItem(usuario, JSON.stringify(datos));
  mensaje.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
  mensaje.style.color = 'green';

  // Limpiar campos
  document.getElementById('registroNombre').value = '';
  document.getElementById('registroUsuario').value = '';
  document.getElementById('registroClave').value = '';
  document.getElementById('registroRol').value = '';

  // Cambiar a formulario de login
  registroForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Obtener referencia al botón de login
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', () => {
  const usuario = document.getElementById('loginUsuario').value.trim();
  const clave = document.getElementById('loginClave').value;
  const mensaje = document.getElementById('mensaje');

  // Validación básica
  if (!usuario || !clave) {
    mensaje.textContent = 'Por favor, completa todos los campos.';
    mensaje.style.color = 'red';
    return;
  }

  const datosGuardados = localStorage.getItem(usuario);

  if (!datosGuardados) {
    mensaje.textContent = 'El usuario no está registrado.';
    mensaje.style.color = 'red';
    return;
  }

  const datos = JSON.parse(datosGuardados);

  if (datos.clave === clave) {
    mensaje.textContent = `¡Bienvenido, ${datos.nombre}!`;
    mensaje.style.color = 'green';

    
    // Redirigir según el rol
    switch (datos.rol) {
      case 'administrador':
        window.location.href = '/administrador/administrador.html';
        break;
      case 'agricultor':
        window.location.href = 'agricultor.html';
        break;
      case 'comprador':
        window.location.href = 'comprador.html';
        break;
      default:
        mensaje.textContent = 'Rol desconocido.';
        mensaje.style.color = 'red';
    }
   

    // O limpiar campos, ocultar formularios, etc.
    document.getElementById('loginUsuario').value = '';
    document.getElementById('loginClave').value = '';
  } else {
    mensaje.textContent = 'Contraseña incorrecta.';
    mensaje.style.color = 'red';
  }
});