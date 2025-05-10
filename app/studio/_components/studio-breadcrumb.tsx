import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { STUDIO_LINKS } from '../constants';

type Props = {
    tab: string;
};

export default function StudioBreadcrumb({ tab }: Props) {
    const getPathToTab = (tab: string, acc: { val: string; href?: string }[]) => {
        const path = STUDIO_LINKS[tab as keyof typeof STUDIO_LINKS];

        if (path) {
            acc.push({
                val: path.value,
                href: path.href,
            });
        }

        if (path && path.back) {
            return getPathToTab(path.value, acc);
        }

        return acc;
    };

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex-row-reverse">
                <BreadcrumbItem className="block">
                    <BreadcrumbPage className="capitalize">{tab}</BreadcrumbPage>
                </BreadcrumbItem>
                {getPathToTab(tab, []).map((path, index) => {
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator className="block" />
                            <BreadcrumbItem key={index} className="block">
                                {path.href ? (
                                    <BreadcrumbLink className="capitalize" href={path.href}>
                                        {path.val}
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage className="capitalize">{path.val}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
