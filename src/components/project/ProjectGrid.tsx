
import { useState, useEffect, useRef } from "react";
import { projectsData } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  onProjectSelect: (slug: string) => void;
}

const ProjectGrid = ({ onProjectSelect }: ProjectGridProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [touchedId, setTouchedId] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [delayedVisibleProjects, setDelayedVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            if (entry.isIntersecting) {
              setVisibleProjects(prev => prev.includes(id) ? prev : [...prev, id]);
            } else {
              setVisibleProjects(prev => prev.filter(item => item !== id));
            }
          });
        },
        { threshold: 0.6 } // Require 60% visibility to trigger
      );

      projectRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });

      return () => {
        projectRefs.current.forEach(ref => {
          if (ref) observer.unobserve(ref);
        });
      };
    }
  }, [isMobile, projectRefs.current.length]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    visibleProjects.forEach(id => {
      if (!delayedVisibleProjects.includes(id)) {
        const timer = setTimeout(() => {
          setDelayedVisibleProjects(prev => [...prev, id]);
        }, 500); // Changed from 1000ms to 500ms (half the time)
        timers.push(timer);
      }
    });
    
    delayedVisibleProjects.forEach(id => {
      if (!visibleProjects.includes(id)) {
        setDelayedVisibleProjects(prev => prev.filter(item => item !== id));
      }
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [visibleProjects, delayedVisibleProjects]);

  useEffect(() => {
    if (touchedId !== null) {
      const timer = setTimeout(() => {
        setTouchedId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [touchedId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 max-w-[95%] mx-auto">
      {projectsData.map((project, index) => (
        <ProjectCard 
          key={project.id}
          project={project}
          isHovered={hoveredId === project.id}
          isTouched={touchedId === project.id}
          isVisible={visibleProjects.includes(project.id)}
          isDelayedVisible={delayedVisibleProjects.includes(project.id)}
          isMobile={!!isMobile}
          ref={el => projectRefs.current[index] = el}
          onHoverStart={() => setHoveredId(project.id)}
          onHoverEnd={() => setHoveredId(null)}
          onClick={() => onProjectSelect(project.slug)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
