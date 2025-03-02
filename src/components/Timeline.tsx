
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2023",
    title: "Senior BI Analyst",
    description: "Led data transformation initiatives across multiple departments",
  },
  {
    year: "2022",
    title: "Data Science Course",
    description: "Completed advanced certification in data science and machine learning",
  },
  {
    year: "2021",
    title: "BI Consultant",
    description: "Helped 20+ companies optimize their data strategy",
  },
  {
    year: "2020",
    title: "Analytics Lead",
    description: "Managed a team of analysts for a major e-commerce platform",
  },
  {
    year: "2019",
    title: "Data Analyst",
    description: "Started my journey in data analytics",
  },
];

const Timeline = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">My Journey</h2>
      <div className="relative w-full h-full">
        {/* Timeline line */}
        <div className="absolute h-full w-0.5 bg-accent/20 left-1/2 transform -translate-x-1/2" />

        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-2 sm:gap-3 px-2">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-1 sm:mb-2`}
              >
                <div className="w-full md:w-1/2 px-2 md:px-3 mb-1 md:mb-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary/50 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="text-accent font-bold text-xs sm:text-sm">{item.year}</span>
                    <h3 className="text-base sm:text-lg font-semibold mt-1 text-white">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{item.description}</p>
                  </motion.div>
                </div>
                <div className="w-2 h-2 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
