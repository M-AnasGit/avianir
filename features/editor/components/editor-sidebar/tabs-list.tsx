'use client';
import React from 'react';
import { useTheme } from 'next-themes';
//@SHADCNUI
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
//@LUCIDE ICONS
import { Moon, Sun } from 'lucide-react';
//@CONSTANTS
import { SIDEBAR_TABS_ICONS } from './constants';

export default function TabList() {
    const { setTheme } = useTheme();

    return (
        <div className="flex h-[90%] w-full flex-col items-center justify-between">
            <TabsList className="flex w-full flex-col items-center justify-start gap-4 border-0 bg-transparent">
                {Object.entries(SIDEBAR_TABS_ICONS).map(([k, icon], index) => (
                    <TabsTrigger
                        key={index}
                        data-testid={k}
                        value={k}
                        className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                    >
                        {icon}
                    </TabsTrigger>
                ))}
            </TabsList>
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
    );
}
