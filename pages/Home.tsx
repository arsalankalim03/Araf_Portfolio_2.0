
import React from 'react';
import { Hero } from '../components/Hero';
import { Ticker } from '../components/Ticker';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
import { BrandTicker } from '../components/BrandTicker';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

export const Home: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Ticker />
      <div className="h-24"></div>
      <Services />
      <Projects />
      <BrandTicker />
      <Testimonials />
      <Footer />
    </motion.div>
  );
};
