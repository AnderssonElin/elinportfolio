
import { useState } from "react";
import { motion } from "framer-motion";
import { Lamp } from "lucide-react";
import { useAskMeVisibility } from "./AskMe";

const CoinCounter = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const { setIsVisible } = useAskMeVisibility();

  const handleClick = () => {
    if (!hasClicked) {
      setIsVisible(true);
      setHasClicked(true);
    }
  };

  return (
    <>
      <div className="fixed top-4 left-4 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-bold">{hasClicked ? '1' : '0'} 🧞‍♂️</span>
      </div>
      <motion.button
        className="fixed bottom-4 left-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center"
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
          opacity: hasClicked ? 0.7 : 1,
          cursor: hasClicked ? 'default' : 'pointer',
        }}
      >
        <Lamp className="w-6 h-6 text-yellow-200" />
      </motion.button>
    </>
  );
};

export default CoinCounter;
