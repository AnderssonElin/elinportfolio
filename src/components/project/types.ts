export interface ProjectType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export const projectsData: ProjectType[] = [
  {
    id: 1,
    title: "NBA API using Pandas",
    description: "Python-powered insights with Dash, Pandas, Plotly and more.",
    imageUrl: "https://github.com/AnderssonElin/nba-dashboard/blob/main/images/nba_dashboard_1.PNG?raw=true",
    slug: "nba-dashboard"
  },
  {
    id: 2,
    title: "Machine Learning & Predictive Modeling in R",
    description: "K-means clustering and random forest regression.",
    imageUrl: "https://github.com/AnderssonElin/Machine-Learning-R/blob/main/images/R_cluster_thumbnail.png?raw=true",
    slug: "R-studio"
  },
  {
    id: 3,
    title: "Data ETL & Analysis in SSIS and SSAS",
    description: "Flight data cleansing, SSAS tabular model for analysis.",
    imageUrl: "https://github.com/AnderssonElin/skydata-analytics-SSIS-SSAS/blob/main/images/extraction_process.png?raw=true",
    slug: "SSIS"
  },
  {
    id: 4,
    title: "Banking System Data Architecture",
    description: "Banking database with Draw.io, SQL, and SSMS.",
    imageUrl: "https://github.com/AnderssonElin/bank_architecture/blob/main/images/1_bank_concept.jpg?raw=true",
    slug: "draw.io"
  },
  {
    id: 5,
    title: "Automated SQL ETL Pipeline",
    description: "Data Warehouse using SQL Server procedures and bulk operations.",
    imageUrl: "https://github.com/AnderssonElin/etl-pipeline-sql/blob/main/images/1_sql_code.png?raw=true",
    slug: "sql"
  },
  {
    id: 6,
    title: "Dynamics 365 Sales Dashboard in Power BI",
    description: "Annual revenue distribution for multi-year opportunities.",
    imageUrl: "https://github.com/AnderssonElin/sales-kpi-powerbi/blob/main/images/kpi_sample.png?raw=true",
    slug: "sales-kpi"
  },
  {
    id: 7,
    title: "Power BI report in Sales",
    description: "Data-driven insights with ETL, DAX, and interactive dashboards.",
    imageUrl: "https://github.com/AnderssonElin/finance-dashboard-pbi/blob/main/images/5_sales_projectthumbnail.png?raw=true",
    slug: "powerbi"
  }
];
