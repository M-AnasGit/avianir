'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import InputWithSelect from './input-with-select-for-unit';
//@CUSTOM HOOKS
import { useContent } from './../provider';

type FontSizesUnits = 'px' | 'em' | 'rem' | '%';
const FONT_SIZE_UNITS: FontSizesUnits[] = ['px', 'em', 'rem', '%'];

export default function GapInput() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const [gapUnit, setGapUnit] = React.useState<FontSizesUnits>('px');
    const handleContainerGapUnitChange = React.useCallback(
        (unit: string) => {
            setGapUnit(unit as FontSizesUnits);

            if (!!style.gap && !isNaN(parseInt((style.gap as string) || '0'))) {
                handleStyleChange({
                    target: {
                        id: 'gap',
                        value: parseInt(style.gap as string) + unit,
                    },
                });
            }
        },
        [style, handleStyleChange],
    );

    const handleContainerGapChange = React.useCallback(
        (size: string) => {
            if (isNaN(parseInt(size))) {
                return;
            }

            handleStyleChange({
                target: {
                    id: 'gap',
                    value: size + gapUnit,
                },
            });
        },
        [style, gapUnit, handleStyleChange],
    );

    return (
        <section className="prop-container">
            <h5 className="prop-label">Gap</h5>
            <InputWithSelect
                placeholder="Gap"
                value={parseInt((style.gap as string) ?? '0')}
                unit={gapUnit}
                units={FONT_SIZE_UNITS}
                handleChange={(e) => handleContainerGapChange(e.target.value)}
                handleUnitChange={handleContainerGapUnitChange}
            />
        </section>
    );
}
