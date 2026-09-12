'use client';

import React from 'react';
import Link from 'next/link';
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
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#070D14] via-[#0A131C] to-[#04080D] text-slate-400 overflow-hidden select-none">
      {/* Decorative top accent line with subtle golden shimmer */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Main Minimal Row: Brand + Navigation + Direct Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Brand Identity & Compliance Badges (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="inline-flex flex-col group focus:outline-none">
              <span className="font-logo font-bold text-2xl tracking-[0.18em] text-white group-hover:text-brand-gold transition-colors">
                LUSH TRADE CORP
              </span>
              <span className="text-[10px] tracking-[0.26em] text-brand-gold uppercase font-medium mt-0.5">
                Tanzania Limited
              </span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Direct origin sourcing and dependable maritime export of certified agricultural commodities from Tanzania to global processing hubs.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
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
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
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
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Export Desk
            </h4>
            
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${ENTERPRISE_INFO.email}`}
                className="flex items-center space-x-2.5 text-slate-400 hover:text-brand-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{ENTERPRISE_INFO.email}</span>
              </a>

              <a
                href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2.5 text-slate-400 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{ENTERPRISE_INFO.phone}</span>
              </a>

              <p className="text-xs text-slate-400 pt-1">
                Headquarters: Mtwara & Dar es Salaam, Tanzania (UTC+3)
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand-gold hover:text-brand-dark border border-white/10 hover:border-brand-gold transition-all flex items-center justify-center text-slate-300"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {ENTERPRISE_INFO.name}. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Direct Origin • Global Delivery</span>
            
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg bg-white/[0.05] hover:bg-brand-gold hover:text-brand-dark text-slate-300 border border-white/10 hover:border-brand-gold transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
