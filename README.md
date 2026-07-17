# DisasterConnect — Platform Koordinasi Tanggap Bencana Nasional

DisasterConnect adalah platform tanggap darurat bencana terintegrasi yang dirancang untuk menjembatani komunikasi dan koordinasi antara korban bencana, relawan, donatur, dan petugas BPBD (Badan Penanggulangan Bencana Daerah) secara real-time.

Aplikasi ini dibangun menggunakan teknologi modern berbasis React dan Vite untuk memberikan performa yang cepat, antarmuka yang intuitif, serta keandalan saat situasi darurat.

---

## Fitur Utama

### 1. Laporan Bencana Real-Time
Memungkinkan masyarakat melaporkan bencana secara instan lengkap dengan detail kejadian, tingkat urgensi, perkiraan korban terdampak, kebutuhan mendesak (makanan, medis, logistik), serta koordinat lokasi secara presisi.

### 2. AI Priority Engine (Algoritma Prioritas Otomatis)
Sistem cerdas yang secara dinamis menganalisis dan menghitung skor prioritas (0 - 100) untuk setiap laporan yang masuk. Penghitungan didasarkan pada:
*   Tingkat Urgensi bencana (bobot 40%)
*   Jumlah Jiwa terdampak (bobot 35%)
*   Waktu Tunggu respons sejak pelaporan (bobot 25%)
*   Bonus Status Terisolasi (+10 skor jika area terputus akses jalan)

### 3. Peta Situasi Interaktif
Menggunakan visualisasi peta interaktif berbasis Leaflet.js untuk menampilkan klaster wilayah bencana secara visual. Membantu petugas BPBD melihat sebaran area krisis dan mendistribusikan bantuan dengan lebih efektif.

### 4. Mode Offline & SMS Darurat
Dalam kondisi krisis di mana jaringan internet terputus, DisasterConnect menyediakan panduan format pesan SMS Darurat gratis 24 jam untuk tetap terhubung dengan BPBD:
```text
BUTUH [LOKASI] [KEBUTUHAN] [JUMLAH]
Contoh: BUTUH Desa Maju Banjir 45
```

### 5. Kolaborasi Relawan & Donatur
*   Portal Relawan: Pendaftaran dan penugasan relawan untuk menangani titik bencana tertentu.
*   Portal Donatur: Transparansi penyaluran donasi uang maupun barang bagi korban krisis.

### 6. Dashboard Admin & Analitik BPBD
Pusat kendali petugas untuk memantau visualisasi statistik bencana dengan chart interaktif, mengelola status penanganan (Pending, In-Progress, Resolved), mengedit persediaan logistik, dan mengalokasikan relawan.

---

## Teknologi yang Digunakan

*   Core: React 19, JavaScript (ES6+), Vite (Build tool)
*   Styling & Icons: Tailwind CSS, Lucide React Icons
*   Peta & Geolocation: Leaflet, React Leaflet, React Leaflet Markercluster
*   Visualisasi Data (Grafik): Chart.js, React Chartjs 2, Recharts
*   Routing: React Router DOM (v7)
*   State Management: React Context API

---

## Cara Menjalankan Proyek Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal Node.js di komputer Anda.

### Langkah-Langkah

1.  **Unduh / Clone Repositori**
    ```bash
    git clone <url-repositori-anda>
    cd disastes
    ```

2.  **Instalasi Dependensi**
    Jalankan perintah ini di terminal untuk menginstal pustaka yang diperlukan:
    ```bash
    npm install
    ```

3.  **Jalankan Server Pengembangan (Dev Server)**
    ```bash
    npm run dev
    ```

4.  **Akses di Browser**
    Buka peramban (browser) Anda dan akses alamat berikut:
    ```text
    http://localhost:5173
    ```

---

## Akses Uji Coba Admin (BPBD)

Untuk masuk ke halaman manajemen administrator, silakan gunakan kredensial berikut pada halaman login:
*   **Username**: admin
*   **Password**: bpbd2024

---

## Struktur Folder Proyek
```text
disastes/
├── public/              # Aset statis public
├── src/
│   ├── assets/          # File gambar dan aset visual
│   ├── components/      # Komponen global (Navbar, Toast, dll)
│   ├── context/         # Penyimpanan state global (AppContext)
│   ├── data/            # Data tiruan (mockData) untuk simulasi
│   ├── pages/           # Halaman utama aplikasi (Home, Peta, Dashboard, dll)
│   ├── App.jsx          # Konfigurasi rute & layout utama
│   └── main.jsx         # Entry point aplikasi React
├── package.json         # Daftar dependensi & script runner
└── tailwind.config.js   # Konfigurasi Tailwind CSS
```
