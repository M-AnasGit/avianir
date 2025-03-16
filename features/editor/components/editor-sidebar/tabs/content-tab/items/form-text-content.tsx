'use client';
import React from 'react';
//@CUSTOM COMPONENT
import FontFamily from './font-family';
import FontSize from './font-size';
import LineHeight from './line-height';
//@LUCIDE
import { Pencil } from 'lucide-react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
//@CUSTOM COMPONENTS
import RichContentModal from './content/rich-content-modal';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useModal } from '@/components/providers/modal-provider';
import { useContent } from './../provider';
//@TYPES
import { ElementChangeEvent } from './../types';
import { FormDetails, InputDetails, RadioDetails } from '@/features/editor/types';

type FormContentMap = {
    form: keyof FormDetails;
    input: keyof InputDetails;
    radio_checkbox: keyof RadioDetails;
};
type Props<T extends keyof FormContentMap> = {
    parent_id: T;
    id: FormContentMap[T];
};

export default function FormTextContent<T extends keyof FormContentMap>({ parent_id, id }: Props<T>) {
    const { state, palette } = useEditor();
    const { handleFormContentChange } = useContent();
    const { handleSetModal } = useModal();

    const formContent = React.useMemo(
        () => state.editor.selectedElement?.formContent?.[parent_id],
        [state.editor.selectedElement, parent_id],
    );

    const handleFormTextContentChange = (v: string) => {
        if (!formContent) return;
        const currentIdContent = (formContent as any)[id];

        handleFormContentChange({
            target: {
                id: parent_id,
                value: {
                    ...formContent,
                    [id]: {
                        ...currentIdContent,
                        value: v,
                    },
                },
            },
        });
    };
    const handleLocalStyleChange = (e: ElementChangeEvent) => {
        if (!formContent) return;
        const currentIdContent = (formContent as any)[id];

        const { id: target_id, value } = e.target;

        handleFormContentChange({
            target: {
                id: parent_id,
                value: {
                    ...formContent,
                    [id]: {
                        ...currentIdContent,
                        style: {
                            ...currentIdContent.style,
                            [target_id]: value,
                        },
                    },
                },
            },
        });
    };
    const handleButtonClick = () => {
        if (!formContent) return;
        const currentIdContent = (formContent as any)[id];

        handleSetModal(
            <RichContentModal
                content={{
                    text: currentIdContent.value || '',
                }}
                type={state.editor.selectedElement?.type || 'text'}
                style={currentIdContent.style || {}}
                palette={palette}
                handleFormContentChange={handleFormTextContentChange}
            />,
        );
    };

    if (!formContent || !(formContent as any)[id]) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <FontFamily style={(formContent as any)[id].style} handleStyleChange={handleLocalStyleChange} />
            <FontSize style={(formContent as any)[id].style} handleStyleChange={handleLocalStyleChange} />
            <LineHeight style={(formContent as any)[id].style} handleStyleChange={handleLocalStyleChange} />
            <Button variant={'outline'} onClick={handleButtonClick} className="text-primary" data-testid="edit-content">
                <Pencil size={16} />
                Edit content
            </Button>
        </AccordionContent>
    );
}
