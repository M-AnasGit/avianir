'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import RadioCheckboxOptionsModal from './radio-checkbox-options-modal';
import FontFamily from '../font-family';
import FontSize from '../font-size';
import LineHeight from '../line-height';
import GapInput from '../gap-input';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
//@LUCIDE
import { Pencil } from 'lucide-react';
//@CUSTOM HOOKS
import { useModal } from '@/components/providers/modal-provider';
import { useEditor } from '@/features/editor/provider';
import { useContent } from '../../provider';
//@TYPES
import { RadioDetails } from '@/features/editor/types';
import { ElementChangeEvent } from '../../types';
import PreviewStatesButton from '../preview-states-button';

export default function RadioCheckboxOptions() {
    const { state } = useEditor();
    const { handleFormContentChange } = useContent();
    const { handleSetModal } = useModal();

    const radioContent = React.useMemo(
        () => state.editor.selectedElement?.formContent?.radio_checkbox,
        [state.editor.selectedElement],
    );
    const isCheckbox = React.useMemo(
        () => state.editor.selectedElement?.type === 'checkbox',
        [state.editor.selectedElement],
    );
    const handleUpdateOptions = (new_options: RadioDetails['options']) => {
        if (!radioContent) return;

        handleFormContentChange({
            target: {
                id: 'radio_checkbox',
                value: {
                    ...radioContent,
                    options: new_options,
                },
            },
        });
    };
    const handleStyleChange = (e: ElementChangeEvent) => {
        if (!radioContent) return;

        const { id, value } = e.target;

        handleFormContentChange({
            target: {
                id: 'radio_checkbox',
                value: {
                    ...radioContent,
                    options: radioContent.options.map((option) => ({
                        ...option,
                        value: {
                            ...option.value,
                            style: {
                                ...option.value.style,
                                [id]: value,
                            },
                        },
                    })),
                },
            },
        });
    };

    const handleRadioOptions = () => {
        handleSetModal(
            <RadioCheckboxOptionsModal
                options={radioContent?.options}
                handleUpdateOptions={handleUpdateOptions}
                isCheckbox={isCheckbox}
            />,
        );
    };

    if (!radioContent) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <FontFamily style={radioContent.options[0].value.style} handleStyleChange={handleStyleChange} />
            <FontSize style={radioContent.options[0].value.style} handleStyleChange={handleStyleChange} />
            <LineHeight style={radioContent.options[0].value.style} handleStyleChange={handleStyleChange} />
            <GapInput />
            <Button
                variant={'outline'}
                onClick={handleRadioOptions}
                className="text-primary"
                data-testid="edit-content"
            >
                <Pencil size={16} />
                Edit options
            </Button>
            <PreviewStatesButton />
        </AccordionContent>
    );
}
