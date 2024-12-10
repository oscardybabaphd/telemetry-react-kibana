import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from './instrumentation';

export const RouteListener: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    logEvent('navigation', { path: location.pathname });
  }, [location.pathname]);
  return null;
};
