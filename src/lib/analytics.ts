
import ReactGA from "react-ga4";

// Initialize Google Analytics with enhanced security
export const initGA = (measurementId?: string) => {
  // Try to load from localStorage if not provided directly
  const storedMeasurementId = localStorage.getItem('ga_measurement_id');
  const gaId = measurementId || storedMeasurementId;

  if (!gaId) {
    console.warn('Google Analytics measurement ID is not set');
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(gaId);
    console.log("GA initialized in production mode");
  } else {
    console.log("GA initialized in development mode with ID:", gaId);
  }
};

// Set GA measurement ID securely
export const setGAMeasurementId = (measurementId: string) => {
  localStorage.setItem('ga_measurement_id', measurementId);
  console.log("GA measurement ID saved to localStorage");
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
