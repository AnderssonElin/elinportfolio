
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2024",
    title: "Got my climbing certification",
    description: "Thought it would be about strength, turns out it’s mostly about trusting ropes and life choices",
  },
  {
    year: "2023",
    title: "Decided to completely change career paths",
    description: "Still not sure if it was bravery or madness, but here we are",
  },
  {
    year: "2018",
    title: "Binge-watched The Office in 3 weeks and 2 days",
    description: "Developed a deep emotional connection to fictional coworkers. See you tomorrow Dwight!",
  },
  {
    year: "2017",
    title: "Wrote my first line of code",
    description: "Had no idea what I was doing but felt like a genius",
  },
  {
    year: "2015",
    title: "Moved to England",
    description: "Realized that “fancy a cuppa?” is the beginning of every serious conversation",
  },
];

const Timeline = () => {
  return (
    <div className="w-full flex flex-col justify-center py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">My Journey</h2>
      <div className="relative w-full">
        {/* Timeline line */}
        <div className="absolute h-full w-0.5 bg-accent/20 left-1/2 transform -translate-x-1/2" />

        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-4 px-2">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-2`}
              >
                <div className="w-full md:w-1/2 px-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary/50 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="text-accent font-bold text-xs sm:text-sm">{item.year}</span>
                    <h3 className="text-base sm:text-lg font-semibold mt-1 text-white">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{item.description}</p>
                  </motion.div>
                </div>
                {/* Changed from circle to diamond shape */}
                <div className="w-3 h-3 bg-accent rotate-45 absolute left-1/2 transform -translate-x-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
