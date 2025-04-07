'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import FormTextContent from '../form-text-content';
import DirectionInputs from '../direction-inputs';
//@SHADCNUI
import { Input } from '@/components/ui/input';
import { AccordionContent } from '@/components/ui/accordion';
//@CUSTOM HOOKS
import { useEditor } from '@/services/editor/provider';
import { useContent } from '../../provider';
//@TYPES
import { ElementChangeEvent } from '../../types';
import ColorInput from '../color-input';
import GapInput from '../gap-input';

export default function InputArea() {
    const { state } = useEditor();
    const { handleFormContentChange } = useContent();

    const inputContent = React.useMemo(
        () => state.editor.selectedElement?.formContent?.input,
        [state.editor.selectedElement],
    );
    const handlePlaceholderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!inputContent || !state.editor.selectedElement?.formContent?.input) return;

        handleFormContentChange({
            target: {
                id: 'input',
                value: {
                    ...state.editor.selectedElement.formContent.input,
                    placeholder: {
                        ...inputContent.placeholder,
                        value: e.target.value,
                    },
                },
            },
        });
    };
    const handleLocalStyleChange = (e: ElementChangeEvent) => {
        if (!inputContent) return;

        const { id: target_id, value } = e.target;

        handleFormContentChange({
            target: {
                id: 'input',
                value: {
                    ...inputContent,
                    ['placeholder']: {
                        ...inputContent.placeholder,
                        style: {
                            ...inputContent.placeholder.style,
                            [target_id]: value,
                        },
                    },
                },
            },
        });
    };
    const handleBatchLocalStyleChange = (e: ElementChangeEvent[]) => {
        if (!inputContent) return;

        const newStyle = e.reduce(
            (acc, { target }) => {
                acc[target.id] = target.value;
                return acc;
            },
            {} as Record<string, string>,
        );

        handleFormContentChange({
            target: {
                id: 'input',
                value: {
                    ...inputContent,
                    ['placeholder']: {
                        ...inputContent.placeholder,
                        style: {
                            ...inputContent.placeholder.style,
                            ...newStyle,
                        },
                    },
                },
            },
        });
    };

    if (!inputContent) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <section className="prop-container">
                <h5 className="prop-label">Placeholder</h5>
                <Input
                    id="placeholder-value"
                    defaultValue={inputContent.placeholder.value}
                    onBlur={handlePlaceholderValueChange}
                />
            </section>
            <GapInput />
            <FormTextContent parent_id="input" id="placeholder" />
            <DirectionInputs
                id="padding"
                label="Inner Padding"
                style={inputContent.placeholder.style}
                handleStyleChange={handleLocalStyleChange}
                handleBatchStyleChange={handleBatchLocalStyleChange}
            />
            <DirectionInputs
                id="borderWidth"
                label="Input Border width"
                style={inputContent.placeholder.style}
                handleStyleChange={handleLocalStyleChange}
                handleBatchStyleChange={handleBatchLocalStyleChange}
            />
            <DirectionInputs
                id="borderRadius"
                label="Input Border radius"
                style={inputContent.placeholder.style}
                handleStyleChange={handleLocalStyleChange}
                handleBatchStyleChange={handleBatchLocalStyleChange}
            />
            <section className="prop-container">
                <h5 className="prop-label">Input Border color</h5>
                <ColorInput
                    colorKey="borderColor"
                    style={inputContent.placeholder.style}
                    handleStyleChange={handleLocalStyleChange}
                />
            </section>
        </AccordionContent>
    );
}
