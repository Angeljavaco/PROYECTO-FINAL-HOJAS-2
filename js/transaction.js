// js/transaction.js
(function(){
  // Si la URL trae book=id, mostramos el total
  const params = new URLSearchParams(location.search);
  const bookId = parseInt(params.get('book'),10);
  const selected = PRODUCT_DATA.find(p=>p.id===bookId);

  const totalEl = document.getElementById('checkoutTotal');
  const metodo = document.getElementById('checkoutMetodo');
  const paymentFields = document.getElementById('checkoutPaymentFields');
  const form = document.getElementById('checkoutForm');
  const msg = document.getElementById('checkoutMessage');

  if(selected){
    totalEl.textContent = `S/ ${selected.price.toFixed(2)}`;
  } else {
    // Si no hay libro seleccionado, quizás el carrito. dejamos 0.
    totalEl.textContent = 'S/ 0.00';
  }

  metodo.addEventListener('change', () => {
    paymentFields.innerHTML = '';
    msg.classList.add('hidden');
    if(metodo.value === 'yape'){
      paymentFields.innerHTML = `
        <label class="block font-medium mb-1">Número Yape</label>
        <input id="payYape" class="w-full p-3 border rounded" placeholder="Ej. 9XXXXXXXX" />
        <label class="block font-medium mt-3 mb-1">Comprobante (opcional)</label>
        <input type="file" id="payYapeFile" class="w-full" />
      `;
    } else if(metodo.value === 'tarjeta'){
      paymentFields.innerHTML = `
        <label class="block font-medium mb-1">Número de tarjeta</label>
        <input id="payCard" maxlength="23" class="w-full p-3 border rounded" placeholder="XXXX XXXX XXXX XXXX" />
        <label class="block font-medium mt-3 mb-1">Expiración (MM/AAAA)</label>
        <input id="payExp" class="w-full p-3 border rounded" placeholder="MM/AAAA" />
        <label class="block font-medium mt-3 mb-1">CVV</label>
        <input id="payCVV" maxlength="3" class="w-full p-3 border rounded" placeholder="123" />
      `;
    } else if(metodo.value === 'paypal'){
      paymentFields.innerHTML = `
        <label class="block font-medium mb-1">Correo PayPal</label>
        <input id="payPaypal" type="email" class="w-full p-3 border rounded" placeholder="usuario@paypal.com" />
      `;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.classList.add('hidden');

    // validaciones básicas
    const name = document.getElementById('c_nombre').value.trim();
    const email = document.getElementById('c_correo').value.trim();
    const m = metodo.value;

    if(!name || !email){
      alert('Completa tu nombre y correo.');
      return;
    }
    if(!m){
      alert('Selecciona un método de pago');
      return;
    }

    // validaciones por método
    if(m === 'tarjeta'){
      const card = document.getElementById('payCard').value.replace(/\s/g,'');
      const exp = document.getElementById('payExp').value.trim();
      const cvv = document.getElementById('payCVV').value.trim();

      if(card.length < 13 || card.length > 19){ alert('Número de tarjeta inválido'); return; }
      if(!/^(0[1-9]|1[0-2])\/\d{4}$/.test(exp)){ alert('Formato de expiración inválido (MM/AAAA)'); return; }
      if(cvv.length !== 3){ alert('CVV inválido'); return; }
    }

    // simulamos éxito
    msg.textContent = '✔ Pago realizado con éxito. Gracias por tu compra.';
    msg.classList.remove('hidden');

    // aquí podrías limpiar carrito / enviar al servidor
  });
})();


