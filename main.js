document.addEventListener('DOMContentLoaded', function () {
  const productos = [
      { nombre: 'Velas de Miel medianas (x2)', precio: 180 },
      { nombre: 'Vela de Soja 7 Chakras', precio: 630 },
      { nombre: 'Vela Circo XXL con Plato de resina', precio: 1100 },
      { nombre: 'Dos Velas de Soja, con tapa de bambú', precio: 790 }
  ];
  let carrito = [];
  const mp = new MercadoPago('APP_USR-f019de0e-1303-4307-adec-da50e6bdebe5');
  const bricksBuilder = mp.bricks();
  locale: 'es-AR'

  mp.bricks().create("wallet", "wallet_container", {
    initialization: {
        preferenceId: "<PREFERENCE_ID>",
    },
 });

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
      const carritoContainer = document.getElementById('carrito');
      carritoContainer.innerHTML = ''; // Limpiar el carrito antes de actualizarlo

      carrito.forEach(function (item, index) {
          const div = document.createElement('div');
          div.classList.add('carrito-item');
          div.innerHTML = `
              <span>${item.nombre} - $${item.precio}</span>
              <button class="quitar-item" data-index="${index}">Quitar</button>
          `;
          carritoContainer.appendChild(div);
      });

      // Actualizar el total
      const totalCarrito = document.getElementById('total-carrito');
      const total = carrito.reduce((sum, item) => sum + item.precio, 0);
      totalCarrito.textContent = `Total: $${total}`;

      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
      carrito.push(producto);
      actualizarCarrito();
  }

  // Función para quitar un producto del carrito
  function quitarDelCarrito(index) {
      carrito.splice(index, 1);
      actualizarCarrito();
      Swal.fire("¿Está de acuerdo con quitar el artículo del carrito?");
  }

  // Función para iniciar el proceso de pago con Mercado Pago
  function iniciarPago() {
      // Crear una preferencia de pago
      const preference = {
          items: carrito.map(item => ({
              title: item.nombre,
              unit_price: item.precio,
              quantity: 1
          }))
      };

      // Configuración del checkout
      const checkoutConfig = {
          preference: preference,
          autoOpen: true, // Abrir automáticamente el modal cuando esté listo
          render: {
              container: '.carrito-container', // Selector del contenedor donde se mostrará el botón de pago
              label: 'Pagar', // Etiqueta del botón de pago
          }
      };

      // Abrir el checkout de Mercado Pago
      mp.checkout(checkoutConfig);
  }

  // Seleccionar los botones "Comprar" por su ID y agregar eventos de clic a cada uno
  const botonesComprar = document.querySelectorAll('.cont-button input[type="button"]');
  botonesComprar.forEach(function (boton, index) {
      boton.addEventListener('click', function () {
          // Agregar el producto al carrito
          const producto = productos[index];
          agregarAlCarrito(producto);
      });
  });

  // Seleccionar los botones "Quitar" en el carrito y agregar eventos de clic a cada uno
  document.addEventListener('click', function (event) {
      if (event.target.classList.contains('quitar-item')) {
          const index = parseInt(event.target.getAttribute('data-index'));
          quitarDelCarrito(index);
      }
  });

  // Verificar si hay un carrito almacenado en localStorage al cargar la página
  const carritoAlmacenado = localStorage.getItem('carrito');
  if (carritoAlmacenado) {
      carrito = JSON.parse(carritoAlmacenado);
      actualizarCarrito();
  }
});

