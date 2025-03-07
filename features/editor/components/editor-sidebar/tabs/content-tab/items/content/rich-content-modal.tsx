'use client';
import React from 'react';
//@TEXT EDITOR
import RichTextInput from '@/components/rich-content/rich-text';
import RichTableInput from '@/components/rich-content/rich-table';
//@CUSTOM COMPONENT
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
//@TYPES
import { EditorElement, Palette } from '@/features/editor/types';
import { ElementChangeEvent } from '../../types';
type Props = {
    content: EditorElement['content'];
    type: EditorElement['type'];
    style: React.CSSProperties;
    palette: Palette;
    handleContentChange: (e: ElementChangeEvent) => void;
};

export default function RichContentModal({ content, type, style, palette, handleContentChange }: Props) {
    const handleSaveContent = (v: string) => {
        handleContentChange({
            target: {
                id: 'text',
                value: v,
            },
        });
    };
    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Edit text content</DialogTitle>
                <DialogDescription>Edit the text content for this element</DialogDescription>
            </DialogHeader>
            {!Array.isArray(content) &&
                (type === 'table' ? (
                    <RichTableInput
                        content={content['text'] || ''}
                        style={style}
                        handleSaveContent={handleSaveContent}
                    />
                ) : (
                    <RichTextInput
                        content={content['text'] || ''}
                        style={style}
                        palette={palette}
                        handleSaveContent={handleSaveContent}
                    />
                ))}
        </>
    );
}
