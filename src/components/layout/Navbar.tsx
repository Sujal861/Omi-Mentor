
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
              <motion.div 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-balance-blue to-balance-indigo flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="w-3 h-3 bg-white rounded-full" />
              </motion.div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-balance-blue to-balance-indigo">
                Omni Mentor
              </span>
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
                      ? 'text-balance-indigo' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-balance-indigo rounded-full"
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
              <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-balance-red ring-2 ring-white"></span>
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
                    ? 'bg-indigo-50 text-balance-indigo dark:bg-gray-800 dark:text-balance-blue'
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
