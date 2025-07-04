/* =====================================================
 * utilidades de carrito
 * =====================================================*/
const CART_KEY = 'carrito_agromercado';

const cargarCarrito = () =>
  JSON.parse(localStorage.getItem(CART_KEY) || '[]');

const guardarCarrito = (carrito) =>
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));

const actualizarBadge = () => {
  document.getElementById('cartCount').textContent = cargarCarrito().length;
};

/* =====================================================
 * añadir al carrito
 * =====================================================*/
document.querySelector('.product-grid').addEventListener('click', (e) => {
  if (!e.target.closest('.btn-buy')) return;          // clic fuera de botón
  const card = e.target.closest('.product-card');
  const { id, titulo, precio, unidad } = card.dataset;

  const carrito = cargarCarrito();

  // Evitar duplicados
  if (carrito.some((p) => p.id === id)) {
    alert('Este producto ya está en tu carrito.');
    return;
  }

  carrito.push({ id, titulo, precio: Number(precio), unidad });
  guardarCarrito(carrito);
  actualizarBadge();
});

/* =====================================================
 * mostrar / ocultar modal
 * =====================================================*/
const modal = document.getElementById('modalCarrito');
const abrirModal = () => { modal.classList.remove('hidden'); renderCarrito(); };
const cerrarModal = () => modal.classList.add('hidden');

document.getElementById('btnCarrito').addEventListener('click', (e) => {
  e.preventDefault();
  abrirModal();
});
document.getElementById('btnCerrarCarrito').addEventListener('click', cerrarModal);

/* =====================================================
 * renderizar tabla dentro del modal
 * =====================================================*/
function renderCarrito() {
  const tbody = document.querySelector('#tablaCarrito tbody');
  tbody.innerHTML = '';
  const carrito = cargarCarrito();
  let total = 0;

  carrito.forEach((prod) => {
    total += prod.precio;
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${prod.titulo}</td>
      <td>$${prod.precio.toLocaleString()}</td>
      <td><button data-id="${prod.id}">&times;</button></td>
    `;
    tbody.appendChild(fila);
  });

  document.getElementById('totalCarrito').textContent =
    '$' + total.toLocaleString();
}

/* =====================================================
 * quitar un producto o vaciar todo
 * =====================================================*/
document
  .querySelector('#tablaCarrito tbody')
  .addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const id = e.target.dataset.id;
    const carrito = cargarCarrito().filter((p) => p.id !== id);
    guardarCarrito(carrito);
    renderCarrito();
    actualizarBadge();
  });

document.getElementById('btnVaciar').addEventListener('click', () => {
  if (confirm('¿Vaciar todo el carrito?')) {
    guardarCarrito([]);
    renderCarrito();
    actualizarBadge();
  }
});

/* =====================================================
 * inicializar contador al cargar
 * =====================================================*/
document.addEventListener('DOMContentLoaded', actualizarBadge);
