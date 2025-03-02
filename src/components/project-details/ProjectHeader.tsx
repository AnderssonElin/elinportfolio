
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProjectHeaderProps {
  title: string;
  onClose: () => void;
}

const ProjectHeader = ({ title, onClose }: ProjectHeaderProps) => {
  return (
    <motion.div
      className="py-6 px-4 md:px-8 sticky top-0 z-10 bg-primary/90 backdrop-blur-sm flex justify-between items-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-grow text-center relative">
        <h1 className="text-xl md:text-2xl font-bold text-accent line-clamp-1">{title}</h1>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectHeader;
