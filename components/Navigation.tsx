
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Work', to: '/work', sub: 'Selected Projects' },
    { label: 'Studio', to: '/studio', sub: 'Our Philosophy' },
    { label: 'Services', to: '/services', sub: 'What We Do' },
    { label: 'Contact', to: '/contact', sub: 'Get In Touch' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center transition-all duration-700 mix-blend-difference text-white ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="flex items-center gap-12">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.span 
                  className="text-2xl font-display font-bold tracking-[-0.1em] uppercase z-[101] block"
                  whileHover={{ letterSpacing: '0.1em' }}
              >
                  A'RAF
              </motion.span>
            </Link>
        </div>

        <div className="flex items-center gap-8 z-[101]">
            <ThemeToggle />
            
            <button 
              onClick={toggleMenu}
              className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] group"
            >
              <span className="hidden md:inline group-hover:opacity-60 transition-opacity">
                {isOpen ? 'Close' : 'Index'}
              </span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex flex-col items-center justify-center gap-1.5 overflow-hidden transition-all group-hover:bg-white group-hover:text-black">
                  <motion.div 
                    animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-[1px] bg-current" 
                  />
                  <motion.div 
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 h-[1px] bg-current" 
                  />
                  <motion.div 
                    animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-[1px] bg-current" 
                  />
              </div>
            </button>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-white origin-left w-full opacity-20"
          style={{ scaleX }}
        />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-zk-white dark:bg-zk-black text-zk-black dark:text-zk-white z-[90] overflow-hidden"
          >
             <div className="h-full flex flex-col md:flex-row">
                <div className="flex-1 p-8 md:p-24 flex flex-col justify-center">
                   <div className="space-y-4">
                      {menuItems.map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                            className="group relative"
                          >
                             <Link
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className="inline-block"
                             >
                                <div className="flex items-baseline gap-6">
                                  <span className="font-mono text-xs opacity-30">0{index + 1}</span>
                                  <span className="text-5xl md:text-[8vw] font-display font-bold uppercase tracking-tighter group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                                      {item.label}
                                  </span>
                                </div>
                                <span className="absolute -bottom-2 left-12 text-[10px] font-mono uppercase tracking-[0.4em] opacity-0 group-hover:opacity-40 transition-opacity">
                                  {item.sub}
                                </span>
                             </Link>
                          </motion.div>
                      ))}
                   </div>
                </div>

                <div className="w-full md:w-1/3 bg-neutral-100 dark:bg-neutral-900/50 p-8 md:p-24 flex flex-col justify-between border-l border-neutral-200 dark:border-neutral-800">
                   <div className="space-y-12">
                      <div>
                         <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-4">Location</h4>
                         <p className="text-sm font-light leading-relaxed">
                            Bengaluru / Hyderabad<br/>
                            India, Earth
                         </p>
                      </div>
                      <div>
                         <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-4">Contact</h4>
                         <p className="text-sm font-light">
                            hello@araf.in<br/>
                            +91 7585913703
                         </p>
                      </div>
                   </div>

                   <div className="pt-12">
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] opacity-30 leading-loose">
                        A'RAF STUDIO — GLOBAL CREATIVE UNIT<br/>
                        © 2025 ALL RIGHTS RESERVED
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
