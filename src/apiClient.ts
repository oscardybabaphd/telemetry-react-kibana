// src/apiClient.ts
import { getConfig } from './config';
import { EventData } from './types';

export async function sendEvent(event: EventData) {
    const { apiEndpoint, environment, headers } = getConfig();
    removeDupHeaderKey(headers, "Content-Type");
    const _headers = { ...{ 'Content-Type': 'application/json' }, ...headers }
    if (environment != "Production") {
        console.info("info =>", event, "header =>", _headers);
        return;
    }

    fetch(apiEndpoint, {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify(event),
        mode: 'no-cors'
    }).catch((error) => { console.error(error) });
}

export async function sendEventBatch(events: EventData[]) {
    const { apiEndpoint, environment, headers } = getConfig();
    removeDupHeaderKey(headers, "Content-Type");
    const _headers = { ...{ 'Content-Type': 'application/json' }, ...headers }
    if (environment != "Production") {
        console.info("info =>", events, "header =>", _headers);
        return;
    }

    fetch(apiEndpoint, {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify({ events }),
        mode: 'no-cors'
    }).catch((error) => { console.error(error) });;

}
function removeDupHeaderKey<K extends string, T>(record: Record<K, T> | undefined | null, key: K): void {
    if (!record) {
        return;
    }
    if (key in record) {
        delete record[key];
    }
}
