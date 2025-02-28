
import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Dashboard from "@/components/Dashboard";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { motion } from "framer-motion";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null),
    dashboard: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

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

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Kontrollera vilken sektion som är synlig
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

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("scroll", handleScroll);
    
    // Trigga initial kontroll
    handleScroll();
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative bg-secondary pt-16"> {/* Lägg till padding-top för att ge plats åt headern */}
      {/* Bakgrundsanimering som täcker hela sidan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundAnimation />
      </div>
      
      {/* Hero-sektionen */}
      <motion.section 
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center justify-center px-4 py-16"
        animate={{ 
          opacity: activeSection === "hero" ? 1 : 0.3,
          scale: activeSection === "hero" ? 1 : 0.98
        }}
        transition={{ duration: 0.5 }}
        id="hero"
      >
        <Hero />
      </motion.section>
      
      {/* Timeline-sektionen */}
      <motion.section 
        ref={sectionRefs.timeline}
        className="relative min-h-screen flex items-center justify-center px-4 py-16" 
        animate={{ 
          opacity: activeSection === "timeline" ? 1 : 0.3,
          scale: activeSection === "timeline" ? 1 : 0.98
        }}
        transition={{ duration: 0.5 }}
        id="timeline"
      >
        <Timeline />
      </motion.section>
      
      {/* Dashboard-sektionen */}
      <motion.section 
        ref={sectionRefs.dashboard}
        className="relative min-h-screen flex items-center justify-center px-4 py-16"
        animate={{ 
          opacity: activeSection === "dashboard" ? 1 : 0.3,
          scale: activeSection === "dashboard" ? 1 : 0.98
        }}
        transition={{ duration: 0.5 }}
        id="dashboard"
      >
        <Dashboard />
      </motion.section>
      
      {/* Projects-sektionen */}
      <motion.section 
        ref={sectionRefs.projects}
        className="relative min-h-screen flex items-center justify-center px-4 py-16" 
        animate={{ 
          opacity: activeSection === "projects" ? 1 : 0.3,
          scale: activeSection === "projects" ? 1 : 0.98
        }}
        transition={{ duration: 0.5 }}
        id="projects"
      >
        <Projects />
      </motion.section>
      
      {/* Slutsektionen */}
      <motion.section 
        ref={sectionRefs.contact}
        className="relative min-h-screen flex flex-col justify-center px-4 py-16"
        animate={{ 
          opacity: activeSection === "contact" ? 1 : 0.3,
          scale: activeSection === "contact" ? 1 : 0.98
        }}
        transition={{ duration: 0.5 }}
        id="contact"
      >
        <Footer />
        <Copyright />
      </motion.section>
    </main>
  );
};

export default Index;
