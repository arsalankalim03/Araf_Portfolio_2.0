
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === Number(id));
  
  // Determine next project for navigation
  const currentIndex = projects.findIndex(p => p.id === Number(id));
  const nextProject = currentIndex !== -1 && currentIndex < projects.length - 1 
    ? projects[currentIndex + 1] 
    : projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, project]);

  if (!project) {
    return (
        <div className="h-screen flex items-center justify-center bg-zk-white dark:bg-zk-black text-black dark:text-white">
            <p>Project not found</p>
            <button onClick={() => navigate('/work')} className="ml-4 underline">Back to Work</button>
        </div>
    )
  }

  const isGif = (url?: string) => url?.toLowerCase().endsWith('.gif');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zk-white dark:bg-zk-black min-h-screen transition-colors duration-500"
    >
      {/* Header / Navigation */}
      <div className="pt-32 px-6 max-w-[1600px] mx-auto mb-12">
         <Link to="/work" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
         </Link>
         
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[10vw] md:text-[8vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter uppercase"
             >
                {project.title}
             </motion.h1>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-8 font-mono text-sm text-neutral-500 mb-2"
             >
                 <span>{project.category}</span>
                 <span>—</span>
                 <span>{project.year}</span>
             </motion.div>
         </div>
      </div>

      {/* Hero Media (Video, GIF or Image) */}
      <div className="px-6 mb-24">
         <motion.div 
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-[60vh] md:h-[85vh] rounded-[2rem] overflow-hidden bg-neutral-200 dark:bg-neutral-900 relative shadow-2xl"
         >
             {project.video ? (
               isGif(project.video) ? (
                 <OptimizedImage 
                   src={project.video} 
                   alt={project.title} 
                   className="w-full h-full"
                   priority 
                 />
               ) : (
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover"
                 >
                   <source src={project.video} type="video/mp4" />
                 </video>
               )
             ) : (
               <OptimizedImage src={project.image} alt={project.title} className="w-full h-full" priority />
             )}
         </motion.div>
      </div>

      {/* Details Grid */}
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
         <div className="lg:col-span-7">
             <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8 font-mono">Process / Artifact</h3>
             <p className="text-xl md:text-3xl text-black dark:text-white font-light leading-relaxed">
                {project.description}
             </p>
         </div>
         
         <div className="lg:col-span-4 lg:col-start-9 space-y-12">
             <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
                <div className="mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">Project Partner</h3>
                    <p className="text-xl text-black dark:text-white font-display font-medium">{project.client}</p>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">Synthesis</h3>
                    <p className="text-lg text-black dark:text-white font-light">{project.category}</p>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Core Frequency</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
             </div>
         </div>
      </div>

      {/* Next Project */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-32 px-6 bg-neutral-100 dark:bg-neutral-950 transition-colors">
         <div className="max-w-[1600px] mx-auto text-center">
             <p className="text-xs font-mono uppercase tracking-[0.4em] text-neutral-500 mb-10 italic">Observe next sequence</p>
             <Link to={`/work/${nextProject.id}`} className="group inline-block relative">
                 <h2 className="font-display text-[9vw] leading-none font-bold text-black dark:text-white tracking-tighter uppercase transition-all group-hover:italic group-hover:scale-105 duration-700">
                    {nextProject.title}
                 </h2>
                 <div className="flex justify-center mt-12 transform scale-150 transition-all duration-500 group-hover:translate-y-4">
                     <ArrowUpRight size={48} className="text-black dark:text-white opacity-20 group-hover:opacity-100" strokeWidth={1} />
                 </div>
             </Link>
         </div>
      </div>

      <Footer />
    </motion.div>
  );
};
