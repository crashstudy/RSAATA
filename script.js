
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    const orderForm = document.getElementById('orderForm');
    const loadingScreen = document.getElementById('loading-screen');

    // --- 1. Loading Screen ---
    window.addEventListener('load', () => {
        loadingScreen.classList.add('hidden');
    });

    // --- 2. Mobile Menu Toggle ---
    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileDrawer.classList.toggle('open');
            document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 3. Sticky Header & Scroll To Top Button Visibility ---
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Header
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll To Top Button
        if (scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- 4. Scroll To Top Button Action ---
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- 5. Active Navigation Highlight on Scroll ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' }); // Adjust rootMargin to activate when section is more centered

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 6. Intersection Observer for Animations ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // --- 7. Button Ripple Effect ---
    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // --- 8. Product Slider ---
    const sliderWrapper = document.querySelector('.product-slider-wrapper');
    if (sliderWrapper) {
        const slider = sliderWrapper.querySelector('.product-slider');
        const prevBtn = sliderWrapper.querySelector('.prev-btn');
        const nextBtn = sliderWrapper.querySelector('.next-btn');

        const scrollSlider = (direction) => {
            const cardWidth = slider.querySelector('.product-card').offsetWidth;
            const scrollAmount = (cardWidth + 24) * direction; // 24px is the gap
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => scrollSlider(1));
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => scrollSlider(-1));
        }
    }
    
    // --- 9. Review Carousel (Pause on Hover) ---
    const reviewCarousel = document.querySelector('.review-carousel');
    if (reviewCarousel) {
        reviewCarousel.addEventListener('mouseenter', () => {
            reviewCarousel.style.animationPlayState = 'paused';
        });
        reviewCarousel.addEventListener('mouseleave', () => {
            reviewCarousel.style.animationPlayState = 'running';
        });
    }

    // --- 10. Order Form WhatsApp Integration ---
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value;

            const whatsappNumber = "919928282078"; // Your WhatsApp number

            let message = `Hello RS AATA, I would like to place an order:\n\n`;
            message += `*Name:* ${name}\n`;
            message += `*Phone:* ${phone}\n`;
            message += `*Address:* ${address}\n`;
            message += `*Product:* ${product}\n`;
            message += `*Quantity:* ${quantity} kg\n\n`;
            message += `Please confirm my order.`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    }

});
