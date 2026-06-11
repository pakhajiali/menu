// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const closeBtn = document.getElementById('modalCloseBtn');

    // WhatsApp number (without '+', just digits)
    const waNumber = '60179081447';

    // Get all product cards
    const products = document.querySelectorAll('.product');

    // Function to open modal with product data
    function openModal(productElement) {
        // Retrieve data attributes
        let name = productElement.getAttribute('data-name');
        let desc = productElement.getAttribute('data-desc');
        const price = productElement.getAttribute('data-price');
        let imgSrc = productElement.getAttribute('data-img');

        // Special handling for Chicken Tenders to show complete description
        if (name === 'Chicken Tenders') {
            desc = 'Choose your flavour: Mala, Peri-Peri, Thai Lime, or Charcoal. Served crispy and juicy with dipping sauce.';
        }

        // Set modal content
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = price;
        modalImg.src = imgSrc;
        modalImg.alt = name;

        // Build WhatsApp message
        const waMessage = `Hi Pak Haji Ali & Muiz Hot Chicken, I'd like to order: ${name} (${price}). Please confirm availability.`;
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
        modalWaBtn.href = waLink;

        // Show modal with smooth display
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // restore scrolling
    }

    // Add click event listener to each product
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(product);
        });
    });

    // Close modal when clicking on close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content (on the backdrop)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});
