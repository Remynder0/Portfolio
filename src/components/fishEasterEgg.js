// ========================================
// 🎮 EASTER EGG - BOOST DE VITESSE
// ========================================
// Pour activer/désactiver, changez la ligne ci-dessous :

export const EASTER_EGG_ENABLED = true; // ← Mettez false pour désactiver

// ========================================

import { useState, useRef, useEffect } from 'react';

// Configuration
const CONFIG = {
  hoverThreshold: 5,        // Nombre de survols rapides requis
  hoverTimeWindow: 2000,    // Fenêtre de temps (ms)
  boostDuration: 3000,      // Durée du boost (ms)
  boostMultiplier: 4,       // Multiplicateur de vitesse
  showVisualEffects: true,  // Anneau jaune + émoji
  showConsoleLog: false     // Message dans la console
};

/**
 * Hook pour gérer l'easter egg du boost
 */
export const useFishBoost = (velocityX, baseVelocity, projectName) => {
  const [isBoosted, setIsBoosted] = useState(false);
  const hoverCount = useRef(0);
  const lastHoverTime = useRef(0);
  const boostTimeout = useRef(null);

  const activateBoost = () => {
    if (!EASTER_EGG_ENABLED) return;

    if (CONFIG.showConsoleLog) {
      console.log(`🚀 Boost activé pour ${projectName}!`);
    }

    setIsBoosted(true);
    
    const direction = velocityX.current > 0 ? 1 : -1;
    velocityX.current = baseVelocity.current * CONFIG.boostMultiplier * direction;
    
    hoverCount.current = 0;
    
    if (boostTimeout.current) {
      clearTimeout(boostTimeout.current);
    }
    
    boostTimeout.current = setTimeout(() => {
      setIsBoosted(false);
      const direction = velocityX.current > 0 ? 1 : -1;
      velocityX.current = baseVelocity.current * direction;
    }, CONFIG.boostDuration);
  };

  const handleHover = () => {
    if (!EASTER_EGG_ENABLED) return;

    const currentTime = Date.now();
    
    if (currentTime - lastHoverTime.current < CONFIG.hoverTimeWindow) {
      hoverCount.current += 1;
    } else {
      hoverCount.current = 1;
    }
    
    lastHoverTime.current = currentTime;
    
    if (hoverCount.current >= CONFIG.hoverThreshold && !isBoosted) {
      activateBoost();
    }
  };

  useEffect(() => {
    return () => {
      if (boostTimeout.current) {
        clearTimeout(boostTimeout.current);
      }
    };
  }, []);

  return {
    isBoosted: EASTER_EGG_ENABLED ? isBoosted : false,
    handleHover,
    showEffects: CONFIG.showVisualEffects
  };
};
