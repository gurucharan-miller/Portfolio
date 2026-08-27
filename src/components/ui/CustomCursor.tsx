import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useSpring(-100, { stiffness: 600, damping: 40 });
  const mouseY = useSpring(-100, { stiffness: 600, damping: 40 });

  const auraX = useSpring(-100, { stiffness: 150, damping: 25 });
  const auraY = useSpring(-100, { stiffness: 150, damping: 25 });

  useEffect(() => {
    // Check touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive-hover') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, auraX, auraY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Aura Ring */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.8 : 1,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-colors duration-300 ${
          isHovered
            ? 'border-2 border-[#FF6B00] bg-[#FF6B00]/15 blur-[1px]'
            : 'border border-[#FF6B00]/60 bg-transparent'
        }`}
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.4 : 1,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]"
      />
    </div>
  );
};
