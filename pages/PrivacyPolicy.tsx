
import React from 'react';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

export const PrivacyPolicy: React.FC = () => {
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
          Privacy<br />Policy
        </motion.h1>
        
        <div className="space-y-8 text-neutral-600 dark:text-neutral-400 font-light text-lg md:text-xl leading-relaxed">
          <p>
            Last updated: May 2025
          </p>
          <p>
            This Privacy Policy describes how A'raf ("we", "us", or "our") collects, uses, and shares your personal information when you use our website. By accessing or using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">1. Information Collection</h2>
          <p>
            We collect information that you provide directly to us, such as when you fill out a contact form, subscribe to a newsletter, or communicate with us. This may include your name, email address, and any other information you choose to provide.
          </p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">2. Use of Information</h2>
          <p>
            We use the information we collect to operate, maintain, and improve our services, to communicate with you, and to comply with legal obligations. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">3. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
           <h2 className="text-black dark:text-white text-2xl font-display font-bold uppercase mt-12 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@araf.in.
          </p>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
