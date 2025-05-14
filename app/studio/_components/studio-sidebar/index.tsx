import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
//@SHADCNUI
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
//@COMPONENTS
import StudioSidebarLink from './studio-sidebar-link';
import UserAvatar from '@/components/user-avatar';
//@ICONS
import { ArrowLeftSquare, CircleHelp, LogOut, MoreVertical, Settings, Sparkles, UserPen } from 'lucide-react';
//@TYPES
import { UserWithEmail } from '@/services/types';
import { useUser } from '@/services/user/provider';

type Props = {
    user: UserWithEmail;
    tab: string | undefined;
};

export function StudioSidebar({ user, tab }: Props) {
    const { auth } = useUser();
    const { isMobile } = useSidebar();
    const router = useRouter();

    const signOut = async () => {
        try {
            await auth.signOut();
            router.refresh();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="px-2 py-4">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    asChild
                >
                    <Link href="/">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                            <Image
                                src="/logo.png"
                                alt="Avianir logo"
                                width={28}
                                height={28}
                                className="h-auto w-auto"
                            />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Avianir</span>
                            <span className="truncate text-xs">Back to landing</span>
                        </div>
                        <ArrowLeftSquare className="ml-auto" />
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>User</SidebarGroupLabel>
                    <StudioSidebarLink
                        href="/studio"
                        Icon={UserPen}
                        label="Profile"
                        currentTab={tab}
                        tabValue={undefined}
                    />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="px-2 py-4">
                <SidebarGroup className="px-0">
                    <StudioSidebarLink
                        href="/studio?tab=settings"
                        Icon={Settings}
                        label="Settings"
                        currentTab={tab}
                        tabValue="settings"
                    />
                    <StudioSidebarLink
                        href="/studio?tab=help"
                        Icon={CircleHelp}
                        label="Help"
                        currentTab={tab}
                        tabValue="help"
                    />
                </SidebarGroup>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserAvatar user={user} />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <MoreVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserAvatar user={user} />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.subscription_plan === 'free' && (
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive hover:!bg-destructive/25 hover:!text-destructive-foreground"
                            onClick={signOut}
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
