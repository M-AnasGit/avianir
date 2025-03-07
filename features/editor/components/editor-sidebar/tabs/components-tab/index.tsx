'use client';
//@SHADCNUI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TooltipProvider } from '@/components/ui/tooltip';
//@CUSTOM COMPONENTS
import ComponentItems from './component-items';
//@CONSTANTS
import { COMPONENTS_TAB_ITEMS } from '../../constants';

export default function ComponentsTab() {
    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(COMPONENTS_TAB_ITEMS).map(([key, value], i) => {
                return (
                    <AccordionItem key={i} value={key} className="border-b-[1px] py-0">
                        <AccordionTrigger className="capitalize !no-underline">{key}</AccordionTrigger>
                        <AccordionContent className="grid grid-cols-3 gap-y-4">
                            <TooltipProvider>
                                <ComponentItems items={value} />
                            </TooltipProvider>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
