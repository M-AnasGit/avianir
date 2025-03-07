'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import FontFamily from './font-family';
import FontSize from './font-size';
import TextAlignment from './text-alignement';
import LineHeight from './line-height';
import LetterSpacing from './letter-spacing';

export default function Typography() {
    return (
        <AccordionContent className="prop-accordion-content">
            {/* Font family */}
            <FontFamily />
            {/* Size */}
            <FontSize />
            {/* Text alignement */}
            <TextAlignment />
            {/* Line height */}
            <LineHeight />
            {/* Letter spacing */}
            <LetterSpacing />
        </AccordionContent>
    );
}
