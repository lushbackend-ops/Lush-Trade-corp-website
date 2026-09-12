'use client';

import React, { useState } from 'react';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductModal from './ProductModal';
import ProductSpotlightCard from './ProductSpotlightCard';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import { Layers } from 'lucide-react';
import WaveDivider from './WaveDivider';

export default function ProductsGrid() {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-[#0C1E34] via-[#10243E] to-[#0A192B] text-white relative overflow-hidden">
      {/* Radiant Ambient Light Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Dot Grid for Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              2. Products Portfolio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Commodities Portfolio"]} />
          </h2>

          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Certified origin grading, export specifications, and verified allocations.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-sky-400 mx-auto rounded-full mt-4" />
        </div>

        {/* Products Grid with Magnetic 3D Tilt, Aurora Glow & Focus-Dim Siblings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product) => (
            <ProductSpotlightCard
              key={product.id}
              product={product}
              dimmed={hoveredProductId !== null && hoveredProductId !== product.id}
              onHoverStart={() => setHoveredProductId(product.id)}
              onHoverEnd={() => setHoveredProductId(null)}
              onSelect={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>

      </div>

      {/* Product Spec Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Organic Wave Curve Transitioning into USPsSection */}
      <WaveDivider color="#FAF9F6" position="bottom" />
    </section>
  );
}
