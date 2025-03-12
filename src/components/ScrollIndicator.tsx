
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="flex justify-center mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, 10, 20],
          }}
          transition={{
            duration: 1.5,
            delay: index * 0.3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-4 relative">
            <div className="absolute w-px h-4 bg-accent origin-bottom rotate-45 left-1/2"></div>
            <div className="absolute w-px h-4 bg-accent origin-bottom -rotate-45 left-1/2"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollIndicator;
