document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    if (registerForm) {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('password-confirm');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateRegisterForm()) {
                alert('🎉 Реєстрація успішна! Ласкаво просимо, ' + username.value + '!');
                window.location.href = 'login.html';
            }
        });

        function validateRegisterForm() {
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();
            const passwordConfirmValue = passwordConfirm.value.trim();
            
            let isValid = true;

            // 1. Перевірка імені
            if (usernameValue === '') {
                showError(username, 'Поле "Повне ім\'я" не може бути порожнім');
                isValid = false;
            } else {
                showSuccess(username);
            }

            // 2. Перевірка Email
            if (emailValue === '') {
                showError(email, 'Поле "Email" не може бути порожнім');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(email, 'Введіть коректний Email');
                isValid = false;
            } else {
                showSuccess(email);
            }

            // 3. Перевірка Пароля
            if (passwordValue === '') {
                showError(password, 'Поле "Пароль" не може бути порожнім');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showError(password, 'Пароль має бути не менше 6 символів');
                isValid = false;
            } else {
                showSuccess(password);
            }

            // 4. Перевірка Підтвердження Пароля
            if (passwordConfirmValue === '') {
                showError(passwordConfirm, 'Підтвердіть ваш пароль');
                isValid = false;
            } else if (passwordValue !== passwordConfirmValue) {
                showError(passwordConfirm, 'Паролі не збігаються');
                isValid = false;
            } else {
                showSuccess(passwordConfirm);
            }
            
            return isValid;
        }
    }

    if (loginForm) {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
                        if (validateLoginForm()) {
                alert('✅ Вхід успішний! Вітаємо з поверненням!');
                window.location.href = 'index.html'; 
            }
        });

        function validateLoginForm() {
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();
            let isValid = true;
            // 1. Перевірка Email
            if (emailValue === '') {
                showError(email, 'Будь ласка, введіть ваш Email');
                isValid = false;
            } else {
                showSuccess(email);
            }
            // 2. Перевірка Пароля
            if (passwordValue === '') {
                showError(password, 'Будь ласка, введіть ваш пароль');
                isValid = false;
            } else {
                showSuccess(password);
            }

            return isValid;
        }
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
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    }

});