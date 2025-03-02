import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { projectsData } from "./project-details/projectData";

const projectList = Object.entries(projectsData).map(([slug, project]) => ({
  id: project.id,
  title: project.title.split(" ")[0],
  description: project.description,
  imageUrl: project.images[0] || "",
  slug: slug
}));

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [touchedId, setTouchedId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (touchedId !== null) {
      const timer = setTimeout(() => {
        setTouchedId(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [touchedId]);

  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      const projects = document.querySelectorAll('.project-card');
      
      projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const isVisible = (
          rect.top < window.innerHeight * 0.8 && 
          rect.bottom > window.innerHeight * 0.2
        );
        
        if (isVisible && touchedId !== projectList[index].id) {
          setTouchedId(projectList[index].id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, touchedId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-white">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto [&_*]:cursor-[url('/lovable-uploads/bc1d05b8-0954-4049-86be-92522d845815.png'),_pointer]">
        {projectList.map((project) => (
          <motion.div
            key={project.id}
            className="group cursor-pointer project-card"
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => setSelectedProject(project.slug)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg p-3 bg-primary/20 backdrop-blur-sm border border-accent/10 shadow-lg overflow-hidden">
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-md bg-black/40">
                <div className="absolute inset-0 bg-accent/30 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="absolute inset-0 border border-accent/10 group-hover:border-accent/30 transition-all duration-300 z-10 rounded-md"
                  animate={{
                    borderColor: (hoveredId === project.id || touchedId === project.id) ? "rgba(155, 135, 245, 0.3)" : "rgba(155, 135, 245, 0.1)"
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    scale: (hoveredId === project.id || touchedId === project.id) ? 1.1 : 1
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
                  className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-black/10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (hoveredId === project.id || touchedId === project.id) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm">{project.description}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedProject && (
        <ProjectDetails 
          projectId={selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;
