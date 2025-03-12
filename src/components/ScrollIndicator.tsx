
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollIndicator = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8],
        y: [0, 5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
      <ChevronDown 
        className="text-accent" 
        size={isMobile ? 24 : 32} 
        strokeWidth={2} 
      />
    </motion.div>
  );
};

export default ScrollIndicator;
