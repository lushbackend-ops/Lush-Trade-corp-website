'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, ArrowUpRight, Globe, Users, FileCheck } from 'lucide-react';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function USPsSection() {
  const usps = [
    {
      icon: Globe,
      title: 'Sourcing & Logistics Coordination',
      description: 'Coordinated supply chain management from Tanzanian origin hubs directly to processing destinations across Asia, Europe, and the Middle East.',
      badge: 'Global Corridors',
      label: 'Sourcing and logistics coordination',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Inspection & Grading',
      description: 'On-ground quality evaluation, moisture verification, outturn assessment, and official phytosanitary inspection prior to vessel stowage.',
      badge: 'Pre-Shipment Assured',
      label: 'Quality inspection and grading',
    },
    {
      icon: Users,
      title: 'Verified Supplier Network',
      description: 'Established aggregation relationships and verified supplier networks across Masasi, Mtwara, Newala, Dodoma, Iringa, and Arusha.',
      badge: 'Regional Aggregation',
      label: 'Supplier verification',
    },
    {
      icon: FileCheck,
      title: 'Export Documentation Support',
      description: 'Support for export documentation including certificates of origin, phytosanitary clearance, CBT compliance, and bill of lading documentation.',
      badge: 'Compliance Ready',
      label: 'Export documentation support',
    },
    {
      icon: Award,
      title: 'Transparent Trade Practices',
      description: 'Transparent communication, clear contract terms, and dependable commercial practices supporting long-term international trade partnerships.',
      badge: 'Integrity First',
      label: 'Transparent trade practices',
    },
    {
      icon: Clock,
      title: 'Origin-to-Port Coordination',
      description: 'Coordinated regional logistics managing commodity movement from local collection centers to port loading facilities in Mtwara and Dar es Salaam.',
      badge: 'Mtwara & Dar es Salaam',
      label: 'Origin-to-port coordination',
    },
  ];

  return (
    <section id="usps" className="py-12 sm:py-18 lg:py-24 bg-brand-cream text-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-brand-coral/20 shadow-xs">
            <Award className="w-3.5 h-3.5 text-brand-coral" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-coral uppercase tracking-wider">
              Why Us
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Why Partner With Us"]} />
          </h2>

          <p className="text-brand-slateMuted text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Connecting African agricultural producers directly to international buyers and global ports.
          </p>

          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-brand-gold via-brand-coral to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Feature Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard
                  max={6}
                  glare={true}
                  className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 shadow-sm hover:border-brand-coral/30 hover:shadow-card-hover h-full flex flex-col justify-between group relative overflow-hidden transition-all"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-40" />

                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 text-brand-coral flex items-center justify-center shadow-xs border border-brand-coral/15 group-hover:bg-gradient-to-r group-hover:from-brand-coral group-hover:to-brand-gold group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 text-brand-coral border border-brand-coral/20">
                        {usp.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-coral transition-colors">
                      {usp.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {usp.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-brand-coral group-hover:text-brand-gold transition-colors">
                    <span>{usp.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Special Trade Bridge Banner with TiltCard */}
        <div className="mt-8 sm:mt-12">
          <TiltCard max={8} glare={true} className="rounded-2xl bg-gradient-to-br from-[#1A0B14] via-[#1B0F1A] to-[#0B0F17] text-white p-5 sm:p-8 lg:p-10 shadow-2xl border border-brand-coral/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold">Global Trade Partnership</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Seamless Trade Bridge Across Global Corridors</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Lush Trade Corp Tanzania Limited provides a seamless trade bridge between Africa&apos;s producers and global buyers through our strong sourcing and export network.
                </p>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold shadow-[0_4px_25px_rgba(253,80,20,0.4)] hover:shadow-[0_6px_30px_rgba(253,80,20,0.55)] hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm shrink-0 cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </a>
            </div>
          </TiltCard>
        </div>

      </div>

      {/* Organic Wave Curve Transitioning into BlogSection */}
      <WaveDivider color="#ffffff" position="bottom" flip />
    </section>
  );
}
