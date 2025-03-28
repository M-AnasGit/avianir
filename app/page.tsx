'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//@PROVIDERS
import UserProvider from '@/features/user/provider';
import EditorProvider from '@/features/editor/provider';
import ModalProvider from '@/components/providers/modal-provider';
//@COMPONENTS
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';
import EditorNavigation from '@/features/editor/components/EditorNavigation';
import EditorSidebar from '@/features/editor/components/editor-sidebar';
import EditorCanvas from '@/features/editor/components/editor-canvas';
//@SHADCNUI
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const queryClient = new QueryClient();

export default function App() {
    return (
        <ErrorBoundary>
            <div className="z-[20] min-h-screen bg-muted">
                <QueryClientProvider client={queryClient}>
                    <UserProvider user_id="98c71683-bcef-441e-bb24-dbd425228c31">
                        <ModalProvider>
                            <MathJaxContext>
                                <ToastProvider>
                                    <React.Suspense fallback={<Loading />}>
                                        <EditorProvider
                                            course_id="44637aa0-e072-4275-ac07-f2414d4bb190"
                                            chapter_id="e1ee54d2-95bd-4d29-8ed1-eeab3197f314"
                                        >
                                            <EditorNavigation />
                                            <div className="flex h-full justify-center">
                                                <EditorCanvas />
                                            </div>
                                            <Toaster />
                                            <EditorSidebar />
                                        </EditorProvider>
                                    </React.Suspense>
                                </ToastProvider>
                            </MathJaxContext>
                        </ModalProvider>
                    </UserProvider>
                </QueryClientProvider>
            </div>
        </ErrorBoundary>
    );
}
