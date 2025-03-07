'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@CUSTOM COMPONENT
import { SelectWithSearch } from '@/components/ui/select-with-search';

type Props = {
    selected: string;
    label?: string;
    data: {
        label: string;
        value: string;
    }[];
    btnLabel: string;
    handleChangeSelected: (value: string) => void;
    action: () => void;
};

export default function SelectWithButton({ selected, label, data, btnLabel, handleChangeSelected, action }: Props) {
    return (
        <div className="prop-container">
            {label && <h5 className="prop-label">{label}</h5>}
            <div className="flex items-center gap-4">
                <SelectWithSearch data={data} value={selected} handleValueChange={handleChangeSelected} />
                <Button aria-label={btnLabel} onClick={action}>
                    {btnLabel}
                </Button>
            </div>
        </div>
    );
}
