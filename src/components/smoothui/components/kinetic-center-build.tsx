"use client";

/**
 * @description KineticCenterBuild — Clean word-by-word kinetic entrance animation.
 * Optimized for strict SEO compliance: renders text exactly once to prevent
 * crawlers and accessibility scrapers from detecting duplicate heading text.
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface KineticCenterBuildProps {
  className?: string;
  interval?: number;
  phrases?: string[];
  text?: string;
  wordInterval?: number;
  triggerOnScroll?: boolean;
  viewportAmount?: number;
  loop?: boolean;
  align?: "center" | "left" | "right";
  highlightWords?: string[];
  highlightClassName?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
}

const BUILD_EASE = [0.2, 0.8, 0.2, 1] as const;

export default function KineticCenterBuild({
  phrases,
  text,
  className = "",
  triggerOnScroll = true,
  viewportAmount = 0.2,
  align = "center",
  highlightWords,
  highlightClassName,
  as: Component = "span",
}: KineticCenterBuildProps) {
  // Normalize phrases list
  const phraseList: string[] = React.useMemo(() => {
    if (phrases && phrases.length > 0) return phrases;
    if (text) return [text];
    return [""];
  }, [phrases, text]);

  const currentPhrase = phraseList[0] || "";
  const words = React.useMemo(() => currentPhrase.split(" ").filter(Boolean), [currentPhrase]);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection
  const isInView = useInView(containerRef, {
    once: true,
    amount: viewportAmount,
  });

  const shouldAnimate = !triggerOnScroll || isInView;

  const alignClass =
    align === "left"
      ? "justify-start text-left"
      : align === "right"
      ? "justify-end text-right"
      : "justify-center text-center";

  const isHighlighted = (word: string) => {
    if (!highlightWords || highlightWords.length === 0) return false;
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return highlightWords.some(
      (hw) => hw.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === cleanWord
    );
  };

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={cn("inline-flex flex-wrap items-center gap-x-2.5 gap-y-1", alignClass, className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block", isHighlighted(word) && highlightClassName)}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  y: 12,
                  filter: "blur(4px)",
                }
          }
          animate={
            shouldAnimate || shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
              : {
                  opacity: 0,
                  y: 12,
                  filter: "blur(4px)",
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            delay: shouldReduceMotion ? 0 : i * 0.08,
            ease: BUILD_EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

export { KineticCenterBuild };
