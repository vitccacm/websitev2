// Smart Navbar Logic
(function () {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 15;

    if (!navbar) {
        console.error('Navbar element not found!');
        return;
    }

    console.log('Navbar Smart Scroll Initialized');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Mobile bounce protection
        if (currentScrollY < 0) return;

        // Always show if at very top
        if (currentScrollY < 10) {
            navbar.classList.remove('navbar-hidden');
            lastScrollY = currentScrollY;
            return;
        }

        // Determine Direction
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // SCROLLING DOWN -> HIDE
            if (!navbar.classList.contains('navbar-hidden')) {
                navbar.classList.add('navbar-hidden');
            }
        } else if (currentScrollY < lastScrollY) {
            // SCROLLING UP -> SHOW
            if (navbar.classList.contains('navbar-hidden')) {
                navbar.classList.remove('navbar-hidden');
            }
        }

        lastScrollY = currentScrollY;
    });

    // Mobile Hamburger Injection
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'navbar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    // Insert after logo, before menu (technically standard flex order handles this if justify-between)
    // Actually append to navbar.
    navbar.appendChild(toggleBtn);

    const menu = navbar.querySelector('.navbar-menu');
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggleBtn.innerHTML = menu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

})();

// Lightbox Logic
(function () {
    // Create Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="Enlarged Image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Function to open lightbox
    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    // Function to close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Enable scroll
    };

    // Event Delegation for Gallery Images
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' &&
            (e.target.closest('.scrolling-gallery-item') || e.target.closest('.gallery-event-card'))) {
            openLightbox(e.target.src);
        }
    });

    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
})();
