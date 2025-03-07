'use client';
import React from 'react';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
//@CONSTANTS
import { COMPONENTS_TYPES_ICONS } from '../../../constants';
//@TYPES
import { Preset } from '@/features/editor/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
    items: Preset[];
};

export default function PresetItems({ items }: Props) {
    const { handleDragComponent } = useEditor();

    const handleDragStart = (e: React.DragEvent, type: string, presetName: string) => {
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('preset', presetName);
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
            <Tooltip key={i}>
                <TooltipTrigger asChild>
                    <div
                        className="mb-2 flex w-[80px] cursor-pointer flex-col items-center gap-2 rounded-md bg-accent py-4 text-accent-foreground transition-all hover:bg-muted hover:text-muted-foreground"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.type, item.name)}
                    >
                        <Icon size={24} />
                        <p className="max-w-[60px] truncate text-center text-xs">{item.name}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
        );
    });
}
