
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
        delay: lineIndex * 0.5,
      }}
      className="flex whitespace-nowrap"
    >
      {line.split(' ').map((word, wordIndex) => {
        const prefix = line.match(/^\s*/)?.[0] || '';
        if (wordIndex === 0) {
          word = prefix + word;
        }

        if (word.includes("'")) {
          const parts = word.split(/\b/);
          return (
            <span key={`${lineIndex}-${wordIndex}`}>
              {parts.map((part, partIndex) => {
                if (['my', 'name', 'is', 'raw', 'data', 'into', 'golden'].includes(part.toLowerCase())) {
                  return (
                    <span key={`${lineIndex}-${wordIndex}-${partIndex}`} className="text-red-400">
                      {part}
                    </span>
                  );
                } else if (part.includes("'")) {
                  return (
                    <span key={`${lineIndex}-${wordIndex}-${partIndex}`} className="text-orange-400">
                      {part}
                    </span>
                  );
                }
                return (
                  <span key={`${lineIndex}-${wordIndex}-${partIndex}`} className="text-orange-400">
                    {part}
                  </span>
                );
              })}
              {' '}
            </span>
          );
        } else if (['SELECT', 'FROM', 'AS'].includes(word.trim())) {
          return (
            <span key={`${lineIndex}-${wordIndex}`} className="text-blue-400">
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
    <section className="min-h-screen flex flex-col items-center justify-center bg-secondary px-2 sm:px-4 md:px-6 lg:px-8 relative">
      <div className="w-full max-w-4xl mx-auto overflow-x-auto">
        <motion.div
          className="bg-primary/30 p-4 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm font-sql"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="space-y-2 text-sm sm:text-base md:text-lg">
            {colorizedSQL}
          </pre>
        </motion.div>
        
        <motion.button
          onClick={handleExecute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: sqlCode.split('\n').length * 0.5 + 0.5,
            duration: 0.5 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-sql flex items-center gap-2 mx-auto transition-colors text-sm sm:text-base"
        >
          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
          Execute (F5)
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
