
import { motion } from "framer-motion";
import { Github } from "lucide-react";

interface ProjectInfoProps {
  year: string;
  tech: string[];
  description: string;
  role: string;
  githubUrl?: string;
  showHeader: boolean;
}

const ProjectInfo = ({ year, tech, description, role, githubUrl, showHeader }: ProjectInfoProps) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: showHeader ? 1 : 0.7, y: showHeader ? 0 : -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-accent mb-3">Year</h2>
          <p className="text-gray-300">{year}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-accent mb-3">Tech & Technique</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-primary/50 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <Github size={18} />
              <span>View project on GitHub</span>
            </a>
          )}
        </div>
      </div>
      
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-accent mb-3">Description</h2>
          <p className="text-gray-300">{description}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-accent mb-3">My Role</h2>
          <p className="text-gray-300">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectInfo;
