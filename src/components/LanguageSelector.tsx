'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LanguageOption {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', localName: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', localName: 'Kiswahili', flag: '🇹🇿' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ar', name: 'Arabic', localName: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'French', localName: 'Français', flag: '🇫🇷' },
  { code: 'zh-CN', name: 'Chinese', localName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', localName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', localName: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSelectorProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
  isMobile?: boolean;
  hasWhiteBg?: boolean;
}

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSelector({
  isHomePage = true,
  isScrolled = false,
  isMobile = false,
  hasWhiteBg = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read active translation language on mount
  useEffect(() => {
    const getSavedLang = () => {
      const match = document.cookie.match(/googtrans=\/(?:auto|en)\/([a-zA-Z\-]+)/);
      if (match && match[1]) {
        return match[1];
      }
      return 'en';
    };

    setCurrentLang(getSavedLang());

    // Close on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    const hostname = window.location.hostname;

    // 1. Update cookies in the background so future visits/reloads preserve choice
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      const parts = hostname.split('.');
      if (parts.length > 2 && !hostname.endsWith('.onrender.com') && !hostname.includes('localhost')) {
        const root = parts.slice(-2).join('.');
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${root};`;
      }
    } else {
      document.cookie = `googtrans=/auto/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      if (hostname && hostname !== 'localhost') {
        document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${hostname};`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
      }
    }

    // 2. In-place instant translation without reloading the page
    const applyTranslation = (code: string): boolean => {
      if (code === 'en') {
        let restored = false;
        try {
          const bannerIframe = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement | null;
          if (bannerIframe) {
            const innerDoc = bannerIframe.contentDocument || bannerIframe.contentWindow?.document;
            if (innerDoc) {
              const buttons = innerDoc.querySelectorAll('button');
              for (let i = 0; i < buttons.length; i++) {
                const text = (buttons[i].innerText || buttons[i].id).toLowerCase();
                if (text.includes('restore') || text.includes('original')) {
                  buttons[i].click();
                  restored = true;
                  break;
                }
              }
            }
          }
        } catch {}

        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          const enOption = Array.from(select.options).find((o) => o.value === 'en' || o.value === '');
          if (enOption) {
            select.value = enOption.value;
          } else {
            select.selectedIndex = 0;
          }
          select.dispatchEvent(new Event('change', { bubbles: true }));
          if (typeof (select as any).onchange === 'function') {
            (select as any).onchange();
          }
          restored = true;
        }
        return restored;
      }

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        if (typeof (select as any).onchange === 'function') {
          (select as any).onchange();
        }
        return true;
      }
      return false;
    };

    // Execute immediately without reloading
    const success = applyTranslation(langCode);
    if (!success) {
      // If widget is still mounting, retry briefly
      let retries = 0;
      const timer = setInterval(() => {
        retries++;
        if (applyTranslation(langCode) || retries > 25) {
          clearInterval(timer);
        }
      }, 100);
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // If inside mobile drawer
  if (isMobile) {
    return (
      <div className="w-full pt-1">
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>Select Language</span>
          </span>
          <span className="text-[10px] text-brand-gold/80 font-mono">Google Translate</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-gold text-brand-dark font-bold shadow-md scale-[1.02]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-brand-gold'
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span className="truncate">{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Button styling matching current header theme
  const buttonBorderClass = hasWhiteBg
    ? 'border-black/10 hover:border-brand-gold/60 bg-white/60 hover:bg-white/90 text-slate-800'
    : 'border-white/20 hover:border-brand-gold/60 bg-white/10 hover:bg-white/15 text-white';

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group ${buttonBorderClass}`}
        aria-label="Select Language"
        aria-expanded={isOpen}
        title={`Language: ${activeLangObj.name}`}
      >
        <Globe className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform duration-300" />
        <span className="sr-only">Select Language</span>
      </button>

      {/* Glassmorphic Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-brand-gold/30 shadow-2xl backdrop-blur-xl p-1.5 z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Globe className="w-3 h-3 text-brand-gold" />
                <span>Languages</span>
              </span>
              <span className="text-[9px] font-mono text-brand-gold/70">Google Translate</span>
            </div>

            <div className="py-1 max-h-64 overflow-y-auto space-y-0.5" data-lenis-prevent>
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group ${
                      isSelected
                        ? 'bg-brand-gold/20 text-brand-gold font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-medium leading-snug">{lang.localName}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
