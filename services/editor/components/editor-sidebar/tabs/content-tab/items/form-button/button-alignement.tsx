'use client';
import React from 'react';
//@SHADCNUI
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@LUCIDE ICONS
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
//@TYPES
import { ElementChangeEvent } from '../../types';
type Props = {
    style: React.CSSProperties;
    handleStyleChange: (e: ElementChangeEvent) => void;
};

const TEXT_ALIGMENTS: Record<string, React.ReactNode> = {
    start: <AlignLeft size={20} />,
    center: <AlignCenter size={20} />,
    end: <AlignRight size={20} />,
};

export default function ButtonAlignement({ style, handleStyleChange }: Props) {
    const handleChangeButtonAlignement = (value: string) => {
        handleStyleChange({
            target: {
                id: 'justifyContent',
                value,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Button Alignement</h5>
            <Tabs onValueChange={handleChangeButtonAlignement} value={style.justifyContent || 'start'}>
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
