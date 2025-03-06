
import ReactGA from "react-ga4";

// Initiera Google Analytics
export const initGA = (measurementId: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(measurementId);
  } else {
    console.log("GA initialized in development mode with ID:", measurementId);
  }
};

// Spåra sidvisningar
export const trackPageview = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Spåra event
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};
