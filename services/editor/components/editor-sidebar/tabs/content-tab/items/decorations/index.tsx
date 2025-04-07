'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import ColorInput from '../color-input';
import BackgroundImageInput from './background-image-input';
import OpacitySlider from './opacity-slider';
//@CUSTOM HOOKS
import { useContent } from '../../provider';

export default function Decorations() {
    const { currentStyle, handleStyleChange } = useContent();

    return (
        <AccordionContent className="prop-accordion-content">
            {/* Background Image */}
            <BackgroundImageInput />
            {/* Background Color */}
            <section className="prop-container">
                <h5 className="prop-label">Background Color</h5>
                <ColorInput colorKey="backgroundColor" style={currentStyle} handleStyleChange={handleStyleChange} />
            </section>
            {/* Opacity */}
            <OpacitySlider />
        </AccordionContent>
    );
}
