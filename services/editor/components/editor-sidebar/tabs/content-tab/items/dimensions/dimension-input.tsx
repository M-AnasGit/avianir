'use client';
import React from 'react';
//@CUSTOM COMPONENT
import { Checkbox } from '@/components/ui/checkbox';
//@CUSTOM COMPONENT
import InputWithSelect from '../input-with-select-for-unit';
//@CUSTOM PROVIDER
import { useContent } from '../../provider';

const DIMENSION_UNITS = ['px', 'em', 'rem', '%'];

type Props = {
    id: 'height' | 'width';
};

export default function DimensionInput({ id }: Props) {
    const { currentStyle: style, handleStyleChange } = useContent();

    const [unit, setUnit] = React.useState<string>(() => {
        if (!isNaN(parseInt(style[id] as string))) {
            const value = style[id] as string;
            const match = value.match(/^([\d.]+)([a-z%]+)$/i);
            const [, , unit] = match || [];
            return unit;
        }
        return '%';
    });
    const handleUnitChange = (unit: string) => {
        setUnit(unit);

        if (val === 'fit-content') {
            return;
        }

        handleStyleChange({
            target: {
                id,
                value: val + unit,
            },
        });
    };

    const [val, setVal] = React.useState<number | 'fit-content'>(
        isNaN(parseInt(style[id] as string)) ? 'fit-content' : parseInt(style[id] as string),
    );
    const prevValue = React.useRef<number>(val === 'fit-content' ? 100 : val);

    React.useEffect(() => {
        setVal(isNaN(parseInt(style[id] as string)) ? 'fit-content' : parseInt(style[id] as string));

        prevValue.current = (style[id] as string) === 'fit-content' ? 100 : parseInt(style[id] as string);
    }, [style]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        let tempVal = parseInt(v);
        if (isNaN(tempVal)) {
            return;
        }

        setVal(tempVal);
        handleStyleChange({
            target: {
                id,
                value: tempVal + unit,
            },
        });
    };

    // Handle global checkbox
    const handleGlobalCheckbox = (checked: boolean) => {
        let value = style[id] as string;

        if (checked) {
            prevValue.current = val === 'fit-content' ? 100 : val;
            value = 'fit-content';
            setVal('fit-content');
        } else {
            value = prevValue.current + unit;
            setVal(prevValue.current);
        }

        handleStyleChange({
            target: {
                id,
                value,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label capitalize">{id}</h5>
            <InputWithSelect
                placeholder={id.charAt(0).toUpperCase() + id.slice(1)}
                value={val === 'fit-content' ? (isNaN(prevValue.current) ? 0 : prevValue.current) : val}
                unit={unit}
                units={DIMENSION_UNITS}
                handleUnitChange={handleUnitChange}
                handleChange={handleChange}
                disabled={val === 'fit-content'}
            />
            <div className="flex items-center gap-2 px-[2px]">
                <Checkbox checked={val === 'fit-content'} onCheckedChange={handleGlobalCheckbox} />
                <small className="prop-small">Fit to content's dimensions</small>
            </div>
        </section>
    );
}
