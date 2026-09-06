let users = JSON.parse(localStorage.getItem('users')) || [];

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    hideError('login-error');
    hideError('register-error');
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    el.innerText = message;
    el.style.display = 'block';
}

function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!usernameInput) {
        showError('register-error', 'Username or Email cannot be empty.');
        return;
    }

    if (usernameInput.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usernameInput)) {
            showError('register-error', 'Invalid email format. Please enter a valid email.');
            return;
        }
    }

    const userExists = users.some(user => user.username === usernameInput);
    if (userExists) {
        showError('register-error', 'Username or email already exists.');
        return;
    }

    const hasNumber = /\d/.test(password);
    if (password.length < 8 || !hasNumber) {
        showError('register-error', 'Password must be at least 8 characters long and contain 1 number.');
        return;
    }

    const newUser = { username: usernameInput, password: password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    switchView('login-view');
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showError('login-error', 'Please fill in all fields.');
        return;
    }

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        sessionStorage.setItem('loggedInUser', foundUser.username);
        document.getElementById('logged-in-user').innerText = foundUser.username;
        switchView('dashboard-view');
    } else {
        showError('login-error', 'Invalid username or password.');
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    sessionStorage.removeItem('loggedInUser');
    switchView('login-view');
});

window.onload = function() {
    const activeSession = sessionStorage.getItem('loggedInUser');
    if (activeSession) {
        document.getElementById('logged-in-user').innerText = activeSession;
        switchView('dashboard-view');
    } else {
        switchView('login-view');
    }
};