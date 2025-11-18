const products = PRODUCT_DATA;
let currentSearch = "";
let currentCategory = "all";

function renderFilters() {
    const categories = [...new Set(products.map(p => p.category))];

    document.getElementById("filtros").innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
            <input 
                type="text"
                id="search"
                class="w-full p-3 border rounded"
                placeholder="Buscar..."
                oninput="updateFilters()"
            >

            <select id="category" onchange="updateFilters()" 
                class="w-full p-3 border rounded">
                <option value="all">Todas</option>
                ${categories.map(c => `<option value="${c}">${c}</option>`)}
            </select>
        </div>
    `;
}

function updateFilters() {
    currentSearch = document.getElementById("search").value.toLowerCase();
    currentCategory = document.getElementById("category").value;

    renderList();
}

function renderList() {
    let filtered = products.filter(p =>
        (currentCategory === "all" || p.category === currentCategory) &&
        (p.name.toLowerCase().includes(currentSearch) || p.author.toLowerCase().includes(currentSearch))
    );

    document.getElementById("product-list").innerHTML = filtered.map(p => `
        <a href="detalle.html?id=${p.id}">
            <div class="tarjeta-producto bg-white rounded-xl shadow">
                <img src="${p.image}" class="w-full h-56 object-cover">
                <div class="p-4">
                    <h3 class="font-semibold text-lg">${p.name}</h3>
                    <p class="text-sm text-gray-500">${p.author}</p>
                    <span class="text-xl font-bold text-[var(--color-principal)]">$${p.price}</span>
                </div>
            </div>
        </a>
    `).join("");
}

renderFilters();
renderList();
