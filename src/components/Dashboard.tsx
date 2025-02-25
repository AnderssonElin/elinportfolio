
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/80 backdrop-blur-sm p-4 rounded-lg border border-accent/20 shadow-xl"
      >
        <h4 className="text-white font-bold mb-2">{payload[0].payload.project}</h4>
        <p className="text-gray-300 text-sm">{payload[0].payload.description}</p>
        <div className="mt-2 text-accent font-medium">
          Completion: {payload[0].value}%
        </div>
      </motion.div>
    );
  }
  return null;
};

const Dashboard = () => {
  return (
    <section className="py-20 bg-primary px-4" id="dashboard">
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
              className={`bg-secondary/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg ${Stat.className}`}
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

        <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-white">Project Performance</h3>
          <div className="h-[300px] group">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData}>
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
                />
                <Bar 
                  dataKey="value" 
                  fill="#9b87f5"
                  onMouseOver={() => {
                    document.body.style.transition = "filter 0.3s ease";
                    document.body.style.filter = "blur(4px)";
                    const currentSection = document.getElementById('dashboard');
                    if (currentSection instanceof HTMLElement) {
                      currentSection.style.filter = "blur(0px)";
                      currentSection.style.position = "relative";
                      currentSection.style.zIndex = "50";
                    }
                  }}
                  onMouseOut={() => {
                    document.body.style.filter = "none";
                    const currentSection = document.getElementById('dashboard');
                    if (currentSection instanceof HTMLElement) {
                      currentSection.style.zIndex = "auto";
                    }
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
