const botonPrueba = document.querySelector<HTMLButtonElement>("#boton-prueba");
const mensajePrueba = document.querySelector<HTMLParagraphElement>("#mensaje-prueba");
if (botonPrueba !== null && mensajePrueba !== null) {
    botonPrueba.addEventListener("click", () => {
        mensajePrueba.textContent = "¡La conexión funciona!";
    });
}
interface Producto {
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

let productos: Producto[] = [];

const formulario = document.getElementById("formProducto") as HTMLFormElement;

const nombre = document.getElementById("nombre") as HTMLInputElement;
const categoria = document.getElementById("categoria") as HTMLSelectElement;
const precio = document.getElementById("precio") as HTMLInputElement;
const stock = document.getElementById("stock") as HTMLInputElement;

const buscarNombre = document.getElementById("buscarNombre") as HTMLInputElement;
const buscarCategoria = document.getElementById("buscarCategoria") as HTMLSelectElement;
const buscarStock = document.getElementById("buscarStock") as HTMLSelectElement;
const precioMaximo = document.getElementById("precioMaximo") as HTMLInputElement;

const listaProductos = document.getElementById("listaProductos") as HTMLDivElement;

const cantidadProductos = document.getElementById("cantidadProductos") as HTMLParagraphElement;
const stockTotal = document.getElementById("stockTotal") as HTMLParagraphElement;
const valorTotal = document.getElementById("valorTotal") as HTMLParagraphElement;
const cantidadMostrada = document.getElementById("cantidadMostrada") as HTMLSpanElement;


formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nuevoProducto: Producto = {
        nombre: nombre.value,
        categoria: categoria.value,
        precio: Number(precio.value),
        stock: Number(stock.value)
    };

    productos.push(nuevoProducto);

    formulario.reset();

    mostrarProductos();
    actualizarResumen();
});


function mostrarProductos(): void {

    listaProductos.innerHTML = "";

    const nombreBuscado = buscarNombre.value.toLowerCase();
    const categoriaBuscada = buscarCategoria.value;
    const stockBuscado = buscarStock.value;
    const precioMax = Number(precioMaximo.value);

    const productosFiltrados = productos.filter(function(producto) {

        const coincideNombre =
            producto.nombre.toLowerCase().includes(nombreBuscado);

        const coincideCategoria =
            categoriaBuscada === "" ||
            producto.categoria === categoriaBuscada;

        const coincideStock =
            stockBuscado === "" ||
            (stockBuscado === "disponible" && producto.stock > 0) ||
            (stockBuscado === "agotado" && producto.stock === 0);

        const coincidePrecio =
            precioMaximo.value === "" ||
            producto.precio <= precioMax;

        return coincideNombre &&
            coincideCategoria &&
            coincideStock &&
            coincidePrecio;
    });


    cantidadMostrada.textContent =
        productosFiltrados.length + " productos";


    if (productosFiltrados.length === 0) {

        listaProductos.innerHTML =
            `<p class="sin-productos">♡ No hay productos para mostrar ♡</p>`;

        return;
    }


    productosFiltrados.forEach(function(producto) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>

            <p>
                <strong>Precio:</strong>
                $${producto.precio}
            </p>

            <p>
                <strong>Stock:</strong>
                ${producto.stock}
            </p>
        `;

        listaProductos.appendChild(tarjeta);
    });
}


function actualizarResumen(): void {

    cantidadProductos.textContent =
        productos.length.toString();

    let totalStock = 0;
    let totalValor = 0;

    productos.forEach(function(producto) {

        totalStock += producto.stock;

        totalValor += producto.precio * producto.stock;
    });

    stockTotal.textContent =
        totalStock.toString();

    valorTotal.textContent =
        "$" + totalValor.toString();
}


buscarNombre.addEventListener("input", mostrarProductos);

buscarCategoria.addEventListener("change", mostrarProductos);

buscarStock.addEventListener("change", mostrarProductos);

precioMaximo.addEventListener("input", mostrarProductos);


mostrarProductos();

actualizarResumen();

