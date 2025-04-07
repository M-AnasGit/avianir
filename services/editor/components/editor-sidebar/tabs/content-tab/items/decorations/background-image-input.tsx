'use client';
import React from 'react';
//@CUSTOM COMPONENT
import { Input } from '@/components/ui/input';
//@CUSTOM HOOKS
import { useContent } from '../../provider';

export default function BackgroundImageInput() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const [backgroundImage, setBackgroundImage] = React.useState<string>(style.backgroundImage || '');
    const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundImage(e.target.value);
        handleStyleChange({
            target: {
                id: 'backgroundImage',
                value: e.target.value,
            },
        });
    };

    return (
        <section className="prop-container">
            <h5 className="prop-label">Background Image</h5>
            <Input
                aria-label="Background Image"
                type="text"
                name="backgroundImage"
                placeholder="url()"
                value={backgroundImage}
                onChange={handleBackgroundImageChange}
            />
        </section>
    );
}
