import React from "react";
import {
  Menu,
  Key,
  GitFork,
  Globe,
  ExternalLink,
  Moon,
  Sun,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Compass,
  Zap,
  GraduationCap
} from "lucide-react";

export interface TopNavBarProps {
  onToggleMobileMenu: () => void;
  apiKey: string;
  selectedModel: string;
  onOpenApiKeyModal: () => void;
  onOpenDeployModal: () => void;
  onStartTour: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  accentColor: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onToggleMobileMenu,
  apiKey,
  selectedModel,
  onOpenApiKeyModal,
  onOpenDeployModal,
  onStartTour,
  isDarkMode,
  onToggleDarkMode,
  accentColor,
}) => {
  const isKeyConfigured = Boolean(apiKey && apiKey.trim().length > 10);
  const maskedKey = isKeyConfigured
    ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}`
    : "";

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 ${
        isDarkMode
          ? "bg-slate-950/80 border-slate-800/80 text-white"
          : "bg-white/85 border-slate-200/80 text-slate-900 shadow-sm shadow-slate-100"
      }`}
    >
      {/* Left Section: Mobile Menu + Branding + Affiliation */}
      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={onToggleMobileMenu}
          className={`p-2.5 rounded-2xl md:hidden border transition-colors ${
            isDarkMode
              ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
          }`}
          title="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-${accentColor}-600 to-${accentColor}-500 flex items-center justify-center text-white shadow-lg shadow-${accentColor}-500/25 shrink-0`}
          >
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base md:text-lg tracking-tight leading-none">
                IPS MAESTRO<span className="text-indigo-500 font-extrabold text-xs ml-0.5">™</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                EdTech Kurikulum Merdeka
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 font-bold hidden md:inline">
                Inovasi Pembelajaran Digital
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
              <a
                href="https://toer.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors group"
                title="Kunjungi Portal Resmi toer.my.id"
              >
                <Globe className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                <span className="underline decoration-indigo-400/50 underline-offset-2">toer.my.id</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Status Pills & Action Buttons */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* BYOK API Key Button */}
        <button
          onClick={onOpenApiKeyModal}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-2xl border text-xs font-black transition-all hover:scale-102 active:scale-98 shadow-sm ${
            isKeyConfigured
              ? isDarkMode
                ? "bg-emerald-950/40 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/40"
                : "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100"
              : isDarkMode
              ? "bg-amber-950/40 border-amber-900/60 text-amber-300 hover:bg-amber-900/40"
              : "bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100"
          }`}
          title="Kelola Kunci API Gemini Anda"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isKeyConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-ping"
            }`}
          />
          <Key className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">
            {isKeyConfigured ? `API: ${maskedKey}` : "Atur Kunci API (BYOK)"}
          </span>
          <span className="sm:hidden font-extrabold text-[11px]">
            {isKeyConfigured ? "API Aktif" : "Set API"}
          </span>
          {isKeyConfigured && (
            <span className="hidden lg:inline text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold">
              {selectedModel.replace("gemini-", "").replace("-flash", " Flash")}
            </span>
          )}
        </button>

        {/* GitHub Deploy Guide Button */}
        <button
          onClick={onOpenDeployModal}
          className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-black transition-all hover:scale-102 active:scale-98 shadow-sm ${
            isDarkMode
              ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
              : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
          }`}
          title="Panduan Deploy ke GitHub Pages / Vercel Gratis"
        >
          <GitFork className="w-3.5 h-3.5 text-emerald-500" />
          <span>Deploy Gratis</span>
        </button>

        {/* Interactive Tour Button */}
        <button
          onClick={onStartTour}
          className={`p-2.5 rounded-2xl border transition-all hover:scale-105 ${
            isDarkMode
              ? "bg-indigo-950/40 border-indigo-900/50 text-indigo-300 hover:bg-indigo-900/50"
              : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
          }`}
          title="Mulai Tur Panduan Interaktif"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2.5 rounded-2xl border transition-all hover:scale-105 ${
            isDarkMode
              ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
          }`}
          title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
