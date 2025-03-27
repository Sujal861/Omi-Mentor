
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  damping?: number;
  stiffness?: number;
  rotationIntensity?: number;
  shadowIntensity?: number;
}

export const ThreeDCard = ({
  children,
  className = "",
  damping = 15,
  stiffness = 150,
  rotationIntensity = 10,
  shadowIntensity = 0.5,
}: ThreeDCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation config for smoother motion
  const springConfig = { damping, stiffness };
  
  // Create sprung versions of mouseX and mouseY
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-rotationIntensity, rotationIntensity]),
    springConfig
  );
  
  // Subtle movement for the "3D parallax" effect
  const translateX = useSpring(
    useTransform(mouseX, [0, 1], [-2, 2]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(mouseY, [0, 1], [-2, 2]),
    springConfig
  );

  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (0 to 1) relative to the card
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: hovered ? rotateX.get() : 0,
        rotateY: hovered ? rotateY.get() : 0,
        boxShadow: hovered 
          ? `
              0 5px 15px rgba(0,0,0,${shadowIntensity * 0.15}), 
              0 15px 40px rgba(0,0,0,${shadowIntensity * 0.2})
            `
          : `
              0 0 0 rgba(0,0,0,0), 
              0 0 0 rgba(0,0,0,0)
            `,
        transition: { duration: 0.2 }
      }}
      whileHover={{
        transition: {
          type: "spring",
          damping: damping,
          stiffness: stiffness,
        },
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          translateX,
          translateY,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ThreeDCard;
