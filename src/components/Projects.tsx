
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectDetails from "../pages/ProjectDetails";

const projectsData = [
  {
    id: 1,
    title: "Data Lake Implementation",
    description: "Enterprise-wide data lake architecture with real-time analytics",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    slug: "data-lake"
  },
  {
    id: 2,
    title: "ML Pipeline Development",
    description: "Automated machine learning pipeline for predictive analytics",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    slug: "ml-pipeline"
  },
  {
    id: 3,
    title: "Analytics Platform",
    description: "Self-service analytics platform with interactive dashboards",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    slug: "analytics"
  },
  {
    id: 4,
    title: "BI Dashboard Suite",
    description: "Comprehensive business intelligence dashboard solution",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    slug: "bi-dashboard"
  },
  {
    id: 5,
    title: "Data Visualization Tool",
    description: "Interactive data visualization and reporting platform",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    slug: "data-viz"
  },
  {
    id: 6,
    title: "AI Analytics Engine",
    description: "AI-powered analytics engine for predictive insights",
    imageUrl: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
    slug: "ai-analytics"
  }
];

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 bg-secondary px-4 sm:px-6 md:px-8 flex items-center relative" id="projects">
      {/* Wave at the top */}
      <div className="absolute top-0 left-0 w-full">
        <WaveSection position="top" fillColor="#151823" backgroundColor="#1A1F2C" />
      </div>
      
      <div className="container mx-auto my-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-accent">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project.slug)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: project.id * 0.1 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 transition-all duration-300 z-10 rounded-lg"
                  animate={{
                    borderColor: hoveredId === project.id ? "rgba(155, 135, 245, 0.5)" : "rgba(155, 135, 245, 0)"
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    scale: hoveredId === project.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4 }}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <WaveSection position="bottom" fillColor="#1A1F2C" backgroundColor="#151823" />
      </div>
      
      {/* Render the project details overlay if a project is selected */}
      {selectedProject && (
        <ProjectDetails 
          projectId={selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
