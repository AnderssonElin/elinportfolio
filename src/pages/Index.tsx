import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ScrollIndicator from "@/components/ScrollIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const isMobile = useIsMobile();
  
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const isLastSection = activeSection === 'contact';

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const element = document.getElementById(id || "");
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Check which section is visible
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-secondary min-h-screen">
      {/* Background animation that covers the entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundAnimation />
      </div>
      
      {/* Side navigation indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
        {Object.keys(sectionRefs).map((section) => (
          <div key={section} className="relative w-6 h-6 flex items-center justify-center">
            <motion.div
              className={`
                ${activeSection === section 
                  ? "bg-[#9b87f5]" 
                  : "bg-white/30 hover:bg-white/50"
                } 
                w-3 h-3 rounded-full absolute transition-colors duration-500
              `}
              whileHover={{ scale: 1.2 }}
              initial={false}
              animate={{
                scale: activeSection === section ? 1.1 : 1,
                opacity: activeSection === section ? 0 : 1
              }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                const element = document.getElementById(section);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <AnimatePresence mode="wait">
              {activeSection === section && (
                <motion.div
                  className="w-3 h-3 bg-[#9b87f5] rotate-45 absolute cursor-pointer"
                  initial={{ scale: 0, rotate: 0, borderRadius: "50%" }}
                  animate={{ 
                    scale: 1.1, 
                    rotate: 45,
                    borderRadius: "0%" 
                  }}
                  exit={{ 
                    scale: 0,
                    rotate: 0,
                    borderRadius: "50%" 
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  onClick={() => {
                    const element = document.getElementById(section);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator - only show if not on the last section */}
      {!isLastSection && <ScrollIndicator />}
      
      {/* Hero section */}
      <section 
        ref={sectionRefs.hero}
        className="min-h-screen w-full flex items-center justify-center px-4"
        id="hero"
      >
        <div className="w-full max-w-5xl flex items-center justify-center">
          <Hero />
        </div>
      </section>
      
      {/* Projects section - moved before Timeline */}
      <section 
        ref={sectionRefs.projects}
        className="min-h-screen w-full flex items-center justify-center px-4" 
        id="projects"
      >
        <div className="w-full max-w-5xl flex items-center justify-center">
          <Projects />
        </div>
      </section>
      
      {/* Timeline section - moved after Projects */}
      <section 
        ref={sectionRefs.timeline}
        className="min-h-screen w-full flex items-center justify-center px-4" 
        id="timeline"
      >
        <div className="w-full max-w-5xl flex items-center justify-center">
          <Timeline />
        </div>
      </section>
      
      {/* Final section */}
      <section 
        ref={sectionRefs.contact}
        className="min-h-screen w-full flex flex-col items-center justify-center px-4"
        id="contact"
      >
        <div className="w-full max-w-5xl">
          <Footer />
          <Copyright />
        </div>
      </section>
    </div>
  );
};

export default Index;
