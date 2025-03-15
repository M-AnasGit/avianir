'use client';
import React from 'react';
//@SHADCNUI
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
//@CONSTANTS
const FONT_FAMILY_MAP: Record<string, string> = {
    arial: 'Arial, sans-serif',
    inter: 'Inter, sans-serif',
    helvetica: 'Helvetica, sans-serif',
    'times New Roman': 'Times New Roman, serif',
    'courier New': 'Courier New, monospace',
    verdana: 'Verdana, sans-serif',
    georgia: 'Georgia, serif',
    palatino: 'Palatino, serif',
    garamond: 'Garamond, serif',
    bookman: 'Bookman, serif',
    'comic Sans MS': 'Comic Sans MS, cursive',
    'trebuchet MS': 'Trebuchet MS, sans-serif',
    'arial Black': 'Arial Black, sans-serif',
    impact: 'Impact, sans-serif',
};
//@TYPES
import { ElementChangeEvent } from '../types';
type Props = {
    style: React.CSSProperties;
    handleStyleChange: (e: ElementChangeEvent) => void;
};

export default function FontFamily({ style, handleStyleChange }: Props) {
    const handleFontFamilyChange = (font: string) => {
        handleStyleChange({
            target: {
                id: 'fontFamily',
                value: font,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Font Family</h5>
            <Select onValueChange={handleFontFamilyChange} defaultValue={style.fontFamily || FONT_FAMILY_MAP['inter']}>
                <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Font family" className="placeholder-muted" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(FONT_FAMILY_MAP).map(([font, value], i) => (
                        <SelectItem key={i} value={value} className="capitalize">
                            {font}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </section>
    );
}
