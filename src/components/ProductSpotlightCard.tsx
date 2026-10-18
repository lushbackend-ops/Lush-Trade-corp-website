"use client";

/**
 * @description Product Spotlight Card with aurora ambient glow, magnetic 3D tilt, shimmer sweep, and focus-dim sibling effects.
 * Inspired by KokonutUI Spotlight & tailored for Lush Trade Corp Products.
 */

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Product } from "@/data/products";
import { 
  ArrowRight, 
  MapPin, 
  Leaf, 
  Trees, 
  Globe2, 
  Sparkles, 
  Award, 
  Coffee, 
  Droplets,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────────

const TILT_MAX = 8;
const TILT_SPRING = { stiffness: 280, damping: 26 } as const;

// ─── Thematic Palette per Product / Category ───────────────────────────────────

interface ProductTheme {
  color: string;
  icon: LucideIcon;
  badgeBg: string;
}

const THEME_MAP: Record<string, ProductTheme> = {
  rcn: {
    color: "#FDAB0A", // Lush Golden Amber
    icon: Sparkles,
    badgeBg: "rgba(253, 171, 10, 0.15)",
  },
  "cashew-kernels": {
    color: "#FF7A00", // Vivid Tangerine
    icon: Award,
    badgeBg: "rgba(255, 122, 0, 0.15)",
  },
  pulses: {
    color: "#E11D74", // Vivid Magenta Pink
    icon: Leaf,
    badgeBg: "rgba(225, 29, 116, 0.15)",
  },
  coffee: {
    color: "#FD322C", // Warm Coral Flame
    icon: Coffee,
    badgeBg: "rgba(253, 50, 44, 0.15)",
  },
  timber: {
    color: "#EA580C", // Rich Teak Orange
    icon: Trees,
    badgeBg: "rgba(234, 88, 12, 0.15)",
  },
};

function getProductTheme(product: Product): ProductTheme {
  if (THEME_MAP[product.id]) {
    return THEME_MAP[product.id];
  }

  // Category fallback
  switch (product.category) {
    case "Timber":
      return { color: "#EA580C", icon: Trees, badgeBg: "rgba(234, 88, 12, 0.15)" };
    case "Agro-Commodities":
    default:
      return { color: "#FDAB0A", icon: Leaf, badgeBg: "rgba(253, 171, 10, 0.15)" };
  }
}

// ─── Component Props ────────────────────────────────────────────────────────────

export interface ProductSpotlightCardProps {
  product: Product;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: (product: Product) => void;
  className?: string;
}

export default function ProductSpotlightCard({
  product,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onSelect,
  className,
}: ProductSpotlightCardProps) {
  const theme = getProductTheme(product);
  const CategoryIcon = theme.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates (-0.5 to 0.5 relative to card center)
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    onHoverStart();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    rectRef.current = null;
    onHoverEnd();
  };

  return (
    <motion.div
      ref={cardRef}
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.45 : 1,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 950,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(product)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left cursor-pointer",
        // Obsidian slate frosted glass with thickened luminous light borders
        "bg-[#0F1722]/90 border-white/20 shadow-xl backdrop-blur-md",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:border-brand-gold hover:shadow-2xl hover:-translate-y-1.5",
        "h-full",
        className
      )}
    >
      {/* ─── Ambient Background Layer ─── */}
      {/* Subtle static accent tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl z-0"
        style={{
          background: `radial-gradient(ellipse at 25% 20%, ${theme.color}12, transparent 70%)`,
        }}
      />

      {/* ─── Card Visual Media ─── */}
      <div className="relative h-44 sm:h-52 md:h-56 w-full overflow-hidden bg-slate-900 rounded-t-2xl shrink-0 z-10">
        <Image
          src={product.image}
          alt={product.altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Soft bottom image gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1722] via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
          {/* Category Pill with Icon */}
          <span
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold backdrop-blur-md border shadow-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#0F172A",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <CategoryIcon className="w-3.5 h-3.5" style={{ color: theme.color }} />
            <span>{product.category}</span>
          </span>

          {/* MOQ / Season Tag if present */}
          {(product.moq || product.season) && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-bold bg-white/95 backdrop-blur-md text-slate-900 border border-white/50 shadow-md">
              {product.moq ? `MOQ: ${product.moq}` : product.season}
            </span>
          )}
        </div>
      </div>

      {/* ─── Card Body Content ─── */}
      <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          {/* Title with subtle color shift on hover */}
          <h3 
            className="text-base sm:text-lg font-bold text-white tracking-tight transition-colors duration-200 group-hover:text-brand-gold"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p 
            className="text-xs font-semibold mt-0.5 sm:mt-1 tracking-wide"
            style={{ color: theme.color }}
          >
            {product.tagline}
          </p>

          {/* Short description */}
          <p className="text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Technical Highlight Badges */}
        <div className="space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3 border-t border-white/15">
          {product.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium text-[11px] sm:text-xs">{spec.label}:</span>
              <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded-lg border border-white/20 shadow-sm text-[11px] sm:text-xs">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Origins Tag if available */}
        {product.origins && product.origins.length > 0 && (
          <div className="flex items-center space-x-1.5 text-[10.5px] sm:text-[11px] text-slate-300 pt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.color }} />
            <span className="truncate">Origins: {product.origins.join(", ")}</span>
          </div>
        )}

        {/* Card Action Button */}
        <div className="pt-1.5 sm:pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full inline-flex items-center justify-center py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-gradient-to-r hover:from-brand-coral hover:to-brand-gold border border-white/15 hover:border-transparent transition-all duration-300 group/btn shadow-sm hover:shadow-[0_4px_20px_rgba(253,50,44,0.35)]"
          >
            <span>View Specifications</span>
            <ArrowRight 
              className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1 text-brand-gold group-hover/btn:text-white" 
            />
          </button>
        </div>
      </div>

      {/* ─── Accent Bottom Line (expands on card hover) ─── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2.5px] w-0 rounded-full transition-all duration-500 group-hover:w-full z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${theme.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}
