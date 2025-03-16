'use client';
import React from 'react';
//@CUSTOM COMPONENT
import { ColorPicker } from '@/components/ui/colorpicker';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Checkbox } from '@/components/ui/checkbox';
//@CUSTOM HOOK
import { useContent } from '../provider';
import { useEditor } from '@/features/editor/provider';
//@TYPES
import { ElementChangeEvent } from '../types';
type Props = {
    style: React.CSSProperties;
    colorKey: keyof React.CSSProperties;
    handleStyleChange: (e: ElementChangeEvent) => void;
};

export default function ColorInput({ colorKey = 'color', style, handleStyleChange }: Props) {
    const { palette } = useEditor();

    const labeledPalette = React.useMemo(
        () =>
            Object.entries(palette)
                .map(([, v]) => Object.entries(v))
                .map((p, i) =>
                    p.map(([k]) => ({
                        label: k,
                        value: `var(--${i === 0 ? 'default' : 'custom'}-${k.replace(/\s+/g, '-')})`,
                    })),
                ),
        [palette],
    );

    const [color, setColor] = React.useState<string>((style[colorKey] as string) || 'transparent');
    React.useEffect(() => {
        setColor((style[colorKey] as string) || '');
    }, [style]);
    const prevColor = React.useRef<string | null>(null);
    React.useEffect(() => {
        if (color !== prevColor.current && color !== 'transparent') {
            prevColor.current = color;
        }
    }, [color]);

    const handleColorChange = (color: string) => {
        setColor(color);
        handleStyleChange({
            target: {
                id: colorKey,
                value: color,
            },
        });
    };
    const handleTransparent = (checked: boolean) => {
        if (!checked) {
            console.log(prevColor.current);
            handleStyleChange({
                target: {
                    id: colorKey,
                    value: prevColor.current || 'custom',
                },
            });
        } else {
            handleStyleChange({
                target: {
                    id: colorKey,
                    value: 'transparent',
                },
            });
        }
    };

    return (
        <>
            {color !== 'transparent' && color && (
                <div className="flex items-center gap-4">
                    <ColorPicker id={colorKey} value={color} onChange={handleColorChange} className="w-full" />
                    <SelectWithSearch
                        data={labeledPalette.flat()}
                        value={color}
                        handleValueChange={handleColorChange}
                    />
                </div>
            )}
            <div className="flex items-center gap-2 px-[2px]">
                <Checkbox checked={color === 'transparent' || !color} onCheckedChange={handleTransparent} />
                <small className="prop-small">Transparent</small>
            </div>
        </>
    );
}
