'use client';
import React from 'react';
//@SHADCNUI
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import clsx from 'clsx';
//@CUSTOM COMPONENTS
import TabList from './tabs-list';
//@CUSTOM HOOK
import { useEditor } from '../../provider';
//@CONSTANT
import { SIDEBAR_TABS } from './constants';

export default function EditorSidebar() {
    const { state } = useEditor();

    return (
        <Sheet open={true} modal={false}>
            <Tabs className="w-full" defaultValue="styles">
                <SheetContent
                    side="right"
                    className={clsx(
                        'z-[40] mt-[97px] w-16 overflow-hidden p-0 shadow-none transition-all focus:border-none',
                        { hidden: state.editor.preview },
                    )}
                    data-testid="editor-sidebar-tabs"
                >
                    <TabList />
                    <SheetDescription />
                </SheetContent>
                <SheetContent
                    side="right"
                    className={clsx(
                        'z-[40] mr-16 mt-[97px] h-full w-80 overflow-hidden bg-background p-0 shadow-none transition-all focus:outline-none focus:ring-0 focus-visible:ring-0',
                        { hidden: state.editor.preview },
                    )}
                    data-testid="editor-sidebar-content"
                >
                    <div className="no-scrollbar grid h-full gap-4 overflow-scroll pb-36 ring-1 ring-red-500">
                        {Object.entries(SIDEBAR_TABS).map(([k, component], index) => (
                            <TabsContent
                                key={index}
                                value={k}
                                className="focus:outline-none focus:ring-0 focus-visible:ring-0"
                            >
                                <SheetHeader className="p-6 text-left">
                                    <SheetTitle className="capitalize">{k}</SheetTitle>
                                    <SheetDescription />
                                    {component}
                                </SheetHeader>
                            </TabsContent>
                        ))}
                    </div>
                    <SheetDescription />
                </SheetContent>
            </Tabs>
        </Sheet>
    );
}
