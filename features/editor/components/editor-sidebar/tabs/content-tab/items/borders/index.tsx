'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { TooltipProvider } from '@/components/ui/tooltip';
//@CUSTOM COMPONENTS
import DirectionInputs from '../direction-inputs';
import ColorInput from '../color-input';
import BorderStyle from './border-style';
//@CUSTOM HOOKS
import { useContent } from '../../provider';

export default function Borders() {
    const { currentStyle, handleStyleChange, handleBatchStyleChange } = useContent();

    return (
        <TooltipProvider>
            <AccordionContent className="flex flex-col gap-4 px-[1px]">
                {/* Border width */}
                <DirectionInputs
                    id="borderWidth"
                    label="Border width"
                    style={currentStyle}
                    handleStyleChange={handleStyleChange}
                    handleBatchStyleChange={handleBatchStyleChange}
                />
                {/* Border radius */}
                <DirectionInputs
                    id="borderRadius"
                    label="Radius"
                    style={currentStyle}
                    handleStyleChange={handleStyleChange}
                    handleBatchStyleChange={handleBatchStyleChange}
                />
                {/* Border color */}
                <section className="prop-container">
                    <h5 className="prop-label">Border color</h5>
                    <ColorInput colorKey="borderColor" style={currentStyle} handleStyleChange={handleStyleChange} />
                </section>
                {/* Border style */}
                <BorderStyle />
            </AccordionContent>
        </TooltipProvider>
    );
}
