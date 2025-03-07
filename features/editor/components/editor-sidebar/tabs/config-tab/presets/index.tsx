'use client';
import PresetItems from './preset-items';
//@SHADCNUI
import { TooltipProvider } from '@/components/ui/tooltip';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';

type Props = {};

export default function PresetsTab({}: Props) {
    const { presets } = useEditor();

    if (!presets.length)
        return (
            <p className="prop-small" role="alert">
                You have no saved presets
            </p>
        );

    return (
        <TooltipProvider>
            <PresetItems items={presets} />
        </TooltipProvider>
    );
}
