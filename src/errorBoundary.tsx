import React from 'react';
import { logEvent } from './instrumentation';

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log the error to your remote instrumentation
        logEvent('error', { message: error.message, stack: error.stack, info });
    }

    render() {
        // Always render children, no fallback UI
        return this.props.children;
    }
}