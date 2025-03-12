
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollIndicator = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Arrow with handwriting and filling effect */}
        <motion.div
          className="relative"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 4, // Start downward animation after drawing is complete
          }}
        >
          {/* SVG for the arrow with dynamic drawing and filling effect */}
          <svg 
            width={isMobile ? "60" : "80"} 
            height={isMobile ? "60" : "80"} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(155,135,245,0.6)]"
          >
            {/* Base outline path (hidden initially) */}
            <path 
              d="M12 4L12 20M12 20L19 13M12 20L5 13" 
              stroke="#9b87f5" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="stroke-accent opacity-20"
            />
            
            {/* Drawing effect - path being drawn like a pen */}
            <motion.path 
              d="M12 4L12 20M12 20L19 13M12 20L5 13"
              initial={{ pathLength: 0, opacity: 0.7 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
              }}
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="stroke-accent fill-transparent"
              style={{
                filter: "drop-shadow(0 0 6px #9b87f5)"
              }}
            />
            
            {/* Filling effect after drawing is complete */}
            <motion.path 
              d="M12 4L12 20M12 20L19 13M12 20L5 13"
              initial={{ pathLength: 1, fillOpacity: 0, fill: "transparent" }}
              animate={{ 
                fillOpacity: [0, 0, 0.8, 0.6],
              }}
              transition={{
                duration: 3,
                delay: 2.5, // Start filling after drawing is complete
                ease: "easeInOut",
              }}
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="stroke-accent fill-accent"
              style={{
                filter: "drop-shadow(0 0 8px #9b87f5)"
              }}
            />
            
            {/* Pulsing glow effect */}
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 0.4, 0],
                scale: [0.8, 0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                delay: 2.5, // Start glowing after drawing is complete
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              fill="#9b87f5"
              className="fill-accent blur-lg"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
