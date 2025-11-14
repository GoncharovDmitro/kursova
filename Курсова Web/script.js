document.addEventListener('DOMContentLoaded', function() {
    const destinationsData = [
        {
            img: "pic/w1.webp",
            rating: "4.8",
            title: "Пляж Рай, острів Бантаян",
            price: "$550.16",
            location: "Рим, Італія"
        },
        {
            img: "pic/w2.webp",
            rating: "4.5",
            title: "Океан повний Кольорів",
            price: "$20.99",
            location: "Мальдіви"
        },
        {
            img: "pic/w3.webp",
            rating: "5.0",
            title: "Вид на Гори, Над Хмарами",
            price: "$150.99",
            location: "Об'єднані Арабські Емірати"
        },
        {
            img: "pic/w4.webp",
            rating: "4.7",
            title: "Тропічний Рай, Пальмовий Пляж",
            price: "$420.50",
            location: "Таїланд"
        },
        {
            img: "pic/w5.webp",
            rating: "4.9",
            title: "Альпійський Відпочинок, Снігова Долина",
            price: "$320.75",
            location: "Швейцарія"
        },
        {
            img: "pic/w6.webp",
            rating: "4.6",
            title: "Міські Вогні, Центр Міста",
            price: "$280.30",
            location: "Нью-Йорк, США"
        },
        {
            img: "pic/w7.webp",
            rating: "4.8",
            title: "Історичне Місце, Стародавні Руїни",
            price: "$190.25",
            location: "Греція"
        }
    ];
    const destinationsContainer = document.querySelector('.destinations-cards');
    function createCardHTML(cardData) {
        return `
            <div class="destination-card">
                <div class="card-image">
                    <img src="${cardData.img}" alt="${cardData.title}">
                    <div class="card-rating">${cardData.rating} ★</div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${cardData.title}</h3>
                        <div class="card-price">${cardData.price}</div>
                    </div>
                    <p class="card-location">${cardData.location}</p>
                </div>
            </div>
        `;
    }

    function generateAllCards() {
        if (destinationsContainer) {
            let allCardsHTML = ""; 
            destinationsData.forEach(card => {
                allCardsHTML += createCardHTML(card); 
            });

            destinationsContainer.innerHTML = allCardsHTML;
        }
    }
    generateAllCards();
    const destinationsSection = document.querySelector('.destinations');
    const exploreBtn = document.querySelector('.explore-world-btn');
    if (exploreBtn && destinationsSection) {
        exploreBtn.addEventListener('click', function() {
            window.scrollTo({
                top: destinationsSection.offsetTop - 100, 
                behavior: 'smooth' 
            });
        });
    }
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault(); 
            
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

    const watchDemoBtn = document.querySelector('.btn-watch-demo');
    const demoModal = document.getElementById('demoModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (watchDemoBtn && demoModal && closeModalBtn) {

        function openModal() {
            demoModal.style.display = 'block';
        }
        function closeModal() {
            demoModal.style.display = 'none';
        }
        watchDemoBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', function(e) {
            if (e.target == demoModal) {
                closeModal();
            }
        });
    }
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
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
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
    updateButtons();
    window.addEventListener('resize', function() {
        currentPosition = slider.scrollLeft;
        updateButtons();
    });

    const slides = document.querySelectorAll('.testimonial-slide');
    const prevTestBtn = document.querySelector('.nav-prev');
    const nextTestBtn = document.querySelector('.nav-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        resetAutoSlide();
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        resetAutoSlide(); 
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    nextTestBtn.addEventListener('click', nextSlide);
    prevTestBtn.addEventListener('click', prevSlide);
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    showSlide(0);
    startAutoSlide();

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
        simulateSubscription(email);
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type = 'success') {
        messageDiv.textContent = message;
        messageDiv.className = `newsletter-message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 5000);
    }

    function simulateSubscription(email) {
        showMessage('Subscribing...', 'loading');

        setTimeout(() => {
            showMessage('🎉 Thank you for subscribing! You will receive our latest updates soon.', 'success');
            emailInput.value = '';
            saveSubscription(email);
        }, 1500);
    }

    function saveSubscription(email) {
        let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        }
    }

    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = '#000000ff';
        } else {
            emailInput.style.borderColor = '';
        }
    });
});