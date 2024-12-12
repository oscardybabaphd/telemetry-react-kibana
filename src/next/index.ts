// src/index-next.ts
export { initializeInstrumentation, setUser } from '../config';
export { logEvent } from '../instrumentation';
export { ErrorBoundary } from '../errorBoundary';
export { RouteNextListener } from '../routeNextListener'; // Next.js version
export type { InstrumentationConfig, UserData } from '../types';
export { initializeGlobalErrorListeners } from '../initializeGlobalErrorListeners';
