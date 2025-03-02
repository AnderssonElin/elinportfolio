
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  showHeader: boolean;
  handleImageClick: (imageSrc: string) => void;
}

const ProjectGallery = ({ images, title, showHeader, handleImageClick }: ProjectGalleryProps) => {
  return (
    <div className="min-h-[50vh] md:min-h-[80vh]">
      <motion.div 
        className="mt-16 pb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: !showHeader ? 1 : 0.3, y: !showHeader ? 0 : 30 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-12">
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              className="flex justify-center relative group"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              whileInView={{ 
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <div className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
                <img 
                  src={image} 
                  alt={`${title} screenshot ${index + 1}`} 
                  className="object-cover rounded-lg shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ maxWidth: "800px", maxHeight: "800px", width: "100%" }}
                />
                
                <a 
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-2 bg-accent hover:bg-accent/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Open image in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectGallery;
