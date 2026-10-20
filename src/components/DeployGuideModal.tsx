import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  GitFork,
  Cloud,
  Globe,
  Key,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Terminal,
  Server,
  Layers,
  Zap,
  CheckCircle2,
  FileCode,
  ArrowRight,
  BookOpen
} from "lucide-react";

export interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "github-pages" | "vercel" | "custom-domain" | "byok-guide"
  >("overview");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  if (!isOpen) return null;

  const githubActionsCode = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Web Application
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5`;

  const gitCliCommands = `# 1. Inisialisasi git pada komputer Anda (jika belum)
git init
git add .
git commit -m "feat: IPS Maestro Kurikulum Merdeka with BYOK"

# 2. Tambahkan remote repositori GitHub Anda
git remote add origin https://github.com/USERNAME-ANDA/ips-maestro.git
git branch -M main
git push -u origin main`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className={`relative z-10 w-full max-w-4xl rounded-[36px] border shadow-2xl overflow-hidden my-8 ${
            isDarkMode
              ? "bg-slate-900 border-slate-800 text-white shadow-indigo-950/50"
              : "bg-white border-slate-150 text-slate-900 shadow-slate-300/60"
          }`}
        >
          {/* Header Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

          {/* Modal Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25">
                <GitFork className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Deployment Guide
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    100% Gratis Selamanya
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight mt-1">
                  Panduan Deploy GitHub &amp; Konsep BYOK
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode
                  ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-6 md:px-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold overflow-x-auto hide-scrollbar">
            {[
              { id: "overview", label: "Konsep BYOK & Gratis", icon: Sparkles },
              { id: "github-pages", label: "GitHub Pages (Otomatis)", icon: Server },
              { id: "vercel", label: "Deploy Vercel (1-Klik)", icon: Cloud },
              { id: "custom-domain", label: "Domain toer.my.id", icon: Globe },
              { id: "byok-guide", label: "Panduan untuk Guru/Pengguna", icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-4 border-b-2 font-black transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400"
                      : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-3xl border ${
                    isDarkMode
                      ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-200"
                      : "bg-emerald-50/90 border-emerald-100 text-emerald-950"
                  }`}
                >
                  <h4 className="text-base font-black flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Rahasia Gratis 100%: Arsitektur BYOK (Bring Your Own Key)</span>
                  </h4>
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                    Banyak pengembang ragu membagikan aplikasi AI karena takut kehabisan kuota atau tagihan membengkak. Dengan arsitektur <b>BYOK</b> yang kami rancang pada <b>IPS Maestro</b>:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs font-semibold">
                    <div className="p-3.5 bg-white/70 dark:bg-slate-900/50 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40">
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block text-xs mb-1">
                        1. Biaya Server = $0
                      </span>
                      Static hosting gratis selamanya di GitHub Pages atau Vercel tanpa butuh database/server berbayar.
                    </div>
                    <div className="p-3.5 bg-white/70 dark:bg-slate-900/50 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40">
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block text-xs mb-1">
                        2. Kuota Mandiri Bebas Limit
                      </span>
                      Setiap pengguna/guru memakai kuota gratis Gemini masing-masing (15 RPM / 1M token/hari).
                    </div>
                    <div className="p-3.5 bg-white/70 dark:bg-slate-900/50 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40">
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block text-xs mb-1">
                        3. Zero Security Leak
                      </span>
                      Repo GitHub tidak menyimpan API Key Anda. Tidak ada resiko kunci Anda dicuri atau diblokir Google.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActiveTab("github-pages")}
                    className={`p-5 rounded-3xl border cursor-pointer transition-all hover:scale-101 ${
                      isDarkMode
                        ? "bg-slate-800/40 border-slate-700 hover:border-emerald-500"
                        : "bg-white border-slate-200 hover:border-emerald-500 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center">
                        <Server className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h5 className="font-black text-sm">Opsi 1: GitHub Pages</h5>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                          Otomatis &amp; Resmi GitHub
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Cukup buat repositori di GitHub, aktifkan GitHub Pages dengan source GitHub Actions. Website langsung live dengan SSL gratis.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab("vercel")}
                    className={`p-5 rounded-3xl border cursor-pointer transition-all hover:scale-101 ${
                      isDarkMode
                        ? "bg-slate-800/40 border-slate-700 hover:border-teal-500"
                        : "bg-white border-slate-200 hover:border-teal-500 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                        <Cloud className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <h5 className="font-black text-sm">Opsi 2: Vercel Deploy</h5>
                        <span className="text-[10px] text-teal-500 font-bold uppercase tracking-wider">
                          Paling Cepat (1 Menit Jadi)
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Import repositori GitHub Anda di vercel.com. CDN global ultra-cepat, auto deploy setiap ada update kode baru.
                    </p>
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                    isDarkMode
                      ? "bg-slate-800/30 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <h5 className="font-black text-xs text-slate-800 dark:text-slate-100">
                        Afiliasi Resmi: toer.my.id
                      </h5>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Dapat dihubungkan ke domain pribadi seperti <code>maestro.toer.my.id</code> secara gratis!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("custom-domain")}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5"
                  >
                    <span>Lihat DNS Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* GITHUB PAGES TAB */}
            {activeTab === "github-pages" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black tracking-tight">
                    Deploy ke GitHub Pages Menggunakan GitHub Actions
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Proyek ini sudah dilengkapi file workflow resmi di <code>.github/workflows/static.yml</code> sehingga proses build dan deploy berlangsung otomatis setiap Anda melakukan push kode.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-wider">
                      <span>Langkah 1: Upload Repositori ke Akun GitHub Anda</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      Buka terminal di folder project Anda, lalu jalankan perintah berikut untuk mengunggah ke GitHub:
                    </p>
                    <div className="relative">
                      <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                        {gitCliCommands}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(gitCliCommands, "git-cli")}
                        className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 border border-slate-700"
                      >
                        {copiedSection === "git-cli" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Perintah</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-wider">
                      <span>Langkah 2: Aktifkan GitHub Pages di Pengaturan Repositori</span>
                    </div>
                    <ol className="text-xs text-slate-400 space-y-2 font-medium list-decimal pl-5 leading-relaxed">
                      <li>Buka repositori Anda di <b>GitHub.com</b>.</li>
                      <li>Klik tab <b>Settings</b> di pojok kanan atas repositori.</li>
                      <li>Di bilah menu kiri, klik menu <b>Pages</b>.</li>
                      <li>
                        Pada bagian <b>Build and deployment</b> &gt; <b>Source</b>, ubah pilihan dari <i>"Deploy from a branch"</i> menjadi <b>"GitHub Actions"</b>.
                      </li>
                      <li>
                        Selesai! GitHub Actions akan otomatis meng-compile aplikasi dan mempublikasikannya ke alamat: <code>https://USERNAME.github.io/ips-maestro/</code>.
                      </li>
                    </ol>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-wider">
                        <FileCode className="w-4 h-4" />
                        <span>File Konfigurasi .github/workflows/static.yml</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(githubActionsCode, "gh-action")}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 border border-slate-700"
                      >
                        {copiedSection === "gh-action" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Workflow YML</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-[11px] font-mono overflow-x-auto max-h-48 custom-scrollbar border border-slate-800 leading-relaxed">
                      {githubActionsCode}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* VERCEL TAB */}
            {activeTab === "vercel" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black tracking-tight">
                    Deploy Instan ke Vercel (1 Menit Langsung Aktif)
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Vercel adalah platform hosting cloud modern yang memberikan performa tercepat di dunia dengan CDN global dan dukungan penuh untuk project Vite React.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                      1
                    </div>
                    <h5 className="font-black text-xs">Buka Vercel &amp; Login</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-teal-500 font-bold underline">vercel.com</a> lalu login menggunakan akun GitHub Anda.
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                      2
                    </div>
                    <h5 className="font-black text-xs">Import Project</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Klik <b>"Add New" &gt; "Project"</b>, cari nama repositori <code>ips-maestro</code> Anda, lalu klik tombol <b>Import</b>.
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                      3
                    </div>
                    <h5 className="font-black text-xs">Klik Tombol Deploy</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Biarkan pengaturan default (Framework Preset: Vite). Klik <b>Deploy</b>. Dalam 30 detik web Anda langsung aktif!
                    </p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-200" : "bg-emerald-50 border-emerald-100 text-emerald-950"}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h5 className="font-black text-xs">Tidak Perlu Memasukkan Environment Variable di Vercel!</h5>
                  </div>
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                    Karena menggunakan konsep <b>BYOK (Bring Your Own Key)</b>, Anda tidak perlu mengisi <code>GEMINI_API_KEY</code> di dasbor Vercel. Setiap guru yang mengakses web Anda akan memasukkan kunci API mereka sendiri di antarmuka web, sehingga kuota Anda tetap 0 dan aman 100%!
                  </p>
                </div>
              </div>
            )}

            {/* CUSTOM DOMAIN TAB */}
            {activeTab === "custom-domain" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black tracking-tight">
                    Menghubungkan ke Custom Domain toer.my.id
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Jadikan aplikasi ini terlihat sangat profesional sebagai produk resmi institusi pendidikan dengan menghubungkannya ke subdomain <code>toer.my.id</code> (contoh: <code>maestro.toer.my.id</code>).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <h5 className="font-black text-xs uppercase tracking-wider text-indigo-500">
                      Pengaturan DNS Record di Domain Manager Anda (Cloudflare / cPanel / Niagahoster)
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 font-black text-slate-400">
                            <th className="py-2 px-3">Tipe (Type)</th>
                            <th className="py-2 px-3">Nama Host (Subdomain)</th>
                            <th className="py-2 px-3">Target / Value</th>
                            <th className="py-2 px-3">Proxy / TTL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-amber-500">CNAME</td>
                            <td className="py-2.5 px-3 font-bold">maestro</td>
                            <td className="py-2.5 px-3 text-emerald-500">
                              USERNAME.github.io <span className="font-sans text-[10px] text-slate-400">(Jika pakai GitHub Pages)</span>
                              <br />
                              cname.vercel-dns.com <span className="font-sans text-[10px] text-slate-400">(Jika pakai Vercel)</span>
                            </td>
                            <td className="py-2.5 px-3 font-sans text-slate-400">Auto / DNS Only</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <h5 className="font-black text-xs uppercase tracking-wider text-indigo-500">
                      Daftarkan di Pengaturan Hosting
                    </h5>
                    <ul className="text-xs text-slate-400 space-y-1.5 font-medium list-disc pl-5 leading-relaxed">
                      <li><b>Di GitHub Pages:</b> Masuk ke <i>Settings &gt; Pages &gt; Custom domain</i>, ketik <code>maestro.toer.my.id</code>, lalu centang <b>Enforce HTTPS</b>.</li>
                      <li><b>Di Vercel:</b> Masuk ke <i>Project Settings &gt; Domains</i>, tambahkan <code>maestro.toer.my.id</code>. Vercel akan otomatis menerbitkan sertifikat SSL gratis.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* BYOK GUIDE TAB */}
            {activeTab === "byok-guide" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black tracking-tight">
                    Panduan untuk Guru &amp; Pengunjung Web
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Ketika Anda membagikan tautan aplikasi ini ke rekan-rekan guru di MGMP IPS, berikut alur mudah yang mereka jalani:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl border flex items-start gap-4 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-black text-xs">Membuka Aplikasi</h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Guru membuka link aplikasi Anda (misal <code>https://maestro.toer.my.id</code>).
                      </p>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border flex items-start gap-4 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-black text-xs">Memasukkan Kunci API Gemini Pribadi</h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Guru mengklik badge <b>"Atur Kunci API"</b> di bar atas atau masuk ke menu <b>Pengaturan</b>. Mereka dapat membuat kunci API gratis di Google AI Studio dalam waktu 1 menit tanpa kartu kredit.
                      </p>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border flex items-start gap-4 ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-black text-xs">Menggunakan Seluruh Fitur Sepuasnya</h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Semua fitur Modul Ajar, Silabus, LKPD Generator, Bank Soal HOTS, dan Chatbot AI langsung bekerja dengan cepat dan gratis selamanya!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 md:p-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">
                Karya <b>Catur Pamungkas, S.Pd.,Gr.</b> • <a href="https://toer.my.id" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline font-black">toer.my.id</a>
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              Tutup Panduan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
