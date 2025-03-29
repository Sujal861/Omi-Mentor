
import React, { useRef } from 'react';
import { motion, useInView, Variant, Variants } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  className?: string;
  rotationIntensity?: number;
}

export const SectionTransition = ({
  children,
  direction = 'bottom',
  delay = 0,
  className = '',
  rotationIntensity = 5,
}: SectionTransitionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Configure initial and animate states based on direction
  const getVariants = () => {
    const distance = 50;
    
    const variants: Variants = {
      initial: {
        opacity: 0,
        scale: 0.95,
      } as Variant,
      animate: {
        opacity: 1,
        scale: 1,
      } as Variant
    };
    
    // Add direction-specific properties
    switch (direction) {
      case 'left':
        (variants.initial as any).x = -distance;
        (variants.initial as any).rotateY = rotationIntensity;
        (variants.animate as any).x = 0;
        (variants.animate as any).rotateY = 0;
        break;
      case 'right':
        (variants.initial as any).x = distance;
        (variants.initial as any).rotateY = -rotationIntensity;
        (variants.animate as any).x = 0;
        (variants.animate as any).rotateY = 0;
        break;
      case 'top':
        (variants.initial as any).y = -distance;
        (variants.initial as any).rotateX = -rotationIntensity;
        (variants.animate as any).y = 0;
        (variants.animate as any).rotateX = 0;
        break;
      case 'bottom':
      default:
        (variants.initial as any).y = distance;
        (variants.initial as any).rotateX = rotationIntensity;
        (variants.animate as any).y = 0;
        (variants.animate as any).rotateX = 0;
        break;
    }
    
    return variants;
  };
  
  const variants = getVariants();
  
  return (
    <div ref={ref} className={`perspective-1000 ${className}`}>
      <motion.div
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
        transition={{
          type: "spring",
          damping: 25, 
          stiffness: 100,
          delay: delay,
        }}
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
