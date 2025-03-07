'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import FlexDirection from './flex-direction';
import JustifyContent from './justify-content';
import AlignItems from './align-items';
import GapInput from './gap-input';

export default function Container() {
    return (
        <AccordionContent className="prop-accordion-content">
            {/* Direction */}
            <FlexDirection />
            {/* Justify Content */}
            <JustifyContent />
            {/* Align Items */}
            <AlignItems />
            {/* Gap */}
            <GapInput />
        </AccordionContent>
    );
}
