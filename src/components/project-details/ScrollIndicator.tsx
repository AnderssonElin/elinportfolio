
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  showScrollIndicator: boolean;
  scrollToGallery: () => void;
}

const ScrollIndicator = ({ showScrollIndicator, scrollToGallery }: ScrollIndicatorProps) => {
  return (
    <motion.div 
      className="flex justify-center mt-8 mb-16"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: showScrollIndicator ? 1 : 0, 
        y: showScrollIndicator ? 0 : -10 
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={scrollToGallery}
        className="text-gray-400 hover:text-accent transition-colors flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="mb-2 text-sm">View Images</p>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ScrollIndicator;
