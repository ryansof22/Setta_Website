// ==========================================
// 1. FUNGSI GREETING (Halaman Dashboard)
// ==========================================
function updateGreeting() {
    const greetingElement = document.getElementById("greeting");
    if (!greetingElement) return;

    const time = new Date().getHours(); // Referensi: w3schools.com/js/js_date_methods.asp
    let greetingText = "";

    if (time >= 5 && time < 11) {
        greetingText = "Selamat Pagi";
    } else if (time >= 11 && time < 15) {
        greetingText = "Selamat Siang";
    } else if (time >= 15 && time < 19) {
        greetingText = "Selamat Sore";
    } else {
        greetingText = "Selamat Malam";
    }

    const namaUser = sessionStorage.getItem("namaUser") || "Pengguna";
    greetingElement.innerText = `${greetingText}, ${namaUser}`;
}

// ==========================================
// 2. LOGIKA LOGIN (Halaman Index)
// ==========================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("email").value;
        const passInput = document.getElementById("password").value;

        // Mencari pengguna di data.js[cite: 3]
        const user = dataPengguna.find(u => u.email === emailInput && u.password === passInput);

        // Di dalam js/script.js (Bagian Logika Login)
if (user) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("namaUser", user.nama);
    // Ubah jalur menjadi seperti ini:
    window.location.href = "html/dashboard.html"; 
} else {
            // Feedback error sesuai soal
            alert("email/password yang anda masukkan salah");
        }
    });
}

// ==========================================
// 3. LOGIKA TRACKING (Halaman Tracking)
// ==========================================
function cariTracking() {
    const noDO = document.getElementById("noDO").value;
    const data = dataTracking[noDO]; // Mengambil dari data.js[cite: 3]
    const hasilContainer = document.getElementById("hasilTracking");

    if (data) {
        hasilContainer.style.display = "block";
        document.getElementById("namaMhs").innerText = "Nama Mahasiswa: " + data.nama;
        document.getElementById("statusKirim").innerText = "Status: " + data.status;
        
        const tabel = document.getElementById("tabelPerjalanan");
        tabel.innerHTML = "<tr><th>Waktu</th><th>Keterangan</th></tr>"; // Reset tabel

        data.perjalanan.forEach(step => {
            const row = `<tr>
                <td>${step.waktu}</td>
                <td>${step.keterangan}</td>
            </tr>`;
            tabel.innerHTML += row;
        });
    } else {
        alert("Nomor DO tidak ditemukan!");
        hasilContainer.style.display = "none";
    }
}

// ==========================================
// 4. MANIPULASI DOM STOK (Halaman Stok)
// ==========================================
function tampilkanStok() {
    const tableBody = document.getElementById("stokTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Bersihkan tabel
    dataBahanAjar.forEach(item => {
        const row = `<tr>
            <td>${item.kodeBarang}</td>
            <td>${item.namaBarang}</td>
            <td>${item.jenisBarang}</td>
            <td>${item.stok}</td>
            <td><button onclick="tambahStok('${item.kodeBarang}')">Tambah</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function tambahStok(kode) {
    const item = dataBahanAjar.find(i => i.kodeBarang === kode);
    if (item) {
        item.stok += 1; // Manipulasi data sederhana
        tampilkanStok(); // Refresh tampilan tabel
        alert(`Stok ${item.namaBarang} berhasil ditambah!`);
    }
}

// ==========================================
// 5. INISIALISASI HALAMAN
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("dashboard.html")) {
        updateGreeting();
    }
    
    if (path.includes("stok.html")) {
        tampilkanStok();
    }
});
