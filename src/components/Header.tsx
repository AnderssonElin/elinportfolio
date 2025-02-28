
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Github, Linkedin, Mail, Download } from "lucide-react";
import { useAskMeVisibility } from "./AskMe";

const Header = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsVisible } = useAskMeVisibility();

  useEffect(() => {
    // Lyssna på scroll-händelser för att aktivera blur-effekten
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Aktivera efter 50px scrollning
    };

    window.addEventListener("scroll", handleScroll);
    // Initial kontroll
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setIsVisible(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div 
        className={`w-full transition-all duration-300 py-2 px-4 ${
          isScrolled 
            ? "bg-secondary/70 backdrop-blur-md" 
            : "bg-secondary/30 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Vänster sida - Coin Counter */}
          <div className="flex items-center">
            <motion.button
              className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center overflow-hidden mr-3"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{
                boxShadow: "0 0 15px rgba(155, 135, 245, 0.5)",
              }}
              onClick={handleClick}
              style={{
                background: "radial-gradient(circle at 30% 30%, #9b87f5, #7b67d5)",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </motion.div>
            </motion.button>
            
            <div className="bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
              <span className="text-white font-bold text-sm">{clickCount} 🧞‍♂️</span>
            </div>
          </div>
          
          {/* Höger sida - Sociala ikoner och CV */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 text-white" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4 text-white" />
              </motion.a>
              
              <motion.a
                href="mailto:your-email@example.com"
                className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 text-white" />
              </motion.a>
            </div>
            
            <a
              href="/cv.pdf"
              download
              className="bg-accent hover:bg-accent/90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md flex items-center gap-1 transition-colors text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">CV</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
