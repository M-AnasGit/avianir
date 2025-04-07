'use client';
import PresetItems from './preset-items';
//@SHADCNUI
//@CUSTOM HOOKS
import { useEditor } from '@/services/editor/provider';

type Props = {};

export default function PresetsTab({}: Props) {
    const { presets } = useEditor();

    if (!presets.length)
        return (
            <p className="prop-small" role="alert">
                You have no saved presets
            </p>
        );

    return <PresetItems items={presets} />;
}
