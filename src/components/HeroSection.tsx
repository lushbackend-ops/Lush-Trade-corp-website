'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';

/**
 * =========================================================================
 * ⚙️ HERO SECTION CONFIGURATION (All values in PX for instant editing)
 * Edit any number below and press Save (Ctrl+S) — changes apply instantly!
 * =========================================================================
 */
export const HERO_CONFIG = {
  // 1. Heading Typography
  heading: {
    desktopFontSize: 56,    // Desktop headline font size in px (e.g. 52 - 68)
    tabletFontSize: 42,     // Tablet headline font size in px
    mobileFontSize: 34,     // Mobile headline font size in px
    maxWidth: 960,          // Maximum width of headline text block in px
    marginBottom: 14,       // Space below heading (above ship) in px
  },

  // 2. Top Enterprise Eyebrow Badge
  badge: {
    fontSize: 11,           // Badge font size in px
    paddingX: 14,           // Horizontal padding in px
    paddingY: 5,            // Vertical padding in px
    marginBottom: 14,       // Space below badge (above heading) in px
  },

  // 3. Ocean Ship Dimensions & Positions (All in PX)
  ship: {
    xPosition: 0,           // Ship X offset in px (0 = perfectly centered, + shifts right, - shifts left)
    yPosition: 0,           // Ship Y offset in px (0 = centered between text & buttons, + shifts down, - shifts up)
    desktopWidth: 700,      // Ship width on desktop in px (e.g. 580 - 760)
    desktopHeight: 226,     // Ship height on desktop in px (width / 2.83)
    tabletWidth: 480,       // Ship width on tablets in px
    tabletHeight: 170,      // Ship height on tablets in px
    mobileWidth: 340,       // Ship width on mobile in px
    mobileHeight: 120,      // Ship height on mobile in px
    horizontalOffset: 0,    // (Alias for xPosition)
    verticalOffset: 0,      // (Alias for yPosition)
    marginBottom: 8,        // Space below ship (above subheading) in px
  },

  // 4. Subheading (Replaces buttons below the ship)
  subheading: {
    text: "Connecting Africa's farm-gate agricultural strength to the world — Exporting Grade-A Raw Cashews, Pulses, Arabica Coffee & Hardwood Timber across global maritime trade routes.",
    desktopFontSize: 17,    // Subheading font size on desktop in px
    tabletFontSize: 15,     // Subheading font size on tablet in px
    mobileFontSize: 13,     // Subheading font size on mobile in px
    maxWidth: 780,          // Maximum width of subheading text block in px
    marginTop: 6,           // Space above subheading (below ship) in px
    lineHeight: 1.6,        // Line height multiplier
  },

  // 5. Section Layout Spacing
  layout: {
    paddingTop: 80,         // Space from top navbar in px
    paddingBottom: 80,      // Space above bottom wave curve in px
    maxWidth: 1240,         // Maximum container width in px
  },
};

export default function HeroSection() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = React.useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.5;
      videoRef.current.play().then(() => {
        setIsVideoReady(true);
      }).catch(() => {
        // Fallback if autoplay is blocked initially
        setIsVideoReady(true);
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100vh] bg-[#060B12]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Direct CSS injection so modifying HERO_CONFIG values instantly changes font size and ship size */}
        <style>{`
          #hero h1.hero-title {
            font-size: ${HERO_CONFIG.heading.desktopFontSize}px;
            max-width: ${HERO_CONFIG.heading.maxWidth}px;
            margin-bottom: ${HERO_CONFIG.heading.marginBottom}px;
          }
          @media (max-width: 1024px) {
            #hero h1.hero-title {
              font-size: ${HERO_CONFIG.heading.tabletFontSize}px;
            }
          }
          @media (max-width: 640px) {
            #hero h1.hero-title {
              font-size: ${HERO_CONFIG.heading.mobileFontSize}px;
            }
          }
          #hero p.hero-subheading {
            font-size: ${HERO_CONFIG.subheading.desktopFontSize}px;
            max-width: ${HERO_CONFIG.subheading.maxWidth}px;
            margin-top: ${HERO_CONFIG.subheading.marginTop}px;
            line-height: ${HERO_CONFIG.subheading.lineHeight};
          }
          @media (max-width: 1024px) {
            #hero p.hero-subheading {
              font-size: ${HERO_CONFIG.subheading.tabletFontSize}px;
            }
          }
          @media (max-width: 640px) {
            #hero p.hero-subheading {
              font-size: ${HERO_CONFIG.subheading.mobileFontSize}px;
            }
          }
        `}</style>

        {/* Cinematic Background Video Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => {
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo('#about', { 
                  offset: -72, 
                  duration: 1.8, 
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                });
              } else {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
            src="/videos/ebbba0a9-5dac-4c61-9cf8-0995d72173b5.mp4"
          />
          {/* Subtle gradient overlay to ensure text readability over the video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#060B12]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ maxWidth: `${HERO_CONFIG.layout.maxWidth}px` }}
          className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center select-none pointer-events-none -mt-16 sm:-mt-40 lg:-mt-48"
        >
          {/* Top Enterprise Badge */}
          <div
            style={{
              fontSize: `${HERO_CONFIG.badge.fontSize}px`,
              paddingLeft: `${HERO_CONFIG.badge.paddingX}px`,
              paddingRight: `${HERO_CONFIG.badge.paddingX}px`,
              paddingTop: `${HERO_CONFIG.badge.paddingY}px`,
              paddingBottom: `${HERO_CONFIG.badge.paddingY}px`,
              marginBottom: `${HERO_CONFIG.badge.marginBottom}px`,
            }}
            className="inline-flex items-center space-x-2 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white shadow-md select-none"
          >
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="font-bold text-white tracking-wide uppercase">
              Mtwara & Dar es Salaam • Enterprise Agro Exporter
            </span>
          </div>

          {/* Main H1 Title - Centered */}
          <h1 className="hero-title font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-lg text-center mx-auto">
            <KineticCenterBuild
              align="center"
              phrases={["Connecting Tanzania's Agricultural Strength to the World"]}
              highlightWords={["Agricultural", "Strength"]}
              highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-white"
            />
          </h1>

          
        </motion.div>

        {/* Organic Ocean Wave Curve Divider (Seamless boundary into About section) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-8 lg:-bottom-12 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none transition-opacity duration-200 text-[#FAF9F6]"
        >
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-10 sm:h-12 md:h-16 lg:h-20"
            preserveAspectRatio="none"
          >
            {/* Foam crest line with subtle gold sheen */}
            <path
              d="M0,78 C240,120 500,40 760,84 C1020,128 1240,54 1440,88"
              stroke="rgba(197, 155, 39, 0.45)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Solid foreground wave connecting directly into About section background */}
            <path
              d="M0,80 C240,122 500,42 760,86 C1020,130 1240,56 1440,90 L1440,125 L0,125 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
