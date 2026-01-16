
import React from 'react';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

export const Terms: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black min-h-screen text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-[1000px] mx-auto px-6 mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
          transition={{ duration: 0.5 }}
          className="font-display text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter uppercase mb-12 cursor-default origin-left"
        >
          Terms of<br />Service
        </motion.h1>
        
        <div className="space-y-8 text-neutral-600 dark:text-neutral-400 font-light text-lg md:text-xl leading-relaxed">
          <p>Last updated: May 2025</p>
          <p>Please read these Terms of Service carefully before using our website operated by A'raf.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">1. Acceptance</h2>
          <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">2. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of A'raf and its licensors.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">3. Links To Other Web Sites</h2>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by A'raf.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">4. Termination</h2>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          
          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">5. Limitation of Liability</h2>
          <p>In no event shall A'raf, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">6. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">7. Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
