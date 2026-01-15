import React from 'react';
import { Services } from '../components/Services';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

export const ServicesPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black transition-colors duration-500"
    >
      <div className="px-6 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
          transition={{ duration: 0.5 }}
          className="font-display text-[12vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter uppercase cursor-default origin-left"
        >
          Our<br />Offerings
        </motion.h1>
      </div>
      <Services />
      <div className="h-24"></div>
      <Footer />
    </motion.div>
  );
};