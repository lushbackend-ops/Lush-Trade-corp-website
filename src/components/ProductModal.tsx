'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MapPin, Package, Shield, FileText, ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;

    // Pause Lenis smooth scrolling so modal can scroll naturally
    const lenis = (window as unknown as { lenis?: any }).lenis;
    if (lenis) {
      lenis.stop();
    }

    // Lock background page scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200 my-auto max-h-[88vh] flex flex-col overscroll-contain text-slate-800"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0C1E34] text-white border-b border-white/10 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-dark uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-white">{product.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div
            data-lenis-prevent
            className="p-6 overflow-y-auto space-y-6 flex-1 overscroll-contain"
          >
            
            {/* Visual Hero */}
            <div className="relative h-64 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={product.image}
                alt={product.altText}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent flex items-end p-6">
                <div>
                  <p className="text-brand-gold font-bold text-sm tracking-wide uppercase">{product.tagline}</p>
                  <h4 className="text-2xl font-extrabold text-white">{product.name}</h4>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Description</h5>
              <p className="text-slate-600 text-sm leading-relaxed">{product.fullDesc}</p>
            </div>

            {/* Specs Grid */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-brand-gold" /> Verified Quality & Export Specifications
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-sm flex flex-col">
                    <span className="text-[11px] text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-bold text-brand-dark">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Origins */}
            {product.origins && product.origins.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-brand-gold" /> Certified Origins
                </h5>
                <div className="flex flex-wrap gap-2">
                  {product.origins.map((origin, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                      {origin}, Tanzania
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Grades */}
            {product.grades && product.grades.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-brand-gold" /> Available Export Grades
                </h5>
                <div className="flex flex-wrap gap-2">
                  {product.grades.map((grade, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200">
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging */}
            {product.packaging && product.packaging.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  <Package className="w-4 h-4 mr-1 text-brand-gold" /> Packaging Options
                </h5>
                <ul className="space-y-1.5">
                  {product.packaging.map((pack, i) => (
                    <li key={i} className="flex items-center text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-gold mr-2 shrink-0" />
                      {pack}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            <div className="border-t border-slate-200 pt-4">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quality Guarantees</h5>
              <div className="space-y-2">
                {product.highlights.map((item, i) => (
                  <div key={i} className="flex items-start text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Need custom contract specifications? Contact our trade desk.
            </span>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-brand-dark bg-gradient-to-r from-brand-gold to-brand-goldLight rounded-lg shadow hover:shadow-md transition-all ml-auto"
            >
              <span>Request Quote for {product.name}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
