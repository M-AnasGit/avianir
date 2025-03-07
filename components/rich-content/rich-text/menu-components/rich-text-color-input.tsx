'use client';
import React from 'react';
//@CUSTOM COMPONENT
import { ColorPicker } from '@/components/ui/colorpicker';
import { SelectWithSearch } from '@/components/ui/select-with-search';
//@CUSTOM HOOKS
import { useTheme } from 'next-themes';
//@Types
import { Palette } from '@/features/editor/types';
type Props = {
    currentColor: string;
    palette: Palette;
    handleColorChange: (color: string) => void;
};

export default function RichTextColorInput({ currentColor, palette, handleColorChange }: Props) {
    const { theme } = useTheme();
    const labeledPalette = React.useMemo(
        () =>
            Object.entries(palette)
                .map(([, v]) => Object.entries(v))
                .map((p, i) =>
                    p.map(([k, v]) => ({
                        label: k,
                        value: `var(--${i === 0 ? 'default' : 'custom'}-${k.replace(/\s+/g, '-')})`,
                    })),
                ),
        [palette, theme],
    );

    return (
        <SelectWithSearch
            data={[...labeledPalette.flat(), { label: 'Default', value: 'default' }]}
            value={currentColor}
            handleValueChange={handleColorChange}
        />
    );
}
