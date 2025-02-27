
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    title: "Data Lake Implementation",
    description: "Enterprise-wide data lake architecture with real-time analytics",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    link: "/project/data-lake"
  },
  {
    id: 2,
    title: "ML Pipeline Development",
    description: "Automated machine learning pipeline for predictive analytics",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    link: "/project/ml-pipeline"
  },
  {
    id: 3,
    title: "Analytics Platform",
    description: "Self-service analytics platform with interactive dashboards",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "/project/analytics"
  },
  {
    id: 4,
    title: "BI Dashboard Suite",
    description: "Comprehensive business intelligence dashboard solution",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    link: "/project/bi-dashboard"
  },
  {
    id: 5,
    title: "Data Visualization Tool",
    description: "Interactive data visualization and reporting platform",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    link: "/project/data-viz"
  },
  {
    id: 6,
    title: "AI Analytics Engine",
    description: "AI-powered analytics engine for predictive insights",
    imageUrl: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
    link: "/project/ai-analytics"
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary px-4 sm:px-6 md:px-8" id="projects">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-accent">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => navigate(project.link)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: hoveredId === project.id ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-black/20"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredId === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-200 text-sm">{project.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
