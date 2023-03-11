// Initialize the users array if it doesn't already exist in local storage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Add a user to the array
function registerUser(username, password) {
    if(document.getElementById('passwordInput').value === 
       document.getElementById('confirmPasswordInput').value) {
        const users = JSON.parse(localStorage.getItem('users'));
        if(!users.find(u => u.username === username)) {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            login(username, password);
            window.location.href = 'index.html';
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

// Check if the user is logged in
function isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser !== null;
}

function getCurrentUsername() {
    return JSON.parse(localStorage.getItem('currentUser')).username;
}

function displayCurrentUsername() {
    document.getElementById('username-placeholder').innerHTML = getCurrentUsername();
}

// Log in a user
function login(username, password) {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
        return true;
    } else {
        return false;
    }
}

// Log out the current user
function logout() {
    localStorage.removeItem('currentUser');
    checkLogin();
}

// Redirect to login page if user is not logged in
function checkLogin() {
    if (!isLoggedIn()) {
        if (window.location.href.indexOf('login.html') === -1) {
            window.location.href = 'login.html';
        }
    }
    else {
        if (window.location.href.indexOf('index.html') === -1) {
            window.location.href = 'index.html';
        }
    }
}