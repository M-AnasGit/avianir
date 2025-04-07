'use client';
import React from 'react';
//@LUCIDE ICONS
import {
    AlignVerticalJustifyCenter,
    AlignVerticalJustifyEnd,
    AlignVerticalJustifyStart,
    AlignVerticalSpaceAround,
    AlignVerticalSpaceBetween,
    LucideIcon,
} from 'lucide-react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@CUSTOM HOOK
import { useContent } from '../../provider';

const JUSTIFY_CONTENT: Record<string, LucideIcon> = {
    'flex-start': AlignVerticalJustifyStart,
    'flex-end': AlignVerticalJustifyEnd,
    center: AlignVerticalJustifyCenter,
    'space-between': AlignVerticalSpaceBetween,
    'space-around': AlignVerticalSpaceAround,
};

export default function JustifyContent() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleJustifyContentChange = (justify: string) => {
        handleStyleChange({
            target: {
                id: 'justifyContent',
                value: justify,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Justify Content</h5>
            <Tabs value={style.justifyContent || 'flex-start'} onValueChange={handleJustifyContentChange}>
                <TabsList className="tabs-list" role="tablist">
                    {Object.entries(JUSTIFY_CONTENT).map(([k, Icon], i) => (
                        <TabsTrigger key={i} className="tabs-trigger" value={k}>
                            <Icon size={18} />
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </section>
    );
}
