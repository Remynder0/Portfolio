import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import projects from './data/projects.json';
import Fish from './components/Fish';
import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';
import AquariumBackground from './components/AquariumBackground';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isResizing, setIsResizing] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scrollLeft, setScrollLeft] = useState(0);
  const [backgroundWidth, setBackgroundWidth] = useState(null);
  const resizeTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Masquer le loader HTML initial quand React est monté et prêt
  useEffect(() => {
    const hideInitialLoader = () => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
    };

    // Attendre que tout soit chargé (DOM + images tiles)
    const timer = setTimeout(hideInitialLoader, 500);
    
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      const container = containerRef.current;
      if (container) {
        setContainerSize({ width: container.scrollWidth, height: container.clientHeight });
      }
      
      // Affiche le loader uniquement pour les redimensionnements
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      setIsResizing(true);
      resizeTimeoutRef.current = setTimeout(() => {
        setIsResizing(false);
      }, 3000);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Convertir le scroll vertical en horizontal
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return undefined;

    const handleWheel = (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (delta === 0) return;
      event.preventDefault();
      container.scrollLeft += delta;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // Scroll au centre au chargement
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    // Attendre que le contenu soit chargé
    const scrollToCenter = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScroll / 2;
      setScrollLeft(container.scrollLeft);
    };

    // Petit délai pour s'assurer que tout est rendu
    const timer = setTimeout(scrollToCenter, 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Désactiver le scroll du body pour supprimer tout défilement
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMobile ? 'auto' : 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setContainerSize({ width: container.scrollWidth, height: container.clientHeight });
  }, [isMobile]);


  

  const handleBackgroundWidthChange = useCallback((width) => {
    setBackgroundWidth(width);
    setContainerSize((prev) => ({ ...prev, width }));
  }, []);

  const contentWidth = isMobile
    ? '100%'
    : backgroundWidth
    ? `${backgroundWidth}px`
    : '200%';

  return (
    <AquariumBackground
      contentWidth={backgroundWidth}
      scrollLeft={scrollLeft}
      onBackgroundWidthChange={handleBackgroundWidthChange}
    >
      <div 
        ref={containerRef}
        className={`relative w-full h-screen ${isMobile ? 'overflow-y-auto' : 'overflow-x-auto overflow-y-hidden'}`}
        onScroll={(event) => setScrollLeft(event.currentTarget.scrollLeft)}
      >
        {/* Écran de chargement (seulement pour resize) */}
        <LoadingScreen 
          isLoading={isResizing} 
          onLoadingComplete={() => setIsResizing(false)} 
        />

        {/* Overlay flou quand modale ouverte */}
        {selectedProject && (
          <div className="absolute left-0 top-0 h-full backdrop-blur-md bg-black/30 z-10" style={{ width: contentWidth }} />
        )}

        {/* Container des poissons */}
        <div className={`relative z-0 ${isMobile ? 'flex flex-col p-4 pt-20' : 'h-full'}`} style={{ width: contentWidth }}>
          {projects.map((project, index) => (
            <Fish
              key={project.id}
              project={project}
              index={index}
              isMobile={isMobile}
              onSelect={setSelectedProject}
              boundsWidth={containerSize.width}
              boundsHeight={containerSize.height}
            />
          ))}
        </div>

        {/* Titre du Portfolio */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[50]">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            Rémy Leber
          </h1>
          <p className="text-white/80 text-center mt-2 text-sm md:text-base">
            Cliquez sur un poisson pour découvrir le projet
          </p>
        </div>

        {/* Modale */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </AquariumBackground>
  );
};

export default App;