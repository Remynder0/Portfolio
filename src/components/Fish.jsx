import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFishBoost } from './fishEasterEgg';

const Fish = ({ project, index, isMobile, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({
    x: project.initialPosition.x,
    y: project.initialPosition.y
  });
  const fishSize = 70;
  const animationFrameRef = useRef();
  const baseVelocity = useRef(Math.max((Math.random() - 0.5) * 0.1, 0.05));
  const velocityX = useRef(baseVelocity.current);
  const [scaleX, setScaleX] = useState(velocityX.current > 0 ? -1 : 1);

  const initialY = useRef(project.initialPosition.y);
  const phase = useRef(Math.random() * 2 * Math.PI);
  const startTime = useRef(Date.now());

  const { isBoosted, handleHover, showEffects } = useFishBoost(
    velocityX,
    baseVelocity,
    project.name
  );

  useEffect(() => {
    if (isMobile || (isHovered && !isBoosted)) return;

    const updatePosition = () => {
      const elapsedTime = (Date.now() - startTime.current) / 1000;

      setPosition(prev => {
        let newX = prev.x + velocityX.current;
        const screenWidth = window.innerWidth;
        const fishWidthPercent = fishSize / screenWidth * 100;

        if (newX <= 0 || newX >= 100 - fishWidthPercent) {
          velocityX.current *= -1;
          setScaleX(s => s * -1);
          newX = newX <= 0 ? 0 : 100 - fishWidthPercent;
        }

        const amplitude = 2;
        const speed = 0.2 + index * 0.05;
        const bobbingOffset = Math.sin(elapsedTime * speed * 2 * Math.PI + phase.current) * amplitude;

        let newY = initialY.current + bobbingOffset;

        const screenHeight = window.innerHeight;
        const fishHeightPercent = fishSize / screenHeight * 100;
        newY = Math.max(0, Math.min(newY, 100 - fishHeightPercent));

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile, isHovered, isBoosted, fishSize, index]);

  const handleHoverStart = () => {
    setIsHovered(true);
    handleHover();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className={`${isMobile ? 'relative' : 'absolute'} cursor-pointer group`}
      style={isMobile ? {} : { left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
      transition={{ opacity: { duration: 0.5, delay: index * 0.1 }, scale: { duration: 0.3 } }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={() => onSelect(project)}
    >
      <div className={`${isMobile ? 'flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm mb-3' : 'flex flex-col items-center'}`}>
        <div
          className={`${project.fishColor} rounded-full p-4 shadow-lg transition-shadow ${
            isHovered ? 'shadow-2xl' : ''
          } ${isBoosted && showEffects ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse' : ''}`}
          style={{ transform: `scaleX(${scaleX})` }}
        >
          <svg width={isMobile ? '30' : '40'} height={isMobile ? '30' : '40'} viewBox="0 0 60 60" className="text-white">
            <path d="M10 30 Q10 15, 25 15 L40 15 Q50 15, 50 30 Q50 45, 40 45 L25 45 Q10 45, 10 30 Z M50 30 L58 25 L58 35 Z M20 25 Q22 25, 22 27 Q22 29, 20 29 Q18 29, 18 27 Q18 25, 20 25 Z" fill="currentColor" />
          </svg>
        </div>

        <span className={`${isMobile ? 'text-base flex-1' : 'mt-2 text-sm'} text-white font-semibold bg-black/50 px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm ${
          isBoosted && showEffects ? 'bg-yellow-500/70' : ''
        }`}>
          {project.name}
          {isBoosted && showEffects && ' 🚀'}
        </span>
      </div>
    </motion.div>
  );
};

export default Fish;
