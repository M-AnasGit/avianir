import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import ErrorBoundary from '@/components/error-boundary';

import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@radix-ui/react-toast';
import { Toaster } from '@/components/ui/toaster';

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
            <body className={`${inter.variable} font-inter antialiased`}>
                <ErrorBoundary>
                    <ToastProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            {children}
                        </ThemeProvider>
                        <Toaster />
                    </ToastProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
