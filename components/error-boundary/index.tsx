'use client';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    message?: string;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(e: Error): ErrorBoundaryState {
        return { hasError: true, message: e.message };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className="flex h-screen w-full flex-col items-center justify-center gap-y-4">
                    <h2 className="text-3xl">Oops, an error occured while processing your request.</h2>
                    {this.state.message && (
                        <p className="text-base font-normal text-muted-foreground">{this.state.message}</p>
                    )}
                    <Button onClick={() => this.setState({ hasError: false })}>Try again?</Button>
                </section>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
