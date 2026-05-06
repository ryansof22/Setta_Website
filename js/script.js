// js/script.js

// 1. Fungsi Greeting (Referensi: w3schools.com/js/js_date_methods.asp)
function updateGreeting() {
    const time = new Date().getHours();
    let greeting = "";
    if (time < 11) { greeting = "Selamat Pagi"; }
    else if (time < 15) { greeting = "Selamat Siang"; }
    else if (time < 19) { greeting = "Selamat Sore"; }
    else { greeting = "Selamat Malam"; }
    
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) greetingElement.innerText = greeting;
}

// 2. Validasi Login (Pop-up/Alert)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        // Simulasi validasi sederhana sesuai soal
        if (email === "admin@ut.ac.id" && pass === "12345") {
            window.location.href = "dashboard.html";
        } else {
            alert("Email/password yang anda masukkan salah"); // Referensi: w3schools.com/js/js_popup.asp
        }
    });
}

// Jalankan greeting jika berada di halaman dashboard
if (window.location.pathname.includes("dashboard.html")) {
    updateGreeting();
}