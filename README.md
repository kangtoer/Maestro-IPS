# IPS Maestro™ 🎓🌋
### Platform Edukasi Digital & Asisten Kurikulum Merdeka Guru IPS SMP
> **Inovasi Pembelajaran Digital oleh Catur Pamungkas, S.Pd.,Gr.**  
> **Portal Web Terafiliasi:** [toer.my.id](https://toer.my.id) • **Saluran Komunitas:** [Saluran WhatsApp Resmi](https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27)

---

## 🌟 Tentang IPS Maestro
**IPS Maestro™** adalah produk aplikasi pendidikan komprehensif yang dirancang untuk memberdayakan guru Ilmu Pengetahuan Sosial (IPS) jenjang SMP di seluruh Indonesia. Menggabungkan pedagogi Kurikulum Merdeka dengan kecerdasan buatan terdepan Google Gemini, aplikasi ini membantu menyusun:
- **Modul Ajar (RPM) & RPP Berdiferensiasi**
- **LKPD Interaktif & Estetik** (lengkap dengan ilustrasi visual)
- **Silabus, PROTA, dan PROMES** Otomatis
- **Bank Soal HOTS** (C4–C6, Pilihan Ganda Kompleks, Menjodohkan, Esai) dari materi teks maupun dokumen PDF/Word
- **Jurnal Harian Guru & Analisis Penilaian Remedial/Pengayaan**
- **E-Rapor & Cetak Dokumen Word (.doc/.docx) serta PDF**

---

## 🚀 Mengapa 100% Gratis & Bebas Biaya? (Konsep BYOK)
Aplikasi ini dibangun menggunakan arsitektur **Bring Your Own Key (BYOK)**:
1. **$0 Biaya Server bagi Pemilik Repositori:**
   Aplikasi dapat di-deploy sebagai web statis di **GitHub Pages** atau **Vercel** tanpa membutuhkan server backend berbayar atau database tersentralisasi.
2. **Kuota Mandiri Tiap Pengguna:**
   Setiap guru memasukkan Kunci API Gemini gratis masing-masing (didapat secara cuma-cuma dari [Google AI Studio](https://aistudio.google.com/apikey)). Kuota Google AI Studio memberikan hingga 15 Request Per Menit (RPM) dan 1 juta token per hari gratis selamanya.
3. **Privasi & Keamanan 100% Terjamin:**
   Kunci API pengguna **hanya tersimpan secara lokal di peramban (Local Storage)** perangkat masing-masing, dan langsung berkomunikasi ke endpoint resmi Google (`generativelanguage.googleapis.com`). Repositori publik Anda tidak menyimpan rahasia apapun sehingga **tidak akan pernah terkena revoke/bocor kunci**.

---

## 📦 PANDUAN DEPLOY GRATIS KE GITHUB PAGES (Opsi Utama)

Aplikasi ini sudah menyertakan file workflow resmi di `.github/workflows/static.yml` yang siap menjalankan build dan deploy otomatis.

### Langkah 1: Push Repositori ke GitHub Anda
Jika Anda belum mengunggah proyek ini ke akun GitHub pribadi Anda:
```bash
git init
git add .
git commit -m "feat: IPS Maestro Kurikulum Merdeka with BYOK"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/ips-maestro.git
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages via GitHub Actions
1. Buka repositori Anda di situs **[GitHub.com](https://github.com)**.
2. Masuk ke menu **Settings** (ikon roda gigi di pojok kanan atas repositori).
3. Di bilah navigasi sebelah kiri, klik menu **Pages**.
4. Pada bagian **Build and deployment > Source**, ubah pilihan dropdown menjadi **GitHub Actions**.
5. Klik simpan. GitHub Actions akan otomatis meng-compile aplikasi dan merilis situs Anda di alamat:
   ```
   https://USERNAME-ANDA.github.io/ips-maestro/
   ```

---

## ⚡ PANDUAN DEPLOY KE VERCEL (Alternatif 1 Menit)

Jika Anda menginginkan URL yang lebih pendek dan CDN global yang sangat cepat:
1. Kunjungi **[vercel.com](https://vercel.com)** dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..." > "Project"**.
3. Pilih repositori `ips-maestro` Anda dari daftar, lalu klik **Import**.
4. Pengaturan framework akan otomatis terdeteksi sebagai **Vite** (Build command: `npm run build`, Output: `dist`).
5. **PENTING:** Anda **TIDAK PERLU** menambahkan *Environment Variable* `GEMINI_API_KEY` di dasbor Vercel karena pengguna akan memasukkan kunci mereka sendiri di browser.
6. Klik tombol **Deploy**. Dalam 30 detik web aplikasi Anda sudah live!

---

## 🌐 Menghubungkan ke Custom Domain `toer.my.id`

Untuk membuat alamat profesional seperti `https://maestro.toer.my.id`:

### 1. Tambahkan DNS Record pada Pengelola Domain Anda (Cloudflare / cPanel / Niagahoster)
| Tipe (Type) | Nama Host (Subdomain) | Target / Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **CNAME** | `maestro` | `USERNAME.github.io` | Jika deploy di GitHub Pages |
| **CNAME** | `maestro` | `cname.vercel-dns.com` | Jika deploy di Vercel |

### 2. Daftarkan di Pengaturan Hosting
- **Di GitHub Pages:** Masuk ke *Settings > Pages > Custom domain*, ketik `maestro.toer.my.id`, lalu centang **Enforce HTTPS**.
- **Di Vercel:** Masuk ke *Project Settings > Domains*, tambahkan `maestro.toer.my.id`. Sertifikat SSL gratis akan otomatis diterbitkan.

---

## 🔑 Panduan untuk Guru & Pengguna (Cara Memakai)

Setelah web aplikasi aktif, bagikan tautan kepada rekan-rekan guru:
1. Buka situs web aplikasi IPS Maestro.
2. Klik tombol status **"Atur Kunci API (BYOK)"** di bar bagian atas atau menu **Pengaturan**.
3. Klik tautan **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)** untuk membuat kunci API Gemini gratis (hanya butuh 1 menit dengan akun Google biasa maupun akun `@guru.smp.belajar.id`).
4. Tempelkan kunci API ke aplikasi dan tekan **"Uji & Simpan Kunci"**.
5. Seluruh modul pembuatan perangkat ajar Kurikulum Merdeka langsung aktif dan dapat digunakan sepuasnya tanpa batas!

---

## 💻 Menjalankan di Komputer Lokal (Development)

Jika Anda ingin memodifikasi atau mengembangkan fitur lebih lanjut secara lokal:

```bash
# 1. Install dependensi
npm install

# 2. Jalankan server lokal
npm run dev
```
Buka browser pada alamat: `http://localhost:3000`

---

## 👨‍🏫 Profil Pengembang & Hak Cipta
- **Pengembang:** Catur Pamungkas, S.Pd.,Gr.
- **Profesi:** Guru IPS SMP • Praktisi Pembelajaran Kurikulum Merdeka
- **Website Resmi:** [toer.my.id](https://toer.my.id)
- **Komunitas & Layanan:** [Saluran WhatsApp Resmi IPS Maestro](https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27)

*Hak Cipta © 2024–2026 Catur Pamungkas, S.Pd.,Gr. Produk Inovasi Pendidikan Terbuka untuk Memajukan Mutu Pendidikan Indonesia.* 🇮🇩
