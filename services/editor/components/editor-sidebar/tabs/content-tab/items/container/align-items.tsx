'use client';
import React from 'react';
//@LUCIDE ICONS
import { AlignCenterHorizontal, AlignEndHorizontal, AlignStartHorizontal, LucideIcon } from 'lucide-react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@CUSTOM HOOK
import { useContent } from '../../provider';

const ALIGN_ITEMS: Record<string, LucideIcon> = {
    'flex-start': AlignStartHorizontal,
    center: AlignCenterHorizontal,
    'flex-end': AlignEndHorizontal,
};

export default function AlignItems() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleAlignItemsChange = (align: string) => {
        handleStyleChange({
            target: {
                id: 'alignItems',
                value: align,
            },
        });
    };

    return (
        <div className="prop-container">
            <h5 className="prop-label">Align items</h5>
            <Tabs onValueChange={handleAlignItemsChange} value={style.alignItems || 'flex-start'}>
                <TabsList className="tabs-list" role="tablist">
                    {Object.entries(ALIGN_ITEMS).map(([k, Icon], i) => (
                        <TabsTrigger key={i} className="tabs-trigger" value={k}>
                            <Icon size={18} />
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
