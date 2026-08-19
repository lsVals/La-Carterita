// ============ DATOS ============
// categoria: "clasicos" | "volovanes" | "especiales" | "temporada"
// temporada: { desdeMes, desdeDia, hastaMes, hastaDia } -> solo en productos de temporada.
//   Si hastaMes/hastaDia es "menor" que desdeMes/desdeDia, se asume que el rango cruza fin de año (ej. dic-ene).
const productos = [
  { id: "carterita", nombre: "Carterita", precio: 8, imagen: "imgcarterita.jpeg", categoria: "clasicos" },
  { id: "concha", nombre: "Concha", precio: 8, imagen: "imgconcha.jpeg", categoria: "clasicos" },
  { id: "empanada-queso", nombre: "Empanada rellena de queso", precio: 8, imagen: "imgempanada_queso.jpg", categoria: "clasicos" },
  { id: "volovan-comun", nombre: "Volován común", precio: 15, imagen: "imgvolovan_comun.jpeg", categoria: "volovanes" },
  { id: "volovan-chipotle", nombre: "Volován salchicha con chipotle", precio: 15, imagen: "imgvolovan_chipotle.jpeg", categoria: "volovanes" },
  { id: "volovan-chorizo", nombre: "Volován chorizo con queso", precio: 15, imagen: "imgvolovan_chorizo.jpeg", categoria: "volovanes" },
  { id: "volovan-atun", nombre: "Volován de Atún", precio: 15, imagen: "imgvolovan_atun.jpeg", categoria: "volovanes" },
  { id: "volovan-piña", nombre: "Volován de Piña", precio: 15, imagen: "imgvolovan_piña.jpeg", categoria: "volovanes" },
  { id: "rosca-sal", nombre: "Rosca de sal", precio: 8, imagen: "imgrosca_sal.jpeg", categoria: "clasicos" },
  { id: "rosca-royal", nombre: "Rosca de royal", precio: 12, imagen: "imgrosca_royal.jpg", categoria: "especiales" },
  { id: "mestiza", nombre: "Mestiza", precio: 8, imagen: "imgmestiza.jpeg", categoria: "clasicos" },
  { id: "amasadas", nombre: "Amasadas", precio: 30, imagen: "imgamasadas.jpeg", categoria: "clasicos" },
  { id: "amasadas-azucar", nombre: "Amasadas con azúcar", precio: 30, imagen: "imgamasadasconazucar.jpeg", categoria: "clasicos" },
  { id: "chirimoya", nombre: "Chirimoya", precio: 8, imagen: "imgchirimoya.jpeg", categoria: "clasicos" },
  { id: "besos", nombre: "Besos", precio: 8, imagen: "imgbesos.jpeg", categoria: "clasicos" },
  { id: "cuernito", nombre: "Cuernito relleno de mantequilla", precio: 8, imagen: "imgcuernito.jpeg", categoria: "clasicos" },
  { id: "gloria", nombre: "Gloria rellena de mantequilla", precio: 8, imagen: "imggloria.jpeg", categoria: "clasicos" },
  { id: "concha-queso", nombre: "Concha rellena de queso", precio: 12, imagen: "imgconchaqueso.jpeg", categoria: "clasicos" },
  { id: "keke", nombre: "Keke", precio: 8, imagen: "imgkeke.jpeg", categoria: "clasicos" },
  { id: "pan-elote", nombre: "Pan de elote (Cupcake)", precio: 15, imagen: "imgpan_elote.jpeg", categoria: "especiales" },
  { id: "bisquete", nombre: "Bisquete", precio: 8, imagen: "imgbisquete.jpeg", categoria: "clasicos" },
  { id: "rol-canela", nombre: "Rol de canela", precio: 15, imagen: "imgrol_canela.jpeg", categoria: "especiales" },
  { id: "rol-canela-glaseado", nombre: "Rol de canela Glaseado", precio: 20, imagen: "imgrol_canelaglass.jpeg", categoria: "especiales" },
  { id: "tacon", nombre: "Tacón", precio: 8, imagen: "imgtacon.jpeg", categoria: "clasicos" },
  { id: "puñalada", nombre: "Puñalada", precio: 8, imagen: "imgpuñalada.jpg", categoria: "especiales" },
  { id: "chancacuda", nombre: "Chancacuda", precio: 12, imagen: "imgchancacuda.jpeg", categoria: "clasicos" },
  { id: "torta-blanca", nombre: "Torta Blanca", precio: 12, imagen: "imgtorta_blanca.jpg", categoria: "especiales" },
  { id: "canilla", nombre: "Canilla", precio: 8, imagen: "imgcanilla.jpg", categoria: "especiales" },

  // --- Productos de temporada: precios de ejemplo, AJÚSTALOS a los reales ---
  { id: "pan-muerto-artesanal", nombre: "Pan de Muerto Artesanal", precio: 35, imagen: "panmuertoartesanal.jpg", categoria: "temporada", temporada: { desdeMes: 10, desdeDia: 25, hastaMes: 11, hastaDia: 3 } },
  { id: "pan-muerto-gourmet", nombre: "Pan de Muerto Gourmet", precio: 55, imagen: "imgpanmuertogourmet.jpg", categoria: "temporada", temporada: { desdeMes: 10, desdeDia: 25, hastaMes: 11, hastaDia: 3 } },
  { id: "rosca-reyes-artesanal", nombre: "Rosca de Reyes Artesanal", precio: 120, imagen: "imgroscareyesartesanal.jpg", categoria: "temporada", temporada: { desdeMes: 1, desdeDia: 2, hastaMes: 1, hastaDia: 7 } },
  { id: "rosca-reyes-gourmet", nombre: "Rosca de Reyes Gourmet", precio: 180, imagen: "imgroscareyesgourmet.jpg", categoria: "temporada", temporada: { desdeMes: 1, desdeDia: 2, hastaMes: 1, hastaDia: 7 } },
];

const NUMERO_WHATSAPP = "7821658469"; // <-- cambia aquí si el número cambia
const CLAVE_STORAGE = "carterita_carrito";
const NOMBRES_MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// ============ ESTADO ============
let carrito = cargarCarrito();
let categoriaActiva = "todos";
let textoBusqueda = "";

// ============ REFERENCIAS DOM ============
const contenedorProductos = document.getElementById("productos");
const sinResultados = document.getElementById("sin-resultados");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarritoEl = document.getElementById("total-carrito");
const contadorBadge = document.getElementById("contador-carrito");
const botonEnviar = document.getElementById("enviar-pedido");
const botonCarritoFlotante = document.getElementById("boton-carrito-flotante");
const carritoDrawer = document.getElementById("carrito-drawer");
const fondoDrawer = document.getElementById("fondo-drawer");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
const buscadorInput = document.getElementById("buscador");
const categoriasNav = document.getElementById("categorias");
const modal = document.getElementById("formulario-modal");
const cerrarModalBtn = document.getElementById("cerrar-modal");
const formulario = document.getElementById("formulario");
const botonPedidoGrande = document.getElementById("boton-pedido-grande");

// ============ PERSISTENCIA ============
function cargarCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : {};
  } catch {
    return {};
  }
}

function guardarCarrito() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
  } catch {
    // si falla el storage (modo privado, etc.) seguimos sin persistencia
  }
}

// ============ IMAGEN DE RESPALDO ============
function imagenRespaldo(nombre) {
  const inicial = nombre.trim().charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E8A93B"/>
        <stop offset="100%" stop-color="#B33A1F"/>
      </linearGradient>
    </defs>
    <rect width="300" height="200" fill="url(#g)"/>
    <text x="50%" y="54%" font-family="Georgia, serif" font-size="64" fill="#FBF8F0" text-anchor="middle" dominant-baseline="middle">${inicial}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

// ============ DISPONIBILIDAD POR TEMPORADA ============
function estaEnTemporada(temporada) {
  if (!temporada) return true; // productos normales siempre disponibles
  const hoy = new Date();
  const hoyMD = (hoy.getMonth() + 1) * 100 + hoy.getDate(); // ej. 15 oct -> 1015
  const inicio = temporada.desdeMes * 100 + temporada.desdeDia;
  const fin = temporada.hastaMes * 100 + temporada.hastaDia;

  if (inicio <= fin) {
    return hoyMD >= inicio && hoyMD <= fin;
  }
  // el rango cruza fin de año (ej. 20 dic - 6 ene)
  return hoyMD >= inicio || hoyMD <= fin;
}

function textoDisponibilidad(temporada) {
  return `Disponible en ${NOMBRES_MES[temporada.desdeMes - 1]}`;
}

// ============ RENDER PRODUCTOS ============
function productosFiltrados() {
  return productos.filter((p) => {
    const coincideCategoria = categoriaActiva === "todos" || p.categoria === categoriaActiva;
    const coincideTexto = p.nombre.toLowerCase().includes(textoBusqueda.trim().toLowerCase());
    return coincideCategoria && coincideTexto;
  });
}

function renderProductos() {
  const lista = productosFiltrados();
  contenedorProductos.innerHTML = "";
  sinResultados.hidden = lista.length > 0;

  lista.forEach((producto) => {
    const disponible = estaEnTemporada(producto.temporada);
    const cantidad = carrito[producto.id]?.cantidad || 0;

    const div = document.createElement("div");
    div.classList.add("producto");
    if (!disponible) div.classList.add("no-disponible");

    const etiqueta = disponible
      ? `<span class="etiqueta-precio">$${producto.precio}</span>`
      : `<span class="etiqueta-precio etiqueta-espera">${textoDisponibilidad(producto.temporada)}</span>`;

    const controles = disponible
      ? `<div class="contador">
           <button data-accion="restar" data-id="${producto.id}" aria-label="Quitar uno de ${producto.nombre}">−</button>
           <span id="cantidad-${producto.id}">${cantidad}</span>
           <button data-accion="sumar" data-id="${producto.id}" aria-label="Agregar uno de ${producto.nombre}">+</button>
         </div>`
      : `<p class="aviso-temporada">Aún no disponible</p>`;

    div.innerHTML = `
      <div class="producto-img-wrap">
        <img src="img/${producto.imagen}" alt="${producto.nombre}" class="producto-img"
             onerror="this.onerror=null;this.src='${imagenRespaldo(producto.nombre)}'">
        ${etiqueta}
      </div>
      <div class="producto-body">
        <h3>${producto.nombre}</h3>
        ${controles}
      </div>
    `;
    contenedorProductos.appendChild(div);
  });
}

// delegación de eventos para los contadores de producto
contenedorProductos.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;
  const id = boton.dataset.id;
  const cambio = boton.dataset.accion === "sumar" ? 1 : -1;
  modificarCantidad(id, cambio);
});

function modificarCantidad(id, cambio) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;
  if (!estaEnTemporada(producto.temporada)) return; // seguridad extra, aunque el botón no debería existir

  if (!carrito[id]) carrito[id] = { ...producto, cantidad: 0 };
  carrito[id].cantidad += cambio;

  if (carrito[id].cantidad <= 0) delete carrito[id];

  guardarCarrito();
  actualizarCarrito();

  const span = document.getElementById(`cantidad-${id}`);
  if (span) span.innerText = carrito[id]?.cantidad || 0;
}

// ============ CARRITO / TICKET ============
function actualizarCarrito() {
  const items = Object.values(carrito);
  listaCarrito.innerHTML = "";
  carritoVacio.style.display = items.length === 0 ? "block" : "none";

  let total = 0;
  let totalUnidades = 0;

  items.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    totalUnidades += producto.cantidad;

    const li = document.createElement("li");
    li.classList.add("item-carrito");
    li.innerHTML = `
      <div class="item-info">
        <span class="item-nombre">${producto.nombre}</span>
        <span class="item-precio">$${producto.precio} c/u</span>
      </div>
      <div class="item-controles">
        <button data-accion="restar" data-id="${producto.id}" aria-label="Quitar uno de ${producto.nombre}">−</button>
        <span>${producto.cantidad}</span>
        <button data-accion="sumar" data-id="${producto.id}" aria-label="Agregar uno de ${producto.nombre}">+</button>
        <button class="item-eliminar" data-accion="eliminar" data-id="${producto.id}" aria-label="Eliminar ${producto.nombre} del carrito">🗑</button>
      </div>
    `;
    listaCarrito.appendChild(li);
  });

  totalCarritoEl.innerText = `$${total}`;
  botonEnviar.disabled = items.length === 0;

  if (totalUnidades > 0) {
    contadorBadge.hidden = false;
    contadorBadge.innerText = totalUnidades;
  } else {
    contadorBadge.hidden = true;
  }
}

listaCarrito.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;
  const id = boton.dataset.id;

  if (boton.dataset.accion === "eliminar") {
    delete carrito[id];
    guardarCarrito();
    actualizarCarrito();
    const span = document.getElementById(`cantidad-${id}`);
    if (span) span.innerText = 0;
    return;
  }

  const cambio = boton.dataset.accion === "sumar" ? 1 : -1;
  modificarCantidad(id, cambio);
});

// ============ ABRIR / CERRAR DRAWER ============
function abrirCarrito() {
  carritoDrawer.classList.add("abierto");
  fondoDrawer.classList.add("visible");
  carritoDrawer.setAttribute("aria-hidden", "false");
}

function cerrarCarrito() {
  carritoDrawer.classList.remove("abierto");
  fondoDrawer.classList.remove("visible");
  carritoDrawer.setAttribute("aria-hidden", "true");
}

botonCarritoFlotante.addEventListener("click", abrirCarrito);
cerrarCarritoBtn.addEventListener("click", cerrarCarrito);
fondoDrawer.addEventListener("click", cerrarCarrito);

// ============ BUSCADOR Y CATEGORÍAS ============
buscadorInput.addEventListener("input", (e) => {
  textoBusqueda = e.target.value;
  renderProductos();
});

categoriasNav.addEventListener("click", (e) => {
  const boton = e.target.closest(".cat-btn");
  if (!boton) return;
  categoriaActiva = boton.dataset.cat;
  document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("activo"));
  boton.classList.add("activo");
  renderProductos();
});

// ============ BOTÓN DE PEDIDOS GRANDES / MAYOREO ============
if (botonPedidoGrande) {
  const mensajeMayoreo =
    "Hola, quisiera preguntar por un pedido grande (por ejemplo, volovanes o pan por mayoreo). ¿Me pueden dar información de precios y tiempos de entrega?";
  botonPedidoGrande.href = `https://wa.me/52${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensajeMayoreo)}`;
}

// ============ MODAL DE DATOS ============
botonEnviar.addEventListener("click", () => {
  if (Object.keys(carrito).length === 0) return;
  cerrarCarrito();
  modal.classList.add("visible");
  modal.setAttribute("aria-hidden", "false");
});

function cerrarModal() {
  modal.classList.remove("visible");
  modal.setAttribute("aria-hidden", "true");
}

cerrarModalBtn.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (modal.classList.contains("visible")) cerrarModal();
  else if (carritoDrawer.classList.contains("abierto")) cerrarCarrito();
});

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

  Object.values(carrito).forEach((producto) => {
    mensaje += `- ${producto.cantidad} x ${producto.nombre} ($${producto.precio} c/u)\n`;
    total += producto.precio * producto.cantidad;
  });

  mensaje += `\nTotal: $${total}\n\n`;
  mensaje += `Datos del cliente:\nNombre: ${nombre}\nTeléfono: ${telefono}\nEntrega en: ${puntoEntrega}`;

  const url = `https://wa.me/52${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  // limpiar todo tras enviar
  carrito = {};
  guardarCarrito();
  actualizarCarrito();
  renderProductos();
  formulario.reset();
  cerrarModal();
});

// ============ INICIO ============
renderProductos();
actualizarCarrito();
