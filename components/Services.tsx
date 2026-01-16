
import React, { useState, useRef } from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
const motion = m as any;
import { Plus, Minus } from 'lucide-react';
import { Service } from '../types';
import { useLocation } from 'react-router-dom';

const services: Service[] = [
  { 
    id: 1, 
    title: 'Performance Marketing', 
    description: 'We build performance ecosystems that turn visibility into measurable business growth. From paid media to conversion journeys, we don’t just drive traffic,  we drive intent, action, and revenue. Luxury brands and ambitious startups trust us to balance precision with scale.', 
    tags: ['Scalability', 'Precision', 'ROI'] 
  },
  { 
    id: 2, 
    title: 'Public Relations', 
    description: 'PR at A’raf is not about press releases , it’s about positioning. We shape how brands are perceived by journalists, investors, customers, and the market at large. From media relations to thought leadership, we help you own the narrative before someone else defines it for you.', 
    tags: ['Credibility', 'Positioning', 'Influence'] 
  },
  { 
    id: 3, 
    title: 'Social Media Marketing', 
    description: 'We turn social platforms into brand theatres. Every reel, carousel, caption, and story is designed to build desirability, credibility, and engagement not just impressions. We make brands feel alive, relevant, and culturally fluent.', 
    tags: ['Engagement', 'Relevance', 'Culture'] 
  },
  { 
    id: 4, 
    title: 'Website Designing', 
    description: 'Your website is not a brochure. It is your most important salesperson. We design and optimise websites that convert curiosity into confidence and traffic into transactions  combining UX, storytelling, and conversion strategy into one powerful digital presence.', 
    tags: ['Experience', 'Conversion', 'Clarity'] 
  },
   { 
    id: 5, 
    title: 'Visual Storytelling', 
    description: 'We create powerful visual narratives (Photography and Videography) that define how a brand looks and feels. From high-end photography to cinematic videography, every frame is thoughtfully styled, lit, and crafted to elevate perception and communicate brand value. Whether it’s product imagery, brand films, digital campaigns, or social-first videos, our visual content is designed to engage audiences, build credibility, and drive meaningful connection across platforms.', 
    tags: ['Branding', 'Storytelling', 'Impact'] 
  },
];

const ServiceItem: React.FC<{ 
  service: Service; 
  isActive: boolean; 
  toggle: () => void; 
}> = ({ service, isActive, toggle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="border-t border-neutral-300 dark:border-neutral-800 overflow-hidden transition-colors duration-500">
      <motion.div style={{ y }}>
        <button 
          onClick={toggle}
          className="w-full py-10 flex justify-between items-center text-left group"
        >
          <span className={`text-3xl md:text-5xl font-display font-medium transition-colors duration-300 ${isActive ? 'text-zk-black dark:text-white' : 'text-neutral-500 group-hover:text-zk-black dark:text-neutral-500 dark:group-hover:text-neutral-300'}`}>
            {service.title}
          </span>
          <span className={`border rounded-full p-2 transition-colors duration-300 ${isActive ? 'bg-zk-black text-white border-zk-black dark:bg-white dark:text-black dark:border-white' : 'border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-500'}`}>
             {isActive ? <Minus size={20} /> : <Plus size={20} />}
          </span>
        </button>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pb-10 text-neutral-600 dark:text-zk-gray text-lg md:text-xl max-w-2xl font-light">
                <p className="mb-6">{service.description}</p>
                <div className="flex gap-3 flex-wrap">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-neutral-300 dark:border-neutral-800 rounded-full text-sm uppercase tracking-wider text-zk-black dark:text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';

  return (
    <section id="services" className="py-24 px-6 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
         <div className="lg:col-span-1">
            {isServicesPage ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="sticky top-32"
              >
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-xs">
                  We integrate design, technology, and strategy to build high-resonance digital ecosystems for ambitious brands.
                </p>
              </motion.div>
            ) : (
              <motion.h2 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white sticky top-32 cursor-default origin-left"
              >
                OUR<br/>EXPERTISE
              </motion.h2>
            )}
         </div>

         <div className="lg:col-span-2 flex flex-col">
           {services.map((service) => (
             <ServiceItem 
               key={service.id}
               service={service}
               isActive={activeId === service.id}
               toggle={() => setActiveId(activeId === service.id ? null : service.id)}
             />
           ))}
           <div className="border-t border-neutral-300 dark:border-neutral-800 transition-colors duration-500" />
         </div>
      </div>
    </section>
  );
};
