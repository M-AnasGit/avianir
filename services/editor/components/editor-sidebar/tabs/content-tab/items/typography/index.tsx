'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import FontFamily from '../font-family';
import FontSize from '../font-size';
import TextAlignment from './text-alignement';
import LineHeight from '../line-height';
import LetterSpacing from './letter-spacing';
//@CUSTOM HOOK
import { useContent } from '../../provider';

export default function Typography() {
    const { currentStyle: style, handleStyleChange } = useContent();

    return (
        <AccordionContent className="prop-accordion-content">
            {/* Font family */}
            <FontFamily style={style} handleStyleChange={handleStyleChange} />
            {/* Size */}
            <FontSize style={style} handleStyleChange={handleStyleChange} />
            {/* Text alignement */}
            <TextAlignment />
            {/* Line height */}
            <LineHeight style={style} handleStyleChange={handleStyleChange} />
            {/* Letter spacing */}
            <LetterSpacing />
        </AccordionContent>
    );
}
