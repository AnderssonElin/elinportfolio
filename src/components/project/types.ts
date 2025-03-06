
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
    description: "Data-driven insights with ETL, DAX, and interactive dashboards.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_HR.png?raw=true",
    slug: "powerbi",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 2,
    title: "Automated SQL ETL Pipeline",
    description: "Data Warehouse using SQL Server procedures and bulk operations.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SQL_first_pic.png?raw=true",
    slug: "sql",
    githubUrl: "https://github.com/AnderssonElin/etl-pipeline-sql"
  },
  {
    id: 3,
    title: "Banking System Data Architecture",
    description: "Banking database with Draw.io, SQL, and SSMS.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Bank_konceptuell%20ERD.jpg?raw=true",
    slug: "draw.io",
    githubUrl: "https://github.com/AnderssonElin/bank_architecture"
  },
  {
    id: 4,
    title: "Data ETL & Analysis in SSIS and SSAS",
    description: "SSIS ETL pipeline for flight data cleansing, SSAS tabular model for analysis.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_first_pic.png?raw=true",
    slug: "SSIS",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 5,
    title: "Machine Learning & Predictive Modeling in R",
    description: "Machine learning pipeline in R, K-means clustering and random forest regression.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_first_pic.png?raw=true",
    slug: "R-studio",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 6,
    title: "NBA API using Pandas",
    description: "Python-powered insights with Dash, Pandas, Plotly and more.",
    imageUrl: "https://github.com/AnderssonElin/elinportfolio/blob/main/images/nba_dashboard_1.PNG?raw=true",
    slug: "nba-dashboard",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  {
    id: 7,
    title: "Data Visualization Portfolio",
    description: "Collection of interactive visualizations created with D3.js, Tableau, and Power BI for various business analytics use cases.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_Sälj.png?raw=true",
    slug: "data-viz",
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  }
];
