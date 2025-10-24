// Simple JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Responsive navigation adjustment
    function handleResize() {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    }
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Slider functionality
    const slider = document.querySelector('.destinations-cards');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.destination-card');
    
    let currentPosition = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    const visibleCards = Math.floor(slider.clientWidth / cardWidth);
    
    function updateButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= slider.scrollWidth - slider.clientWidth - 10;
    }
    
    function updateSlider() {
        slider.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtons();
    }
    
    nextBtn.addEventListener('click', function() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        currentPosition = Math.min(currentPosition + (cardWidth * visibleCards), maxScroll);
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        currentPosition = Math.max(currentPosition - (cardWidth * visibleCards), 0);
        updateSlider();
    });
    
    // Touch swipe for mobile
    let startX;
    let scrollLeft;
    let isDragging = false;
    
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        isDragging = true;
    });
    
    slider.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = extreme - walk;
    });
    
    slider.addEventListener('touchend', function() {
        isDragging = false;
        currentPosition = slider.scrollLeft;
        updateButtons();
    });
    
    // Mouse drag for desktop
    slider.addEventListener('mousedown', function(e) {
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        isDragging = true;
        slider.style.cursor = 'grabbing';
        slider.style.userSelect = 'none';
    });
    
    slider.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        slider.style.cursor = 'grab';
        slider.style.userSelect = '';
        currentPosition = slider.scrollLeft;
        updateButtons();
    });
    
    // Initialize buttons
    updateButtons();
    
    // Auto-update on resize
    window.addEventListener('resize', function() {
        currentPosition = slider.scrollLeft;
        updateButtons();
    });
    
    // Testimonials Slider with Navigation
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevTestBtn = document.querySelector('.nav-prev');
    const nextTestBtn = document.querySelector('.nav-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Приховати всі слайди
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Показати поточний слайд
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        resetAutoSlide(); // Перезапустити автоскрол
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        resetAutoSlide(); // Перезапустити автоскрол
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Додати обробники подій для кнопок
    nextTestBtn.addEventListener('click', nextSlide);
    prevTestBtn.addEventListener('click', prevSlide);

    // Зупинити автопрокрутку при наведенні на слайдер
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Ініціалізація
    showSlide(0);
    startAutoSlide();
    
    // Newsletter Form Functionality
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const messageDiv = document.getElementById('newsletterMessage');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Симуляція відправки форми (тут буде реальний запит на сервер)
        simulateSubscription(email);
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type = 'success') {
        messageDiv.textContent = message;
        messageDiv.className = `newsletter-message ${type}`;
        
        // Автоматично приховати повідомлення через 5 секунд
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 5000);
    }

    function simulateSubscription(email) {
        // Показати повідомлення про завантаження
        showMessage('Subscribing...', 'loading');
        
        // Симулювати затримку запиту
        setTimeout(() => {
            // Успішна підписка
            showMessage('🎉 Thank you for subscribing! You will receive our latest updates soon.', 'success');
            emailInput.value = '';
            
            // Додати email до localStorage (опціонально)
            saveSubscription(email);
        }, 1500);
    }

    function saveSubscription(email) {
        // Зберегти підписку в localStorage
        let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        }
    }

    // Додатковий функціонал: валідація в реальному часі
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = '#000000ff';
        } else {
            emailInput.style.borderColor = '';
        }
    });
});