
import React, { useRef, useState } from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
const motion = m as any;
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Project } from '../types';
import { OptimizedImage } from './OptimizedImage';

const ProjectItem: React.FC<{ project: Project; index: number; disableVideoHover?: boolean }> = ({ project, index, disableVideoHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isGif = project.video?.toLowerCase().endsWith('.gif');
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!disableVideoHover && videoRef.current && !isGif) {
      videoRef.current.play().catch(err => console.debug("Video play interrupted", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!disableVideoHover && videoRef.current && !isGif) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
    >
      <Link 
        to={`/work/${project.id}`} 
        className="block group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative overflow-hidden bg-neutral-200 dark:bg-neutral-900 aspect-[4/5] rounded-3xl">
          {/* Base Image: Using OptimizedImage for lazy loading and performance */}
          <OptimizedImage
            src={project.image}
            alt={project.title}
            aspectRatio="aspect-[4/5]"
            className={`w-full h-full transition-all duration-700 ease-in-out md:group-hover:scale-105 grayscale-0 md:grayscale md:group-hover:grayscale-0 ${!disableVideoHover && isHovered && project.video ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Hover Video/GIF Asset: Only rendered if not disabled and on likely desktop */}
          {!disableVideoHover && project.video && (
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-0 hidden md:block"
                >
                  {isGif ? (
                    <img 
                      src={project.video} 
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={project.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Overlay: Subtle darkening on hover only for Desktop */}
          <div className="absolute inset-0 bg-transparent md:group-hover:bg-black/10 transition-colors duration-500 z-10" />
          
          <div className="absolute top-6 right-6 bg-white text-black p-4 rounded-full opacity-0 md:group-hover:opacity-100 transform translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 ease-out z-20 hidden md:flex">
            <ArrowUpRight size={28} />
          </div>
        </div>

        <div className="mt-6 flex justify-between items-start border-b border-neutral-300 dark:border-neutral-800 pb-4 transition-colors duration-500">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-black dark:text-white mb-1 md:group-hover:text-neutral-500 dark:md:group-hover:text-neutral-300 transition-colors">{project.title}</h3>
            <p className="text-neutral-500 dark:text-zk-gray text-sm uppercase tracking-widest">{project.category}</p>
          </div>
          <span className="text-neutral-500 dark:text-zk-gray font-mono text-sm">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const isWorkPage = location.pathname === '/work';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} id="work" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 flex items-end justify-between">
           <motion.div
             initial={{ opacity: 0, y: 60 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
             className="max-w-4xl"
           >
             {isWorkPage ? (
               <motion.p 
                 style={{ y: titleY }}
                 className="text-xl md:text-3xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl transition-colors duration-500"
               >
                 We partner with brands that value design, storytelling, and growth in equal measure.
               </motion.p>
             ) : (
               <motion.h2 
                 style={{ y: titleY }}
                 className="font-display text-6xl md:text-8xl font-medium tracking-tighter text-black dark:text-white cursor-default origin-left uppercase"
               >
                 SELECTED<br/>WORKS
               </motion.h2>
             )}
           </motion.div>
           <span className="hidden md:block text-neutral-500 dark:text-zk-gray font-mono pb-2">(01 - {projects.length.toString().padStart(2, '0')})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              disableVideoHover={!isWorkPage} // Disable video previews on home screen
            />
          ))}
        </div>
        
        {!isWorkPage && (
          <div className="mt-24 text-center">
             <Link to="/work" className="inline-block border border-neutral-300 dark:border-neutral-700 px-8 py-4 rounded-full text-sm uppercase tracking-widest md:hover:bg-black dark:md:hover:bg-white md:hover:text-white dark:md:hover:text-black text-black dark:text-white transition-colors duration-300">
               View All Projects
             </Link>
          </div>
        )}
      </div>
    </section>
  );
};
