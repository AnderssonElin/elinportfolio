
import React from "react";

interface WaveSectionProps {
  position: "top" | "bottom";
  fillColor?: string;
  backgroundColor?: string;
}

const WaveSection: React.FC<WaveSectionProps> = ({ 
  position, 
  fillColor = "#151823",
  backgroundColor
}) => {
  return (
    <div 
      className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden z-10 pointer-events-none`}
      style={{ height: "60px" }}
    >
      <svg
        className="absolute w-full h-24"
        preserveAspectRatio="none"
        width="100%"
        height="100"
        viewBox="0 0 1440 100"
        style={{ 
          transform: position === "top" ? "rotate(180deg) translateY(1px)" : "translateY(-1px)",
        }}
      >
        <defs>
          <linearGradient id={`wave-gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#9b87f5" }} />
            <stop offset="50%" style={{ stopColor: "#D946EF" }} />
            <stop offset="100%" style={{ stopColor: "#33C3F0" }} />
          </linearGradient>
        </defs>
        
        {/* Background fill */}
        <path
          d="M0,0 L1440,0 L1440,100 L0,100 Z"
          fill={backgroundColor || fillColor}
        />
        
        {/* Purely horizontal wave path with gradient stroke */}
        <path
          d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40"
          fill="none"
          stroke={`url(#wave-gradient-${position})`}
          strokeWidth="4"
        />
        
        {/* Decorative dots */}
        {[...Array(12)].map((_, i) => (
          <circle 
            key={i}
            cx={120 * i}
            cy={40 + (i % 2 ? 15 : -15)}
            r="3"
            fill={i % 3 === 0 ? "#9b87f5" : i % 3 === 1 ? "#D946EF" : "#33C3F0"}
          />
        ))}
      </svg>
    </div>
  );
};

export default WaveSection;
