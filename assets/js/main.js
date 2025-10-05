document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el Menú Móvil ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Lógica para animar elementos al hacer scroll ---
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        elementsToAnimate.forEach(element => observer.observe(element));
    }

    // --- Lógica para la Sub-navegación Flotante en servicios.html ---
    const serviceNav = document.getElementById('service-nav');
    const servicesMain = document.getElementById('servicios-main');

    if (serviceNav && servicesMain) {
        const startOffset = servicesMain.offsetTop - 73; // 72px del header + 1px

        window.addEventListener('scroll', () => {
            if (window.scrollY > startOffset) {
                serviceNav.classList.add('visible');
            } else {
                serviceNav.classList.remove('visible');
            }
        });
    }
});