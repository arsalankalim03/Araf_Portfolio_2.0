
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 25;
      const moveY = (clientY - window.innerHeight / 2) / 25;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Background moves much slower (0% to 30%) to create distance
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Text moves much faster (0% to 220%) to feel closer to the user
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "220%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(15px)"]);

  // Combined Y value for text: Scroll Speed + Mouse Interaction
  const combinedY = useTransform([textY, springY], ([scroll, mouse]) => `calc(${scroll} + ${mouse}px)`);

  // Character-by-character animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: "100%", rotateX: 45 },
    visible: {
      y: 0,
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-zk-black perspective-1000">
      {/* Background Layer with Deep Parallax & Scroll Effects */}
      <motion.div 
        style={{ y: backgroundY, scale, filter: blur }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <motion.img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
          alt="Cinematic Abstract Dark"
          className="w-full h-full object-cover grayscale brightness-[0.25]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zk-black/60 via-transparent to-zk-black" />
        
        {/* Subtle moving grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ y: combinedY, opacity, x: springX }}
        className="relative z-10 px-6 w-full max-w-[1800px] text-left md:text-center"
      >
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-block mb-12"
        >
            <div className="flex items-center gap-4 px-4 py-2 border border-white/10 rounded-full backdrop-blur-md bg-white/5">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.4em]">Systems Live // Project 025-A</span>
            </div>
        </motion.div>

        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-bold text-[18vw] md:text-[14vw] leading-[0.75] tracking-tighter uppercase text-white flex flex-col items-center justify-center"
        >
          <div className="overflow-hidden h-[0.85em] flex">
            <motion.span variants={itemVariants}>A'R</motion.span>
            <motion.span variants={itemVariants} className="italic text-white/40">AF</motion.span>
          </div>
          <div className="overflow-hidden h-[0.85em] flex items-baseline gap-4">
             <motion.span variants={itemVariants} transition={{ delay: 0.2 }}>STUDIO</motion.span>
             <motion.div 
                variants={itemVariants}
                className="hidden md:block w-[0.2em] h-[0.2em] bg-white rounded-full mb-[0.15em]" 
             />
             <motion.span 
                variants={itemVariants}
                className="text-[0.4em] font-light italic tracking-normal lowercase text-white/20"
             >
                the void
             </motion.span>
          </div>
        </motion.h1 >

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 md:mt-20 flex flex-col items-center gap-6"
        >
            <p className="max-w-md text-white/40 font-light text-sm md:text-base leading-relaxed hidden md:block">
              An independent creative unit specializing in high-fidelity digital artifacts and brand resonance. 
            </p>
            <div className="relative w-px h-24 bg-gradient-to-b from-white to-transparent overflow-hidden">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-white z-10"
                />
            </div>
        </motion.div>
      </motion.div>

      {/* Cinematic Metadata Overlays */}
      <div className="absolute top-10 left-10 flex flex-col gap-1 z-20 pointer-events-none opacity-40 font-mono text-[9px] text-white tracking-widest uppercase">
        <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full"></span> 
            Coordinates: 12.9716° N, 77.5946° E
        </span>
        <span>A'RAF // CORE_ENGAGEMENT</span>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-1 z-20 pointer-events-none opacity-40 font-mono text-[9px] text-white tracking-widest uppercase">
        <span>Framerate: 60.00 FPS</span>
        <span>Memory: 1024.4 MB</span>
      </div>

      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 z-20 pointer-events-none opacity-40 font-mono text-[9px] text-white tracking-widest uppercase text-right">
        <span>Current State: ACTIVE</span>
        <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(i => (
                <div key={i} className={`w-1 h-3 ${i < 4 ? 'bg-white' : 'bg-white/20'}`}></div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 z-20 pointer-events-none opacity-20 font-mono text-[9px] text-white tracking-widest uppercase">
        <span>© 2025 ALL RIGHTS RESERVED</span>
        <span>A'RAF DIGITAL COLLECTIVE</span>
      </div>

      {/* Side Progress Bar */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-white/10 hidden lg:block">
        <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-0 w-full h-full bg-white origin-top"
        />
      </div>
    </section>
  );
};
