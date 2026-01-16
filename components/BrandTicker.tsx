
import React, { useState } from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m } from 'framer-motion';
const motion = m as any;

const brands = [
  { name: "Own It Pure", logo: "https://logo.clearbit.com/ownitpure.com" },
  { name: "Nikah Forever", logo: "https://logo.clearbit.com/nikahforever.com" },
  { name: "Autocracy Machinery", logo: "https://logo.clearbit.com/autocracy.in" },
  { name: "Bhindi AI", logo: "https://logo.clearbit.com/bhindi.ai" },
  { name: "Haldirams", logo: "https://logo.clearbit.com/haldirams.com" },
  { name: "Dizzy Duck", logo: "https://logo.clearbit.com/dizzyduck.in" },
  { name: "Mixnosh", logo: "https://logo.clearbit.com/mixnosh.com" },
  { name: "Ducati", logo: "https://logo.clearbit.com/ducati.com" },
  { name: "Leeford", logo: "https://logo.clearbit.com/leeford.in" },
  { name: "Alite", logo: "https://logo.clearbit.com/alite.in" },
  { name: "Crunchyroll", logo: "https://logo.clearbit.com/crunchyroll.com" },
  { name: "RYZ", logo: "https://logo.clearbit.com/ryz.com" },
  { name: "Meaglow", logo: "https://logo.clearbit.com/meaglow.com" },
  { name: "CITTA", logo: "https://logo.clearbit.com/citta.com" },
  { name: "Fyule", logo: "https://logo.clearbit.com/fyule.com" },
  { name: "Creativefuel", logo: "https://logo.clearbit.com/creativefuel.io" },
  { name: "Revature", logo: "https://logo.clearbit.com/revature.com" },
  { name: "IVYN", logo: "https://logo.clearbit.com/ivyn.in" },
  { name: "The Beldior", logo: "https://logo.clearbit.com/thebeldior.com" },
  { name: "Goodlives", logo: "https://logo.clearbit.com/goodlives.in" },
  { name: "Kawasaki", logo: "https://logo.clearbit.com/kawasaki.com" },
  { name: "Cricket AllStars", logo: "https://logo.clearbit.com/cricketallstars.com" },
  { name: "Cafe Jubilee", logo: "https://logo.clearbit.com/cafejubilee.com" },
  { name: "Hyderabad Anime Club", logo: "https://logo.clearbit.com/hac.in" }
];

const BrandItem: React.FC<{ brand: { name: string; logo: string } }> = ({ brand }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center px-12 md:px-20 group">
      <div className="h-10 md:h-12 w-auto flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
        {!hasError ? (
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="h-full w-auto object-contain max-w-[150px] dark:invert transition-all"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="font-display font-bold text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 uppercase tracking-tighter whitespace-nowrap transition-colors">
            {brand.name}
          </span>
        )}
      </div>
      {/* Subtle geometric separator */}
      <div className="ml-12 md:ml-20 w-[1px] h-6 bg-neutral-300 dark:bg-neutral-800 rotate-12 transition-colors" />
    </div>
  );
};

export const BrandTicker: React.FC = () => {
  return (
    <section className="w-full bg-white dark:bg-zk-black border-y border-neutral-100 dark:border-neutral-900 py-16 md:py-24 overflow-hidden flex relative z-20 transition-colors duration-500">
      {/* Edge Fades for Cinematic Depth */}
      <div className="absolute top-0 left-0 w-32 md:w-80 h-full bg-gradient-to-r from-white dark:from-zk-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-80 h-full bg-gradient-to-l from-white dark:from-zk-black to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          ease: "linear", 
          duration: 45, // Slightly slower for better readability
          repeat: Infinity 
        }}
      >
        {/* Double items for seamless loop */}
        {[...brands, ...brands].map((brand, index) => (
          <BrandItem key={index} brand={brand} />
        ))}
      </motion.div>
    </section>
  );
};
