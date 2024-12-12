import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logEvent } from "./instrumentation";

/**
 * For Next.js projects:
 * Listens for route changes using Next.js' built-in router.
 */
export const RouteNextListener: React.FC = () => {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState(router.pathname);
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url !== currentPath) {
                setCurrentPath(url);
                logEvent("navigation", { path: url });
            }
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [currentPath, router.events]);

    return null;
};
