
import { motion } from "framer-motion";

const Timeline = () => {
  return (
    <div className="w-full flex flex-col justify-center py-8 px-4 sm:px-6">
      <motion.div 
        className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl"
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
            The first time I managed to squeeze three weeks' worth of travel gear into just 4.8 kg, I knew I'd found my calling: simplifying complexity. This same obsession with efficiency led me into Business Intelligence, where I've led several BI projects, turning messy data into clear and helpful insights.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            My internships at different consulting firms have taught me the value of clearly communicating complicated ideas—something I regularly practice by teaching my parents how pivot tables work (still a challenge!). When I'm not conquering data, I'm probably at the climbing gym, officially certified but still cautiously facing my fear of heights. Or maybe re-watching "The Office"—proudly (or embarrassingly?) holding a personal record of finishing it in just 3 weeks and 2 days.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Whether it's automating reports, baking the perfect pizza, or delivering dad jokes so terrible they're impressive, I'm always curious and looking for ways to make everyday life easier, smarter, and definitely funnier.
          </motion.p>
          
        </div>
        
      </motion.div>
    </div>
  );
};

export default Timeline;
