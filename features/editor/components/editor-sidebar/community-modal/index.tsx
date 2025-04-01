'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import Loading from '@/components/loading';
import PublicPresetCard from './public-preset-card';
//@SHADCNUI
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
//@CUSTOM HOOKS
import { usePublicPresetData } from '@/features/editor/hooks/usePublicPresetData';
//@TYPES
import { DeviceTypes, Preset } from '@/features/editor/types';

type Props = {
    device: DeviceTypes;
    presets: Preset[];
    updateCourseData: (id: string, data: Preset[]) => Promise<void>;
};

export default function CommunityModal({ device, presets, updateCourseData }: Props) {
    const { publicPresets, refetchPublicPresets, isLoading, isError } = usePublicPresetData();

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const handleLocalAction = () => {
        if (closeBtnRef.current) {
            closeBtnRef.current.click();
        }
    };

    const handleImportPreset = (preset: Preset) => {
        let counter = 1;
        let isExistSimilarName = presets.some((p) => p.name === preset.name);
        while (isExistSimilarName) {
            preset.name = `${preset.name} (${counter})`;
            isExistSimilarName = presets.some((p) => p.name === preset.name);
        }

        updateCourseData('presets', [...presets, preset]);
        handleLocalAction();
    };

    React.useEffect(() => {
        if (!publicPresets) {
            refetchPublicPresets();
        }
    }, [publicPresets, refetchPublicPresets]);

    if (isError) {
        throw new Error('Error fetching public presets');
    }

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Community</DialogTitle>
                <DialogDescription>Explore and share presets with other users.</DialogDescription>
            </DialogHeader>
            <div className="no-scrollbar flex max-h-[300px] flex-col gap-4 overflow-y-auto py-4">
                {isLoading ? (
                    <Loading screen={false} />
                ) : publicPresets && publicPresets.length > 0 ? (
                    publicPresets.map((p) => (
                        <PublicPresetCard
                            key={p.id}
                            device={device}
                            preset={p}
                            handleImportPreset={handleImportPreset}
                        />
                    ))
                ) : (
                    <small role="alert" className="text-muted-foreground">
                        No public presets found
                    </small>
                )}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button ref={closeBtnRef} type="button" variant="secondary" onClick={handleLocalAction}>
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
}
