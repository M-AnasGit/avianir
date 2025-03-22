'use client';
import React from 'react';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
//@CONSTANTS
import { COMPONENTS_TYPES_ICONS } from '../../../constants';
//@TYPES
import { ElementTypes, Preset } from '@/features/editor/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Trash } from 'lucide-react';
import { useModal } from '@/components/providers/modal-provider';
import GenericModal from '@/components/generic-modal';

type Props = {
    items: Preset[];
};

export default function PresetItems({ items }: Props) {
    const { presets, handleDragComponent, updateCourseData } = useEditor();
    const { handleSetModal } = useModal();

    const handleDragStart = (e: React.DragEvent, type: string, presetName: string) => {
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('preset', presetName);
        handleDragComponent(e.currentTarget as HTMLElement, type as ElementTypes);

        addEventListener(
            'dragend',
            () => {
                handleDragComponent(null, null);
            },
            {
                once: true,
            },
        );
    };

    const handleDeletePreset = (name: string) => {
        handleSetModal(
            <GenericModal
                title="Delete Preset"
                description="Are you sure you want to delete this preset?"
                btn_text={'Delete'}
                btn_action={() =>
                    updateCourseData(
                        'presets',
                        presets.filter((p) => p.name !== name),
                    )
                }
            />,
        );
    };

    return items.map((item, i) => {
        const Icon = COMPONENTS_TYPES_ICONS[item.type];
        return (
            <ContextMenu key={i}>
                <ContextMenuTrigger>
                    <Tooltip>
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
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem
                        inset
                        className="flex cursor-pointer items-center justify-between gap-2"
                        onClick={() => handleDeletePreset(item.name)}
                    >
                        Delete
                        <Trash size={16} />
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        );
    });
}
