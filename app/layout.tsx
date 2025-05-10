import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
//@CUSTOMCOMPONENTS
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';
import ErrorToast from '@/components/error-toast';
//@PROVIDERS
import { MathJaxContext } from 'better-react-mathjax';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import ModalProvider from '@/components/providers/modal-provider';
//@SHADCNUI
import { Toaster } from '@/components/ui/toaster';
//@STYLES
import './globals.css';

const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_PLACEHOLDER_NAME,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} bg-background font-inter antialiased`}>
                <ErrorBoundary>
                    <ErrorToast>
                        <ThemeProvider attribute="class" disableTransitionOnChange>
                            <ToastProvider>
                                <TooltipProvider>
                                    <ModalProvider>
                                        <MathJaxContext>
                                            <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
                                        </MathJaxContext>
                                    </ModalProvider>
                                </TooltipProvider>
                                <Toaster />
                            </ToastProvider>
                        </ThemeProvider>
                    </ErrorToast>
                </ErrorBoundary>
            </body>
        </html>
    );
}
