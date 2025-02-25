
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-4xl"
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
