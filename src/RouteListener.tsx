// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { logEvent } from './instrumentation';

// export const RouteListener: React.FC = () => {
//   const location = useLocation();
//   useEffect(() => {
//     logEvent('navigation', { path: location.pathname });
//   }, [location.pathname]);
//   return null;
// };

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocation } from "react-router-dom";
import { logEvent } from "./instrumentation";

const isClient = typeof window !== "undefined";

export const RouteListener: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("");

  const nextRouter = isClient && useRouter ? useRouter() : null;
  const reactRouterLocation = isClient && useLocation ? useLocation() : null;

  useEffect(() => {
    if (isClient) {
      let pathname: string;

      if (reactRouterLocation) {
        pathname = reactRouterLocation.pathname;
      } else if (nextRouter) {
        pathname = nextRouter.pathname;
      } else {
        pathname = window.location.pathname;
      }

      if (pathname !== currentPath) {
        setCurrentPath(pathname);
        logEvent("navigation", { path: pathname });
      }
    }
  }, [nextRouter?.pathname, reactRouterLocation?.pathname, currentPath]);

  return null;
};
