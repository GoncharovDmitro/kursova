document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateContactForm()) {
                alert('Дякуємо! Ваше повідомлення успішно надіслано.');
                contactForm.reset();
                [name, email, subject, message].forEach(input => {
                    input.parentElement.classList.remove('success');
                });
            } else {
                alert('Будь ласка, виправте помилки у формі.');
            }
        });

        function validateContactForm() {
            let isValid = true;
            if (isEmpty(name)) {
                showError(name, 'Будь ласка, введіть ваше ім\'я');
                isValid = false;
            } else {
                showSuccess(name);
            }
            if (isEmpty(email)) {
                showError(email, 'Будь ласка, введіть ваш email');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Введіть коректний email');
                isValid = false;
            } else {
                showSuccess(email);
            }

            if (isEmpty(subject)) {
                showError(subject, 'Будь ласка, введіть тему повідомлення');
                isValid = false;
            } else {
                showSuccess(subject);
            }

            if (isEmpty(message)) {
                showError(message, 'Повідомлення не може бути порожнім');
                isValid = false;
            } else {
                showSuccess(message);
            }
            
            return isValid;
        }

        function isEmpty(inputElement) {
            return inputElement.value.trim() === '';
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(String(email).toLowerCase());
        }

        function showError(inputElement, message) {
            const inputGroup = inputElement.parentElement;
            inputGroup.className = 'input-group error';
            const errorElement = inputGroup.querySelector('.error-message');
            errorElement.innerText = message;
        }

        function showSuccess(inputElement) {
            const inputGroup = inputElement.parentElement;
            inputGroup.className = 'input-group success';
            const errorElement = inputGroup.querySelector('.error-message');
            errorElement.innerText = '';
        }
    }

});