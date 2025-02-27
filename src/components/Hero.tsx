
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const sqlCode = `/* Booting Up My Profile */ 
SELECT 
     'Hello, my name is ' || 'Elin' AS Greeting, 
     'BI Analyst' AS Role, 
     'Transforming raw data into golden insights' AS Tagline 
FROM experience;`;

  const colorizedSQL = sqlCode.split('\n').map((line, lineIndex) => (
    <motion.div
      key={lineIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: lineIndex * 0.1,
      }}
      className="flex whitespace-nowrap"
    >
      {line.split('').map((char, charIndex) => (
        <motion.span
          key={`${lineIndex}-${charIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: (lineIndex * line.length + charIndex) * 0.02,
          }}
          className={
            lineIndex === 0 ? "text-green-400" :
            ['S', 'E', 'L', 'E', 'C', 'T', 'F', 'R', 'O', 'M', 'A', 'S'].includes(char) && 
            ['SELECT', 'AS', 'FROM'].some(keyword => line.includes(keyword)) ? "text-blue-400" :
            char === "'" || (char >= 'a' && char <= 'z' && line.includes("'")) || 
            (char >= 'A' && char <= 'Z' && line.includes("'")) || 
            (char >= '0' && char <= '9' && line.includes("'")) || 
            char === ' ' && line.includes("'") && (line.indexOf(char) > line.indexOf("'") && 
            line.indexOf(char) < line.lastIndexOf("'")) ? "text-orange-400" :
            "text-gray-300"
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  ));

  const handleExecute = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F5') {
        event.preventDefault();
        handleExecute();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-secondary px-2 sm:px-4 md:px-6 lg:px-8 relative">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          className="bg-primary/30 p-4 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm font-sql"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="space-y-2 text-xs sm:text-sm">
            {colorizedSQL}
          </pre>
        </motion.div>
        
        <motion.button
          onClick={handleExecute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            delay: sqlCode.length * 0.02 + 0.5,
            duration: 0.5 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-4 sm:mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-sql flex items-center gap-2 mx-auto transition-colors text-sm sm:text-base group"
        >
          <motion.div
            className="absolute -inset-0.5 rounded-md bg-emerald-400/20"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative flex items-center gap-2">
            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
            Execute (F5)
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
