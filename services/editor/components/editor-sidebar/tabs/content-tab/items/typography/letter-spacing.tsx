'use client';
import React from 'react';
//@CUSTOM COMPONENT
import InputWithSelect from '../input-with-select-for-unit';
//@CUSTOM HOOK
import { useContent } from '../../provider';

type LetterSpacingUnits = 'px' | 'em' | 'rem' | '%';
const LETTER_SPACING_UNITS: LetterSpacingUnits[] = ['px', 'em', 'rem', '%'];

export default function LetterSpacing() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const [letterSpacingUnit, setLetterSpacingUnit] = React.useState<LetterSpacingUnits>('px');
    const handleLetterSpacingUnitChange = React.useCallback(
        (unit: string) => {
            setLetterSpacingUnit(unit as LetterSpacingUnits);

            const letterSpacing = style.letterSpacing as string;

            if (!!letterSpacing) {
                const value = parseInt(letterSpacing);
                handleStyleChange({
                    target: {
                        id: 'letterSpacing',
                        value: value + unit,
                    },
                });
            }
        },
        [style, handleStyleChange],
    );
    const handleLetterSpacingChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(e.target.value);

            if (isNaN(parseInt(e.target.value))) {
                value = 0;
            }

            handleStyleChange({
                target: {
                    id: 'letterSpacing',
                    value: value + letterSpacingUnit,
                },
            });
        },
        [letterSpacingUnit, handleStyleChange],
    );

    return (
        <section className="prop-container">
            <h5 className="prop-label">Letter Spacing</h5>
            <InputWithSelect
                placeholder={'Letter Spacing'}
                value={parseInt((style.letterSpacing as string) ?? '0')}
                unit={letterSpacingUnit}
                units={LETTER_SPACING_UNITS}
                handleChange={handleLetterSpacingChange}
                handleUnitChange={handleLetterSpacingUnitChange}
            />
        </section>
    );
}
