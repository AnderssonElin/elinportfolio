
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
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
              className="relative group bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center cursor-pointer overflow-hidden hover:bg-accent/30 transition-all duration-300"
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glitter animation runt countern */}
              <motion.div 
                className="absolute -inset-1 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ rotate: [0, 360] }}
                transition={{ 
                  duration: 8, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${50 + 35 * Math.cos(2 * Math.PI * i / 8)}%`,
                      top: `${50 + 35 * Math.sin(2 * Math.PI * i / 8)}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      repeatDelay: 0.5
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-200" />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Pulsating coin icon */}
              <motion.div
                className="w-6 h-6 mr-2 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(circle at 30% 30%, #9b87f5, #7b67d5)",
                }}
              >
                <span className="text-yellow-200 text-xs">✨</span>
              </motion.div>
              
              <span className="text-white font-bold text-sm">{clickCount} 🧞‍♂️</span>
            </motion.button>
          </div>
          
          {/* Höger sida - Sociala ikoner och CV */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 text-accent" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4 text-accent" />
              </motion.a>
              
              <motion.a
                href="mailto:your-email@example.com"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 text-accent" />
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
