'use client';
import React from 'react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@LUCIDE ICONS
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
//@CUSTOM HOOK
import { useContent } from '../../provider';

const TEXT_ALIGMENTS: Record<string, React.ReactNode> = {
    left: <AlignLeft size={20} />,
    right: <AlignRight size={20} />,
    center: <AlignCenter size={20} />,
    justify: <AlignJustify size={20} />,
};

export default function TextAlignment() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleChangeTextAlign = (align: string) => {
        handleStyleChange({
            target: {
                id: 'textAlign',
                value: align,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Alignement</h5>
            <Tabs onValueChange={handleChangeTextAlign} value={style.textAlign || 'left'}>
                <TabsList>
                    {Object.entries(TEXT_ALIGMENTS).map(([key, value], i) => (
                        <TabsTrigger key={i} value={key}>
                            {value}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </section>
    );
}
