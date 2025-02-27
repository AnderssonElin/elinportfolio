
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
        height: "40px",
        backgroundColor: backgroundColor || "transparent" 
      }}
    >
      <svg
        className="absolute w-full"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1440 24"
        style={{ 
          transform: position === "top" ? "rotate(180deg) translateY(-100%)" : "translateY(0)",
          top: position === "top" ? "100%" : "0",
        }}
      >
        <defs>
          <linearGradient id={`wave-gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: fillColor, stopOpacity: 0.5 }} />
            <stop offset="50%" style={{ stopColor: fillColor, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: fillColor, stopOpacity: 0.5 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C480,24 960,0 1440,12 L1440,24 L0,24 Z"
          fill={`url(#wave-gradient-${position})`}
          strokeWidth="0.5"
          stroke={`${fillColor}`}
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default WaveSection;
