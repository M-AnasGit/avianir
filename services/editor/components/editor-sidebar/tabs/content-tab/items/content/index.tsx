'use client';
import React from 'react';
//@SHADCNUI
import { AccordionContent } from '@/components/ui/accordion';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
//@LUCIDE-REACT
import { Pencil } from 'lucide-react';
//@CUSTOM COMPONENTS
import ContentInput from './content-input';
import RichContentModal from './rich-content-modal';
//@CUSTOM HOOKS
import { useContent } from '../../provider';
import { useEditor } from '@/services/editor/provider';
import { useModal } from '@/components/providers/modal-provider';

type Props = {
    type: 'rich-content' | 'media';
};

export default function Content({ type }: Props) {
    const { state, palette } = useEditor();
    const { handleSetModal } = useModal();
    const { currentStyle, handleStyleChange, currentContent: content, handleContentChange } = useContent();

    const handleObjectFitChange = (value: string) => {
        handleStyleChange({
            target: {
                id: 'objectFit',
                value,
            },
        });
    };

    const handleButtonClick = () => {
        handleSetModal(
            <RichContentModal
                content={content}
                type={state.editor.selectedElement?.type || 'text'}
                style={currentStyle}
                palette={palette}
                handleContentChange={handleContentChange}
            />,
        );
    };

    return (
        <AccordionContent className="prop-accordion-content">
            {type === 'rich-content' ? (
                <Button
                    variant={'outline'}
                    onClick={handleButtonClick}
                    className="text-primary"
                    data-testid="edit-content"
                >
                    <Pencil size={16} />
                    Edit content
                </Button>
            ) : (
                <>
                    <ContentInput id={'src'} label={'Source'} placeholder="Source" />
                    {state.editor.selectedElement?.type === 'image' && (
                        <ContentInput id={'alt'} label={'Alt text'} placeholder="Alt text" />
                    )}
                    {state.editor.selectedElement?.type !== 'audio' && (
                        <div className="prop-container">
                            <h5 className="prop-label">Object fit</h5>
                            <Select
                                defaultValue={currentStyle.objectFit || 'fill'}
                                onValueChange={handleObjectFitChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Object-fit"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fill">Fill</SelectItem>
                                    <SelectItem value="contain">Contain</SelectItem>
                                    <SelectItem value="cover">Cover</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </>
            )}
        </AccordionContent>
    );
}
