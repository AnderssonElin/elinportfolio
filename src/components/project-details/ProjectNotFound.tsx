
import { motion } from "framer-motion";

interface ProjectNotFoundProps {
  onClose: () => void;
}

const ProjectNotFound = ({ onClose }: ProjectNotFoundProps) => {
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
};

export default ProjectNotFound;
