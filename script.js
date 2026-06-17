document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // DOM ELEMENTS
    // ============================================
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

    // ============================================
    // STATE
    // ============================================
    let currentProduct = null;
    let currentQty = 1;
    let cart = [];
    let modalOpen = false;
    let drawerOpen = false;

    // ============================================
    // HELPERS
    // ============================================
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatPrice(price) {
        return 'RM' + price.toFixed(2);
    }

    // ============================================
    // CART FUNCTIONS
    // ============================================
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountSpan.innerText = totalItems;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
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

        // Attach cart control events
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

    // ============================================
    // CART DRAWER
    // ============================================
    function openCartDrawer() {
        cartDrawer.classList.add('open');
        drawerOpen = true;
        document.body.style.overflow = 'hidden';
        history.pushState({ drawerOpen: true }, '', window.location.href);
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('open');
        drawerOpen = false;
        document.body.style.overflow = '';
        history.replaceState(null, '', window.location.href);
    }

    // ============================================
    // MODAL
    // ============================================
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
        modalImg.alt = name;

        const waMessage = `Hi Muiz Hot Chicken & Restoran Pak Haji Ali, I'd like to order: ${name} (${formatPrice(price)}). Please confirm.`;
        modalWaBtn.href = `https://wa.me/60179081447?text=${encodeURIComponent(waMessage)}`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalOpen = true;
        history.pushState({ modalOpen: true }, '', window.location.href);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalOpen = false;
        history.replaceState(null, '', window.location.href);
    }

    // ============================================
    // QUANTITY CONTROLS
    // ============================================
    function updateQty(value) {
        let newVal = parseInt(value);
        if (isNaN(newVal) || newVal < 1) newVal = 1;
        currentQty = newVal;
        qtyInput.value = currentQty;
    }

    qtyMinus.addEventListener('click', () => updateQty(currentQty - 1));
    qtyPlus.addEventListener('click', () => updateQty(currentQty + 1));
    qtyInput.addEventListener('change', (e) => updateQty(e.target.value));

    // ============================================
    // EVENT: PRODUCT CLICK
    // ============================================
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('click', function(e) {
            // Don't open modal if clicking the add button
            if (e.target.classList.contains('product-add')) return;
            openModal(this);
        });

        // Add button click
        const addBtn = product.querySelector('.product-add');
        if (addBtn) {
            addBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openModal(product);
            });
        }
    });

    // ============================================
    // EVENT: ADD TO CART
    // ============================================
    addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            const request = specialRequestInput.value.trim();
            addToCart(currentProduct, currentQty, request);
            closeModal();
        }
    });

    // ============================================
    // EVENT: MODAL CLOSE
    // ============================================
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOpen) closeModal();
    });

    // ============================================
    // EVENT: CART DRAWER
    // ============================================
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

    // ============================================
    // EVENT: CHECKOUT
    // ============================================
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some delicious items first! 🍗');
            return;
        }

        let message = 'Hi Muiz Hot Chicken & Restoran Pak Haji Ali! I would like to order:\n\n';
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

    // ============================================
    // EVENT: BACK BUTTON
    // ============================================
    window.addEventListener('popstate', function() {
        if (modalOpen) {
            closeModal();
            history.pushState({ modalOpen: true }, '', window.location.href);
        } else if (drawerOpen) {
            closeCartDrawer();
            history.pushState({ drawerOpen: true }, '', window.location.href);
        }
    });

    // ============================================
    // INIT
    // ============================================
    loadCart();
});
