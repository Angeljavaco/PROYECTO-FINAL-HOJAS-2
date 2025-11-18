const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = PRODUCT_DATA.find(p => p.id === id);

document.getElementById("detalle").innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        <img src="${product.image}" class="w-full rounded shadow">

        <div class="lg:col-span-2">
            <h2 class="text-4xl font-extrabold">${product.name}</h2>
            <p class="text-xl mb-2">Autor: ${product.author}</p>

            <span class="text-4xl font-bold">$${product.price}</span>

            <p class="my-6">${product.description}</p>

            <a href="carrito.html?add=${product.id}" class="btn-principal text-lg">
                Agregar al Carrito
            </a>
        </div>
    </div>
`;
