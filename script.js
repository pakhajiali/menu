document.addEventListener('DOMContentLoaded', function() {
    // ---------- MODAL ----------
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyValueSpan = document.getElementById('qtyValue');
    const addToCartBtn = document.getElementById('addToCartBtn');

    let currentProduct = null;
    let currentQty = 1;

    // ---------- CART ----------
    let cart = [];
    const cartDrawer = document.getElementById('cartDrawer');
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartCountSpan = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Helper: update cart UI and localStorage
    function updateCartUI() {
        // Update count badge
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountSpan.innerText = totalItems;

        // Render cart items
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">RM${item.price.toFixed(2)}</div>
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
        cartTotalSpan.innerText = `Total: RM${total.toFixed(2)}`;

        // Attach event listeners to cart controls
        document.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index);
                if (cart[idx].qty > 1) {
                    cart[idx].qty--;
                } else {
                    cart.splice(idx, 1);
                }
                saveCartAndUpdate();
            });
        });
        document.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index);
                cart[idx].qty++;
                saveCartAndUpdate();
            });
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
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
        if (saved) {
            cart = JSON.parse(saved);
        } else {
            cart = [];
        }
        updateCartUI();
    }

    // Add item to cart
    function addToCart(product, qty) {
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                qty: qty,
                img: product.img
            });
        }
        saveCartAndUpdate();
        // Show cart drawer briefly (optional)
        cartDrawer.classList.add('open');
        setTimeout(() => {
            // keep open, user can close manually
        }, 100);
    }

    // ---------- MODAL HANDLERS ----------
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
        qtyValueSpan.innerText = currentQty;

        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = `RM${price.toFixed(2)}`;
        modalImg.src = imgSrc;
        modalImg.alt = name;

        const waMessage = `Hi Pak Haji Ali & Muiz Hot Chicken, I'd like to order: ${name} (RM${price.toFixed(2)}). Please confirm.`;
        modalWaBtn.href = `https://wa.me/60179081447?text=${encodeURIComponent(waMessage)}`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Quantity controls
    if (qtyMinus && qtyPlus) {
        qtyMinus.addEventListener('click', () => {
            if (currentQty > 1) currentQty--;
            qtyValueSpan.innerText = currentQty;
        });
        qtyPlus.addEventListener('click', () => {
            currentQty++;
            qtyValueSpan.innerText = currentQty;
        });
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (currentProduct) {
                addToCart(currentProduct, currentQty);
                closeModal();
            }
        });
    }

    // Attach click to all product cards
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(product);
        });
    });

    // Modal close events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });

    // ---------- CART DRAWER EVENTS ----------
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartDrawer.classList.add('open');
        });
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartDrawer.classList.remove('open');
        });
    }
    // Close drawer when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (cartDrawer.classList.contains('open') && !cartDrawer.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDrawer.classList.remove('open');
        }
    });

    // Checkout: send cart summary via WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some items first.');
                return;
            }
            let message = 'Hello Pak Haji Ali & Muiz Hot Chicken, I would like to order:\n';
            cart.forEach(item => {
                message += `🍗 ${item.name} x${item.qty} = RM${(item.price * item.qty).toFixed(2)}\n`;
            });
            const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
            message += `\nTotal: RM${total.toFixed(2)}`;
            message += `\n\nPlease confirm my order.`;
            const waLink = `https://wa.me/60179081447?text=${encodeURIComponent(message)}`;
            window.open(waLink, '_blank');
        });
    }

    // Load cart from localStorage
    loadCart();
});
