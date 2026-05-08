# IG Unfollow Checker 🕵️‍♂️

**IG Unfollow Checker** adalah aplikasi web berbasis React yang memungkinkan kamu untuk melihat siapa saja yang tidak *follow back* akun Instagram-mu, langsung dari browser, dengan jaminan **privasi 100%**. 

Aplikasi ini tidak membutuhkan login Instagram dan tidak mengirimkan data ke server apa pun. Semua proses membaca data dan kalkulasi dilakukan sepenuhnya secara lokal di dalam memori browser kamu.

## ✨ Fitur Utama

- 🔒 **100% Client-Side Privacy**: Tidak perlu login Instagram. Cukup masukkan file *Data Export* resmi dari Instagram (JSON format) ke dalam aplikasi.
- 📁 **Dual Input Mode**: Mendukung Drag & Drop untuk upload folder `followers_and_following` sekaligus, atau upload file `followers_1.json` dan `following.json` secara terpisah.
- 📊 **Dashboard Statistik & Kategori**:
  - **Not Following Back (Unfollowers)**: Orang yang kamu follow, tapi tidak follow back.
  - **Mutual**: Orang yang saling follow.
  - **Fans**: Orang yang follow kamu, tapi kamu tidak follow back.
- 👁️‍🗨️ **Mark as Deactivated / Hidden**: Menyembunyikan akun yang sudah dinonaktifkan (deactive) atau dihapus dari Instagram agar tidak terus muncul di daftar *Unfollowers*. Data preferensi ini tersimpan secara permanen di Local Storage browser.
- 🗑️ **Mark as Unfollowed & Export Updated JSON**: Setelah kamu meng-unfollow seseorang di Instagram, kamu bisa menandainya di aplikasi. Kamu juga bisa mengunduh file `following.json` baru yang sudah diperbarui (menghapus akun-akun tersebut) untuk mencegahnya muncul lagi di masa depan.
- 📤 **Export Data Mudah**: Copy data ke clipboard, atau download laporannya dalam bentuk file `.txt` dan `.csv`.
- 🎨 **Modern UI/UX**: Desain antarmuka *Dark Mode* yang minimalis dan responsif menggunakan Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: JavaScript (ES6+)

## 🚀 Cara Menjalankan Project (Local Development)

### Prasyarat
Pastikan [Node.js](https://nodejs.org/) sudah terinstal di komputermu.

### Instalasi & Menjalankan

1. Buka terminal/command prompt dan arahkan ke folder project ini.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Buka alamat `http://localhost:5173` di browser kesayanganmu.

## 📦 Cara Mendapatkan Data Export Instagram

Untuk menggunakan aplikasi ini, kamu memerlukan file data asli dari akun Instagram-mu:
1. Buka aplikasi Instagram atau Instagram Web.
2. Masuk ke **Settings > Your activity > Download your information** (Pengaturan > Aktivitas Anda > Unduh informasi Anda).
3. Buat permintaan pengunduhan baru (Request a download).
4. Pilih format **JSON** (Pastikan kamu memilih format JSON, bukan HTML).
5. Tunggu hingga Instagram mengirimkan email/notifikasi bahwa datamu siap diunduh.
6. Setelah diunduh, ekstrak file ZIP-nya dan temukan folder bernama `followers_and_following`.
7. Buka web **IG Unfollow Checker** dan *drag-and-drop* folder tersebut!

## 📝 Catatan
Aplikasi ini berjalan murni sebagai *Static Client Application*. Jika kamu menggunakan fitur **Mark as Deactivated** atau **Mark as Unfollowed**, ingat bahwa status tersebut disimpan di browser. Menghapus *cache* atau *local storage* browser akan me-reset daftar tersebut (kecuali kamu sudah mengunduh versi `following.json` yang baru).
