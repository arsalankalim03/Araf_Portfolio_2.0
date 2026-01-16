
import React, { useState, useRef } from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
const motion = m as any;
import { Instagram, Twitter, Linkedin, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const clients = [
  "Times of India", "Economic Times", "Your Story", "Cosmopolitan", "Hindustan Times", "Elle", "News 18", "Entrepreneur India"
];

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-medium uppercase tracking-widest rounded whitespace-nowrap z-50 pointer-events-none shadow-lg border border-neutral-800 dark:border-neutral-200"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-neutral-900 dark:border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    className="relative inline-block group"
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    <motion.span
      className="inline-block group-hover:text-white dark:group-hover:text-black transition-colors duration-300 text-neutral-400 dark:text-neutral-500"
      variants={{
        rest: { x: 0 },
        hover: { x: 5, color: "currentColor" } // Rely on group-hover text color
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  </motion.a>
);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Parallax effect for logos
  const logosY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <footer ref={footerRef} id="contact" className="bg-neutral-900 text-white dark:bg-zk-white dark:text-zk-black pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] mt-0 relative z-10 overflow-hidden transition-colors duration-500">
      
      {/* Subtle Background Animation */}
      <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] z-0 pointer-events-none opacity-40"
        animate={{ 
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-neutral-800/30 dark:from-neutral-300/30 via-transparent to-transparent blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-neutral-700/40 dark:from-neutral-200/40 via-transparent to-transparent blur-[80px]" />
      </motion.div>

      <div className="max-w-[1800px] mx-auto flex flex-col min-h-[80vh] justify-between relative z-10">
        
        {/* Clients Section - 12 Column Grid Layout */}
        <div className="w-full border-b border-neutral-800 dark:border-neutral-200 pb-16 mb-16 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-3">
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">Trusted Partners</p>
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-[250px] font-light">
                    We collaborate with ambitious brands and visionaries to define the future of digital interaction.
                  </p>
               </div>
               
               <div className="lg:col-span-9">
                  <motion.div 
                    style={{ y: logosY }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12"
                  >
                    {clients.map((client, index) => (
                      <div key={index} className="flex items-start lg:items-center">
                        <motion.h3 
                          className="text-xl md:text-3xl font-display font-bold text-neutral-500 md:text-neutral-600 dark:text-neutral-400 dark:md:text-neutral-300 cursor-default md:opacity-60 md:hover:opacity-100 transition-all"
                          initial={{ opacity: 1 }}
                          whileHover={typeof window !== 'undefined' && window.innerWidth >= 768 ? { 
                            scale: 1.05, 
                            color: "currentColor", 
                            opacity: 1,
                            x: 10
                          } : {}}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <span className="md:hover:text-white dark:md:hover:text-black transition-colors">
                            {client}
                          </span>
                        </motion.h3>
                      </div>
                    ))}
                  </motion.div>
               </div>
            </div>
        </div>

        {/* Main Contact Action */}
        <div className="flex-1 flex flex-col justify-center mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
             <div className="lg:col-span-10">
                <p className="text-xs md:text-sm font-mono uppercase tracking-widest mb-6 text-neutral-500 dark:text-neutral-400 ml-1">Start a Project</p>
                <a href="mailto:hello@araf.in" className="group block w-fit">
                  <h2 className="font-display text-[13vw] lg:text-[11vw] leading-[0.85] font-bold tracking-tighter text-white dark:text-black transition-colors group-hover:text-neutral-400 dark:group-hover:text-neutral-600 break-all lg:break-normal">
                    HELLO@<br/>ARAF.IN
                  </h2>
                  <motion.div 
                    className="h-2 bg-white dark:bg-black mt-4 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </a>
             </div>
          </div>
        </div>

        {/* Footer Bottom Grid - 12 Column Layout */}
        <div className="border-t border-neutral-800 dark:border-neutral-200 pt-12 transition-colors duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              
              {/* Socials */}
              <div className="lg:col-span-3">
                  <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white dark:text-black">Connect</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Tooltip text="Follow on Instagram">
                        <SocialLink href="https://www.instagram.com/araf_pr/?hl=en">Instagram</SocialLink>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip text="Follow on Twitter">
                        <SocialLink href="#">Twitter</SocialLink>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip text="Connect on LinkedIn">
                        <SocialLink href="https://www.linkedin.com/company/a-raf/posts/?feedView=all">LinkedIn</SocialLink>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip text="View Portfolio">
                         <SocialLink href="#">Behance</SocialLink>
                      </Tooltip>
                    </li>
                  </ul>
              </div>
              
              {/* Location */}
              <div className="lg:col-span-4">
                  <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white dark:text-black">Visit Us</h4>
                  <address className="not-italic text-neutral-400 dark:text-neutral-500 text-sm leading-relaxed">
                    <div className="flex gap-2 mb-4">
                      <MapPin size={16} className="mt-1 shrink-0 text-white dark:text-black" />
                      <span>
                        Opp. Golconda Factory, RTC  X Roads 404<br/>
                        Zaministanpur, Hyderabad 500020<br/>
                        India
                      </span>
                    </div>
                  </address>
              </div>

              {/* Copyright & Legal - Pushed to end on large screens */}
              <div className="md:col-span-2 lg:col-span-5 flex flex-col lg:items-end justify-between h-full">
                 <div className="mb-8 lg:mb-0 lg:text-right">
                     <Tooltip text="Established 2024">
                        <p className="font-display font-bold text-lg text-white dark:text-black">A'RAF STUDIO ©2025</p>
                     </Tooltip>
                     <Tooltip text="Worldwide License">
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-widest mt-1">All Rights Reserved</p>
                     </Tooltip>
                 </div>
                 
                 <div className="flex gap-6 lg:justify-end">
                    <Tooltip text="Read Legal Terms">
                      <Link to="/privacy-policy" className="text-neutral-500 dark:text-neutral-500 text-xs uppercase tracking-widest hover:text-white dark:hover:text-black transition-colors">Privacy</Link>
                    </Tooltip>
                    <Link to="/terms" className="text-neutral-500 dark:text-neutral-500 text-xs uppercase tracking-widest hover:text-white dark:hover:text-black transition-colors">Terms</Link>
                    <Link to="/sitemap" className="text-neutral-500 dark:text-neutral-500 text-xs uppercase tracking-widest hover:text-white dark:hover:text-black transition-colors">Sitemap</Link>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
};
