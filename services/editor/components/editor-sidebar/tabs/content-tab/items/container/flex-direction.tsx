'use client';
import React from 'react';
//@LUCIDE ICONS
import { ArrowDownToLine, ArrowLeftToLine } from 'lucide-react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@CUSTOM HOOK
import { useContent } from '../../provider';

export default function FlexDirection() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleDirectionChange = (dir: string) => {
        handleStyleChange({
            target: {
                id: 'flexDirection',
                value: dir,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Direction</h5>
            <Tabs onValueChange={handleDirectionChange} value={style.flexDirection?.replace('-reverse', '') || 'row'}>
                <TabsList className="tabs-list w-fit" role="tablist">
                    <TabsTrigger className="tabs-trigger" value="row">
                        <ArrowLeftToLine size={18} />
                    </TabsTrigger>
                    <TabsTrigger className="tabs-trigger" value="column">
                        <ArrowDownToLine size={18} />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </section>
    );
}
