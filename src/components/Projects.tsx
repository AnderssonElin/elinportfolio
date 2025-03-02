
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useIsMobile } from "@/hooks/use-mobile";

const projectsData = [
  {
    id: 1,
    title: "Power BI report in Sales",
    description: "A Power BI solution integrating data modeling, advanced DAX calculations, and interactive dashboards for real-time business insights.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_HR.png?raw=true",
    slug: "powerbi",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 2,
    title: "ETL in SQL",
    description: "A complete ETL pipeline in SQL, integrating data extraction, transformation, and loading into a Power BI dashboard for business analytics and decision-making",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SQL_first_pic.png?raw=true",
    slug: "sql",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 3,
    title: "Banking System Data Model",
    description: "A comprehensive database design for a banking system, including conceptual, logical, and physical modeling to ensure structured data management and scalability.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Bank_konceptuell%20ERD.jpg?raw=true",
    slug: "draw.io",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 4,
    title: "Data ETL & Analysis in SSIS and SSAS",
    description: "Designed an SSIS ETL pipeline for flight data cleansing, built an SSAS tabular model for efficient analysis.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_first_pic.png?raw=true",
    slug: "SSIS",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 5,
    title: "Machine Learning & Predictive Modeling in R",
    description: "Developed a machine learning pipeline in R, using K-means clustering for data segmentation and random forest regression for predictive modeling.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_first_pic.png?raw=true",
    slug: "R-studio",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 6,
    title: "AI Analytics Engine",
    description: "AI-powered analytics engine for predictive insights",
    imageUrl: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
    slug: "ai-analytics",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  }
];

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
        
        if (isVisible && touchedId !== projectsData[index].id) {
          setTouchedId(projectsData[index].id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, touchedId]);

  return (
    <div className="w-full h-full flex flex-col py-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">Projects</h2>
      
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto h-full">
          {projectsData.slice(0, 6).map((project) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer project-card"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project.slug)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg p-1 bg-primary/20 backdrop-blur-sm border border-[#9b87f5]/30 shadow-lg overflow-hidden h-full">
                <div className="flex gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
                  <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
                  <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
                </div>
                
                <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
                  {/* Purple overlay that disappears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-[#9b87f5]/50 z-10 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: (hoveredId === project.id || touchedId === project.id) ? 0 : 0.5 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div
                    className="absolute inset-0 border border-[#9b87f5]/30 group-hover:border-[#9b87f5]/70 transition-all duration-300 z-10 rounded-md"
                    animate={{
                      borderColor: (hoveredId === project.id || touchedId === project.id) ? "rgba(155, 135, 245, 0.7)" : "rgba(155, 135, 245, 0.3)"
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                      scale: (hoveredId === project.id || touchedId === project.id) ? 1.05 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/80 to-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: (hoveredId === project.id || touchedId === project.id) ? 1 : 0.2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-200 text-xs line-clamp-2">{project.description}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
