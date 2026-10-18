'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone, BookOpen } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section and scroll state
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'products', 'usps', 'blog', 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About Us', href: isHomePage ? '#about' : '/#about', id: 'about' },
    { name: 'Products', href: isHomePage ? '#products' : '/#products', id: 'products' },
    { name: 'Partner With Us', href: isHomePage ? '#usps' : '/#usps', id: 'usps' },
    { name: 'Blog', href: isHomePage ? '#blog' : '/#blog', id: 'blog' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', id: 'contact' },
  ];

  const hasWhiteBg = !isHomePage || activeSection !== 'hero';

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasWhiteBg
            ? 'bg-gradient-to-r from-white/95 via-brand-cream/95 to-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm py-2.5 sm:py-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-brand-coral/25 after:to-transparent'
            : 'bg-transparent border-b border-transparent shadow-none py-3.5 sm:py-4.5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left: Authentic Corporate Logo Lockup (Refined Proportion) */}
          <Link href="/" className="flex items-center gap-2.5 select-none z-10 group focus:outline-none">
            <div className="relative w-7 h-8 sm:w-7.5 sm:h-8.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/lush-mark.png"
                alt="Lush Trade Corp Logo"
                fill
                sizes="34px"
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-logo font-extrabold text-[13px] sm:text-[14.5px] tracking-[0.22em] uppercase leading-none transition-colors duration-200 ${
                hasWhiteBg ? 'text-brand-dark group-hover:text-brand-coral' : 'text-white group-hover:text-amber-200'
              }`}>
                LUSH TRADE CORP
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5 sm:mt-1">
                <span className={`text-[6.5px] sm:text-[7.5px] font-sans font-extrabold tracking-[0.34em] uppercase leading-none transition-colors duration-200 ${
                  hasWhiteBg ? 'text-brand-coral' : 'text-brand-gold'
                }`}>
                  TANZANIA LIMITED
                </span>
              </div>
            </div>
          </Link>

          {/* Center: Perfectly Centered Navigation Links */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-5 xl:gap-7 text-[12.5px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative py-1 transition-colors duration-200 flex items-center gap-1.5 ${
                    hasWhiteBg
                      ? isActive
                        ? 'text-brand-dark font-bold'
                        : 'text-slate-600 hover:text-brand-coral font-medium'
                      : isActive
                        ? 'text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
                        : 'text-white/80 hover:text-amber-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {isActive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        hasWhiteBg
                          ? 'bg-gradient-to-r from-brand-coral to-brand-gold shadow-[0_0_8px_rgba(253,50,44,0.5)]'
                          : 'bg-gradient-to-r from-brand-coral to-brand-gold shadow-[0_0_8px_#FDAB0A]'
                      }`}
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Sleek Luxury Pill "Get Started" Button + Language Selector */}
          <div className="hidden sm:flex items-center space-x-3 z-10">

            {/* Compact Language Selector icon */}
            <LanguageSelector isHomePage={isHomePage} isScrolled={isScrolled} hasWhiteBg={hasWhiteBg} />
          </div>

          {/* Mobile Right Bar: Language Icon + Hamburger */}
          <div className="flex lg:hidden items-center space-x-2.5 z-10">
            <LanguageSelector isHomePage={isHomePage} isScrolled={isScrolled} hasWhiteBg={hasWhiteBg} />

            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 focus:outline-none transition-colors ${
                hasWhiteBg
                  ? 'text-slate-800 hover:text-slate-950'
                  : 'text-white/90 hover:text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between text-xl font-medium tracking-wide py-2.5 border-b border-white/10 transition-colors ${
                    isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold font-bold' : 'text-slate-200 hover:text-brand-gold'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name === 'Blog' && <BookOpen className="w-4 h-4 text-brand-gold" />}
                    <span>{link.name}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono">
                Direct Line
              </span>
              <a
                href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                className="text-xs text-brand-gold hover:text-brand-coral flex items-center space-x-1.5 font-mono transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>{ENTERPRISE_INFO.phone}</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold text-white text-sm font-bold tracking-wide shadow-lg hover:shadow-[0_4px_25px_rgba(253,80,20,0.45)] active:scale-95 transition-all"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
