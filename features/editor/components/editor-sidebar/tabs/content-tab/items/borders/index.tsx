'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { TooltipProvider } from '@/components/ui/tooltip';
//@CUSTOM COMPONENTS
import DirectionInputs from '../direction-inputs';
import ColorInput from '../color-input';
import BorderStyle from './border-style';

export default function Borders() {
    return (
        <TooltipProvider>
            <AccordionContent className="flex flex-col gap-4 px-[1px]">
                {/* Border width */}
                <DirectionInputs id="border" label="Border width" />
                {/* Border radius */}
                <DirectionInputs id="borderRadius" label="Radius" />
                {/* Border color */}
                <section className="prop-container">
                    <h5 className="prop-label">Border color</h5>
                    <ColorInput colorKey="borderColor" />
                </section>
                {/* Border style */}
                <BorderStyle />
            </AccordionContent>
        </TooltipProvider>
    );
}
