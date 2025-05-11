'use client';
import React from 'react';
import PreviewPreset from '../../preview-preset';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
//@CONSTANTS
import { COMPONENTS_TYPES_ICONS } from '@/services/editor/constants';
//@TYPES
import { UsePublicPresetDataReturnType } from '@/services/editor/hooks/usePublicPresetData';
import { DeviceTypes, ElementTypes, Preset } from '@/services/editor/types';

type Props = {
    device: DeviceTypes;
    preset: NonNullable<UsePublicPresetDataReturnType['publicPresets']>[number];
    handleImportPreset: (preset: Preset) => void;
};

export default function PublicPresetCard({ device, preset, handleImportPreset }: Props) {
    const Icon = React.useMemo(() => {
        return COMPONENTS_TYPES_ICONS[preset?.type ?? 'text'];
    }, [preset.type]);
    const newPreset: Preset = React.useMemo(() => {
        let newPreset: Preset = {
            name: preset.name ?? 'Untitled',
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

    const [isPreview, setIsPreview] = React.useState<boolean>(false);
    const handlePreview = React.useCallback(() => {
        setIsPreview((prev) => !prev);
    }, []);

    const handleLocalImportPreset = React.useCallback(() => {
        handleImportPreset(newPreset);
    }, [handleImportPreset, newPreset]);

    return (
        <Card className="flex">
            <div className="flex w-full flex-col">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger className="w-fit">
                                <div className="flex items-center justify-between gap-2 rounded-md bg-muted p-2">
                                    <Icon size={28} className="text-muted-foreground" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="capitalize">{preset.type}</TooltipContent>
                        </Tooltip>
                        <div className="flex flex-col">
                            <CardTitle className="m-0! p-0 text-lg">{preset.name}</CardTitle>
                            <CardDescription className="m-0! p-0 text-xs text-muted-foreground">
                                Made by {preset.user_name ?? 'No description'}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" type="button" onClick={handlePreview}>
                            {isPreview ? 'Hide' : 'Preview'}
                        </Button>
                        <Button type="button" onClick={handleLocalImportPreset}>
                            Import
                        </Button>
                    </div>
                </CardHeader>
                {isPreview && (
                    <CardContent className="mx-6 mb-6 rounded-lg border-2 p-8">
                        <PreviewPreset preset={newPreset} />
                    </CardContent>
                )}
            </div>
        </Card>
    );
}
