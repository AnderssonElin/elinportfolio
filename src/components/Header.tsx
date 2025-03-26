import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import { useAskMeVisibility } from "./AskMe";
import { useCVPopupVisibility } from "./CVPopup";
import { useCoinCounter } from "../context/CoinCounterContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsVisible: setAskMeVisible } = useAskMeVisibility();
  const { setIsVisible: setCVPopupVisible } = useCVPopupVisibility();
  const { count, incrementCount, isLoading } = useCoinCounter();

  useEffect(() => {
    // Listen for scroll events to activate blur effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Activate after 50px scrolling
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = async () => {
    await incrementCount();
    setAskMeVisible(true);
  };

  const handleCVClick = () => {
    setCVPopupVisible(true);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16"
      role="banner"
      aria-label="Site header"
    >
      <div 
        className={`w-full h-full transition-all duration-300 py-2 px-4 ${
          isScrolled 
            ? "bg-secondary/70 backdrop-blur-md" 
            : "bg-secondary/30 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          {/* Left side - Coin Counter */}
          <div className="flex items-center">
            <motion.button
              className="relative group bg-accent/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-flex items-center cursor-pointer overflow-hidden hover:bg-accent/30 transition-all duration-300"
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              aria-label="Open Ask Me Assistant"
              aria-disabled={isLoading}
            >
              {/* Glitter animation around counter */}
              <motion.div 
                className="absolute -inset-1 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ rotate: [0, 360] }}
                transition={{ 
                  duration: 8, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
                aria-hidden="true"
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
                    aria-hidden="true"
                  >
                    <Sparkles className="w-3 h-3 text-yellow-200 sm:w-4 sm:h-4" />
                  </motion.div>
                ))}
              </motion.div>
              
              <span className="text-white font-bold text-sm sm:text-base">
                {isLoading ? "Loading..." : `${count} 🧞‍♂️`}
              </span>
            </motion.button>
          </div>
          
          {/* Right side - Social icons and CV */}
          <nav className="flex items-center space-x-2 sm:space-x-4" aria-label="Social media and contact">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.a
                href="https://github.com/AnderssonElin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit my GitHub profile"
              >
                <Github className="w-6 h-6 sm:w-8 sm:h-8 text-accent" aria-hidden="true" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/e-andersson/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit my LinkedIn profile"
              >
                <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-accent" aria-hidden="true" />
              </motion.a>
              
              <motion.a
                href="mailto:elin.an@hotmail.com"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send email to elin.an@hotmail.com"
              >
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-accent" aria-hidden="true" />
              </motion.a>
            </div>
            
            <motion.button
              onClick={handleCVClick}
              className="bg-accent hover:bg-accent/90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md flex items-center gap-1 transition-colors text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View CV"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="inline">CV</span>
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
