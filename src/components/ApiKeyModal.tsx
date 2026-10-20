import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Key,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Trash2,
  X,
  Zap,
  HelpCircle,
  Copy,
  Check,
  Globe
} from "lucide-react";

export interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey: string;
  onSaveKey: (key: string, model: string) => void;
  currentModel: string;
  isDarkMode: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentApiKey,
  onSaveKey,
  currentModel,
  isDarkMode,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(currentApiKey || "");
  const [selectedModel, setSelectedModel] = useState(currentModel || "gemini-2.5-flash");
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [activeTab, setActiveTab] = useState<"form" | "tutorial" | "byok-info">("form");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(currentApiKey || "");
      setSelectedModel(currentModel || "gemini-2.5-flash");
      setTestStatus({ type: null, message: "" });
    }
  }, [isOpen, currentApiKey, currentModel]);

  const testApiKey = async (keyToTest: string, modelToTest: string) => {
    if (!keyToTest.trim()) {
      setTestStatus({
        type: "error",
        message: "Silakan masukkan Kunci API Gemini Anda terlebih dahulu.",
      });
      return false;
    }

    setIsTesting(true);
    setTestStatus({ type: null, message: "" });

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToTest}:generateContent?key=${encodeURIComponent(
        keyToTest.trim()
      )}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Jawab hanya 1 kata: 'Aktif!'" }],
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg =
          data?.error?.message ||
          `Gagal (${res.status}): Kunci API tidak valid atau kuota terlampaui.`;
        setTestStatus({
          type: "error",
          message: errorMsg,
        });
        return false;
      }

      setTestStatus({
        type: "success",
        message:
          "Koneksi Berhasil! Kunci API Gemini terverifikasi valid dan siap digunakan di seluruh fitur IPS Maestro.",
      });
      return true;
    } catch (err: any) {
      setTestStatus({
        type: "error",
        message:
          err.message ||
          "Gagal menghubungi server Google Gemini. Periksa koneksi internet Anda.",
      });
      return false;
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveAndTest = async () => {
    const success = await testApiKey(apiKeyInput, selectedModel);
    if (success) {
      onSaveKey(apiKeyInput.trim(), selectedModel);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleSaveWithoutTest = () => {
    if (!apiKeyInput.trim()) {
      setTestStatus({
        type: "error",
        message: "Kunci API tidak boleh kosong.",
      });
      return;
    }
    onSaveKey(apiKeyInput.trim(), selectedModel);
    setTestStatus({
      type: "success",
      message: "Kunci API berhasil disimpan secara lokal!",
    });
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClearKey = () => {
    if (confirm("Hapus Kunci API dari peramban ini?")) {
      setApiKeyInput("");
      onSaveKey("", selectedModel);
      setTestStatus({
        type: "success",
        message: "Kunci API telah dihapus dari peramban lokal.",
      });
    }
  };

  const copyAiStudioUrl = () => {
    navigator.clipboard.writeText("https://aistudio.google.com/apikey");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

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
          className={`relative z-10 w-full max-w-2xl rounded-[36px] border shadow-2xl overflow-hidden my-8 ${
            isDarkMode
              ? "bg-slate-900 border-slate-800 text-white shadow-indigo-950/50"
              : "bg-white border-slate-150 text-slate-900 shadow-slate-300/60"
          }`}
        >
          {/* Header Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500" />

          {/* Modal Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-indigo-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    BYOK Architecture
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    100% Bebas Kuota
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight mt-1">
                  Atur Kunci API Gemini (Own Key)
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
          <div className="flex px-6 md:px-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold">
            <button
              onClick={() => setActiveTab("form")}
              className={`py-3.5 px-4 border-b-2 font-black transition-colors flex items-center gap-2 ${
                activeTab === "form"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Input & Validasi</span>
            </button>
            <button
              onClick={() => setActiveTab("tutorial")}
              className={`py-3.5 px-4 border-b-2 font-black transition-colors flex items-center gap-2 ${
                activeTab === "tutorial"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Panduan Kunci Gratis</span>
            </button>
            <button
              onClick={() => setActiveTab("byok-info")}
              className={`py-3.5 px-4 border-b-2 font-black transition-colors flex items-center gap-2 ${
                activeTab === "byok-info"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Keamanan & Privasi</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
            {activeTab === "form" && (
              <div className="space-y-6">
                {/* Notice pill */}
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                    isDarkMode
                      ? "bg-indigo-950/40 border-indigo-900/50 text-indigo-200"
                      : "bg-indigo-50/80 border-indigo-100 text-indigo-900"
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-extrabold">
                      Aplikasi ini beroperasi dengan model Bring Your Own Key (BYOK).
                    </p>
                    <p className="opacity-90 mt-0.5 font-medium">
                      Setiap pengguna menggunakan kunci API Google Gemini pribadi yang diperoleh gratis selamanya. Kunci Anda aman dan tersimpan hanya di memori browser perangkat ini.
                    </p>
                  </div>
                </div>

                {/* API Key Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    Kunci API Gemini (AI Studio Key)
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKeyInput}
                      onChange={(e) => {
                        setApiKeyInput(e.target.value);
                        setTestStatus({ type: null, message: "" });
                      }}
                      placeholder="AIzaSy..."
                      className={`w-full px-5 py-4 pr-12 rounded-2xl border-2 text-sm font-mono tracking-wider transition-all focus:outline-none ${
                        isDarkMode
                          ? "bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500"
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      {showKey ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400 font-medium">
                      Format: Dimulai dengan huruf <code>AIzaSy...</code>
                    </span>
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-600 font-black inline-flex items-center gap-1 hover:underline"
                    >
                      Dapatkan Kunci Gratis di sini
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Model Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    Pilihan Model Mesin AI Gemini
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "gemini-2.5-flash",
                        label: "Gemini 2.5 Flash",
                        badge: "Terbaru & Rekomendasi",
                        desc: "Kecepatan maksimal & penalaran materi IPS mendalam",
                        recommended: true,
                      },
                      {
                        id: "gemini-1.5-flash",
                        label: "Gemini 1.5 Flash",
                        badge: "Stabil",
                        desc: "Sangat stabil untuk pembuatan RPP & LKPD panjang",
                        recommended: false,
                      },
                      {
                        id: "gemini-2.0-flash",
                        label: "Gemini 2.0 Flash",
                        badge: "Cepat",
                        desc: "Model generasi mutakhir respon kilat untuk kuis",
                        recommended: false,
                      },
                    ].map((model) => {
                      const isSelected = selectedModel === model.id;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setSelectedModel(model.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                            isSelected
                              ? isDarkMode
                                ? "border-indigo-500 bg-indigo-950/30 text-white shadow-lg shadow-indigo-950/50"
                                : "border-indigo-600 bg-indigo-50/70 text-slate-900 shadow-md shadow-indigo-100"
                              : isDarkMode
                              ? "border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-700"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-black text-xs">
                              {model.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                            )}
                          </div>
                          <span
                            className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full mb-1.5 ${
                              model.recommended
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {model.badge}
                          </span>
                          <p className="text-[11px] leading-snug opacity-75 font-medium">
                            {model.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status Feedback */}
                {testStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      testStatus.type === "success"
                        ? isDarkMode
                          ? "bg-emerald-950/50 border-emerald-900 text-emerald-300"
                          : "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : isDarkMode
                        ? "bg-rose-950/50 border-rose-900 text-rose-300"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    {testStatus.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs font-bold leading-relaxed">
                      {testStatus.message}
                    </span>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "tutorial" && (
              <div className="space-y-6">
                <div className="text-center max-w-lg mx-auto space-y-2">
                  <h4 className="text-lg font-black tracking-tight">
                    Cara Mendapatkan Kunci API Gemini Gratis
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Google AI Studio menyediakan akses API gratis selamanya tanpa perlu kartu kredit. Ikuti 3 langkah berikut dalam 1 menit:
                  </p>
                </div>

                <div className="space-y-4">
                  <div
                    className={`p-5 rounded-2xl border flex items-start gap-4 ${
                      isDarkMode
                        ? "bg-slate-800/40 border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-2 flex-1">
                      <h5 className="font-black text-sm">
                        Buka Google AI Studio
                      </h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Kunjungi portal resmi Google AI Studio pada tautan di bawah ini. Anda dapat login dengan akun Google biasa (@gmail.com) maupun akun @guru.smp.belajar.id.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href="https://aistudio.google.com/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black inline-flex items-center gap-2 shadow-md shadow-indigo-600/20"
                        >
                          <span>Buka aistudio.google.com/apikey</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={copyAiStudioUrl}
                          className="px-3 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-white/10"
                        >
                          {copiedLink ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedLink ? "Tersalin!" : "Salin URL"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border flex items-start gap-4 ${
                      isDarkMode
                        ? "bg-slate-800/40 border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-1 flex-1">
                      <h5 className="font-black text-sm">
                        Klik Tombol "Create API Key"
                      </h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Di halaman AI Studio, klik tombol biru <b>"Create API key"</b> (atau <b>"Get API key"</b>). Pilih opsi <i>"Create API key in new project"</i>.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border flex items-start gap-4 ${
                      isDarkMode
                        ? "bg-slate-800/40 border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-1 flex-1">
                      <h5 className="font-black text-sm">
                        Salin &amp; Tempelkan ke Aplikasi Maestro
                      </h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Salin kode kunci yang muncul (dimulai dengan <code>AIzaSy...</code>), lalu tempelkan pada tab <b>Input & Validasi</b> di atas dan tekan <b>Uji & Simpan Kunci</b>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "byok-info" && (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-3xl border ${
                    isDarkMode
                      ? "bg-emerald-950/30 border-emerald-900/60 text-emerald-200"
                      : "bg-emerald-50 border-emerald-200 text-emerald-900"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <h4 className="font-black text-base">
                      Keamanan Kunci Terjamin 100%
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs font-medium leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <b>Penyimpanan Eksklusif di Browser:</b> Kunci API Anda hanya disimpan di <code>localStorage</code> peramban Anda sendiri.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <b>Koneksi Langsung ke Google:</b> Aplikasi langsung mengirim permintaan ke server resmi Google Gemini API (<code>generativelanguage.googleapis.com</code>) tanpa melalui perantara server pihak ketiga.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <b>Bebas Biaya &amp; Kuota Mandiri:</b> Setiap guru memiliki kuota gratis masing-masing (hingga 15 permintaan/menit dan 1.000.000 token/hari secara cuma-cuma).
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className={`p-6 rounded-3xl border ${
                    isDarkMode
                      ? "bg-slate-800/40 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <h4 className="font-black text-sm mb-2 text-slate-800 dark:text-slate-100">
                    Afiliasi &amp; Pengembangan Pendidikan
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Aplikasi ini dikembangkan oleh <b>Catur Pamungkas, S.Pd.,Gr.</b> sebagai inovasi teknologi pembelajaran mandiri guru IPS di Indonesia, terafiliasi dengan web portal edukasi resmi:{" "}
                    <a
                      href="https://toer.my.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 font-black underline hover:text-indigo-600"
                    >
                      toer.my.id
                    </a>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 md:p-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {apiKeyInput && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Kunci</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleSaveWithoutTest}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Simpan Langsung
              </button>
              <button
                type="button"
                onClick={handleSaveAndTest}
                disabled={isTesting || !apiKeyInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isTesting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    <span>Menguji Koneksi...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Uji &amp; Simpan Kunci</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
