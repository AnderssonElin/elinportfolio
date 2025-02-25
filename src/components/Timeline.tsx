
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2023",
    title: "Senior BI Analyst",
    description: "Led data transformation initiatives across multiple departments",
  },
  {
    year: "2021",
    title: "BI Consultant",
    description: "Helped 20+ companies optimize their data strategy",
  },
  {
    year: "2019",
    title: "Data Analyst",
    description: "Started my journey in data analytics",
  },
];

const Timeline = () => {
  return (
    <section className="py-20 bg-white px-4" id="timeline">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">My Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-0.5 bg-gray-200 left-1/2 transform -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } mb-8`}
            >
              <div className="w-1/2 px-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="text-accent font-bold">{item.year}</span>
                  <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </motion.div>
              </div>
              <div className="w-4 h-4 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
