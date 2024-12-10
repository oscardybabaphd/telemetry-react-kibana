// src/config.ts
import { InstrumentationConfig, UserData } from './types';
import { startAutoFlush } from './instrumentation';

let config: InstrumentationConfig | null = null;
let currentUser: UserData | null = null;

export function initializeInstrumentation(newConfig: InstrumentationConfig) {
    config = { ...newConfig };
    startAutoFlush(); // Start auto flush if flushInterval is set
}

export function getConfig(): InstrumentationConfig {
    if (!config) {
        throw new Error("Instrumentation not initialized. Call initializeInstrumentation first.");
    }
    return config;
}

export function setUser(user: UserData) {
    currentUser = user;
}

export function getUser(): UserData | null {
    return currentUser;
}
