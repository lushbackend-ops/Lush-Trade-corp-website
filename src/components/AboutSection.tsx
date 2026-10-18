'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function AboutSection() {
  const regions = ENTERPRISE_INFO.partnerships;

  return (
    <section id="about" className="py-12 sm:py-18 lg:py-28 bg-[#FAF9F6] text-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Tag & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-brand-coral/20 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-brand-coral" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-coral tracking-widest uppercase">
              About Us
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Lush Trade Corp"]} />
          </h2>

          <p className="text-brand-slateMuted text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Connecting Tanzania’s primary agricultural harvests directly to global processors.
          </p>

          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-brand-emerald via-brand-coral to-brand-gold mx-auto rounded-full mt-2 sm:mt-3" />
        </div>

        {/* Executive Overview: Featured Video & Text Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6 sm:gap-10 lg:gap-16 items-center md:items-start pb-10 sm:pb-14 lg:pb-16 border-b border-slate-200"
        >
          {/* Left Column: Dedicated Compact Video Feature */}
          <div className="w-full max-w-xs md:w-1/3 shrink-0 mx-auto md:mx-0">
            <div className="w-full rounded-[1rem] overflow-hidden shadow-2xl shadow-brand-dark/10 border-[5px] sm:border-[6px] border-white relative aspect-[4/5] bg-brand-cream/50">
              <video
                autoPlay
                muted
                playsInline
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;
                  if (video.duration && video.currentTime >= video.duration - 1) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                  }
                }}
                className="w-full h-full object-cover"
                src="/videos/about-video.mp4"
              />
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="w-full md:w-2/3 space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Block 1 */}
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[11px] sm:text-xs font-bold text-brand-forest uppercase tracking-widest block">
                Origin & Global Reach
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark leading-snug tracking-tight">
                Dynamic export–import enterprise rooted in Mtwara and Dar es Salaam.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Lush Trade Corp Tanzania Limited is engaged in sourcing, processing, and trading of premium agro-commodities and industrial products across Africa, Asia, and Europe.
              </p>
            </div>

            {/* Block 2 */}
            <div className="space-y-3 sm:space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <span className="text-[11px] sm:text-xs font-bold text-brand-forest uppercase tracking-widest block">
                Sourcing & Compliance
              </span>
              <p>
                With deep-rooted partnerships in Masasi, Mtwara, Newala, Dodoma, Iringa, and Arusha, we deliver consistent quality, transparent trade practices, and unmatched logistics efficiency.
              </p>
              <p>
                Our expertise bridges African producers with global buyers through strong sourcing networks, compliance-driven exports, and professional documentation support.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Corporate Pillars: 3-Column Card Grid */}
        <div className="py-10 sm:py-14 lg:py-16 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

            {/* 01: Vision */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden space-y-2 p-5 sm:p-6 pt-6 sm:pt-7 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-emerald/40 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-emerald to-brand-coral opacity-80" />
              <div className="text-[11px] sm:text-xs font-mono font-bold text-brand-emerald tracking-wider uppercase">
                01 • Vision
              </div>
              <h4 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight group-hover:text-brand-emerald transition-colors">
                Our Vision
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To become Africa&apos;s most trusted sourcing and export partner for agro and natural products.
              </p>
            </motion.div>

            {/* 02: Mission (Hero Pillar) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden space-y-2 p-5 sm:p-6 pt-6 sm:pt-7 rounded-2xl bg-gradient-to-b from-white to-amber-50/30 border border-brand-coral/30 hover:border-brand-coral shadow-sm hover:shadow-card-hover transition-all group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold" />
              <div className="text-[11px] sm:text-xs font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold tracking-wider uppercase">
                02 • Mission
              </div>
              <h4 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight group-hover:text-brand-coral transition-colors">
                Our Mission
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To connect Africa&apos;s agricultural strength to the world through integrity, innovation, and impactful partnerships.
              </p>
            </motion.div>

            {/* 03: Goal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden space-y-2 p-5 sm:p-6 pt-6 sm:pt-7 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-gold/60 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-goldLight opacity-80" />
              <div className="text-[11px] sm:text-xs font-mono font-bold text-brand-gold tracking-wider uppercase">
                03 • Goal
              </div>
              <h4 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight group-hover:text-brand-gold transition-colors">
                Sustainable Excellence
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To empower Tanzanian farmers, enrich international buyers, and promote sustainable trade excellence under one trusted banner.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Minimalist Key Operational Facts Bar */}
        <div className="pt-8 sm:pt-12 lg:pt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold tracking-tight">
              Mtwara & Dar
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-brand-slateMuted uppercase tracking-wider mt-1">
              Dual Commercial Hubs
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold tracking-tight">
              6 Key Regions
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-brand-slateMuted uppercase tracking-wider mt-1">
              Direct Origin Belts
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold tracking-tight">
              50–55+ LBS
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-brand-slateMuted uppercase tracking-wider mt-1">
              Certified RCN Outturn
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold tracking-tight">
              Global Ports
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-brand-slateMuted uppercase tracking-wider mt-1">
              Direct Sea Freight
            </div>
          </div>
        </div>

      </div>

      {/* Organic Wave Curve Transitioning into ProductsGrid */}
      <WaveDivider color="#0B0F17" position="bottom" flip />
    </section>
  );
}
