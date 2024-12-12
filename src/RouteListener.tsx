import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "./instrumentation"; // Adjust the import path as needed

/**
 * For standard React projects (e.g., Create React App) using React Router:
 * Listens for route changes using react-router-dom's useLocation().
 */
export const RouteListener: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
      logEvent("navigation", { path: location.pathname });
    }
  }, [location.pathname, currentPath]);

  return null;
};
