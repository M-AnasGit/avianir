'use client';
import React from 'react';
//@CUSTOM COMPONENT
import InputWithSelect from '../input-with-select-for-unit';
//@CUSTOM HOOK
import { useContent } from '../../provider';

type LineHeightUnits = 'px' | '%';
const LINE_HEIGHT_UNITS: LineHeightUnits[] = ['px', '%'];

export default function LineHeight() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const [lineHeightUnit, setLineHeightUnit] = React.useState<LineHeightUnits>(() => {
        return (style.lineHeight as string)?.includes('%') ? '%' : 'px';
    });
    const handleLineHeightUnitChange = React.useCallback(
        (unit: string) => {
            setLineHeightUnit(unit as LineHeightUnits);

            const lineHeight = style.lineHeight as string;

            if (!!lineHeight) {
                const value = parseInt(lineHeight);
                handleStyleChange({
                    target: {
                        id: 'lineHeight',
                        value: value + unit,
                    },
                });
            }
        },
        [style, handleStyleChange],
    );

    const handleLineHeightChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(e.target.value);

            if (isNaN(value)) {
                value = 0;
            }

            handleStyleChange({
                target: {
                    id: 'lineHeight',
                    value: value + lineHeightUnit,
                },
            });
        },
        [lineHeightUnit, handleStyleChange],
    );

    return (
        <section className="prop-container">
            <h5 className="prop-label">Line Height</h5>
            <InputWithSelect
                placeholder="Line Height"
                value={parseInt((style.lineHeight as string) ?? '100%')}
                unit={lineHeightUnit}
                units={LINE_HEIGHT_UNITS}
                handleChange={handleLineHeightChange}
                handleUnitChange={handleLineHeightUnitChange}
            />
        </section>
    );
}
