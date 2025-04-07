'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import DimensionInput from './dimension-input';

export default function Dimensions() {
    return (
        <AccordionContent className="prop-accordion-content">
            <DimensionInput id={'height'} />
            <DimensionInput id={'width'} />
        </AccordionContent>
    );
}
