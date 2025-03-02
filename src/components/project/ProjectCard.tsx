
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectType } from "./types";

interface ProjectCardProps {
  project: ProjectType;
  isHovered: boolean;
  isTouched: boolean;
  isVisible: boolean;
  isDelayedVisible: boolean;
  isMobile: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ 
  project, 
  isHovered, 
  isTouched, 
  isVisible,
  isDelayedVisible,
  isMobile,
  onHoverStart, 
  onHoverEnd, 
  onClick,
  ref
}: ProjectCardProps) => {
  return (
    <motion.div 
      key={project.id} 
      className="group cursor-pointer project-card" 
      ref={ref}
      data-id={project.id}
      onHoverStart={onHoverStart} 
      onHoverEnd={onHoverEnd} 
      onClick={onClick} 
      whileHover={{
        scale: 1.03
      }} 
      transition={{
        duration: 0.2
      }} 
      initial={{
        opacity: 0,
        y: 20
      }} 
      whileInView={{
        opacity: 1,
        y: 0
      }} 
      viewport={{
        once: true
      }}
      style={{
        transform: "scale(1.2)"
      }}
    >
      <div className="rounded-lg p-1 backdrop-blur-sm border border-[#9b87f5]/30 shadow-lg overflow-hidden h-full bg-[#3b56a0]/[0.21]">
        <div className="flex gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
          <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
          <div className="w-2 h-2 rounded-full bg-[#9b87f5]/30"></div>
        </div>
        
        <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
          <motion.div 
            className="absolute inset-0 bg-[#9b87f5]/10 z-10 pointer-events-none" 
            initial={{ opacity: 1 }} 
            animate={{
              opacity: isHovered || isTouched || 
                      (isMobile && isDelayedVisible) ? 0 : 0.5
            }} 
            transition={{ duration: 0.3 }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div 
            className="absolute inset-0 border border-[#9b87f5]/40 group-hover:border-[#9b87f5] transition-all duration-300 z-10 rounded-md" 
            animate={{
              borderColor: isHovered || isTouched || 
                          (isMobile && isDelayedVisible) 
                          ? "rgba(155, 135, 245, 1)" 
                          : "rgba(155, 135, 245, 0.4)"
            }}
          />
          
          <motion.div 
            className="absolute inset-0 w-full h-full" 
            initial={false} 
            animate={{
              scale: isHovered || isTouched || 
                     (isMobile && isDelayedVisible) ? 1.05 : 1
            }} 
            transition={{ duration: 0.4 }}
          >
            <motion.img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover" 
              animate={{
                opacity: isHovered || isTouched || 
                        (isMobile && isDelayedVisible) ? 0.3 : 0.9
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/80 to-black/10" 
            initial={{ opacity: 0 }} 
            animate={{
              opacity: isHovered || isTouched || 
                      (isMobile && isDelayedVisible) ? 1 : 0
            }} 
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
            <p className="text-gray-200 text-xs line-clamp-2">{project.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
