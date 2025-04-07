'use client';
import React from 'react';
//@SHADCNUI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
//@CONSTANTS
import { CONFIG_TAB_ITEM } from './constants';

export default function ConfigTab() {
    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(CONFIG_TAB_ITEM).map(([key, value], i) => {
                return (
                    <AccordionItem key={i} value={key} className="border-b-[1px] py-0">
                        <AccordionTrigger className="capitalize !no-underline">{key}</AccordionTrigger>
                        <AccordionContent className="prop-accordion-content">{value}</AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
