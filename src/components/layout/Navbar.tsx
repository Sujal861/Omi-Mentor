
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Bell, Menu, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
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

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* Animated 3D-style logo */}
              <motion.div 
                className="relative w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center overflow-hidden"
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: 360,
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 4px 12px rgba(79, 70, 229, 0.2)",
                    "0 8px 24px rgba(79, 70, 229, 0.4)",
                    "0 4px 12px rgba(79, 70, 229, 0.2)"
                  ]
                }}
                transition={{ 
                  rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-300/30 to-transparent"
                  animate={{ 
                    rotate: [0, 45, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                <span className="text-white font-bold text-lg">OM</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
                  Omi Mentor
                </span>
                <span className="text-xs text-gray-500 -mt-1">Your Wellness Guide</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          <div className="flex items-center">
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-100 relative"
            >
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
              <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            <div className="ml-4 md:hidden">
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

      {/* Mobile menu */}
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
