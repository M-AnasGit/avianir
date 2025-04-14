'use client';
import React from 'react';
import Loading from '@/components/loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-background p-4 sm:p-0 md:gap-4">
                <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
            </main>
        </QueryClientProvider>
    );
}
