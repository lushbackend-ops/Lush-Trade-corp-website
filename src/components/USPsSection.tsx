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
      title: '360° Sourcing & Logistics',
      description: 'End-to-end global supply chain execution from Tanzania directly to processing hubs across Asia, Europe, and the Middle East.',
      badge: '360° Global Reach',
    },
    {
      icon: ShieldCheck,
      title: 'On-Ground Quality Control',
      description: 'Rigorous on-ground quality control, moisture verification, and continuous SGS and phytosanitary inspections before vessel loading.',
      badge: 'SGS & Purity Assured',
    },
    {
      icon: Users,
      title: 'Verified Supplier Base',
      description: 'Direct, long-term farming contracts and established aggregation networks in Masasi, Mtwara, Newala, Dodoma, Iringa, and Arusha.',
      badge: 'Direct Farm Contracts',
    },
    {
      icon: FileCheck,
      title: 'Dedicated Documentation',
      description: 'Experienced in-house export documentation and logistics team managing customs, CBT compliance, and international shipping clearance.',
      badge: 'Zero Delay Docs',
    },
    {
      icon: Award,
      title: 'Ethical & Transparent Trade',
      description: 'Uncompromising integrity and ethical, transparent trade policies that empower Tanzanian producers and build lasting buyer trust.',
      badge: 'Fair Trade Standards',
    },
    {
      icon: Clock,
      title: 'Bushes to Port Operations',
      description: 'Dedicated and highly experienced on-ground team managing logistics seamlessly from bushes to port operations in Mtwara and Dar es Salaam.',
      badge: 'Bushes to Port',
    },
  ];

  return (
    <section id="usps" className="py-24 bg-brand-cream text-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-mint border border-brand-leaf/20">
            <Award className="w-3.5 h-3.5 text-brand-forest" />
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              Why Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Why Partner With Us"]} />
          </h2>

          <p className="text-brand-slateMuted text-base max-w-xl mx-auto">
            Connecting African agricultural producers directly to international buyers and global ports.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Feature Cards Grid with 3D Tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-card-hover h-full flex flex-col justify-between group relative overflow-hidden transition-all"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-mint/40 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-40" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-brand-mint text-brand-forest flex items-center justify-center shadow-sm group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-brand-mint text-brand-forest border border-brand-leaf/20">
                        {usp.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-emerald transition-colors">
                      {usp.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {usp.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-brand-emerald group-hover:text-brand-gold transition-colors">
                    <span>Guaranteed Execution</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Special Trade Bridge Banner with TiltCard */}
        <div className="mt-12">
          <TiltCard max={8} glare={true} className="rounded-2xl bg-gradient-to-br from-brand-forest via-brand-emerald to-brand-dark text-white p-8 shadow-xl border border-brand-gold/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Global Trade Partnership</span>
                <h3 className="text-2xl font-bold">Seamless Trade Bridge Across Global Corridors</h3>
                <p className="text-slate-300 text-sm max-w-2xl">
                  Lush Trade Corp Tanzania Limited provides a seamless trade bridge between Africa&apos;s producers and global buyers through our strong sourcing and export network.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-brand-dark bg-gradient-to-r from-brand-gold to-brand-goldLight shadow-glow hover:scale-105 transition-transform shrink-0"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-5 h-5 ml-2" />
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
