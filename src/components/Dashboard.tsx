
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Coffee, Code, Database } from "lucide-react";

const stats = [
  { icon: Database, label: "Datasets Analyzed", value: "500+" },
  { icon: Code, label: "Projects Completed", value: "150+" },
  { icon: Coffee, label: "Coffee Cups", value: "1,000+" },
  { icon: Award, label: "Client Satisfaction", value: "99%" },
];

const skillsData = [
  { name: "SQL", value: 95 },
  { name: "Python", value: 85 },
  { name: "Tableau", value: 90 },
  { name: "Power BI", value: 88 },
  { name: "R", value: 75 },
];

const Dashboard = () => {
  return (
    <section className="py-20 bg-secondary px-4" id="dashboard">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((Stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4">
                <Stat.icon className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-gray-600">{Stat.label}</p>
                  <p className="text-2xl font-bold">{Stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
