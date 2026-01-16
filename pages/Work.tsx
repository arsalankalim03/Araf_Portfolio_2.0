
import React from 'react';
import { Projects } from '../components/Projects';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

export const Work: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black transition-colors duration-500"
    >
      <div className="px-6 mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={typeof window !== 'undefined' && window.innerWidth >= 768 ? { 
            scale: 1.02, 
            x: 10, 
            color: "#a3a3a3", 
            transition: { duration: 0.2 } 
          } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-[12vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter uppercase cursor-default origin-left"
        >
          Selected<br />Works
        </motion.h1>
      </div>
      <Projects />
      <Footer />
    </motion.div>
  );
};
