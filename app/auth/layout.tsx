'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({});

    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-background p-4 sm:p-0 md:gap-4">
                {children}
            </main>
        </QueryClientProvider>
    );
}
