'use client';
import React from 'react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@LUCIDE ICONS
import { Circle, CircleDashed, Ellipsis } from 'lucide-react';
//@CUSTOM HOOK
import { useContent } from '../../provider';

const BORDER_STYLES: Record<string, React.ReactNode> = {
    solid: <Circle />,
    dashed: <CircleDashed />,
    dotted: <Ellipsis />,
};

export default function BorderStyle() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleChangeBorderStyle = (value: string) => {
        handleStyleChange({
            target: {
                id: 'borderStyle',
                value: value,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Style</h5>
            <Tabs value={style.borderStyle || 'solid'} onValueChange={handleChangeBorderStyle}>
                <TabsList
                    className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] bg-transparent"
                    role="tablist"
                >
                    {Object.entries(BORDER_STYLES).map(([key, value], i) => (
                        <TabsTrigger key={i} value={key} className="h-10 w-12 p-0 data-[state=active]:bg-muted">
                            {value}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </section>
    );
}
