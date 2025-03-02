
import { useEffect } from "react";

/**
 * Component that calculates the actual viewport height and sets it as a CSS variable
 * to solve issues with mobile browser viewport heights
 */
const ViewportHeightFix = () => {
  useEffect(() => {
    // Function to update the CSS variable
    const updateViewportHeight = () => {
      // Get the actual inner height of the window
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial calculation
    updateViewportHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Clean up
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ViewportHeightFix;
