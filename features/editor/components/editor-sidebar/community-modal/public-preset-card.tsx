'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
//@CONSTANS
import { COMPONENTS_TYPES_ICONS } from '../constants';
import { DUMMY_CONTENT } from '@/features/editor/constants';
//@TYPES
import { UsePublicPresetDataReturnType } from '@/features/editor/hooks/usePublicPresetData';
import { DeviceTypes, EditorElement, ElementTypes, Preset } from '@/features/editor/types';

type Props = {
    device: DeviceTypes;
    preset: NonNullable<UsePublicPresetDataReturnType['publicPresets']>[number];
    handleImportPreset: (preset: Preset) => void;
};

export default function PublicPresetCard({ device, preset, handleImportPreset }: Props) {
    const Icon = React.useMemo(() => {
        return COMPONENTS_TYPES_ICONS[preset.type];
    }, [preset.type]);
    const newPreset: Preset = React.useMemo(() => {
        let newPreset: Preset = {
            name: preset.name,
            stylePerDevice:
                typeof preset.styleperdevice === 'string'
                    ? (JSON.parse(preset.styleperdevice) as Record<DeviceTypes, React.CSSProperties>)
                    : {
                          desktop: {},
                          mobile: {},
                          tablet: {},
                      },
            globalStyle: !!preset.globalstyle,
            type: preset.type as ElementTypes,
            content: typeof preset.content === 'string' ? JSON.parse(preset.content) : preset.content,
        };

        if (preset.formcontent) {
            newPreset = {
                ...newPreset,
                formContent:
                    typeof preset.formcontent === 'string' ? JSON.parse(preset.formcontent) : preset.formcontent,
            };
        }

        return newPreset;
    }, [preset]);
    // const newElement: EditorElement = React.useMemo(() => {
    //     let newContent: EditorElement['content'] | undefined = newPreset.content;
    //     if (!newContent) {
    //         newContent = {
    //             ...(newPreset.type === 'text' && { text: DUMMY_CONTENT['text'] }),
    //             ...(newPreset.type === 'table' && { text: DUMMY_CONTENT['table'] }),
    //         };
    //     }
    //     return {
    //         ...newPreset,
    //         id: preset.id,
    //         content: newContent,
    //     };
    // }, [newPreset]);

    const handleLocalImportPreset = React.useCallback(() => {
        handleImportPreset(newPreset);
    }, [handleImportPreset, newPreset]);

    return (
        <Card className="flex">
            {/* <CardContent className="m-2 flex h-[150px] w-[300px] items-center justify-center rounded-lg border border-border">
                <PreviewElement ele={newElement} device={device} />
            </CardContent> */}
            <div className="w-full">
                <CardHeader>
                    <CardTitle>{preset.name}</CardTitle>
                    <CardDescription>
                        {preset.created_at && new Date(preset.created_at).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center justify-between gap-2 rounded-md bg-muted p-2">
                                <Icon size={24} className="text-muted-foreground" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="capitalize">{preset.type}</TooltipContent>
                    </Tooltip>
                    <Button type="button" onClick={handleLocalImportPreset}>
                        Import
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
