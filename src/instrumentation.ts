// src/instrumentation.ts
import { EventData } from './types';
import { getUser, getConfig } from './config';
import { sendEventBatch } from './apiClient';

let eventQueue: EventData[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

export function logEvent(type: EventData['type'], payload: any) {
    const user = getUser();
    const { globalTags, maxQueueSize } = getConfig();

    const event: EventData = {
        type,
        timestamp: Date.now(),
        payload,
        user: user || undefined,
        tags: globalTags || {},
    };

    eventQueue.push(event);

    // Auto-flush if queue exceeds max size
    if (maxQueueSize && eventQueue.length >= maxQueueSize) {
        flushEvents();
    }
}

export function flushEvents() {
    if (eventQueue.length === 0) return;

    const batch = [...eventQueue];
    eventQueue = []; // Clear the queue

    sendEventBatch(batch).catch((error) => {
        console.warn('Failed to send batched events:', error);
        // Optionally re-queue events if needed.
    });
}

export function startAutoFlush() {
    const { flushInterval } = getConfig();
    if (flushInterval && flushInterval > 0) {
        // Clear any existing timer
        if (flushTimer) {
            clearInterval(flushTimer);
        }
        flushTimer = setInterval(() => {
            flushEvents();
        }, flushInterval);
    }
}

export function stopAutoFlush() {
    if (flushTimer) {
        clearInterval(flushTimer);
        flushTimer = null;
    }
}
