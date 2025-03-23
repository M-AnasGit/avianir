'use client';
import React from 'react';
import RichContent from '@/components/rich-content';
//@SHADCNUI
import { Checkbox } from '@/components/ui/checkbox';
//@TYPES
import { RadioDetails } from '@/features/editor/types';
type Props = {
    id: string;
    radioDetails: RadioDetails;
    style: React.CSSProperties;
};

export default function FormCheckbox({ id, radioDetails, style }: Props) {
    const defaultValue = React.useMemo(() => {
        return radioDetails.options.filter((option) => option.is_default).map((o, i) => i);
    }, [radioDetails]);

    return (
        <fieldset id={id} style={style}>
            <span role="listbox">
                <RichContent content={radioDetails.label.value} style={radioDetails.label.style} />
            </span>
            <div className="space-y-2">
                {radioDetails.options.map((option, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                        <Checkbox defaultChecked={defaultValue.includes(i)} id={`${id}-ch-${i}`} />
                        <label htmlFor={`${id}-ch-${i}`} style={option.value.style}>
                            {option.value.value}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}
