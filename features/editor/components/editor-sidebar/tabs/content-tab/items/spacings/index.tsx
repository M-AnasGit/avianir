'use client';
import React from 'react';
//@SHADCNUI
import { TooltipProvider } from '@/components/ui/tooltip';
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import DirectionInputs from '../direction-inputs';

export default function Spacings() {
    return (
        <AccordionContent className="prop-accordion-content">
            <TooltipProvider>
                <DirectionInputs id="margin" />
                <DirectionInputs id="padding" />
            </TooltipProvider>
        </AccordionContent>
    );
}
