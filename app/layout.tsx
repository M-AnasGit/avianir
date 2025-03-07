import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Editor + Nextjs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-inter antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
