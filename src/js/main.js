// 1️⃣ seleccionamos cosas UNA sola vez
const cards = document.querySelectorAll(".card");
const panel = document.getElementById("menu-panel");


// 2️⃣ datos simulados (como mini base de datos)
const menus = {
  cafes: [
    { nombre: "Espresso", precio: 1.50, img: "img/1 Espresso.png" },
    { nombre: "Americano", precio: 1.50, img: "img/2 Americano.png" },
    { nombre: "Cortado", precio: 2.30, img: "img/3 cortado.png" },
    { nombre: "Con leche", precio: 2.35, img: "img/3 Cortado.png" },
    { nombre: "Capuccino", precio: 2.80, img: "img/5 Cappuccino.png" },
    { nombre: "Latte", precio: 2.35, img: "img/6 Latte.png" },
    { nombre: "Ice", precio: 1.50, img: "img/7 Ice.png" },
  ],
  desayunosybaker: [
    { nombre: "Croissant", precio: 3.50, img: "img/8 Croissant.png" },
    { nombre: "Muffin", precio: 3.50, img: "img/9 Muffin.png" },
    { nombre: "Tostada", precio: 3.80, img: "img/10 Tostada.png" },
    { nombre: "Mixto", precio: 4.00, img: "img/11 Mixto.png" },
  ],
  dulces: [
    { nombre: "Cheesecake", precio: 4.10, img: "img/12 Cheesecake.png" },
    { nombre: "Brownie", precio: 4.10, img: "img/13 Brownie.png" },
    { nombre: "Cookie", precio: 3.10, img: "img/14 Cookie.png" },
  ],
  alternativas: [
    { nombre: "Zumo de naranja", precio: 2.00, img: "img/14 Naranja.png" },
    { nombre: "Té", precio: 1.20, img: "img/16 Te.png" },
    { nombre: "Smoothie", precio: 2.30, img: "img/18 Smoothie.png" },
  ]
};


// 3️⃣ cuando haces click en una card
cards.forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault(); // evita ir a otra página
    // sacamos la categoría (cafes, dulces...)
    const categoria = [...card.classList].find(c => c !== "card");
    mostrarMenu(categoria);
  });
});


// 4️⃣ función que realiza el panel
function mostrarMenu(categoria) {
  const productos = menus[categoria];
  let html = `<h2>${categoria.toUpperCase()}</h2>`;
  html += `<div class="menu-grid">`;
  productos.forEach(p => {
  html += `
    <div class="menu-item">
      <img src="${p.img}" alt="${p.nombre}">
      <span class="name">${p.nombre}</span>
      <div class="qty-box">
        <button class="minus">−</button>
        <input class="qty" type="text" value="0" readonly>
        <button class="plus">+</button>
      </div>
      <span class="price" data-price="${p.precio}">
        ${p.precio.toFixed(2)}€
    </span>
      <button class="buy">Añadir</button>
    </div>
  `;
  });
  html += `</div>`;
  panel.innerHTML = html;
  panel.classList.add("active");
}

let carrito = [];
const cartCount = document.getElementById("cart-count");


document.addEventListener("click", (e) => {
  const item = e.target.closest(".menu-item");
  if (!item) return;
  const qtyInput = item.querySelector(".qty");
  // ➕
  if (e.target.classList.contains("plus")) {
    cambiarCantidad(item, 1);
  }
  // ➖
  if (e.target.classList.contains("minus")) {
    cambiarCantidad(item, -1);
  }
  // 🛒 Añadir
  if (e.target.classList.contains("buy")) {
    const cantidad = parseInt(qtyInput.value);
    if (cantidad === 0) return;
    const nombre = item.querySelector(".name").textContent;
    const precio = parseFloat(item.querySelector(".price").textContent);
    for (let i = 0; i < cantidad; i++) {
      carrito.push({ nombre, precio });
    }
    qtyInput.value = 0;
    actualizarCarrito();
  }
});


function actualizarCarrito() {
  cartCount.textContent = carrito.length;
}

function cambiarCantidad(item, delta) {

  const qtyInput = item.querySelector(".qty");
  const priceSpan = item.querySelector(".price");

  let cantidad = parseInt(qtyInput.value);
  cantidad = Math.max(0, cantidad + delta);

  qtyInput.value = cantidad;

  const precioUnitario = parseFloat(priceSpan.dataset.price);

  const subtotal = precioUnitario * cantidad;

  priceSpan.textContent = subtotal.toFixed(2) + "€";
}