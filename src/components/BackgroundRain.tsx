
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RainDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  delay: number;
  duration: number;
}

const BackgroundRain = () => {
  const [drops, setDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    // Generera initiala regndroppar
    const generateDrops = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10, // Starta ovanför viewport
        size: Math.random() * 4 + 2, // Storlek mellan 2-6px
        opacity: Math.random() * 0.4 + 0.1, // Opacity mellan 0.1-0.5
        rotation: Math.random() * 360,
        delay: Math.random() * 2,
        duration: Math.random() * 10 + 15, // Faller i 15-25 sekunder
      }));
    };

    setDrops(generateDrops());

    // Uppdatera dropparna periodiskt
    const interval = setInterval(() => {
      setDrops(prevDrops => {
        const newDrops = [...prevDrops];
        // Uppdatera några droppar för att skapa variation
        for (let i = 0; i < 5; i++) {
          const indexToUpdate = Math.floor(Math.random() * newDrops.length);
          newDrops[indexToUpdate] = {
            ...newDrops[indexToUpdate],
            id: Date.now() + i, // Nytt ID för att trigga omrendering
            x: Math.random() * 100,
            y: -10,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.4 + 0.1,
            rotation: Math.random() * 360,
            delay: 0,
            duration: Math.random() * 10 + 15,
          };
        }
        return newDrops;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute"
          initial={{
            x: `${drop.x}%`,
            y: drop.y,
            opacity: drop.opacity,
            rotate: drop.rotation,
          }}
          animate={{
            y: "110vh",
            opacity: [drop.opacity, drop.opacity * 0.8, 0],
            rotate: drop.rotation + 180,
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Rundad droppe med gradient */}
          <div 
            style={{
              width: `${drop.size}px`,
              height: `${drop.size}px`,
            }}
            className="rounded-full bg-gradient-to-b from-white/30 to-white/10 border border-white/40"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundRain;
