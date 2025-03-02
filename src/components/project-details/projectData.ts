
export interface ProjectData {
  id: number;
  title: string;
  year: string;
  tech: string[];
  description: string;
  role: string;
  images: string[];
}

export const projectsData: Record<string, ProjectData> = {
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
