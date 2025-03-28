import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, BarChart3, Menu, User, X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationsPopover } from '@/components/notifications/NotificationsPopover';
import ThreeDCard from '@/components/ui/3d-card';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 25, stiffness: 150 };
  
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [15, -15]), 
    springConfig
  );
  
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-15, 15]), 
    springConfig
  );
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Activity },
    { name: 'Insights', path: '/insights', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const normalizedY = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm silver-shadow' : 'py-4 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div 
                ref={logoRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-12 h-12 perspective-1000"
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <ThreeDCard 
                    className="w-12 h-12 rounded-xl overflow-hidden" 
                    rotationIntensity={15}
                    shadowIntensity={0.8}
                  >
                    <motion.div 
                      className="relative w-full h-full rounded-lg bg-gradient-to-tr from-silver-300 to-silver-500 flex items-center justify-center overflow-hidden"
                      initial={{ rotateY: 0 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 4px 12px rgba(159, 158, 161, 0.2)",
                          "0 8px 24px rgba(159, 158, 161, 0.4)",
                          "0 4px 12px rgba(159, 158, 161, 0.2)"
                        ]
                      }}
                      transition={{ 
                        scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                        animate={{ 
                          rotate: [0, 45, 0],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <Circle className="text-white w-6 h-6 fill-white/20 stroke-white relative z-10" />
                    </motion.div>
                  </ThreeDCard>
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-silver-500 to-silver-700 dark:from-silver-300 dark:to-silver-500">
                  Omi Mentor
                </span>
                <span className="text-xs text-silver-600 dark:text-silver-400 -mt-1">Your Wellness Guide</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={cn(
                    'relative flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors',
                    isActive 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <NotificationsPopover />
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-100"
              >
                <span className="sr-only">Open menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className={cn(
          "md:hidden overflow-hidden",
          isOpen ? "block" : "hidden"
        )}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-2 pb-4 px-4 sm:px-6 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                )}
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
