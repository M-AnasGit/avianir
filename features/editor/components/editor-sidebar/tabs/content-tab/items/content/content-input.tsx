'use client';
import React from 'react';
//@SHADCNUI
import { Input } from '@/components/ui/input';
//@CUSTOM HOOKS
import { useContent } from '../../provider';

type Props = {
    id: 'text' | 'href' | 'src' | 'alt';
    label: string;
    placeholder: string;
};

export default function ContentInput({ id, label, placeholder }: Props) {
    const { currentContent: content, handleContentChange } = useContent();

    if (Array.isArray(content)) {
        return null;
    }

    const [localContent, setLocalContent] = React.useState<string>(content[id] || '');
    const handleLocalContentChange = (v: string) => {
        setLocalContent(v);
        if (id !== 'src') {
            handleContentChange({
                target: {
                    id: id,
                    value: v,
                },
            });
        }
    };

    const handleBlur = () => {
        if (id === 'src') {
            handleContentChange({
                target: {
                    id: id,
                    value: localContent,
                },
            });
        }
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label capitalize">{label}</h5>
            <Input
                aria-label={id}
                id={id}
                value={localContent}
                onChange={(e) => handleLocalContentChange(e.target.value)}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full"
            />
        </section>
    );
}
