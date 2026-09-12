'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  HTMLMotionProps,
} from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  max?: number;
  glare?: boolean;
  className?: string;
  perspective?: number;
}

export function TiltCard({
  children,
  max = 6,
  glare = true,
  className,
  perspective = 1200,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw Mouse Coordinates relative to card Top-Left
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dimensions
  const cardWidth = useMotionValue(400);
  const cardHeight = useMotionValue(300);

  // Gentle Spring Configuration for smooth corporate inertia
  const springConfig = { stiffness: 200, damping: 25 };

  // Calculate gentle 3D rotations based on cursor position
  const rawRotateX = useTransform(mouseY, [0, cardHeight.get()], [max, -max]);
  const rawRotateY = useTransform(mouseX, [0, cardWidth.get()], [-max, max]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  // Glare percentage calculation
  const glareX = useSpring(
    useTransform(mouseX, [0, cardWidth.get()], [0, 100]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [0, cardHeight.get()], [0, 100]),
    springConfig
  );

  // Soft subtle glare overlay
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 75%)`;

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = rect;
      cardWidth.set(rect.width || 400);
      cardHeight.set(rect.height || 300);
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;

    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const rect = rectRef.current;
    if (rect) {
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
    rectRef.current = null;
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="w-full h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        className={twMerge(
          'relative overflow-hidden transition-all duration-300 ease-out will-change-transform',
          className
        )}
        {...props}
      >
        {/* Subtle content elevation on Z-axis (10px for subtle depth) */}
        <div
          style={{ transform: 'translateZ(10px)' }}
          className="relative z-10 h-full w-full"
        >
          {children}
        </div>

        {/* Soft Glare Layer */}
        {glare && (
          <motion.div
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0,
            }}
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  );
}
