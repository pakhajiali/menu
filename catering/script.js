// ============================================
// CATERING SCRIPT – Scroll Reveal & Smooth Scroll
// No translations, no language switcher
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- SCROLL REVEAL ----------
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 120;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    // Initial check
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // (Optional) CTA click tracking – keep if you want
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Catering CTA clicked:', this.href);
        });
    });

});
