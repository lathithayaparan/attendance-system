// API Base URL (Change if needed)
const API_URL = "http://localhost:8080";  

// Login Function
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        document.getElementById("error-msg").innerText = "Please enter username and password!";
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);  
        localStorage.setItem("username", username);
        window.location.href = "home.html";  
    } else {
        document.getElementById("error-msg").innerText = "Invalid username or password!";
    }
}
