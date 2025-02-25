
import { useState } from "react";
import { motion } from "framer-motion";

const CoinCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed top-4 left-4 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-bold">{count} 🪙</span>
      </div>
      <motion.button
        className="fixed bottom-4 left-4 w-12 h-12 bg-yellow-500 rounded-full cursor-pointer"
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
          boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)",
        }}
        onClick={() => setCount(prev => prev + 1)}
        style={{
          background: "radial-gradient(circle at 30% 30%, #fbbf24, #b45309)",
        }}
      >
        <span className="text-2xl">🪙</span>
      </motion.button>
    </>
  );
};

export default CoinCounter;
