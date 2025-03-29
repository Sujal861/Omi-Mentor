
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    rotateX: 10,
    scale: 0.95,
    z: -100,
  },
  in: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    z: 0,
  },
  out: {
    opacity: 0,
    rotateX: -10,
    scale: 0.95,
    z: -100,
  },
};

const pageTransition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  duration: 0.6,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full transformStyle-preserve3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
