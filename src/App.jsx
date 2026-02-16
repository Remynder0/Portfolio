import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import projects from './data/projects.json';
import Fish from './components/Fish';
import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef(null);

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


  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Écran de chargement (seulement pour resize) */}
      <LoadingScreen 
        isLoading={isResizing} 
        onLoadingComplete={() => setIsResizing(false)} 
      />

      {/* Background Aquarium avec image unique */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 20, 40, 0.3), rgba(0, 40, 80, 0.4)), url('/src/data/images/aquarium/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Overlay flou quand modale ouverte */}
      {selectedProject && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10" />
      )}

      {/* Container des poissons */}
      <div className={`relative z-0 ${isMobile ? 'flex flex-col p-4 pt-20' : 'w-full h-full'}`}>
        {projects.map((project, index) => (
          <Fish key={project.id} project={project} index={index} isMobile={isMobile} onSelect={setSelectedProject} />
        ))}
      </div>

      {/* Titre du Portfolio */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-5">
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
  );
};

export default App;