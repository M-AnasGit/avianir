'use client';
import React from 'react';
//@SHADCNUI
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    placeholder: string;
    value: string | number;
    unit: string;
    units: string[];
    handleUnitChange: (e: any) => void;
    handleChange: (e: any) => void;
    disabled?: boolean;
};

export default function InputWithSelect({
    placeholder,
    value,
    unit,
    units,
    handleChange,
    handleUnitChange,
    disabled,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <Input
                aria-label={placeholder}
                placeholder={placeholder}
                id={placeholder.toLocaleLowerCase()}
                onChange={handleChange}
                value={value}
                disabled={disabled}
            />
            <Select aria-label="unit" value={unit} onValueChange={handleUnitChange} disabled={disabled}>
                <SelectTrigger className="w-fit px-4">
                    <SelectValue placeholder="unit" />
                </SelectTrigger>
                <SelectContent>
                    {units.map((unit, i) => (
                        <SelectItem key={i} value={unit}>
                            {unit}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
