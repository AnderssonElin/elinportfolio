import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Coffee, Code, Database, Users, Star } from "lucide-react";
import { useState } from "react";

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
  { 
    date: "2024-01",
    value: 95,
    project: "Data Lake Implementation",
    description: "Successfully implemented enterprise-wide data lake architecture"
  },
  { 
    date: "2024-02",
    value: 85,
    project: "ML Pipeline",
    description: "Built automated machine learning pipeline for predictive analytics"
  },
  { 
    date: "2024-03",
    value: 90,
    project: "BI Dashboard",
    description: "Created executive dashboard with real-time KPI tracking"
  },
  { 
    date: "2024-04",
    value: 88,
    project: "Data Integration",
    description: "Integrated multiple data sources into unified warehouse"
  },
  { 
    date: "2024-05",
    value: 92,
    project: "Analytics Platform",
    description: "Launched new self-service analytics platform"
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="bg-accent text-white p-4 rounded-lg shadow-xl border border-white/10 backdrop-blur-md"
      >
        <h4 className="font-bold mb-2 text-lg">{payload[0].payload.project}</h4>
        <p className="text-white/90 text-sm mb-2">{payload[0].payload.description}</p>
        <div className="text-white/90 font-medium">
          Completion: {payload[0].value}%
        </div>
      </motion.div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-primary px-4 sm:px-6 md:px-8 font-sql relative" id="dashboard">
      <motion.div 
        className="container mx-auto relative z-10"
        animate={{
          filter: isHovering ? "blur(0px)" : "blur(0px)",
          transition: { duration: 0.3 }
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-white">Dashboard</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16 auto-rows-[minmax(120px,auto)]">
          {stats.map((Stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-secondary/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg ${Stat.className}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 h-full">
                <Stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-300">{Stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{Stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-secondary/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg relative">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Project Performance</h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={skillsData}
                onMouseEnter={() => {
                  setIsHovering(true);
                  const elements = document.querySelectorAll('body > *:not(#root)');
                  elements.forEach((el) => {
                    if (el instanceof HTMLElement) {
                      el.style.filter = 'blur(4px)';
                      el.style.transition = 'filter 0.3s ease';
                    }
                  });
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  const elements = document.querySelectorAll('body > *:not(#root)');
                  elements.forEach((el) => {
                    if (el instanceof HTMLElement) {
                      el.style.filter = 'none';
                    }
                  });
                }}
              >
                <XAxis 
                  dataKey="date" 
                  stroke="#fff" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return new Intl.DateTimeFormat('sv-SE', { month: 'short' }).format(date);
                  }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={false}
                  position={{ y: 0 }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Dashboard;
