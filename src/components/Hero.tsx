
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const sqlCode = `/* Booting Up My Profile */
SELECT 'Hello, my name is ' || 'Elin' AS Greeting,
               'BI Analyst' AS Role,
               'Transforming raw data into golden insights' AS Tagline
FROM experience;`;

  // Separera SQL-koden i rader för korrekt formatering och animation
  const colorizedSQL = sqlCode.split('\n').map((line, lineIndex) => (
    <motion.div
      key={lineIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: lineIndex * 0.5, // Varje rad kommer att visas med 0.5s mellanrum
      }}
    >
      {line.split(' ').map((word, wordIndex) => {
        // Behåll mellanslag i början av raden
        const prefix = line.match(/^\s*/)?.[0] || '';
        if (wordIndex === 0) {
          word = prefix + word;
        }

        if (['SELECT', 'FROM', 'AS'].includes(word.trim())) {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-blue-400">
              {word}{' '}
            </span>
          );
        } else if (word.includes("'Hello, my name is '") || word.includes("'Transforming raw data into golden insights'")) {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-orange-400">
              {word}{' '}
            </span>
          );
        } else if (word.includes("'")) {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-red-400">
              {word}{' '}
            </span>
          );
        } else if (word.includes('/*') || word.includes('*/')) {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-green-400">
              {word}{' '}
            </span>
          );
        } else {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-gray-300">
              {word}{' '}
            </span>
          );
        }
      })}
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
    <section className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 relative">
      <div className="w-full max-w-4xl">
        <motion.div
          className="bg-primary/30 p-8 rounded-lg backdrop-blur-sm font-sql flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="space-y-2 whitespace-pre">
            {colorizedSQL}
          </pre>
        </motion.div>
        
        <motion.button
          onClick={handleExecute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: sqlCode.split('\n').length * 0.5 + 0.5, // Väntar tills alla rader är synliga plus lite extra
            duration: 0.5 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md font-sql flex items-center gap-2 mx-auto transition-colors"
        >
          <Play className="w-4 h-4" />
          Execute (F5)
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
