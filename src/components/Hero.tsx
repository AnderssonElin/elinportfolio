
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const sqlCode = `/* Booting Up My Profile */\n\nSELECT 'Hello, my name is ' || 'Elin' AS Greeting,\n       'BI Analyst' AS Role,\n       'Transforming raw data into golden insights' AS Tagline\nFROM experience;`;

  // Separera SQL-koden i delar för färgkodning
  const colorizedSQL = sqlCode.split('\n').map((line, lineIndex) => {
    return line.split(' ').map((word, wordIndex) => {
      if (['SELECT', 'FROM', 'AS'].includes(word)) {
        return (
          <motion.span
            key={`${lineIndex}-${wordIndex}`}
            className="text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: (lineIndex * line.length + wordIndex) * 0.03,
            }}
          >
            {word}{' '}
          </motion.span>
        );
      } else if (word.startsWith("'") && word.endsWith("'")) {
        return (
          <motion.span
            key={`${lineIndex}-${wordIndex}`}
            className="text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: (lineIndex * line.length + wordIndex) * 0.03,
            }}
          >
            {word}{' '}
          </motion.span>
        );
      } else if (word.startsWith('/*') || word.endsWith('*/')) {
        return (
          <motion.span
            key={`${lineIndex}-${wordIndex}`}
            className="text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: (lineIndex * line.length + wordIndex) * 0.03,
            }}
          >
            {word}{' '}
          </motion.span>
        );
      } else {
        return (
          <motion.span
            key={`${lineIndex}-${wordIndex}`}
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: (lineIndex * line.length + wordIndex) * 0.03,
            }}
          >
            {word}{' '}
          </motion.span>
        );
      }
    });
  });

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
          className="bg-primary/30 p-8 rounded-lg backdrop-blur-sm font-sql"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            {colorizedSQL}
          </div>
        </motion.div>
        
        <motion.button
          onClick={handleExecute}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
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
