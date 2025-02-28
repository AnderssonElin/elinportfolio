
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAskMeVisibility } from "./AskMe";

const CoinCounter = () => {
  const [clickCount, setClickCount] = useState(0);
  const { setIsVisible } = useAskMeVisibility();

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setIsVisible(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 h-16">
        <div className="w-full h-full bg-gradient-to-br from-secondary/80 to-secondary/60 backdrop-blur-sm">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="flex-1">
              <div className="bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                <span className="text-white font-bold">{clickCount} 🧞‍♂️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.button
        className="fixed bottom-4 left-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center overflow-hidden z-50"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{
          boxShadow: "0 0 15px rgba(155, 135, 245, 0.5)",
        }}
        onClick={handleClick}
        style={{
          background: "radial-gradient(circle at 30% 30%, #9b87f5, #7b67d5)",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-200" />
        </motion.div>
      </motion.button>
    </>
  );
};

export default CoinCounter;
