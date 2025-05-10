import Link from 'next/link';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

type Props = {
    href: string;
    Icon: LucideIcon;
    label: string;
    currentTab: string | undefined;
    tabValue: string | undefined;
};

export default function StudioSidebarLink({ href, Icon, label, currentTab, tabValue }: Props) {
    return (
        <SidebarMenuItem className="px-1">
            <SidebarMenuButton asChild>
                <Link href={href} className="flex items-center gap-2 truncate" data-active={tabValue === currentTab}>
                    {<Icon className="!size-[14px] text-sidebar-foreground" />}
                    <span className="truncate text-[12px] font-medium">{label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
