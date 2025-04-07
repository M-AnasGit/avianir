'use client';
import React from 'react';
//@CUSTOM COMPONENT
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {};

export default function InputWithButton({}: Props) {
    const [value, setValue] = React.useState<string>('');

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    const handleLocalContentChange = () => {
        console.log(value);
    };

    return (
        <div className="flex items-center gap-4">
            <Input
                value={value}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="Prompt"
                className="w-full"
            />
            <Button onClick={handleLocalContentChange}>Generate</Button>
        </div>
    );
}
