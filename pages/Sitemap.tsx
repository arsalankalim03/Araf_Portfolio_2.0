
import React from 'react';
import { Footer } from '../components/Footer';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export const Sitemap: React.FC = () => {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Work', to: '/work' },
    { label: 'Studio', to: '/studio' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black min-h-screen text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-[1600px] mx-auto px-6 mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter uppercase mb-16 cursor-default origin-left"
        >
          Sitemap
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8">Pages</h2>
                <ul className="space-y-4">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter hover:text-neutral-500 transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8">Projects</h2>
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <Link to={`/work/${project.id}`} className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter hover:text-neutral-500 transition-colors">
                                {project.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
