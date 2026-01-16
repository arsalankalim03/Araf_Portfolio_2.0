
import React from 'react';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;
import { OptimizedImage } from '../components/OptimizedImage';

const team = [
  { name: "Adeeb Jamal", role: "Founder", image: "https://i.postimg.cc/j26Q5CMH/Gemini_Generated_Image_j587qwj587qwj587.png" },
  { name: "Vishal Mohan", role: "Media Head", image: "https://i.postimg.cc/j26Q5CMP/Gemini_Generated_Image_3flgvc3flgvc3flg.png" },
  { name: "Arsalan Kalim", role: "Tech Lead", image: "https://i.postimg.cc/yxhXdWLh/Gemini_Generated_Image_gli3oogli3oogli3.png" },
  
];

export const Studio: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black min-h-screen transition-colors duration-500"
    >
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-32">
             <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
              className="font-display text-[12vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter uppercase mb-12 cursor-default origin-left"
            >
              We Are<br/>A'RAF
            </motion.h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-6 lg:col-start-7">
                    <p className="text-xl md:text-3xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-8">
                       A'raf is a Brand & Growth Studio that partners with businesses to build distinctive, credible, and scalable brands. We help organisations define how they look, how they communicate, and how they grow, across media, digital, performance, and culture.
                    </p>
                    
                    <p className="text-xl md:text-3xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-8">
                     A'raf operates at the intersection of storytelling and business outcomes. From shaping brand perception to driving measurable demand, we integrate PR, content, design, and performance marketing into one cohesive growth ecosystem.
                    </p>
                    
                    <p className="text-xl md:text-3xl text-neutral-500 font-light leading-relaxed">
                       Founded by communication strategists, creative leaders, and growth marketers,Our work is focused on building brands that earn trust, relevance, and long-term value.
                    </p>
                </div>
            </div>
        </div>

        <div className="w-full h-[60vh] md:h-[80vh] mb-32 overflow-hidden rounded-3xl grayscale hover:grayscale-0 transition-all duration-700">
            <OptimizedImage 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio Team" 
                className="w-full h-full"
            />
        </div>

        {/* Team Section */}
        <div className="mb-32 border-t border-neutral-200 dark:border-neutral-800 pt-24 transition-colors duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8">The Team</h2>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                    {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-6 group">
                             <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-800">
                                <OptimizedImage 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                                />
                             </div>
                             <div>
                                 <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">{member.name}</h3>
                                 <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">{member.role}</p>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 border-t border-neutral-200 dark:border-neutral-800 pt-16 transition-colors duration-500">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-8 font-mono">OUR VISION</h3>
                <ul className="text-xl md:text-2xl text-black dark:text-white space-y-4 font-light leading-relaxed">
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To become India’s most trusted Brand & Growth Studio</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To help ambitious brands build global-grade identities</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To redefine how PR, digital, and performance marketing work together</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To make Indian brands look, feel, and compete like international leaders</span>
                    </li>
                </ul>
            </div>
            <div>
                 <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-8 font-mono">OUR MISSION</h3>
                 <ul className="text-xl md:text-2xl text-black dark:text-white space-y-4 font-light leading-relaxed">
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To turn brands into category leaders</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To combine creativity with commercial impact</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To build stories that drive revenue</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To offer end-to-end brand growth under one roof</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neutral-400 mt-2 shrink-0 text-2xl">•</span>
                      <span>To help clients win attention, trust, and market share</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
