import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectHeader from "@/components/project-details/ProjectHeader";
import ProjectInfo from "@/components/project-details/ProjectInfo";
import ScrollIndicator from "@/components/project-details/ScrollIndicator";
import ProjectGallery from "@/components/project-details/ProjectGallery";
import ProjectNotFound from "@/components/project-details/ProjectNotFound";

interface ProjectData {
  id: number;
  title: string;
  year: string;
  tech: string[];
  description: string;
  role: string;
  images: string[];
  githubUrl?: string;
}

const projectsData: Record<string, ProjectData> = {
  "nba-dashboard": {
    id: 1,
    title: "NBA API using Pandas",
    year: "2023",
    tech: ["Python", "NBA API", "Pandas", "Plotly", "Dash", "Jupyter"],
    description: "The NBA Game Analysis Dashboard is an interactive tool that evaluates and visualizes the quality of NBA games based on various metrics. It analyzes factors like score closeness, lead changes, overtime periods, three-point shooting, and star performances to assign each game a quality score and grade (A+ to D). Built with Python, the project features both a web-based dashboard (using Dash) for real-time analysis and Jupyter notebooks for detailed exploration. Using the NBA API, it automatically fetches game data, processes it through scoring algorithms (implemented with Pandas), and presents the results through interactive visualizations (powered by Plotly) including radar charts, scatter plots, and detailed data tables. This makes it easy for users to identify the most exciting games and understand what makes them interesting, whether through the interactive dashboard or through custom analysis in notebooks.",
    role: "Led the development from concept to implementation. This included designing the scoring algorithms, integrating the NBA API for automated data retrieval, building the interactive dashboard with Dash, and structuring the analysis in Jupyter notebooks. Additionally, I handled data processing with Pandas and created the visualizations using Plotly to ensure an intuitive and insightful user experience.",
    images: [
      "https://github.com/AnderssonElin/nba-dashboard/blob/main/images/nba_dashboard_2.PNG?raw=true",
      "https://github.com/AnderssonElin/nba-dashboard/blob/main/images/nba_dashboard_3.PNG?raw=true",
      "https://github.com/AnderssonElin/nba-dashboard/blob/main/images/nba_dashboard_4.PNG?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/nba-dashboard"
  },
  "R-studio": {
    id: 2,
    title: "Machine Learning & Predictive Modeling in R",
    year: "2024",
    tech: ["Machine Learning", "R", "RStudio", "Random Forest", "K-means Clustering"],
    description: "This project was developed as part of a team effort, focusing on machine learning-based predictive modeling and clustering using R. The dataset was cleaned and prepared by handling missing values and outliers before selecting relevant features for analysis. We applied unsupervised learning techniques, specifically K-means clustering, to segment companies based on workforce size and salary distribution, using the Elbow Method and Silhouette Score to determine the optimal number of clusters. In the predictive modeling phase, we implemented supervised machine learning techniques, training linear regression and random forest models to predict company financial performance. The models were evaluated using Mean Absolute Error (MAE), Mean Squared Error (MSE), and Root Mean Squared Error (RMSE) to compare predictive accuracy. We also tested whether incorporating cluster membership as a feature improved prediction performance.",
    role: "As part of the team, I contributed to data preprocessing, feature selection, and model development. I worked on K-means clustering and visualization, ensuring the segmentation was meaningful and interpretable. Additionally, I played a key role in designing, implementing, and evaluating the machine learning models, including training the random forest and regression models, tuning hyperparameters, and analyzing performance metrics. My contributions helped refine the predictive approach, making the insights more actionable for financial decision-making.",
    images: [
      "https://github.com/AnderssonElin/Machine-Learning-R/blob/main/images/R_cluster_1.png?raw=true",
      "https://github.com/AnderssonElin/Machine-Learning-R/blob/main/images/R_code_2.png?raw=true",
      "https://github.com/AnderssonElin/Machine-Learning-R/blob/main/images/R_code_3.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/Machine-Learning-R"
  },
  "SSIS": {
    id: 3,
    title: "Data ETL & Analysis in SSIS and SSAS",
    year: "2024",
    tech: ["SSIS", "SSAS", "Visual Studio", "SSMS"],
    description: "This project involved designing and implementing an ETL pipeline in SQL Server Integration Services (SSIS) to clean and transform flight data for analytical processing. The pipeline extracted raw flight records, performed data cleansing operations such as handling null values and formatting timestamps, and then loaded the refined data into a staging area before populating dimension and fact tables. A tabular model was created in SQL Server Analysis Services (SSAS) to simplify complex analytical queries and improve reporting performance. The cube was designed with well-structured relationships between fact and dimension tables, allowing for efficient aggregations and analysis.",
    role: "As the ETL Developer, I designed and implemented the SSIS pipeline, ensuring efficient data transformation and error handling throughout the process. I developed the tabular cube in SSAS, structuring the model to enhance analytical capabilities while optimizing query performance.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_fl%C3%B6de1.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_fl%C3%B6de2.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_tabular_cube.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_tabular_table.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "draw.io": {
    id: 4,
    title: "Banking System Data Model",
    year: "2023",
    tech: ["draw.io", "SQL", "SSMS"],
    description: "This project involved the modeling and design of a structured banking database system, ensuring a well-defined structure with clear relationships between entities. The process began with a thorough needs analysis and data collection to identify essential business processes and data elements. A conceptual data model was created to map out the overarching structure, followed by a logical data model that detailed tables, columns, data types, and key business concepts. The database design was developed visually in draw.io, incorporating all relevant entities, defining relationships between columns, and establishing primary keys. The logical model was further refined into a physical data model, considering constraints and optimizations for database management systems. The final step included comprehensive documentation of the database schema, specifying table structures, column attributes, and relationship definitions to facilitate future implementation and development.",
    role: "I was responsible for developing the data architecture and ensuring a well-structured and efficient relational model. I created and refined the conceptual, logical, and physical data models, aligning them with real-world banking operations. Additionally, I documented the entire schema, ensuring clarity and ease of implementation in SQL Server while maintaining relational integrity and scalability.",
    images: [
      "https://github.com/AnderssonElin/bank_architecture/blob/main/images/1_bank_concept.jpg?raw=true",
      "https://github.com/AnderssonElin/bank_architecture/blob/main/images/2_bank_erd.jpg?raw=true",
      "https://github.com/AnderssonElin/bank_architecture/blob/main/images/3_bank_database.png?raw=true",
      "https://github.com/AnderssonElin/bank_architecture/blob/main/images/4_bank_code.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/bank_architecture"
  },
  "sql": {
    id: 5,
    title: "ETL in SQL",
    year: "2024",
    tech: ["SQL", "SSMS", "Power BI"],
    description: "This project is a complete ETL pipeline designed to extract, transform, and load (ETL) data into a structured data warehouse (DW). The implementation integrates raw data from AdventureWorks2019, processes it through a staging layer, and transforms it into a star schema model for analytics and reporting in Power BI. The solution includes: Data extraction & bulk loading using SQL BULK INSERT procedures, Data transformation & modeling with stored procedures and T-SQL operations, Dimensional modeling (Kimball approach) to optimize query performance, Fact & Dimension table relationships enabling efficient BI analysis, Automated data integration for Power BI reporting.",
    role: "In my role as a BI Analyst, I designed and implemented the ETL architecture, structured data pipelines, and created stored procedures for automated transformations. I developed a scalable star schema, ensuring optimized performance and seamless Power BI integration. Additionally, I built SQL views to provide end-users with easy access to business insights without complex queries.",
    images: [
      "https://github.com/AnderssonElin/etl-pipeline-sql/blob/main/images/1_sql_code.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/etl-pipeline-sql"
  },
  "sales-kpi": {
    id: 6,
    title: "Dynamics 365 Sales Dashboard in Power BI",
    year: "2023",
    tech: ["Power BI", "DAX", "Dynamics 365", "SQL", "DirectQuery"],
    description: "A Power BI report that tracks sales goals and performance by analyzing data from Dynamics 365 CRM. The report includes pipeline analysis, market segmentation, product performance metrics, and annual revenue distribution for multi-year opportunities.",
    role: "Responsible for designing and implementing the report, including data modeling, DAX calculations, and configuring the DirectQuery connection to Dynamics 365 CRM (using SQL in Power BI). Worked closely with stakeholders from the sales department and c-level management to ensure the report met business needs and optimized performance.",
    images: [
      "https://github.com/AnderssonElin/sales-kpi-powerbi/blob/main/images/dashboard_1.png?raw=true",
      "https://github.com/AnderssonElin/sales-kpi-powerbi/blob/main/images/dashboard_2.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/sales-kpi-powerbi"
  },
  "powerbi": {
    id: 7,
    title: "Power BI report in Sales",
    year: "2023",
    tech: ["Power BI", "Power Query", "DAX"],
    description: "This Power BI solution integrates and visualizes key business data across multiple departments, enabling data-driven decision-making and performance tracking. The project involved data modeling, ETL processes, advanced DAX calculations, and interactive dashboards to support strategic analysis in HR, Sales, Campaigns, and Finance.",
    role: "As a BI Analyst, I designed and built the data architecture, implemented optimized DAX calculations, and configured data pipelines to ensure accuracy and scalability. I worked closely with business stakeholders to define key performance indicators and tailored dashboards to improve analytics adoption across departments.",
    images: [
      "https://github.com/AnderssonElin/finance-dashboard-pbi/blob/main/images/4_sales.png?raw=true",
      "https://github.com/AnderssonElin/finance-dashboard-pbi/blob/main/images/2_hr.png?raw=true",
      "https://github.com/AnderssonElin/finance-dashboard-pbi/blob/main/images/3_campaign.png?raw=true",
      "https://github.com/AnderssonElin/finance-dashboard-pbi/blob/main/images/1_financial.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/finance-dashboard-pbi"
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
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown as any);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [projectId, onClose]);
  
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

  const handleImageClick = (imageSrc: string) => {
    window.open(imageSrc, '_blank');
  };
  
  if (!project) {
    return <ProjectNotFound onClose={onClose} />;
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
              githubUrl={project.githubUrl}
              showHeader={showHeader}
            />
            
            {project.images.length > 0 && (
              <ScrollIndicator 
                showScrollIndicator={showScrollIndicator}
                scrollToGallery={scrollToGallery}
              />
            )}
            
            {project.images.length > 0 && (
              <div ref={galleryRef}>
                <ProjectGallery
                  images={project.images}
                  title={project.title}
                  showHeader={showHeader}
                  handleImageClick={handleImageClick}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
