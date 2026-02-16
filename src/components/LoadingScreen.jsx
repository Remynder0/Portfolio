import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    setProgress(0);
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Petit délai pour voir la barre complète
        setTimeout(() => {
          onLoadingComplete();
        }, 200);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #042a40 0%, #0a4d68 100%)'
          }}
        >
          <div className="text-center px-8">
            {/* Titre */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-12"
            >
              Rémy Leber
            </motion.h2>

            {/* Barre de progression avec poisson */}
            <div className="w-full max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                {/* Container de la barre avec poisson à l'intérieur */}
                <div className="relative h-12 bg-white/10 rounded-full overflow-visible backdrop-blur-sm flex items-center px-2">
                  {/* Barre de progression remplie */}
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-cyan-500/30"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  
                  {/* Poisson emoji qui nage dans la barre */}
                  <motion.div
                    className="absolute text-3xl z-10"
                    style={{ 
                      left: `${Math.max(2, progress)}%`, 
                      transform: 'translateX(-50%) scaleX(-1)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    🐟
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
