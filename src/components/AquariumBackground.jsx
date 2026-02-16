import React, { useMemo } from 'react';

const AquariumBackground = React.memo(({ rows = 2, cols = 2, tilesPrefix = 'tile' }) => {
  // Pré-calcul des tiles et URLs (ne se recalcule que si rows/cols/prefix changent)
  const tiles = useMemo(() => {
    const result = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        try {
          const imageUrl = new URL(
            `../data/images/aquarium/${tilesPrefix}-${row + 1}-${col + 1}.png`, 
            import.meta.url
          ).href;
          result.push({ 
            key: `${row}-${col}`,
            imageUrl 
          });
        } catch (error) {
          // Fallback bleu si image non trouvée
          result.push({ 
            key: `${row}-${col}`,
            imageUrl: null 
          });
        }
      }
    }
    return result;
  }, [rows, cols, tilesPrefix]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grille de tiles */}
      <div 
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tiles.map(({ key, imageUrl }) => (
          <div
            key={key}
            className="w-full h-full"
            style={imageUrl ? { 
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              imageRendering: 'auto',
              backfaceVisibility: 'hidden'
            } : {
              background: 'linear-gradient(180deg, #0a4d68 0%, #042a40 100%)'
            }}
          />
        ))}
      </div>

      {/* Overlay optionnel pour effet aquarium */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(rgba(0, 20, 40, 0.3), rgba(0, 40, 80, 0.4))',
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
});

AquariumBackground.displayName = 'AquariumBackground';

export default AquariumBackground;
