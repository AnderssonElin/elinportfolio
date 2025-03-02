
import { useState } from "react";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectGrid from "./project/ProjectGrid";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">Projects</h2>
      
      <div className="w-full">
        <ProjectGrid onProjectSelect={(slug) => setSelectedProject(slug)} />
      </div>
      
      {selectedProject && <ProjectDetails projectId={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default Projects;
