'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM COMPONENTS
import DirectionInputs from '../direction-inputs';
//@CUSTOM HOOKS
import { useContent } from '../../provider';

export default function Spacings() {
    const { currentStyle: style, handleStyleChange, handleBatchStyleChange } = useContent();

    return (
        <AccordionContent className="prop-accordion-content">
            <DirectionInputs
                id="margin"
                style={style}
                handleStyleChange={handleStyleChange}
                handleBatchStyleChange={handleBatchStyleChange}
            />
            <DirectionInputs
                id="padding"
                style={style}
                handleStyleChange={handleStyleChange}
                handleBatchStyleChange={handleBatchStyleChange}
            />
        </AccordionContent>
    );
}
