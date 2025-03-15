'use client';
import React from 'react';
//@CUSTOM COMPONENT
import FontFamily from '../font-family';
import FontSize from '../font-size';
//@LUCIDE
import { Pencil } from 'lucide-react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
//@CUSTOM COMPONENTS
import RichContentModal from '../content/rich-content-modal';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useModal } from '@/components/providers/modal-provider';
import { useContent } from '../../provider';
//@TYPES
import { ElementChangeEvent } from '../../types';

export default function FormTitle() {
    const { state, palette } = useEditor();
    const { handleFormContentChange } = useContent();
    const { handleSetModal } = useModal();

    const handleFormTitleChange = (v: string) => {
        if (!state.editor.selectedElement?.formContent?.form) return;
        handleFormContentChange({
            target: {
                id: 'form',
                value: {
                    ...state.editor.selectedElement.formContent.form,
                    title: {
                        ...state.editor.selectedElement.formContent.form.title,
                        value: v,
                    },
                },
            },
        });
    };

    const handleButtonClick = () => {
        handleSetModal(
            <RichContentModal
                content={{
                    text: state.editor.selectedElement?.formContent?.form?.title.value || '',
                }}
                type={state.editor.selectedElement?.type || 'text'}
                style={state.editor.selectedElement?.formContent?.form?.title.style || {}}
                palette={palette}
                handleFormContentChange={handleFormTitleChange}
            />,
        );
    };

    const handleLocalStyleChange = (e: ElementChangeEvent) => {
        if (!state.editor.selectedElement?.formContent?.form) return;

        const { id, value } = e.target;

        handleFormContentChange({
            target: {
                id: 'form',
                value: {
                    ...state.editor.selectedElement.formContent.form,
                    title: {
                        ...state.editor.selectedElement.formContent.form.title,
                        style: {
                            ...state.editor.selectedElement.formContent.form.title.style,
                            [id]: value,
                        },
                    },
                },
            },
        });
    };

    if (!state.editor.selectedElement?.formContent?.form?.title) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <FontFamily
                style={state.editor.selectedElement.formContent.form.title.style}
                handleStyleChange={handleLocalStyleChange}
            />
            <FontSize
                style={state.editor.selectedElement.formContent.form.title.style}
                handleStyleChange={handleLocalStyleChange}
            />
            <Button variant={'outline'} onClick={handleButtonClick} className="text-primary" data-testid="edit-content">
                <Pencil size={16} />
                Edit content
            </Button>
        </AccordionContent>
    );
}
