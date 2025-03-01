
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-white">My Journey</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute h-full w-0.5 bg-accent/20 left-1/2 transform -translate-x-1/2" />

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } mb-8 md:mb-0`}
          >
            <div className="w-full md:w-1/2 px-4 md:px-6 mb-4 md:mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-accent font-bold text-sm sm:text-base">{item.year}</span>
                <h3 className="text-lg sm:text-xl font-semibold mt-2 text-white">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 mt-2">{item.description}</p>
              </motion.div>
            </div>
            <div className="w-4 h-4 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
