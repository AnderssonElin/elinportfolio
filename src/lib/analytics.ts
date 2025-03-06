
import ReactGA from "react-ga4";

// Initialize Google Analytics with the measurement ID directly in the code
const GOOGLE_ANALYTICS_ID = "G-Q5P0YQFNQD"; // Replace with your actual Google Analytics ID

// Initialize Google Analytics
export const initGA = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  } else {
    console.log("GA initialized in development mode with ID:", GOOGLE_ANALYTICS_ID);
  }
  return true;
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

// Check if Google Analytics ID is set (always returns true in this implementation)
export const hasGAID = () => {
  return true;
};
