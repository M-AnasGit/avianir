'use client';
import React from 'react';
import Link from 'next/link';
//@SHADCNUI
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
//@LUCIDE ICONS
import { ArrowLeftCircle, EyeIcon, Laptop, Redo2, Smartphone, Tablet, Undo2 } from 'lucide-react';
import clsx from 'clsx';
//@CUSTOM HOOK
import { useEditor } from '../provider';
//@TYPES
import { DeviceTypes } from '../types';
import { unloadData } from '../helpers';

export default function EditorNavigation() {
    const { state, dispatch, updateCourseData } = useEditor();

    const devices: Record<DeviceTypes, React.ReactNode> = React.useMemo(() => {
        return {
            desktop: <Laptop />,
            tablet: <Tablet />,
            mobile: <Smartphone />,
        };
    }, []);

    const handleChangeDevice = React.useCallback((value: string) => {
        dispatch({
            type: 'CHANGE_DEVICE',
            payload: { device: value.toLowerCase() as DeviceTypes },
        });
    }, []);

    const handlePreviewClick = React.useCallback(() => {
        dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
    }, []);

    const handleUndo = React.useCallback(() => {
        dispatch({ type: 'UNDO' });
    }, []);

    const handleRedo = React.useCallback(() => {
        dispatch({ type: 'REDO' });
    }, []);

    const handleSave = React.useCallback(() => {
        updateCourseData(state.chapter_id, unloadData(state));
    }, []);

    return (
        <TooltipProvider>
            <nav
                className={clsx(
                    'fixed inset-0 z-[20] flex h-fit items-center justify-between gap-2 border-b-[1px] bg-background p-6 transition-all',
                    { '!h-0 !overflow-hidden !p-0': state.editor.preview },
                )}
            >
                <aside className="flex w-[300px] max-w-[260px] items-center gap-4">
                    <Link href={`/`}>
                        <ArrowLeftCircle />
                    </Link>
                </aside>
                <aside>
                    <Tabs
                        defaultValue="Desktop"
                        className="w-fit"
                        value={state.editor.device}
                        onValueChange={handleChangeDevice}
                    >
                        <TabsList className="grid h-fit w-full grid-cols-3 gap-2 bg-transparent">
                            {Object.entries(devices).map(([device, icon], i) => (
                                <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                        <TabsTrigger
                                            data-active={state.editor.device === device}
                                            value={device}
                                            className="h-10 w-10 p-0 hover:bg-muted data-[active=true]:bg-muted"
                                        >
                                            {icon}
                                        </TabsTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="capitalize">{device}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TabsList>
                    </Tabs>
                </aside>
                <aside className="flex items-center gap-2">
                    <Button variant={'ghost'} size={'icon'} className="hover:bg-muted" onClick={handlePreviewClick}>
                        <EyeIcon />
                    </Button>
                    <Button
                        disabled={!(state.history.currentIndex > 0 && state.history.history.length > 0)}
                        onClick={handleUndo}
                        variant={'ghost'}
                        size={'icon'}
                        className="hover:bg-muted"
                    >
                        <Undo2 />
                    </Button>
                    <Button
                        disabled={
                            !(
                                state.history.currentIndex < state.history.history.length - 1 &&
                                state.history.history.length > 0
                            )
                        }
                        onClick={handleRedo}
                        variant={'ghost'}
                        size={'icon'}
                        className="mr-4 hover:bg-muted"
                    >
                        <Redo2 />
                    </Button>
                    <Button onClick={handleSave} tabIndex={0}>
                        Save
                    </Button>
                </aside>
            </nav>
        </TooltipProvider>
    );
}
