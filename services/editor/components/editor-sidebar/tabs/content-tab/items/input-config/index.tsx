'use client';
import React from 'react';
import PreviewStatesButton from '../preview-states-button';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
//@LUCIDE REACT
import { Info } from 'lucide-react';
//@CUSTOM HOOKS
import { useEditor } from '@/services/editor/provider';
import { useContent } from '../../provider';
//@TYPES
import { InputDetails } from '@/services/editor/types';

export default function InputConfig() {
    const { state } = useEditor();
    const { handleFormContentChange } = useContent();

    const inputContent = React.useMemo(
        () => state.editor.selectedElement?.formContent?.input,
        [state.editor.selectedElement],
    );
    const handleInputContentChange = (target: Partial<InputDetails>) => {
        if (!inputContent) return;

        handleFormContentChange({
            target: {
                id: 'input',
                value: {
                    ...inputContent,
                    ...target,
                },
            },
        });
    };

    if (!inputContent) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            {/* Number of lines */}
            <section className="prop-container">
                <h5 className="prop-label">Number of lines</h5>
                <Input
                    id="no-of-lines"
                    type="number"
                    defaultValue={inputContent.config.rows}
                    onChange={(e) => {
                        handleInputContentChange({
                            config: {
                                ...inputContent.config,
                                rows: parseInt(e.target.value),
                            },
                        });
                    }}
                />
            </section>
            {/* Expected Answer */}
            <section className="prop-container">
                <h5 className="prop-label">Expected answer</h5>
                <Input
                    id="expected-answer"
                    type="text"
                    placeholder="Enter the expected answer"
                    defaultValue={inputContent.answer.value}
                    onChange={(e) => {
                        handleInputContentChange({
                            answer: {
                                ...inputContent.answer,
                                value: e.target.value,
                            },
                        });
                    }}
                />
            </section>
            {/* Exact match */}
            <div className="flex items-center gap-2 px-[2px]">
                <Checkbox
                    checked={inputContent.answer.exact}
                    onCheckedChange={(c) => {
                        handleInputContentChange({
                            answer: {
                                ...inputContent.answer,
                                exact: !!c,
                            },
                        });
                    }}
                />
                <small className="prop-small">Exact match</small>
            </div>
            {/* Acceptance threshold */}
            {!inputContent.answer.exact && (
                <section className="prop-container">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                            <h5 className="prop-label">Acceptance threshold</h5>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info size={12} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    The lower the value, the more lenient the answer matching will be.
                                </TooltipContent>
                            </Tooltip>
                        </span>
                        <small className="text-muted-foreground">{inputContent.answer.acceptance_threshold}%</small>
                    </div>
                    <Slider
                        aria-label={'acceptance_threshold'}
                        min={0}
                        max={100}
                        step={1}
                        value={[inputContent.answer.acceptance_threshold ?? 0]}
                        onValueChange={(value) => {
                            handleInputContentChange({
                                answer: {
                                    ...inputContent.answer,
                                    acceptance_threshold: value[0],
                                },
                            });
                        }}
                    />
                </section>
            )}
            <PreviewStatesButton />
        </AccordionContent>
    );
}
