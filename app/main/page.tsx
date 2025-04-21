'use client';
import EditorProvider from '@/services/editor/provider';
import EditorNavigation from '@/services/editor/components/editor-navigation';
import EditorSidebar from '@/services/editor/components/editor-sidebar';
import EditorCanvas from '@/services/editor/components/editor-canvas';
import { MathJaxContext } from 'better-react-mathjax';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <MathJaxContext>
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
            </MathJaxContext>
        </QueryClientProvider>
    );
}
