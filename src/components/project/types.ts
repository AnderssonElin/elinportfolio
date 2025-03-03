
export interface ProjectType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  githubUrl: string;
}

export const projectsData: ProjectType[] = [
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
    title: "NBA API using Pandas",
    description: "NBA Game Analysis Dashboard – Python-powered insights with Dash, Pandas, and Plotly.",
    imageUrl: "https://github.com/AnderssonElin/elinportfolio/blob/main/images/nba_dashboard.PNG?raw=true",
    slug: "nba-dashboard",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  }
];
