
import { motion } from "framer-motion";

interface ProjectInfoProps {
  year: string;
  tech: string[];
  description: string;
  role: string;
  showHeader: boolean;
}

export const ProjectInfo = ({ 
  year, 
  tech, 
  description, 
  role, 
  showHeader 
}: ProjectInfoProps) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
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
