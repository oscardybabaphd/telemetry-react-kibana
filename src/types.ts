// src/types.ts
export interface InstrumentationConfig {
    apiEndpoint: string;
    headers?: Record<string, string>;
    environment: 'Production' | 'Console';
    globalTags?: Record<string, string>;
    flushInterval?: number;    // in ms, how often to auto-flush
    maxQueueSize?: number;     // number of events before automatic flush
}

export interface UserData {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
}

export interface EventData {
    type: 'navigation' | 'error' | 'custom';
    timestamp: number;
    payload: any;
    user?: UserData;
    tags?: Record<string, string>;
}
