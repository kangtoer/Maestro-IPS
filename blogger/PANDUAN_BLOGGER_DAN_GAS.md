# 📘 PANDUAN LENGKAP: Menjalankan IPS Maestro di Blogger & Google Apps Script (GAS)

Dokumen ini berisi panduan lengkap 100% siap pakai untuk mengonversi dan menjalankan aplikasi **IPS Maestro** (Karya **Catur Pamungkas, S.Pd.,Gr.** - [toer.my.id](https://toer.my.id)) di:
1. **Google Apps Script (GAS)** sebagai Web App mandiri berbasis Google Drive.
2. **Blogger (Blogspot)** baik sebagai halaman mandiri (*Standalone Page*) maupun sebagai sematan artikel (*Embed Post*).

---

## 🅰️ CARA 1: Menjalankan di Google Apps Script (GAS)

GAS memungkinkan aplikasi berjalan di infrastruktur Google Cloud gratis tanpa server tambahan.

### Berkas yang Digunakan:
- `gas/Code.gs` (Backend Engine)
- `gas/Index.html` (Frontend Web App)

### Langkah Pemasangan:
1. Buka [https://script.google.com/](https://script.google.com/) dan klik **Project Baru** (*New Project*).
2. Beri nama proyek: `IPS Maestro Web App`.
3. Buka file `Code.gs`, hapus kodenya, dan ganti dengan isi dari file **`gas/Code.gs`**.
4. Klik tombol **+** di panel kiri > pilih **HTML** > beri nama: **`Index`**.
5. Hapus kode bawaan dan ganti dengan isi dari file **`gas/Index.html`**.
6. Klik **Deploy** (Pojok kanan atas) > **New Deployment** (*Penerapan Baru*).
7. Pilih jenis **Web App**:
   - **Execute as**: `User accessing the web app` (atau `Me`).
   - **Who has access**: `Anyone` (Siapa saja).
8. Klik **Deploy** dan berikan izin otorisasi akun Google.
9. Salin URL Web App yang berakhiran `/exec`.

---

## 🅱️ CARA 2: Menjalankan Langsung di Blogger (Tanpa Server Eksternal)

Jika Anda ingin aplikasi berjalan langsung di dalam halaman blog Blogger Anda:

### Berkas yang Digunakan:
- `blogger/Blogger_Page_Template.html`

### Langkah Pemasangan:
1. Buka dasbor **[Blogger.com](https://www.blogger.com)**.
2. Klik menu **Halaman** (*Pages*) > Klik **+ Halaman Baru** (*New Page*).
3. Beri Judul Halaman: `IPS Maestro - Aplikasi RPP & Administrasi Guru IPS SMP`.
4. Ubah mode editor ke **Tampilan HTML** (*HTML View*).
5. Salin seluruh isi berkas **`blogger/Blogger_Page_Template.html`** dan tempelkan (*paste*) ke editor.
6. Pada pengaturan di sisi kanan:
   - Di bagian *Komentar Pembaca*, pilih **Jangan izinkan, sembunyikan yang ada**.
7. Klik **Publikasikan** (*Publish*).
8. **Selesai!** Pengunjung blog Anda dapat langsung menyusun RPP, LKPD, Soal HOTS, dan konsultasi AI langsung di blog Anda.

---

## 🅲 CARA 3: Memasang Melalui Iframe di Postingan Blogger

Jika Anda ingin menyematkan Web App GAS / GitHub Pages ke dalam artikel postingan:

### Berkas yang Digunakan:
- `blogger/Blogger_Iframe_Embed.html`

### Langkah Pemasangan:
1. Buat postingan baru atau buka postingan lama di Blogger.
2. Beralih ke **Tampilan HTML**.
3. Salin isi berkas **`blogger/Blogger_Iframe_Embed.html`**.
4. Ganti teks `GANTI_DENGAN_URL_WEB_APP_GAS_ATAU_GITHUB_PAGES_ANDA` dengan URL Web App Anda.
5. Publikasikan postingan.

---

## 🌟 CARA 4: Memasang Landing Page Lengkap & Mewah di Blogger (Rekomendasi Utama)

Jika Anda ingin membuat satu Halaman Utama Khusus (*Dedicated Full Landing Page*) yang memuat Hero Banner, Pengenalan Fitur Lengkap, Panduan Cepat, Profil Resmi toer.my.id, serta Live Frame aplikasi:

### Berkas yang Digunakan:
- `blogger/Landing_Page_Blogger.html`

### Langkah Pemasangan:
1. Buka dasbor **[Blogger.com](https://www.blogger.com)** > Pilih **Halaman** (*Pages*) > Klik **+ Halaman Baru**.
2. Beri Judul: `IPS Maestro - Platform AI Administrasi Guru IPS SMP`.
3. Alihkan mode editor ke **Tampilan HTML** (*HTML View*).
4. Salin seluruh isi dari berkas **`blogger/Landing_Page_Blogger.html`** dan tempelkan ke editor Blogger.
5. Cari teks `GANTI_DENGAN_URL_WEB_APP_ANDA` (terdapat di tombol & iframe) lalu ubah menjadi URL Web App Anda (misal: URL GAS `/exec` atau URL GitHub Pages).
6. Di menu kanan: Setel *Komentar Pembaca* ke **Jangan izinkan, sembunyikan yang ada**.
7. Klik **Publikasikan** (*Publish*).

---

## 🌟 CARA 5: Memasang Tema Blogger XML Statis Full Homepage (Aplikasi Utama di Beranda Blog)

Jika Anda ingin mengubah seluruh tampilan blog Blogger Anda menjadi **Website & Web App Statis IPS Maestro Resmi** di halaman depan/beranda (`home page`):

### Berkas yang Digunakan:
- `blogger/Tema_Blogger_Statis_Homepage.xml`

### Langkah Pemasangan:
1. Buka dasbor **[Blogger.com](https://www.blogger.com)** dan pilih blog Anda.
2. Di menu bilah kiri, klik menu **Tema** (*Theme*).
3. Klik tombol panah ke bawah di sebelah tombol *Sesuaikan* (*Customize*) > pilih **Edit HTML**.
4. Hapus seluruh kode tema XML yang ada di editor Blogger.
5. Buka berkas **`blogger/Tema_Blogger_Statis_Homepage.xml`**, salin (**Copy**) seluruh kodenya, lalu tempelkan (**Paste**) ke editor HTML Tema Blogger.
6. Klik ikon **Simpan** (*Save*) di pojok kanan atas editor.
7. **Selesai!** Saat Anda membuka alamat blog Anda (misal `https://namabloganda.blogspot.com`), halaman utama (Homepage) blog Anda akan langsung tampil sebagai platform web app **IPS Maestro Enterprise** dengan UI modern, responsif, dan siap digunakan oleh guru IPS di seluruh Indonesia.

---

## 📞 Informasi & Komunitas
- **Pengembang**: Catur Pamungkas, S.Pd.,Gr.
- **Website Resmi**: [https://toer.my.id](https://toer.my.id)
- **Saluran WhatsApp Guru IPS SMP**: [https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27](https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27)

