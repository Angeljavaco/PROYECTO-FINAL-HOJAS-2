// js/catalog.js
// Depende de PRODUCT_DATA (js/data.js)
(function(){
  const cont = document.getElementById('librosContainer');
  const search = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');

  // inicializar categorías
  const cats = ['all', ...Array.from(new Set(PRODUCT_DATA.map(p=>p.category)))];
  catFilter.innerHTML = cats.map(c => `<option value="${c}">${c === 'all' ? 'Todas' : c}</option>`).join('');

  function formatPrice(v){ return v.toFixed ? `S/ ${v.toFixed(2)}` : v; }

  function render(list){
    cont.innerHTML = list.map(p => `
      <article class="libro-card card">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/400x600?text=Sin+imagen'">
        <div class="meta">
          <h3 class="text-lg font-semibold">${p.name}</h3>
          <p class="text-sm text-gray-600">Autor: ${p.author}</p>
          <p class="text-sm text-gray-600">Categoría: ${p.category} · ${p.year}</p>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-red-600 font-bold">${formatPrice(p.price)}</span>
            <div>
              <span class="libro-tag ${p.condition === 'Intercambio' ? 'bg-orange-200 text-orange-900' : 'bg-green-100 text-green-900'} px-2 py-1 rounded-full text-xs">${p.condition}</span>
            </div>
          </div>
          <div class="mt-3">
            <a href="detalle.html?id=${p.id}" class="btn">Ver detalle</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function applyFilters(){
    const q = (search.value || '').toLowerCase();
    const cat = catFilter.value || 'all';
    const filtered = PRODUCT_DATA.filter(p => {
      const matchesCat = (cat === 'all') ? true : p.category === cat;
      const matchesQ = p.name.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
    render(filtered);
  }

  // listeners
  search.addEventListener('input', applyFilters);
  catFilter.addEventListener('change', applyFilters);

  // Si hay ?cat= en URL, selecciona la categoría
  const params = new URLSearchParams(location.search);
  const presetCat = params.get('cat');
  if(presetCat){
    if(Array.from(catFilter.options).some(o=>o.value===presetCat)){
      catFilter.value = presetCat;
    }
  }

  // Render inicial
  applyFilters();
})();
