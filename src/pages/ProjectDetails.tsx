
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../components/project-details/projectData";
import { ProjectHeader } from "../components/project-details/ProjectHeader";
import { ProjectInfo } from "../components/project-details/ProjectInfo";
import { ImageGallery } from "../components/project-details/ImageGallery";
import { NotFoundProject } from "../components/project-details/NotFoundProject";

interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}

const ProjectDetails = ({ projectId, onClose }: ProjectDetailsProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData[projectId];
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [projectId]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = containerRef.current.scrollTop;
      if (scrollPosition > 300) {
        setShowHeader(false);
        setShowScrollIndicator(false);
      } else {
        setShowHeader(true);
        setShowScrollIndicator(true);
      }
    };
    
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => containerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!project) {
    return <NotFoundProject onClose={onClose} />;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      >
        <motion.div 
          ref={containerRef}
          className="bg-secondary rounded-lg shadow-xl w-full h-full md:w-11/12 md:h-[90%] md:max-w-6xl overflow-y-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 35, 
            stiffness: 350, 
            duration: 0.15 
          }}
        >
          <ProjectHeader 
            title={project.title} 
            onClose={onClose} 
          />
          
          <div className="px-4 md:px-8 py-8">
            <ProjectInfo 
              year={project.year}
              tech={project.tech}
              description={project.description}
              role={project.role}
              showHeader={showHeader}
            />
            
            <ImageGallery 
              images={project.images}
              title={project.title}
              showScrollIndicator={showScrollIndicator}
              showHeader={showHeader}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
