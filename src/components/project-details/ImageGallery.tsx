
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  showScrollIndicator: boolean;
  showHeader: boolean;
}

export const ImageGallery = ({ 
  images, 
  title, 
  showScrollIndicator, 
  showHeader 
}: ImageGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const openImageInNewTab = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (images.length === 0) return null;

  return (
    <>
      <motion.div 
        className="flex justify-center mt-8 mb-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showScrollIndicator ? 1 : 0, 
          y: showScrollIndicator ? 0 : -10 
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={scrollToGallery}
          className="text-gray-400 hover:text-accent transition-colors flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="mb-2 text-sm">View Images</p>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
            
      <div ref={galleryRef} className="min-h-[50vh] md:min-h-[80vh]">
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
                className="flex justify-center relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
                whileInView={{ 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, margin: "-100px" }}
                onClick={() => openImageInNewTab(image)}
              >
                <div className="relative">
                  <img 
                    src={image} 
                    alt={`${title} screenshot ${index + 1}`} 
                    className="object-cover rounded-lg shadow-xl"
                    style={{ maxWidth: "800px", maxHeight: "800px", width: "100%" }}
                  />
                  
                  <button 
                    className="absolute top-2 right-2 p-2 bg-accent hover:bg-accent/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Open image in new tab"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Need to import ChevronDown at the top of the file
import { ChevronDown } from "lucide-react";
