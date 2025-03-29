
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  className?: string;
  rotationIntensity?: number;
}

// Define proper types for our variants
interface VariantProps {
  opacity: number;
  scale: number;
  x?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
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
    
    const variants: {
      initial: VariantProps;
      animate: VariantProps;
    } = {
      initial: {
        opacity: 0,
        scale: 0.95,
      },
      animate: {
        opacity: 1,
        scale: 1,
      }
    };
    
    // Add direction-specific properties
    switch (direction) {
      case 'left':
        variants.initial.x = -distance;
        variants.initial.rotateY = rotationIntensity;
        variants.animate.x = 0;
        variants.animate.rotateY = 0;
        break;
      case 'right':
        variants.initial.x = distance;
        variants.initial.rotateY = -rotationIntensity;
        variants.animate.x = 0;
        variants.animate.rotateY = 0;
        break;
      case 'top':
        variants.initial.y = -distance;
        variants.initial.rotateX = -rotationIntensity;
        variants.animate.y = 0;
        variants.animate.rotateX = 0;
        break;
      case 'bottom':
      default:
        variants.initial.y = distance;
        variants.initial.rotateX = rotationIntensity;
        variants.animate.y = 0;
        variants.animate.rotateX = 0;
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
