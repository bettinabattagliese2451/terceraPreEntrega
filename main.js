const tienda = {
    productos: [
        { nombre: 'Velas de Miel medianas (x2)', precio: 180 },
        { nombre: 'Vela de Soja 7 Chakras', precio: 630 },
        { nombre: 'Vela Circo XXL con Plato de resina', precio: 1100 },
        { nombre: 'Dos Velas de Soja, con tapa de bambú', precio: 790 }
    ],
    carrito: [],
    
    mostrarProductos: function () {
        let opciones = "Seleccione un artículo ingresando el número:\n\n";
        for (let i = 0; i < this.productos.length; i++) {
            opciones += `${i + 1}. ${this.productos[i].nombre}\n`;
        }
        return parseInt(prompt(opciones));
    },
    
    obtenerCantidad: function (producto) {
        const cantidad = parseInt(prompt(`Ingrese la cantidad de unidades para el artículo seleccionado "${producto.nombre}".\nPrecio: $${producto.precio}`));

        if (!isNaN(cantidad) && cantidad > 0) {
            return cantidad;
        } else {
            alert('Cantidad no válida. Inténtelo de nuevo.');
            return this.obtenerCantidad(producto);
        }
    },
    
    agregarAlCarrito: function (producto, cantidad) {
        this.carrito.push({ producto, cantidad });
    },
    
    compraDeProductos: function () {
        while (true) {
            const seleccion = this.mostrarProductos();
            if (seleccion >= 1 && seleccion <= this.productos.length) {
                const productoSeleccionado = this.productos[seleccion - 1];
                const cantidad = this.obtenerCantidad(productoSeleccionado);
                this.agregarAlCarrito(productoSeleccionado, cantidad);
                const continuar = confirm("¿Desea agregar más productos al carrito?");
                if (!continuar) {
                    break;
                }
            } else {
                alert('Selección no válida. Inténtelo de nuevo.');
            }
        }
    
        let totalCompra = 0;
        for (const item of this.carrito) {
            totalCompra += item.producto.precio * item.cantidad;
        }
    
        alert(`Total de la compra: $${totalCompra}`);
        alert(`Gracias por su compra!`);
    
    }
};

tienda.compraDeProductos();