// ============================================
// PRODUCT DATA
// ============================================
const productData = {
    "Most Ordered": [
        { name: "Nasi Kandar Muiz Hot Chicken", desc: "Nasi kandar with signature Muiz hot chicken & rich curry sauce.", price: 6.90, img: "nasikandarmuizchicken.webp" },
        { name: "Nasi Ayam Muiz Chicken", desc: "Aromatic chicken rice with tender Muiz-style fried chicken, sambal.", price: 8.90, img: "nasiayammuizchicken.webp" },
        { name: "Nasi Bujang", desc: "White Rice + Omelette + Soup + Sambal", price: 3.90, img: "nasibujang.webp" },
        { name: "Bakso", desc: "Authentic Indonesian beef meatball soup with savoury broth.", price: 5.90, img: "bakso.webp" },
        { name: "Mee Pak Haji Ali", desc: "Traditional recipe. Savoury noodles with special house blend.", price: 6.90, img: "meepakhajiali.webp" }
    ],
    "Muiz Hot Chicken Regular Box": [
        { name: "Original Regular Box", desc: "2 Pieces of Muiz Hot Chicken 🍗", price: 10.00, img: "originalregularbox.webp" },
        { name: "Cheese Regular Box", desc: "2 Pieces + Cheese Sauce", price: 12.00, img: "cheeseregularbox.webp" },
        { name: "Korean Spicy Regular Box", desc: "2 Pieces + Korean Spicy Sauce", price: 13.00, img: "koreanspicyregularbox.webp" },
        { name: "Korean Cheese Regular Box", desc: "2 Pieces + Cheese + Korean Spicy", price: 14.00, img: "koreancheeseregularbox.webp" }
    ],
    "Muiz Hot Chicken Happy Box": [
        { name: "Original Happy Box", desc: "5 Pieces of Muiz Hot Chicken 🍗", price: 25.00, img: "originalhappybox.webp" },
        { name: "Cheese Happy Box", desc: "5 Pieces + 2 Cheese Sauce", price: 29.00, img: "cheesehappybox.webp" },
        { name: "Korean Spicy Happy Box", desc: "5 Pieces + 2 Korean Spicy", price: 31.00, img: "koreanspicyhappybox.webp" },
        { name: "Korean Cheese Happy Box", desc: "5 Pieces + Cheese + Korean Spicy", price: 33.00, img: "koreancheesehappybox.webp" }
    ],
    "Chicken Tenders": [
        { name: "Chicken Tenders", desc: "Choose flavour: Mala • Peri-Peri • Thai Lime • Charcoal", price: 9.90, img: "chickentenders.webp" }
    ],
    "Nasi Penyet": [
        { name: "Nasi Ayam Muiz Penyet", desc: "Smashed chicken with sambal, served with rice.", price: 8.90, img: "nasiayammuizpenyet.webp" },
        { name: "Nasi Daging Penyet", desc: "Smashed beef with sambal, served with rice.", price: 8.90, img: "nasidagingpenyet.webp" },
        { name: "Nasi Ikan Keli Penyet", desc: "Smashed catfish with sambal, served with rice.", price: 8.90, img: "nasiikankelipenyet.webp" },
        { name: "Nasi Ikan Kembung Penyet", desc: "Smashed mackerel with sambal, served with rice.", price: 8.90, img: "nasiikankembungpenyet.webp" }
    ],
    "Nasi Goreng Kampung": [
        { name: "Nasi Goreng Kampung", desc: "Classic village-style fried rice", price: 7.50, img: "nasigorengkampung.webp" },
        { name: "Nasi Goreng Kampung Ayam", desc: "With chicken", price: 11.90, img: "nasigorengkampungayam.webp" },
        { name: "Nasi Goreng Kampung Daging", desc: "With beef", price: 11.90, img: "nasigorengkampungdaging.webp" },
        { name: "Nasi Goreng Kampung Seafood", desc: "With seafood", price: 13.90, img: "nasigorengkampungseafood.webp" }
    ],
    "Nasi Goreng Cina": [
        { name: "Nasi Goreng Cina", desc: "Classic Chinese fried rice", price: 6.00, img: "nasigorengcina.webp" },
        { name: "Nasi Goreng Cina Ayam", desc: "With chicken", price: 10.90, img: "nasigorengcinaayam.webp" },
        { name: "Nasi Goreng Cina Daging", desc: "With beef", price: 10.90, img: "nasigorengcinadaging.webp" },
        { name: "Nasi Goreng Cina Seafood", desc: "With seafood", price: 12.90, img: "nasigorengcinaseafood.webp" }
    ],
    "Nasi Goreng Tomyam": [
        { name: "Nasi Goreng Tomyam Biasa", desc: "Tomyam fried rice", price: 8.50, img: "nasigorengtomyambiasa.webp" },
        { name: "Nasi Goreng Tomyam Ayam", desc: "With chicken", price: 12.90, img: "nasigorengtomyamayam.webp" },
        { name: "Nasi Goreng Tomyam Daging", desc: "With beef", price: 12.90, img: "nasigorengtomyamdaging.webp" },
        { name: "Nasi Goreng Tomyam Seafood", desc: "With seafood", price: 14.90, img: "nasigorengtomyamseafood.webp" }
    ],
    "Nasi Goreng": [
        { name: "Nasi Goreng Vegetarian", desc: "Vegetarian fried rice with fresh vegetables.", price: 6.00, img: "nasigorengvegetarian.webp" },
        { name: "Nasi Goreng Biasa", desc: "Classic plain fried rice.", price: 6.50, img: "nasigorengbiasa.webp" },
        { name: "Nasi Goreng Cili Api", desc: "Spicy fried rice with bird's eye chili.", price: 6.50, img: "nasigorengciliapi.webp" },
        { name: "Nasi Goreng Kicap", desc: "Fried rice with sweet soy sauce.", price: 6.80, img: "nasigorengkicap.webp" },
        { name: "Nasi Goreng Mamak", desc: "Mamak-style fried rice with aromatic spices.", price: 7.00, img: "nasigorengmamak.webp" },
        { name: "Nasi Goreng Belacan", desc: "Fried rice with shrimp paste for a savoury kick.", price: 7.00, img: "nasigorengbelacan.webp" },
        { name: "Nasi Goreng Ikan Bilis", desc: "Fried rice with crispy anchovies.", price: 7.50, img: "nasigorengikanbilis.webp" },
        { name: "Nasi Goreng Sardin", desc: "Fried rice with sardines in spicy sauce.", price: 8.50, img: "nasigorengsardin.webp" },
        { name: "Nasi Goreng Pattaya", desc: "Fried rice wrapped in a thin egg omelette.", price: 8.50, img: "nasigorengpattaya.webp" },
        { name: "Nasi Goreng Ikan Masin", desc: "Fried rice with salted fish for a savoury flavour.", price: 9.00, img: "nasigorengikanmasin.webp" },
        { name: "Nasi Goreng Ayam", desc: "Fried rice with chicken pieces.", price: 9.50, img: "nasigorengayam.webp" },
        { name: "Nasi Goreng Daging", desc: "Fried rice with beef pieces.", price: 9.80, img: "nasigorengdaging.webp" },
        { name: "Nasi Goreng Paprik", desc: "Fried rice with spicy paprik sauce.", price: 10.50, img: "nasigorengpaprik.webp" },
        { name: "Nasi Goreng Masak Kunyit", desc: "Fried rice with turmeric for a fragrant flavour.", price: 10.50, img: "nasigorengmasakkunyit.webp" },
        { name: "Nasi Goreng Seafood", desc: "Fried rice with prawns and squid.", price: 12.00, img: "nasigorengseafood.webp" },
        { name: "Nasi Goreng USA", desc: "Chicken or Beef", price: 12.50, img: "nasigorengusa.webp" }
    ],
    "Ala Carte": [
        { name: "Nasi Putih", desc: "White rice.", price: 2.00, img: "nasiputih.webp" },
        { name: "Telur Mata", desc: "Sunny side up egg.", price: 1.50, img: "telurmata.webp" },
        { name: "Telur Dadar", desc: "Omelette egg.", price: 2.50, img: "telurdadar.webp" },
        { name: "Telur Separuh Masak", desc: "Half-boiled egg.", price: 3.00, img: "telurseparuhmasak.webp" },
        { name: "Telur Dadar Cheese", desc: "Omelette egg with cheese.", price: 4.50, img: "telurdadarcheese.webp" },
        { name: "Muiz Hot Chicken", desc: "Signature crispy fried chicken.", price: 5.00, img: "muizhotchicken.webp" },
        { name: "Ikan Kembung Goreng", desc: "Fried mackerel fish.", price: 5.50, img: "ikankembunggoreng.webp" },
        { name: "Ikan Keli Goreng", desc: "Fried catfish.", price: 5.90, img: "ikankeligoreng.webp" },
        { name: "Ayam Masak Kunyit", desc: "Chicken cooked with turmeric.", price: 6.90, img: "ayammasakkunyit.webp" },
        { name: "Daging Masak Kunyit", desc: "Beef cooked with turmeric.", price: 6.90, img: "dagingmasakkunyit.webp" },
        { name: "Ayam Masak Merah", desc: "Chicken cooked in spicy red sauce.", price: 6.90, img: "ayammasakmerah.webp" },
        { name: "Daging Masak Merah", desc: "Beef cooked in spicy red sauce.", price: 6.90, img: "dagingmasakmerah.webp" },
        { name: "Sup Sayur", desc: "Vegetable soup.", price: 5.00, img: "supsayur.webp" },
        { name: "Sup Ayam", desc: "Chicken soup.", price: 8.00, img: "supayam.webp" },
        { name: "Sup Daging", desc: "Beef soup.", price: 8.00, img: "supdaging.webp" },
        { name: "Tomyam Ayam", desc: "Spicy and sour tomyam soup with chicken.", price: 8.90, img: "tomyamayam.webp" },
        { name: "Tomyam Daging", desc: "Spicy and sour tomyam soup with beef.", price: 8.90, img: "tomyamdaging.webp" },
        { name: "Tomyam Seafood", desc: "Spicy and sour tomyam soup with prawns and squid.", price: 11.90, img: "tomyamseafood.webp" }
    ]
};

// ============================================
// RENDER MENU
// ============================================
function renderMenu() {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';

    const categoryIconMap = {
        "Most Ordered": "🌟",
        "Muiz Hot Chicken Regular Box": "🍗",
        "Muiz Hot Chicken Happy Box": "🎉",
        "Chicken Tenders": "🔥",
        "Nasi Penyet": "🌶️",
        "Nasi Goreng Kampung": "🍚",
        "Nasi Goreng Cina": "🥢",
        "Nasi Goreng Tomyam": "🌶️",
        "Nasi Goreng": "🍛",
        "Ala Carte": "🍽️"
    };

    for (const [category, products] of Object.entries(productData)) {
        const wrapper = document.createElement('div');
        wrapper.className = 'category-wrapper';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            <span class="category-icon">${categoryIconMap[category] || '📋'}</span>
            <h2 class="category-title">${category}</h2>
        `;
        wrapper.appendChild(header);

        const line = document.createElement('div');
        line.className = 'category-line';
        wrapper.appendChild(line);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.dataset.name = product.name;
            productDiv.dataset.desc = product.desc;
            productDiv.dataset.price = product.price;
            productDiv.dataset.img = product.img;

            // Fallback image: if image fails, show a generic chicken emoji SVG
            const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f0e6df'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='50' font-weight='bold' fill='%23b07f6e' text-anchor='middle' dominant-baseline='central'%3E🍗%3C/text%3E%3C/svg%3E`;

            productDiv.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.img}" alt="${product.name}" width="120" height="120" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${fallbackSvg}';">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-footer">
                        <span class="product-price">RM${product.price.toFixed(2)}</span>
                        <button class="product-add" aria-label="Add to cart">+ Add</button>
                    </div>
                </div>
            `;

            grid.appendChild(productDiv);
        });

        wrapper.appendChild(grid);
        container.appendChild(wrapper);
    }
}

// ============================================
// INJECT DYNAMIC RATING FROM reviews.json
// ============================================
async function injectDynamicRating() {
    try {
        const res = await fetch('reviews.json');
        if (!res.ok) throw new Error('reviews.json not found');
        const data = await res.json();

        const script = document.getElementById('restaurantSchema');
        if (!script) return;

        const schema = JSON.parse(script.textContent);
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": data.ratingValue || 5.0,
            "reviewCount": data.reviewCount || 0,
            "bestRating": data.bestRating || 5,
            "worstRating": data.worstRating || 1
        };
        script.textContent = JSON.stringify(schema);
        console.log('✅ Dynamic rating injected:', schema.aggregateRating);
    } catch (error) {
        console.log('ℹ️ reviews.json not loaded. Using no rating (Google will still show Maps rating).');
    }
}

// ============================================
// CART, MODAL, DRAWER LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    injectDynamicRating();

    // --- DOM refs ---
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

    // --- State ---
    let currentProduct = null;
    let currentQty = 1;
    let cart = [];
    let modalOpen = false;
    let drawerOpen = false;

    // --- Helpers ---
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatPrice(price) {
        return 'RM' + price.toFixed(2);
    }

    // --- Live WhatsApp link updater ---
    function updateModalWaLink() {
        if (!currentProduct) return;
        const qty = parseInt(qtyInput.value) || 1;
        const request = specialRequestInput.value.trim();
        const baseMsg = `Hi Restoran Pak Haji Ali & Muiz Hot Chicken, I'd like to order: ${currentProduct.name} x${qty} (${formatPrice(currentProduct.price * qty)})`;
        const fullMsg = request ? `${baseMsg}\n📝 Special: ${request}` : baseMsg;
        modalWaBtn.href = `https://wa.me/60179081447?text=${encodeURIComponent(fullMsg)}`;
    }

    // --- Cart functions ---
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountSpan.innerText = totalItems;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = `
                <div class="empty-cart">
                    <span class="empty-icon">🛍️</span>
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

    // --- Drawer ---
    function openCartDrawer() {
        cartDrawer.classList.add('open');
        drawerOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('open');
        drawerOpen = false;
        document.body.style.overflow = '';
    }

    // --- Modal ---
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

        // Set initial WA link
        updateModalWaLink();

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalOpen = true;
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalOpen = false;
    }

    // --- Quantity controls ---
    function updateQty(value) {
        let newVal = parseInt(value);
        if (isNaN(newVal) || newVal < 1) newVal = 1;
        currentQty = newVal;
        qtyInput.value = currentQty;
        updateModalWaLink(); // Update WA link on quantity change
    }

    qtyMinus.addEventListener('click', () => updateQty(currentQty - 1));
    qtyPlus.addEventListener('click', () => updateQty(currentQty + 1));
    qtyInput.addEventListener('change', (e) => updateQty(e.target.value));
    qtyInput.addEventListener('input', (e) => updateQty(e.target.value)); // Clamp while typing

    // --- Update WA link when special request changes ---
    specialRequestInput.addEventListener('input', updateModalWaLink);

    // --- Event: Product click (delegated) ---
    document.getElementById('menuContainer').addEventListener('click', function(e) {
        const productDiv = e.target.closest('.product');
        if (!productDiv) return;
        if (e.target.classList.contains('product-add') || e.target.closest('.product-add')) {
            openModal(productDiv);
            return;
        }
        if (!e.target.closest('.product-add')) {
            openModal(productDiv);
        }
    });

    // --- Add to cart ---
    addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            const request = specialRequestInput.value.trim();
            addToCart(currentProduct, currentQty, request);
            closeModal();
        }
    });

    // --- Modal close ---
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOpen) closeModal();
    });

    // --- Cart drawer toggle ---
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

    // --- Checkout ---
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some delicious items first! 🍗');
            return;
        }

        let message = 'Hi Restoran Pak Haji Ali & Muiz Hot Chicken! I would like to order:\n\n';
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

    // --- Clean back-button (no history pollution) ---
    window.addEventListener('popstate', function() {
        if (modalOpen) {
            closeModal();
        } else if (drawerOpen) {
            closeCartDrawer();
        }
    });

    // --- Init ---
    loadCart();
});
