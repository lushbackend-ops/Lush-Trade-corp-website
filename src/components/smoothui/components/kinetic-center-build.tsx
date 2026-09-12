"use client";

/**
 * @description KineticCenterBuild — Apple Keynote-style word-by-word build animation.
 * Each new word enters from the right with velocity & soft blur, dynamically pushing the
 * line to the left with spring layout momentum until the entire phrase locks in the center.
 *
 * Supports scrolling trigger (activates when scrolled into view) and handles both
 * single heading phrases (locks permanently into place) and multi-phrase carousels.
 */

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface KineticCenterBuildProps {
  className?: string;
  /** Interval between phrase completions in milliseconds (for looping multiple phrases). */
  interval?: number;
  /** List of phrases to animate sequentially. */
  phrases?: string[];
  /** Convenience single-phrase prop. */
  text?: string;
  /** Interval between each word's entrance in ms. Default 360ms. */
  wordInterval?: number;
  /** Whether to trigger the kinetic build only when scrolled into view. Default true. */
  triggerOnScroll?: boolean;
  /** Viewport amount (0 to 1) required to activate the animation. Default 0.25. */
  viewportAmount?: number;
  /** Whether to loop through phrases when multiple phrases are provided. Default true for multiple, false for single. */
  loop?: boolean;
  /** Alignment: 'center' | 'left' | 'right'. Default 'center'. */
  align?: "center" | "left" | "right";
  /** Words that should receive custom highlight classes (e.g. gradients). */
  highlightWords?: string[];
  /** CSS class to apply to highlighted words. */
  highlightClassName?: string;
  /** Container HTML element tag. Default 'span'. */
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
}

const BUILD_EASE = [0.2, 0.8, 0.2, 1] as const;
const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

export default function KineticCenterBuild({
  phrases,
  text,
  className = "",
  interval = 2500,
  wordInterval = 360,
  triggerOnScroll = true,
  viewportAmount = 0.2,
  loop,
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

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection
  const isInView = useInView(containerRef, {
    once: true,
    amount: viewportAmount,
  });

  const shouldAnimate = !triggerOnScroll || isInView;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [wordCount, setWordCount] = useState(1);
  const [exiting, setExiting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentPhrase = phraseList[phraseIndex] ?? "";
  const words = React.useMemo(() => currentPhrase.split(" ").filter(Boolean), [currentPhrase]);

  const shouldLoop = loop !== undefined ? loop : phraseList.length > 1;

  useEffect(() => {
    if (!shouldAnimate) return;
    setHasStarted(true);
  }, [shouldAnimate]);

  useEffect(() => {
    if (!hasStarted) return;

    if (shouldReduceMotion) {
      if (shouldLoop && phraseList.length > 1) {
        const holdId = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phraseList.length);
        }, interval);
        return () => clearTimeout(holdId);
      }
      return;
    }

    setWordCount(1);
    setExiting(false);

    const buildTimers: ReturnType<typeof setTimeout>[] = [];

    // Incrementally show words
    for (let i = 1; i < words.length; i++) {
      buildTimers.push(
        setTimeout(() => {
          setWordCount(i + 1);
        }, i * wordInterval)
      );
    }

    // If multiple phrases and loop is enabled, schedule exit & next phrase
    if (shouldLoop && phraseList.length > 1) {
      const totalBuild = (words.length - 1) * wordInterval + 340;
      const holdId = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phraseList.length);
          setWordCount(1);
          setExiting(false);
        }, 260 + 220);
      }, totalBuild + interval);

      buildTimers.push(holdId);
    }

    return () => {
      for (const t of buildTimers) {
        clearTimeout(t);
      }
    };
  }, [
    hasStarted,
    phraseIndex,
    phraseList.length,
    interval,
    wordInterval,
    shouldReduceMotion,
    shouldLoop,
    words.length,
  ]);

  const visibleWords = shouldReduceMotion || !hasStarted ? words : words.slice(0, wordCount);
  const restingAnimate = shouldReduceMotion
    ? { opacity: 1 }
    : { filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 };
  const exitAnimate = {
    filter: "blur(2.5px)",
    opacity: 0,
    transition: { duration: 0.26, ease: EXIT_EASE },
    y: -6,
  };

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
      className={cn("relative inline-flex items-center", alignClass, className)}
    >
      {/* Screen Reader & SEO accessible text */}
      <span className="sr-only">{currentPhrase}</span>

      {/* Invisible layout reservation to prevent any layout shift (CLS) */}
      <span
        aria-hidden="true"
        className={cn(
          "invisible select-none pointer-events-none opacity-0 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1",
          alignClass
        )}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className={cn(
              "inline-block",
              isHighlighted(word) && highlightClassName
            )}
          >
            {word}
          </span>
        ))}
      </span>

      {/* Kinetic Animated Overlay */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex flex-wrap items-center gap-x-2.5 gap-y-1",
          alignClass
        )}
      >
        <AnimatePresence mode="popLayout">
          {hasStarted &&
            visibleWords.map((word, i) => (
              <motion.span
                key={`${phraseIndex}-${i}`}
                layout
                style={{ display: "inline-block" }}
                className={cn(isHighlighted(word) && highlightClassName)}
                animate={exiting ? exitAnimate : restingAnimate}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        filter: "blur(3.5px)",
                        opacity: 0,
                        scale: 0.992,
                        x: 88,
                        y: 6,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: i === 0 ? 0.32 : 0.4,
                        ease: BUILD_EASE,
                        layout: { duration: 0.4, ease: BUILD_EASE },
                      }
                }
              >
                {word}
              </motion.span>
            ))}
        </AnimatePresence>
      </span>
    </Component>
  );
}

export { KineticCenterBuild };
