import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Key,
  FileText,
  FileSpreadsheet,
  Target,
  ClipboardList,
  Bot,
  Cloud,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  Compass,
  ArrowRight,
  School,
  ExternalLink,
  BookOpen,
  Award
} from "lucide-react";

export interface OnboardingTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any) => void;
  isDarkMode: boolean;
}

interface TourStep {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  color: string;
  bgGradient: string;
  description: string;
  features: string[];
  recommendedAction?: {
    label: string;
    tab: string;
  };
  tips?: string;
}

export const OnboardingTourModal: React.FC<OnboardingTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  isDarkMode,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = [
    {
      id: "welcome",
      title: "Selamat Datang di IPS Maestro",
      subtitle: "Ekosistem Perangkat Pembelajaran & Administrasi Guru IPS SMP",
      badge: "Karya Catur Pamungkas, S.Pd.,Gr.",
      icon: Sparkles,
      color: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "from-indigo-600 via-indigo-700 to-purple-800",
      description:
        "IPS Maestro dirancang khusus untuk mempermudah Bapak/Ibu Guru IPS SMP dalam menyusun administrasi Kurikulum Merdeka secara otomatis, berstandar tinggi, dan berbasis kecerdasan buatan (AI).",
      features: [
        "Penyusunan RPP & Modul Ajar otomatis berstandar Kemendikbudristek",
        "Pembuatan LKPD interaktif berbasis studi kasus dan kearifan lokal",
        "Perumusan Bank Soal HOTS (C4-C6) lengkap dengan stimulus & rubrik",
        "Administrasi lengkap: Silabus, Prota, Promes, Jurnal, & E-Rapor",
        "Ekspor multi-format (DOCX, PDF, Google Docs, Excel, & Cetak)",
      ],
      tips: "Ikuti tur singkat ini (hanya 1 menit) untuk menguasai alur kerja cepat di aplikasi.",
    },
    {
      id: "api-profile",
      title: "1. Konfigurasi Kunci API & Profil Sekolah",
      subtitle: "Kunci Otomasi AI Mandiri & Personalisasi KOP Dokumen",
      badge: "Menu Pengaturan",
      icon: Key,
      color: "text-amber-600 dark:text-amber-400",
      bgGradient: "from-amber-500 via-orange-600 to-amber-700",
      description:
        "Sebelum mulai menyusun dokumen, pastikan Kunci API Gemini Anda sudah aktif dan data identitas sekolah telah diisi di menu Pengaturan.",
      features: [
        "Kunci API Gemini AI gratis dari aistudio.google.com (kuota milik sendiri)",
        "Pengisian Nama Guru, NIP, Nama Sekolah, & Kepala Sekolah",
        "Data profil otomatis dicantumkan di KOP dan lembar tanda tangan dokumen",
        "Integrasi Google Drive untuk backup awan 1-klik yang aman",
      ],
      recommendedAction: {
        label: "Buka Menu Pengaturan",
        tab: "pengaturan",
      },
      tips: "Kunci API disimpan secara aman di peramban Anda dan tidak pernah dikirim ke pihak ketiga.",
    },
    {
      id: "rpp-perangkat",
      title: "2. Modul Ajar, RPP, Silabus & Prota/Promes",
      subtitle: "Perencanaan Pembelajaran Kurikulum Merdeka",
      badge: "Perangkat Mengajar",
      icon: FileText,
      color: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "from-blue-600 via-indigo-600 to-indigo-800",
      description:
        "Susun Modul Ajar dan RPP berdiferensiasi dengan pilihan model pembelajaran modern (PBL, PjBL, Discovery, Inquiry) hanya dalam hitungan detik.",
      features: [
        "Tujuan Pembelajaran berbasis ABCD & Profil Pelajar Pancasila",
        "Sintaks kegiatan pembelajaran runtut (Pendahuluan, Inti, Penutup)",
        "Penyusun Program Tahunan (Prota) & Program Semester (Promes) otomatis",
        "Silabus Kurikulum Merdeka siap cetak dengan alokasi JP fleksibel",
      ],
      recommendedAction: {
        label: "Coba Susun Modul Ajar",
        tab: "rpp",
      },
      tips: "Gunakan tombol 'Unduh Word (DOCX)' atau 'Simpan ke Google Docs' untuk mengedit lebih lanjut di komputer Anda.",
    },
    {
      id: "lkpd-soal",
      title: "3. LKPD Merdeka & Bank Soal HOTS",
      subtitle: "Aktivitas Siswa Bermakna & Instrumen Asesmen",
      badge: "Asesmen & LKPD",
      icon: Target,
      color: "text-emerald-600 dark:text-emerald-400",
      bgGradient: "from-emerald-600 via-teal-700 to-emerald-800",
      description:
        "Tingkatkan literasi dan kemampuan berpikir kritis siswa melalui LKPD tematik kontekstual dan butir soal HOTS berstandar Asesmen Nasional.",
      features: [
        "LKPD interaktif dengan stimulus berita, fenomena sosial, dan studi kasus",
        "Bank Soal Pilihan Ganda & Uraian Analitis (Taksonomi Bloom C4-C6)",
        "Disertai Kunci Jawaban, Pembahasan Mendalam, dan Rubrik Penskoran",
        "Bisa langsung diunggah dari berkas materi PDF / Word yang sudah ada",
      ],
      recommendedAction: {
        label: "Buka Pembuat LKPD",
        tab: "lkpd",
      },
      tips: "Tersedia opsi cetak langsung dengan tata letak lembar kerja siswa yang rapi.",
    },
    {
      id: "jurnal-rapor",
      title: "4. Jurnal Kelas, Penilaian & E-Rapor",
      subtitle: "Administrasi Harian & Pengolahan Nilai Siswa",
      badge: "Administrasi Kelas",
      icon: ClipboardList,
      color: "text-purple-600 dark:text-purple-400",
      bgGradient: "from-purple-600 via-violet-700 to-indigo-900",
      description:
        "Catat aktivitas mengajar harian, rekapitulasi nilai formatif/sumatif, dan hasilkan deskripsi capaian pembelajaran rapor secara otomatis.",
      features: [
        "Jurnal Harian Guru IPS dengan pencatatan materi & catatan siswa",
        "Buku Nilai Interaktif dengan perhitungan rata-rata & status ketuntasan",
        "Generator Deskripsi Rapor otomatis sesuai capaian kompetensi",
        "Pencetakan Kartu Remedial Siswa siap tanda tangan orang tua",
      ],
      recommendedAction: {
        label: "Buka Jurnal Mengajar",
        tab: "jurnal",
      },
      tips: "Data nilai dapat diimpor langsung dari berkas Excel (.xlsx) daftar siswa Anda.",
    },
    {
      id: "gas-community",
      title: "5. Google Apps Script & Saluran WhatsApp",
      subtitle: "Akses Gratis Selamanya & Komunitas Guru IPS",
      badge: "Deployment & Bantuan",
      icon: MessageSquare,
      color: "text-teal-600 dark:text-teal-400",
      bgGradient: "from-teal-600 via-emerald-700 to-slate-900",
      description:
        "Aplikasi ini juga dapat dipasang ke Google Apps Script (GAS) pribadi Anda secara 100% gratis tanpa biaya hosting, serta didukung oleh komunitas aktif di Saluran WhatsApp.",
      features: [
        "Paket deploy 1-klik ke Google Apps Script di Google Drive Anda",
        "Kemandirian kuota penuh (tidak membebani server/kuota pembuat)",
        "Tersedia Saluran WhatsApp Resmi untuk update perangkat & konsultasi guru",
        "Dokumentasi dan video panduan lengkap di tab Panduan & Bantuan",
      ],
      recommendedAction: {
        label: "Buka Panduan & GAS",
        tab: "panduan",
      },
      tips: "Ikuti Saluran WhatsApp resmi untuk mendapatkan pembaruan RPP kurikulum terbaru!",
    },
  ];

  const current = steps[currentStep];
  const IconComponent = current.icon;

  const handleFinish = () => {
    localStorage.setItem("ips-maestro-onboarding-completed", "true");
    onClose();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToTab = (tabName: string) => {
    handleFinish();
    onNavigateTab(tabName);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`w-full max-w-3xl ${
            isDarkMode ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-100"
          } rounded-[36px] shadow-2xl border overflow-hidden flex flex-col my-auto relative`}
        >
          {/* TOP HERO HEADER */}
          <div className={`p-6 sm:p-8 bg-gradient-to-r ${current.bgGradient} text-white relative overflow-hidden transition-all duration-500`}>
            {/* Background Accent Deco */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute top-4 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="inline-block px-3 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider text-white border border-white/20 mb-1">
                    {current.badge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {current.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 shrink-0 ml-2"
                title="Lewati Tur"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/85 font-medium mt-3 max-w-xl relative z-10">
              {current.subtitle}
            </p>

            {/* STEP PROGRESS DOTS */}
            <div className="flex items-center gap-2 mt-6 relative z-10">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep
                      ? "w-8 bg-white"
                      : idx < currentStep
                      ? "w-2.5 bg-white/60 hover:bg-white/80"
                      : "w-2.5 bg-white/25 hover:bg-white/40"
                  }`}
                  title={`Lompat ke langkah ${idx + 1}: ${s.title}`}
                />
              ))}
              <span className="text-[11px] font-bold text-white/75 ml-2">
                Langkah {currentStep + 1} dari {steps.length}
              </span>
            </div>
          </div>

          {/* MODAL BODY */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[55vh]">
            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"} font-medium`}>
              {current.description}
            </p>

            {/* KEY FEATURES CHECKLIST */}
            <div className={`p-5 sm:p-6 rounded-3xl border ${isDarkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50/80 border-slate-200/80"} space-y-3`}>
              <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-slate-500"} flex items-center gap-2`}>
                <Award className="w-4 h-4 text-indigo-500" />
                Fitur Unggulan &amp; Manfaat:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {current.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIPS CALLOUT */}
            {current.tips && (
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDarkMode ? "bg-amber-950/20 border-amber-900/30 text-amber-300" : "bg-amber-50 border-amber-200/70 text-amber-900"
              }`}>
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold leading-relaxed">
                  <span className="font-black">Tips Praktis:</span> {current.tips}
                </p>
              </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className={`p-5 sm:p-6 border-t ${
            isDarkMode ? "bg-slate-900/90 border-slate-800" : "bg-slate-50/90 border-slate-100"
          } flex flex-wrap items-center justify-between gap-3`}>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  currentStep === 0
                    ? "opacity-30 cursor-not-allowed text-slate-400"
                    : isDarkMode
                    ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={handleFinish}
                className={`px-3 py-2 text-xs font-bold ${
                  isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                } transition-colors`}
              >
                Lewati Tur
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              {current.recommendedAction && (
                <button
                  onClick={() => handleJumpToTab(current.recommendedAction!.tab)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all ${
                    isDarkMode
                      ? "bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900"
                      : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                  }`}
                >
                  <span>{current.recommendedAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{currentStep === steps.length - 1 ? "Mulai Sekarang" : "Selanjutnya"}</span>
                {currentStep === steps.length - 1 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
