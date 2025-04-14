'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//@PROVIDERS
import UserProvider from '@/services/user/provider';
import EditorProvider from '@/services/editor/provider';
import ModalProvider from '@/components/providers/modal-provider';
//@COMPONENTS
import Loading from '@/components/loading';
import EditorNavigation from '@/services/editor/components/editor-navigation';
import EditorSidebar from '@/services/editor/components/editor-sidebar';
import EditorCanvas from '@/services/editor/components/editor-canvas';
//@SHADCNUI
import { MathJaxContext } from 'better-react-mathjax';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

export default function App() {
    return (
        <div className="z-[20] min-h-screen bg-muted">
            <QueryClientProvider client={queryClient}>
                <LogOutButton />
                {/* <UserProvider user_id="98c71683-bcef-441e-bb24-dbd425228c31">
                    <TooltipProvider>
                        <MathJaxContext>
                            <ModalProvider>
                                <React.Suspense fallback={<Loading />}>
                                    <EditorProvider
                                        course_id="44637aa0-e072-4275-ac07-f2414d4bb190"
                                        chapter_id="e1ee54d2-95bd-4d29-8ed1-eeab3197f314"
                                    >
                                        <EditorNavigation />
                                        <div className="flex h-full justify-center">
                                            <EditorCanvas />
                                        </div>
                                        <EditorSidebar />
                                    </EditorProvider>
                                </React.Suspense>
                            </ModalProvider>
                        </MathJaxContext>
                    </TooltipProvider>
                </UserProvider> */}
            </QueryClientProvider>
        </div>
    );
}

import useAuth from '@/services/auth/hooks';

const LogOutButton = () => {
    const { logoutUserMutation } = useAuth();
    return <button onClick={() => logoutUserMutation()}>Log out</button>;
};
