import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import projects from './data/projects.json';
import Fish from './components/Fish';
import ProjectModal from './components/ProjectModal';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Aquarium */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 20, 40, 0.6), rgba(0, 40, 80, 0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%230a4d68;stop-opacity:1" /><stop offset="100%" style="stop-color:%23042a40;stop-opacity:1" /></linearGradient></defs><rect fill="url(%23water)" width="1200" height="800"/><circle cx="100" cy="100" r="3" fill="%23ffffff" opacity="0.3"/><circle cx="300" cy="200" r="2" fill="%23ffffff" opacity="0.4"/><circle cx="500" cy="150" r="4" fill="%23ffffff" opacity="0.2"/><circle cx="800" cy="300" r="3" fill="%23ffffff" opacity="0.3"/><circle cx="1000" cy="250" r="2" fill="%23ffffff" opacity="0.5"/><circle cx="200" cy="500" r="3" fill="%23ffffff" opacity="0.3"/><circle cx="600" cy="600" r="4" fill="%23ffffff" opacity="0.2"/><circle cx="900" cy="550" r="2" fill="%23ffffff" opacity="0.4"/><path d="M0,400 Q300,350 600,400 T1200,400" stroke="%2315a8a8" stroke-width="2" fill="none" opacity="0.3"/><path d="M0,500 Q300,450 600,500 T1200,500" stroke="%2315a8a8" stroke-width="2" fill="none" opacity="0.2"/></svg>')`
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