'use client';
import React from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import { MathExtension } from '../custom-extensions/maths';
//@CUSTOM COMPONENTS
import MenuBar from './menu-bar';
//@CONSTANTS
import { text_extensions } from '../constants';
import '../styles.css';
//@TYPES
import { RichTextProps } from '../types';

type Props = RichTextProps & {
    palette: Palette;
    handleSaveContent?: (v: string) => void;
    setContent?: (v: string) => void;
};

export default function RichTextInput({ content, style, palette, handleSaveContent, setContent }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            ...text_extensions,
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                'data-editable': 'true',
            },
        },
    });

    React.useEffect(() => {
        if (editor && setContent) {
            editor.on('update', () => {
                setContent(editor.getHTML());
            });
        }

        return () => {
            if (editor && handleSaveContent) {
                handleSaveContent(editor.getHTML());
            }
        };
    }, [editor, handleSaveContent]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <MenuBar palette={palette} editor={editor} />
            <div
                className="no-scrollbar bg-background"
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                }}
            >
                <EditorContent
                    editor={editor}
                    style={{ ...style, height: '300px' }}
                    data-testid="rich-content"
                    className="rich-editor-content"
                />
            </div>
        </>
    );
}
