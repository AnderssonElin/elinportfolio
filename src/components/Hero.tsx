
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isTyping, setIsTyping] = useState(true);
  const sqlCode = `/* Booting Up My Profile */
SELECT 'Hello, my name is ' || 'Elin' AS Greeting,
       'BI Analyst' AS Role,
       'Transforming raw data into golden insights' AS Tagline
FROM experience;`;

  const codeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2.5 // Vänta tills SQL-koden är "färdigskriven"
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={codeVariants}
        className="absolute top-20 left-0 w-full flex justify-center"
      >
        <motion.pre 
          className="text-accent/70 font-sql text-sm md:text-base bg-primary/30 p-6 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sqlCode.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: index * 0.03,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.pre>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-center space-y-6 max-w-4xl mt-32"
      >
        <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
          Business Intelligence Analyst
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Turning Data into
          <span className="text-accent"> Actionable Insights</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Helping businesses make data-driven decisions through advanced analytics
          and visualization
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
