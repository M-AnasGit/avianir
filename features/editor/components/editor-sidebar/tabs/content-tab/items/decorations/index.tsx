'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import ColorInput from '../color-input';
import BackgroundImageInput from './background-image-input';
import OpacitySlider from './opacity-slider';

export default function Decorations() {
    return (
        <AccordionContent className="prop-accordion-content">
            {/* Background Image */}
            <BackgroundImageInput />
            {/* Background Color */}
            <section className="prop-container">
                <h5 className="prop-label">Background Color</h5>
                <ColorInput colorKey="backgroundColor" />
            </section>
            {/* Opacity */}
            <OpacitySlider />
        </AccordionContent>
    );
}
