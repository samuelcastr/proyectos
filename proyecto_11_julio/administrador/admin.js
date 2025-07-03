const tablaBody = document.querySelector('#tablaUsuarios tbody');

for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i);
  const valor = localStorage.getItem(clave);

  try {
    const datos = JSON.parse(valor);

    if (datos.nombre && datos.clave && datos.rol) {
      const fila = document.createElement('tr');

      // Crear celda HTML con botones
      const acciones = `
        <button class="editar" data-user="${clave}">Editar</button>
        <button class="eliminar" data-user="${clave}">Eliminar</button>
      `;

      fila.innerHTML = `
        <td>${datos.nombre}</td>
        <td>${clave}</td>
        <td>${datos.rol}</td>
        <td>${acciones}</td>
      `;

      tablaBody.appendChild(fila);
    }

  } catch (e) {
    // Ignorar valores no válidos
  }
}

// Escuchar clics en los botones
tablaBody.addEventListener('click', (e) => {
    
  if (e.target.classList.contains('eliminar')) {
    const usuario = e.target.dataset.user;
    if (confirm(`¿Eliminar al usuario "${usuario}"?`)) {
      localStorage.removeItem(usuario);
      location.reload(); // recarga la tabla
    }
  }

  if (e.target.classList.contains('editar')) {
    const usuario = e.target.dataset.user;
    const datos = JSON.parse(localStorage.getItem(usuario));

    const nuevoNombre = prompt('Nuevo nombre:', datos.nombre);
    const nuevoRol = prompt('Nuevo rol (administrador, agricultor, comprador):', datos.rol);

    if (nuevoNombre && nuevoRol) {
      datos.nombre = nuevoNombre;
      datos.rol = nuevoRol;
      localStorage.setItem(usuario, JSON.stringify(datos));
      alert('Usuario actualizado.');
      location.reload();
    }
  }
});