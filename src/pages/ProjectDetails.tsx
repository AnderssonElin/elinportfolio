
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ExternalLink } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  year: string;
  tech: string[];
  description: string;
  role: string;
  images: string[];
}

const projectsData: Record<string, ProjectData> = {
  "powerbi": {
    id: 1,
    title: "Power BI report in sales",
    year: "2023",
    tech: ["Power BI", "Power Query", "DAX"],
    description: "This Power BI solution integrates and visualizes key business data across multiple departments, enabling data-driven decision-making and performance tracking. The project involved data modeling, ETL processes, advanced DAX calculations, and interactive dashboards to support strategic analysis in HR, Sales, Campaigns, and Finance.",
    role: "As a BI Analyst, I designed and built the data architecture, implemented optimized DAX calculations, and configured data pipelines to ensure accuracy and scalability. I worked closely with business stakeholders to define key performance indicators and tailored dashboards to improve analytics adoption across departments.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_S%C3%A4lj.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_HR.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_Kampanj.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_Ekonomi.png?raw=true"
    ]
  },
  "sql": {
    id: 2,
    title: "ETL in SQL",
    year: "2024",
    tech: ["SQL", "SSMS", "Power BI"],
    description: "This project is a complete ETL pipeline designed to extract, transform, and load (ETL) data into a structured data warehouse (DW). The implementation integrates raw data from AdventureWorks2019, processes it through a staging layer, and transforms it into a star schema model for analytics and reporting in Power BI. The solution includes: Data extraction & bulk loading using SQL BULK INSERT procedures, Data transformation & modeling with stored procedures and T-SQL operations, Dimensional modeling (Kimball approach) to optimize query performance, Fact & Dimension table relationships enabling efficient BI analysis, Automated data integration for Power BI reporting.",
    role: "In my role as a BI Analyst, I designed and implemented the ETL architecture, structured data pipelines, and created stored procedures for automated transformations. I developed a scalable star schema, ensuring optimized performance and seamless Power BI integration. Additionally, I built SQL views to provide end-users with easy access to business insights without complex queries.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SQL_code.png?raw=true"
    ]
  },
  "analytics": {
    id: 3,
    title: "Analytics Platform",
    year: "2023",
    tech: ["Power BI", "SQL Server", "DAX", "Python", "Azure Data Factory"],
    description: "A self-service analytics platform that democratizes data access across the organization. The solution includes a suite of interactive dashboards, an ad-hoc query builder, and automated reporting capabilities. The platform serves over 500 users and has eliminated thousands of manual reporting hours.",
    role: "I architected the semantic data model, designed the core dashboards, and implemented row-level security for sensitive data. I also conducted training sessions for business users and created documentation for self-service report creation.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "bi-dashboard": {
    id: 4,
    title: "BI Dashboard Suite",
    year: "2022",
    tech: ["Tableau", "PostgreSQL", "Python", "R", "ETL"],
    description: "A comprehensive business intelligence dashboard solution that provides real-time insights into key business metrics. The suite includes executive summaries, departmental deep-dives, and operational monitoring tools. The dashboards have become essential decision-making tools for leadership.",
    role: "I translated complex business requirements into technical specifications, designed the data pipeline for dashboard refreshes, and implemented advanced visualizations. I conducted user acceptance testing and made iterative improvements based on feedback.",
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "data-viz": {
    id: 5,
    title: "Data Visualization Tool",
    year: "2021",
    tech: ["D3.js", "React", "Node.js", "MongoDB", "Express"],
    description: "An interactive data visualization and reporting platform that enables users to create custom visualizations without coding knowledge. The tool includes a drag-and-drop interface, a library of chart templates, and export capabilities for presentations and reports.",
    role: "I designed the user interface, implemented the visualization rendering engine, and created the data connector architecture. I worked closely with UX designers to ensure the tool was intuitive for non-technical users.",
    images: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "ai-analytics": {
    id: 6,
    title: "AI Analytics Engine",
    year: "2023",
    tech: ["Python", "PyTorch", "NLP", "AWS Sagemaker", "React"],
    description: "An AI-powered analytics engine that uses natural language processing to automatically identify trends, anomalies, and insights in large datasets. The system can generate narrative explanations of data changes and recommend actions based on historical patterns.",
    role: "I led the feature specification process, defined the insight generation algorithms, and developed the integration with existing BI tools. I also conducted A/B testing to validate the system's recommendations against expert analyst decisions.",
    images: [
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    ]
  }
};

interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}

const ProjectDetails = ({ projectId, onClose }: ProjectDetailsProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
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
  
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openImageInNewTab = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };
  
  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-secondary rounded-lg shadow-xl p-8 max-w-lg w-full">
          <h1 className="text-2xl text-accent mb-4">Project Not Found</h1>
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
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
          <motion.div
            className="py-6 px-4 md:px-8 sticky top-0 z-10 bg-primary/90 backdrop-blur-sm flex justify-between items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex-grow text-center">
              <h1 className="text-xl md:text-2xl font-bold text-accent line-clamp-1">{project.title}</h1>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
          
          <div className="px-4 md:px-8 py-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Year</h2>
                  <p className="text-gray-300">{project.year}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Tech & Technique</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary/50 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Description</h2>
                  <p className="text-gray-300">{project.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">My Role</h2>
                  <p className="text-gray-300">{project.role}</p>
                </div>
              </div>
            </motion.div>
            
            {project.images.length > 0 && (
              <motion.div 
                className="flex justify-center mt-8 mb-16"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: showScrollIndicator ? 1 : 0, 
                  y: showScrollIndicator ? 0 : -10 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={scrollToGallery}
                  className="text-gray-400 hover:text-accent transition-colors flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="mb-2 text-sm">View Images</p>
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
            
            {project.images.length > 0 && (
              <div ref={galleryRef} className="min-h-[50vh] md:min-h-[80vh]">
                <motion.div 
                  className="mt-16 pb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: !showHeader ? 1 : 0.3, y: !showHeader ? 0 : 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-12">
                    {project.images.map((image, index) => (
                      <motion.div 
                        key={index} 
                        className="flex justify-center relative group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                        whileInView={{ 
                          scale: 1.01,
                          transition: { duration: 0.3 }
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                        onClick={() => openImageInNewTab(image)}
                      >
                        <div className="relative">
                          <img 
                            src={image} 
                            alt={`${project.title} screenshot ${index + 1}`} 
                            className="object-cover rounded-lg shadow-xl"
                            style={{ maxWidth: "800px", maxHeight: "800px", width: "100%" }}
                          />
                          
                          <button 
                            className="absolute top-2 right-2 p-2 bg-accent hover:bg-accent/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Open image in new tab"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
