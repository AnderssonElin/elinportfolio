
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
      className={`absolute w-full overflow-hidden h-16 ${position === "top" ? "top-0" : "bottom-0"} left-0 z-10 pointer-events-none`}
      style={{ backgroundColor: backgroundColor || "transparent" }}
    >
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1440 54"
        style={{ 
          transform: position === "top" ? "rotate(180deg)" : "rotate(0)"
        }}
      >
        <defs>
          <linearGradient id={`gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: fillColor, stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: fillColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: fillColor, stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        <path
          d="M0 27C151.486 27 226.929 54 378.415 54C529.901 54 605.344 0 756.83 0C908.316 0 983.759 54 1135.25 54C1286.73 54 1362.17 27 1440 27V54H0V27Z"
          fill={`url(#gradient-${position})`}
          fillOpacity="1"
        />
      </svg>
    </div>
  );
};

export default WaveSection;
