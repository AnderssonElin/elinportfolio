
import { useState } from "react";
import { motion } from "framer-motion";
import { Lamp } from "lucide-react";

const CoinCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed top-4 left-4 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-bold">{count} 🧞‍♂️</span>
      </div>
      <motion.button
        className="fixed bottom-4 left-4 w-12 h-12 bg-purple-500 rounded-full cursor-pointer flex items-center justify-center"
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
          boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)",
        }}
        onClick={() => setCount(prev => prev + 1)}
        style={{
          background: "radial-gradient(circle at 30% 30%, #9333ea, #6b21a8)",
        }}
      >
        <Lamp className="w-6 h-6 text-yellow-200" />
      </motion.button>
    </>
  );
};

export default CoinCounter;
