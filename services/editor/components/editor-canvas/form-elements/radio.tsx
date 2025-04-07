'use client';
import React from 'react';
import RichContent from '@/components/rich-content';
//@SHADCNUI
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
//@TYPES
import { RadioDetails } from '@/services/editor/types';
type Props = {
    id: string;
    radioDetails: RadioDetails;
    style: React.CSSProperties;
};

export default function FormRadio({ id, radioDetails, style }: Props) {
    const defaultValue = React.useMemo(() => {
        return radioDetails.options.find((option) => option.is_default)?.value.value;
    }, [radioDetails]);

    return (
        <fieldset id={id} style={style}>
            <span role="listbox">
                <RichContent content={radioDetails.label.value} style={radioDetails.label.style} />
            </span>
            <RadioGroup defaultValue={defaultValue}>
                {radioDetails.options.map((option, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                        <RadioGroupItem value={option.value.value} id={`${id}-r-${i}`} />
                        <label htmlFor={`${id}-r-${i}`} style={option.value.style}>
                            {option.value.value}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </fieldset>
    );
}
