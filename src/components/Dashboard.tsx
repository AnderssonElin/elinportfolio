
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
    value: 65,
    project: "Hospital Data Management",
    description: "Healthcare data analytics system",
    icon: "🏥",
    path: "M10,0 L20,0 L20,40 L30,40 L30,60 L0,60 L0,40 L10,40 Z M5,10 h5 v5 h-5 Z M15,10 h5 v5 h-5 Z M5,20 h5 v5 h-5 Z M15,20 h5 v5 h-5 Z M5,30 h5 v5 h-5 Z M15,30 h5 v5 h-5 Z"
  },
  { 
    date: "2024-02",
    value: 75,
    project: "School Analytics",
    description: "Educational performance tracking",
    icon: "🏫",
    path: "M15,0 L30,10 L30,50 L0,50 L0,10 Z M5,20 h5 v5 h-5 Z M20,20 h5 v5 h-5 Z M5,30 h5 v5 h-5 Z M20,30 h5 v5 h-5 Z M12,35 h6 v15 h-6 Z"
  },
  { 
    date: "2024-03",
    value: 82,
    project: "City Time Analysis",
    description: "Urban planning time series",
    icon: "🕰️",
    path: "M15,0 L30,15 L30,70 L0,70 L0,15 Z M13,25 h4 v20 h-4 Z M10,25 L15,35 Z M20,25 L15,35 Z"
  },
  { 
    date: "2024-04",
    value: 88,
    project: "Tech Infrastructure",
    description: "IT systems analysis",
    icon: "💻",
    path: "M0,10 L30,10 L30,40 L0,40 Z M2,15 L28,15 L28,35 L2,35 Z M10,40 L20,40 L25,45 L5,45 Z"
  },
  { 
    date: "2024-05",
    value: 95,
    project: "Urban Data Center",
    description: "Smart city analytics",
    icon: "🏢",
    path: "M5,0 L25,0 L25,80 L5,80 Z M8,5 h4 v4 h-4 Z M18,5 h4 v4 h-4 Z M8,15 h4 v4 h-4 Z M18,15 h4 v4 h-4 Z M8,25 h4 v4 h-4 Z M18,25 h4 v4 h-4 Z M8,35 h4 v4 h-4 Z M18,35 h4 v4 h-4 Z M8,45 h4 v4 h-4 Z M18,45 h4 v4 h-4 Z M8,55 h4 v4 h-4 Z M18,55 h4 v4 h-4 Z M8,65 h4 v4 h-4 Z M18,65 h4 v4 h-4 Z"
  }
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
        <div className="text-3xl mb-2">{payload[0].payload.icon}</div>
        <h4 className="font-bold mb-2 text-lg">{payload[0].payload.project}</h4>
        <p className="text-white/90 text-sm mb-2">{payload[0].payload.description}</p>
        <div className="text-white/90 font-medium">
          Passion for Data: {payload[0].value}%
        </div>
      </motion.div>
    );
  }
  return null;
};

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const scale = height / 100; // Normalize the height for SVG scaling
  
  return (
    <g transform={`translate(${x},${y})`}>
      <defs>
        <linearGradient id={`barGradient-${payload.date}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b87f5" />
          <stop offset="100%" stopColor="#7b67d5" />
        </linearGradient>
      </defs>
      <motion.path
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
        d={payload.path}
        fill={`url(#barGradient-${payload.date})`}
        transform={`scale(1, ${scale})`}
        style={{
          transformOrigin: 'bottom',
          filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))'
        }}
      />
      <motion.text
        x="15"
        y="-10"
        textAnchor="middle"
        fill="#fff"
        fontSize="20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {payload.icon}
      </motion.text>
    </g>
  );
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
          <div className="h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={skillsData}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="date" 
                  stroke="#fff" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return new Intl.DateTimeFormat('sv-SE', { month: 'short' }).format(date);
                  }}
                />
                <YAxis
                  label={{ 
                    value: 'Passion for Data', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#fff' }
                  }}
                  stroke="#fff"
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={false}
                />
                <Bar 
                  dataKey="value" 
                  shape={<CustomBar />}
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
