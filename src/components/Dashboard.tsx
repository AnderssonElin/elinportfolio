
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Coffee, Code, Database, Users, Star, Target, Zap } from "lucide-react";

const stats = [
  { 
    icon: Database,
    label: "Datasets Analyzed",
    value: "500+",
    className: "col-span-1 row-span-1"
  },
  { 
    icon: Code,
    label: "Projects Completed",
    value: "150+",
    className: "col-span-1 row-span-1"
  },
  { 
    icon: Coffee,
    label: "Coffee Cups",
    value: "1,000+",
    className: "col-span-1 row-span-2 bg-accent/10"
  },
  { 
    icon: Award,
    label: "Client Satisfaction",
    value: "99%",
    className: "col-span-1 row-span-1"
  },
  { 
    icon: Users,
    label: "Team Members",
    value: "25+",
    className: "col-span-2 row-span-1 bg-primary/10"
  },
  { 
    icon: Star,
    label: "5-Star Reviews",
    value: "50+",
    className: "col-span-1 row-span-1"
  },
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
        <h2 className="text-3xl font-bold text-center mb-16 text-white">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 auto-rows-[minmax(120px,auto)]">
          {stats.map((Stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-primary/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg ${Stat.className}`}
            >
              <div className="flex items-center gap-4 h-full">
                <Stat.icon className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-gray-300">{Stat.label}</p>
                  <p className="text-2xl font-bold text-white">{Stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-white">Technical Skills</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
