// ============================================
// FULL SCRIPT.JS – Cart, Modal, Drawer, Checkout
// Works with static HTML (EN, BM, ZH)
// No menu rendering, no language logic
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- DOM refs ----------
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const specialRequestInput = document.getElementById('specialRequest');
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    const cartDrawer = document.getElementById('cartDrawer');
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartCountSpan = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // ---------- State ----------
    let currentProduct = null;      // { name, price, img }
    let currentQty = 1;
    let cart = [];
    let modalOpen = false;
    let drawerOpen = false;

    // ---------- Helpers ----------
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatPrice(price) {
        return 'RM' + parseFloat(price).toFixed(2);
    }

    // ---------- WhatsApp link updater ----------
    function updateModalWaLink() {
        if (!currentProduct) return;
        const qty = parseInt(qtyInput.value) || 1;
        const request = specialRequestInput.value.trim();
        const baseMsg = `Hi, I'd like to order: ${currentProduct.name} x${qty} (${formatPrice(currentProduct.price * qty)}) from your USJ 8 menu.`;
        const fullMsg = request ? `${baseMsg}\n📝 Special: ${request}` : baseMsg;
        modalWaBtn.href = `https://wa.me/60179081447?text=${encodeURIComponent(fullMsg)}`;
    }

    // ---------- Cart functions ----------
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountSpan.innerText = totalItems;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag empty-icon"></i>
                    <p>Your cart is empty</p>
                    <span>Add some delicious items!</span>
                </div>
            `;
            cartTotalSpan.innerText = 'Total: RM0.00';
            return;
        }

        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${escapeHtml(item.name)}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        ${item.request ? `<div class="cart-item-request">📝 ${escapeHtml(item.request)}</div>` : ''}
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-minus" data-index="${index}">−</button>
                        <span>${item.qty}</span>
                        <button class="cart-qty-plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">✕</button>
                    </div>
                </div>
            `;
        });
        cartItemsDiv.innerHTML = html;
        cartTotalSpan.innerText = 'Total: ' + formatPrice(total);

        // Attach event listeners to cart controls
        document.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const idx = parseInt(this.dataset.index);
                if (cart[idx].qty > 1) {
                    cart[idx].qty--;
                } else {
                    cart.splice(idx, 1);
                }
                saveCartAndUpdate();
            });
        });

        document.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const idx = parseInt(this.dataset.index);
                cart[idx].qty++;
                saveCartAndUpdate();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const idx = parseInt(this.dataset.index);
                cart.splice(idx, 1);
                saveCartAndUpdate();
            });
        });
    }

    function saveCartAndUpdate() {
        localStorage.setItem('restaurantCart', JSON.stringify(cart));
        updateCartUI();
    }

    function loadCart() {
        const saved = localStorage.getItem('restaurantCart');
        cart = saved ? JSON.parse(saved) : [];
        updateCartUI();
    }

    function addToCart(product, qty, request) {
        const existingIndex = cart.findIndex(item => item.name === product.name && item.request === request);
        if (existingIndex !== -1) {
            cart[existingIndex].qty += qty;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                qty: qty,
                img: product.img,
                request: request || ''
            });
        }
        saveCartAndUpdate();
        openCartDrawer();
    }

    // ---------- Drawer ----------
    function openCartDrawer() {
        if (!drawerOpen) {
            history.pushState({ drawer: true }, '', window.location.href);
        }
        cartDrawer.classList.add('open');
        drawerOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('open');
        drawerOpen = false;
        document.body.style.overflow = '';
    }

    // ---------- Modal ----------
    function openModal(productElement) {
        const name = productElement.dataset.name;
        const desc = productElement.dataset.desc;
        const price = parseFloat(productElement.dataset.price);
        const imgSrc = productElement.dataset.img;

        currentProduct = { name, price, img: imgSrc };
        currentQty = 1;
        qtyInput.value = 1;
        specialRequestInput.value = '';

        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = formatPrice(price);
        modalImg.src = imgSrc;
        modalImg.alt = name + ' - Restoran Pak Haji Ali & Muiz Hot Chicken - Subang Jaya (USJ 8)';

        updateModalWaLink();

        if (!modalOpen) {
            history.pushState({ modal: true }, '', window.location.href);
        }
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalOpen = true;
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalOpen = false;
    }

    // ---------- Quantity controls ----------
    function updateQty(value) {
        let newVal = parseInt(value);
        if (isNaN(newVal) || newVal < 1) newVal = 1;
        currentQty = newVal;
        qtyInput.value = currentQty;
        updateModalWaLink();
    }

    qtyMinus.addEventListener('click', () => updateQty(currentQty - 1));
    qtyPlus.addEventListener('click', () => updateQty(currentQty + 1));
    qtyInput.addEventListener('change', (e) => updateQty(e.target.value));
    qtyInput.addEventListener('input', (e) => updateQty(e.target.value));
    specialRequestInput.addEventListener('input', updateModalWaLink);

    // ---------- Event: Product click ----------
    const menuContainer = document.getElementById('menuContainer');
    if (menuContainer) {
        menuContainer.addEventListener('click', function(e) {
            const productDiv = e.target.closest('.product');
            if (!productDiv) return;
            // If click is on the Add button or inside it, open modal
            if (e.target.classList.contains('product-add') || e.target.closest('.product-add')) {
                openModal(productDiv);
                return;
            }
            // Any other click on the product also opens the modal
            if (!e.target.closest('.product-add')) {
                openModal(productDiv);
            }
        });
    }

    // ---------- Add to cart button ----------
    addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            const request = specialRequestInput.value.trim();
            addToCart(currentProduct, currentQty, request);
            closeModal();
        }
    });

    // ---------- Modal close ----------
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOpen) closeModal();
    });

    // ---------- Cart drawer toggle ----------
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (drawerOpen) {
            closeCartDrawer();
        } else {
            openCartDrawer();
        }
    });

    closeCartBtn.addEventListener('click', closeCartDrawer);

    document.addEventListener('click', (e) => {
        if (drawerOpen && !cartDrawer.contains(e.target) && !cartIcon.contains(e.target)) {
            closeCartDrawer();
        }
    });

    // ---------- Checkout ----------
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some delicious items first! 🍗');
            return;
        }

        let message = 'Hi, I want to place an order from your USJ 8 menu:\n\n';
        cart.forEach(item => {
            message += `🍗 ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}`;
            if (item.request) message += `\n   📝 Special: ${item.request}`;
            message += '\n';
        });
        const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        message += `\n━━━━━━━━━━━━━━━━\nTotal: ${formatPrice(total)}`;
        message += `\n\nPlease confirm my order. Thank you! 🙏`;

        window.open(`https://wa.me/60179081447?text=${encodeURIComponent(message)}`, '_blank');
    });

    // ---------- Back button: close modal or drawer first ----------
    window.addEventListener('popstate', function(e) {
        if (modalOpen) {
            closeModal();
            e.preventDefault();
            return;
        }
        if (drawerOpen) {
            closeCartDrawer();
            e.preventDefault();
            return;
        }
    });

    // ---------- Scroll reveal (Intersection Observer – NO main-thread blocking) ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ---------- Init ----------
    loadCart();

});
