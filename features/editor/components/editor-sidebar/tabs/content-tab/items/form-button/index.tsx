'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
//@COMPONENTS
import FontFamily from '../font-family';
import ColorInput from '../color-input';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useContent } from '../../provider';
//@TYPES
import { ElementChangeEvent } from '../../types';

export default function FormButton() {
    const { state } = useEditor();
    const { handleFormContentChange } = useContent();

    const btnContent = React.useMemo(
        () => state.editor.selectedElement?.formContent?.form?.submit_btn,
        [state.editor.selectedElement],
    );
    const handleLocalStyleChange = (e: ElementChangeEvent) => {
        if (!btnContent || !state.editor.selectedElement?.formContent?.form) return;

        const { id: target_id, value } = e.target;

        handleFormContentChange({
            target: {
                id: 'form',
                value: {
                    ...state.editor.selectedElement.formContent.form,
                    submit_btn: {
                        ...btnContent,
                        style: {
                            ...btnContent.style,
                            [target_id]: value,
                        },
                    },
                },
            },
        });
    };

    if (!btnContent) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <FontFamily style={btnContent.style} handleStyleChange={handleLocalStyleChange} />
            <div className="prop-container">
                <h5 className="prop-label">Text color</h5>
                <ColorInput colorKey="color" style={btnContent.style} handleStyleChange={handleLocalStyleChange} />
            </div>
            <div className="prop-container">
                <h5 className="prop-label">Background color</h5>
                <ColorInput
                    colorKey="backgroundColor"
                    style={btnContent.style}
                    handleStyleChange={handleLocalStyleChange}
                />
            </div>
        </AccordionContent>
    );
}
