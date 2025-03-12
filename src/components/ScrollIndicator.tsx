
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollIndicator = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Arrow with filling and glowing effect */}
        <motion.div
          className="relative"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 2,
          }}
        >
          {/* SVG for the arrow with dynamic filling effect */}
          <svg 
            width={isMobile ? "40" : "50"} 
            height={isMobile ? "40" : "50"} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(155,135,245,0.5)]"
          >
            {/* Outline path */}
            <path 
              d="M12 5L12 19M12 19L19 12M12 19L5 12" 
              stroke="#9b87f5" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="stroke-accent"
            />
            
            {/* Filling effect using Framer Motion SVG path animation */}
            <motion.path 
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1], 
                opacity: [0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="stroke-accent fill-transparent"
              style={{
                filter: "drop-shadow(0 0 4px #9b87f5)"
              }}
            />
            
            {/* Glowing effect */}
            <motion.circle
              cx="12"
              cy="12"
              r="8"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              fill="#9b87f5"
              className="fill-accent blur-md"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
