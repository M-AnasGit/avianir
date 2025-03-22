'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
//@LUCIDE REACT
import { Eye, Info } from 'lucide-react';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useContent } from '../../provider';
import { Checkbox } from '@/components/ui/checkbox';
//@TYPES
import { InputDetails } from '@/features/editor/types';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/providers/modal-provider';
import PreviewModal from './preview-modal';

export default function InputConfig() {
    const { state, palette } = useEditor();
    const { handleFormContentChange } = useContent();
    const { handleSetModal } = useModal();

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

    const handlePreviewModal = () => {
        handleSetModal(<PreviewModal palette={palette} />);
    };

    if (!inputContent) return null;

    return (
        <AccordionContent className="prop-accordion-content">
            <TooltipProvider>
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
                        type="number"
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
                <Button
                    variant={'outline'}
                    onClick={handlePreviewModal}
                    className="text-primary"
                    data-testid="edit-content"
                >
                    <Eye size={16} />
                    Preview states
                </Button>
            </TooltipProvider>
        </AccordionContent>
    );
}
