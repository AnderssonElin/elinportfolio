
import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

type CVPopupContextType = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const CVPopupContext = createContext<CVPopupContextType | undefined>(undefined);

export const CVPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <CVPopupContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
      <CVPopup />
    </CVPopupContext.Provider>
  );
};

export const useCVPopupVisibility = () => {
  const context = useContext(CVPopupContext);
  if (context === undefined) {
    throw new Error("useCVPopupVisibility must be used within a CVPopupProvider");
  }
  return context;
};

const CVPopup = () => {
  const { isVisible, setIsVisible } = useCVPopupVisibility();
  
  // URLs for CV files
  const englishCVUrl = "https://drive.google.com/file/d/1Trh3r-U0kB_XNM-iXJ07vU0sDHX_Jxm-/view?usp=sharing"; // Replace with correct URL for the English CV
  const swedishCVUrl = "https://drive.google.com/file/d/1XqjGGosH4YAgKx-dANcqcUe5duTUZ7Fh/view?usp=sharing"; // Replace with correct URL for the Swedish CV

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsVisible(false);
            }
          }}
        >
          <motion.div
            className="w-full max-w-md bg-secondary p-8 rounded-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-center text-white mb-8">Download CV</h2>
            
            <div className="space-y-6">
              <p className="text-center text-white text-lg">Choose which language you want to download the CV in:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.a
                  href={englishCVUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileText className="w-5 h-5" />
                  <span>English</span>
                  <Download className="w-4 h-4 ml-1" />
                </motion.a>
                
                <motion.a
                  href={swedishCVUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileText className="w-5 h-5" />
                  <span>Svenska</span>
                  <Download className="w-4 h-4 ml-1" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPopup;
