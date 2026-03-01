// 1️⃣ seleccionamos cosas UNA sola vez
const cards = document.querySelectorAll(".card");
const panel = document.getElementById("menu-panel");
const cartBtn = document.getElementById("cart");
const cartPanel = document.getElementById("cart-panel");
const cartSum = document.getElementById("cart-sum");
const devSymbols = [">", "<", "#", "//", ".", "=>", "}"];

// botón carrito abre/cierra
if (cartBtn && cartPanel) {
  cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
  });
};

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


/* =========================
   MENU PAGE
========================= */

if (cards.length > 0 && panel) {

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const categoria = [...card.classList].find(c => c !== "card");
      mostrarMenu(categoria);
    });
  });

};


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

// 5 función que devuelve símbolo roandom en la cuenta
function getDevSymbol() {
    return devSymbols[Math.floor(Math.random() * devSymbols.length)];
}

/* =========================
   ESTADO
========================= */

let carrito = {};

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


/* =========================
   FUNCIONES
========================= */

function actualizarCarrito() {

  cartItems.innerHTML = "";

  let total = 0;
  let totalUnidades = 0;

  for (const nombre in carrito) {

    const item = carrito[nombre];
    const subtotal = item.precio * item.cantidad;

    total += subtotal;
    totalUnidades += item.cantidad;

    cartItems.innerHTML += `
      <div class="cart-row">
        <span>${getDevSymbol()} ${nombre} x${item.cantidad}</span>
        <span>${subtotal.toFixed(2)}€</span>
        <button class="remove" data-name="${nombre}">✕</button>
      </div>
    `;
  }

  cartTotal.textContent = total.toFixed(2) + "€";
  cartCount.textContent = totalUnidades;
  cartSum.textContent = total.toFixed(2) + "€";
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


/* =========================
   EVENTOS
========================= */

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
    const precio = parseFloat(item.querySelector(".price").dataset.price);

    if (!carrito[nombre]) {
      carrito[nombre] = { precio, cantidad: 0 };
    }

    carrito[nombre].cantidad += cantidad;

    qtyInput.value = 0;

    actualizarCarrito();
  }

  // ❌ eliminar
  if (e.target.classList.contains("remove")) {

    const nombre = e.target.dataset.name;

    delete carrito[nombre];

    actualizarCarrito();
  }

});

// cerrar carrito si clic fuera
document.addEventListener("click", (e) => {
  if (!cartPanel || !cartBtn) return;
  const dentroPanel = cartPanel.contains(e.target);
  const enBoton = cartBtn.contains(e.target);
  if (!dentroPanel && !enBoton) {
    cartPanel.classList.remove("open");
  }
});

//Efecto compilado Ticket
const installBtn = document.getElementById("install-btn");
const compileOutput = document.getElementById("compile-output");

if (installBtn && compileOutput) {

  installBtn.addEventListener("click", () => {

    if (Object.keys(carrito).length === 0) {
        compileOutput.innerHTML = "Error: carrito vacío.";
        return;
    }

    compileOutput.innerHTML = "Compilando pedido...<br>";

    let progress = 0;

    const interval = setInterval(() => {

        progress += 10;

        compileOutput.innerHTML = `
            Compilando pedido...<br>
            ${"█".repeat(progress/10)}${"░".repeat(10 - progress/10)} ${progress}%
        `;

        if (progress >= 100) {

            clearInterval(interval);

            compileOutput.innerHTML += `<br><br>✔ Pedido instalado correctamente.`;

            setTimeout(() => {

                localStorage.setItem("pedido", JSON.stringify(carrito));
                carrito = {};
                actualizarCarrito();
                window.location.href = "checkout.html";

            }, 1000);
        }

    }, 200);

  });

}

/* =========================
   CHECKOUT PAGE
========================= */

const checkoutContainer = document.getElementById("checkout-items");

if (checkoutContainer) {

    const pedido = JSON.parse(localStorage.getItem("pedido"));
    const totalElement = document.getElementById("checkout-total");
    const form = document.getElementById("payment-form");
    const message = document.getElementById("payment-message");

    // 🔹 Mostrar pedido
    if (!pedido || Object.keys(pedido).length === 0) {
        checkoutContainer.innerHTML = "No hay pedido guardado.";
    } else {
        let total = 0;

        for (const nombre in pedido) {
            const item = pedido[nombre];
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            checkoutContainer.innerHTML += `
              <div class="checkout-row">
                <span>${nombre}</span>

                <div class="checkout-controls">
                  <button class="minus-checkout" data-name="${nombre}">−</button>
                  <span>${item.cantidad}</span>
                  <button class="plus-checkout" data-name="${nombre}">+</button>
                </div>
                <span>${subtotal.toFixed(2)}€</span>
                <button class="remove-checkout" data-name="${nombre}">✕</button>
              </div>
            `;
        }

        totalElement.textContent = "Total: " + total.toFixed(2) + "€";
    }

    checkoutContainer.addEventListener("click", function(e) {

    const pedidoActual = JSON.parse(localStorage.getItem("pedido"));

    const nombre = e.target.dataset.name;
    if (!nombre) return;

    // ➕
    if (e.target.classList.contains("plus-checkout")) {
        pedidoActual[nombre].cantidad++;
    }

    // ➖
    if (e.target.classList.contains("minus-checkout")) {
        pedidoActual[nombre].cantidad--;
        if (pedidoActual[nombre].cantidad <= 0) {
            delete pedidoActual[nombre];
        }
    }

    // ❌ eliminar
    if (e.target.classList.contains("remove-checkout")) {
        delete pedidoActual[nombre];
    }

    localStorage.setItem("pedido", JSON.stringify(pedidoActual));
    location.reload(); // recarga para actualizar vista
});

    // 🔹 Validación pago
    const mes = document.getElementById("mes");
    const anio = document.getElementById("anio");
    const cvv = document.getElementById("cvv");

    function validarMes() {
        const valor = parseInt(mes.value);
        const status = document.getElementById("mes-status");

        if (valor >= 1 && valor <= 12) {
            status.textContent = "✔";
            status.style.color = "green";
            return true;
        } else {
            status.textContent = "✖";
            status.style.color = "red";
            return false;
        }
    }

    function validarAnio() {
        const valor = parseInt(anio.value);
        const status = document.getElementById("anio-status");

        if (valor >= 24 && valor <= 40) {
            status.textContent = "✔";
            status.style.color = "green";
            return true;
        } else {
            status.textContent = "✖";
            status.style.color = "red";
            return false;
        }
    }

    function validarCVV() {
        const status = document.getElementById("cvv-status");

        if (cvv.value.length === 3 && !isNaN(cvv.value)) {
            status.textContent = "✔";
            status.style.color = "green";
            return true;
        } else {
            status.textContent = "✖";
            status.style.color = "red";
            return false;
        }
    }

    mes.addEventListener("input", validarMes);
    anio.addEventListener("input", validarAnio);
    cvv.addEventListener("input", validarCVV);

  if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validarMes() || !validarAnio() || !validarCVV()) {
      message.innerHTML = "❌ Datos incorrectos.";
      message.style.color = "red";
      return;
    }

    message.innerHTML = "Procesando pago...";
    message.style.color = "black";

    setTimeout(() => {

      localStorage.removeItem("pedido");

      const frases = [
        "☕ Commit realizado. Café en producción.",
        "🚀 Build successful. Nivel de cafeína aumentado.",
        "💻 0 errores. 100% energía.",
        "🧠 Compilación completada. Debugging activado.",
        "⚡ Deploy sin bugs. Solo espresso."
      ];

      const fraseRandom = frases[Math.floor(Math.random() * frases.length)];

      const modal = document.getElementById("success-modal");
      const successText = document.getElementById("success-message");

      if (modal && successText) {
        successText.textContent = fraseRandom;
        modal.style.display = "flex";
      }

    }, 1200);
  });
}

const continueBtn = document.getElementById("continue-btn");

if (continueBtn) {
  continueBtn.addEventListener("click", function() {
    window.location.href = "index.html";
  });
}
}