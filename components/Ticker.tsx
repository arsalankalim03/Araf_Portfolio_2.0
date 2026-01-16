
import React from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

const items = [
  "BRANDING",
  "CONTENT CREATION",
  "PUBLIC RELATIONS",
  "WEBSITE DESIGNING",
  "MARKETING"
];

export const Ticker: React.FC = () => {
  return (
    <section className="w-full bg-neutral-100 dark:bg-black border-y border-neutral-200 dark:border-neutral-900 overflow-hidden py-10 flex relative z-20 transition-colors duration-500">
      {/* Gradient fade on edges for smoothness */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-100 dark:from-black to-transparent z-10 pointer-events-none hidden md:block transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-100 dark:from-black to-transparent z-10 pointer-events-none hidden md:block transition-colors duration-500" />

      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: "-50%" }}
        transition={{ 
          ease: "linear", 
          duration: 30, 
          repeat: Infinity 
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center">
             <span className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-neutral-600 dark:text-neutral-400 px-8 whitespace-nowrap hover:text-black dark:hover:text-white transition-colors duration-300 cursor-default">
              {item}
             </span>
             <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neutral-400 dark:bg-neutral-700" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
