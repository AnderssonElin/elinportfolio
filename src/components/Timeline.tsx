
import { motion } from "framer-motion";

const Timeline = () => {
  return (
    <div className="w-full flex flex-col justify-center py-8 px-4 sm:px-6">
      <motion.div 
        className="max-w-3xl mx-auto bg-primary/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Hey there! header */}
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold mb-8 text-white tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hey there!
        </motion.h2>

        {/* Biography paragraphs */}
        <div className="space-y-6 text-gray-300">
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            In 2024, I got my climbing certification. I thought it would be about strength, but it turns out it's mostly about trusting ropes and life choices.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            2023 was a year of change when I decided to completely change career paths. Still not sure if it was bravery or madness, but here we are.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Back in 2018, I binge-watched The Office in 3 weeks and 2 days, developing a deep emotional connection to fictional coworkers. See you tomorrow Dwight!
          </motion.p>
          
          <motion.div 
            className="pt-4 border-t border-accent/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-base sm:text-lg leading-relaxed">
              My journey began in 2017 when I wrote my first line of code. I had no idea what I was doing but felt like a genius. And in 2015, I moved to England and quickly realized that "fancy a cuppa?" is the beginning of every serious conversation.
            </p>
          </motion.div>
        </div>
        
        {/* Mission statement */}
        <motion.div 
          className="mt-10 pt-6 border-t border-accent/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-accent italic text-base sm:text-lg leading-relaxed">
            My mission is to combine creativity, functionality, and polish — all to create genuinely charming experiences that never get in the way of the user's goals.
          </p>
          
          <p className="text-accent italic text-base sm:text-lg leading-relaxed mt-4">
            But most importantly, I never take myself too seriously.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Timeline;
