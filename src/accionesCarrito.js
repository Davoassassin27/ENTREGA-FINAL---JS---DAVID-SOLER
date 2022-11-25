import { actualizarTotalesCarrito } from "./actualizarCarrito.js";

import { productos } from "./stock.js";
import { obtenerCarritoStorage } from "./storage.js";

let carrito = [];

const validarProductoRepetido = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
  }

  const productoRepetido = carrito.find(
    (producto) => producto.id === productoId
  );

  if (productoRepetido) {
    productoRepetido.cantidad++;
    const cantidadProducto = document.getElementById(
      `cantidad${productoRepetido.id}`
    );
    cantidadProducto.innerText = `cantidad: ${productoRepetido.cantidad}`;
    actualizarTotalesCarrito(carrito);
  } else {
    agregarAlCarrito(productoId);
  }
};

const agregarAlCarrito = (productoId) => {
  const contenedor = document.getElementById("carrito-contenedor");
  const producto = productos.find((producto) => producto.id === productoId);
  carrito.push(producto);

  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                    `;
  contenedor.appendChild(div);
  actualizarTotalesCarrito(carrito);
};

// pintarCarrito recibe por parámetro un array de objetos
const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  contenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                        <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                        `;
    contenedor.appendChild(div);
  });
};

const eliminarProductoCarrito = (productoId) => {
  const carritoStorage = obtenerCarritoStorage();
  const carritoActualizado = carritoStorage.filter(
    (producto) => producto.id != productoId
  );

  actualizarTotalesCarrito(carritoActualizado);
  pintarCarrito(carritoActualizado);
};

const botonVaciar = document.getElementById("vaciarCarrito");

botonVaciar.addEventListener("click", () => {
  const carrito = obtenerCarritoStorage();
  const alertUno = () => {
    Swal.fire({
      title: "¿quieres eliminar todos los productos?",
      icon: "warning",
      confirmButton: "si",
      cancelButton: "no",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡eliminados!", "su carrito ya está vacío", "success");

        vaciar(carrito);
      }
    });
  };
  const alertDos = () => {
    Swal.fire({
      title: "¡Todo Listo!",
      text: "Tu carrito de compras esta vacio",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
  };

  carrito.length >= 1 ? alertUno() : alertDos();
});

const vaciar = (carrito) => {
  while (carrito.length > 0) {
    carrito.pop();
  }
  actualizarTotalesCarrito(carrito);
  pintarCarrito(carrito);
};

export {
  agregarAlCarrito,
  validarProductoRepetido,
  pintarCarrito,
  eliminarProductoCarrito,
};
