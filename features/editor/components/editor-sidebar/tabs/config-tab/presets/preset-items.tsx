'use client';
import React from 'react';
import GenericModal from '@/components/generic-modal';
import RenameModal from '@/features/editor/components/rename-modal';
//@SHADCNUI
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
//@ICONS
import { Trash } from 'lucide-react';
//@CONSTANTS
import { COMPONENTS_TYPES_ICONS } from '../../../constants';
//@TYPES
import { ElementTypes, Preset } from '@/features/editor/types';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useModal } from '@/components/providers/modal-provider';
import { usePublicPresetData } from '@/features/editor/hooks/usePublicPresetData';
import { useUser } from '@/features/user/provider';

type Props = {
    items: Preset[];
};

export default function PresetItems({ items }: Props) {
    const { presets, handleDragComponent, updateCourseData } = useEditor();
    const { handleSetModal } = useModal();
    const { user } = useUser();
    const { createPublicPresetMutation } = usePublicPresetData();

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

    const handlePublishPreset = (name: string) => {
        handleSetModal(
            <GenericModal
                title="Publish Preset"
                description="Are you sure you want to publish this preset?"
                btn_text={'Publish'}
                btn_action={() => {
                    createPublicPresetMutation.mutateAsync({
                        id: user?.id,
                        data: items.find((p) => p.name === name),
                    });
                }}
            />,
        );
    };

    const handleLocalRenamePreset = (name: string, newName: string) => {
        updateCourseData(
            'presets',
            presets.map((p) => {
                if (p.name === name) {
                    return { ...p, name: newName };
                }
                return p;
            }),
        );
    };

    const handleRenamePreset = (name: string) => {
        handleSetModal(
            <RenameModal handleRenameElement={(newName: string) => handleLocalRenamePreset(name, newName)} />,
        );
    };

    return (
        <div className="grid grid-cols-3 gap-y-4">
            {items.map((item, i) => {
                const Icon = COMPONENTS_TYPES_ICONS[item.type];
                return (
                    <ContextMenu key={i}>
                        <ContextMenuTrigger>
                            <Tooltip>
                                <TooltipTrigger>
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
                                onClick={() => handleRenamePreset(item.name)}
                            >
                                Rename
                            </ContextMenuItem>
                            <ContextMenuItem
                                inset
                                className="flex cursor-pointer items-center justify-between gap-2"
                                onClick={() => handlePublishPreset(item.name)}
                            >
                                Publish
                            </ContextMenuItem>
                            <ContextMenuSeparator />
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
            })}
        </div>
    );
}
