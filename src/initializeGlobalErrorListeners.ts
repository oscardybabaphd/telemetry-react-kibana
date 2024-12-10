import { logEvent } from './instrumentation';

export function initializeGlobalErrorListeners() {
    // Listen for all global errors
    window.addEventListener('error', (event: ErrorEvent) => {
        const currentPath = window.location.pathname;
        if (event.error) {
            logEvent('error', {
                message: event.error.message,
                stack: event.error.stack,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                path: currentPath
            });
        } else {
            // Some errors may not have a stack or `error` object
            logEvent('error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                path: currentPath
            });
        }
    });

    // Listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        logEvent('error', {
            message: event.reason && event.reason.message ? event.reason.message : 'Unhandled Promise Rejection',
            stack: event.reason && event.reason.stack ? event.reason.stack : null
        });
    });

    // Unified listener for button clicks
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target) return;

        // Check if it's a button-like element
        if (
            target.tagName === 'BUTTON' ||
            target.getAttribute('role') === 'button' ||
            target.hasAttribute('data-clickable-button')
        ) {
            // Extract the button label
            const label =
                target.getAttribute('data-clickable-button') ||
                target.getAttribute('data-label') ||
                target.textContent?.trim() ||
                'unknown_button';
            // Get the current URL path
            const currentPath = window.location.pathname;
            // Log the button click event
            logEvent('custom', {
                action: 'button_click',
                label,
                path: currentPath
            });
        }
    });
}
