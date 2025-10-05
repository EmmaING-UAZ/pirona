document.addEventListener('DOMContentLoaded', () => {

    // Corrección para `position: sticky` en móviles.
    // La propiedad `overflow-x: hidden` en el body puede romper el comportamiento de `position: sticky`.
    // La eliminamos para asegurar que los elementos fijos/pegajosos funcionen correctamente.
    document.body.classList.remove('overflow-x-hidden');

    // --- Lógica para el Menú Móvil (Hamburguesa a X) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuBtn.classList.toggle('open'); // Activa la animación del icono
        });
    }

    // --- Lógica para Resaltar el Enlace de la Página Activa ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        // Caso especial para la página de inicio
        if ((currentPath === '' || currentPath === 'index.html') && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (linkPath !== 'index.html' && currentPath === linkPath) {
            // Caso para las otras páginas
            link.classList.add('active');
        }
    });


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
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 72; // Usa la altura real del header
        const startOffset = servicesMain.offsetTop - headerHeight;

        window.addEventListener('scroll', () => {
            if (window.scrollY > startOffset) {
                serviceNav.classList.add('visible');
            } else {
                serviceNav.classList.remove('visible');
            }
        });
    }
});