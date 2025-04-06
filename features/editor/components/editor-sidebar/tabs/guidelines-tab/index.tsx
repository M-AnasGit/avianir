'use client';
import React from 'react';
//@SHADCNUI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
//@CONSTANTS
import { GUIDELINES_TAB_ITEMS } from './constants';

export default function GuidelinesTab() {
    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(GUIDELINES_TAB_ITEMS).map(([key, component], i) => {
                return (
                    <AccordionItem key={i} value={key} className="border-b-[1px] py-0">
                        <AccordionTrigger
                            className="capitalize !no-underline"
                            data-testid={`guidelines-tab-guidelines`}
                        >
                            {key}
                        </AccordionTrigger>
                        <AccordionContent>{component}</AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
