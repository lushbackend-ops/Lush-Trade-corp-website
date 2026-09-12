'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll and re-measure page dimensions whenever the route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      const lenisInstance = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
        const timer = setTimeout(() => {
          lenisInstance.resize();
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // 1. Enforce manual scroll restoration so browsers do not remember scroll position on refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      // Scroll to hash target if present, otherwise reset to top
      const hasTargetHash = window.location.hash && document.querySelector(window.location.hash);
      if (!hasTargetHash) {
        window.scrollTo(0, 0);
      }
    }

    // Initialize Lenis for world-class luxury momentum scrolling
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Make lenis globally accessible if needed
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let hashTimer: ReturnType<typeof setTimeout> | undefined;
    if (window.location.hash) {
      hashTimer = setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.1 });
        }
      }, 150);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Reset scroll position to top on beforeunload as well
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Smooth anchor navigation (#about, /#about, #products, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      let href = target.getAttribute('href');
      if (href && href.startsWith('/#') && window.location.pathname === '/') {
        href = href.substring(1);
      }
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -72,
            duration: 1.3,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (hashTimer) clearTimeout(hashTimer);
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
