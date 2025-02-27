
import { useState, useEffect } from "react";

const Copyright = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    // Update year if needed (for sites that stay open across year changes)
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (year !== currentYear) {
        setCurrentYear(year);
      }
    }, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, [currentYear]);
  
  return (
    <div className="w-full bg-primary/30 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-400 text-sm">
          Copyright © {currentYear} Elin
        </p>
      </div>
    </div>
  );
};

export default Copyright;
