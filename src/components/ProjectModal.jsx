import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ selectedProject, onClose }) => {
  if (!selectedProject) return null;

  const demoLink = selectedProject.links?.demo?.trim() || '';
  const hasDemo = demoLink !== '';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold text-white pr-12">{selectedProject.name}</h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
              {selectedProject.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {hasDemo ? (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Voir la Démo
              </a>
            ) : (
              <button
                disabled
                aria-disabled="true"
                className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-lg font-semibold text-center cursor-not-allowed shadow-none"
              >
                Voir la Démo
              </button>
            )}

            <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 rounded-lg font-semibold text-center hover:from-gray-800 hover:to-gray-900 transition-all shadow-md hover:shadow-lg">
              Code Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
