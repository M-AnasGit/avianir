'use client';
import React from 'react';
import CommunityModal from './community-modal';
//@SHADCNUI
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
//@LUCIDE ICONS
import { Moon, Sun, Users } from 'lucide-react';
//@CONSTANTS
import { SIDEBAR_TABS_ICONS } from './constants';
//@HOOKS
import { useTheme } from 'next-themes';
import { useModal } from '@/components/providers/modal-provider';
import { useEditor } from '../../provider';

export default function TabList() {
    const { state, presets, updateCourseData } = useEditor();
    const { setTheme } = useTheme();
    const { handleSetModal } = useModal();

    const handleCommunityTab = () => {
        handleSetModal(
            <CommunityModal device={state.editor.device} presets={presets} updateCourseData={updateCourseData} />,
            1200,
        );
    };

    return (
        <div className="flex h-[90%] w-full flex-col items-center justify-between">
            <TabsList className="flex w-full flex-col items-center justify-start gap-4 border-0 bg-transparent">
                {Object.entries(SIDEBAR_TABS_ICONS).map(([k, icon], index) => (
                    <TabsTrigger
                        key={index}
                        data-testid={`sidebar-tabs-${k}`}
                        value={k}
                        className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                    >
                        {icon}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="mb-4" onClick={handleCommunityTab}>
                    <Users className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="mb-4"
                    onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </div>
        </div>
    );
}
