'use client';
import React from 'react';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
//@SHADCNUI
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
//@COMPONENTS
import Loading from '@/components/loading';
import StudioBreadcrumb from './_components/studio-breadcrumb';
import { StudioSidebar } from './_components/studio-sidebar';
import { TabComponents, Props as TabComponentsProps } from './_components/studio-pages';
//@CONSTANTS
import { STUDIO_SCREENS } from './constants';
//@CUSTOM HOOKS
import { useUser } from '@/services/user/provider';

export default function StudioPage() {
    const { user } = useUser();
    const params = useSearchParams();
    let tab = params.get('tab') || undefined;

    if (tab && !STUDIO_SCREENS.includes(tab)) {
        redirect('/studio');
    }

    const tabComponentProps: TabComponentsProps | null = React.useMemo(() => ({}), []);

    const TabComponent: React.ComponentType<TabComponentsProps> = React.useMemo(
        () => (tab ? TabComponents[tab] : TabComponents['profile']),
        [tab],
    );

    if (!user || !tabComponentProps) throw new Error('User not found');

    return (
        <SidebarProvider>
            <StudioSidebar user={user} tab={tab} />
            <main className="mx-2 my-2 flex w-full flex-col gap-8">
                <SidebarInset className="py-2">
                    <div className="flex items-center gap-2 px-4 py-[20px]">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <StudioBreadcrumb tab={tab ? tab : 'profile'} />
                    </div>
                    <React.Suspense fallback={<Loading />}>
                        <TabComponent {...tabComponentProps} />
                    </React.Suspense>
                </SidebarInset>
            </main>
        </SidebarProvider>
    );
}
