const productos = [
    { nombre: "Carterita", precio: 8, imagen: "imgcarterita.jpeg" },
    { nombre: "Concha", precio: 8, imagen: "imgconcha.jpeg" },
    { nombre: "Empanada rellena de queso", precio: 8, imagen: "imgempanada_queso.jpg" },
    { nombre: "Volován común", precio: 15, imagen: "imgvolovan_comun.jpeg" },
    { nombre: "Volován salchicha con chipotle", precio: 15, imagen: "imgvolovan_chipotle.jpeg" },
    { nombre: "Volován chorizo con queso", precio: 15, imagen: "imgvolovan_chipotle.jpeg" },
    { nombre: "Volován de Piña", precio: 15, imagen: "imgvolovan_piña.jpeg" },
    { nombre: "Rosca de sal", precio: 8, imagen: "imgrosca_sal.jpeg" },
    { nombre: "Rosca de royal", precio: 12, imagen: "imgrosca_royal.jpg" },
    { nombre: "Mestiza", precio: 8, imagen: "imgmestiza.jpeg" },
    { nombre: "Amasadas", precio: 30, imagen: "imgamasadas.jpeg" },
    { nombre: "Chirimoya", precio: 8, imagen: "imgchirimoya.jpeg" },
    { nombre: "Besos", precio: 8, imagen: "imgbesos.jpeg" },
    { nombre: "Cuernito relleno de mantequilla", precio: 8, imagen: "imgcuernito.jpeg" },
    { nombre: "Gloria rellena de mantequilla", precio: 8, imagen: "imggloria.jpeg" },
    { nombre: "Keke", precio: 8, imagen: "imgkeke.jpeg" },
    { nombre: "Pan de elote", precio: 15, imagen: "imgpan_elote.jpeg" },
    { nombre: "Bisquete", precio: 8, imagen: "imgbisquete.jpeg" },
    { nombre: "Rol de canela", precio: 15, imagen: "imgrol_canela.jpeg" },
    { nombre: "Tacón", precio: 8, imagen: "imgtacon.jpeg" },
    { nombre: "Puñalada", precio: 8, imagen: "imgpuñalada.jpg" },
    { nombre: "Chancacuda", precio: 12, imagen: "imgchancacuda.jpeg" },
    { nombre: "Torta Blanca", precio: 12, imagen: "imgtorta_blanca.jpg" },
    { nombre: "Canilla", precio: 8, imagen: "imgcanilla.jpg" },
];

const contenedorProductos = document.querySelector(".productos");
const listaCarrito = document.getElementById("lista-carrito");
const botonEnviar = document.getElementById("enviar-pedido");

let carrito = {};

function mostrarProductos() {
    productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img src="img/${producto.imagen}" alt="${producto.nombre}" class="producto-img">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div class="contador">
            <button onclick="modificarCantidad(${index}, -1)">-</button>
            <span id="cantidad-${index}">0</span>
            <button onclick="modificarCantidad(${index}, 1)">+</button>
        </div>
    `;
        contenedorProductos.appendChild(div);
    });
}
document.querySelectorAll(".producto-img").forEach(img => {
    img.onerror = function() {
        console.error("No se pudo cargar la imagen:", this.src);
        this.src = "img/imagen_no_disponible.jpg"; // Imagen por defecto si falla la carga
    };
});

function modificarCantidad(index, cambio) {
    const producto = productos[index];

    if (!carrito[producto.nombre]) {
        carrito[producto.nombre] = { ...producto, cantidad: 0 };
    }

    carrito[producto.nombre].cantidad += cambio;

    if (carrito[producto.nombre].cantidad <= 0) {
        delete carrito[producto.nombre];
    }

    actualizarCarrito();
    document.getElementById(`cantidad-${index}`).innerText = carrito[producto.nombre]?.cantidad || 0;
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    for (let key in carrito) {
        const producto = carrito[key];
        const li = document.createElement("li");
        li.innerText = `${producto.cantidad} x ${producto.nombre} ($${producto.precio} c/u)`;
        listaCarrito.appendChild(li);
    }
}

const modal = document.getElementById("formulario-modal");
const cerrarModal = document.getElementById("cerrar-modal");

botonEnviar.addEventListener("click", () => {
    if (Object.keys(carrito).length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    modal.style.display = "block";
});

cerrarModal.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const puntoEntrega = document.getElementById("puntoEntrega").value;

    if (!nombre || !telefono || !puntoEntrega) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let mensaje = `Hola, quiero hacer un pedido:\n\n`;
    let total = 0;

    for (let key in carrito) {
        const producto = carrito[key];
        mensaje += `- ${producto.cantidad} x ${producto.nombre} ($${producto.precio} c/u)\n`;
        total += producto.precio * producto.cantidad;
    }

    mensaje += `\nTotal: $${total}\n\n`;
    mensaje += `Datos del cliente:\nNombre: ${nombre}\nTeléfono: ${telefono}\nEntrega en: ${puntoEntrega}`;

    const numeroWhatsApp = "7821658469";
    const url = `https://wa.me/52${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
    formulario.reset();
    modal.style.display = "none";
});

mostrarProductos();