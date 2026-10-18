'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  ArrowUp,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Partner With Us', href: '#usps' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact ', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/lush.trade.corp/' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61594566767273' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@LushTradeCorp' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#070D14] via-[#0A131C] to-[#04080D] text-slate-400 overflow-hidden select-none">
      {/* Decorative top accent line with vibrant logo gradient shimmer */}
      <div className="relative w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-coral/50 via-brand-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        
        {/* Main Minimal Row: Brand + Navigation + Direct Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-white/10 items-start">
          
          {/* Brand Identity & Compliance Badges (Span 5) */}
          <div className="md:col-span-5 space-y-3.5 sm:space-y-4">
            <a href="#hero" className="inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none">
              <div className="relative w-7.5 h-8.5 sm:w-8.5 sm:h-9.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/lush-mark.png"
                  alt="Lush Trade Corp Logo"
                  fill
                  sizes="36px"
                  className="object-contain drop-shadow-[0_2px_12px_rgba(253,50,44,0.35)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-logo font-extrabold text-lg sm:text-xl tracking-[0.18em] text-white group-hover:text-brand-gold transition-colors">
                  LUSH TRADE CORP
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-brand-gold uppercase font-bold mt-0.5">
                  Tanzania Limited
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Direct origin sourcing and dependable maritime export of certified agricultural commodities from Tanzania to global processing hubs.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 text-[10px] sm:text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                <ShieldCheck className="w-3 h-3 text-brand-gold" />
                CBT Registered
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                <ShieldCheck className="w-3 h-3 text-brand-gold" />
                TCCIA Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                <ShieldCheck className="w-3 h-3 text-brand-gold" />
                SGS Inspected
              </span>
            </div>
          </div>

          {/* Quick Navigation (Span 3) */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-brand-gold transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Desk & Socials (Span 4) */}
          <div className="md:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Export Desk
            </h4>
            
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <a
                href={`mailto:${ENTERPRISE_INFO.email}`}
                className="flex items-center space-x-2.5 text-slate-400 hover:text-brand-gold transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
                <span>{ENTERPRISE_INFO.email}</span>
              </a>

              <a
                href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2.5 text-slate-400 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
                <span>{ENTERPRISE_INFO.phone}</span>
              </a>

              <p className="text-[11px] sm:text-xs text-slate-400 pt-0.5">
                Headquarters: Mtwara & Dar es Salaam, Tanzania (UTC+3)
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1 sm:pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-gradient-to-r hover:from-brand-coral hover:to-brand-gold hover:text-white border border-white/10 hover:border-transparent hover:shadow-[0_0_15px_rgba(253,80,20,0.4)] transition-all flex items-center justify-center text-slate-300"
                    aria-label={s.name}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {ENTERPRISE_INFO.name}. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Direct Origin • Global Delivery</span>
            
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg bg-white/[0.05] hover:bg-gradient-to-r hover:from-brand-coral hover:to-brand-gold hover:text-white text-slate-300 border border-white/10 hover:border-transparent hover:shadow-[0_0_15px_rgba(253,80,20,0.4)] transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
