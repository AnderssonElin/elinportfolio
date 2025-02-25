
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    title: "Data Lake Implementation",
    description: "Enterprise-wide data lake architecture with real-time analytics",
    image: "photo-1486312338219-ce68d2c6f44d",
    link: "/projects/data-lake"
  },
  {
    id: 2,
    title: "ML Pipeline Development",
    description: "Automated machine learning pipeline for predictive analytics",
    image: "photo-1487058792275-0ad4aaf24ca7",
    link: "/projects/ml-pipeline"
  },
  {
    id: 3,
    title: "Analytics Platform",
    description: "Self-service analytics platform with interactive dashboards",
    image: "photo-1498050108023-c5249f4df085",
    link: "/projects/analytics"
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary px-4 sm:px-6 md:px-8" id="projects">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-white">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-xl"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => navigate(project.link)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={`https://source.unsplash.com/${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredId === project.id ? 1 : 0,
                  y: hoveredId === project.id ? 0 : 20
                }}
                transition={{ duration: 0.2 }}
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
