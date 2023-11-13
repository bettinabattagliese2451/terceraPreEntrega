// main.js
document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        { nombre: 'Velas de Miel medianas (x2)', precio: 180 },
        { nombre: 'Vela de Soja 7 Chakras', precio: 630 },
        { nombre: 'Vela Circo XXL con Plato de resina', precio: 1100 },
        { nombre: 'Dos Velas de Soja, con tapa de bambú', precio: 790 }
    ];
    const carrito = [];

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const carritoContainer = document.getElementById('carrito');
        carritoContainer.innerHTML = ''; // Limpiar el carrito antes de actualizarlo

        carrito.forEach(function(item, index) {
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
    }

    // Seleccionar los botones "Comprar" por su ID y agregar eventos de clic a cada uno
    const botonesComprar = document.querySelectorAll('.cont-button input[type="button"]');
    botonesComprar.forEach(function(boton, index) {
        boton.addEventListener('click', function() {
            const producto = productos[index];
            agregarAlCarrito(producto);
        });
    });

    // Seleccionar los botones "Quitar" en el carrito y agregar eventos de clic a cada uno
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('quitar-item')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            quitarDelCarrito(index);
        }
    });

    // Inicializar la visualización del carrito
    actualizarCarrito();
});
