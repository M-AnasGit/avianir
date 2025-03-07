'use client';
import React from 'react';
//@TYPES
import { ComponentTabItem } from '../../types';
import { useEditor } from '@/features/editor/provider';
import { COMPONENTS_TYPES_ICONS } from '../../constants';
type Props = {
    items: ComponentTabItem[];
};

export default function ComponentItems({ items }: Props) {
    const { handleDragComponent } = useEditor();

    const handleDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData('type', type);
        handleDragComponent(e.currentTarget as HTMLElement);

        addEventListener(
            'dragend',
            () => {
                handleDragComponent(null);
            },
            {
                once: true,
            },
        );
    };

    return items.map((item, i) => {
        const Icon = COMPONENTS_TYPES_ICONS[item.type];
        return (
            <div
                key={i}
                className="mb-2 flex w-[80px] cursor-pointer flex-col items-center gap-2 rounded-md bg-accent py-4 text-accent-foreground transition-all hover:bg-muted hover:text-muted-foreground"
                draggable
                onDragStart={(e) => handleDragStart(e, item.type)}
                data-testid={`component-item-${item.type}`}
            >
                <Icon size={24} />
                <p className="text-center text-xs">{item.name}</p>
            </div>
        );
    });
}
