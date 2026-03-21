let isLogin = true;

function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('authTitle').innerText = isLogin ? "Welcome Back" : "Create Account";
    document.getElementById('authBtn').innerText = isLogin ? "Login" : "Sign Up";
    document.getElementById('toggleMsg').innerHTML = isLogin ? "Don't have an account? <span>Sign Up</span>" : "Already have an account? <span>Login</span>";
}

document.getElementById('authBtn').onclick = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const endpoint = isLogin ? '/api/login' : '/api/signup';
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        if (isLogin) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboard.html';
        } else {
            alert("Signup successful! Please login.");
            toggleAuth();
        }
    } else {
        alert(data.message);
    }
};