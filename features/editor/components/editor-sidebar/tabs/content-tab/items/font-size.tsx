'use client';
import React from 'react';
//@CUSTOM COMPONENT
import InputWithSelect from './input-with-select-for-unit';
//@TYPES
import { ElementChangeEvent } from '../types';
type FontSizesUnits = 'px' | 'em' | 'rem' | '%';
const FONT_SIZE_UNITS: FontSizesUnits[] = ['px', 'em', 'rem', '%'];
type Props = {
    style: React.CSSProperties;
    handleStyleChange: (e: ElementChangeEvent) => void;
};

export default function FontSize({ style, handleStyleChange }: Props) {
    const [fontSizeUnit, setFontSizeUnit] = React.useState<FontSizesUnits>('px');
    const handleFontSizeUnitChange = React.useCallback(
        (unit: string) => {
            setFontSizeUnit(unit as FontSizesUnits);

            const currentFontSize = parseInt(style.fontSize as string);
            if (!!style.fontSize && !isNaN(currentFontSize)) {
                handleStyleChange({
                    target: {
                        id: 'fontSize',
                        value: currentFontSize + unit,
                    },
                });
            }
        },
        [style, handleStyleChange],
    );

    const handleFontSizeChange = React.useCallback(
        (size: string) => {
            if (isNaN(parseInt(size))) {
                return;
            }

            handleStyleChange({
                target: {
                    id: 'fontSize',
                    value: size + fontSizeUnit,
                },
            });
        },
        [style, fontSizeUnit, handleStyleChange],
    );

    return (
        <section className="prop-container">
            <h5 className="prop-label">Font Size</h5>
            <InputWithSelect
                placeholder="Size"
                value={parseInt((style.fontSize as string) ?? '1')}
                unit={fontSizeUnit}
                units={FONT_SIZE_UNITS}
                handleChange={(e) => handleFontSizeChange(e.target.value)}
                handleUnitChange={handleFontSizeUnitChange}
            />
        </section>
    );
}
