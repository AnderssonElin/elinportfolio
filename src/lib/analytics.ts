
import ReactGA from "react-ga4";

// Initialize Google Analytics
export const initGA = (measurementId?: string) => {
  // If a measurementId is provided, store it in localStorage
  if (measurementId) {
    localStorage.setItem("ga_id", measurementId);
  }
  
  // Get the ID from localStorage
  const storedId = localStorage.getItem("ga_id");
  
  if (storedId) {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(storedId);
    } else {
      console.log("GA initialized in development mode with ID:", storedId);
    }
    return true;
  }
  
  return false;
};

// Track pageviews
export const trackPageview = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};

// Set Google Analytics ID
export const setGAID = (id: string) => {
  localStorage.setItem("ga_id", id);
  return initGA();
};

// Check if Google Analytics ID is set
export const hasGAID = () => {
  return !!localStorage.getItem("ga_id");
};
