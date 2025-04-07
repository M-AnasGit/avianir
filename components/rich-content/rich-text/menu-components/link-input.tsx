'use client';
import { Input } from '@/components/ui/input';
import React from 'react';

type Props = {
    link: string;
    action: (newLink: string) => void;
};

export default function LinkInput({ link, action }: Props) {
    const [currentLink, setCurrentLink] = React.useState<string>(link);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLink(e.target.value);
    };
    const handleBlur = () => {
        action(currentLink);
    };
    return <Input placeholder="Link to..." value={currentLink} onChange={handleChange} onBlur={handleBlur} />;
}
