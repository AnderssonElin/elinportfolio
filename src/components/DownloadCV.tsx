
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const DownloadCV = () => {
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <a
        href="/cv.pdf" // Du behöver lägga till din CV-fil i public-mappen
        download
        className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download CV
      </a>
    </motion.div>
  );
};

export default DownloadCV;
