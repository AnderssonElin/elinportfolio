
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

  const getColor = (text: string, char: string, index: number): string => {
    if (text.includes("/* Booting Up My Profile */") && index <= text.indexOf("*/") + 2) {
      return "text-green-400";
    }
    
    if ((text.includes("SELECT") && text.indexOf("SELECT") <= index && index < text.indexOf("SELECT") + 6) ||
        (text.indexOf("AS") === index || text.indexOf("AS") === index - 1) ||
        (text.includes("FROM") && text.indexOf("FROM") <= index && index < text.indexOf("FROM") + 4)) {
      return "text-blue-400";
    }
    
    const singleQuotes = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "'") {
        singleQuotes.push(i);
      }
    }
    
    for (let i = 0; i < singleQuotes.length; i += 2) {
      if (i + 1 < singleQuotes.length && index >= singleQuotes[i] && index <= singleQuotes[i + 1]) {
        return "text-orange-400";
      }
    }
    
    if ((text.includes("||") && (index === text.indexOf("||") || index === text.indexOf("||") + 1)) ||
        (text.includes("Greeting") && text.indexOf("Greeting") <= index && index < text.indexOf("Greeting") + 8) ||
        (text.includes("Role") && text.indexOf("Role") <= index && index < text.indexOf("Role") + 4) ||
        (text.includes("Tagline") && text.indexOf("Tagline") <= index && index < text.indexOf("Tagline") + 7) ||
        (text.includes("experience") && text.indexOf("experience") <= index && index < text.indexOf("experience") + 10)) {
      return "text-white";
    }
    
    return "text-gray-300";
  };

  const calculateAnimationDelay = () => {
    let totalChars = 0;
    const lines = sqlCode.split('\n');
    const charDelays: Record<string, number> = {};
    
    lines.forEach((line, lineIndex) => {
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const globalIndex = totalChars;
        charDelays[`${lineIndex}-${charIndex}`] = globalIndex * 0.03;
        totalChars++;
      }
      totalChars += 2;
    });
    
    return charDelays;
  };
  
  const charDelays = calculateAnimationDelay();

  const colorizedSQL = sqlCode.split('\n').map((line, lineIndex) => (
    <motion.div
      key={lineIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: lineIndex * 0.15,
      }}
      className="flex whitespace-pre overflow-hidden text-[0.7rem] xs:text-sm sm:text-sm md:text-base leading-[1.6] xs:leading-[1.7] sm:leading-[1.8]"
    >
      {line.split('').map((char, charIndex) => (
        <motion.span
          key={`${lineIndex}-${charIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: charDelays[`${lineIndex}-${charIndex}`],
          }}
          className={getColor(line, char, charIndex)}
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
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative" id="hero">
      <div className="w-full max-w-3xl mx-auto relative z-20 px-2 sm:px-4 py-24">
        <motion.div
          className="bg-primary/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg backdrop-blur-sm font-sql overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="space-y-2">
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
            delay: sqlCode.length * 0.03 + 0.5,
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
