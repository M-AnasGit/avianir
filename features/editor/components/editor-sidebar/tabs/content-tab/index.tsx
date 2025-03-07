'use client';
import React from 'react';
//@CUSTOM COMPONENT
import TabFooter from './tab-footer';
//@SHADCNUI
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
//@CONSTANTS
import { CONTENT_TAB_ITEMS } from './constants';
//@PROVIDERS
import { ContentProvider } from './provider';
import { useEditor } from '@/features/editor/provider';
//@TYPES
import { ElementTypes } from '@/features/editor/types';

export default function ContentTab() {
    const { state } = useEditor();

    if (!state.editor.selectedElement) {
        return (
            <p className="prop-small" role="alert">
                Select an element to change its content
            </p>
        );
    }

    return (
        <Accordion type="multiple" className="w-full">
            <ContentProvider>
                {Object.entries(CONTENT_TAB_ITEMS).map(([key, value], i) => {
                    const exists =
                        value.for.has('*') || value.for.has(state.editor.selectedElement?.type as ElementTypes);

                    const props =
                        key === 'content'
                            ? {
                                  type:
                                      state.editor.selectedElement?.type === 'text' ||
                                      state.editor.selectedElement?.type === 'table'
                                          ? 'rich-content'
                                          : 'media',
                              }
                            : {};

                    return (
                        exists && (
                            <AccordionItem key={i} value={key} className="border-b-[1px] py-0">
                                <AccordionTrigger className="capitalize !no-underline">{key}</AccordionTrigger>
                                {value.component(props)}
                            </AccordionItem>
                        )
                    );
                })}
                <TabFooter />
            </ContentProvider>
        </Accordion>
    );
}
