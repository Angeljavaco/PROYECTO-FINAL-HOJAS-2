// js/detail.js
(function(){
  const container = document.getElementById('detalleContainer');
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);

  const book = PRODUCT_DATA.find(p => p.id === id) || PRODUCT_DATA[0];

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl card grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        <img src="${book.image}" alt="${book.name}" onerror="this.src='https://placehold.co/600x900?text=Sin+imagen'">
      </div>

      <div class="md:col-span-2">
        <h1 class="text-3xl font-extrabold text-[var(--color-principal)]">${book.name}</h1>
        <p class="text-gray-700 mt-2">Autor: ${book.author}</p>
        <p class="text-gray-700 mt-2">${book.description}</p>

        <ul class="mt-4 text-gray-700">
          <li><strong>Categoría:</strong> ${book.category}</li>
          <li><strong>Año:</strong> ${book.year}</li>
          <li><strong>Condición:</strong> ${book.condition}</li>
        </ul>

        <div class="mt-6 flex items-center gap-4">
          <span class="text-3xl font-bold text-[var(--color-principal)]">S/ ${book.price.toFixed(2)}</span>
          <a href="transaccion.html?book=${book.id}" class="btn">Comprar</a>
        </div>
      </div>
    </div>
  `;
})();
