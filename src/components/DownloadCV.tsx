
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const DownloadCV = () => {
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex mr-4 space-x-3">
        <motion.a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-5 h-5 text-accent" />
        </motion.a>
        
        <motion.a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="w-5 h-5 text-accent" />
        </motion.a>
        
        <motion.a
          href="mailto:your-email@example.com"
          className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-5 h-5 text-accent" />
        </motion.a>
      </div>
      
      <a
        href="/cv.pdf"
        download
        className="bg-accent hover:bg-accent/90 text-white px-3 py-2 rounded-md flex items-center gap-1 transition-colors"
      >
        <Download className="w-4 h-4" />
        CV
      </a>
    </motion.div>
  );
};

export default DownloadCV;
