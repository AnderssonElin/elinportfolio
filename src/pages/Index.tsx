
import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const isMobile = useIsMobile();
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null),
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

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger initial check
    handleScroll();
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={`relative bg-secondary pt-16 h-screen ${!isMobile ? "snap-y snap-mandatory" : ""} overflow-y-auto overflow-x-hidden`}> 
      {/* Background animation that covers the entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundAnimation />
      </div>
      
      {/* Side navigation indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
        {Object.keys(sectionRefs).map((section) => (
          <motion.div
            key={section}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              activeSection === section 
                ? "bg-[#0eec58] scale-125" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              const element = document.getElementById(section);
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </div>
      
      {/* Hero section */}
      <section 
        ref={sectionRefs.hero}
        className="relative min-h-screen h-screen flex items-center justify-center px-4 py-16 snap-start"
        id="hero"
      >
        <Hero />
      </section>
      
      {/* Timeline section */}
      <section 
        ref={sectionRefs.timeline}
        className="relative min-h-screen h-screen flex items-center justify-center px-4 py-16 snap-start" 
        id="timeline"
      >
        <Timeline />
      </section>
      
      {/* Projects section */}
      <section 
        ref={sectionRefs.projects}
        className="relative min-h-screen h-screen flex items-center justify-center px-4 py-16 snap-start" 
        id="projects"
      >
        <Projects />
      </section>
      
      {/* Final section */}
      <section 
        ref={sectionRefs.contact}
        className="relative min-h-screen h-screen flex flex-col justify-center px-4 py-16 snap-start"
        id="contact"
      >
        <Footer />
        <Copyright />
      </section>
    </main>
  );
};

export default Index;
