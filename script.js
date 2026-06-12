document.addEventListener('DOMContentLoaded', function() {
    // ========== DOM ELEMENTS ==========
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const specialRequestInput = document.getElementById('specialRequest');

    // Quantity elements (simplified)
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    // Cart elements
    const cartDrawer = document.getElementById('cartDrawer');
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartCountSpan = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // ========== STATE ==========
    let currentProduct = null;
    let currentQty = 1;
    let modalOpenState = false;
    let drawerOpenState = false;
    let cart = [];

    // ========== HELPER: UPDATE CART UI ==========
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCountSpan) {
    let displayCount = totalItems;
    if (totalItems > 99) displayCount = '99+';
    cartCountSpan.innerText = displayCount;
}

        if (cartItemsDiv) {
            cartItemsDiv.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price * item.qty;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${escapeHtml(item.name)}</div>
                        <div class="cart-item-price">RM${item.price.toFixed(2)}</div>
                        ${item.request ? `<div class="cart-item-request">📝 ${escapeHtml(item.request)}</div>` : ''}
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-minus" data-index="${index}">-</button>
                        <span>${item.qty}</span>
                        <button class="cart-qty-plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">🗑️</button>
                    </div>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
            if (cartTotalSpan) cartTotalSpan.innerText = `Total: RM${total.toFixed(2)}`;
        }

        // Re-attach cart control events
        document.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                if (cart[idx].qty > 1) cart[idx].qty--;
                else cart.splice(idx, 1);
                saveCartAndUpdate();
            });
        });
        document.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                cart[idx].qty++;
                saveCartAndUpdate();
            });
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
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

    // ========== CART DRAWER CONTROLS ==========
    function openCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.add('open');
            if (!drawerOpenState) {
                drawerOpenState = true;
                history.pushState({ drawerOpen: true }, '', window.location.href);
            }
        }
    }

    function closeCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.remove('open');
            if (drawerOpenState) {
                drawerOpenState = false;
                history.replaceState(null, '', window.location.href);
            }
        }
    }

    // ========== MODAL CONTROLS ==========
    function openModal(productElement) {
        const name = productElement.getAttribute('data-name');
        let desc = productElement.getAttribute('data-desc');
        const price = parseFloat(productElement.getAttribute('data-price'));
        const imgSrc = productElement.getAttribute('data-img');

        if (name === 'Chicken Tenders') {
            desc = 'Choose your flavour: Mala, Peri-Peri, Thai Lime, or Charcoal. Served crispy and juicy with dipping sauce.';
        }

        currentProduct = { name, price, img: imgSrc };
        currentQty = 1;
        if (qtyInput) qtyInput.value = 1;
        if (specialRequestInput) specialRequestInput.value = '';

        if (modalName) modalName.innerText = name;
        if (modalDesc) modalDesc.innerText = desc;
        if (modalPrice) modalPrice.innerText = `RM${price.toFixed(2)}`;
        if (modalImg) {
            modalImg.src = imgSrc;
            modalImg.alt = name;
        }

        const waMessage = `Hi Pak Haji Ali & Muiz Hot Chicken, I'd like to order: ${name} (RM${price.toFixed(2)}). Please confirm.`;
        if (modalWaBtn) modalWaBtn.href = `https://wa.me/60179081447?text=${encodeURIComponent(waMessage)}`;

        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        if (!modalOpenState) {
            modalOpenState = true;
            history.pushState({ modalOpen: true }, '', window.location.href);
        }
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        if (modalOpenState) {
            modalOpenState = false;
            history.replaceState(null, '', window.location.href);
        }
    }

    // ========== QUANTITY CONTROLS (simplified) ==========
    function updateQty(value) {
        let newVal = parseInt(value);
        if (isNaN(newVal)) newVal = 1;
        newVal = Math.max(1, newVal);
        currentQty = newVal;
        if (qtyInput) qtyInput.value = currentQty;
    }

    if (qtyMinus) qtyMinus.addEventListener('click', () => updateQty(currentQty - 1));
    if (qtyPlus) qtyPlus.addEventListener('click', () => updateQty(currentQty + 1));
    if (qtyInput) qtyInput.addEventListener('change', (e) => updateQty(e.target.value));

    // Add to Cart button inside modal
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (currentProduct) {
                const request = specialRequestInput ? specialRequestInput.value.trim() : '';
                addToCart(currentProduct, currentQty, request);
                closeModal();
            }
        });
    }

    // ========== ATTACH EVENT LISTENERS TO ALL PRODUCT CARDS ==========
    const products = document.querySelectorAll('.product');
    if (products.length > 0) {
        products.forEach(product => {
            product.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(product);
            });
        });
    } else {
        console.warn('No products found with class "product"');
    }

    // ========== MODAL CLOSE EVENTS ==========
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') closeModal();
    });

    // ========== CART DRAWER EVENTS ==========
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openCartDrawer();
        });
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => closeCartDrawer());
    }
    document.addEventListener('click', (e) => {
        if (cartDrawer && cartDrawer.classList.contains('open') && !cartDrawer.contains(e.target) && !cartIcon.contains(e.target)) {
            closeCartDrawer();
        }
    });

    // ========== CHECKOUT ==========
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some items first.');
                return;
            }
            let message = 'Hello Pak Haji Ali & Muiz Hot Chicken, I would like to order:\n\n';
            cart.forEach(item => {
                message += `🍗 ${item.name} x${item.qty} = RM${(item.price * item.qty).toFixed(2)}`;
                if (item.request) message += `\n   📝 Special: ${item.request}`;
                message += '\n';
            });
            const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
            message += `\nTotal: RM${total.toFixed(2)}`;
            message += `\n\nPlease confirm my order. Thank you!`;
            window.open(`https://wa.me/60179081447?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // ========== BACK BUTTON HANDLER ==========
    window.addEventListener('popstate', function() {
        if (modalOpenState && modal && modal.style.display === 'flex') {
            closeModal();
            history.pushState({ modalOpen: true }, '', window.location.href);
        } else if (drawerOpenState && cartDrawer && cartDrawer.classList.contains('open')) {
            closeCartDrawer();
            history.pushState({ drawerOpen: true }, '', window.location.href);
        }
    });

    // ========== HELPER ==========
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, (m) => (m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;')));
    }

    // ========== INIT ==========
    loadCart();
});
