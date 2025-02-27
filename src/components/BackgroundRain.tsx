
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Typer för regndroppar
interface RainDrop {
  id: number;
  x: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  rotation: number;
}

const BackgroundRain = () => {
  const [raindrops, setRaindrops] = useState<RainDrop[]>([]);
  
  useEffect(() => {
    // Skapa 30 regndroppar med olika egenskaper
    const newRaindrops = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // position i procent av skärmbredd
      size: Math.random() * 5 + 3, // storlek mellan 3-8px
      opacity: Math.random() * 0.3 + 0.1, // opacitet mellan 0.1-0.4
      delay: Math.random() * 15, // fördröjning i sekunder
      duration: Math.random() * 20 + 10, // fallhastighet mellan 10-30s
      rotation: Math.random() * 360, // rotation i grader
    }));
    
    setRaindrops(newRaindrops);
    
    // Uppdatera regndroppar kontinuerligt
    const interval = setInterval(() => {
      setRaindrops(prev => {
        const updated = [...prev];
        // Uppdatera ett par droppar för att skapa en kontinuerlig effekt
        const updateCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < updateCount; i++) {
          const indexToUpdate = Math.floor(Math.random() * updated.length);
          updated[indexToUpdate] = {
            ...updated[indexToUpdate],
            id: updated[indexToUpdate].id + 100, // ändra ID för att trigga re-render
            x: Math.random() * 100,
            delay: Math.random() * 5,
            rotation: Math.random() * 360,
          };
        }
        return updated;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute top-0"
          style={{ left: `${drop.x}%` }}
          initial={{ y: "-10%", opacity: drop.opacity, rotate: drop.rotation }}
          animate={{ 
            y: "100%", 
            opacity: [drop.opacity, drop.opacity * 0.7, 0],
            rotate: drop.rotation + Math.random() * 90 - 45,
          }}
          transition={{ 
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="rounded-full border-2 border-white/20 bg-transparent"
            style={{ 
              width: `${drop.size}px`, 
              height: `${drop.size}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundRain;
