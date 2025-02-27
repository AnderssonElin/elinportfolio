
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  year: string;
  tech: string[];
  description: string;
  role: string;
  images: string[];
}

// Sample project data
const projectsData: Record<string, ProjectData> = {
  "data-lake": {
    id: 1,
    title: "Data Lake Implementation",
    year: "2023",
    tech: ["AWS", "Snowflake", "Python", "Apache Spark", "Airflow"],
    description: "A comprehensive data lake solution that centralizes all enterprise data sources into a single, scalable platform. The implementation provides real-time analytics capabilities, data cataloging, and automated data quality checks. This solution has reduced data retrieval times by 85% and enabled new business insights across departments.",
    role: "As lead BI analyst, I designed the data architecture, defined data modeling strategies, and worked closely with stakeholders to ensure the solution met business requirements. I also implemented key performance dashboards and trained the analytics team on the new data platform.",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "ml-pipeline": {
    id: 2,
    title: "ML Pipeline Development",
    year: "2022",
    tech: ["Python", "TensorFlow", "Kubernetes", "Docker", "MLflow"],
    description: "An automated machine learning pipeline that enables data scientists to quickly deploy, monitor, and update predictive models. The system handles feature engineering, model training, validation, and deployment with minimal manual intervention. This has reduced model deployment time from weeks to hours.",
    role: "I led the requirements gathering process and defined the key performance indicators for the machine learning models. I collaborated with data scientists to implement a feature store and created visualization components to explain model predictions to business stakeholders.",
    images: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80"
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

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(true);
  
  const project = projectId ? projectsData[projectId] : null;
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-accent mb-4">Project Not Found</h1>
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header Section */}
      <motion.div
        className="py-6 px-4 md:px-8 sticky top-0 z-10 bg-primary/90 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-accent">{project.title}</h1>
        </div>
      </motion.div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
          transition={{ duration: 0.5 }}
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
        
        {/* Images Section */}
        <motion.div 
          className="grid grid-cols-1 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: !showHeader ? 1 : 0, y: !showHeader ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-accent mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <motion.div 
                key={index} 
                className="aspect-video overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
