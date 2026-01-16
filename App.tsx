
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { Studio } from './pages/Studio';
import { ServicesPage } from './pages/ServicesPage';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { Sitemap } from './pages/Sitemap';
import { ChatWidget } from './components/ChatWidget';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { CustomCursor } from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m, AnimatePresence } from 'framer-motion';
const motion = m as any;
import { ThemeProvider } from './context/ThemeContext';
import { storage } from './services/storage';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initialize Local Image Storage
    storage.init();

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);
    
    const timeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-zk-black flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="relative overflow-hidden h-[20vw] flex items-center">
        <motion.h1 
          className="text-[18vw] font-display font-bold text-zk-white leading-none tracking-tighter"
        >
          {count.toString().padStart(3, '0')}
        </motion.h1>
      </div>
      <div className="absolute bottom-10 left-10 text-zk-white/30 font-mono text-xs uppercase tracking-[0.3em]">
        Initiating Digital Core // A'RAF 2025
      </div>
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </AnimatePresence>
  );
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="bg-zk-white dark:bg-zk-black text-zk-black dark:text-zk-white min-h-screen selection:bg-zk-black dark:selection:bg-zk-white selection:text-zk-white dark:selection:text-zk-black transition-colors duration-500">
        <CustomCursor />
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Router>
            <ScrollToTop />
            <Navigation />
            <main>
               <AnimatedRoutes />
            </main>
            <ScrollToTopButton />
            <ChatWidget />
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
