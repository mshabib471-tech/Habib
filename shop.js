/* shop.js - main interactions: drawer, lang picker, products load, modal, cart (simple) */

document.addEventListener('DOMContentLoaded', () => {
  /* ELEMENTS */
  const drawer = document.querySelector('.drawer');
  const openDrawerBtns = document.querySelectorAll('.hamburger, .open-drawer');
  const closeDrawerBtns = document.querySelectorAll('.drawer-close');
  const langModal = document.querySelector('.lang-modal');
  const langOpenBtns = document.querySelectorAll('.lang-open, .lang-btn');
  const langCloseBtns = document.querySelectorAll('.lang-close');
  const langLabelEls = document.querySelectorAll('.lang-label');

  const modalBack = document.querySelector('.modal-back');
  const productsGrid = document.querySelector('.products-grid');

  const CART_KEY = 'demo_cart';

  /* Drawer open/close */
  function openDrawer(){ drawer.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeDrawer(){ drawer.classList.remove('open'); document.body.style.overflow=''; }
  openDrawerBtns.forEach(b => b && b.addEventListener('click', openDrawer));
  closeDrawerBtns.forEach(b => b && b.addEventListener('click', closeDrawer));

  /* Language modal */
  function openLang(){ langModal && langModal.classList.add('open'); }
  function closeLang(){ langModal && langModal.classList.remove('open'); }
  langOpenBtns.forEach(b => b && b.addEventListener('click', openLang));
  langCloseBtns.forEach(b => b && b.addEventListener('click', closeLang));
  if(langModal) langModal.addEventListener('click', (e) => { if(e.target === langModal) closeLang(); });

  /* Set language label from localStorage */
  const savedLang = localStorage.getItem('site_lang');
  if(savedLang){
    const el = document.querySelector(`.lang-item[data-code="${savedLang}"]`);
    if(el) langLabelEls.forEach(l => l.innerText = el.innerText.trim());
  }

  /* Lang select - delegation */
  document.addEventListener('click', (e) => {
    const li = e.target.closest('.lang-item');
    if(!li) return;
    const code = li.dataset.code;
    localStorage.setItem('site_lang', code);
    langLabelEls.forEach(l => l.innerText = li.innerText.trim());
    closeLang();
  });

  /* Modal close */
  modalBack && modalBack.addEventListener('click', (e) => {
    if(e.target === modalBack || e.target.classList.contains('modal-close')) {
      modalBack.classList.remove('open'); document.body.style.overflow='';
    }
  });

  /* Simple cart helpers */
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
  function saveCart(arr){ localStorage.setItem(CART_KEY, JSON.stringify(arr)); updateCartCount(); }
  function updateCartCount(){
    const count = getCart().length;
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = count);
  }
  updateCartCount();

  /* Load products from products.json */
  async function loadProducts(){
    try{
      const res = await fetch('products.json');
      const data = await res.json();
      renderProducts(data);
    } catch(err){
      console.error('Failed to load products.json', err);
      // fallback: empty
      renderProducts([]);
    }
  }

  function renderProducts(list){
    if(!productsGrid) return;
    productsGrid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.tabIndex = 0;
      card.dataset.id = p.id;
      card.innerHTML = `
        <div class="media"><img src="${p.thumb}" alt="${escapeHtml(p.title)}"></div>
        <div class="body">
          <div class="title">${escapeHtml(p.title)}</div>
          <div class="meta">${escapeHtml(p.brand)}</div>
          <div class="price-row">
            <div class="oldprice">${p.old_price ? p.old_price + ' ' + p.currency : ''}</div>
            <div class="price">${p.price} ${p.currency}</div>
          </div>
        </div>
      `;
      // open modal on click
      card.addEventListener('click', () => openProductModal(p));
      productsGrid.appendChild(card);
    });
  }

  /* Open product modal and populate */
  function openProductModal(p){
    if(!modalBack) return;
    const modal = modalBack.querySelector('.modal');
    modal.querySelector('.m-img').src = p.image;
    modal.querySelector('.m-title').innerText = p.title;
    modal.querySelector('.m-meta').innerText = p.brand + ' · ' + p.category;
    modal.querySelector('.m-price').innerText = p.price + ' ' + p.currency;
    modal.querySelector('.m-desc').innerText = p.description || p.short || '';
    modal.querySelector('.m-oldprice').innerText = p.old_price ? p.old_price + ' ' + p.currency : '';
    // quantity default
    modal.querySelector('.qty-number').innerText = 1;

    // Add to cart handler
    const addBtn = modal.querySelector('.add-to-cart');
    addBtn.onclick = () => {
      const qty = Number(modal.querySelector('.qty-number').innerText) || 1;
      addToCart(p, qty);
      modalBack.classList.remove('open');
      document.body.style.overflow='';
      alert('Added to cart: ' + p.title);
    };

    modalBack.classList.add('open');
    document.body.style.overflow='hidden';
  }

  /* quantity controls */
  document.addEventListener('click', (e) => {
    if(e.target.matches('.qty-inc')) {
      const n = e.target.closest('.modal').querySelector('.qty-number');
      n.innerText = Math.min(99, Number(n.innerText)+1);
    }
    if(e.target.matches('.qty-dec')) {
      const n = e.target.closest('.modal').querySelector('.qty-number');
      n.innerText = Math.max(1, Number(n.innerText)-1);
    }
  });

  /* Add to cart logic */
  function addToCart(product, qty=1){
    const cart = getCart();
    const found = cart.find(i => i.id === product.id);
    if(found){ found.qty += qty; }
    else { cart.push({ id: product.id, title: product.title, price: product.price, currency: product.currency, qty }); }
    saveCart(cart);
  }

  /* utility escape */
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }

  /* init */
  loadProducts();
});