'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import CanvasProvider from './provider';
import ContextMenuWrapper from '../../context-menu-wrapper';
//@LUCIDE ICONS
import { EyeOff } from 'lucide-react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
//@CUSTOM HOOK
import { useEditor } from '../../provider';

export default function EditorCanvas() {
    const { state, dispatch } = useEditor();

    const handlePreviewChange = React.useCallback(() => {
        dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
    }, []);

    return (
        <div
            className={clsx(
                'no-scrollbar mb-[50px] ml-8 mr-[416px] mt-[150px] h-full bg-background shadow-lg transition-all',
                {
                    '!m-0 !p-0': state.editor.preview,
                    '!w-[1440px]': state.editor.device === 'desktop',
                    '!w-[850px]': state.editor.device === 'tablet',
                    '!w-[375px]': state.editor.device === 'mobile',
                },
            )}
            data-testid="editor-canvas"
        >
            <Button
                className={clsx('absolute right-4 top-4 z-[30] bg-muted hover:bg-transparent', {
                    '!hidden': !state.editor.preview,
                })}
                size={'icon'}
                onClick={handlePreviewChange}
            >
                <EyeOff size={18} className="text-primary" />
            </Button>
            <CanvasProvider elements={state.editor.elements} />
        </div>
    );
}
