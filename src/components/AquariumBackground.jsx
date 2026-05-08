import React, { useEffect, useRef, useState } from 'react';
import { BACKGROUND_IMAGE } from '../config';

const AquariumBackground = ({ children, contentWidth, scrollLeft, onBackgroundWidthChange }) => {
  // Configuration des bulles (position en % depuis la gauche, taille en px, délai/durée)
  const bubbles = [
    { left: 8, size: 18, delay: -2, duration: 9, opacity: 0.85 },
    { left: 28, size: 28, delay: -4, duration: 12, opacity: 0.6 },
    { left: 62, size: 14, delay: -1, duration: 8, opacity: 0.7 },
    { left: 78, size: 22, delay: -3, duration: 11, opacity: 0.55 },
    { left: 44, size: 12, delay: -6, duration: 7, opacity: 0.7 },
  ];

  const rays = [
    { left: '10%', rotate: -12, opacity: 0.12, duration: 14, delay: 0 },
    { left: '50%', rotate: -6, opacity: 0.08, duration: 18, delay: -3 },
    { left: '80%', rotate: -18, opacity: 0.06, duration: 22, delay: -6 },
  ];

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null);
  const [computedWidth, setComputedWidth] = useState(null);

  useEffect(() => {
    if (!naturalSize || !containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    if (!containerHeight || !naturalSize.height) return;
    const width = Math.round(naturalSize.width * (containerHeight / naturalSize.height));
    setComputedWidth(width);
    if (onBackgroundWidthChange) {
      onBackgroundWidthChange(width);
    }
  }, [naturalSize, onBackgroundWidthChange]);

  useEffect(() => {
    if (!naturalSize) return;
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerHeight = containerRef.current.clientHeight;
      if (!containerHeight || !naturalSize.height) return;
      const width = Math.round(naturalSize.width * (containerHeight / naturalSize.height));
      setComputedWidth(width);
      if (onBackgroundWidthChange) {
        onBackgroundWidthChange(width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [naturalSize, onBackgroundWidthChange]);

  const backgroundWidth = contentWidth
    ? `${contentWidth}px`
    : computedWidth
    ? `${computedWidth}px`
    : '100%';
  const backgroundTranslate = scrollLeft ? `translateX(${-scrollLeft}px)` : 'translateX(0px)';

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="relative h-full"
          style={{
            width: backgroundWidth,
            transform: backgroundTranslate,
            willChange: 'transform'
          }}
        >
          <img
            src={BACKGROUND_IMAGE}
            alt="aquarium"
            className="absolute inset-0 w-full h-full object-contain"
            ref={imageRef}
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (naturalWidth && naturalHeight) {
                setNaturalSize({ width: naturalWidth, height: naturalHeight });
              }
            }}
          />

          {/* Overlays animés réutilisant et améliorant les classes existantes */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Rayons lumineux : plusieurs couches pour un rendu plus naturel */}
            {rays.map((r, i) => (
              <div
                key={`ray-${i}`}
                className="ray"
                style={{
                  left: r.left,
                  transform: `translateX(-50%) rotate(${r.rotate}deg)`,
                  opacity: r.opacity,
                  animationDuration: `${r.duration}s`,
                  animationDelay: `${r.delay}s`,
                }}
              />
            ))}

            {/* Bulles réalistes générées dynamiquement */}
            {bubbles.map((b, i) => (
              <div
                key={`bubble-${i}`}
                className="bubble"
                style={{
                  left: `${b.left}%`,
                  bottom: '-6%',
                  width: b.size,
                  height: b.size,
                  opacity: b.opacity,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.duration}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu enfant au-dessus des overlays */}
      <div className="absolute inset-0 z-20">
        {children}
      </div>
    </div>
  );
};

export default AquariumBackground;