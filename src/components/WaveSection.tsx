
import React from "react";

interface WaveSectionProps {
  position: "top" | "bottom";
  fillColor: string;
  backgroundColor?: string;
}

const WaveSection: React.FC<WaveSectionProps> = ({ 
  position, 
  fillColor,
  backgroundColor
}) => {
  return (
    <div 
      className={`absolute w-full overflow-hidden pointer-events-none ${position === "top" ? "top-0" : "bottom-0"} left-0 z-10`}
      style={{ 
        height: "60px",
        backgroundColor: backgroundColor || "transparent" 
      }}
    >
      <svg
        className="absolute w-full"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1440 54"
        style={{ 
          transform: position === "top" ? "rotate(180deg)" : "rotate(0)",
        }}
      >
        <defs>
          <linearGradient id={`wave-gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#9b87f5", stopOpacity: 0.7 }} />
            <stop offset="25%" style={{ stopColor: "#33C3F0", stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: "#D946EF", stopOpacity: 0.7 }} />
            <stop offset="75%" style={{ stopColor: "#33C3F0", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#9b87f5", stopOpacity: 0.7 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,16 C240,40 480,0 720,24 C960,48 1200,8 1440,24 L1440,54 L0,54 Z"
          fill="none"
          stroke="url(#wave-gradient-${position})"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default WaveSection;
