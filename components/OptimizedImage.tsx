
import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const motion = m as any;

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimizes Unsplash URLs by adding transformation parameters
 */
const getOptimizedUnsplashUrl = (url: string, width = 1200, quality = 75) => {
  if (!url.includes('unsplash.com')) return url;
  
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`;
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = 'aspect-auto',
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: priority
  });

  const shouldLoad = priority || inView;
  const optimizedSrc = getOptimizedUnsplashUrl(src);

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${aspectRatio} ${className} bg-neutral-200 dark:bg-neutral-900`}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </motion.div>
        )}
      </AnimatePresence>

      {shouldLoad && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            scale: isLoaded ? 1 : 1.05,
            filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full h-full object-${objectFit} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};
